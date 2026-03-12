# Frontend Screen Model Validation v1.2

状态：Batch 11 / Frontend

## 目标

在不新增任何 registry 冻结项、也不猜测 backend contract 的前提下，把前端当前的读取链路统一收口到：

```text
page -> query hook -> repository -> screen-model validation -> read adapter
```

这样后续无论是 mock adapter 还是 generated adapter，只要最终返回的数据不符合页面当前使用的 screen model，都会在 repository 边界被拦下，而不是把非法数据直接带进页面。

## 本轮边界

本轮没有新增：

- route
- env var
- enum
- state
- API path
- request field
- response field
- table field
- event
- worker
- queue
- cron
- domain

## 为什么这一步必要

前端当前消费的不是 backend DTO，而是 app-local screen model：

- mobile 页面消费 `ProductCardModel`、`QueueEntryCardModel`、`WalletSummaryModel` 等
- admin 页面消费 `AdminDashboardData`、`ListPageConfig`、`DetailPageConfig` 等

即使未来 `packages/api-client` 已经由 OpenAPI 成功生成，generated SDK response 也不能直接进页面。仍然需要 app 内自己的 screen-model mapping。

本轮加的 schema 校验层，就是为了把这种约束明确下来。

## 当前规则

### 1. schema 只定义 app-local screen model

- `apps/mobile/src/schemas/mobile-screen-schemas.ts`
- `apps/admin/src/schemas/admin-screen-schemas.ts`

这些 schema 不是 shared contract，不会进入 `packages/shared`。

### 2. repository 是唯一 validation boundary

- `apps/mobile/src/lib/mobile-repository.ts`
- `apps/admin/src/lib/admin-repository.ts`

repository 必须对 adapter 返回值做 parse / validate。

### 3. adapter 保持 raw

adapter 只负责“取数 + 映射到初步 screen model 结构”，不负责 schema gating。

这样 mock 与 generated 可以共享同一层 repository 校验，不会各写一套逻辑。

### 4. 页面层不能直接碰 schema 或 validator

page / query hook 只依赖 repository，不直接依赖 schema 与 validator。

## 当前门禁脚本

### `pnpm verify:screen-model-validation`

会检查：

- mobile repository 必须接入 `mobile-screen-validators`
- admin repository 必须接入 `admin-screen-validators`
- adapters 不允许直接依赖 `/schemas/` 或 `screen-validators`
- app route files 不允许直接依赖 `/schemas/` 或 `screen-validators`

## 对 backend 的直接影响

- backend 仍然不需要为 screen model 负责
- backend 只需要按 registry + OpenAPI 输出真实接口
- 前端会在 generated adapter 内部完成 DTO -> screen model mapping，再由 repository 做最后校验

## 对 server 的直接影响

- 不需要新增 env
- 不需要改域名或路由
- CI 后续可在前端 guardrails 中继续保留这一层校验
