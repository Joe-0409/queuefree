# 给服务器线程的衔接说明（Frontend Batch 12）

本轮前端没有新增 env var，也没有修改任何冻结路由、域名或公开路径。

你这边本轮不需要新增：

- mobile env var
- web env var
- admin env var
- 公网域名
- Web 公共路径

## 你现在要维持的仍然是

- web: `queuefree.com`
- admin: `admin.queuefree.com`
- api: `api.queuefree.com`
- assets: `assets.queuefree.com`

## 等 backend OpenAPI 到位后，你再协助补

- CI 中 OpenAPI -> generated api-client -> frontend guardrails 的执行顺序
- staging 环境联调顺序
- 生成产物缓存与构建时机
- 如果需要，把 generated SDK 校验串进 PR / build pipeline

当前这轮只是把 generated bridge 槽位和 coverage gate 固定住，不涉及任何服务器侧新配置。
