from fastapi import APIRouter, Depends
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build

from app.auth.router import get_current_user

router = APIRouter(prefix="/drive", tags=["drive"])


@router.get("/files")
def list_files(user: dict = Depends(get_current_user)):
    creds = Credentials(token=user["access_token"])
    service = build("drive", "v3", credentials=creds)
    results = service.files().list(
        pageSize=20,
        fields="files(id,name,mimeType,modifiedTime,webViewLink)",
    ).execute()
    return results.get("files", [])
