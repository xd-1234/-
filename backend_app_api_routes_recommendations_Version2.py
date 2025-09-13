from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db_session
from app.services.allocation import allocate_session
from app.db import models
from app.schemas.recommendation import RecommendationOut

router = APIRouter()

@router.post("/sessions/{session_id}/generate", response_model=list[RecommendationOut])
def generate(session_id: int, db: Session = Depends(get_db_session)):
    session = db.query(models.Session).get(session_id)
    if not session:
        raise HTTPException(404, "Session not found")
    recs = allocate_session(db, session_id=session_id)
    return recs

@router.get("/sessions/{session_id}/recommendations", response_model=list[RecommendationOut])
def list_recs(session_id: int, db: Session = Depends(get_db_session)):
    return db.query(models.Recommendation).filter(models.Recommendation.session_id == session_id).all()