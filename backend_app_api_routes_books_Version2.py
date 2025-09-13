from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db_session
from app.db import models
from app.schemas.book import BookCreate, BookOut

router = APIRouter()

@router.get("/books", response_model=list[BookOut])
def list_books(db: Session = Depends(get_db_session)):
    return db.query(models.Book).all()

@router.post("/books", response_model=BookOut)
def create_book(payload: BookCreate, db: Session = Depends(get_db_session)):
    book = models.Book(**payload.dict())
    db.add(book)
    db.commit()
    db.refresh(book)
    return book