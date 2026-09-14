"""Social Activities photo gallery, driven by a folder instead of by code.

Whatever image files sit in backend/data/social_gallery/ are the gallery. Add a
photo by copying it into that folder; remove one by deleting it. Nothing has to
be edited, rebuilt or redeployed for the change to show up — the folder is read
on each request.

    backend/data/social_gallery/
        captions.json                  <- optional, see below
        dharna-andolan-2025-1.jpg
        dharna-andolan-2025-2.jpg

captions.json gives a photo its caption, and optionally its position and crop.
Both spellings work, so a plain caption needs no nesting:

    {
      "dharna-andolan-2025-1.jpg": "Dharna Andolan at the Collector's Office",
      "dharna-andolan-2025-2.jpg": {
        "caption": "Members at the Dharna Andolan",
        "order": 2,
        "focal": "center 25%"
      }
    }

A photo with no entry still appears — its caption is derived from the filename,
which is why filenames are worth writing in words. Photos carrying an `order`
come first, lowest first; the rest follow in filename order.

The files live under backend/data/ rather than in the frontend's public folder
because that folder is a build input: anything dropped there is lost the next
time the frontend is built. `focal` is passed through to CSS object-position,
for photos whose subject the default centre crop cuts off.
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import Response
import json
import os

router = APIRouter(prefix="/api/social-activities", tags=["gallery"])

PHOTO_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "social_gallery")
CAPTIONS_FILE = os.path.join(PHOTO_DIR, "captions.json")

# Raster formats only. An SVG is a script-carrying document, and these files are
# served from our own origin — a hostile <script> inside one would run as us.
PHOTO_TYPES = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
}


def _caption_map():
    """captions.json as a dict, or {} if it is absent or unreadable.

    A broken captions file must not take the gallery down with it: the photos
    are still there, and a filename-derived caption is better than a 500.
    """
    try:
        with open(CAPTIONS_FILE, encoding="utf-8") as handle:
            loaded = json.load(handle)
    except (OSError, ValueError):
        return {}
    return loaded if isinstance(loaded, dict) else {}


def _caption_from_filename(filename):
    """'dharna-andolan-2025-1.jpg' -> 'Dharna Andolan 2025 1'."""
    stem = os.path.splitext(filename)[0]
    return " ".join(word.capitalize() for word in stem.replace("_", "-").split("-") if word)


def photo_filenames():
    """Image files sitting directly in the photo folder, in filename order."""
    try:
        entries = os.listdir(PHOTO_DIR)
    except OSError:
        return []

    return sorted(
        name
        for name in entries
        if os.path.splitext(name)[1].lower() in PHOTO_TYPES
        and os.path.isfile(os.path.join(PHOTO_DIR, name))
    )


def list_photos():
    """The gallery, in the shape the Social Activities page already renders."""
    captions = _caption_map()
    photos = []

    for position, name in enumerate(photo_filenames()):
        entry = captions.get(name)
        if isinstance(entry, str):
            entry = {"caption": entry}
        elif not isinstance(entry, dict):
            entry = {}

        photo = {
            "src": f"/api/social-activities/photos/{name}",
            "caption": str(entry.get("caption") or _caption_from_filename(name)),
        }
        if entry.get("focal"):
            photo["focal"] = str(entry["focal"])

        # Ordered photos sort ahead of unordered ones; within each group the
        # filename order established above is kept.
        try:
            rank = (0, float(entry["order"]), position)
        except (KeyError, TypeError, ValueError):
            rank = (1, 0.0, position)

        photos.append((rank, photo))

    return [photo for _rank, photo in sorted(photos, key=lambda item: item[0])]


@router.get("/photos")
def social_gallery():
    """PUBLIC. The gallery on its own, for anything that wants just the photos.

    The Social Activities page itself does not call this — /api/social-activities
    already carries the same list under `gallery`.
    """
    return list_photos()


@router.get("/photos/{filename}")
def social_gallery_photo(filename: str):
    """PUBLIC. Serves one photo out of the folder.

    Only names the scan actually returned are served, so a '../' or a request
    for captions.json cannot reach anything: the name has to be an image file
    sitting directly in the folder.
    """
    if filename not in photo_filenames():
        raise HTTPException(status_code=404, detail="No such photo.")

    path = os.path.join(PHOTO_DIR, filename)
    try:
        with open(path, "rb") as handle:
            blob = handle.read()
    except OSError:
        raise HTTPException(status_code=404, detail="No such photo.") from None

    return Response(
        content=blob,
        media_type=PHOTO_TYPES[os.path.splitext(filename)[1].lower()],
        headers={
            "Cache-Control": "public, max-age=3600",
            "X-Content-Type-Options": "nosniff",
        },
    )
