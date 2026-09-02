from sqlalchemy.orm import Session
from models.User import User
from schemas.user_schema import UserDetails

def get_UserDetails(user_id:int,db:Session) -> UserDetails:
    user = db.query(User).filter(User.id == user_id ).first()
    return user




