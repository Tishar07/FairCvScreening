from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from core.database import get_db
from services.auth_servises import auth_google_user
from schemas.googleLogin_schema import GoogleLoginRequest

router =APIRouter (prefix="/auth", tags=["Auth"])

@router.post("/google")
def google_login(payload:GoogleLoginRequest , db:Session = Depends(get_db)):
    result = auth_google_user(payload.token,db)

    if not result :
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid/Expire Google Token"
        )
    return result

