from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import sqlite3
import os
import json
import datetime

router = APIRouter(prefix="/api", tags=["submissions"])

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "submissions.db")


def _init_db():
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            form_type TEXT NOT NULL,
            payload TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
        """
    )
    conn.commit()
    conn.close()


_init_db()


class SubmissionIn(BaseModel):
    form_type: str
    data: dict


@router.post("/submissions")
def create_submission(sub: SubmissionIn):
    if not sub.form_type or not sub.data:
        raise HTTPException(status_code=400, detail="form_type and data are required")
    conn = sqlite3.connect(DB_PATH)
    conn.execute(
        "INSERT INTO submissions (form_type, payload, created_at) VALUES (?, ?, ?)",
        (sub.form_type, json.dumps(sub.data), datetime.datetime.utcnow().isoformat()),
    )
    conn.commit()
    conn.close()
    return {"status": "ok"}
