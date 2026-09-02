from sqlalchemy import Column,Integer,String,DateTime
from core.database import Base
from datetime import datetime, timezone

class Applicant(Base):
    __tablename__= "applicants"

    id = Column(Integer,primary_key=True)
    firstName =Column(String)
    lastName =Column(String)
    email = Column(String)
    phone =Column(String)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )