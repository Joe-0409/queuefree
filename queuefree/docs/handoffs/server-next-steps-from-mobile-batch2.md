# QueueFree 第 2 批：给服务器线程的衔接说明

唯一规则源：`queuefree_prd_v1_2`

## 前端第 2 批已经固定的东西

已经固定且不要再改：

- Monorepo：`apps/` + `packages/`
- Mobile：Expo + React Native + expo-router
- Web / Admin：后续仍是 Next.js
- API / Worker：后续仍是 NestJS
- `packages/shared` 已存在
- `packages/api-client` 目前是占位，等 OpenAPI 生成
- Mobile 路由已经按 PRD 固定

## 服务器线程下一步优先做什么

### 1）先把环境变量分组表写清楚

至少要分：

- `mobile`
- `web`
- `admin`
- `api`
- `worker`
- `shared`

### 2）先补移动端最早会用到的变量

#### mobile
- `EXPO_PUBLIC_ENV_NAME`
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_ENABLE_DEMO_MODE`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`

#### api / worker
- 数据库连接
- Redis 连接
- JWT secret
- 支付 provider secret
- 短信 provider secret
- Sentry DSN
- 对象存储配置

### 3）锁定移动端访问入口

移动端后续主要连：

- `api.queuefree.com`
- dev/staging 对应子域

不要改 public Web 的固定路径：

- `/privacy`
- `/terms`
- `/rules`
- `/delete-account`
- `/contact`

### 4）把 Expo EAS 流程和 API 部署流程定下来

至少要覆盖：

- 本地开发
- dev
- staging
- production

并明确：

- 谁负责 EAS build
- 谁负责 EAS submit
- 谁负责 Render API / Worker 部署
- 谁负责 Vercel Web / Admin 部署

## 服务器线程禁止事项

- 不要把 Web `/contact` 改回 `/support`
- 不要私自新增多市场、多语言 MVP 环境变量
- 不要让 mobile 直接依赖 secret
- 不要让前端把业务阈值写进 `.env`

## 前端等你输出什么

前端第 3 批最需要服务器线程给出：

1. 环境变量清单（按应用拆）
2. dev / staging / prod 域名表
3. Expo EAS 基本流程
4. API / Worker 部署矩阵
5. Sentry / PostHog 接入位说明
6. mobile 本地 `.env.example` 最终版
