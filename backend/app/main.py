import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from app.config import settings
from app.api.routes import router
from app.utils.error_handler import WeatherAPIError, handle_weather_api_error

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title="Weather API",
    description="Advanced Weather Web Application Backend - Phase 3",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add Trusted Host middleware
app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["localhost", "127.0.0.1", "*.example.com"]
)

# Add exception handler
app.add_exception_handler(WeatherAPIError, handle_weather_api_error)


@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    logger.info("🌤️  Weather API Backend Starting...")
    logger.info(f"Debug mode: {settings.DEBUG}")
    logger.info(f"CORS origins: {settings.CORS_ORIGINS}")


@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown"""
    logger.info("🌤️  Weather API Backend Shutting Down...")


# Include main routes
app.include_router(router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "🌤️ Weather API - Phase 3 Backend",
        "status": "running",
        "version": "1.0.0",
        "documentation": {
            "swagger_ui": "/api/docs",
            "redoc": "/api/redoc",
            "openapi": "/api/openapi.json"
        },
        "base_url": "http://localhost:8000",
        "api_endpoints": {
            "root": "/",
            "api_root": "/api/",
            "weather_by_city": "/api/weather/city?city=Chennai&unit=metric",
            "weather_by_location": "/api/weather/location?lat=13.0827&lon=80.2707&unit=metric",
            "forecast": "/api/weather/forecast?city=Chennai&unit=metric",
            "health": "/api/weather/health"
        }
    }


@app.get("/health")
async def health():
    """Global health check endpoint"""
    return {
        "status": "healthy",
        "service": "Weather API",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
    )
