# QueueFree 第 6 批：前端质量门禁与 Registry 对齐

这一批不是继续新增页面，而是先把前端仓库的边界锁死，避免：

- 未登记路由直接写进页面
- 未登记 public env 直接写进 app
- 没有 OpenAPI 时重新手写业务 API path
- `packages/shared` 混入 NestJS / Prisma 运行时代码

## 你现在要做什么

在项目根目录打开终端，执行：

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:web
```

如果要看后台：

```bash
pnpm dev:admin
```

如果要看手机端：

```bash
pnpm dev:mobile
```

## 这批新增了什么

- `pnpm verify:registry-first-frontend`
- `pnpm verify:route-registry`
- `pnpm verify:frontend-import-boundaries`
- `pnpm verify:frontend-guardrails`
- 前端路由审计文档
- 前端质量门禁说明文档
- 发给后端 / 服务器的话术

## 这批没有新增什么

- 没有新增 route
- 没有新增 env var
- 没有新增 enum / state / API field
- 没有新增 shared contract
- 没有新增手写 sdk
