from typing import Optional
from fastapi import APIRouter, File, Form, UploadFile, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.database import get_db
from services.chat_services import send_chat_to_n8n
from services.conversation_services import create_conversation as create_conversation_service
from models import User
from services.user_service import get_current_user

router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/createConversation")
def create_conversation(
    message: str,
    db: Session = Depends(get_db),
    current_log_user: User = Depends(get_current_user),
):
    try:
        
        conversation = create_conversation_service(db, current_log_user.id, message)

        if not conversation:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No conversation Created")

        return conversation

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post("/send")
async def send_chat(
    message: str = Form(...),
    job_id: Optional[int] = Form(None),
    current_log_user: User = Depends(get_current_user),
    session_id: Optional[int] = Form(None),
    file: Optional[UploadFile] = File(None),
):
    current_log_user_id = current_log_user.id
    
    response = await send_chat_to_n8n(
        message=message,
        job_id=job_id,
        current_log_user_id=current_log_user_id,
        session_id=session_id,
        file=file,
    )

    return response
