from fastapi import APIRouter,Depends
from fastapi import HTTPException,status
from sqlalchemy.orm import Session

from core.database import get_db
from schemas.user_schema import UserDetails
from services.user_service import get_UserDetails

router = APIRouter(prefix="/users",tags=["Users"])


@router.get("/{user_id}",response_model=UserDetails)
def getUser(user_id:int,db:Session=Depends(get_db)):
    user = get_UserDetails(user_id,db)
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail="User not found")
    
    return user