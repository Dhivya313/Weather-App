import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application configuration settings"""
    
    # API Keys
    OPENWEATHER_API_KEY: str = os.getenv("OPENWEATHER_API_KEY")
    
    # Server Config
    DEBUG: bool = os.getenv("DEBUG", "True").lower() == "true"
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # CORS Config
    CORS_ORIGINS: list = [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
        "http://127.0.0.1:3003",
        "http://127.0.0.1:5173",
    ]
    
    # API Config
    OPENWEATHER_BASE_URL: str = "https://api.openweathermap.org/data/2.5"
    REQUEST_TIMEOUT: int = 10


settings = Settings()
