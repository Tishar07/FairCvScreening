from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


from routers.user_router import router as user_router
from routers.googleAuth_router import router as googleAuth_router
from routers.skillCalculator_router import router as skillCalculator_router
from routers.job_router import router as Job_router
from routers.chat_router import router as Chat_router
from routers.ocr import router as ocr_router 
import models

app = FastAPI()

#python -m uv run uvicorn main:app --reload

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(googleAuth_router)
app.include_router(user_router)
app.include_router(skillCalculator_router)
app.include_router(Job_router)
app.include_router(Chat_router)
app.include_router(ocr_router)

