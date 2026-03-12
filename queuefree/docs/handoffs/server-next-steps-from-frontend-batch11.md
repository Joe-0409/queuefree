# 给服务器线程的衔接说明（Frontend Batch 11）

本轮前端没有新增 env var，也没有修改任何域名或冻结路由。

你这边当前仍然只需要维持现有 registry baseline：

- web: `queuefree.com`
- admin: `admin.queuefree.com`
- api: `api.queuefree.com`
- assets: `assets.queuefree.com`

## 本轮对你意味着什么

前端新增的是 app 内部 screen-model validation 边界，不涉及：

- mobile env var
- web env var
- admin env var
- 公开域名
- Web 公共路由
- Admin 路由

## 你下一步该准备什么

等 backend 最小只读 OpenAPI 到位后，再协助补：

1. CI 中 OpenAPI intake + SDK 生成 + 前端 guardrail 的串联顺序
2. staging 环境联调顺序
3. generated SDK 产物在流水线中的缓存与失效策略

当前仍然不要抢先新增前端 env。
