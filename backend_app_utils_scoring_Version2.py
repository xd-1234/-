from collections import Counter

def compute_score(*, novelty: bool, diversity_boost: float, under_exposure: float,
                  level_fit: float, category_count: Counter, category: str,
                  total_planned: int, weights=None):
    weights = weights or {
        "novelty": 0.35,
        "diversity": 0.20,
        "under": 0.20,
        "level": 0.20,
        "saturation": 0.15
    }
    category_share = category_count[category] / total_planned if total_planned else 0
    saturation_penalty = category_share if category_share > 0.3 else 0
    return (
        (1 if novelty else 0) * weights["novelty"]
        + diversity_boost * weights["diversity"]
        + under_exposure * weights["under"]
        + level_fit * weights["level"]
        - saturation_penalty * weights["saturation"]
    )