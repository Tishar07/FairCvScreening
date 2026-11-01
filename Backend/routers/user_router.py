from fastapi import APIRouter,Depends
from fastapi import HTTPException,status
from sqlalchemy.orm import Session

from core.database import get_db
from models.User import User
from services.user_service import get_current_user

router = APIRouter(prefix="/users",tags=["Users"])


@router.get("/me")
def get_me(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "role": current_user.role
    }