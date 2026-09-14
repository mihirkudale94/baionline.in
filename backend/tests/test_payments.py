"""Membership payment flow: /api/payments/config, /order and /verify."""

import hashlib
import hmac
import json

import pytest

from routers.payments import SUBSCRIPTION_CATALOGUE
from tests.conftest import LIVE_KEY_ID, LIVE_KEY_SECRET, WEBHOOK_SECRET

VALID_ORDER = {
    "category": "annual",
    "applicant_name": "Acme Builders Pvt Ltd",
    "contact_person": "R. Sharma",
    "email": "accounts@acme.example",
    "phone": "9876543210",
}


def sign(order_id, payment_id, secret=LIVE_KEY_SECRET):
    return hmac.new(
        secret.encode("utf-8"), f"{order_id}|{payment_id}".encode("utf-8"), hashlib.sha256
    ).hexdigest()


def place_order(client, **overrides):
    return client.post("/api/payments/order", json={**VALID_ORDER, **overrides})


# --- /config ---------------------------------------------------------------


def test_config_lists_every_catalogue_category_with_indian_grouping(client, live_keys):
    body = client.get("/api/payments/config").json()

    assert body["currency"] == "INR"
    assert body["key_id"] == LIVE_KEY_ID
    by_id = {c["id"]: c for c in body["categories"]}
    assert set(by_id) == set(SUBSCRIPTION_CATALOGUE)
    assert by_id["corporate"]["amount_paise"] == 36580000
    assert by_id["corporate"]["amount_display"] == "3,65,800"


def test_config_never_exposes_the_key_secret(client, live_keys):
    assert LIVE_KEY_SECRET not in client.get("/api/payments/config").text


def test_config_reports_disabled_without_credentials(client):
    body = client.get("/api/payments/config").json()

    assert body["enabled"] is False
    assert body["key_id"] == ""


# --- /order ----------------------------------------------------------------


def test_order_is_refused_when_payments_are_not_configured(client, fake_razorpay):
    response = place_order(client)

    assert response.status_code == 503
    assert fake_razorpay == []


def test_order_rejects_unknown_category(client, live_keys, fake_razorpay):
    response = place_order(client, category="lifetime-free")

    assert response.status_code == 400
    assert fake_razorpay == []


@pytest.mark.parametrize("email", ["not-an-email", "user@localhost", "has space@x.com"])
def test_order_rejects_invalid_email(client, live_keys, fake_razorpay, email):
    assert place_order(client, email=email).status_code == 400
    assert fake_razorpay == []


def test_order_rejects_phone_with_too_few_digits(client, live_keys, fake_razorpay):
    # Passes the 10-char length check but only has 9 digits once punctuation is stripped.
    assert place_order(client, phone="98765-4321").status_code == 400
    assert fake_razorpay == []


def test_order_rejects_missing_required_fields(client, live_keys):
    assert client.post("/api/payments/order", json={"category": "annual"}).status_code == 422


def test_order_amount_comes_from_catalogue_not_client(client, live_keys, fake_razorpay, query):
    response = place_order(client, category="corporate", amount_paise=100)

    assert response.status_code == 200
    assert response.json()["amount_paise"] == 36580000
    assert fake_razorpay[0]["amount_paise"] == 36580000
    assert query("SELECT amount_paise FROM membership_payments") == [(36580000,)]


def test_order_records_created_row_with_normalised_phone(client, live_keys, fake_razorpay, query):
    response = place_order(client, phone="+91 98765-43210", email="  accounts@acme.example ")

    assert response.status_code == 200
    body = response.json()
    assert body["order_id"] == "order_fake_1"
    assert body["key_id"] == LIVE_KEY_ID
    assert body["prefill"] == {
        "name": "Acme Builders Pvt Ltd",
        "email": "accounts@acme.example",
        "contact": "919876543210",
    }
    assert len(body["receipt"]) <= 40

    [(order_id, category, status, applicant)] = query(
        "SELECT order_id, category, status, applicant FROM membership_payments"
    )
    assert (order_id, category, status) == ("order_fake_1", "annual", "created")
    assert json.loads(applicant)["phone"] == "919876543210"


# --- /verify ---------------------------------------------------------------


def verify(client, order_id, payment_id, signature):
    return client.post(
        "/api/payments/verify",
        json={
            "razorpay_order_id": order_id,
            "razorpay_payment_id": payment_id,
            "razorpay_signature": signature,
        },
    )


def test_verify_is_refused_when_payments_are_not_configured(client):
    assert verify(client, "order_x", "pay_x", "sig").status_code == 503


def test_verify_marks_order_paid_on_valid_signature(client, live_keys, fake_razorpay, query):
    order_id = place_order(client, category="patron").json()["order_id"]

    response = verify(client, order_id, "pay_123", sign(order_id, "pay_123"))

    assert response.status_code == 200
    assert response.json() == {
        "status": "paid",
        "payment_id": "pay_123",
        "order_id": order_id,
        "category": "Patron Membership",
        "amount_display": "29,700",
    }
    assert query("SELECT payment_id, status FROM membership_payments") == [("pay_123", "paid")]


