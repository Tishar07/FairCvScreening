from rapidfuzz import process, fuzz
import httpx

from sqlalchemy.orm import session
from models.Skill import Skill
from models.Job_Skill import Job_Skill
from schemas.skillCalc_schema import SkillCalcRequest, SkillCalcReponse,SkillExplanation
from core.config import settings


async def call_AliasSkills(message: str) -> dict:
    url = (settings.N8N_ALIAS_AGENT)
    params = {"chatInput": message}

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.get(url, params=params)
        return response.json()

async def calc_skills(req : SkillCalcRequest , db:session) -> SkillCalcReponse:
    job_skills = (
        db.query(Skill)
        .join(Job_Skill, Skill.id == Job_Skill.skill_id)
        .filter(
            Job_Skill.job_id == req.jobId,
            Skill.created_by == req.currentLogUserId
        )
        .all()
    )

    skillsName = [skill.name for skill in job_skills]
    skillNameMessage = ",".join([str(item) for item in skillsName])
    skillAlias = await call_AliasSkills(skillNameMessage)
    aliases_list = skillAlias.get("output", [])

    #This important as it governs the way the similarity operates , so don't change  it unless neccessary
    threshold = 0.95
    partial_threshold = 0.65

    total_weight = sum(skill.Weight for skill in job_skills)
    earned = 0
    mathcedSkills={}
    unmatchedSkills ={}
    explanationList =[]

    alias_map = {}
    for entry in aliases_list:
        if ":" in entry:
            header, aliases_str = entry.split(":", 1)
            parsed_aliases = [a.strip() for a in aliases_str.split(",") if a.strip()]
            alias_map[header.strip().lower()] = parsed_aliases

    for skill in job_skills:
        most_similar = 0.0
        applicantSkill = ""
        matched_term = skill.name
        is_exact_alias = False
        known_aliases = alias_map.get(skill.name.lower().strip(), [])
        search_terms = [skill.name] + known_aliases

        for appskill in req.applicantSkills:
            app_clean = appskill.lower().strip()
            for term in search_terms:
                if app_clean == term.lower().strip():
                    is_exact_alias = True
                    most_similar = 1.0
                    applicantSkill = appskill
                    matched_term = term
                    break
            if is_exact_alias:
                break

        if not is_exact_alias:
            for appskill in req.applicantSkills:
                app_clean = appskill.lower().strip()
                for term in search_terms:
                    similarity = fuzz.token_set_ratio(term.lower().strip(), app_clean) / 100.0
                    if similarity > most_similar:
                        most_similar = similarity
                        applicantSkill = appskill
                        matched_term = term

        contribution = 0.0
        if most_similar >= threshold:
            status = "Matched"
            contribution = skill.Weight 
            earned += contribution
            mathcedSkills[applicantSkill] = skill.name
            
            via_alias_msg = f" (via alias '{matched_term}')" if matched_term.lower() != skill.name.lower() else ""
            explanation = (
                f"Exact/nearly match from requirements with `{skill.name}`{via_alias_msg} to `{applicantSkill}`. "
                f"Full Weight: `{contribution}` with similarity of `{round(most_similar, 3)}`"
            )

        elif most_similar >= partial_threshold:
            status = "Partial Match"
            contribution = round(skill.Weight * most_similar, 3)
            earned += contribution
            mathcedSkills[applicantSkill] = skill.name
            
            via_alias_msg = f" (via alias '{matched_term}')" if matched_term.lower() != skill.name.lower() else ""
            explanation = (
                f"Partial match from requirements with `{skill.name}`{via_alias_msg} to `{applicantSkill}`. "
                f"Full Weight: `{contribution}` with similarity of `{round(most_similar, 3)}`"
            )

        else:
            status = "Missing"
            contribution = 0.0
            unmatchedSkills[skill.name] = "No Match"
            explanation = (
                f"Candidate does not have `{skill.name}`. "
                f"Closest skill found was `{applicantSkill}` "
                f"(similarity {round(most_similar, 3)})."
            )

        explanationList.append(SkillExplanation(
            jobSkill=skill.name,
            candidateSkill=applicantSkill,
            similarity=round(most_similar, 3),
            weight=0 if contribution == 0 else skill.Weight,
            contribution=round(contribution, 3),
            status=status,
            explanation=explanation
        ))



    score = round((earned /total_weight)*100,2)

    return SkillCalcReponse(
        skillMatchScore=score,
        earnedWeight=round(earned, 2),
        totalWeight=total_weight,
        matchedSkills=mathcedSkills,
        unmatchedSkills=unmatchedSkills,
        explanations=explanationList
    )
          


    