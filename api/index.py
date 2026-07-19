import os
import sys

# Vercel bundles this file's directory; add backend/ so `from routers import ...`
# inside main.py resolves the same way it does when run locally with uvicorn.
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "backend"))

from main import app  # noqa: E402

__all__ = ["app"]
