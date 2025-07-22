from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    location: str
    about: str
    availability: List[str]
    skills_offered: List[str]
    skills_wanted: List[str]

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    name: str
    email: EmailStr

from typing import Optional, List

class UserUpdate(BaseModel):
    name: Optional[str] = None
    bio: Optional[str] = None
    skills_offered: Optional[List[str]] = None
    skills_needed: Optional[List[str]] = None
