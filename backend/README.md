# 🌤️ Weather API Backend - Phase 3

Advanced Weather Web Application Backend built with **FastAPI** and **OpenWeatherMap API**.

## 📋 Overview

This is the backend server for the Advanced Weather Web Application. It provides RESTful API endpoints for weather data, forecast, and location-based weather retrieval.

**Features:**
- ✅ Get weather by city name
- ✅ Get weather by GPS coordinates (latitude, longitude)
- ✅ Get 5-day weather forecast
- ✅ Temperature unit conversion (Celsius ↔ Fahrenheit)
- ✅ Error handling with user-friendly messages
- ✅ CORS support for frontend communication
- ✅ Comprehensive API documentation

---

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- pip (Python package manager)
- OpenWeatherMap API Key (provided: `e88edff10aa3156efab4a7bc4e2d32eb`)

### Installation

1. **Navigate to backend directory:**
```bash
cd C:\Dhivya\WeatherApp\backend
```

2. **Create virtual environment (optional but recommended):**
```bash
python -m venv venv
venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Environment is pre-configured** with API key in `.env`

### Running the Server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Access:**
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/api/docs
- ReDoc: http://localhost:8000/api/redoc

---

## 📡 API Endpoints

### 1. Get Weather by City

**Endpoint:**
```
GET /api/weather/city?city=Chennai&unit=metric
```

**Parameters:**
- `city` (string, required): City name (e.g., "Chennai", "London")
- `unit` (string, optional): "metric" (°C) or "imperial" (°F). Default: "metric"

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "Chennai",
    "country": "IN",
    "temperature": 34.5,
    "feels_like": 37.2,
    "temp_min": 30.1,
    "temp_max": 36.8,
    "condition": "Cloudy",
    "description": "overcast clouds",
    "humidity": 65,
    "wind_speed": 3.5,
    "pressure": 1013,
    "visibility": 10000,
    "unit": "°C"
  },
  "message": "Weather data for Chennai"
}
```

**Example Requests:**
```bash
# Celsius
curl "http://localhost:8000/api/weather/city?city=Chennai&unit=metric"

# Fahrenheit
curl "http://localhost:8000/api/weather/city?city=London&unit=imperial"
```

---

### 2. Get Weather by GPS Coordinates

**Endpoint:**
```
GET /api/weather/location?lat=13.0827&lon=80.2707&unit=metric
```

**Parameters:**
- `lat` (float, required): Latitude (-90 to 90)
- `lon` (float, required): Longitude (-180 to 180)
- `unit` (string, optional): "metric" or "imperial". Default: "metric"

**Response:** [Same as endpoint 1]

**Example Requests:**
```bash
# Chennai coordinates
curl "http://localhost:8000/api/weather/location?lat=13.0827&lon=80.2707&unit=metric"

# London coordinates
curl "http://localhost:8000/api/weather/location?lat=51.5074&lon=-0.1278&unit=imperial"
```

---

### 3. Get Weather Forecast

**Endpoint:**
```
GET /api/weather/forecast?city=Chennai&unit=metric
```

**Parameters:**
- `city` (string, required): City name
- `unit` (string, optional): "metric" or "imperial". Default: "metric"

**Response:**
```json
{
  "success": true,
  "data": {
    "city": "Chennai",
    "country": "IN",
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
    ],
    "unit": "°C"
  },
  "message": "5-day forecast for Chennai"
}
```

**Example Request:**
```bash
curl "http://localhost:8000/api/weather/forecast?city=Chennai&unit=metric"
```

---

### 4. Health Check

**Endpoint:**
```
GET /api/weather/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Weather API",
  "version": "1.0.0"
}
```

---

## 📂 Project Structure

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
│   │   └── routes.py           # Route aggregator
│   │
│   ├── services/
│   │   ├── __init__.py
│   │   └── weather_service.py  # OpenWeatherMap integration
│   │
│   ├── schemas/
│   │   ├── __init__.py
│   │   └── weather.py          # Pydantic response models
│   │
│   └── utils/
│       ├── __init__.py
│       └── error_handler.py    # Error handling utilities
│
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (with API key)
├── .env.example               # Template for .env
├── .gitignore                 # Git ignore file
└── README.md                  # This file
```

---

## 🔒 Security

### API Key Management
- OpenWeatherMap API key stored in `.env` file
- **Never** expose API key in frontend
- **Never** commit `.env` to GitHub (use `.gitignore`)
- Server-side API calls keep key secure

### CORS Configuration
- Allows requests only from:
  - `http://localhost:3000` (React frontend dev)
  - `http://localhost:5173` (Vite dev)
  - `http://127.0.0.1:3000`
  - `http://127.0.0.1:5173`

### Input Validation
- City names validated (min 1 character)
- Coordinates validated (lat: -90 to 90, lon: -180 to 180)
- Unit parameter restricted to "metric" or "imperial"

