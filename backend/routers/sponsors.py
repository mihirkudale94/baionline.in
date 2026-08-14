"""Paid sponsorship listings.

The public "Our Sponsors" banner on the home page is driven entirely by this
router: a company appears there only after Razorpay has taken its money and the
signature has been verified server side. There is no other way onto the banner
short of editing the database by hand.

Flow:

    POST /api/sponsors/order   -> creates a Razorpay order, stores a 'created' row
    (browser opens Razorpay checkout)
    POST /api/sponsors/verify  -> checks the HMAC, flips the row to 'paid',
                                  and hands back a one-company upload token
    POST /api/sponsors/logo    -> accepts the logo, but only for a row that is
                                  already 'paid' and only with that token
    GET  /api/sponsors         -> public list; 'paid' + listed rows only

Logos are stored under backend/data/sponsor_logos/ and served back through
/api/sponsors/{id}/logo. They deliberately do NOT go into the frontend's public
folder: that directory is a build input, so anything written there would be lost
on the next `npm run build` and would need a redeploy to appear.
"""

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import Response
from pydantic import BaseModel, Field
import datetime
import json
import os
import re
import secrets
import sqlite3

from razorpay_gateway import (
    create_order,
    inr,
    key_id,
    payments_enabled,
    signature_is_valid,
)

router = APIRouter(prefix="/api/sponsors", tags=["sponsors"])

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "submissions.db")
LOGO_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "sponsor_logos")

# ---------------------------------------------------------------------------
# !!  PLACEHOLDER PRICING — MUST BE REPLACED BEFORE GOING LIVE  !!
#
# These tiers and amounts are invented. Unlike the membership fees in
# payments.py — which are transcribed from BAI Head Office's printed
# application form — there is no sponsorship rate card in this repository, so
# nothing here has been approved by BAI Pune Centre.
#
# Replace every amount_paise below with the committee-approved figure (in
# PAISE: multiply rupees by 100) and delete this banner. Until then, keep the
# Razorpay keys on the rzp_test_* pair so no real money can move.
# ---------------------------------------------------------------------------
SPONSORSHIP_TIERS = {
    "platinum": {
        "label": "Platinum Sponsor",
        "amount_paise": 50000000,  # PLACEHOLDER — Rs 5,00,000
        "rank": 1,
        "blurb": "Top billing on the home page banner, event branding and magazine coverage.",
    },
    "gold": {
        "label": "Gold Sponsor",
        "amount_paise": 25000000,  # PLACEHOLDER — Rs 2,50,000
        "rank": 2,
        "blurb": "Home page banner listing plus branding at Pune Centre events.",
    },
    "silver": {
        "label": "Silver Sponsor",
        "amount_paise": 10000000,  # PLACEHOLDER — Rs 1,00,000
        "rank": 3,
        "blurb": "Home page banner listing and acknowledgement in event collateral.",
    },
    "bronze": {
        "label": "Bronze Sponsor",
        "amount_paise": 5000000,  # PLACEHOLDER — Rs 50,000
        "rank": 4,
        "blurb": "Home page banner listing with your logo and website link.",
    },
}

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_RE = re.compile(r"^[0-9]{10,15}$")

# Raster formats only. An SVG is a script-carrying document, and these files are
# served from our own origin — a hostile <script> inside one would run as us.
LOGO_MAX_BYTES = 512 * 1024
LOGO_TYPES = {
    "png": (b"\x89PNG\r\n\x1a\n", "image/png"),
    "jpg": (b"\xff\xd8\xff", "image/jpeg"),
    "webp": (b"RIFF", "image/webp"),
}


