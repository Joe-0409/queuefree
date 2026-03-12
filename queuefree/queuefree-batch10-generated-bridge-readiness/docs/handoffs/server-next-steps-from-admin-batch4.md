# Server Next Steps from Admin Batch 4

规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`

## 当前前端状态

`apps/admin` 第1批已经落地本地可运行骨架。

本轮没有新增：

- 域名
- 子域名
- 环境变量
- 路由

## 服务器线程下一步建议

### 1. 保持现有域名基线不变

只使用已登记域名：

- local: `http://localhost:3001`
- dev: `https://dev-admin.queuefree.com`
- staging: `https://stg-admin.queuefree.com`
- prod: `https://admin.queuefree.com`

### 2. 保持现有 admin 环境变量不变

只使用已登记的 admin 环境变量：

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ADMIN_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`

### 3. 优先做的部署准备

- Admin 单独站点部署位
- dev / staging / prod 分环境
- Sentry 前端接线预留
- CI 跑 `pnpm --filter @queuefree/admin build`
- 与 Web / API 分离部署

### 4. 当前不要擅自追加

- 不要新增 Admin secret 命名
- 不要私自更改 admin 子域名
- 不要把 `/contact`、Web 公共页搬到 Admin
- 不要新增 admin 路由重写
