# 给后端线程：第 3 批 Web 官网完成后的衔接说明（Batch 5 清理后版本）

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

现在的官网与合规页：

- 直接消费 `packages/shared` 的硬规则常量
- 对可运营阈值只展示 fallback 示例
- 不依赖 `packages/api-client`

## 3. 你下一步需要准备什么

请你后续在后端线程补齐：

- public rules content 模块
- public compliance content 模块（如果你希望后续由后台管理）

注意：

- 如果你新增 path / field / state，先登记 registry，再生成 OpenAPI，再生成 `packages/api-client`
- Web 公开路径已经锁定，不要改 URL
- `/contact` 继续保持公开合规页面，不要改回 `/support`

## 4. 对 Web 来说你最重要的保证

- 规则内容未来即使切成动态数据，也必须保持现有公开 URL 不变
- 前端不会提前口头接字段，只会等待 registry + OpenAPI
