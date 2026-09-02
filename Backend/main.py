from fastapi import FastAPI
from routers.user_router import router as user_router


app = FastAPI()
#python -m uv run uvicorn main:app --reload

app.include_router(user_router)

