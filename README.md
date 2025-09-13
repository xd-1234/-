# Smart Cabinet (Shared Classroom Bookshelf)

后端：FastAPI + PostgreSQL  
前端：React + Vite + TypeScript + Ant Design  

## 目录
```
backend/   后端服务 (FastAPI)
frontend/  前端 (React)
```

## 后端快速开始
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -e .
cp .env.example .env
alembic upgrade head   # （如果你添加了迁移脚本）
uvicorn app.main:app --reload
```

## 前端快速开始
```bash
cd frontend
npm install
npm run dev
```

## 环境变量 (.env 示例)
放在 backend/.env：
```
DATABASE_URL=postgresql+psycopg://user:pass@localhost:5432/smartcabinet
API_PREFIX=/api
B_CLASS_RESERVE_COUNT=14
COOL_DOWN_WEEKS=6
```

## 功能概述
- B 班保障池生成
- 场次创建与推荐分配
- 简单多样性 & 冷却期逻辑
- 推荐备选书列表
- 前端基本管理页面（保障池查看 / 场次分配 / 仪表盘占位）

## 后续可扩展
- 鉴权 (JWT / OAuth)
- 二分图最大权匹配（全局最优）
- 指标统计 API
- Docker Compose
- 与智能书柜设备的库存同步适配器
- 书籍标签 / 学生兴趣画像

## 许可
内部项目样板，可根据需要调整。
