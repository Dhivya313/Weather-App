# 🚀 PHASE 3: Backend Foundation - Implementation Plan

## 📋 Overview

**Phase 3** establishes the backend server that will power your frontend weather application. This phase focuses on creating a FastAPI backend that connects to OpenWeatherMap API and serves weather data to the React frontend.

---

## ✅ Phase 3 Deliverables

### 1. **Backend Project Structure**
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app entry point
│   ├── config.py               # Configuration settings
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   ├── weather.py          # Weather endpoints
│   │   └── routes.py           # All API routes
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   └── weather_service.py  # OpenWeatherMap integration
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── weather.py          # Response schemas
│   │
│   └── utils/
│       ├── __init__.py
│       └── error_handler.py    # Error handling utilities
│
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore file
└── README.md                  # Backend documentation
```

### 2. **API Endpoints** (3 core endpoints)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/weather/city` | GET | Get weather by city name |
| `/api/weather/location` | GET | Get weather by GPS coordinates (lat, lon) |
| `/api/weather/forecast` | GET | Get 5-day forecast for a location |

#### Endpoint Details:

**1. GET /api/weather/city**
```
Query Parameters:
  - city (string): City name (e.g., "Chennai")
  - unit (string): "metric" or "imperial"

Response:
{
  "city": "Chennai",
  "country": "India",
  "temperature": 34.5,
  "feels_like": 37.2,
  "condition": "Cloudy",
  "humidity": 65,
  "wind_speed": 3.5,
  "pressure": 1013,
  "visibility": 10,
  "temp_min": 30.1,
  "temp_max": 36.8
}
```

**2. GET /api/weather/location**
```
Query Parameters:
  - lat (float): Latitude (e.g., 13.0827)
  - lon (float): Longitude (e.g., 80.2707)
  - unit (string): "metric" or "imperial"

Response: [Same as above]
```

**3. GET /api/weather/forecast**
```
Query Parameters:
  - city (string): City name
  - unit (string): "metric" or "imperial"

Response:
{
  "city": "Chennai",
  "forecast": [
    {
      "date": "2026-06-20",
      "day": "Friday",
      "temp_min": 30.1,
      "temp_max": 36.8,
      "condition": "Cloudy",
      "precipitation": 15.5,
      "humidity": 65,
      "wind_speed": 3.5
    },
    ... (5 days total)
  ]
}
```

### 3. **Technologies & Dependencies**

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Framework | FastAPI 0.104+ | Modern Python web framework |
| Async Server | Uvicorn | ASGI server for FastAPI |
| HTTP Client | httpx | Async HTTP requests |
| Environment | python-dotenv | Load .env variables |
| CORS | fastapi.middleware.cors | Cross-Origin Resource Sharing |
| Validation | pydantic | Data validation |
| Weather API | OpenWeatherMap | Real weather data source |

### 4. **Key Features**

✅ **Weather API Integration**
- Connect to OpenWeatherMap API
- Hide API key in backend (.env)
- Handle API errors gracefully
- Parse and format weather data

✅ **Error Handling**
- Invalid city name → 404 with friendly message
- API key issues → 500 error
- Rate limits → 429 error
- Invalid coordinates → 400 error

✅ **Unit Conversion**
- Metric (°C, m/s, km) 
- Imperial (°F, mph, miles)
- Temperature conversion functions
- Distance conversion functions

✅ **CORS Configuration**
- Allow requests from localhost:3000 (frontend)
- Proper header handling
- Security-conscious setup

✅ **Environment Configuration**
- OpenWeatherMap API key from .env
- Development vs production settings
- Port configuration (8000)

### 5. **Testing Infrastructure**

After implementation, you'll be able to:
- Test endpoints using Postman or curl
- Verify weather data accuracy
- Test error scenarios
- Validate response formats

Example test commands:
```bash
# Test by city
curl "http://localhost:8000/api/weather/city?city=Chennai&unit=metric"

# Test by location
curl "http://localhost:8000/api/weather/location?lat=13.0827&lon=80.2707&unit=metric"

# Test forecast
curl "http://localhost:8000/api/weather/forecast?city=Chennai&unit=metric"
```

