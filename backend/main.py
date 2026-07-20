from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from routers import pages, search, chat, submissions
from dotenv import load_dotenv
import os

# Load backend-only secrets before handling any API requests.
load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))

app = FastAPI(title="BAI Backend API")

# Explicit origin allowlist: wildcard origins combined with credentials are
# rejected by browsers and expose the API to any site. Extend via env if needed.
allowed_origins = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,https://baionline.in,https://www.baionline.in",
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)

# Include API Routers first
app.include_router(pages.router)
app.include_router(search.router)
app.include_router(chat.router)
app.include_router(submissions.router)

# Mount frontend assets if built
frontend_dist = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))
assets_dir = os.path.join(frontend_dist, "assets")
images_dir = os.path.join(frontend_dist, "images")

if os.path.exists(assets_dir):
    app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
if os.path.exists(images_dir):
    app.mount("/images", StaticFiles(directory=images_dir), name="images")

@app.get("/favicon.ico")
def serve_favicon():
    fav = os.path.join(frontend_dist, "favicon.ico")
    if os.path.exists(fav):
        return FileResponse(fav)


# Catch-all to serve index.html for React Router (Single Page App)
@app.get("/{catchall:path}")
def serve_react_app(catchall: str):
    if catchall.startswith("api"):
        return {"error": "API route not found"}
        
    index_file = os.path.join(frontend_dist, "index.html")
    if os.path.exists(index_file):
        return FileResponse(index_file)
        
    return {"message": "Welcome to BAI Backend API. Frontend build not found. Run 'npm run build' in frontend directory."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
