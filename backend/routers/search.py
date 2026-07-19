from fastapi import APIRouter, Query
from typing import Optional
from data.content import CENTRES_DATA

router = APIRouter()

@router.get("/api/search")
def search_centres(keyword: Optional[str] = Query(None), city_id: Optional[str] = Query(None)):
    results = []
    kw = keyword.lower().strip() if keyword else ""
    city = city_id.lower().strip() if city_id else ""
    
    for region in CENTRES_DATA.get("regions", []):
        for state in region.get("states", []):
            for centre in state.get("centres", []):
                centre_name = centre.get("name", "").lower()
                centre_slug = centre.get("slug", "").lower()
                state_name = state.get("name", "").lower()
                region_name = region.get("name", "").lower()
                
                matches_keyword = not kw or (kw in centre_name or kw in centre_slug or kw in state_name or kw in region_name)
                matches_city = not city or (city in centre_name or city in centre_slug)
                
                if matches_keyword and matches_city:
                    results.append({
                        "name": centre.get("name"),
                        "slug": centre.get("slug"),
                        "state": state.get("name"),
                        "region": region.get("name")
                    })
                    
    return {"results": results}
