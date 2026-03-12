# 给服务器线程的衔接说明（Frontend Batch 9）

本轮前端没有新增 env var，也没有修改任何域名或冻结路由。

你这边本轮最应该准备的是：**等 backend spec 到位后，把 CI 的 SDK 生成链路串起来**。

## 本轮前端新增了什么

- `pnpm verify:openapi-intake`
- `pnpm generate:api-client`
- `pnpm verify:generated-api-client`
- `pnpm reset:api-client-placeholder`

## 你暂时不要做什么

- 不要新增 mobile / web / admin 公开 env
- 不要改 Web `/contact`
- 不要改现有对外域名
- 不要提前假设 OpenAPI 下载 URL

## 你后面可以协助做什么

当 backend 把 spec 文件交付到仓库后，CI 可以按这个顺序加：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
pnpm verify:frontend-guardrails
```

## 当前仍应保持的基线

- Web：`queuefree.com`
- Admin：`admin.queuefree.com`
- API：`api.queuefree.com`
- Assets：`assets.queuefree.com`
