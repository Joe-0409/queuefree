# QueueFree Batch 9 Read-Only OpenAPI Field Registry (Final)

状态：Frozen
来源：Batch 9 Registry Patch Pack + PRD v1.2

---

## 1. Scope

本 patch 覆盖 C 端及 Admin 的核心只读 API 字段定义，确保前端 Batch 8 适配器可安全接线。

---

## 2. Shared Conventions

- **ID**: `string` (UUID)
- **Time**: `string` (ISO 8601 UTC)
- **Amount**: `number` (integer, minor unit)
- **List Request**: `cursor` (string | null), `limit` (number | null)
- **List Response**: `items` (array), `nextCursor` (string | null)

---

## 3. C 端只读 API 字段定义

### 3.1 GET `/v1/me`
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

### 3.2 GET `/v1/products`
- `items`: ProductListItem[]
- `ProductListItem`:
  - `productId`: string
  - `title`: string
  - `coverImageUrl`: string
  - `priceMinor`: number
  - `currency`: string
  - `defaultCashbackCapMinor`: number
  - `queueEnabled`: boolean
  - `soldOut`: boolean

### 3.3 GET `/v1/products/{productId}`
- `productId`: string
- `title`: string
- `descriptionText`: string
- `coverImageUrl`: string
- `galleryImageUrls`: string[]
- `priceMinor`: number
- `currency`: string
- `defaultCashbackCapMinor`: number
- `queueEnabled`: boolean
- `soldOut`: boolean
- `maxOrderQty`: number
- `skus`: ProductDetailSku[]
- `ProductDetailSku`:
  - `skuId`: string
  - `label`: string
  - `priceMinor`: number
  - `soldOut`: boolean

### 3.4 GET `/v1/queue-guard`
- `status`: `UserQueueGuardStatus`
- `validUntil`: string
- `graceUntil`: string
- `lastCheckinAt`: `string | null`
- `canCheckInNow`: boolean
- `activeEntriesCount`: number
- `frozenEntriesCount`: number

### 3.5 GET `/v1/queue-entries`
- `items`: QueueEntryListItem[]
- `nextCursor`: `string | null`
- `QueueEntryListItem`:
  - `queueEntryId`: string
  - `orderId`: string
  - `productId`: string
  - `productTitle`: string
  - `productCoverImageUrl`: string
  - `quantity`: number
  - `status`: `QueueEntryStatus`
  - `activeRank`: `number | null`
  - `boostUsedCount`: number
  - `canBoost`: boolean
  - `isInProtectZone`: boolean
  - `nextSettlementSlotAt`: `string | null`
  - `finalCashbackMinor`: `number | null`
  - `currency`: string

### 3.6 GET `/v1/queue-entries/{queueEntryId}`
- `queueEntryId`: string
- `orderId`: string
- `productId`: string
- `productTitle`: string
- `productCoverImageUrl`: string
- `productSkuLabel`: string
- `quantity`: number
- `paidAmountMinor`: number
- `currency`: string
- `status`: `QueueEntryStatus`
- `activeRank`: `number | null`
- `boostUsedCount`: number
- `canBoost`: boolean
- `isInProtectZone`: boolean
- `queueGuardStatus`: `UserQueueGuardStatus`
- `createdAt`: string
- `wonSettlementSlotAt`: `string | null`
- `cashbackAvailableAt`: `string | null`
- `finalCashbackMinor`: `number | null`
- `timeline`: QueueEntryTimelineItem[]
- `QueueEntryTimelineItem`:
  - `timelineId`: string
  - `occurredAt`: string
  - `title`: string
  - `descriptionText`: string

### 3.7 GET `/v1/tasks`
- `items`: TaskListItem[]
- `TaskListItem`:
  - `taskId`: string
  - `title`: string
  - `descriptionText`: string
  - `categoryLabel`: string
  - `rewardSummaryText`: string
  - `progressCurrent`: number
  - `progressTarget`: number
  - `claimable`: boolean
  - `claimed`: boolean
  - `expiresAt`: `string | null`

