from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API
    API_V1_PREFIX: str = "/api"
    PROJECT_NAME: str = "WestAf E-Commerce API"
    
    # Database
    DATABASE_URL: str = "sqlite:///./westafecom.db"
    
    # CORS
    BACKEND_CORS_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://192.168.100.18:5173",
        "http://192.168.100.18:5174",
    ]
    
    # Security (pour JWT plus tard)
    SECRET_KEY: str = "votre-cle-secrete-a-changer-en-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        case_sensitive = True

settings = Settings()
