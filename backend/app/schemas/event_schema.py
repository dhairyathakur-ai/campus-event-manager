from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List


class EventCreate(BaseModel):
    title: str
    description: Optional[str] = None
    date: datetime
    location: Optional[str] = None


class EventOut(BaseModel):
    id: int
    title: str
    description: Optional[str]
    date: datetime
    location: Optional[str]
    organizer_id: int

    class Config:
        orm_mode = True