from pydantic import BaseModel
from typing import Literal

class SwapRequestCreate(BaseModel):
    to_email: str

class SwapStatusUpdate(BaseModel):
    swap_id: str
    status: Literal["accepted", "rejected"]
