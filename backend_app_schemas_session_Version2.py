from pydantic import BaseModel
from datetime import datetime

class SessionCreate(BaseModel):
    date: datetime
    clazz: str = "B"
    planned_students: int = 5

class SessionOut(SessionCreate):
    id: int
    status: str
    class Config:
        from_attributes = True