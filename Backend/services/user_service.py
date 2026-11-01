from sqlalchemy.orm import Session
from models.User import User
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import Depends, HTTPException, status
from jose import JWTError,jwt
from core.database import get_db
from core.config import settings


security = HTTPBearer()

def get_current_user(credentials : HTTPAuthorizationCredentials=Depends(security), db:Session = Depends(get_db)):
    credentials_Exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="could not validate credentials",
        headers={"WWW-Authenticate":"Bearer"}
    )
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.JWT_SECRET,algorithms=[settings.JWT_ALGORITHM])
        user_id = payload.get("sub")

        if not user_id:
            return credentials_Exception
        
    except JWTError:
        raise credentials_Exception
    
    user = db.query(User).filter(User.id == user_id).first()

    if  user is None:
        raise credentials_Exception
    
    return user






