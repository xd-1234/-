from pydantic import BaseModel
from datetime import datetime

class RecommendationOut(BaseModel):
    id: int
    session_id: int
    student_id: int
    primary_book_id: int | None
    alt_book_ids: list[int] | None = None
    chosen_book_id: int | None = None
    generated_at: datetime
    fallback_used: bool
    class Config:
        from_attributes = True