# Phase 1: API Provider Setup Guide

## OpenWeatherMap API Setup

### Step 1: Create Account

1. Go to https://openweathermap.org/
2. Click **Sign Up** in the top right
3. Fill in your details:
   - Email address
   - Password (8+ characters)
   - Accept Terms
4. Click **Create Account**
5. Verify your email address

### Step 2: Generate API Key

1. Log in to your account
2. Go to **Account** → **API Keys** (or directly: https://openweathermap.org/api)
3. You'll see a default API key generated
4. Copy this API key (e.g., `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)
5. Keep it safe - you'll need it for the backend

### Step 3: Available API Endpoints (Free Tier)

The free tier includes:

#### Current Weather
```
GET https://api.openweathermap.org/data/2.5/weather
?q={city}&appid={API_KEY}&units=metric
```

**Response Example:**
```json
{
  "coord": {"lon": 80.2707, "lat": 13.0827},
  "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds"}],
  "main": {
    "temp": 34.5,
    "feels_like": 37.2,
    "temp_min": 30.1,
    "temp_max": 36.8,
    "pressure": 1013,
    "humidity": 65
  },
  "visibility": 10000,
  "wind": {"speed": 3.5, "deg": 180},
  "clouds": {"all": 75},
  "dt": 1686480000,
  "sys": {
    "sunrise": 1686456300,
    "sunset": 1686502920,
    "country": "IN"
  },
  "timezone": 19800,
  "id": 1174872,
  "name": "Chennai",
  "cod": 200
}
```

#### 5-Day Forecast
```
GET https://api.openweathermap.org/data/2.5/forecast
?q={city}&appid={API_KEY}&units=metric
```

**Response Example:**
```json
{
  "cod": "200",
  "message": 0,
  "cnt": 40,
  "list": [
    {
      "dt": 1686480000,
      "main": {
        "temp": 34.5,
        "feels_like": 37.2,
        "temp_min": 30.1,
        "temp_max": 36.8,
        "pressure": 1013,
        "humidity": 65
      },
      "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds"}],
      "clouds": {"all": 75},
      "wind": {"speed": 3.5, "deg": 180},
      "visibility": 10000,
      "pop": 0.2,
      "sys": {"pod": "d"},
      "dt_txt": "2023-06-11 12:00:00"
    },
    // ... more forecasts at 3-hour intervals
  ],
  "city": {
    "id": 1174872,
    "name": "Chennai",
    "coord": {"lat": 13.0827, "lon": 80.2707},
    "country": "IN",
    "population": 4646732,
    "timezone": 19800,
    "sunrise": 1686456300,
    "sunset": 1686502920
  }
}
```

#### By Coordinates (GPS)
```
GET https://api.openweathermap.org/data/2.5/weather
?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric
```

### Step 4: Rate Limits (Free Tier)

- **API Calls**: 1,000,000 per month
- **Per Minute**: 60 calls per minute
- **Concurrent**: 5 concurrent requests

### Step 5: Verify API Key

Test your API key with curl or Postman:

```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Chennai&appid=YOUR_API_KEY&units=metric"
```

Expected response: 200 OK with weather data

### Step 6: Store API Key Securely

**DO NOT commit API key to GitHub!**

Create a `.env` file in backend root:
```
WEATHER_API_KEY=your_actual_api_key_here
```

Add `.env` to `.gitignore`:
```
.env
.env.local
*.env
```

---

## Weather Icon Mapping

OpenWeatherMap provides weather condition codes. Map them to icons:

| Code | Condition | Icon | Color |
|------|-----------|------|-------|
| 200-232 | Thunderstorm | ⚡ | #FF6B00 |
| 300-321 | Drizzle | 🌧️ | #0099FF |
| 500-531 | Rain | 🌧️ | #0099FF |
| 600-622 | Snow | ❄️ | #87CEEB |
| 701-781 | Mist/Fog | 🌫️ | #A9A9A9 |
| 800 | Clear Sky | ☀️ | #FFD700 |
| 801 | Few Clouds | ⛅ | #FFA500 |
| 802 | Scattered Clouds | ☁️ | #B0C4DE |
| 803 | Broken Clouds | ☁️ | #696969 |
| 804 | Overcast | ☁️ | #4F4F4F |

---

## Backend Integration

### Installation

```bash
pip install requests python-dotenv
```

### Sample Backend Code (FastAPI)

```python
# backend/services/weather_service.py
import os
import requests
from dotenv import load_dotenv

load_dotenv()

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")
BASE_URL = "https://api.openweathermap.org/data/2.5"

def get_current_weather(city: str, unit: str = "metric"):
    """Fetch current weather by city name"""
    url = f"{BASE_URL}/weather"
    params = {
        "q": city,
        "appid": WEATHER_API_KEY,
        "units": unit
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_forecast(city: str, unit: str = "metric"):
    """Fetch 5-day forecast by city name"""
    url = f"{BASE_URL}/forecast"
    params = {
        "q": city,
        "appid": WEATHER_API_KEY,
        "units": unit
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()

def get_weather_by_coords(lat: float, lon: float, unit: str = "metric"):
    """Fetch current weather by coordinates"""
    url = f"{BASE_URL}/weather"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": WEATHER_API_KEY,
        "units": unit
    }
    
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()
```

---

## Common Issues & Solutions

### Issue 1: "Invalid API Key" Error
**Solution**: 
- Verify API key is correct (check for extra spaces)
- Ensure API key is activated (check email confirmation)
- Wait 10 minutes after account creation for activation

### Issue 2: 429 Too Many Requests
**Solution**:
- Implement request caching (10 minute TTL)
- Add rate limiting on backend
- Batch requests where possible

### Issue 3: 401 Unauthorized
**Solution**:
- Check WEATHER_API_KEY environment variable is set
- Verify .env file is being loaded
- Restart application after changing .env

### Issue 4: Slow Response Times
**Solution**:
- Cache responses at backend
- Use CDN for static assets
- Consider upgrading to paid tier if needed

---

## Alternative Weather APIs (If Needed)

### WeatherAPI.com
- Free tier: 1M calls/month
- Endpoint: `https://api.weatherapi.com/v1/current.json`
- Setup: Similar to OpenWeatherMap

### Weather.gov (US Only)
- No API key required
- Free and reliable
- Limited to US locations

### Weatherstack
- Free tier: 250 calls/month
- Enterprise option available
- Historical data available

**For this project, OpenWeatherMap is recommended due to:**
- Global coverage
- Reliable uptime (99.9%)
- Comprehensive documentation
- Good free tier
- Regular updates

---

## Phase 1 Completion Checklist

- [x] Requirements finalized
- [x] User stories written
- [x] Feature list created
- [x] Wireframes designed
- [x] API provider selected (OpenWeatherMap)
- [x] API key generation guide created
- [x] Backend integration sample code provided
- [ ] **PENDING**: Team approval of all Phase 1 deliverables
- [ ] **PENDING**: API keys obtained and stored securely

---

**Next Steps**: 
After Phase 1 approval, proceed to **Phase 2: Frontend Foundation**

**Estimated Phase 1 Duration**: 1-2 weeks for team review and approval

