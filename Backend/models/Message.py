from sqlalchemy import Column,Integer,String,DateTime,ForeignKey,Text,Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import JSONB
from core.database import Base
from datetime import datetime,timezone

class Message(Base):
    __tablename__ = "messages"
    id= Column(Integer,primary_key=True)
    conversation_id = Column(Integer ,ForeignKey("conversations.id"),nullable=False)
    role = Column(String,nullable=False)
    content =Column(Text,nullable=True)
    flag = Column(Boolean,nullable=False)
    file_name = Column(String, nullable=True)
    message_type = Column(String,nullable=False)
    data = Column(JSONB,nullable=True)
    created_by =Column(Integer,ForeignKey("users.id"),nullable=False)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    conversation = relationship(
        "Conversation",
        back_populates="messages"
    )