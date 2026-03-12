# QueueFree 协作契约 v1.2

状态：Locked  
生效日期：2026-03-11  
唯一规则源：`queuefree_prd_v1_2`

---

## 1. 目标

本文件用于约束 QueueFree 的三个实现线程：

1. 前端线程（Mobile / Web / Admin）
2. 后端线程（API / Worker / DB / OpenAPI）
3. 服务器线程（环境 / 域名 / 部署 / CI/CD / Secret / Runbook）

目的只有一个：**避免三个线程各自脑补，从而出现字段不一致、状态不一致、路由不一致、域名不一致、环境变量不一致。**

---

## 2. 真相源优先级

发生冲突时，按下面顺序裁决：

1. `queuefree_prd_v1_2`
2. `packages/shared`
3. `packages/api-client`（仅由 OpenAPI 生成）
4. `docs/registry/registry-baseline-v1.2.md`
5. 线程内部草稿、临时说明、口头假设

任何线程都不得绕过第 1 层和第 2 层直接发明新规则。

---

## 3. 三线程边界

### 3.1 前端线程负责

前端线程只负责：

- Mobile / Web / Admin 页面与组件
- 路由实现
- 表单交互
- API 调用接入
- 加载态 / 错误态 / 空态 / 成功反馈
- 金额与时间格式化展示

前端线程 **不得负责**：

- 私自定义业务阈值
- 私自新增订单 / 钱包 / 队列状态
- 私自猜测 API 响应结构
- 私自把 DTO class 放进 `packages/shared`

前端线程只能消费：

- `packages/shared`
- `packages/api-client`

---

### 3.2 后端线程负责

后端线程只负责：

- NestJS 模块划分
- Prisma schema
- REST API
- DTO / validator / Swagger 装饰器
- BullMQ queue / worker
- 幂等与事务
- 资金账本
- 审计日志
- 运行时配置下发

后端线程 **不得负责**：

- 私自修改前端固定公开路由
- 私自改成 GraphQL
- 私自把 shared package 变成 NestJS DTO 仓库
- 私自把运行时配置改成前端硬编码

后端线程可以定义：

- `services/api`
- `services/worker`
- OpenAPI，并生成 `packages/api-client`

---

### 3.3 服务器线程负责

服务器线程只负责：

- 环境分层
- 域名与子域名
- GitHub / Vercel / Render / Supabase / Upstash / R2 / Cloudflare / Expo EAS 的部署与接线
- Secret 管理
- CI/CD
- 监控、告警、备份、恢复、回滚
- 审核前演示环境准备

服务器线程 **不得负责**：

- 私自新增业务字段
- 私自改 API 路径
- 私自改订单、钱包、队列状态枚举
- 私自把合规公开页路径改成别的地址

---

## 4. `packages/shared` 的硬边界

`packages/shared` 只允许放下面这些内容：

- enums
- constants
- schemas
- types
- formatters
- labels
- domain utils

`packages/shared` 明确禁止放：

- NestJS DTO class
- `class-validator` 装饰器
- `@nestjs/swagger` 装饰器
- Prisma model 绑定逻辑
- Controller request class
- Framework runtime 绑定代码

换句话说：

- **共享稳定 contract 放 shared**
- **Nest 专属协议层放 services/api**
- **前端 SDK 一律由 OpenAPI 生成到 packages/api-client**

---

## 5. 共享契约冻结项

以下内容属于冻结项，任何新增、删除、修改都必须先登记：

1. 枚举值
2. 状态机流转
3. API path
4. 请求字段
5. 响应字段
6. 数据表字段
7. 事件名
8. Worker 名称
9. Queue 名称
10. Cron 名称
11. 环境变量名
12. 域名
13. Web / Mobile / Admin 路由

未登记之前，不允许任何线程直接把它写进代码。

---

## 6. 固定硬规则与运行时配置边界

### 6.1 固定硬规则（可进 shared 常量）

这些规则可以进入 `packages/shared/src/constants/business-rules.ts`：

- `ORDER_QUEUE_SEAT_COUNT = 1`
- `QUEUE_TOP_PROTECTED_COUNT = 30`
- `QUEUE_BOOST_MAX_PER_ENTRY = 2`
- `INVITE_MAX_DEPTH = 1`
- `WALLET_SUPPORTS_TOP_UP = false`
- `WALLET_SUPPORTS_PEER_TRANSFER = false`

### 6.2 运行时配置（必须由后端返回）

这些值属于运营可调整项，必须由后端返回，前端只能消费，不能自己写死：

- 保活时长
- 冻结宽限期
- 提现金额门槛
- 单笔上限
- 单日上限
- 时隙列表
- 活动封顶金额
- 广告开关
- FAQ / 规则文案
- 市场币种 / 时区 / 语言

允许在 `packages/shared` 中定义：

- 运行时配置 schema
- 默认 fallback 值

但 fallback 不能绕过服务端作为长期真相源。

---

## 7. API 与路由冻结项

### 7.1 API 前缀

- C 端：`/v1`
- Admin：`/v1/admin`

### 7.2 Web 公开页固定路径

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

### 7.3 Mobile 核心路由固定路径

