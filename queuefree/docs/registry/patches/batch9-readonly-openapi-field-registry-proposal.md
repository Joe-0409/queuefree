# QueueFree Batch 9 Read-Only OpenAPI Field Registry Proposal

状态：Draft / Pending Approval  
前提：Batch 8 已经先锁定最小只读 path skeleton，本文件只补 **request / response field registry**，不新增 path、enum、state、event、queue、cron、env、domain、route。

---

## 1. Scope

本 patch 只覆盖以下目标：

1. 给 Batch 8 已锁定的只读 API 补最小 request / response 字段。
2. 不补写接口，不补写 DTO，不补写 Prisma，不生成 `packages/api-client`。
3. 不新增写接口字段。
4. 不新增任何新的业务枚举；如必须表达分类或说明，优先使用 `...Text` / `...Label` 文本字段，而不是发明新的 enum。

---

## 2. Shared Read API Conventions（提案）

### 2.1 ID / 时间 / 金额

- 所有 `...Id` 字段：`string`（UUID）
- 所有时间字段：`string`（ISO 8601 UTC）
- 所有金额字段：`integer`（minor unit）
- 所有 JSON 字段命名：`camelCase`

### 2.2 List Response

对于列表接口，统一返回：

- `items`: array
- `nextCursor`: `string | null`（仅分页型列表接口出现）

### 2.3 List Request

对于分页型列表接口，统一允许：

- `cursor`: `string | null`
- `limit`: `integer | null`

### 2.4 本批次明确不引入

- 不新增统一 `meta` / `pagination` 包装对象
- 不新增新的筛选 enum
- 不新增新的排序字段约定
- 不新增新的 `statusGroup` / `tabType` 等前端专用分组字段

---

## 3. C 端只读 API：字段登记提案

### 3.1 GET `/v1/me`

#### response

- `userId`: string
- `phoneMasked`: string
- `inviteCode`: string
- `walletActivated`: boolean
- `walletActivationMethod`: `WalletActivationMethod | null`
- `accountDeleteStatus`: `AccountDeleteStatus`
- `marketCode`: string
- `currency`: string
- `timezone`: string
- `ruleVersion`: string

---

### 3.2 GET `/v1/products`

#### response

- `items`: ProductListItem[]

#### ProductListItem

- `productId`: string
- `title`: string
- `coverImageUrl`: string
- `priceMinor`: integer
- `currency`: string
- `defaultCashbackCapMinor`: integer
- `queueEnabled`: boolean
- `soldOut`: boolean

---

### 3.3 GET `/v1/products/{productId}`

#### path params

- `productId`: string

#### response

- `productId`: string
- `title`: string
- `descriptionText`: string
- `coverImageUrl`: string
- `galleryImageUrls`: string[]
- `priceMinor`: integer
- `currency`: string
- `defaultCashbackCapMinor`: integer
- `queueEnabled`: boolean
- `soldOut`: boolean
- `maxOrderQty`: integer
- `skus`: ProductDetailSku[]

#### ProductDetailSku

- `skuId`: string
- `label`: string
- `priceMinor`: integer
- `soldOut`: boolean

---

### 3.4 GET `/v1/queue-guard`

#### response

- `status`: `UserQueueGuardStatus`
- `validUntil`: string
- `graceUntil`: string
- `lastCheckinAt`: `string | null`
- `canCheckInNow`: boolean
- `activeEntriesCount`: integer
- `frozenEntriesCount`: integer

---

### 3.5 GET `/v1/queue-entries`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: QueueEntryListItem[]
- `nextCursor`: `string | null`

#### QueueEntryListItem

- `queueEntryId`: string
- `orderId`: string
- `productId`: string
- `productTitle`: string
- `productCoverImageUrl`: string
- `quantity`: integer
- `status`: `QueueEntryStatus`
- `activeRank`: `integer | null`
- `boostUsedCount`: integer
- `canBoost`: boolean
- `isInProtectZone`: boolean
- `nextSettlementSlotAt`: `string | null`
- `finalCashbackMinor`: `integer | null`
- `currency`: string

---

### 3.6 GET `/v1/queue-entries/{queueEntryId}`

#### path params

- `queueEntryId`: string

#### response

- `queueEntryId`: string
- `orderId`: string
- `productId`: string
- `productTitle`: string
- `productCoverImageUrl`: string
- `productSkuLabel`: string
- `quantity`: integer
- `paidAmountMinor`: integer
- `currency`: string
- `status`: `QueueEntryStatus`
- `activeRank`: `integer | null`
- `boostUsedCount`: integer
- `canBoost`: boolean
- `isInProtectZone`: boolean
- `queueGuardStatus`: `UserQueueGuardStatus`
- `createdAt`: string
- `wonSettlementSlotAt`: `string | null`
- `cashbackAvailableAt`: `string | null`
- `finalCashbackMinor`: `integer | null`
- `timeline`: QueueEntryTimelineItem[]

