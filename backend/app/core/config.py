# File: backend/app/core/config.py

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./ecofinds.db"  # Change to your Postgres URL if needed
    SECRET_KEY: str = "your_secret_key_here_please_change"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 1 day

    class Config:
        env_file = ".env"

settings = Settings()