def _init_db():
    os.makedirs(LOGO_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS sponsors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id TEXT NOT NULL UNIQUE,
            payment_id TEXT,
            tier TEXT NOT NULL,
            amount_paise INTEGER NOT NULL,
            company_name TEXT NOT NULL,
            website TEXT NOT NULL DEFAULT '',
            contact TEXT NOT NULL,
            logo_ext TEXT NOT NULL DEFAULT '',
            upload_token TEXT NOT NULL DEFAULT '',
            status TEXT NOT NULL,
            listed INTEGER NOT NULL DEFAULT 1,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


_init_db()


def _now():
    return datetime.datetime.now(datetime.timezone.utc).isoformat()


def _connect():
    return sqlite3.connect(DB_PATH)


# A hostname, optional port, optional path — after an http(s) scheme.
_URL_RE = re.compile(
    r"^https?://"
    r"[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?"
    r"(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+"
    r"(?::\d{1,5})?"
    r"(?:[/?#]\S*)?$"
)


def _clean_website(raw):
    """Only absolute http(s) URLs survive. The value ends up in an href on the
    home page, so a 'javascript:' or 'data:' scheme must never get through."""
    value = (raw or "").strip()
    if not value:
        return ""

    # A bare "acme.com" is accepted and upgraded, but a string that carries its
    # own scheme has to carry an allowed one. Blindly prefixing https:// would
    # turn "javascript:alert(1)" into a scheme-laundered "https://javascript:…".
    scheme = re.match(r"^([A-Za-z][A-Za-z0-9+.-]*):", value)
    # A dot in the candidate means it is a host like "acme.com:8080", not a
    # scheme — real schemes do not contain dots in practice.
    if scheme and "." not in scheme.group(1):
        if scheme.group(1).lower() not in ("http", "https"):
            return ""
        if not re.match(r"^https?://", value, re.IGNORECASE):
            return ""  # "http:acme.com" — a scheme with no authority
    else:
        value = "https://" + value

    if not _URL_RE.match(value):
        return ""
    return value[:300]


def _tier_or_400(tier_id):
    tier = SPONSORSHIP_TIERS.get(tier_id)
    if not tier:
        raise HTTPException(status_code=400, detail="Unknown sponsorship tier.")
    return tier


class SponsorOrderIn(BaseModel):
    tier: str
    company_name: str = Field(min_length=2, max_length=200)
    website: str = Field(default="", max_length=300)
    contact_name: str = Field(default="", max_length=200)
    # Only an upper bound here. A too-short value must fall through to the
    # explicit checks in create_sponsor_order, which return a readable 400;
    # a Field(min_length=...) failure produces a 422 whose `detail` is a list
    # of error objects, and the frontend renders that as "[object Object]".
    email: str = Field(max_length=200)
    phone: str = Field(max_length=15)


class SponsorVerifyIn(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


@router.get("")
def list_sponsors():
    """PUBLIC. The home page banner reads this.

    Only rows that have actually been paid for and have not been unlisted are
    returned, and only the three fields the banner renders — no contact details
    or payment identifiers leave the server here.
    """
    conn = _connect()
    rows = conn.execute(
        """SELECT id, company_name, website, logo_ext, tier
           FROM sponsors
           WHERE status = 'paid' AND listed = 1
           ORDER BY created_at ASC"""
    ).fetchall()
    conn.close()

    def rank(row):
        return SPONSORSHIP_TIERS.get(row[4], {}).get("rank", 99)

    return [
        {
            "name": row[1],
            "url": row[2],
            "logo": f"/api/sponsors/{row[0]}/logo" if row[3] else "",
            "tier": SPONSORSHIP_TIERS.get(row[4], {}).get("label", ""),
        }
        for row in sorted(rows, key=rank)
    ]


@router.get("/tiers")
def sponsorship_tiers():
    """Tells the frontend whether to offer online payment, with which
    publishable key, and at what advertised prices. The secret stays here."""
    enabled = payments_enabled()
    return {
        "enabled": enabled,
        "key_id": key_id() if enabled else "",
        "currency": "INR",
        "tiers": [
            {
                "id": key,
                "label": value["label"],
                "blurb": value["blurb"],
                "amount_paise": value["amount_paise"],
                "amount_display": inr(value["amount_paise"]),
            }
            for key, value in sorted(SPONSORSHIP_TIERS.items(), key=lambda kv: kv[1]["rank"])
        ],
    }


@router.post("/order")
def create_sponsor_order(payload: SponsorOrderIn):
    if not payments_enabled():
        raise HTTPException(
            status_code=503,
            detail="Online sponsorship payment is not configured. Please use the inquiry form and we will contact you.",
        )

    tier = _tier_or_400(payload.tier)

    email = payload.email.strip()
    phone = re.sub(r"[^0-9]", "", payload.phone)
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Enter a valid e-mail address.")
    if not PHONE_RE.match(phone):
        raise HTTPException(status_code=400, detail="Enter a valid phone number.")

    company = payload.company_name.strip()
    website = _clean_website(payload.website)

    # Razorpay caps receipt at 40 characters.
    receipt = f"BAI-SP-{payload.tier}-{int(datetime.datetime.now().timestamp())}"[:40]
    order = create_order(
        amount_paise=tier["amount_paise"],
        receipt=receipt,
        notes={
            "tier": tier["label"],
            "company": company[:200],
            "centre": "BAI Pune Centre",
            "type": "sponsorship",
        },
    )

    contact = {"contact_name": payload.contact_name.strip(), "email": email, "phone": phone}

    conn = _connect()
    conn.execute(
        """INSERT INTO sponsors
           (order_id, tier, amount_paise, company_name, website, contact,
            status, listed, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)""",
        (
            order["id"],
            payload.tier,
            tier["amount_paise"],
            company,
            website,
            json.dumps(contact),
            "created",
            _now(),
            _now(),
        ),
    )
    conn.commit()
    conn.close()

    return {
        "order_id": order["id"],
        "amount_paise": tier["amount_paise"],
        "currency": "INR",
        "key_id": key_id(),
        "tier_label": tier["label"],
        "receipt": receipt,
        "prefill": {
            "name": contact["contact_name"] or company,
            "email": email,
            "contact": phone,
        },
    }


@router.post("/verify")
def verify_sponsor_payment(payload: SponsorVerifyIn):
    if not payments_enabled():
        raise HTTPException(status_code=503, detail="Online sponsorship payment is not configured.")

    if not signature_is_valid(
        payload.razorpay_order_id, payload.razorpay_payment_id, payload.razorpay_signature
    ):
        conn = _connect()
        conn.execute(
            "UPDATE sponsors SET status = ?, updated_at = ? WHERE order_id = ?",
            ("signature_failed", _now(), payload.razorpay_order_id),
        )
        conn.commit()
        conn.close()
        raise HTTPException(status_code=400, detail="Payment signature verification failed.")

    conn = _connect()
    row = conn.execute(
        "SELECT id, tier, amount_paise, company_name, upload_token FROM sponsors WHERE order_id = ?",
        (payload.razorpay_order_id,),
    ).fetchone()
    if not row:
        conn.close()
        raise HTTPException(status_code=404, detail="Unknown order.")

    sponsor_id, tier_id, amount_paise, company_name, existing_token = row
    # Reissuing on every verify would invalidate a token the sponsor is already
    # holding, so an existing one is kept.
    token = existing_token or secrets.token_urlsafe(32)

    conn.execute(
        """UPDATE sponsors
           SET payment_id = ?, status = ?, upload_token = ?, updated_at = ?
           WHERE order_id = ?""",
        (payload.razorpay_payment_id, "paid", token, _now(), payload.razorpay_order_id),
    )
    conn.commit()
    conn.close()

    return {
        "status": "paid",
        "sponsor_id": sponsor_id,
        "payment_id": payload.razorpay_payment_id,
        "order_id": payload.razorpay_order_id,
        "company_name": company_name,
        "tier": SPONSORSHIP_TIERS.get(tier_id, {}).get("label", tier_id),
        "amount_display": inr(amount_paise),
        "upload_token": token,
    }


@router.post("/logo")
async def upload_sponsor_logo(
    order_id: str = Form(...),
    upload_token: str = Form(...),
    file: UploadFile = File(...),
):
    """Attach a logo to a listing that has already been paid for.

    Gated on the token issued by /verify, so an unpaid or unknown order cannot
    push a file onto the server. Re-uploading replaces the previous file, which
    lets a sponsor correct a bad crop without contacting anyone.
    """
    conn = _connect()
    row = conn.execute(
        "SELECT id, status, upload_token, logo_ext FROM sponsors WHERE order_id = ?",
        (order_id,),
    ).fetchone()

    if not row or row[1] != "paid" or not row[2]:
        conn.close()
        raise HTTPException(status_code=404, detail="No paid sponsorship found for this order.")

    sponsor_id, _status, stored_token, previous_ext = row
    if not secrets.compare_digest(stored_token, upload_token.strip()):
        conn.close()
        raise HTTPException(status_code=403, detail="This upload link is not valid.")

    # Read one byte past the cap so an oversized file is detected rather than
    # silently truncated.
    blob = await file.read(LOGO_MAX_BYTES + 1)
    if len(blob) > LOGO_MAX_BYTES:
        conn.close()
        raise HTTPException(status_code=413, detail="Logo must be 512 KB or smaller.")
    if not blob:
        conn.close()
        raise HTTPException(status_code=400, detail="The uploaded file was empty.")

    # Sniff the actual bytes. A declared content-type is just a client claim.
    ext = next(
        (name for name, (magic, _mime) in LOGO_TYPES.items() if blob.startswith(magic)),
        "",
    )
    if ext == "webp" and blob[8:12] != b"WEBP":
        ext = ""
    if not ext:
        conn.close()
        raise HTTPException(
            status_code=400, detail="Logo must be a PNG, JPEG or WebP image."
        )

    os.makedirs(LOGO_DIR, exist_ok=True)
    if previous_ext and previous_ext != ext:
        old = os.path.join(LOGO_DIR, f"{sponsor_id}.{previous_ext}")
        if os.path.exists(old):
            os.remove(old)

    with open(os.path.join(LOGO_DIR, f"{sponsor_id}.{ext}"), "wb") as handle:
        handle.write(blob)

    conn.execute(
        "UPDATE sponsors SET logo_ext = ?, updated_at = ? WHERE id = ?",
        (ext, _now(), sponsor_id),
    )
    conn.commit()
    conn.close()

    return {"status": "ok", "logo": f"/api/sponsors/{sponsor_id}/logo"}


@router.get("/{sponsor_id}/logo")
def sponsor_logo(sponsor_id: int):
    """PUBLIC. Serves an uploaded logo, but only for a listing that is live."""
    conn = _connect()
    row = conn.execute(
        "SELECT logo_ext FROM sponsors WHERE id = ? AND status = 'paid' AND listed = 1",
        (sponsor_id,),
    ).fetchone()
    conn.close()

    if not row or not row[0]:
        raise HTTPException(status_code=404, detail="No logo on file.")

    path = os.path.join(LOGO_DIR, f"{sponsor_id}.{row[0]}")
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="No logo on file.")

    with open(path, "rb") as handle:
        blob = handle.read()

    return Response(
        content=blob,
        media_type=LOGO_TYPES[row[0]][1],
        headers={
            "Cache-Control": "public, max-age=3600",
            "X-Content-Type-Options": "nosniff",
        },
    )
