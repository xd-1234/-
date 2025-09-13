from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from app.api.deps import get_db_session
from app.db import models
from app.schemas.session import SessionCreate, SessionOut

router = APIRouter()

@router.post("/sessions", response_model=SessionOut)
def create_session(payload: SessionCreate, db: Session = Depends(get_db_session)):
    sess = models.Session(**payload.dict())
    db.add(sess)
    db.commit()
    db.refresh(sess)
    return sess

@router.get("/sessions/upcoming", response_model=list[SessionOut])
def upcoming(db: Session = Depends(get_db_session)):
    return (
        db.query(models.Session)
        .filter(models.Session.date >= datetime.utcnow())
        .order_by(models.Session.date.asc())
        .all()
    )