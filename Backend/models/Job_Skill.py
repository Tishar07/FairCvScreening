from sqlalchemy import Column,Integer,ForeignKey
from core.database import Base

class Job_Skill(Base):
    __tablename__= "jobs_skills"

    skill_id =Column(Integer,ForeignKey("skills.id"),primary_key=True)
    job_id =Column(Integer,ForeignKey("jobs.id"),primary_key=True)
