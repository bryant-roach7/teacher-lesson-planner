import os
import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import RedirectResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from jose import JWTError, jwt

from app.config import settings

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/drive.readonly",
]


def _make_flow() -> Flow:
    return Flow.from_client_config(
        {
            "web": {
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        },
        scopes=SCOPES,
        redirect_uri=settings.google_redirect_uri,
    )


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
) -> dict:
    try:
        return jwt.decode(credentials.credentials, settings.secret_key, algorithms=["HS256"])
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")


@router.get("/google/login")
def google_login():
    flow = _make_flow()
    auth_url, _ = flow.authorization_url(prompt="consent", access_type="offline")
    return {"auth_url": auth_url}


@router.get("/google/callback")
def google_callback(code: str, state: str | None = None):
    # oauthlib rejects HTTP redirect URIs by default; allow it in dev
    if settings.environment == "development":
        os.environ.setdefault("OAUTHLIB_INSECURE_TRANSPORT", "1")

    flow = _make_flow()
    flow.fetch_token(code=code)
    creds: Credentials = flow.credentials

    service = build("oauth2", "v2", credentials=creds)
    user_info = service.userinfo().get().execute()

    payload = {
        "sub": user_info["email"],
        "name": user_info.get("name", ""),
        "picture": user_info.get("picture", ""),
        "access_token": creds.token,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=2),
    }
    token = jwt.encode(payload, settings.secret_key, algorithm="HS256")

    return RedirectResponse(f"{settings.frontend_url}/callback?token={token}")


@router.get("/me")
def get_me(user: dict = Depends(get_current_user)):
    return {"email": user["sub"], "name": user["name"], "picture": user.get("picture", "")}
