@echo off
REM Start FastAPI Backend Server
REM This script navigates to the backend folder and starts the server

cd /d "%~dp0"
echo.
echo =============================================
echo   🌤️ Weather API Backend - FastAPI Server
echo =============================================
echo.
echo Starting backend server on http://localhost:8000
echo.
echo API Endpoints:
echo   • Get Weather by City:  /api/weather/city?city=London&unit=metric
echo   • Get Weather by GPS:   /api/weather/location?lat=51.5074&lon=-0.1278
echo   • Get Forecast:         /api/weather/forecast?city=London&unit=metric
echo   • API Docs:            /api/docs
echo.
echo Backend running... Press CTRL+C to stop
echo.
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
pause
