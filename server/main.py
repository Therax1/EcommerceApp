from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.database import engine, Base
from app.api.v1.api import api_router

# Créer les tables dans la base de données
Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.PROJECT_NAME)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route de base
@app.get("/")
def read_root():
    return {"message": f"Bienvenue sur {settings.PROJECT_NAME}"}

# Inclure tous les routers API v1
app.include_router(api_router, prefix=settings.API_V1_PREFIX)
