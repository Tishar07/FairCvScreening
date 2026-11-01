from pydantic import BaseModel 

class UserDetails (BaseModel):
    id:int
    username:str
    role:str
    email :str
    
    class Config:
        from_attributes = True 