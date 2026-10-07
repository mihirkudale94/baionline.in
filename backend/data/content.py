"""Site copy served by routers/pages.py.

The text itself lives in data/site-content/*.json. Those files are the single
source: frontend/src/services/api.js imports the same files for its offline
fallback, so an edit there reaches both the API and the fallback. Edit the
JSON, not this module.
"""

import json
import os

CONTENT_DIR = os.path.join(os.path.dirname(__file__), "site-content")


def _load(name):
    with open(os.path.join(CONTENT_DIR, f"{name}.json"), encoding="utf-8") as handle:
        return json.load(handle)


# Hero carousel — the Pune Centre's own photographs: the state meeting and
# the awards night. "caption" is shown under the headline as the slide
# changes; "alt" is never displayed, it is read by screen readers and search
# engines only.
HERO_SLIDES = _load("hero-slides")

STATS = _load("stats")
LEADERSHIP = _load("leadership")

# The navbar renders from this list (via api.js) and the API returns it too.
NAV_LINKS = _load("nav-links")

FOOTER_DATA = _load("footer-data")
ABOUT_CONTENT = _load("about-content")
CONTACT_DATA = _load("contact-data")

# Executive Committee 2026-27, exactly as declared in the Centre's
# "Constitution of Committees for the Year 2026-27" circular. The circular
# lists 24 members and names no office bearers; the office bearers live in
# LEADERSHIP and are shown on the Team page.
EXECUTIVE_COMMITTEE = _load("executive-committee")

# The circular's preamble and its seven general guidelines, verbatim.
COMMITTEE_GUIDELINES = _load("committee-guidelines")

# Committees and their members, exactly as listed in the circular.
#
# Spellings are reproduced per location, as the circular prints them. It is
# internally inconsistent for four people, so the same person appears under
# two spellings — that is intentional, not a typo:
#   Ashok Ashtekar (SIP)       vs Ashok Atkekar (EC #6)
#   D. S. Chaudhari (Audit)    vs D. S. Choudhari (EC #8)
#   Manikrao Halbe (Grievance) vs Manikram Halbe (EC #20)
#   Shivdutta Patane (Seminar) / Shivdatt Patane (WBSC, Diary)
#                              / Shivdatta Patane (EC #2)
# Only the circular's missing word-spaces were closed up (JyotiChoughule ->
# Jyoti Choughule). Confirm with the Centre before unifying any of these.
COMMITTEES = _load("committees")

# Complete list of 57 past chairmen from 1941 to 2026
PAST_PRESIDENTS = _load("past-presidents")

# BAI Pune Centre's own honour roll, transcribed from the office bearer display
# boards at the Centre. The first three roles are Head Quarters (national) posts
# held by Pune Centre members; the rest are Centre-level posts. Chairman and Hon.
# Secretary come from two boards each — "1941-2011: 70 years" and the 2012-2027
# board — though the 70-year boards only start recording names from 1959.
# Vice Chairman and Treasurer have no display board yet, so they stay empty and
# render an "records being compiled" state on /past-presidents.
PUNE_OFFICE_BEARERS = _load("pune-office-bearers")

# Commemorative plaque for the Centre's Platinum Jubilee (1941-2015), listing the
# office bearers of that year plus the celebration's organising committee.
PLATINUM_JUBILEE_2015 = _load("platinum-jubilee-2015")

ANNOUNCEMENTS = _load("announcements")
EVENTS = _load("events")
NEWS_TICKER = _load("news-ticker")
INDIAN_CONSTRUCTION = _load("indian-construction")

# "stats" (impact figures) render beside the overview; add only numbers BAI can
# source ({"value", "label"}). Empty hides the block.
# "gallery" is deliberately empty: the photo gallery lives in
# backend/data/social_gallery/ and is read from there per request (see
# routers/gallery.py), so this list is only a seed for an empty photo folder.
SOCIAL_ACTIVITIES_DATA = _load("social-activities-data")
