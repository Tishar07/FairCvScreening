from pydantic import BaseModel,Field,field_validator

# from the n8n req bullshit(edit one) node
class SkillCalcRequest(BaseModel):
    jobId : int
    applicantSkills : list[str]
    currentLogUserId: int

class SkillExplanation(BaseModel):
    jobSkill: str
    candidateSkill: str | None
    similarity: float
    weight: int
    contribution: float
    # Matched / Partial Match / Missing
    status: str       
    explanation: str

class SkillCalcReponse(BaseModel):
    skillMatchScore : float
    earnedWeight : float
    totalWeight : int
    matchedSkills : dict[str,str]
    unmatchedSkills: dict[str,str]
    explanations: list[SkillExplanation]
