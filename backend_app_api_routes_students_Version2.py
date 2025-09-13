from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db_session
from app.db import models
from app.schemas.student import StudentCreate, StudentOut

router = APIRouter()

@router.get("/students", response_model=list[StudentOut])
def list_students(clazz: str | None = None, db: Session = Depends(get_db_session)):
    q = db.query(models.Student)
    if clazz:
        q = q.filter(models.Student.clazz == clazz)
    return q.all()

@router.post("/students", response_model=StudentOut)
def create_student(payload: StudentCreate, db: Session = Depends(get_db_session)):
    stu = models.Student(**payload.dict())
    db.add(stu)
    db.commit()
    db.refresh(stu)
    return stu