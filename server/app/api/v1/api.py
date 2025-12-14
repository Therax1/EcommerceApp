from fastapi import APIRouter
from app.api.v1.endpoints import auth, users

api_router = APIRouter()

# Inclure les routes d'authentification
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])

# Inclure les routes utilisateurs
api_router.include_router(users.router, prefix="/users", tags=["Users"])
