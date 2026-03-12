# 给后端线程的衔接说明（Frontend Batch 12）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端本轮新增的是：

- generated bridge 槽位
- generated bridge coverage manifest
- readiness 增加 coverage gating

## 你现在最需要做什么

继续按既有 registry-first 顺序推进，不要口头给字段：

1. 先确认最小只读 OpenAPI 的冻结范围
2. 导出正式 OpenAPI
3. 生成 `packages/api-client`
4. 再让前端把 generated bridge 逐个实现

## 前端当前已经固定好的桥接槽位

### mobile

- fetchHomeScreenData
- fetchQueueScreenData
- fetchTasksScreenData
- fetchInvitesScreenData
- fetchWalletScreenData
- fetchProfileScreenData
- fetchProductDetail
- fetchQueueEntryDetail
- fetchRulesCenterData
- fetchOrderSuccessData
- fetchDeleteAccountPreview

### mobile runtime config

- getRuntimeConfig

### admin

- fetchAdminDashboardData
- fetchAdminListPageConfig
- fetchAdminDetailPageConfig

## 约束提醒

- 不要新增未登记 request / response 字段
- 不要让前端直接猜 DTO
- 先 registry / shared / OpenAPI，再前端消费
- 如果这轮你要改 API path、字段、状态、env、route，必须先更新 registry
