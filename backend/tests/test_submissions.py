"""Generic form submissions: POST /api/submissions."""

import json
import urllib.error

import pytest

from routers import submissions

from .conftest import GOOD_CAPTCHA_TOKEN


def test_submission_is_stored_with_its_payload(client, query):
    data = {"name": "Priya", "email": "priya@example.com", "message": "Membership enquiry"}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
    [(form_type, payload, created_at)] = query(
        "SELECT form_type, payload, created_at FROM submissions"
    )
    assert form_type == "contact"
    assert json.loads(payload) == data
    assert created_at


def test_each_submission_gets_its_own_row(client, query):
    for i in range(3):
        client.post("/api/submissions", json={"form_type": "contact", "data": {"n": i}})

    assert query("SELECT COUNT(*) FROM submissions") == [(3,)]


def test_unicode_payload_round_trips(client, query):
    data = {"name": "राहुल", "city": "पुणे"}

    client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert json.loads(query("SELECT payload FROM submissions")[0][0]) == data


@pytest.mark.parametrize(
    "body",
    [
        {"form_type": "", "data": {"name": "x"}},
        {"form_type": "contact", "data": {}},
    ],
)
def test_empty_form_type_or_data_is_rejected(client, query, body):
    assert client.post("/api/submissions", json=body).status_code == 400
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


@pytest.mark.parametrize(
    "body",
    [
        {"data": {"name": "x"}},
        {"form_type": "contact"},
        {"form_type": "contact", "data": "not an object"},
        {"form_type": "contact", "data": ["a", "b"]},
    ],
)
def test_malformed_body_is_rejected(client, query, body):
    assert client.post("/api/submissions", json=body).status_code == 422
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_oversized_field_is_rejected(client, query):
    data = {"message": "x" * (submissions.MAX_VALUE_CHARS + 1)}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 400
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_too_many_fields_is_rejected(client, query):
    data = {f"f{i}": "x" for i in range(submissions.MAX_FIELDS + 1)}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 400
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_oversized_payload_is_rejected(client, query):
    # Each field is within the per-field cap, but together they overflow.
    per_field = submissions.MAX_VALUE_CHARS
    fields = submissions.MAX_PAYLOAD_CHARS // per_field + 1
    data = {f"f{i}": "x" * per_field for i in range(fields)}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 413
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_rate_limit_blocks_a_flood_from_one_address(client, query):
    body = {"form_type": "contact", "data": {"name": "bot"}}
    for _ in range(submissions.RATE_LIMIT_MAX):
        assert client.post("/api/submissions", json=body).status_code == 200

    assert client.post("/api/submissions", json=body).status_code == 429
    assert query("SELECT COUNT(*) FROM submissions") == [(submissions.RATE_LIMIT_MAX,)]


def test_rate_limit_is_per_address(client, query):
    body = {"form_type": "contact", "data": {"name": "bot"}}
    for _ in range(submissions.RATE_LIMIT_MAX):
        client.post("/api/submissions", json=body)

    other = client.post(
        "/api/submissions", json=body, headers={"X-Forwarded-For": "203.0.113.9"}
    )

    assert other.status_code == 200


def test_captcha_token_is_never_stored(client, query):
    data = {"name": "Priya", "recaptcha_token": "whatever"}

    assert client.post("/api/submissions", json={"form_type": "contact", "data": data}).status_code == 200
    assert json.loads(query("SELECT payload FROM submissions")[0][0]) == {"name": "Priya"}


def test_submission_without_a_secret_needs_no_token(client, query):
    body = {"form_type": "contact", "data": {"name": "Priya"}}

    assert client.post("/api/submissions", json=body).status_code == 200
    assert query("SELECT COUNT(*) FROM submissions") == [(1,)]


def test_configured_captcha_accepts_a_good_token(client, query, recaptcha_configured):
    data = {"name": "Priya", "recaptcha_token": GOOD_CAPTCHA_TOKEN}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 200
    assert recaptcha_configured == [GOOD_CAPTCHA_TOKEN]
    assert json.loads(query("SELECT payload FROM submissions")[0][0]) == {"name": "Priya"}


def test_configured_captcha_rejects_a_bad_token(client, query, recaptcha_configured):
    data = {"name": "bot", "recaptcha_token": "forged"}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 400
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_configured_captcha_requires_a_token(client, query, recaptcha_configured):
    response = client.post("/api/submissions", json={"form_type": "contact", "data": {"name": "bot"}})

    assert response.status_code == 400
    assert recaptcha_configured == []
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_unreachable_captcha_service_fails_closed(client, query, recaptcha_configured, monkeypatch):
    def unreachable(token):
        raise urllib.error.URLError("no route to host")

    monkeypatch.setattr(submissions, "_recaptcha_accepted", unreachable)
    data = {"name": "Priya", "recaptcha_token": GOOD_CAPTCHA_TOKEN}

    response = client.post("/api/submissions", json={"form_type": "contact", "data": data})

    assert response.status_code == 503
    assert query("SELECT COUNT(*) FROM submissions") == [(0,)]


def test_forms_without_a_widget_are_not_asked_for_a_token(client, query, recaptcha_configured):
    """Only CAPTCHA_FORM_TYPES render the widget; the rest must keep working."""
    other = {"form_type": "brochure_request", "data": {"name": "Priya"}}

    assert client.post("/api/submissions", json=other).status_code == 200
    assert recaptcha_configured == []
    assert query("SELECT COUNT(*) FROM submissions") == [(1,)]