#### QueueEntryTimelineItem

- `timelineId`: string
- `occurredAt`: string
- `title`: string
- `descriptionText`: string

---

### 3.7 GET `/v1/tasks`

#### response

- `items`: TaskListItem[]

#### TaskListItem

- `taskId`: string
- `title`: string
- `descriptionText`: string
- `categoryLabel`: string
- `rewardSummaryText`: string
- `progressCurrent`: integer
- `progressTarget`: integer
- `claimable`: boolean
- `claimed`: boolean
- `expiresAt`: `string | null`

---

### 3.8 GET `/v1/invites/me`

#### response

- `inviteCode`: string
- `inviteLink`: string
- `canBindInviteCode`: boolean
- `bindWindowEndsAt`: `string | null`
- `totalInviteCount`: integer
- `pendingEffectiveInviteCount`: integer
- `effectiveInviteCount`: integer
- `invalidInviteCount`: integer
- `walletActivated`: boolean
- `walletActivationMethod`: `WalletActivationMethod | null`

---

### 3.9 GET `/v1/invites/records`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: InviteRecordListItem[]
- `nextCursor`: `string | null`

#### InviteRecordListItem

- `relationId`: string
- `inviteeMaskedPhone`: string
- `status`: `InviteRelationStatus`
- `createdAt`: string
- `effectiveAt`: `string | null`
- `invalidReasonText`: `string | null`

---

### 3.10 GET `/v1/wallet`

#### response

- `walletActivated`: boolean
- `activationMethod`: `WalletActivationMethod | null`
- `pendingBalanceMinor`: integer
- `availableBalanceMinor`: integer
- `frozenBalanceMinor`: integer
- `currency`: string
- `canWithdraw`: boolean
- `hasSettlementException`: boolean

---

### 3.11 GET `/v1/wallet/ledgers`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: WalletLedgerListItem[]
- `nextCursor`: `string | null`

#### WalletLedgerListItem

- `ledgerId`: string
- `title`: string
- `balanceBucket`: string
- `deltaMinor`: integer
- `createdAt`: string
- `relatedOrderId`: `string | null`
- `relatedWithdrawalId`: `string | null`
- `noteText`: `string | null`

---

### 3.12 GET `/v1/withdrawals`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: WithdrawalListItem[]
- `nextCursor`: `string | null`

#### WithdrawalListItem

- `withdrawalId`: string
- `amountMinor`: integer
- `currency`: string
- `status`: `WithdrawalStatus`
- `createdAt`: string
- `updatedAt`: string
- `rejectReasonText`: `string | null`

---

### 3.13 GET `/v1/rules`

#### response

- `items`: RuleListItem[]

#### RuleListItem

- `slug`: string
- `title`: string
- `summary`: string
- `version`: string
- `updatedAt`: string

---

### 3.14 GET `/v1/rules/{slug}`

#### path params

- `slug`: string

#### response

- `slug`: string
- `title`: string
- `version`: string
- `contentMarkdown`: string
- `updatedAt`: string

---

## 4. Admin 只读 API：字段登记提案

### 4.1 GET `/v1/admin/dashboard/summary`

#### response

- `paidOrderCountToday`: integer
- `activeQueueEntryCount`: integer
- `frozenQueueEntryCount`: integer
- `scheduledSettlementSlotCount`: integer
- `runningSettlementSlotCount`: integer
- `pendingWithdrawalCount`: integer
- `pendingRiskCaseCount`: integer

---

### 4.2 GET `/v1/admin/products`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminProductListItem[]
- `nextCursor`: `string | null`

#### AdminProductListItem

- `productId`: string
- `title`: string
- `priceMinor`: integer
- `currency`: string
- `marketCode`: string
- `queueEnabled`: boolean
- `soldOut`: boolean
- `updatedAt`: string

---

### 4.3 GET `/v1/admin/orders`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminOrderListItem[]
- `nextCursor`: `string | null`

#### AdminOrderListItem

- `orderId`: string
- `userId`: string
- `userPhoneMasked`: string
- `productId`: string
- `productTitle`: string
- `quantity`: integer
- `paidAmountMinor`: integer
- `currency`: string
- `status`: `OrderStatus`
- `createdAt`: string
- `paidAt`: `string | null`

---

### 4.4 GET `/v1/admin/queue-pools`

#### response

- `items`: AdminQueuePoolListItem[]

#### AdminQueuePoolListItem

- `marketCode`: string
- `activeQueueEntryCount`: integer
- `frozenQueueEntryCount`: integer
- `nextSettlementSlotAt`: `string | null`

