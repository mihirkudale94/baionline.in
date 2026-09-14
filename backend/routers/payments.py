"""Razorpay integration for membership subscription payments.

The shared gateway rules live in razorpay_gateway.py — server-side amounts and
mandatory signature verification. The specific rule here is that the client
sends a category key and the rupee value is looked up in SUBSCRIPTION_CATALOGUE
below, which mirrors the fee table printed on the BAI Head Office application
form. Trusting a client-supplied amount would let anyone buy a Corporate
membership for one rupee.

When the credentials are absent the router still loads and reports payments as
disabled, so the site keeps working with the offline Demand Draft / NEFT route.
"""

from fastapi import APIRouter, Header, HTTPException, Request
from pydantic import BaseModel, Field
import datetime
import json
import os
import re
import sqlite3

from razorpay_gateway import (
    create_order as gateway_create_order,
    inr as _inr,
    key_id as _key_id,
    payments_enabled as _payments_enabled,
    signature_is_valid,
    webhook_secret,
    webhook_signature_is_valid,
)
from routers import sponsors

router = APIRouter(prefix="/api/payments", tags=["payments"])

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "submissions.db")

# Authoritative fee table — mirrors the subscription block on the printed
# form. Amounts are in paise because that is the unit Razorpay works in.
SUBSCRIPTION_CATALOGUE = {
    "annual": {"label": "Annual Membership", "amount_paise": 408700},
    "patron": {"label": "Patron Membership", "amount_paise": 2970000},
    "affiliated": {"label": "Affiliated Association Patron Membership", "amount_paise": 3540000},
    "corporate": {"label": "Corporate Membership", "amount_paise": 36580000},
    # WBSC entry fee from the invitation circular: Rs 25,000 + 18% GST per entry.
    "wbsc_entry": {"label": "WBSC 2026 Competition Entry Fee", "amount_paise": 2950000},
}

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
PHONE_RE = re.compile(r"^[0-9]{10,15}$")


def _init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS membership_payments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            order_id TEXT NOT NULL UNIQUE,
            payment_id TEXT,
            category TEXT NOT NULL,
            amount_paise INTEGER NOT NULL,
            applicant TEXT NOT NULL,
            status TEXT NOT NULL,
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


class OrderIn(BaseModel):
    category: str
    applicant_name: str = Field(min_length=2, max_length=200)
    contact_person: str = Field(default="", max_length=200)
    email: str = Field(min_length=5, max_length=200)
    phone: str = Field(min_length=10, max_length=15)


class VerifyIn(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


@router.get("/config")
def payment_config():
    """Tells the frontend whether to offer online payment, and with which
    publishable key. The secret never leaves the server."""
    enabled = _payments_enabled()
    return {
        "enabled": enabled,
        "key_id": _key_id() if enabled else "",
        "currency": "INR",
        "categories": [
            {
                "id": key,
                "label": value["label"],
                "amount_paise": value["amount_paise"],
                "amount_display": _inr(value["amount_paise"]),
            }
            for key, value in SUBSCRIPTION_CATALOGUE.items()
        ],
    }


@router.post("/order")
def create_order(payload: OrderIn):
    if not _payments_enabled():
        raise HTTPException(
            status_code=503,
            detail="Online payment is not configured. Please use the Demand Draft / NEFT route.",
        )

    plan = SUBSCRIPTION_CATALOGUE.get(payload.category)
    if not plan:
        raise HTTPException(status_code=400, detail="Unknown membership category.")

    email = payload.email.strip()
    phone = re.sub(r"[^0-9]", "", payload.phone)
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=400, detail="Enter a valid e-mail address.")
    if not PHONE_RE.match(phone):
        raise HTTPException(status_code=400, detail="Enter a valid phone number.")

    # Razorpay caps receipt at 40 characters.
    receipt = f"BAI-{payload.category}-{int(datetime.datetime.now().timestamp())}"[:40]
    order = gateway_create_order(
        amount_paise=plan["amount_paise"],
        receipt=receipt,
        notes={
            "category": plan["label"],
            "applicant": payload.applicant_name.strip()[:200],
            "centre": "BAI Pune Centre",
        },
    )

    applicant = {
        "applicant_name": payload.applicant_name.strip(),
        "contact_person": payload.contact_person.strip(),
        "email": email,
        "phone": phone,
    }

    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """INSERT INTO membership_payments
           (order_id, category, amount_paise, applicant, status, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?, ?)""",
        (
            order["id"],
            payload.category,
            plan["amount_paise"],
            json.dumps(applicant),
            "created",
            _now(),
            _now(),
        ),
    )
    conn.commit()
    conn.close()

    return {
        "order_id": order["id"],
        "amount_paise": plan["amount_paise"],
        "currency": "INR",
        "key_id": _key_id(),
        "category_label": plan["label"],
        "receipt": receipt,
        "prefill": {"name": applicant["applicant_name"], "email": email, "contact": phone},
    }


