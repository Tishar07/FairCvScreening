from pydantic import BaseModel
from datetime import datetime


class ConversationSchema(BaseModel):
    id: int
    title : str
    created_by : int
    created_at: datetime

    class config:
        from_attributes =True