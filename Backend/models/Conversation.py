from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from sqlalchemy.orm import relationship
from core.database import Base
from datetime import datetime,timezone


class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(Integer,primary_key=True)
    title = Column(String ,nullable= False)
    created_by =Column(Integer,ForeignKey("users.id"),nullable=False)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    messages = relationship(
        "Message",
        back_populates="conversation",
        cascade="all, delete-orphan"
    )