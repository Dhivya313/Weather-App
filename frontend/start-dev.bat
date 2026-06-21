@echo off
REM Start Vite Development Server
REM This script navigates to the frontend folder and starts npm dev

cd /d "%~dp0"
echo Starting Weather App Development Server...
echo.
echo Navigate to http://localhost:3000 in your browser
echo.
npm run dev
pause