@router.post("/verify")
def verify_payment(payload: VerifyIn):
    if not _payments_enabled():
        raise HTTPException(status_code=503, detail="Online payment is not configured.")

    if not signature_is_valid(
        payload.razorpay_order_id, payload.razorpay_payment_id, payload.razorpay_signature
    ):
        conn = sqlite3.connect(DB_PATH)
        # Never downgrade an order that has already been paid.
        conn.execute(
            """UPDATE membership_payments SET status = ?, updated_at = ?
               WHERE order_id = ? AND status != 'paid'""",
            ("signature_failed", _now(), payload.razorpay_order_id),
        )
        conn.commit()
        conn.close()
        raise HTTPException(status_code=400, detail="Payment signature verification failed.")

    row = _mark_paid(payload.razorpay_order_id, payload.razorpay_payment_id)
    if not row:
        raise HTTPException(status_code=404, detail="Unknown order.")

    return {
        "status": "paid",
        "payment_id": row["payment_id"],
        "order_id": payload.razorpay_order_id,
        "category": SUBSCRIPTION_CATALOGUE.get(row["category"], {}).get("label", row["category"]),
        "amount_display": _inr(row["amount_paise"]),
    }


def _mark_paid(order_id, payment_id):
    """Flip a membership order to 'paid' once a signature has verified. Returns
    the row as a dict, or None for an unknown order. Idempotent, because the
    checkout handler and the webhook both report the same payment."""
    conn = sqlite3.connect(DB_PATH)
    row = conn.execute(
        "SELECT category, amount_paise, payment_id, status FROM membership_payments WHERE order_id = ?",
        (order_id,),
    ).fetchone()
    if not row:
        conn.close()
        return None

    category, amount_paise, existing_payment, status = row
    if status == "paid" and existing_payment:
        payment_id = existing_payment

    conn.execute(
        "UPDATE membership_payments SET payment_id = ?, status = ?, updated_at = ? WHERE order_id = ?",
        (payment_id, "paid", _now(), order_id),
    )
    conn.commit()
    conn.close()
    return {"category": category, "amount_paise": amount_paise, "payment_id": payment_id}


# Events that mean the money has been taken. With payment_capture=1 on the order
# Razorpay captures automatically, so both arrive for a successful payment.
PAID_EVENTS = {"payment.captured", "order.paid"}


@router.post("/webhook")
async def razorpay_webhook(request: Request, x_razorpay_signature: str = Header(default="")):
    """Server-to-server confirmation from Razorpay.

    The browser's /verify call is the fast path, but it never happens if the
    payer closes the tab or loses connection after paying. This webhook closes
    that gap for both membership and sponsorship orders.

    Configure it in Razorpay Dashboard > Settings > Webhooks with the URL
    https://<site>/api/payments/webhook, the events payment.captured and
    order.paid, and the same secret as RAZORPAY_WEBHOOK_SECRET.
    """
    if not webhook_secret():
        raise HTTPException(status_code=503, detail="Webhook is not configured.")

    raw_body = await request.body()
    if not webhook_signature_is_valid(raw_body, x_razorpay_signature):
        raise HTTPException(status_code=400, detail="Invalid webhook signature.")

    try:
        event = json.loads(raw_body)
    except ValueError:
        raise HTTPException(status_code=400, detail="Malformed webhook body.") from None

    if event.get("event") not in PAID_EVENTS:
        # Acknowledge anything else so Razorpay does not keep retrying it.
        return {"status": "ignored"}

    payment = (event.get("payload") or {}).get("payment", {}).get("entity") or {}
    order_id = payment.get("order_id")
    payment_id = payment.get("id")
    if not order_id or not payment_id:
        return {"status": "ignored"}

    if _mark_paid(order_id, payment_id) or sponsors.mark_paid(order_id, payment_id):
        return {"status": "paid"}
    # Not one of ours (e.g. a payment made directly from the dashboard).
    return {"status": "ignored"}
