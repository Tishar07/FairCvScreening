from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from core.database import get_db
from schemas.skillCalc_schema import SkillCalcReponse, SkillCalcRequest
from services.skillsCalc_services import calc_skills

router = APIRouter(prefix="/skillsCalculator")


@router.post("/calculateSimilarity", response_model=SkillCalcReponse)
async def calculateSimilarity(
    req: SkillCalcRequest,
    db: Session = Depends(get_db)
):
    try:
        similarity = await calc_skills(req, db)

        if not similarity:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No data provided"
            )

        return similarity

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
