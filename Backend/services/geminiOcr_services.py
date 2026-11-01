import json
from google import genai
from core.config import settings
from google.genai import types
from schemas.ocr import OutputFormat, StructuredCV

gemini_client = genai.Client(api_key= settings.GEMINI_API_KEY)

SUPPORTED_MIME_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
    "application/pdf",
}


class GeminiOCRService:
    def __init__(self):
        self.client = gemini_client

    async def extract_text(
        self,
        file_bytes: bytes,
        mime_type: str,
        output_format: OutputFormat,
        custom_prompt: str | None = None,
    ) -> str | dict:
        image_part = types.Part.from_bytes(data=file_bytes, mime_type=mime_type)

        if output_format == OutputFormat.STRUCTURED_JSON:
            prompt = custom_prompt or (
                "Extract the candidate's CV information according to the provided schema. "
                "Only extract information explicitly present in the CV. "
                "Do not invent or infer missing information. "
                "For unknown fields, return null or an empty list as appropriate. "
                "For employment dates, use YYYY-MM format when only month and year are available. "
                "If the candidate is currently employed, set end_date to null."
            )
            config = types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=StructuredCV,
                temperature=0.1,
            )
        elif output_format == OutputFormat.RAW_TEXT:
            prompt = custom_prompt or (
                "Transcribe all readable text from this image exactly as written. "
                "Do not summarize or format as markdown."
            )
            config = types.GenerateContentConfig(temperature=0.0)
        else:  # Markdown
            prompt = custom_prompt or (
                "Transcribe the content in this document into clean Markdown. "
                "Preserve tabular layouts, headings, bullet points, and styling."
            )
            config = types.GenerateContentConfig(temperature=0.1)

        response = self.client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=[image_part, prompt],
            config=config,
        )

        if output_format == OutputFormat.STRUCTURED_JSON:
            return json.loads(response.text)

        return response.text


ocr_service = GeminiOCRService()