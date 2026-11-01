from pydantic import BaseModel


class ChatResponse(BaseModel):
    ConversationId: int
    title : str
    role: str
    content: str | None
    file_name: str | None
    message_type: str | None
    data: dict | list | None

    class Config:
        from_attributes = True
        
class ChatRequest(BaseModel):
    message: str | None = None