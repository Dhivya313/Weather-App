from fastapi import APIRouter
from app.api import weather

# Create main router
router = APIRouter()

# Include sub-routers
router.include_router(weather.router)


@router.get("/")
async def root():
    """Root API endpoint"""
    return {
        "message": "Weather API - Phase 3 Backend",
        "version": "1.0.0",
        "endpoints": {
            "weather_by_city": "/api/weather/city?city=Chennai&unit=metric",
            "weather_by_location": "/api/weather/location?lat=13.0827&lon=80.2707&unit=metric",
            "forecast": "/api/weather/forecast?city=Chennai&unit=metric",
            "health": "/api/weather/health"
        }
    }
