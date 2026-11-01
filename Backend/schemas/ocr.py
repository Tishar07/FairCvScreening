from enum import Enum
from typing import Any, Optional
from pydantic import BaseModel, Field


class OutputFormat(str, Enum):
    RAW_TEXT = "raw_text"
    MARKDOWN = "markdown"
    STRUCTURED_JSON = "structured_json"


from pydantic import BaseModel, Field
from typing import Optional


class WorkExperience(BaseModel):
    company: Optional[str] = Field(
        None,
        description="Name of the company or employer"
    )

    job_title: Optional[str] = Field(
        None,
        description="Job title or position"
    )

    start_date: Optional[str] = Field(
        None,
        description="Employment start date in YYYY-MM format"
    )

    end_date: Optional[str] = Field(
        None,
        description="Employment end date in YYYY-MM format. Use null if currently employed."
    )

    responsibilities: list[str] = Field(
        default_factory=list,
        description="Main responsibilities or duties performed"
    )


class StructuredCV(BaseModel):
    full_name: Optional[str] = None

    email: Optional[str] = None

    phone: Optional[str] = None

    summary: Optional[str] = None

    education: list[str] = Field(
        default_factory=list
    )

    work_experience: list[WorkExperience] = Field(
        default_factory=list,
        description="Candidate's employment history with dates"
    )

    skills: list[str] = Field(
        default_factory=list,
        description="Technical and professional skills explicitly found in the CV"
    )

    certifications: list[str] = Field(
        default_factory=list
    )

    projects: list[str] = Field(
        default_factory=list
    )

    languages: list[str] = Field(
        default_factory=list
    )


class OCRResponse(BaseModel):
    filename: str
    format: OutputFormat
    result: Any