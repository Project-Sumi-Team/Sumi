from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    DATABASE_URL: str = (
        "postgresql://neondb_owner:npg_AL1tVXzwu5xH@ep-solitary-union-aubfmo53-pooler.c-10.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    )

    # JWT
    SECRET_KEY: str = (
        "518JD"
    )

    ALGORITHM: str = "HS256"

    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # App
    APP_NAME: str = "Sumi API"
    APP_VERSION: str = "0.1.0"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True
    )


settings = Settings()