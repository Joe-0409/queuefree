# 给服务器线程的衔接说明（Frontend Batch 10）

本轮前端没有新增任何冻结项，也没有新增公开 env / 路由 / 域名。

本轮只是补齐：

- generated SDK readiness 可见性
- generated adapter 切换门禁
- 本地 guardrail 扩展

## 对服务器线程的直接影响

当前仍然不需要：

- 新增前端 env var
- 新增路由
- 修改公开域名
- 修改 CI 部署目标

## 你下一步最适合接什么

等 backend 真正交付 OpenAPI 之后，服务器线程可以在 CI 里准备串联：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
pnpm verify:frontend-guardrails
```

但在 backend spec 落地之前，不需要提前改部署。

## 当前重点

继续保持：

- registry-first
- secret 与 env 不新增
- public route 不变
- queuefree.com/contact 不回退成 /support
