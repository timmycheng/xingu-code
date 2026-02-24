# 部署指南

## 准备工作

### 1. Supabase 设置

1. 访问 [Supabase](https://supabase.com) 创建账号
2. 创建新项目，选择靠近你目标用户的区域
3. 在 SQL Editor 中运行 `backend/supabase-schema.sql` 创建数据库表
4. 获取项目配置：
   - Settings → API
   - 复制 `Project URL` 和 `anon public` key

### 2. 环境变量配置

在 frontend 和 admin 目录下分别创建 `.env` 文件：

```bash
# frontend/.env
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# admin/.env (使用相同的值)
NUXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 部署选项

### 选项 1: Vercel (推荐)

#### 前端部署

1. 安装 Vercel CLI:
```bash
npm i -g vercel
```

2. 在 frontend 目录运行:
```bash
cd frontend
vercel login
vercel
```

3. 按照提示完成部署
4. 在 Vercel 仪表板中设置环境变量

#### 后台部署

后台管理与前端类似，建议作为独立项目部署:

```bash
cd admin
vercel login
vercel
```

### 选项 2: Netlify

#### 前端部署

1. 安装 Netlify CLI:
```bash
npm i -g netlify-cli
```

2. 构建项目:
```bash
cd frontend
npm run build
```

3. 部署:
```bash
netlify deploy --prod --dir=.output/public
```

### 选项 3: Docker 部署

#### 创建 Dockerfile (frontend)

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
```

#### 构建和运行

```bash
docker build -t xingu-frontend ./frontend
docker run -p 3000:3000 --env-file frontend/.env xingu-frontend
```

### 选项 4: 传统服务器 (Nginx + PM2)

#### 1. 构建项目

```bash
cd frontend
npm run build
```

#### 2. 使用 PM2 运行

```bash
npm i -g pm2
cd frontend
pm2 start .output/server/index.mjs --name xingu-frontend
```

#### 3. Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 创建管理员账号

### 方法 1: 通过 Supabase Dashboard

1. 登录 Supabase Dashboard
2. 进入 Authentication → Users
3. 点击 "Add User"
4. 填写管理员邮箱和密码
5. 在数据库中手动修改 role:

```sql
UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
```

### 方法 2: 修改 Schema

在 `backend/supabase-schema.sql` 中修改自动设置管理员的条件:

```sql
CASE
  WHEN NEW.email = 'your-admin@email.com' THEN 'admin'
  ELSE 'user'
END
```

## SEO 优化

### 生产环境检查清单

- [ ] 配置正确的 site URL
- [ ] 设置自定义域名
- [ ] 配置 SSL 证书 (HTTPS)
- [ ] 添加 sitemap.xml
- [ ] 配置 robots.txt
- [ ] 设置 Google Analytics
- [ ] 提交 Google Search Console

### Sitemap 配置

在 `nuxt.config.ts` 中添加:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/sitemap'
  ],
  sitemap: {
    urls: [
      'https://your-domain.com',
      'https://your-domain.com/about',
      'https://your-domain.com/projects',
      'https://your-domain.com/blog',
      'https://your-domain.com/photography',
      'https://your-domain.com/messages',
      'https://your-domain.com/events'
    ]
  }
})
```

## 性能优化

### 图片优化

1. 使用 WebP 格式
2. 启用图片懒加载
3. 使用 Supabase Image Transformation

### 缓存策略

在 Nginx 中添加:

```nginx
# Static assets
location /_nuxt {
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

## 监控和维护

### 日志查看

```bash
# PM2 logs
pm2 logs xingu-frontend

# Docker logs
docker logs xingu-frontend
```

### 备份数据库

定期从 Supabase Dashboard 导出数据库备份。

## 故障排除

### 常见问题

1. **CORS 错误**: 检查 Supabase 项目设置中的 URL 配置
2. **认证失败**: 确认环境变量正确配置
3. **图片不显示**: 检查 Storage bucket 权限

### 获取帮助

- 查看项目 README.md
- 检查 Supabase 文档: https://supabase.com/docs
- Nuxt 3 文档：https://nuxt.com/docs
