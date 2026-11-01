from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    GOOGLE_CLIENT_ID: str
    JWT_SECRET : str
    JWT_ALGORITHM :str = "HS256"
    N8N_ALIAS_AGENT : str
    N8N_WEBHOOK: str
    GEMINI_API_KEY:str

    #set to one day
    ACCESS_TOKEN_EXPIRE_MINUTES : int = 24 * 60


    
    model_config = SettingsConfigDict(
        env_file=".env"
    )


settings = Settings()