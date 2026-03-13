# Frontend Readonly Generated Bridge v1.2

## 目标

在不新增任何冻结项的前提下，把只读 OpenAPI 生成的 SDK 接入现有前端桥接层：

- `page -> query hook -> repository -> generated adapter -> generated bridge -> sdk`

## 不变的边界

- 不新增 route
- 不新增 env var
- 不手写猜测 API path
- 不往 `packages/api-client` 写手工 adapter
- `packages/shared` 继续只放稳定共享 contract

## Mobile readonly 真接线

- Home: `listProducts + getQueueGuard`
- Queue: `getQueueGuard + listQueueEntries`
- Profile: `getMeOverview + getRuntimeConfig`
- Product detail: `getProductById`
- Queue detail: `getQueueEntryById + getQueueGuard`
- Rules center: `listRules + getRuleBySlug(first item)`
- Order success: `listQueueEntries + getQueueGuard`（按 `orderId` 匹配）
- Delete account preview: `getMeOverview + shared statuses`
- Runtime config adapter: `getRuntimeConfig` merged with shared defaults

## Admin readonly 真接线

- Dashboard: `getHealth + getRuntimeConfig + listProducts + listQueueEntries + listRules`
- `/products`: `listProducts`
- `/products/[productId]`: `getProductById`
- `/queues`: `listQueueEntries`
- `/queues/[entryId]`: `getQueueEntryById + getQueueGuard`
- `/governance`: `listRules + getRuleBySlug(first item)`

## Placeholder 保留范围

### Mobile
- tasks
- invites
- wallet
- delete-account mutation

### Admin
- orders
- slots
- campaigns
- tasks
- invites
- wallet
- withdrawals
- risk
- audit
- all mutations

这些模块仍通过 app-local placeholder 保持页面可运行，但不新增任何猜测型后端 contract。
