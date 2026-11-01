from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from services.job_services import get_jobs
from services.user_service import get_current_user
from models.User import User

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get("/list_jobs")
def list_jobs(db: Session = Depends(get_db) , current_user: User=Depends(get_current_user)):
    try:
        jobs = get_jobs(db)
        return jobs
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to retrive jobs"
        )

    