### 3.8 GET `/v1/invites/me`
- `inviteCode`: string
- `inviteLink`: string
- `canBindInviteCode`: boolean
- `bindWindowEndsAt`: `string | null`
- `totalInviteCount`: number
- `pendingEffectiveInviteCount`: number
- `effectiveInviteCount`: number
- `invalidInviteCount`: number
- `walletActivated`: boolean
- `walletActivationMethod`: `WalletActivationMethod | null`

### 3.9 GET `/v1/invites/records`
- `items`: InviteRecordListItem[]
- `nextCursor`: `string | null`
- `InviteRecordListItem`:
  - `relationId`: string
  - `inviteeMaskedPhone`: string
  - `status`: `InviteRelationStatus`
  - `createdAt`: string
  - `effectiveAt`: `string | null`
  - `invalidReasonText`: `string | null`

### 3.10 GET `/v1/wallet`
- `walletActivated`: boolean
- `activationMethod`: `WalletActivationMethod | null`
- `pendingBalanceMinor`: number
- `availableBalanceMinor`: number
- `frozenBalanceMinor`: number
- `currency`: string
- `canWithdraw`: boolean
- `hasSettlementException`: boolean

### 3.11 GET `/v1/wallet/ledgers`
- `items`: WalletLedgerListItem[]
- `nextCursor`: `string | null`
- `WalletLedgerListItem`:
  - `ledgerId`: string
  - `title`: string
  - `balanceBucket`: string
  - `deltaMinor`: number
  - `createdAt`: string
  - `relatedOrderId`: `string | null`
  - `relatedWithdrawalId`: `string | null`
  - `noteText`: `string | null`

### 3.12 GET `/v1/withdrawals`
- `items`: WithdrawalListItem[]
- `nextCursor`: `string | null`
- `WithdrawalListItem`:
  - `withdrawalId`: string
  - `amountMinor`: number
  - `currency`: string
  - `status`: `WithdrawalStatus`
  - `createdAt`: string
  - `updatedAt`: string
  - `rejectReasonText`: `string | null`

### 3.13 GET `/v1/rules`
- `items`: RuleListItem[]
- `RuleListItem`:
  - `slug`: string
  - `title`: string
  - `summary`: string
  - `version`: string
  - `updatedAt`: string

### 3.14 GET `/v1/rules/{slug}`
- `slug`: string
- `title`: string
- `version`: string
- `contentMarkdown`: string
- `updatedAt`: string

---

## 4. Admin 只读 API 字段定义

### 4.1 GET `/v1/admin/dashboard/summary`
- `paidOrderCountToday`: number
- `activeQueueEntryCount`: number
- `frozenQueueEntryCount`: number
- `scheduledSettlementSlotCount`: number
- `runningSettlementSlotCount`: number
- `pendingWithdrawalCount`: number
- `pendingRiskCaseCount`: number

### 4.2 GET `/v1/admin/products`
- `items`: AdminProductListItem[]
- `nextCursor`: `string | null`
- `AdminProductListItem`:
  - `productId`: string
  - `title`: string
  - `priceMinor`: number
  - `currency`: string
  - `marketCode`: string
  - `queueEnabled`: boolean
  - `soldOut`: boolean
  - `updatedAt`: string

### 4.3 GET `/v1/admin/orders`
- `items`: AdminOrderListItem[]
- `nextCursor`: `string | null`
- `AdminOrderListItem`:
  - `orderId`: string
  - `userId`: string
  - `userPhoneMasked`: string
  - `productId`: string
  - `productTitle`: string
  - `quantity`: number
  - `paidAmountMinor`: number
  - `currency`: string
  - `status`: `OrderStatus`
  - `createdAt`: string
  - `paidAt`: `string | null`

