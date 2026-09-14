"""Shared Razorpay helpers used by both the membership and sponsorship flows."""

import hashlib
import hmac
import io
import json
import urllib.error

import pytest
from fastapi import HTTPException

import razorpay_gateway as gateway
from tests.conftest import LIVE_KEY_SECRET


@pytest.mark.parametrize(
    ("paise", "expected"),
    [
        (0, "0"),
        (99, "0"),
        (50000, "500"),
        (408700, "4,087"),
        (2970000, "29,700"),
        (36580000, "3,65,800"),
        (1234567800, "1,23,45,678"),
    ],
)
def test_inr_uses_indian_digit_grouping(paise, expected):
    assert gateway.inr(paise) == expected


def test_payments_enabled_needs_both_credentials(monkeypatch):
    assert gateway.payments_enabled() is False
    monkeypatch.setenv("RAZORPAY_KEY_ID", "rzp_live_x")
    assert gateway.payments_enabled() is False
    monkeypatch.setenv("RAZORPAY_KEY_SECRET", "   ")
    assert gateway.payments_enabled() is False
    monkeypatch.setenv("RAZORPAY_KEY_SECRET", "secret")
    assert gateway.payments_enabled() is True


def test_signature_is_valid_accepts_correct_hmac(live_keys):
    good = hmac.new(LIVE_KEY_SECRET.encode(), b"order_1|pay_1", hashlib.sha256).hexdigest()

    assert gateway.signature_is_valid("order_1", "pay_1", good) is True
    assert gateway.signature_is_valid("order_1", "pay_2", good) is False
    assert gateway.signature_is_valid("order_1", "pay_1", "0" * 64) is False


@pytest.mark.parametrize("key_id", ["rzp_live_x", "rzp_test_baionline", "rzp_test_demo"])
def test_signature_is_valid_has_no_test_shortcut(monkeypatch, key_id):
    # Both /verify routes trust this check alone: a magic signature or key id
    # that skips the HMAC would let anyone mark an order paid.
    monkeypatch.setenv("RAZORPAY_KEY_ID", key_id)
    monkeypatch.setenv("RAZORPAY_KEY_SECRET", LIVE_KEY_SECRET)

    assert gateway.signature_is_valid("order_1", "pay_1", "test_signature") is False
    assert gateway.signature_is_valid("order_1", "pay_1", "") is False


def test_create_order_placeholder_key_still_calls_razorpay(monkeypatch):
    monkeypatch.setenv("RAZORPAY_KEY_ID", "rzp_test_baionline")
    monkeypatch.setenv("RAZORPAY_KEY_SECRET", LIVE_KEY_SECRET)
    calls = []

    def fake_urlopen(request, timeout):
        calls.append(request.full_url)
        return FakeResponse(b'{"id": "order_from_razorpay"}')

    monkeypatch.setattr(gateway.urllib.request, "urlopen", fake_urlopen)

    assert gateway.create_order(100, "r", {}) == {"id": "order_from_razorpay"}
    assert calls == [gateway.RAZORPAY_ORDERS_URL]


class FakeResponse(io.BytesIO):
    def __enter__(self):
        return self

    def __exit__(self, *exc):
        return False


def test_create_order_posts_server_amount_with_basic_auth(live_keys, monkeypatch):
    sent = {}

    def fake_urlopen(request, timeout):
        sent["url"] = request.full_url
        sent["auth"] = request.get_header("Authorization")
        sent["body"] = json.loads(request.data)
        return FakeResponse(b'{"id": "order_live_1"}')

    monkeypatch.setattr(gateway.urllib.request, "urlopen", fake_urlopen)

    order = gateway.create_order(408700, "BAI-annual-1", {"category": "Annual"})

    assert order == {"id": "order_live_1"}
    assert sent["url"] == gateway.RAZORPAY_ORDERS_URL
    assert sent["auth"].startswith("Basic ")
    assert sent["body"]["amount"] == 408700
    assert sent["body"]["currency"] == "INR"


def test_create_order_hides_upstream_error_body(live_keys, monkeypatch):
    def fake_urlopen(request, timeout):
        raise urllib.error.HTTPError(
            request.full_url, 401, "Unauthorized", {}, io.BytesIO(b"key rzp_live_x invalid")
        )

    monkeypatch.setattr(gateway.urllib.request, "urlopen", fake_urlopen)

    with pytest.raises(HTTPException) as exc:
        gateway.create_order(100, "r", {})

    assert exc.value.status_code == 502
    assert "rzp_live" not in exc.value.detail


def test_create_order_maps_network_failure_to_502(live_keys, monkeypatch):
    def fake_urlopen(request, timeout):
        raise urllib.error.URLError("timed out")

    monkeypatch.setattr(gateway.urllib.request, "urlopen", fake_urlopen)

    with pytest.raises(HTTPException) as exc:
        gateway.create_order(100, "r", {})

    assert exc.value.status_code == 502
