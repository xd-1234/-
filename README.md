# 智能书柜借阅管理系统 (Borrow System)

> 一个用于班级集中借阅管理的全栈示例项目：支持“学生/图书管理、智能借阅方案生成、方案执行、借阅记录、归还操作”。  
> 前端：React (Vite)；后端：Express + Prisma；数据库：SQLite（开发） / PostgreSQL（部署）  

---

## 🔥 功能概览

| 模块 | 功能点 |
|------|--------|
| 登录认证 | 管理员账号（seed 创建 admin / admin123）|
| 学生管理 | 列表、添加、借阅次数统计 |
| 图书管理 | 列表、添加、状态展示（可借 / 借出中）|
| 借阅方案 | 选定学生（限制人数）→ 生成方案（避免重复）→ 执行 |
| 借阅记录 | 全部历史记录、当前借出状态、归还操作 |
| 归还功能 | 更新记录 returnDate，图书状态恢复 |
| 统计概览 | 图书总数 / 可借数 / 已借出 / 学生数 / 借阅记录数 |
| 数据模型 | 方案（BorrowPlan）+ 方案项（BorrowPlanItem）+ 借阅记录（BorrowRecord）|
| 可扩展性 | 支持后续多班级、算法升级、角色扩展 |

---

## 🧱 技术栈

| 部分 | 技术 |
|------|------|
| 前端 | React 18 + Vite |
| 样式 | 原生 CSS（可接入 Tailwind / shadcn/ui） |
| 后端 | Node.js + Express |
| ORM | Prisma |
| 数据库 | SQLite (开发) / PostgreSQL (生产推荐) |
| 认证 | JWT |
| 构建工具 | Vite |
| 开发辅助 | tsx（运行 TS），concurrently（并行启动） |

---

## 📁 目录结构

```
.
├─ server/
│  ├─ prisma/
│  │  ├─ schema.prisma        # 数据模型
│  │  └─ seed.ts              # 种子数据（管理员、班级、学生、图书）
│  └─ src/
│     ├─ server.ts            # 后端入口
│     ├─ lib/
│     │  ├─ prisma.ts
│     │  ├─ auth.ts
│     │  └─ planAlgorithm.ts  # 借阅分配算法（可扩展）
│     └─ routes/
│        ├─ auth.ts
│        ├─ students.ts
│        ├─ books.ts
│        ├─ plans.ts
│        └─ records.ts
├─ src/
│  ├─ api/
│  │  ├─ client.js
│  │  └─ hooks/
│  │     ├─ useBooks.js
│  │     ├─ useStudents.js
│  │     ├─ usePlans.js
│  │     └─ useRecords.js
│  ├─ App.jsx
│  ├─ App.css
│  └─ main.jsx
├─ index.html
├─ package.json
├─ .env (本地开发用，部署时在平台变量配置)
└─ README.md
```

---

## 🚀 本地快速启动

### 1. 克隆仓库
```bash
git clone https://github.com/<你的用户名>/wangzhan.git
cd wangzhan
```

### 2. 安装依赖
```bash
npm install
```

### 3. 初始化数据库（SQLite）
```bash
npm run setup
# 等价于：
# npm run prisma:generate
# npm run prisma:migrate
# npm run prisma:seed
```

### 4. 启动后端
```bash
npm run server:dev
# 访问: http://localhost:3001
```

### 5. 启动前端（新开终端）
```bash
npm run dev
# 访问: http://localhost:5173
```

### 6. 登录
```
用户名: admin
密码: admin123
```

### 7. 一条命令同时启动前后端（可选）
```bash
npm run dev:all
```

---

## ⚙️ 环境变量（.env 示例）

本地 `.env`（不要提交敏感值到公开仓库）：
```
VITE_API_BASE=http://localhost:3001
JWT_SECRET=change-me-secret
# 部署 PostgreSQL 时加入：
# DATABASE_URL=postgresql://user:password@host:port/dbname?schema=public
```

---

## 🗄 数据模型（ER 概览）

```mermaid
erDiagram
  Class ||--o{ Student : contains
  Student ||--o{ BorrowRecord : has
  Book ||--o{ BorrowRecord : referenced
  BorrowPlan ||--o{ BorrowPlanItem : includes
  User ||--o{ BorrowPlan : created

  User {
    String id
    String username
    String passwordHash
    String role
  }

  Class {
    String id
    String name
  }

  Student {
    String id
    String name
    String classId
  }

  Book {
    String id
    String title
    String author
    String category
    String location
    String status
    String currentBorrowerStudentId
    Int    timesBorrowed
  }

  BorrowPlan {
    String id
    String classId
    String createdByUserId
    String status
  }

  BorrowPlanItem {
    String id
    String planId
    String studentId
    String bookId
    Boolean isRepeat
  }

  BorrowRecord {
    String id
    String studentId
    String bookId
    Date borrowDate
    Date returnDate
    String planId
  }
```

---

## 🔌 API 简要说明

