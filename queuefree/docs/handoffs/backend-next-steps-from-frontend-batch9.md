# 给后端线程的衔接说明（Frontend Batch 9）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端这边已经补齐了 `packages/api-client` 的 OpenAPI intake / generation / verification 脚手架。

## 你下一步最适合给什么

请直接给 **最小只读 OpenAPI 文件**，放到：

```text
packages/api-client/openapi/openapi.json
```

也可以是 yaml，但 JSON 最省事。

## 你要遵守的约束

- 先登记，再 OpenAPI，再前端生成 SDK
- path 必须继续落在 registry baseline 已冻结的 C 端 / Admin API 前缀范围内
- 每个 operation 必须有唯一 `operationId`
- 不要口头给字段
- 不要只给 Postman collection
- 不要把未登记的 request / response 字段塞进 spec

## 前端这边准备好了什么

你给出 spec 后，前端只需要跑：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
```

然后就能进入下一批 generated adapter 真接线。

## 建议优先顺序

### Mobile 只读 OpenAPI

优先给：

- session restore / me summary
- products list / detail
- queue guard
- queue entries list / detail
- tasks list
- invites me / records
- wallet overview / ledgers
- withdrawals list
- rules list / slug detail

### Admin 只读 OpenAPI

优先给：

- dashboard summary
- products list
- orders list
- queue pools / queue entries list
- settlement slots list
- campaigns list
- tasks list
- invites list
- withdrawals list
- risk cases list / detail
- audit logs list
