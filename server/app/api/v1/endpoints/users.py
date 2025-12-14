from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import User
from app.schemas.user import UserResponse

router = APIRouter()

@router.get("/", response_model=list[UserResponse])
def get_users(db: Session = Depends(get_db)):
    """
    Obtenir la liste de tous les utilisateurs (pour test)
    """
    users = db.query(User).all()
    return users
