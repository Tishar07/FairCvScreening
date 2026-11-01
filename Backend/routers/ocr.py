from typing import Optional
from fastapi import APIRouter, File, Form, HTTPException, UploadFile, status
from schemas.ocr import OCRResponse, OutputFormat
from services.geminiOcr_services import SUPPORTED_MIME_TYPES, ocr_service

router = APIRouter(prefix="/ocr", tags=["OCR"])


@router.post("", response_model=OCRResponse, summary="Extract text or data using Gemini")
async def process_document(
    file: UploadFile = File(..., description="Image or PDF to process"),
    format: OutputFormat = Form(default=OutputFormat.MARKDOWN),
    custom_prompt: Optional[str] = Form(None),
):
    if file.content_type not in SUPPORTED_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported format '{file.content_type}'. Supported: {sorted(SUPPORTED_MIME_TYPES)}",
        )

    file_bytes = await file.read()
    if not file_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty.",
        )

    try:
        result = await ocr_service.extract_text(
            file_bytes=file_bytes,
            mime_type=file.content_type,
            output_format=format,
            custom_prompt=custom_prompt,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Gemini processing error: {str(e)}",
        )

    return OCRResponse(
        filename=file.filename or "unknown",
        format=format,
        result=result,
    )