| 方法 | 路径 | 描述 | 认证 |
|------|------|------|------|
| POST | /auth/login | 登录，返回 token | 否 |
| GET | /students | 学生列表 | 是 |
| POST | /students | 添加学生 | 是 |
| GET | /books | 图书列表 | 是 |
| POST | /books | 添加图书 | 是 |
| POST | /borrow-plans | 创建借阅方案 | 是 |
| GET | /borrow-plans/:id | 查看方案 | 是 |
| POST | /borrow-plans/:id/execute | 执行方案 | 是 |
| POST | /borrow-plans/:id/cancel | 取消方案（未执行）| 是 |
| GET | /borrow-records | 借阅记录列表 | 是 |
| POST | /borrow-records/:id/return | 归还一本书 | 是 |

请求头格式：
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 🧠 借阅分配算法（当前逻辑）

1. 输入：学生 ID 列表 + 可用图书列表  
2. 对每个学生：
   - 找出未借过且未被本次其他学生占用的书 → 随机取 1 本  
   - 如果没有“未借过”候选，则在剩余可用书中随便挑 1 本并标记 `isRepeat = true`
3. 输出：计划项数组（studentId, bookId, isRepeat）

后续可扩展：
- 公平（优先选“借出次数最少”的书）  
- 冷门推广（按 `1 / timesBorrowed` 加权）  
- 类别均衡（避免一个学生长期借同类型）  

---

## 🛠 常用脚本

| 命令 | 作用 |
|------|------|
| `npm run dev` | 启动前端开发服务器 |
| `npm run server:dev` | 启动后端（watch 模式） |
| `npm run dev:all` | 并行启动前后端 |
| `npm run prisma:generate` | 生成 Prisma Client |
| `npm run prisma:migrate` | 运行迁移（开发时） |
| `npm run prisma:seed` | 插入初始数据 |
| `npm run setup` | 一键：generate + migrate + seed |
| `npm run build` | 构建前端产物 |
| `npm run preview` | 本地预览前端构建结果 |

---

## ☁️ 部署指南（推荐组合）

### 前端（Vercel）
1. 导入 GitHub 仓库  
2. 环境变量：`VITE_API_BASE=https://你的后端域名`  
3. 自动构建：输出目录 `dist`

### 后端（Railway / Render）
1. 选择 “Deploy from GitHub”  
2. 设置环境变量：
   - `DATABASE_URL`（Postgres）
   - `JWT_SECRET`
3. 修改 `schema.prisma` datasource 为 `postgresql`  
4. 部署后执行：
   ```bash
   npx prisma migrate deploy --schema server/prisma/schema.prisma
   npx tsx server/prisma/seed.ts
   ```
5. 复制后端公共 URL，配置到前端变量里重新部署

---

## 🧪 测试（可选计划）
后续可添加：
- 单元测试：Jest + Supertest（测试 plan 生成 / 方案执行事务）
- E2E：Playwright（模拟用户创建方案 → 执行 → 归还）

---

## 🗺 路线图（Roadmap）

| 阶段 | 目标 |
|------|------|
| P0 | 当前功能闭环（已完成） |
| P1 | 方案历史列表页 |
| P2 | 借阅策略多样化（公平/冷门/类别均衡） |
| P3 | 多班级支持（Class CRUD + 切换） |
| P4 | 导出功能（CSV/Excel） |
| P5 | 权限分级（管理员 / 教师 / 学生自查） |
| P6 | 图书推荐（基于偏好与冷门权重） |
| P7 | 前端加入 React Query + 状态优化 |
| P8 | 部署 PostgreSQL + 备份策略 |
| P9 | 指标 & 日志监控（pino + Axiom/Logtail） |

---

## ❓ 常见问题 (FAQ)

**Q: 登录失败 401？**  
A: 确认后端已启动；浏览器 Network 是否指向正确 `VITE_API_BASE`；是否 seed 过。  

**Q: 数据库迁移报错？**  
A: 删除开发 SQLite：`rm server/prisma/dev.db` 后重新 `npm run prisma:migrate`。生产不要随意删。  

**Q: 借阅方案执行时提示“可用图书不足”？**  
A: 你选的学生人数 > 当前状态为 `available` 的图书数。添加更多书或归还。  

**Q: 部署后前端空白？**  
A: 检查控制台是否 CORS 或 404，环境变量是否正确。  

---

## 🤝 贡献

欢迎提交：
- Bug 修复（issue / PR）
- 新策略（planAlgorithm.ts 改进）
- 文档补充（README / Wiki）

PR 说明建议包含：
- 变更原因
- 截图（UI 改动）
- 测试说明

---

## 📄 许可证

默认未指定，可选择：
- MIT（开源友好）
- AGPL（限制闭源使用）
- 私有（内部项目）

可按需要添加 `LICENSE` 文件。

---

## ✅ 下一步你可以做什么？

1. 已经跑起来 → 开始改 UI 或算法  
2. 想加“方案历史” → 新建路由 GET /borrow-plans（列表）  
3. 想换数据库 → 改 schema.prisma provider + 迁移  
4. 想多班级 → 添加 Class CRUD + 前端班级选择下拉  

---

如果你需要：  
A. 方案历史页面示例  
B. 算法公平加权示例  
C. Docker Compose 部署模板  
D. React Query 版本 Hooks  

直接在聊天里回复“给我 A/B/C/D”即可。  
祝构建顺利！🚀