- `/(public)/welcome`
- `/(public)/auth/phone`
- `/(public)/auth/otp`
- `/(app)/(tabs)/home`
- `/(app)/(tabs)/queue`
- `/(app)/(tabs)/tasks`
- `/(app)/(tabs)/invites`
- `/(app)/(tabs)/wallet`
- `/(app)/(tabs)/me`
- `/(app)/product/[productId]`
- `/(app)/checkout/[productId]`
- `/(app)/orders/success/[orderId]`
- `/(app)/queue/[entryId]`
- `/(app)/wallet/withdraw`
- `/(app)/me/addresses`
- `/(app)/me/security`
- `/(app)/rules`
- `/(app)/rules/queue`
- `/(app)/rules/wallet`
- `/(app)/rules/activity/[campaignId]`
- `/(app)/privacy`
- `/(app)/terms`
- `/(app)/support`
- `/(app)/delete-account`

### 7.4 Admin 固定路由

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

---

## 8. 统一命名规范

### 8.1 事件命名

统一使用小写、点分隔：

- `queue.entry.created`
- `queue.entry.frozen`
- `queue.entry.restored`
- `queue.entry.removed`
- `queue.entry.boosted`
- `settlement.slot.settled`
- `wallet.pending.created`
- `wallet.cashback.released`
- `wallet.clawback.created`
- `withdrawal.applied`
- `withdrawal.approved`
- `withdrawal.rejected`
- `risk.case.created`
- `account.delete.requested`

### 8.2 Worker Job 命名

统一使用小写 kebab-case：

- `create-queue-entry-after-payment`
- `restore-frozen-entries-after-checkin`
- `freeze-expired-entries`
- `remove-expired-frozen-entries`
- `run-slot-settlement`
- `release-cashback-after-observation`
- `clawback-after-refund`
- `check-invite-cooling-off`
- `payout-after-withdrawal-approval`
- `score-risk-case`

### 8.3 Queue 名称

统一使用小写 kebab-case：

- `payments-events`
- `queue-guard`
- `settlement-slots`
- `wallet-events`
- `invites`
- `withdrawals`
- `risk-cases`

### 8.4 Cron 名称

统一使用小写 kebab-case：

- `queue-guard-freeze-scan`
- `queue-guard-remove-scan`
- `settlement-slot-dispatch`
- `cashback-release-scan`
- `invite-effective-scan`

---

## 9. 每轮输出必须带的四段

从现在开始，三个线程的每一轮输出都必须显式带这四段：

1. `Assumptions`
2. `Shared Contract Changes`
3. `Risks / Blockers`
4. `Files Changed`

要求：

- 如果没有新增契约，也必须写“无”
- 如果有新增状态或字段，必须写清楚具体值
- 如果修改了路径、事件、环境变量，必须逐项列出

---

## 10. 变更流程

### 10.1 新增共享字段时

必须同时完成：

1. 更新 PRD 假设说明（如确需补充）
2. 更新 `packages/shared`
3. 更新 `docs/registry/registry-baseline-v1.2.md`
4. 后端更新 OpenAPI
5. 重新生成 `packages/api-client`
6. 前端再开始消费

顺序不能反。

### 10.2 新增业务状态时

必须同时说明：

- 状态名称
- 进入条件
- 可流向状态
- UI 展示文案
- 审计日志事件
- 是否影响钱包 / 队列 / 提现 / 删除账号流程

### 10.3 新增环境变量时

必须同时说明：

- 变量名
- 所属应用（mobile/web/admin/api/worker/shared）
- 所在环境（local/dev/staging/prod）
- 是否 secret
- 默认值策略
- 使用位置

---

## 11. 禁止事项

三个线程统一禁止：

- 改技术栈
- 改 Monorepo 结构
- 在前端写死运营阈值
- 在 shared 里混入 NestJS DTO
- 在没有 OpenAPI 的情况下手写猜测型 API contract
- 把 Redis 当成订单或资金真相源
- 跳过 ledger 直接改钱包余额
- 跳过 audit log 做敏感后台操作
- 把 Web `/contact` 改回 `/support`
- 私自引入多市场、多语言、多币种 MVP 逻辑
- 在页面文案里写“保证赚钱 / 保证返现 / 保证免单”

---

## 12. 当前拍板结论（协作执行版）

### 12.1 首发锁定

- Market: `PH`
- Currency: `PHP`
- Timezone: `Asia/Manila`
- Locale: `en-PH`
- Website: `queuefree.com`
- 首审默认关闭 rewarded ads

### 12.2 产品锁定

- 无购物车
- 一单一商品，可多数量
- 1 个订单 = 1 个队列席位
- 用户级签到保活
- 订单级 Boost
- Top30 保护区
- 固定时隙结算
- 钱包先待释放后可提现
- 钱包激活双路径
- 单层邀请
- 删除账号 = 申请 + 清算 + 匿名化

### 12.3 技术锁定

- Monorepo: pnpm + Turborepo
- Mobile: Expo + React Native + expo-router
- Web/Admin: Next.js + Tailwind + shadcn/ui
- API: NestJS + Prisma + PostgreSQL + Redis + BullMQ
- Deploy: Vercel + Render + Supabase + Upstash + R2 + Cloudflare + Expo EAS
- `packages/shared` 只放稳定共享 contract
- `packages/api-client` 只从 OpenAPI 生成

---

## 13. 执行要求

从本文件生效开始：

- 前端线程先围绕 `packages/shared` 开工
- 后端线程先围绕 OpenAPI 与 `packages/shared` 对齐开工
- 服务器线程先围绕域名、环境变量分组、部署矩阵和 registry 开工
- 若三个线程发现冲突，以 `queuefree_prd_v1_2` 为准回退
