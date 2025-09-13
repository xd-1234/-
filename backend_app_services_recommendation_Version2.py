from sqlalchemy.orm import Session
from app.db import models
from app.core.config import settings

def generate_b_class_reserve_pool(db: Session):
    # 简化示例：选出可用且低热度的书，标记给 B 班
    limit = settings.B_CLASS_RESERVE_COUNT
    candidates = (
        db.query(models.Book)
        .filter(models.Book.status == "available")
        .order_by(models.Book.popularity.asc())
        .limit(limit * 3)  # 冗余挑选
        .all()
    )
    selected = candidates[:limit]
    for b in selected:
        b.reserved_flag = "B"
    db.commit()
    return selected