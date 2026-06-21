from fastapi.responses import JSONResponse
from fastapi import status


class WeatherAPIError(Exception):
    """Custom exception for weather API errors"""
    
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


async def handle_weather_api_error(request, exc: WeatherAPIError):
    """Global exception handler for weather API errors"""
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": exc.message,
            "success": False
        }
    )


def create_error_response(message: str, status_code: int = 500) -> dict:
    """Create a standardized error response"""
    return {
        "error": message,
        "success": False
    }


def create_success_response(data: dict = None, message: str = "Success") -> dict:
    """Create a standardized success response"""
    return {
        "data": data,
        "message": message,
        "success": True
    }
