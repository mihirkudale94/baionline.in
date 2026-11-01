from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
import sqlite3
import os
import json
import datetime
import threading
import urllib.error
import urllib.parse
import urllib.request

router = APIRouter(prefix="/api", tags=["submissions"])

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "submissions.db")

# The forms are public and unauthenticated, so the only thing standing between
# this table and a scraper is these caps. They are deliberately generous: the
# contact form alone allows a 5000-character message.
MAX_FIELDS = 25
MAX_VALUE_CHARS = 5000
MAX_PAYLOAD_CHARS = 20000

# reCAPTCHA v2. The secret stays on the server and is never sent to the
# browser. Leave RECAPTCHA_SECRET_KEY unset to turn verification off, which is
# what development and the period before the keys are issued rely on — the
# frontend hides the widget under the same condition.
RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify"
RECAPTCHA_TIMEOUT_SECONDS = 10
RECAPTCHA_FIELD = "recaptcha_token"

# Only the forms that actually render the widget. Listing a form here before
# its page shows a captcha would reject every genuine submission to it.
CAPTCHA_FORM_TYPES = {"contact"}

# Per-IP sliding window. A human filling in several forms in one visit stays
# well under this; a bot hammering the endpoint does not.
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW_SECONDS = 600

_recent_posts: dict[str, list[float]] = {}
_rate_lock = threading.Lock()


def recaptcha_secret():
    return os.getenv("RECAPTCHA_SECRET_KEY", "").strip()


def _recaptcha_accepted(token: str) -> bool:
    """Ask Google whether this token is genuine. Raises on a transport error."""
    body = urllib.parse.urlencode(
        {"secret": recaptcha_secret(), "response": token}
    ).encode("utf-8")
    request = urllib.request.Request(RECAPTCHA_VERIFY_URL, data=body)
    with urllib.request.urlopen(request, timeout=RECAPTCHA_TIMEOUT_SECONDS) as response:
        result = json.loads(response.read().decode("utf-8"))
    return bool(result.get("success"))


def _check_recaptcha(form_type: str, token: str) -> None:
    if not recaptcha_secret() or form_type not in CAPTCHA_FORM_TYPES:
        return
    if not token:
        raise HTTPException(status_code=400, detail="Please complete the captcha.")
    try:
        accepted = _recaptcha_accepted(token)
    except (urllib.error.URLError, TimeoutError, ValueError, OSError):
        # Fail closed. A submission that cannot be checked is not stored, and
        # the caller is told to retry rather than quietly losing the message.
        raise HTTPException(
            status_code=503,
            detail="Could not reach the captcha service. Please try again in a moment.",
        ) from None
    if not accepted:
        raise HTTPException(
            status_code=400, detail="Captcha verification failed. Please try again."
        )


def _client_ip(request: Request) -> str:
    # Behind a reverse proxy the socket address is the proxy's, so prefer the
    # first hop in X-Forwarded-For when one is set.
    forwarded = request.headers.get("x-forwarded-for", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def _rate_limited(ip: str, now: float) -> bool:
    cutoff = now - RATE_LIMIT_WINDOW_SECONDS
    with _rate_lock:
        for known_ip in list(_recent_posts):
            kept = [t for t in _recent_posts[known_ip] if t > cutoff]
            if kept:
                _recent_posts[known_ip] = kept
            else:
                del _recent_posts[known_ip]
        hits = _recent_posts.setdefault(ip, [])
        if len(hits) >= RATE_LIMIT_MAX:
            return True
        hits.append(now)
        return False


def _validate_payload(data: dict) -> str:
    """Return the payload as JSON, or raise 400/413 if it is out of bounds."""
    if len(data) > MAX_FIELDS:
        raise HTTPException(status_code=400, detail="Too many fields in submission")
    for key, value in data.items():
        if isinstance(value, str) and len(value) > MAX_VALUE_CHARS:
            raise HTTPException(status_code=400, detail=f"Field '{key}' is too long")
    payload = json.dumps(data)
    if len(payload) > MAX_PAYLOAD_CHARS:
        raise HTTPException(status_code=413, detail="Submission is too large")
    return payload


def _init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form_type TEXT NOT NULL,
            payload TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


_init_db()


class SubmissionIn(BaseModel):
    form_type: str
    data: dict


@router.post("/submissions")
def create_submission(sub: SubmissionIn, request: Request):
    if not sub.form_type or not sub.data:
        raise HTTPException(status_code=400, detail="form_type and data are required")
    # A spent token is of no use to anyone, so it never reaches the table.
    data = dict(sub.data)
    token = str(data.pop(RECAPTCHA_FIELD, "") or "")
    payload = _validate_payload(data)
    now = datetime.datetime.now(datetime.timezone.utc)
    if _rate_limited(_client_ip(request), now.timestamp()):
        raise HTTPException(
            status_code=429,
            detail="Too many submissions from this address. Please try again later.",
        )
    _check_recaptcha(sub.form_type, token)
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO submissions (form_type, payload, created_at) VALUES (?, ?, ?)",
        (sub.form_type, payload, now.isoformat()),
    )
    conn.commit()
    conn.close()
    return {"status": "ok"}
