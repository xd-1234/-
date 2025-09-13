from sqlalchemy.orm import Session
from collections import Counter
from app.db import models
from app.utils.scoring import compute_score
from datetime import datetime, timedelta
from app.core.config import settings

def _borrowed_within_cooldown(db: Session, student_id: int, book_id: int, weeks: int):
    cutoff = datetime.utcnow() - timedelta(weeks=weeks)
    return (
        db.query(models.BorrowHistory)
        .filter(models.BorrowHistory.student_id == student_id)
        .filter(models.BorrowHistory.book_id == book_id)
        .filter(models.BorrowHistory.borrowed_at >= cutoff)
        .first()
        is not None
    )

def allocate_session(db: Session, session_id: int):
    session = db.query(models.Session).get(session_id)
    students = db.query(models.Student).filter(models.Student.clazz == session.clazz, models.Student.active == True).limit(session.planned_students).all()
    books = db.query(models.Book).filter(models.Book.status == "available").all()
    category_count = Counter()
    total_planned = session.planned_students

    created = []
    used_book_ids = set()

    for stu in students:
        scored = []
        for bk in books:
            if bk.id in used_book_ids:
                continue
            if bk.reserved_flag not in (None, "B"):
                continue
            if _borrowed_within_cooldown(db, stu.id, bk.id, settings.COOL_DOWN_WEEKS):
                continue

            # 简化：等级匹配（未实现复杂逻辑，默认 1.0）
            level_fit = 1.0
            novelty = True
            diversity_boost = 1 - (category_count[bk.category] / total_planned) if total_planned else 1
            under_exposure = 1 / (1 + bk.popularity)
            score = compute_score(
                novelty=novelty,
                diversity_boost=diversity_boost,
                under_exposure=under_exposure,
                level_fit=level_fit,
                category_count=category_count,
                category=bk.category,
                total_planned=total_planned
            )
            scored.append((score, bk))
        scored.sort(key=lambda x: x[0], reverse=True)
        if not scored:
            continue
        primary = scored[0][1]
        alts = [b.id for _, b in scored[1:3]]
        rec = models.Recommendation(
            session_id=session_id,
            student_id=stu.id,
            primary_book_id=primary.id,
            alt_book_ids=alts,
            fallback_used=False
        )
        used_book_ids.add(primary.id)
        category_count[primary.category] += 1
        db.add(rec)
        created.append(rec)

    db.commit()
    for c in created:
        db.refresh(c)
    return created