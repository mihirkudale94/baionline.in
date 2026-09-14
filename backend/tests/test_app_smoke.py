"""The real app must import with every router wired in."""

import importlib
import sys


def test_main_app_registers_payment_and_submission_routes(monkeypatch):
    # Keep backend/.env out of the test process.
    monkeypatch.setattr("dotenv.load_dotenv", lambda *args, **kwargs: None)
    monkeypatch.delitem(sys.modules, "main", raising=False)

    main = importlib.import_module("main")

    paths = {route.path for route in main.app.routes}
    assert {
        "/api/payments/config",
        "/api/payments/order",
        "/api/payments/verify",
        "/api/submissions",
    } <= paths
