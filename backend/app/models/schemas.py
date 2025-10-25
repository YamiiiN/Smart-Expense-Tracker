from pydantic import BaseModel, EmailStr, Field, Optional

class UserCreate(BaseModel):
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    avatar_url: Optional[str] = None

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr
    avatar_url: Optional[str] = None

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
