# WBSC 2019 ceremony photographs

Drop the ten ceremony frames here using these exact names — the page reads them
from `wbscGalleryData` in `frontend/src/services/api.js`:

    wbsc-2019-01.webp  ...  wbsc-2019-10.webp

`wbsc-2019-10.webp` is the full group photo of all winners and is the lead
tile of the gallery, so give that one the most care when cropping. (The banner
band at the top of the page runs off `heroSrc`, which currently points at a
WBSC 2025 frame in `frontend/public/images/events/`.)

Before uploading, resize to roughly 1600px on the long edge and convert to
WebP at ~80% quality. The originals are ~2000px JPEGs and ten of them at full
size add several MB to a page that also loads the Razorpay payment modal.

    # one-liner if ImageMagick is installed
    magick input.jpg -resize 1600x -quality 80 wbsc-2019-01.webp

Any file that is missing is dropped from the page automatically (the tile is
removed and the banner falls back to its "coming soon" placeholder), so the
page stays clean while the set is being assembled.