---

### 4.5 GET `/v1/admin/queue-entries`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminQueueEntryListItem[]
- `nextCursor`: `string | null`

#### AdminQueueEntryListItem

- `queueEntryId`: string
- `orderId`: string
- `userId`: string
- `userPhoneMasked`: string
- `productTitle`: string
- `status`: `QueueEntryStatus`
- `activeRank`: `integer | null`
- `boostUsedCount`: integer
- `createdAt`: string
- `wonSettlementSlotAt`: `string | null`

---

### 4.6 GET `/v1/admin/settlement-slots`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminSettlementSlotListItem[]
- `nextCursor`: `string | null`

#### AdminSettlementSlotListItem

- `settlementSlotId`: string
- `marketCode`: string
- `slotAt`: string
- `status`: `SettlementSlotStatus`
- `winnerQueueEntryId`: `string | null`
- `updatedAt`: string

---

### 4.7 GET `/v1/admin/campaigns`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminCampaignListItem[]
- `nextCursor`: `string | null`

#### AdminCampaignListItem

- `campaignId`: string
- `slug`: string
- `title`: string
- `startsAt`: string
- `endsAt`: string
- `active`: boolean

---

### 4.8 GET `/v1/admin/tasks`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminTaskListItem[]
- `nextCursor`: `string | null`

#### AdminTaskListItem

- `taskId`: string
- `title`: string
- `categoryLabel`: string
- `rewardSummaryText`: string
- `active`: boolean
- `updatedAt`: string

---

### 4.9 GET `/v1/admin/invites`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminInviteListItem[]
- `nextCursor`: `string | null`

#### AdminInviteListItem

- `relationId`: string
- `inviterUserId`: string
- `inviterPhoneMasked`: string
- `inviteeUserId`: string
- `inviteePhoneMasked`: string
- `status`: `InviteRelationStatus`
- `createdAt`: string
- `effectiveAt`: `string | null`
- `invalidReasonText`: `string | null`

---

### 4.10 GET `/v1/admin/withdrawals`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminWithdrawalListItem[]
- `nextCursor`: `string | null`

#### AdminWithdrawalListItem

- `withdrawalId`: string
- `userId`: string
- `userPhoneMasked`: string
- `amountMinor`: integer
- `currency`: string
- `status`: `WithdrawalStatus`
- `createdAt`: string
- `updatedAt`: string
- `rejectReasonText`: `string | null`

---

### 4.11 GET `/v1/admin/risk-cases`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminRiskCaseListItem[]
- `nextCursor`: `string | null`

#### AdminRiskCaseListItem

- `riskCaseId`: string
- `entityType`: string
- `entityId`: string
- `riskScore`: integer
- `summaryText`: string
- `createdAt`: string
- `updatedAt`: string

---

### 4.12 GET `/v1/admin/risk-cases/{id}`

#### path params

- `id`: string

#### response

- `riskCaseId`: string
- `entityType`: string
- `entityId`: string
- `riskScore`: integer
- `summaryText`: string
- `hitRulesTextList`: string[]
- `decisionText`: `string | null`
- `createdAt`: string
- `updatedAt`: string

---

### 4.13 GET `/v1/admin/audit-logs`

#### query

- `cursor`: `string | null`
- `limit`: `integer | null`

#### response

- `items`: AdminAuditLogListItem[]
- `nextCursor`: `string | null`

#### AdminAuditLogListItem

- `auditLogId`: string
- `actorAdminId`: string
- `actorRole`: `AdminRole`
- `action`: string
- `targetType`: string
- `targetId`: string
- `reasonText`: `string | null`
- `createdAt`: string

---

## 5. 本批次明确暂不登记

以下内容故意不进入本批次：

1. `Auth` 写接口 request / response 字段（`otp/send`、`otp/verify`、`refresh`、`logout`）
2. `POST /v1/orders`、支付意图、签到、Boost、任务领奖、提现申请等写接口字段
3. `GET /v1/withdrawal-accounts`、`GET /v1/notifications`、`GET /v1/me/addresses`、`GET /v1/me/devices`
4. Admin 写接口字段
5. 统一分页排序 DSL
6. 前端专用状态聚合字段（例如 `WON` 分组）
7. `/v1/health` typed response schema

理由：这些要么不在 Batch 8 最小只读范围内，要么一旦扩进去就会引入新的写 contract 或新的冻结项。

---

## 6. 对下一步的影响

本 patch 若通过，下一步才允许：

1. 把 Batch 8 path-only OpenAPI 升级为 typed read-only OpenAPI
2. 基于 typed OpenAPI 生成 `packages/api-client`
3. 前端把 mock read adapter 切到 generated adapter

顺序不能反。
