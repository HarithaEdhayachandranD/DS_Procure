from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DATABASE_URL: str = ""
    API_KEY: str = ""
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5000"]
    MODEL_DIR: str = "trained_models"
    LOG_LEVEL: str = "info"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