def test_verify_rejects_tampered_signature_and_flags_order(client, live_keys, fake_razorpay, query):
    order_id = place_order(client).json()["order_id"]
    # Signature for a different payment id must not validate this one.
    forged = sign(order_id, "pay_other")

    response = verify(client, order_id, "pay_123", forged)

    assert response.status_code == 400
    assert query("SELECT payment_id, status FROM membership_payments") == [
        (None, "signature_failed")
    ]


def test_verify_rejects_signature_made_with_wrong_secret(client, live_keys, fake_razorpay, query):
    order_id = place_order(client).json()["order_id"]

    response = verify(client, order_id, "pay_123", sign(order_id, "pay_123", secret="guess"))

    assert response.status_code == 400
    assert query("SELECT status FROM membership_payments") == [("signature_failed",)]


def test_verify_unknown_order_returns_404(client, live_keys):
    assert verify(client, "order_nope", "pay_1", sign("order_nope", "pay_1")).status_code == 404


def test_verify_rejects_test_signature_backdoor_with_live_keys(
    client, live_keys, fake_razorpay, query
):
    order_id = place_order(client).json()["order_id"]

    response = verify(client, order_id, "pay_fake", "test_signature")

    assert response.status_code == 400
    assert query("SELECT status FROM membership_payments") == [("signature_failed",)]


def test_wbsc_entry_is_charged_the_circular_fee(client, live_keys, fake_razorpay):
    # Rs 25,000 + 18% GST. It used to go through the "annual" plan at Rs 4,087.
    response = place_order(client, category="wbsc_entry")

    assert response.status_code == 200
    assert fake_razorpay[0]["amount_paise"] == 2950000
    assert response.json()["category_label"] == "WBSC 2026 Competition Entry Fee"


def test_bad_signature_does_not_downgrade_a_paid_order(client, live_keys, fake_razorpay, query):
    order_id = place_order(client).json()["order_id"]
    assert verify(client, order_id, "pay_123", sign(order_id, "pay_123")).status_code == 200

    assert verify(client, order_id, "pay_123", "0" * 64).status_code == 400
    assert query("SELECT payment_id, status FROM membership_payments") == [("pay_123", "paid")]


def test_verify_rejects_non_ascii_signature_without_crashing(client, live_keys, fake_razorpay):
    order_id = place_order(client).json()["order_id"]

    assert verify(client, order_id, "pay_123", "ßignature").status_code == 400


# --- /webhook --------------------------------------------------------------


@pytest.fixture
def webhook_secret(monkeypatch):
    monkeypatch.setenv("RAZORPAY_WEBHOOK_SECRET", WEBHOOK_SECRET)


def send_webhook(client, event, order_id, payment_id, secret=WEBHOOK_SECRET):
    body = json.dumps(
        {
            "event": event,
            "payload": {"payment": {"entity": {"id": payment_id, "order_id": order_id}}},
        }
    ).encode("utf-8")
    signature = hmac.new(secret.encode("utf-8"), body, hashlib.sha256).hexdigest()
    return client.post(
        "/api/payments/webhook",
        content=body,
        headers={"Content-Type": "application/json", "X-Razorpay-Signature": signature},
    )


def test_webhook_is_refused_without_a_secret(client, live_keys, fake_razorpay):
    order_id = place_order(client).json()["order_id"]

    assert send_webhook(client, "payment.captured", order_id, "pay_1").status_code == 503


def test_webhook_marks_membership_paid_when_browser_never_verified(
    client, live_keys, webhook_secret, fake_razorpay, query
):
    order_id = place_order(client).json()["order_id"]

    response = send_webhook(client, "payment.captured", order_id, "pay_hook")

    assert response.json() == {"status": "paid"}
    assert query("SELECT payment_id, status FROM membership_payments") == [("pay_hook", "paid")]


def test_webhook_marks_sponsorship_paid(client, live_keys, webhook_secret, fake_razorpay, query):
    order_id = client.post(
        "/api/sponsors/order",
        json={
            "tier": "bronze",
            "company_name": "Acme Builders",
            "email": "a@acme.example",
            "phone": "9876543210",
        },
    ).json()["order_id"]

    assert send_webhook(client, "order.paid", order_id, "pay_sp").json() == {"status": "paid"}
    [(status, token)] = query("SELECT status, upload_token FROM sponsors")
    assert status == "paid" and token


def test_webhook_rejects_forged_signature(client, live_keys, webhook_secret, fake_razorpay, query):
    order_id = place_order(client).json()["order_id"]

    response = send_webhook(client, "payment.captured", order_id, "pay_1", secret="guess")

    assert response.status_code == 400
    assert query("SELECT status FROM membership_payments") == [("created",)]


def test_webhook_ignores_other_events(client, live_keys, webhook_secret, fake_razorpay, query):
    order_id = place_order(client).json()["order_id"]

    assert send_webhook(client, "payment.failed", order_id, "pay_1").json() == {"status": "ignored"}
    assert query("SELECT status FROM membership_payments") == [("created",)]


def test_webhook_and_checkout_verify_agree_on_one_payment(
    client, live_keys, webhook_secret, fake_razorpay, query
):
    order_id = place_order(client).json()["order_id"]
    send_webhook(client, "payment.captured", order_id, "pay_same")

    response = verify(client, order_id, "pay_same", sign(order_id, "pay_same"))

    assert response.status_code == 200
    assert query("SELECT payment_id, status FROM membership_payments") == [("pay_same", "paid")]
