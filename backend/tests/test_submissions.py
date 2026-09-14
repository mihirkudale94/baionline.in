"""Generic form submissions: POST /api/submissions."""

import json

import pytest


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
