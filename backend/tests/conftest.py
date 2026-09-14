"""Shared fixtures: every test gets its own throwaway SQLite file and a clean
Razorpay environment, so nothing touches data/submissions.db or the network."""

import sqlite3

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from routers import payments, sponsors, submissions

LIVE_KEY_ID = "rzp_live_unittest"
LIVE_KEY_SECRET = "unittest_secret"
WEBHOOK_SECRET = "unittest_webhook_secret"


@pytest.fixture(autouse=True)
def no_razorpay_credentials(monkeypatch):
    """Start every test with payments unconfigured, whatever backend/.env holds."""
    monkeypatch.delenv("RAZORPAY_KEY_ID", raising=False)
    monkeypatch.delenv("RAZORPAY_KEY_SECRET", raising=False)
    monkeypatch.delenv("RAZORPAY_WEBHOOK_SECRET", raising=False)


@pytest.fixture
def db_path(tmp_path, monkeypatch):
    path = str(tmp_path / "submissions.db")
    monkeypatch.setattr(payments, "DB_PATH", path)
    monkeypatch.setattr(sponsors, "DB_PATH", path)
    monkeypatch.setattr(sponsors, "LOGO_DIR", str(tmp_path / "sponsor_logos"))
    monkeypatch.setattr(submissions, "DB_PATH", path)
    payments._init_db()
    sponsors._init_db()
    submissions._init_db()
    return path


@pytest.fixture
def query(db_path):
    def run(sql, params=()):
        conn = sqlite3.connect(db_path)
        try:
            return conn.execute(sql, params).fetchall()
        finally:
            conn.close()

    return run


@pytest.fixture
def client(db_path):
    app = FastAPI()
    app.include_router(payments.router)
    app.include_router(sponsors.router)
    app.include_router(submissions.router)
    return TestClient(app)


@pytest.fixture
def live_keys(monkeypatch):
    """Configure real-looking (non-placeholder) credentials."""
    monkeypatch.setenv("RAZORPAY_KEY_ID", LIVE_KEY_ID)
    monkeypatch.setenv("RAZORPAY_KEY_SECRET", LIVE_KEY_SECRET)


@pytest.fixture
def fake_razorpay(monkeypatch):
    """Stub the outbound Razorpay order call and record what was sent."""
    calls = []

    def fake_create_order(amount_paise, receipt, notes):
        calls.append({"amount_paise": amount_paise, "receipt": receipt, "notes": notes})
        return {"id": f"order_fake_{len(calls)}", "amount": amount_paise, "status": "created"}

    monkeypatch.setattr(payments, "gateway_create_order", fake_create_order)
    monkeypatch.setattr(sponsors, "create_order", fake_create_order)
    return calls
