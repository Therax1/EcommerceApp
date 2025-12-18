import random
import string
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.database import get_db
from app.db.models import User, PasswordReset
from app.core.security import hash_password
from app.core.email import send_reset_code_email
from app.core.config import settings

router = APIRouter()

# Schémas Pydantic
class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str

class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str
    new_password: str

def generate_reset_code() -> str:
    """Générer un code aléatoire à 5 chiffres"""
    return ''.join(random.choices(string.digits, k=5))

@router.post("/forgot-password")
def forgot_password(request: ForgotPasswordRequest, db: Session = Depends(get_db)):
    """
    Étape 1 : Demander la réinitialisation du mot de passe
    Génère un code à 5 chiffres et l'envoie par email
    """
    # Vérifier si l'utilisateur existe
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        # Pour des raisons de sécurité, on ne révèle pas si l'email existe
        return {
            "message": "Si cet email existe, un code de réinitialisation a été envoyé"
        }
    
    # Générer le code
    code = generate_reset_code()
    
    # Calculer l'expiration
    expires_at = datetime.utcnow() + timedelta(minutes=settings.RESET_CODE_EXPIRE_MINUTES)
    
    # Supprimer les anciens codes non utilisés pour cet email
    db.query(PasswordReset).filter(
        PasswordReset.email == request.email,
        PasswordReset.is_used == False
    ).delete()
    
    # Créer le nouveau code
    reset_request = PasswordReset(
        email=request.email,
        code=code,
        expires_at=expires_at
    )
    db.add(reset_request)
    db.commit()
    
    # Envoyer l'email
    email_sent = send_reset_code_email(request.email, code, user.nom_prenom)
    
    if not email_sent:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de l'envoi de l'email"
        )
    
    return {
        "message": "Un code de réinitialisation a été envoyé à votre email"
    }

@router.post("/verify-code")
def verify_code(request: VerifyCodeRequest, db: Session = Depends(get_db)):
    """
    Étape 2 : Vérifier le code saisi par l'utilisateur
    """
    # Rechercher le code
    reset_request = db.query(PasswordReset).filter(
        PasswordReset.email == request.email,
        PasswordReset.code == request.code,
        PasswordReset.is_used == False
    ).first()
    
    if not reset_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code invalide ou expiré"
        )
    
    # Vérifier si le code n'a pas expiré
    if datetime.utcnow() > reset_request.expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ce code a expiré. Veuillez demander un nouveau code"
        )
    
    return {
        "message": "Code vérifié avec succès",
        "valid": True
    }

@router.patch("/reset-password")
def reset_password(request: ResetPasswordRequest, db: Session = Depends(get_db)):
    """
    Étape 3 : Réinitialiser le mot de passe avec le code vérifié (modification partielle)
    """
    # Rechercher le code
    reset_request = db.query(PasswordReset).filter(
        PasswordReset.email == request.email,
        PasswordReset.code == request.code,
        PasswordReset.is_used == False
    ).first()
    
    if not reset_request:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Code invalide ou expiré"
        )
    
    # Vérifier si le code n'a pas expiré
    if datetime.utcnow() > reset_request.expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Ce code a expiré. Veuillez demander un nouveau code"
        )
    
    # Trouver l'utilisateur
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Utilisateur non trouvé"
        )
    
    # Valider le nouveau mot de passe
    if len(request.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le mot de passe doit contenir au moins 6 caractères"
        )
    
    # Mettre à jour le mot de passe
    user.password_hash = hash_password(request.new_password)
    user.updated_at = datetime.utcnow()
    
    # Marquer le code comme utilisé
    reset_request.is_used = True
    
    db.commit()
    
    return {
        "message": "Mot de passe réinitialisé avec succès"
    }
