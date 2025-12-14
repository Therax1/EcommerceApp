from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from database import engine, get_db, Base
from models import User
from schemas import UserCreate, UserResponse, UserLogin
from auth import hash_password, verify_password

# Créer les tables dans la base de données
Base.metadata.create_all(bind=engine)

app = FastAPI(title="WestAf E-Commerce API")

# Configuration CORS pour permettre les requêtes depuis le frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://192.168.100.18:5173"],  # Ports Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API WestAf E-Commerce"}

@app.post("/api/auth/inscription", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
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

@app.post("/api/auth/connexion")
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

@app.get("/api/users", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    """
    Obtenir la liste de tous les utilisateurs (pour test)
    """
    users = db.query(User).all()
    return users
