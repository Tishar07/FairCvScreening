from sqlalchemy import Column,Integer,Float,String,DateTime,ForeignKey
from core.database import Base
from datetime import datetime, timezone


class Application(Base):
    __tablename__="applications"

    id=Column(Integer,primary_key=True)
    applicant_id = Column(Integer,ForeignKey("applicants.id"),nullable=False)
    job_id = Column(Integer,ForeignKey("jobs.id"),nullable=False)
    cv_id =Column(Integer,ForeignKey("cvs.id"),nullable=False)
    score = Column(Float,nullable=False)
    status = Column(String,nullable=False)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
    


