# 给后端线程：第 3 批 Web 官网完成后的衔接说明

## 1. 本轮没有新增冻结项

这一批只落地了 `apps/web` 页面骨架。

没有新增：

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
- env var
- domain
- route

因此这轮 **不要求你修改 registry**。

## 2. 这批 Web 目前不消费猜测型 API

为了遵守协作契约，本轮没有手写猜测型规则 API contract。

现在的官网与合规页：

- 直接消费 `packages/shared` 的硬规则常量
- 对可运营阈值只展示 fallback 示例
- 不依赖 `packages/api-client`

## 3. 你下一步需要准备什么

请你后续在后端线程补齐：

- `GET /v1/rules`
- `GET /v1/rules/:slug`

并且在 OpenAPI 中稳定导出以下最小内容：

- slug
- title
- summary
- sections[]
- updatedAt
- ruleVersion
- locale
- visibility

注意：

- 如果你新增这些响应字段，先登记 registry，再生成 OpenAPI，再生成 `packages/api-client`。
- 前端会在后续批次把静态文案切换到真实 SDK。

## 4. 对 Web 来说你最重要的保证

- `/contact` 页面不需要你改 API 路由
- Web 公共路径已经锁定，不要改
- 规则页未来即使改成动态数据，也必须保持现有公开 URL 不变
