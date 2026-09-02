from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from core.database import Base
from datetime import datetime,timezone

class History(Base):
    __tablename__= "history"

    id =Column(Integer,primary_key=True)
    user_id = Column(Integer,ForeignKey("users.id"),nullable=False)
    application_id =Column(Integer,ForeignKey("applications.id"),nullable=False)
    action = Column(String)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )