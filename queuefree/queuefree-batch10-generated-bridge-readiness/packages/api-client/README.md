# @queuefree/api-client

状态：pre-OpenAPI placeholder / generated SDK target

## 目的

`packages/api-client` 是 QueueFree 前端唯一允许消费的 SDK 包之一。

根据 PRD v1.2 与协作契约：

- 前端只能消费 `packages/shared` 和 `packages/api-client`
- `packages/api-client` 只能由 OpenAPI 生成
- 不允许在这里手写猜测型业务 path / DTO / response contract

## 当前模式

在 backend 还没有导出 OpenAPI 之前，本包保持 **placeholder 模式**，对外只暴露最小运行时元信息：

- `API_CLIENT_RUNTIME_MODE`
- `API_CLIENT_IS_GENERATED`
- `loadGeneratedApiClient()`

这些导出不是业务 contract，只用于前端适配器判断当前仓库是否已经进入 generated SDK 模式。

## 输入目录

OpenAPI 原始文件只允许放在：

```text
packages/api-client/openapi/
```

支持：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

## 生成命令

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
```

## 回到 placeholder

```bash
pnpm reset:api-client-placeholder
```

## 重要限制

- 不要把手写 REST path 塞进本包
- 不要把页面 view-model 放进本包
- 不要把 NestJS DTO / Swagger 类型塞进本包
- 真正的业务 SDK 必须来自 backend 已登记、已导出的 OpenAPI
