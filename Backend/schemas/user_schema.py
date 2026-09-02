from pydantic import BaseModel 

class UserDetails (BaseModel):
    username:str
    email :str
    
    class Config:
        from_attributes = True 