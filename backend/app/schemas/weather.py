from pydantic import BaseModel
from typing import List, Optional


class CurrentWeather(BaseModel):
    """Current weather response schema"""
    
    city: str
    country: str
    temperature: float
    feels_like: float
    temp_min: float
    temp_max: float
    condition: str
    humidity: int
    wind_speed: float
    pressure: int
    visibility: int


class ForecastDay(BaseModel):
    """Single day forecast schema"""
    
    date: str
    day: str
    temp_min: float
    temp_max: float
    condition: str
    precipitation: float
    humidity: int
    wind_speed: float


class WeatherForecast(BaseModel):
    """5-day weather forecast response schema"""
    
    city: str
    country: str
    forecast: List[ForecastDay]


class SuccessResponse(BaseModel):
    """Generic success response schema"""
    
    data: Optional[dict] = None
    message: str = "Success"
    success: bool = True


class ErrorResponse(BaseModel):
    """Generic error response schema"""
    
    error: str
    success: bool = False
