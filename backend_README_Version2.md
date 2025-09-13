# Smart Cabinet Backend

## 快速开始
```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
cp .env.example .env
alembic upgrade head
uvicorn app.main:app --reload
```

## 环境变量 (.env)
```
DATABASE_URL=postgresql+psycopg://user:pass@localhost:5432/smartcabinet
API_PREFIX=/api
B_CLASS_RESERVE_COUNT=14
COOL_DOWN_WEEKS=6
```

## 主要逻辑
- services/recommendation.py 生成保障池（示例）
- services/allocation.py 为单个场次分配（基础算法）
- utils/scoring.py 打分函数，可调整权重

## TODO
- 鉴权 (JWT)
- 与智能柜硬件库存同步适配器
- Hungarian Algorithm 全局最优匹配
- 指标统计汇总