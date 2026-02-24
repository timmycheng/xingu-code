# 张心谷景观设计师个人网站

现代化、前后端分离的个人网站，包含作品集、博客、摄影展示、留言板和活动召集功能。

## 项目结构

```
xingu-code/
├── frontend/          # 前端主站 (Nuxt 3)
├── admin/             # 后台管理系统 (Nuxt 3)
├── backend/           # 后端 API 和数据库 Schema
├── uploads/           # 上传文件存储
└── docs/              # 文档
```

## 技术栈

### 前端 (Frontend)
- **框架**: Nuxt 3.10+ (Vue 3.4+ Composition API + TypeScript)
- **UI 库**: Element Plus
- **状态管理**: Pinia
- **样式**: Tailwind CSS + SCSS
- **认证**: Supabase Auth

### 后台管理 (Admin)
- 与前端主站相同的技术栈
- 独立部署，共享设计系统

### 后端 (Backend)
- **BaaS**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **数据库**: PostgreSQL with Row Level Security (RLS)
- **文件存储**: Supabase Storage

## 快速开始

### 1. 环境准备

- Node.js 18+
- npm 或 pnpm
- Supabase 账号

### 2. 设置 Supabase

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL Editor 中运行 `backend/supabase-schema.sql` 创建数据库表
3. 获取项目 URL 和 Anon Key

### 3. 配置前端

```bash
cd frontend
cp .env.example .env
# 编辑 .env 文件，填入 Supabase 配置
npm install
npm run dev
```

### 4. 配置后台管理

```bash
cd admin
cp .env.example .env
# 编辑 .env 文件，填入 Supabase 配置（与前端相同）
npm install
npm run dev
```

## 环境变量

| 变量 | 说明 |
|------|------|
| `NUXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL |
| `NUXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key |

## 功能模块

| 模块 | 前台功能 | 后台管理 |
|------|---------|---------|
| 首页 | 个人形象展示、精选作品、最新文章 | - |
| 关于 | 个人介绍、团队介绍 | - |
| 项目 | 作品集列表、项目详情、图片画廊 | 增删改查 |
| 博客 | 文章列表、分类筛选、文章详情 | 增删改查 |
| 摄影 | 相册列表、作品展示、灯箱效果 | 增删改查 |
| 留言 | 留言板、留言提交 | 审核、回复 |
| 活动 | 活动列表、活动详情、在线报名 | 增删改查、报名管理 |
| 用户 | 注册、登录、个人中心 | 用户管理 |

## 设计主题

- **主色渐变**: `#9333ea` → `#ec4899` (紫粉渐变)
- **设计风格**: 极简主义、大图展示、微交互动画
- **响应式**: Mobile First

## 开发规范

### 目录结构

```
frontend/
├── assets/
│   └── css/
│       ├── main.css       # 全局样式
│       └── theme.css      # 主题样式
├── components/            # Vue 组件
├── composables/           # 组合式函数
├── layouts/               # 布局组件
├── middleware/            # 路由中间件
├── pages/                 # 页面组件
├── plugins/               # 插件
├── stores/                # Pinia stores
├── supabase/              # Supabase 客户端
└── types/                 # TypeScript 类型定义
```

### 命名规范

- 组件：PascalCase (如 `ProjectCard.vue`)
- 文件：kebab-case (如 `project-card.vue`)
- Composables: camelCase 前缀 `use` (如 `useAuth.ts`)

## 部署

### 前端部署

推荐使用 Vercel 或 Netlify：

```bash
npm run build
# 或生成静态站点
npm run generate
```

### 后台部署

与前端类似，建议独立部署。

## 许可证

MIT License

---

**张心谷景观设计师** © 2024
