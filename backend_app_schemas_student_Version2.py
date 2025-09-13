from pydantic import BaseModel

class StudentBase(BaseModel):
    name: str
    clazz: str
    reading_level: int = 0
    active: bool = True

class StudentCreate(StudentBase):
    pass

class StudentOut(StudentBase):
    id: int
    class Config:
        from_attributes = True