# Frontend OpenAPI Intake Pipeline v1.2

状态：Batch 9 / Frontend

## 目标

在不新增任何 registry 冻结项的前提下，为前端仓库补齐 `packages/api-client` 的 **OpenAPI 输入 → 校验 → 生成 → 验证 → 回滚到 placeholder** 流程。

## 本轮边界

本轮**没有**新增：

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

## 输入位置

OpenAPI 原始文件只允许放在：

```text
packages/api-client/openapi/
```

支持文件名：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

## 输出位置

生成后的 SDK 固定输出到：

```text
packages/api-client/src/generated/client/
```

barrel 入口固定为：

```text
packages/api-client/src/index.ts
```

## 命令

### 1. 校验输入

```bash
pnpm verify:openapi-intake
```

会检查：

- OpenAPI 必须是 3.x
- 必须存在 `paths`
- 每个 operation 必须有 `operationId`
- path 必须继续落在 registry baseline 已冻结的 C 端 / Admin API 前缀范围内

### 2. 生成 SDK

```bash
pnpm generate:api-client
```

会执行：

- intake 校验
- 清理旧生成产物
- 用 `openapi-typescript-codegen` 生成 fetch client
- 重写 `packages/api-client/src/index.ts`
- 写入 `.generated-stamp.json`

### 3. 校验生成结果

```bash
pnpm verify:generated-api-client
```

会检查：

- spec 存在时，generated client 必须存在
- generated client 存在时，spec 也必须存在
- `src/index.ts` 必须指向 `./generated/client`
- `packages/api-client/src` 下不能出现额外手写业务文件

### 4. 回到 placeholder

```bash
pnpm reset:api-client-placeholder
```

适用于：

- backend spec 回滚
- 想清空错误生成物
- 切回纯 skeleton / mock 模式

## 对 frontend 的直接影响

- mobile / admin 现有 adapter 结构不变
- 后续只需要把 generated adapter 里的实现替换到 generated SDK 即可
- 页面层、query hook、repository 层不用大改

## 对 backend 的要求

- 先登记，再 OpenAPI，再交前端生成
- 不要口头给字段
- 不要只给 Postman collection
- 不要跳过 `operationId`

## 对 server 的要求

- CI 可以在 spec 存在时串联：
  - `pnpm verify:openapi-intake`
  - `pnpm generate:api-client`
  - `pnpm verify:generated-api-client`
  - `pnpm verify:frontend-guardrails`
- 当前不需要新增任何前端公开 env
- 当前不需要改公开域名和冻结路由
