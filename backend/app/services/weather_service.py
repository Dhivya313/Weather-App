import httpx
import logging
from typing import Dict, Optional
from datetime import datetime
from app.config import settings
from app.utils.error_handler import WeatherAPIError

logger = logging.getLogger(__name__)


class WeatherService:
    """Service to handle OpenWeatherMap API integration"""
    
    def __init__(self):
        self.base_url = settings.OPENWEATHER_BASE_URL
        self.api_key = settings.OPENWEATHER_API_KEY
        self.timeout = settings.REQUEST_TIMEOUT
    
    async def get_current_weather_by_city(
        self, 
        city: str, 
        unit: str = "metric"
    ) -> Dict:
        """
        Get current weather by city name
        
        Args:
            city: City name (e.g., "Chennai")
            unit: Temperature unit - "metric" (°C) or "imperial" (°F)
        
        Returns:
            Dictionary with current weather data
        
        Raises:
            WeatherAPIError: If city not found or API error occurs
        """
        try:
            url = f"{self.base_url}/weather"
            params = {
                "q": city,
                "appid": self.api_key,
                "units": unit
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
            
            if response.status_code == 404:
                raise WeatherAPIError(
                    f"City '{city}' not found. Please check the city name and try again.",
                    status_code=404
                )
            
            if response.status_code == 401:
                raise WeatherAPIError(
                    "Invalid API key. Please contact the administrator.",
                    status_code=401
                )
            
            if response.status_code == 429:
                raise WeatherAPIError(
                    "Too many requests. Please try again later.",
                    status_code=429
                )
            
            if response.status_code != 200:
                raise WeatherAPIError(
                    f"Failed to fetch weather data. Status: {response.status_code}",
                    status_code=response.status_code
                )
            
            data = response.json()
            return self._parse_current_weather(data, unit)
        
        except httpx.RequestError as e:
            logger.error(f"Network error fetching weather: {str(e)}")
            raise WeatherAPIError(
                "Network error. Please check your internet connection.",
                status_code=503
            )
        except WeatherAPIError:
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise WeatherAPIError(
                "An unexpected error occurred. Please try again later.",
                status_code=500
            )
    
    async def get_current_weather_by_coordinates(
        self,
        lat: float,
        lon: float,
        unit: str = "metric"
    ) -> Dict:
        """
        Get current weather by latitude and longitude
        
        Args:
            lat: Latitude coordinate
            lon: Longitude coordinate
            unit: Temperature unit - "metric" (°C) or "imperial" (°F)
        
        Returns:
            Dictionary with current weather data
        
        Raises:
            WeatherAPIError: If coordinates invalid or API error occurs
        """
        try:
            # Validate coordinates
            if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
                raise WeatherAPIError(
                    "Invalid coordinates. Latitude must be between -90 and 90, "
                    "Longitude between -180 and 180.",
                    status_code=400
                )
            
            url = f"{self.base_url}/weather"
            params = {
                "lat": lat,
                "lon": lon,
                "appid": self.api_key,
                "units": unit
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
            
            if response.status_code != 200:
                raise WeatherAPIError(
                    "Failed to fetch weather data for these coordinates.",
                    status_code=response.status_code
                )
            
            data = response.json()
            return self._parse_current_weather(data, unit)
        
        except httpx.RequestError as e:
            logger.error(f"Network error fetching weather: {str(e)}")
            raise WeatherAPIError(
                "Network error. Please check your internet connection.",
                status_code=503
            )
        except WeatherAPIError:
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise WeatherAPIError(
                "An unexpected error occurred. Please try again later.",
                status_code=500
            )
    
    async def get_forecast(
        self,
        city: str,
        unit: str = "metric"
    ) -> Dict:
        """
        Get 5-day weather forecast
        
        Args:
            city: City name
            unit: Temperature unit - "metric" (°C) or "imperial" (°F)
        
        Returns:
            Dictionary with 5-day forecast data
        
        Raises:
            WeatherAPIError: If city not found or API error occurs
        """
        try:
            url = f"{self.base_url}/forecast"
            params = {
                "q": city,
                "appid": self.api_key,
                "units": unit,
                "cnt": 40  # 5 days * 8 forecasts per day (3-hour intervals)
            }
            
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)
            
            if response.status_code == 404:
                raise WeatherAPIError(
                    f"City '{city}' not found. Please check the city name and try again.",
                    status_code=404
                )
            
            if response.status_code != 200:
                raise WeatherAPIError(
                    f"Failed to fetch forecast data. Status: {response.status_code}",
                    status_code=response.status_code
                )
            
            data = response.json()
            return self._parse_forecast(data, unit)
        
        except httpx.RequestError as e:
            logger.error(f"Network error fetching forecast: {str(e)}")
            raise WeatherAPIError(
                "Network error. Please check your internet connection.",
                status_code=503
            )
        except WeatherAPIError:
            raise
        except Exception as e:
            logger.error(f"Unexpected error: {str(e)}")
            raise WeatherAPIError(
                "An unexpected error occurred. Please try again later.",
                status_code=500
            )
    
    def _parse_current_weather(self, data: dict, unit: str) -> Dict:
        """Parse OpenWeatherMap current weather response"""
        try:
            return {
                "city": data.get("name", "Unknown"),
                "country": data.get("sys", {}).get("country", "Unknown"),
                "latitude": data.get("coord", {}).get("lat", 0),
                "longitude": data.get("coord", {}).get("lon", 0),
                "temperature": round(data.get("main", {}).get("temp", 0), 1),
                "feels_like": round(data.get("main", {}).get("feels_like", 0), 1),
                "temp_min": round(data.get("main", {}).get("temp_min", 0), 1),
                "temp_max": round(data.get("main", {}).get("temp_max", 0), 1),
                "condition": data.get("weather", [{}])[0].get("main", "Unknown"),
                "description": data.get("weather", [{}])[0].get("description", ""),
                "humidity": data.get("main", {}).get("humidity", 0),
                "wind_speed": round(data.get("wind", {}).get("speed", 0), 2),
                "pressure": data.get("main", {}).get("pressure", 0),
                "visibility": data.get("visibility", 0),
                "unit": "°C" if unit == "metric" else "°F"
            }
        except Exception as e:
            logger.error(f"Error parsing weather data: {str(e)}")
            raise WeatherAPIError("Error processing weather data", status_code=500)
    
    def _parse_forecast(self, data: dict, unit: str) -> Dict:
        """Parse OpenWeatherMap forecast response"""
        try:
            forecast_list = data.get("list", [])
            
            # Group forecasts by day
            daily_forecasts = {}
            
            for item in forecast_list:
                timestamp = item.get("dt", 0)
                date = datetime.fromtimestamp(timestamp).strftime("%Y-%m-%d")
                day = datetime.fromtimestamp(timestamp).strftime("%A")
                
                if date not in daily_forecasts:
                    daily_forecasts[date] = {
                        "date": date,
                        "day": day,
                        "temps": [],
                        "condition": item.get("weather", [{}])[0].get("main", "Unknown"),
                        "precipitation": item.get("rain", {}).get("3h", 0),
                        "humidity": item.get("main", {}).get("humidity", 0),
                        "wind_speed": item.get("wind", {}).get("speed", 0),
                    }
                
                temp = item.get("main", {}).get("temp", 0)
                daily_forecasts[date]["temps"].append(temp)
            
            # Format forecast list (first 5 days)
            forecast = []
            for i, (date, day_data) in enumerate(list(daily_forecasts.items())[:5]):
                temps = day_data["temps"]
                forecast.append({
                    "date": date,
                    "day": day_data["day"],
                    "temp_min": round(min(temps), 1),
                    "temp_max": round(max(temps), 1),
                    "condition": day_data["condition"],
                    "precipitation": round(day_data["precipitation"], 1),
                    "humidity": day_data["humidity"],
                    "wind_speed": round(day_data["wind_speed"], 2),
                })
            
            return {
                "city": data.get("city", {}).get("name", "Unknown"),
                "country": data.get("city", {}).get("country", "Unknown"),
                "forecast": forecast,
                "unit": "°C" if unit == "metric" else "°F"
            }
        except Exception as e:
            logger.error(f"Error parsing forecast data: {str(e)}")
            raise WeatherAPIError("Error processing forecast data", status_code=500)


# Create a singleton instance
weather_service = WeatherService()
