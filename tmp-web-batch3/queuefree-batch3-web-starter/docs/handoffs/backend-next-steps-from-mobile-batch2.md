# QueueFree 第 2 批：给后端线程的衔接说明

唯一规则源：`queuefree_prd_v1_2`

## 你现在要继承的已完成前提

前端第 2 批已经落地：

- `packages/shared`
- `packages/ui-tokens`
- `packages/api-client` 占位
- `apps/mobile` 全路由骨架
- `docs/contracts/mobile-screen-api-map-v1.2.md`

前端当前**没有手写猜测型 DTO**，只用了：

1. `packages/shared` 的稳定枚举 / 常量 / runtime config schema
2. 本地 mock 数据作为临时占位

## 后端线程下一步必须做什么

### 1）先按 PRD 固化 OpenAPI

必须先覆盖这些 C 端接口：

- `POST /v1/auth/otp/send`
- `POST /v1/auth/otp/verify`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`
- `GET /v1/me`
- `PATCH /v1/me/profile`
- `GET /v1/me/addresses`
- `POST /v1/me/addresses`
- `GET /v1/me/devices`
- `POST /v1/me/delete-account-requests`
- `GET /v1/products`
- `GET /v1/products/:productId`
- `POST /v1/orders`
- `GET /v1/orders`
- `GET /v1/orders/:orderId`
- `POST /v1/orders/:orderId/payment-intents`
- `GET /v1/queue-entries`
- `GET /v1/queue-entries/:queueEntryId`
- `GET /v1/queue-guard`
- `POST /v1/queue-guard/check-in`
- `POST /v1/queue-entries/:queueEntryId/boost`
- `GET /v1/tasks`
- `POST /v1/tasks/:taskId/claim`
- `GET /v1/invites/me`
- `POST /v1/invites/bind`
- `GET /v1/invites/records`
- `GET /v1/wallet`
- `GET /v1/wallet/ledgers`
- `GET /v1/withdrawal-accounts`
- `POST /v1/withdrawal-accounts`
- `POST /v1/withdrawals`
- `GET /v1/withdrawals`
- `GET /v1/rules`
- `GET /v1/rules/:slug`
- `GET /v1/notifications`

### 2）导出 OpenAPI 后，立刻生成 `packages/api-client`

顺序必须是：

1. 后端定义 OpenAPI
2. 生成 `packages/api-client`
3. 前端删除 mock 数据
4. 前端改成 SDK 调用

### 3）先满足手机端已做页面的最小字段

建议先补这些最小响应：

#### Products
- `id`
- `title`
- `subtitle`
- `priceMinor`
- `cashbackCapMinor`
- `stockLabel`

#### Queue Entry
- `id`
- `orderId`
- `productTitle`
- `status`
- `currentRank`
- `boostUsed`
- `nextSlotAt`
- `eligibleCashbackMinor`

#### Queue Guard
- `status`
- `validUntil`
- `graceUntil`

#### Wallet
- `pendingBalanceMinor`
- `availableBalanceMinor`
- `frozenBalanceMinor`
- `showRecoverableDebtHint`
- `activationLabel`

#### Withdrawal
- `id`
- `amountMinor`
- `status`
- `createdAt`

#### Rule Content
- `slug`
- `title`
- `body`
- `updatedAt`

## 后端线程禁止事项

- 不要跳过 OpenAPI 直接让前端手写 contract
- 不要把 DTO class 放进 `packages/shared`
- 不要把业务阈值写死在前端
- 不要私自改 mobile 已锁定路由
- 不要把钱包直接做成“只改总余额，没有账本”

## 前端等你输出什么

前端第 3 批最希望拿到：

1. OpenAPI 文件
2. 生成好的 `packages/api-client`
3. 最小鉴权说明
4. runtime config 接口 contract
5. `GET /v1/products`
6. `GET /v1/queue-entries`
7. `GET /v1/queue-guard`
8. `GET /v1/wallet`
9. `POST /v1/queue-guard/check-in`
10. `POST /v1/queue-entries/:queueEntryId/boost`
