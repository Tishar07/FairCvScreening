from datetime import datetime ,timedelta,timezone
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests
from sqlalchemy.orm import Session

from core.config import settings
from models.User import User


def verify_google_token(token:str) -> dict:
    try:
        id_info = id_token.verify_oauth2_token(token,requests.Request(),settings.GOOGLE_CLIENT_ID)
        return id_info
    except ValueError:
        return None


def create_access_token(data:dict,expires_delta:timedelta=None) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + (
        expires_delta or timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode,settings.JWT_SECRET,algorithm=settings.JWT_ALGORITHM)

def auth_google_user(token:str,db:Session):
    google_payload= verify_google_token(token)

    if not google_payload:
        return None
    
    email = google_payload.get("email")
    name = google_payload.get("name")

    user = db.query(User).filter(User.email == email).first()

    if not user:
        user =User(
            email= email,
            username = name or email.split("@")[0],
            role="Admin"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    access_token = create_access_token(data={"sub": str(user.id), "email": user.email, "role": user.role})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role,
        }
    }

