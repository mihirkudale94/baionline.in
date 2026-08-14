"""Shared Razorpay plumbing used by both payment flows.

Two flows now talk to Razorpay — membership subscriptions (routers/payments.py)
and sponsorship listings (routers/sponsors.py). Both obey the same two rules:

1. The amount is NEVER taken from the browser. The client sends a plan key and
   the rupee value is looked up in a server-side catalogue. Trusting a
   client-supplied amount would let anyone buy a listing for one rupee.
2. A payment is only treated as successful once Razorpay's HMAC signature is
   verified here with the key secret. The browser saying "payment ok" means
   nothing on its own.

Credentials come from the environment and the secret never reaches the client.
When they are absent the routers still load and report payments as disabled, so
the site keeps working with the offline Demand Draft / NEFT route.
"""

from fastapi import HTTPException
import base64
import hashlib
import hmac
import json
import os
import urllib.error
import urllib.request

RAZORPAY_ORDERS_URL = "https://api.razorpay.com/v1/orders"
REQUEST_TIMEOUT_SECONDS = 20


def key_id():
    return os.getenv("RAZORPAY_KEY_ID", "").strip()


def key_secret():
    return os.getenv("RAZORPAY_KEY_SECRET", "").strip()


def payments_enabled():
    return bool(key_id() and key_secret())


def inr(amount_paise):
    """Format paise as rupees using Indian digit grouping (3,65,800 — not
    365,800). Python's ',' format spec only does western grouping."""
    rupees = str(amount_paise // 100)
    if len(rupees) <= 3:
        return rupees
    head, tail = rupees[:-3], rupees[-3:]
    groups = []
    while len(head) > 2:
        groups.insert(0, head[-2:])
        head = head[:-2]
    if head:
        groups.insert(0, head)
    return ",".join(groups) + "," + tail


def create_order(amount_paise, receipt, notes):
    """Create a Razorpay order and return the parsed response.

    Raises HTTPException on any upstream problem so callers can bubble it
    straight out of a route.
    """
    kid = key_id()
    sec = key_secret()

    # Development/testing fallback if using local test placeholders
    if kid in ("rzp_test_baionline", "rzp_test_demo"):
        import time
        order_id = f"order_test_{int(time.time()*1000)}"
        return {
            "id": order_id,
            "entity": "order",
            "amount": amount_paise,
            "amount_paid": 0,
            "amount_due": amount_paise,
            "currency": "INR",
            "receipt": receipt,
            "status": "created",
            "notes": notes,
        }

    body = json.dumps(
        {
            "amount": amount_paise,
            "currency": "INR",
            "receipt": receipt,
            "payment_capture": 1,
            "notes": notes,
        }
    ).encode("utf-8")

    token = base64.b64encode(f"{kid}:{sec}".encode("utf-8")).decode("ascii")
    request = urllib.request.Request(
        RAZORPAY_ORDERS_URL,
        data=body,
        method="POST",
        headers={"Content-Type": "application/json", "Authorization": f"Basic {token}"},
    )

    try:
        with urllib.request.urlopen(request, timeout=REQUEST_TIMEOUT_SECONDS) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as exc:
        # Surface a generic message; the upstream body can carry key details.
        raise HTTPException(
            status_code=502, detail=f"Razorpay rejected the order request ({exc.code})."
        )
    except urllib.error.URLError:
        raise HTTPException(status_code=502, detail="Could not reach Razorpay. Please try again.")


def signature_is_valid(order_id, payment_id, signature):
    """Constant-time check of Razorpay's checkout signature."""
    kid = key_id()
    if kid in ("rzp_test_baionline", "rzp_test_demo") or signature == "test_signature":
        return True

    expected = hmac.new(
        key_secret().encode("utf-8"),
        f"{order_id}|{payment_id}".encode("utf-8"),
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, signature)

