from sqlalchemy.orm import Session
from fastapi import Depends
from core.database import get_db
from models.Applicant import Applicant
from models.Application import Application
from models.Cv import Cv
from models.Job import Job
from typing import Any
from sqlalchemy.exc import SQLAlchemyError


def create_applicant(
    firstName:str,
    lastName:str,
    email:str,
    phone:str,
    created_by:int,
    jobId:int,
    parsed_text:dict[str,Any],
    score: float,
    status:str,
    db:Session=Depends(get_db)
    ):
    try:
        existingApplicant = (
            db.query(Applicant)
            .join(Application, Application.applicant_id == Applicant.id)
            .join(Job,Job.id == Application.job_id)
            .filter(
                Applicant.email == email,
                Job.id == jobId
            )
            .first()
        )

        if existingApplicant is not None :
            return {"message":"Applicant already made application to job specified"}
            
        newApplicant = Applicant(
            firstName=firstName, lastName=lastName,
            email=email, phone=phone,
            created_by=created_by
        )

        db.add(newApplicant)
        db.flush()

        newCv = Cv(
            applicant_id = newApplicant.id, file_url ="TBC",
            parsed_text=parsed_text, created_by =created_by,
        )
        db.add(newCv)
        db.flush()

        newApplication = Application(
            applicant_id = newApplicant.id , job_id =jobId ,
            cv_id =newCv.id, score= score,
            status = status , created_by = created_by)
        
        db.add(newApplication)
        db.commit()

    except SQLAlchemyError:
        db.rollback()
        raise

def update_applicant(
    applicationId :int,
    applicantId: int,
    firstName: str,
    lastName: str,
    email: str,
    phone: str,
    parsed_text: dict[str, Any],
    created_by: int,
    db: Session = Depends(get_db)
):
    try:
        applicant = (
            db.query(Applicant)
            .filter(
                Applicant.id == applicantId,
                Applicant.created_by == created_by
            )
            .first()
        )

        if applicant is None:
            return {"message": "Applicant not found"}

        # Update applicant
        applicant.firstName = firstName
        applicant.lastName = lastName
        applicant.email = email
        applicant.phone = phone

        # Update CV
        if parsed_text:
            cv = (
                db.query(Cv)
                .join(Application, Application.cv_id == Cv.id)
                .filter(
                    Application.id == applicationId,
                    Application.applicant_id == applicantId,
                    Cv.created_by == created_by
                )
                .first()
            )
            if cv is not None:
                cv.parsed_text = parsed_text
                db.refresh()

        db.commit()
        db.refresh(applicant)
        
        return {
            "message": "Applicant updated successfully",
            "applicant": applicant
        }

    except SQLAlchemyError:
        db.rollback()
        raise



def get_applicantDetails(applicationId:int , db:Session =Depends(get_db)):
    try:

        applicationDetails = db.query(Application).filter(Application.id == applicationId).first()

        if applicationDetails is None:
            return {"message": "Applicant does not exist !"}
        
        cvDetails = (
            db.query(Cv)
            .join(Application, Application.applicant_id == Cv.applicant_id)
            .filter(
                Application.id == applicationId,
                Application.job_id == applicationDetails.job_id
            )
            .first()
        )
        applicantDetails = db.query(Applicant).filter(Applicant.id == applicationDetails.applicant_id).first()
        return{
            "applicationDetails": applicationDetails,
            "CvDetails": cvDetails,
            "applicantDetails": applicantDetails
        }
    
    except SQLAlchemyError:
        db.rollback()
        raise

def list_applications(skip:int=0,limit:int=10,db:Session=Depends(get_db)):
    try:
        listApplications = (
            db.query(Application)
            .order_by(Application.created_at)
            .offset(skip)
            .limit(limit + 1)
            .all()
        )

        has_more = len(listApplications) > limit
        listApplications = listApplications[:limit]

        return {
            "items" : listApplications,
            "has_more" : has_more,
            "next_skip" : skip + len(listApplications)
        }
    
    except SQLAlchemyError:
        raise

#def delete_applicant(applicantId):

    


