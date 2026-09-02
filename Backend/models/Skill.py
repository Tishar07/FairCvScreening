from sqlalchemy import Column,Integer,String,DateTime
from core.database import Base
from datetime import datetime,timezone

class Skill(Base):
    __tablename__="skills"

    id = Column(Integer,primary_key=True)
    name = Column(String,nullable=False,unique=True)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )