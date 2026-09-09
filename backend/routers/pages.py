from fastapi import APIRouter
from routers.gallery import list_photos
from data.content import (
    HERO_SLIDES, STATS, LEADERSHIP, NAV_LINKS, FOOTER_DATA,
    ABOUT_CONTENT, CONTACT_DATA, COMMITTEES, COMMITTEE_GUIDELINES,
    EXECUTIVE_COMMITTEE, PAST_PRESIDENTS,
    PUNE_OFFICE_BEARERS, PLATINUM_JUBILEE_2015, ANNOUNCEMENTS, EVENTS,
    NEWS_TICKER, INDIAN_CONSTRUCTION, SOCIAL_ACTIVITIES_DATA
)

router = APIRouter()

@router.get("/api/home")
def get_home():
    return {
        "hero_slides": HERO_SLIDES,
        "stats": STATS,
        "leadership": LEADERSHIP,
        "nav_links": NAV_LINKS,
        "footer": FOOTER_DATA,
        "announcements": ANNOUNCEMENTS,
        "events": EVENTS,
        "news_ticker": NEWS_TICKER,
        "indian_construction": INDIAN_CONSTRUCTION
    }


@router.get("/api/about")
def get_about():
    return ABOUT_CONTENT

@router.get("/api/contact")
def get_contact():
    return CONTACT_DATA

@router.get("/api/navigation")
def get_navigation():
    return {
        "nav_links": NAV_LINKS,
        "footer": FOOTER_DATA
    }

@router.get("/api/team")
def get_team():
    return LEADERSHIP

@router.get("/api/committees")
def get_committees():
    return COMMITTEES

@router.get("/api/committee-guidelines")
def get_committee_guidelines():
    return COMMITTEE_GUIDELINES

@router.get("/api/executive-committee")
def get_executive_committee():
    return EXECUTIVE_COMMITTEE

@router.get("/api/past-presidents")
def get_past_presidents():
    return PAST_PRESIDENTS

@router.get("/api/pune-office-bearers")
def get_pune_office_bearers():
    return {**PUNE_OFFICE_BEARERS, "platinum_jubilee": PLATINUM_JUBILEE_2015}

@router.get("/api/social-activities")
def get_social_activities():
    # The photo gallery comes from backend/data/social_gallery/ (see
    # routers/gallery.py), so photos can be added without a code change. The
    # list in content.py is the seed used only while that folder is empty.
    photos = list_photos()
    if not photos:
        return SOCIAL_ACTIVITIES_DATA
    return {**SOCIAL_ACTIVITIES_DATA, "gallery": photos}