### 4.4 GET `/v1/admin/queue-pools`
- `items`: AdminQueuePoolListItem[]
- `AdminQueuePoolListItem`:
  - `marketCode`: string
  - `activeQueueEntryCount`: number
  - `frozenQueueEntryCount`: number
  - `nextSettlementSlotAt`: `string | null`

### 4.5 GET `/v1/admin/queue-entries`
- `items`: AdminQueueEntryListItem[]
- `nextCursor`: `string | null`
- `AdminQueueEntryListItem`:
  - `queueEntryId`: string
  - `orderId`: string
  - `userId`: string
  - `userPhoneMasked`: string
  - `productTitle`: string
  - `status`: `QueueEntryStatus`
  - `activeRank`: `number | null`
  - `boostUsedCount`: number
  - `createdAt`: string
  - `wonSettlementSlotAt`: `string | null`

### 4.6 GET `/v1/admin/settlement-slots`
- `items`: AdminSettlementSlotListItem[]
- `nextCursor`: `string | null`
- `AdminSettlementSlotListItem`:
  - `settlementSlotId`: string
  - `marketCode`: string
  - `slotAt`: string
  - `status`: `SettlementSlotStatus`
  - `winnerQueueEntryId`: `string | null`
  - `updatedAt`: string

### 4.7 GET `/v1/admin/campaigns`
- `items`: AdminCampaignListItem[]
- `nextCursor`: `string | null`
- `AdminCampaignListItem`:
  - `campaignId`: string
  - `slug`: string
  - `title`: string
  - `startsAt`: string
  - `endsAt`: string
  - `active`: boolean

### 4.8 GET `/v1/admin/tasks`
- `items`: AdminTaskListItem[]
- `nextCursor`: `string | null`
- `AdminTaskListItem`:
  - `taskId`: string
  - `title`: string
  - `categoryLabel`: string
  - `rewardSummaryText`: string
  - `active`: boolean
  - `updatedAt`: string

### 4.9 GET `/v1/admin/invites`
- `items`: AdminInviteListItem[]
- `nextCursor`: `string | null`
- `AdminInviteListItem`:
  - `relationId`: string
  - `inviterUserId`: string
  - `inviterPhoneMasked`: string
  - `inviteeUserId`: string
  - `inviteePhoneMasked`: string
  - `status`: `InviteRelationStatus`
  - `createdAt`: string
  - `effectiveAt`: `string | null`
  - `invalidReasonText`: `string | null`

### 4.10 GET `/v1/admin/withdrawals`
- `items`: AdminWithdrawalListItem[]
- `nextCursor`: `string | null`
- `AdminWithdrawalListItem`:
  - `withdrawalId`: string
  - `userId`: string
  - `userPhoneMasked`: string
  - `amountMinor`: number
  - `currency`: string
  - `status`: `WithdrawalStatus`
  - `createdAt`: string
  - `updatedAt`: string
  - `rejectReasonText`: `string | null`

### 4.11 GET `/v1/admin/risk-cases`
- `items`: AdminRiskCaseListItem[]
- `nextCursor`: `string | null`
- `AdminRiskCaseListItem`:
  - `riskCaseId`: string
  - `entityType`: string
  - `entityId`: string
  - `riskScore`: number
  - `summaryText`: string
  - `createdAt`: string
  - `updatedAt`: string

### 4.12 GET `/v1/admin/risk-cases/{id}`
- `riskCaseId`: string
- `entityType`: string
- `entityId`: string
- `riskScore`: number
- `summaryText`: string
- `hitRulesTextList`: string[]
- `decisionText`: `string | null`
- `createdAt`: string
- `updatedAt`: string

### 4.13 GET `/v1/admin/audit-logs`
- `items`: AdminAuditLogListItem[]
- `nextCursor`: `string | null`
- `AdminAuditLogListItem`:
  - `auditLogId`: string
  - `actorAdminId`: string
  - `actorRole`: `AdminRole`
  - `action`: string
  - `targetType`: string
  - `targetId`: string
  - `reasonText`: `string | null`
  - `createdAt`: string
