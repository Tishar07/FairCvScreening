from sqlalchemy.orm import Session
from fastapi import Depends
from core.database import get_db
from models.Job import Job
from models.Job_Skill import Job_Skill
from sqlalchemy.exc import SQLAlchemyError

def get_jobs(db:Session = Depends(get_db)):
   
    jobs = db.query(Job).all()
    return [
        {
            "id": job.id,
            "title": job.title,
            "description": job.description,
            "location": job.location,
            "level": job.level,
            "numOpenings": job.numOpenings,
            "experienceRequired": job.experienceRequired,
            "department": job.department,
            "status": job.status,
        }
        for job in jobs
    ]





def create_job(
    title: str,
    description: str,
    location: str,
    level: str,
    numOpenings: int,
    experienceRequired: float,
    department: str,
    status: str,
    created_by: int,
    skillsId: list[int],
    db: Session = Depends(get_db)
):
    try:
        newJob = Job(
            title=title,
            description=description,
            location=location,
            level=level,
            numOpenings=numOpenings,
            experienceRequired=experienceRequired,
            department=department,
            status=status,
            created_by=created_by
        )

        db.add(newJob)
        db.flush()

        SkillJobList = []
        for skill in skillsId:
            SkillJob = Job_Skill(skill_id=skill,job_id = newJob.id,created_by= created_by)
            SkillJobList.append(SkillJob)
        
        db.add_all(SkillJobList)
        db.commit()

        db.refresh(newJob)
        return newJob

    except SQLAlchemyError:
        db.rollback()
        raise

def get_jobDetails(JobId:int ,created_by:int, db: Session =Depends(get_db)):
    try:
        JobDetails = db.query(Job).filter(Job.id == JobId , Job.created_by == created_by).first()
        return JobDetails
    except SQLAlchemyError:
        raise

def update_job(
    job_id: int,
    title: str,
    description: str,
    location: str,
    level: str,
    numOpenings: int,
    experienceRequired: float,
    department: str,
    status: str,
    skillsId: list[int],
    db: Session = Depends(get_db)
):
    try:

        job = db.query(Job).filter(Job.id == job_id).first()
        if job is None:
            return None

        job.title = title
        job.description = description
        job.location = location
        job.level = level
        job.numOpenings = numOpenings
        job.experienceRequired = experienceRequired
        job.department = department
        job.status = status

        db.query(Job_Skill).filter(
            Job_Skill.job_id == job_id
        ).delete(synchronize_session=False)

        skill_job_list = [
            Job_Skill(
                skill_id=skill_id,
                job_id=job_id,
                created_by=job.created_by
            )
            for skill_id in set(skillsId)
        ]

        db.add_all(skill_job_list)
        db.commit()
        db.refresh(job)
        return job

    except SQLAlchemyError:
        db.rollback()
        raise

def delete_job(JobId:int,created_by:int, db:Session = Depends(get_db)):
    try:
        if not job:
            return None      
        
        db.query(Job_Skill).filter(
        Job_Skill.job_id == JobId,
        Job_Skill.created_by == created_by
        ).delete(synchronize_session=False)

        job = db.query(Job).filter(Job.id == JobId).first()
        db.delete(job)

        db.commit()
        return {"message":"Job deleted"}
    
    except SQLAlchemyError:
        db.rollback()
        raise


