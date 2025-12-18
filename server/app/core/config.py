from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "WestAf E-Commerce API"
    
    # Database
    DATABASE_URL: str
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://192.168.100.18:5173",
        "http://192.168.100.18:5174",
    ]
    
    # Security - CHARGER DEPUIS .env
    SECRET_KEY: str  # Pas de valeur par défaut - OBLIGATOIRE dans .env
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Email Configuration - CHARGER DEPUIS .env
    SMTP_HOST: str = "smtp.gmail.com"
    SMTP_PORT: int = 587
    SMTP_USER: str  # OBLIGATOIRE dans .env
    SMTP_PASSWORD: str  # OBLIGATOIRE dans .env
    EMAILS_FROM_EMAIL: str  # OBLIGATOIRE dans .env
    EMAILS_FROM_NAME: str = "WestAf E-Commerce"
    
    # Password Reset
    RESET_CODE_EXPIRE_MINUTES: int = 15
    
    class Config:
        case_sensitive = True
        env_file = ".env"  # Charger depuis le fichier .env
        env_file_encoding = 'utf-8'

settings = Settings()
