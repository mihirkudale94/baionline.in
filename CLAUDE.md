# baionline.in

Builders Association of India (BAI) web portal: React + Vite frontend (`frontend/`), FastAPI backend (`backend/`).

Backend dev tools: `backend/.venv/Scripts/python.exe -m pip install -r backend/requirements-dev.txt`.
`npm run check` from the repo root runs ruff, pytest, eslint and the Vite build.

## Health Stack

- typecheck: cd frontend && npm run build  (Vite build; catches broken imports. No TS/mypy in this repo)
- lint: cd backend && .venv/Scripts/python.exe -m ruff check . && cd ../frontend && npm run lint
- test: cd backend && .venv/Scripts/python.exe -m pytest
- deadcode: cd frontend && npx knip
- shell: none (no .sh files)