---

## 🏗️ Implementation Steps

### Step 1: Create Backend Directory Structure
- Create `backend/` folder in WeatherApp root
- Create all subdirectories (app/, api/, services/, schemas/, utils/)
- Create `__init__.py` files for Python modules

### Step 2: Create Core Backend Files
- `app/main.py` - FastAPI application setup
- `app/config.py` - Configuration settings
- `app/api/routes.py` - All API endpoints
- `app/api/weather.py` - Weather endpoint handlers
- `app/services/weather_service.py` - OpenWeatherMap integration
- `app/schemas/weather.py` - Response data models

### Step 3: Create Support Files
- `app/utils/error_handler.py` - Error handling utilities
- `requirements.txt` - Python dependencies
- `.env.example` - Environment variable template
- `.gitignore` - Git ignore configuration
- `README.md` - Backend documentation

### Step 4: Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### Step 5: Configure Environment
- Copy `.env.example` to `.env`
- Add OpenWeatherMap API key
- Set backend port to 8000

### Step 6: Start Backend Server
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Step 7: Test All 3 Endpoints
- Test weather by city
- Test weather by GPS coordinates
- Test forecast endpoint
- Verify error handling

### Step 8: Verify Frontend Integration
- Frontend already configured to call `http://localhost:8000/api`
- Test that frontend can fetch real weather data
- Verify all features work end-to-end

---

## 📊 Expected Outcomes

After Phase 3 completion:

✅ Backend server running on `http://localhost:8000`  
✅ 3 API endpoints fully functional  
✅ OpenWeatherMap API integrated  
✅ Real weather data flowing to frontend  
✅ Error handling for invalid inputs  
✅ CORS properly configured  
✅ Environment variables secured  
✅ Complete API documentation  

**Result**: Frontend and Backend fully integrated and communicating!

---

## 🔄 Integration with Frontend

The frontend (Phase 2) is already configured to work with this backend:

**Frontend Configuration (from Phase 2):**
```javascript
// frontend/src/services/weatherApi.js
const API_BASE_URL = 'http://localhost:8000/api'

// This will call your Phase 3 backend endpoints:
- getCurrentWeatherByCity(city, unit)
- getCurrentWeatherByCoords(lat, lon, unit)  
- getForecast(city, unit)
```

Once Phase 3 backend is running, all frontend features will work with real data!

---

## 📈 Phase Progress

```
Phase 1: Requirement Finalization ✅ COMPLETE
Phase 2: Frontend Foundation       ✅ COMPLETE (Now Running!)
Phase 3: Backend Foundation        ⏳ READY TO START
Phase 4: GPS and Forecast          ⏬ Coming Next
Phase 5: Database Integration      ⏬ Coming Next
Phase 6: User Features             ⏬ Coming Next
Phase 7: AI Enhancement            ⏬ Coming Next
```

---

## ✋ What Happens Next?

Once you approve this plan, I will:

1. **Create complete backend project structure** with all directories
2. **Implement FastAPI application** with proper configuration
3. **Build 3 API endpoints** ready for OpenWeatherMap integration
4. **Set up error handling** for various failure scenarios
5. **Configure CORS** for frontend communication
6. **Create environment setup** with .env template
7. **Generate API documentation** and usage examples
8. **Test all endpoints** to ensure they work correctly

**Timeline**: ~30-45 minutes for complete implementation

---

## ❓ Prerequisites

Before starting Phase 3, you need:

✅ **OpenWeatherMap API Key** (Get free key at https://openweathermap.org)
  - Sign up for free account
  - Copy API key
  - We'll add it to `.env` file

✅ **Python 3.9+** installed on your system
  - Check with: `python --version`

✅ **pip** package manager
  - Check with: `pip --version`

---

## 🎯 Ready to Proceed?

Please confirm:

**"APPROVED - Proceed to Phase 3"**

Or if you have any questions, ask before we start!

---

**Your Frontend is Already Running!** 🎉

- Backend server: (Not yet started)
- Frontend server: ✅ http://localhost:3000 (RUNNING)
- Need: Phase 3 Backend to connect the dots!