---

## ⚠️ Error Handling

### Common Errors

**1. City Not Found (404)**
```json
{
  "error": "City 'InvalidCity' not found. Please check the city name and try again.",
  "success": false
}
```

**2. Invalid Coordinates (400)**
```json
{
  "error": "Invalid coordinates. Latitude must be between -90 and 90, Longitude between -180 and 180.",
  "success": false
}
```

**3. API Rate Limit (429)**
```json
{
  "error": "Too many requests. Please try again later.",
  "success": false
}
```

**4. Network Error (503)**
```json
{
  "error": "Network error. Please check your internet connection.",
  "success": false
}
```

---

## 🧪 Testing Endpoints

### Using cURL

```bash
# Test by city
curl -X GET "http://localhost:8000/api/weather/city?city=Chennai&unit=metric"

# Test by coordinates
curl -X GET "http://localhost:8000/api/weather/location?lat=13.0827&lon=80.2707&unit=metric"

# Test forecast
curl -X GET "http://localhost:8000/api/weather/forecast?city=Chennai&unit=metric"

# Test health
curl -X GET "http://localhost:8000/api/weather/health"
```

### Using Swagger UI

Navigate to: http://localhost:8000/api/docs

Interactive documentation where you can:
- View all endpoints
- See request/response examples
- Test endpoints directly
- View parameter descriptions

### Using ReDoc

Navigate to: http://localhost:8000/api/redoc

Beautiful documentation in a single page.

---

## 🔄 Frontend Integration

The React frontend (Phase 2) is pre-configured to work with this backend:

**Frontend API Service:**
```javascript
// frontend/src/services/weatherApi.js
const API_BASE_URL = 'http://localhost:8000/api'

// Calls these backend endpoints:
- getCurrentWeatherByCity(city, unit)
- getCurrentWeatherByCoords(lat, lon, unit)
- getForecast(city, unit)
```

---

## 📊 Example Usage with Frontend

### Scenario 1: Search Weather by City

```
User enters "Chennai" in search bar
↓
Frontend calls: GET /api/weather/city?city=Chennai&unit=metric
↓
Backend fetches from OpenWeatherMap
↓
Returns weather data
↓
Frontend displays weather card
```

### Scenario 2: GPS Location

```
User clicks GPS button
↓
Browser requests location (lat, lon)
↓
Frontend calls: GET /api/weather/location?lat=13.0827&lon=80.2707
↓
Backend fetches weather for coordinates
↓
Frontend displays weather for user's location
```

### Scenario 3: View Forecast

```
User views forecast section
↓
Frontend calls: GET /api/weather/forecast?city=Chennai&unit=metric
↓
Backend returns 5-day forecast
↓
Frontend displays forecast cards
```

---

## 🚦 Running Both Frontend and Backend

### Terminal 1: Backend
```bash
cd C:\Dhivya\WeatherApp\backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2: Frontend
```bash
cd C:\Dhivya\WeatherApp\frontend
npm run dev
```

### Access the Full App
- Frontend: http://localhost:3000 ✅
- Backend API: http://localhost:8000 ✅
- API Docs: http://localhost:8000/api/docs ✅

---

## 📈 Next Steps (Phase 4+)

After Phase 3 Backend verification:

1. **Phase 4**: GPS integration and improved forecasts
2. **Phase 5**: Database integration (PostgreSQL)
3. **Phase 6**: User accounts and favorites persistence
4. **Phase 7**: AI weather suggestions

---

## 📝 Useful Commands

```bash
# Install dependencies
pip install -r requirements.txt

# Start server with reload (for development)
uvicorn app.main:app --reload

# Start server without reload (production)
uvicorn app.main:app --host 0.0.0.0 --port 8000

# View installed packages
pip list

# Create requirements from environment
pip freeze > requirements.txt
```

---

## 🐛 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'app'"

**Solution:**
Make sure you're running from the `backend` directory:
```bash
cd C:\Dhivya\WeatherApp\backend
uvicorn app.main:app --reload
```

### Issue: "Port 8000 already in use"

**Solution:**
Either kill the process using port 8000 or use a different port:
```bash
uvicorn app.main:app --port 8001
```

### Issue: "Invalid API key"

**Solution:**
Verify `.env` file has correct API key:
```
OPENWEATHER_API_KEY=your_api_key_here

### Issue: Frontend can't connect to backend

**Solution:**
Ensure:
1. Backend is running on http://localhost:8000
2. Frontend is trying to call http://localhost:8000/api
3. CORS is properly configured (should allow localhost:3000)

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review API documentation at http://localhost:8000/api/docs
3. Check console logs for error messages
4. Verify .env file configuration

---

**Phase 3: Backend Foundation - Complete!** 🎉

Frontend + Backend connected and fully operational!
