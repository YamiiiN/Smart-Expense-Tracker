from pydantic import BaseModel, EmailStr, Field
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    avatar_url: Optional[str] = None

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    avatar_url: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"