import httpx

from core.config import settings
from schemas.ocr import OutputFormat
from services.geminiOcr_services import ocr_service

N8N_WEBHOOK = settings.N8N_WEBHOOK


async def send_chat_to_n8n(
    message: str,
    job_id: int | None = None,
    current_log_user_id: int | None = None,
    file=None,
    session_id: int | None = None,
):
    
    cv_data = None

    if file:
        file_bytes = await file.read()

        if not file_bytes:
            raise ValueError("Uploaded file is empty.")

        cv_data = await ocr_service.extract_text(
            file_bytes=file_bytes,
            mime_type=file.content_type,
            output_format=OutputFormat.STRUCTURED_JSON,
        )

    payload = {
        "messages": message,
        "sessionId": session_id,
        "jobId": job_id,
        "currentLogUserId": current_log_user_id,
        "cv": cv_data,
    }

    async with httpx.AsyncClient(timeout=120) as client:
        response = await client.post(
            N8N_WEBHOOK,
            json=payload,
        )

    response.raise_for_status()

    return response.json()