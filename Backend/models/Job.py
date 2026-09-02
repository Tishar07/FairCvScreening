from sqlalchemy import Column,Integer,Float,String,DateTime,ForeignKey
from core.database import Base
from datetime import datetime, timezone

class Job(Base):
    __tablename__="jobs"

    id= Column(Integer,primary_key=True)
    title = Column(String,nullable=False)
    description = Column(String)
    location=Column(String,nullable=False)
    level =Column(String,nullable=False)
    numOpenings =Column(Integer,nullable=False)
    experienceRequired = Column(Float)
    department =Column(String,nullable=False)
    status =Column(String,nullable=False)
    created_by =Column(Integer,ForeignKey("users.id"),nullable=False)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    

