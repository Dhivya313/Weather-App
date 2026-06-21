from fastapi import APIRouter, Query, HTTPException
from app.services.weather_service import weather_service
from app.schemas.weather import CurrentWeather, WeatherForecast
from app.utils.error_handler import WeatherAPIError
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/weather", tags=["weather"])


@router.get("/city", response_model=dict)
async def get_weather_by_city(
    city: str = Query(..., min_length=1, description="City name"),
    unit: str = Query("metric", regex="^(metric|imperial)$", description="Temperature unit")
):
    """
    Get current weather by city name
    
    - **city**: City name (e.g., Chennai, London, New York)
    - **unit**: Temperature unit - "metric" (°C) or "imperial" (°F)
    
    Returns:
    - Current temperature, feels-like, min/max
    - Weather condition
    - Humidity, wind speed, pressure, visibility
    """
    try:
        weather_data = await weather_service.get_current_weather_by_city(city, unit)
        return {
            "success": True,
            "data": weather_data,
            "message": f"Weather data for {city}"
        }
    except WeatherAPIError as e:
        logger.error(f"Weather API Error: {e.message}")
        raise HTTPException(
            status_code=e.status_code,
            detail={"error": e.message, "success": False}
        )
    except Exception as e:
        logger.error(f"Unexpected error in get_weather_by_city: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": "Internal server error", "success": False}
        )


@router.get("/location", response_model=dict)
async def get_weather_by_location(
    lat: float = Query(..., ge=-90, le=90, description="Latitude"),
    lon: float = Query(..., ge=-180, le=180, description="Longitude"),
    unit: str = Query("metric", regex="^(metric|imperial)$", description="Temperature unit")
):
    """
    Get current weather by GPS coordinates
    
    - **lat**: Latitude (-90 to 90)
    - **lon**: Longitude (-180 to 180)
    - **unit**: Temperature unit - "metric" (°C) or "imperial" (°F)
    
    Returns:
    - Current temperature, feels-like, min/max
    - Weather condition
    - Humidity, wind speed, pressure, visibility
    """
    try:
        weather_data = await weather_service.get_current_weather_by_coordinates(lat, lon, unit)
        return {
            "success": True,
            "data": weather_data,
            "message": f"Weather data for {lat}, {lon}"
        }
    except WeatherAPIError as e:
        logger.error(f"Weather API Error: {e.message}")
        raise HTTPException(
            status_code=e.status_code,
            detail={"error": e.message, "success": False}
        )
    except Exception as e:
        logger.error(f"Unexpected error in get_weather_by_location: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": "Internal server error", "success": False}
        )


@router.get("/forecast", response_model=dict)
async def get_forecast(
    city: str = Query(..., min_length=1, description="City name"),
    unit: str = Query("metric", regex="^(metric|imperial)$", description="Temperature unit")
):
    """
    Get 5-day weather forecast by city name
    
    - **city**: City name (e.g., Chennai, London, New York)
    - **unit**: Temperature unit - "metric" (°C) or "imperial" (°F)
    
    Returns:
    - 5-day forecast with daily min/max temperatures
    - Weather condition for each day
    - Precipitation, humidity, wind speed
    """
    try:
        forecast_data = await weather_service.get_forecast(city, unit)
        return {
            "success": True,
            "data": forecast_data,
            "message": f"5-day forecast for {city}"
        }
    except WeatherAPIError as e:
        logger.error(f"Weather API Error: {e.message}")
        raise HTTPException(
            status_code=e.status_code,
            detail={"error": e.message, "success": False}
        )
    except Exception as e:
        logger.error(f"Unexpected error in get_forecast: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail={"error": "Internal server error", "success": False}
        )


@router.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Weather API",
        "version": "1.0.0"
    }
