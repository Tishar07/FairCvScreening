from core.config import settings
from sqlalchemy.orm import Session
from models import Conversation
from google import genai
from schemas.conversation_schema import ConversationSchema


def create_conversation(db:Session,current_user_id:int,message:str):
    title = create_Title(message)
    NewConversation = Conversation(created_by = current_user_id , title = title)
    db.add(NewConversation)
    db.commit()
    db.refresh(NewConversation)
    
    return ConversationSchema(
        id= NewConversation.id,
        title= NewConversation.title,
        created_by= NewConversation.created_by,
        created_at= NewConversation.created_at
    )

def create_Title(message:str):
    gemini_client = genai.Client(api_key=settings.GEMINI_API_KEY)
    prompt = f"""
        Generate a short title for this conversation based on the user's message.

        Rules:
        - Maximum 6 words
        - Keep it concise and descriptive
        - Do not use quotation marks
        - Return only the title

        User message:
        {message}
    """
    response = gemini_client.models.generate_content(model="gemini-2.5-flash" ,contents=prompt)

    return response.text.strip()

