from datetime import datetime, timedelta, timezone
import os

import jwt
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="JWT Demo API")

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
if not SECRET_KEY:
    raise RuntimeError("JWT_SECRET_KEY environment variable is required")
if len(SECRET_KEY) < 32:
    raise RuntimeError("JWT_SECRET_KEY must be at least 32 characters long")

ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 300
REFRESH_TOKEN_EXPIRE_SECONDS = 3600

VALID_USERNAME = os.getenv("ADMIN_USERNAME", "admin")
VALID_PASSWORD = os.getenv("ADMIN_PASSWORD", "admin123")


class LoginRequest(BaseModel):
    username: str
    password: str


class RefreshRequest(BaseModel):
    refresh_token: str


def create_token(subject: str, expires_in_seconds: int, token_type: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(seconds=expires_in_seconds)
    payload = {"sub": subject, "type": token_type, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


@app.post("/token")
def generate_token(request: LoginRequest) -> dict[str, str | int]:
    if request.username != VALID_USERNAME or request.password != VALID_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_token(request.username, ACCESS_TOKEN_EXPIRE_SECONDS, "access")
    refresh_token = create_token(request.username, REFRESH_TOKEN_EXPIRE_SECONDS, "refresh")

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS,
        "refresh_token": refresh_token,
    }


@app.post("/token/refresh")
def refresh_access_token(request: RefreshRequest) -> dict[str, str | int]:
    try:
        payload = jwt.decode(request.refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=401, detail="Invalid refresh token") from exc

    if payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid token type")

    subject = payload.get("sub")
    if not subject:
        raise HTTPException(status_code=401, detail="Invalid refresh token payload")

    access_token = create_token(subject, ACCESS_TOKEN_EXPIRE_SECONDS, "access")

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "expires_in": ACCESS_TOKEN_EXPIRE_SECONDS,
    }
