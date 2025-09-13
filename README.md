# Smart Cabinet (Shared Classroom Bookshelf)

后端：FastAPI + PostgreSQL  
前端：React + Vite + TypeScript + Ant Design  

## 目录结构
```
backend/   后端服务 (FastAPI)
frontend/  前端 (React)
docker-compose.yml  一键启动（Postgres + Backend + Frontend）
```

## 后端快速开始（本地非 Docker）
```bash
cd backend
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -e .
cp .env.example .env
# （未来若加 Alembic 迁移）alembic upgrade head
uvicorn app.main:app --reload
```
访问：http://localhost:8000/docs

## 前端快速开始（本地非 Docker）
```bash
cd frontend
npm install
npm run dev
```
访问：http://localhost:5173

## 环境变量示例 (backend/.env)
```
DATABASE_URL=postgresql+psycopg://user:pass@localhost:5432/smartcabinet
API_PREFIX=/api
B_CLASS_RESERVE_COUNT=14
COOL_DOWN_WEEKS=6
```

## 功能概述
- B 班保障池生成（示例逻辑：选取低热度可用书）
- 场次创建与“基础版”推荐分配
- 冷却期（最近 N 周不重复推荐同一本）
- 简易多样性：按类别覆盖做轻量惩罚
- 推荐结果包含主书与备选列表
- 前端包含：
  - 仪表盘占位
  - 保障池查看（后续可按 reserved_flag 过滤）
  - 场次分配生成与查看

## Docker 一键启动
确保根目录存在 `docker-compose.yml`：
```bash
docker compose up --build
```
访问：
- 后端 API: http://localhost:8000/docs
- 前端开发站点: http://localhost:5173

关闭并清除数据库卷：
```bash
docker compose down -v
```

## 目录关键文件说明
```
backend/
  app/
    api/routes/        REST 路由
    services/          保障池与分配算法
    utils/             打分等工具
    db/models.py       数据模型定义
    core/config.py     配置 & 环境变量
frontend/
  src/
    components/        页面组件
    api/               前端接口封装
    pages/             页面级组件
```

## 当前限制 & TODO
- 未实现鉴权 / 用户体系（可后续接入 JWT / OAuth）
- 推荐算法为启发式单人循环匹配，可升级为匈牙利算法 / 最大加权匹配
- 没有借阅归还的完整生命周期（仅占位 BorrowHistory）
- 保障池策略缺少类别平衡 + 冷却记忆持久化
- 缺少监控指标（利用率、冷门激活、重复率 API）
- 未集成前端构建产物的生产部署（需 Nginx/静态托管）
- 未实现自动迁移（如需可加 Alembic script）

## 后续可扩展方向
| 主题 | 说明 |
|------|------|
| 鉴权 & 角色 | Admin / Teacher / Device API Key |
| 匹配优化 | 最大权匹配 / 整体多样性全局优化 |
| 指标统计 | 借阅趋势、类别覆盖、冷门激活率 |
| 设备同步 | 与智能书柜库存状态定期同步 |
| 学生画像 | 兴趣标签 + 等级动态调整 |
| 运营调参 | 权重配置持久化 + Admin UI |
| 日志审计 | 推荐/分配决策链路记录 |

## 常见开发命令
后端格式化（若引入 black）：
```bash
black backend/app
```
前端类型检查：
```bash
cd frontend
npm run lint
```

## 简易故障排查
| 现象 | 可能原因 | 处理 |
|------|----------|------|
| 前端调用 404 | API_PREFIX 不一致 | 确认 .env 与前端代理一致 |
| DB 连接失败 | Postgres 未启动 / URL 错误 | 检查 docker compose 日志 |
| 推荐为空 | 可用书数量不足 / 冷却过滤掉 | 增加测试数据或调低 COOL_DOWN_WEEKS |
| CORS 报错 | 浏览器跨域限制 | 收紧/调整 CORSMiddleware 配置 |

## 样例：插入测试数据（psql）
```sql
INSERT INTO books (title, category, popularity, status) VALUES
 ('书A','科普',3,'available'),
 ('书B','文学',5,'available'),
 ('书C','科普',8,'available'),
 ('书D','历史',2,'available');

INSERT INTO students (name, clazz, reading_level, active) VALUES
 ('张一','B',3,true),
 ('李二','B',4,true),
 ('王三','B',2,true);
```

## License / 许可
内部项目样板（未正式指定开源协议）。若需开源，建议添加 MIT 或 Apache-2.0 LICENSE 文件。

---

如需：  
- 添加 Alembic 初始迁移  
- 升级推荐为最大加权匹配  
- 增补生产部署（Nginx + 多阶段构建）  
随时提出。
