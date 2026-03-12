# 给后端线程的衔接说明（Frontend Batch 11）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端当前已明确把 app-local screen model 校验层固定在 repository 边界：

- page
- query hook
- repository
- screen-model validation
- read adapter
- mock / generated source

这意味着：

1. backend 不需要为前端 screen model 命名负责
2. backend 只需要继续按 registry-first 输出 OpenAPI
3. 前端会自己完成 generated response -> screen model mapping
4. repository 会对 mapping 结果做最终校验

## 你下一步最适合给前端的内容

仍然是：**最小只读 OpenAPI**。

请继续优先覆盖：

### mobile

- products list / detail
- queue guard
- queue entries list / detail
- tasks list
- invites me / records
- wallet summary / ledgers
- withdrawals list
- me summary
- rules list / detail

### admin

- dashboard summary
- products list
- orders list
- queue entries list
- settlement slots list
- campaigns list
- tasks list
- invites list
- withdrawals list
- risk cases list / detail
- audit logs list

## 对你这边的约束提醒

- 不要口头给字段
- 先登记，再 OpenAPI，再生成 `packages/api-client`
- 不要把 frontend screen model 误当成 shared API contract
