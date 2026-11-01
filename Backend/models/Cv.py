from sqlalchemy import Column,Integer,String,DateTime,ForeignKey
from sqlalchemy.dialects.postgresql import JSONB
from core.database import Base
from datetime import datetime,timezone

class Cv(Base):
    __tablename__="cvs"

    id = Column(Integer,primary_key=True)
    applicant_id = Column(Integer,ForeignKey("applicants.id"),nullable=False)
    file_url = Column(String,nullable=False)
    parsed_text = Column(JSONB)
    created_by =Column(Integer,ForeignKey("users.id"),nullable=False)
    created_at =Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False
    )
