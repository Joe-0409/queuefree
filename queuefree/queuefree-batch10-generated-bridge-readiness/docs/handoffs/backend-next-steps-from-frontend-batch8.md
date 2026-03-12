# 给后端线程的衔接说明（Frontend Batch 8）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端已把 mobile / admin 的数据读取路径收敛为：

- page
- query hook
- repository
- read adapter
- generated adapter

后端下一步最适合提供的是：**最小只读 OpenAPI**，不要先给写接口。

## 建议优先顺序

### 1. mobile 只读 OpenAPI

请直接以 PRD v1.2 第 14.2 节和 registry baseline 的冻结 API 为准，优先覆盖这些模块：

- Auth 中前端已使用的只读会话恢复相关能力
- Products 列表 / 详情
- Queue guard
- Queue entries 列表 / 详情
- Tasks 列表
- Invites me / records
- Wallet 概览 / ledgers
- Withdrawals 列表
- Me 概览
- Rules 列表 / slug 详情

### 2. admin 只读 OpenAPI

请直接以 PRD v1.2 第 14.3 节和 registry baseline 的冻结 Admin API 为准，优先覆盖这些模块：

- dashboard summary
- products list
- orders list
- queue pools
- queue entries list
- settlement slots list
- campaigns list
- tasks list
- invites list
- withdrawals list
- risk cases list / detail
- audit logs list

## 对后端的约束提醒

- 不要口头给字段
- 先登记，再 OpenAPI，再生成 `packages/api-client`
- 前端当前不会接受未登记的 request / response 字段
