from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr
    username: Optional[str]


class UserCreate(UserBase):
    password: str  # Plain password input (to be hashed before storing)


class UserInDB(UserBase):
    id: str = Field(..., alias="_id")
    hashed_password: str
    created_at: datetime = None

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda dt: dt.isoformat(),
        }
