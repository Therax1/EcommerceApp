from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import datetime

class UserCreate(BaseModel):
    """Schéma pour créer un utilisateur"""
    nom_prenom: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(..., min_length=6)
    
    @field_validator('nom_prenom')
    def validate_nom_prenom(cls, v):
        if not v.strip():
            raise ValueError('Le nom et prénom ne peuvent pas être vides')
        return v.strip()
    
    @field_validator('password')
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError('Le mot de passe doit contenir au moins 6 caractères')
        return v

class UserResponse(BaseModel):
    """Schéma pour les réponses utilisateur"""
    id: int
    nom_prenom: str
    email: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    """Schéma pour la connexion"""
    email: EmailStr
    password: str
