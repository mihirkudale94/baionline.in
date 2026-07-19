from fastapi import APIRouter
from data.content import (
    HERO_SLIDES, STATS, LEADERSHIP, CENTRES_DATA, NAV_LINKS, FOOTER_DATA, 
    ABOUT_CONTENT, CONTACT_DATA, TRUSTEES, COMMITTEES, PAST_PRESIDENTS,
    ANNOUNCEMENTS, EVENTS, NEWS_TICKER, INDIAN_CONSTRUCTION
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

@router.get("/api/centres")
def get_centres():
    return CENTRES_DATA

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

@router.get("/api/trustees")
def get_trustees():
    return TRUSTEES

@router.get("/api/committees")
def get_committees():
    return COMMITTEES

@router.get("/api/past-presidents")
def get_past_presidents():
    return PAST_PRESIDENTS

