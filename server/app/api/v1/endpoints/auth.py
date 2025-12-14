from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.db.database import get_db
from app.db.models import User
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.core.security import hash_password, verify_password

router = APIRouter()

@router.post("/inscription", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def inscription(user_data: UserCreate, db: Session = Depends(get_db)):
    """
    Créer un nouveau compte utilisateur
    """
    # Vérifier si l'email existe déjà
    existing_user = db.query(User).filter(User.email == user_data.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cet email est déjà utilisé"
        )
    
    # Créer le nouvel utilisateur
    try:
        new_user = User(
            nom_prenom=user_data.nom_prenom,
            email=user_data.email,
            password_hash=hash_password(user_data.password)
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Erreur lors de la création du compte"
        )

@router.post("/connexion")
def connexion(user_data: UserLogin, db: Session = Depends(get_db)):
    """
    Connecter un utilisateur
    """
    # Rechercher l'utilisateur par email
    user = db.query(User).filter(User.email == user_data.email).first()
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    # Vérifier le mot de passe
    if not verify_password(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect"
        )
    
    return {
        "message": "Connexion réussie",
        "user": {
            "id": user.id,
            "nom_prenom": user.nom_prenom,
            "email": user.email
        }
    }
