from pathlib import Path

from pydantic_settings import BaseSettings

# Resolve the project-root .env regardless of where uvicorn is launched from
_ROOT_ENV = Path(__file__).resolve().parent.parent.parent / ".env"


class Settings(BaseSettings):
    google_client_id: str = ""
    google_client_secret: str = ""
    secret_key: str = "changeme"
    environment: str = "production"
    allowed_origins: str = ""
    google_redirect_uri: str = "http://localhost:8000/auth/google/callback"
    frontend_url: str = "http://localhost:4173"

    @property
    def cors_origins(self) -> list[str]:
        origins = [o.strip() for o in self.allowed_origins.split(",") if o.strip()]
        if self.environment == "development":
            for local in ("http://localhost:4173", "http://localhost:8000"):
                if local not in origins:
                    origins.append(local)
        return origins

    model_config = {"env_file": str(_ROOT_ENV), "extra": "ignore", "env_file_encoding": "utf-8"}


settings = Settings()
