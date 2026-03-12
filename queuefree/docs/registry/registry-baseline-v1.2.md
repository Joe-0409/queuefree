# QueueFree Registry Baseline v1.2

状态：Locked  
来源：`queuefree_prd_v1_2` + `packages/shared`

本文件用于登记“所有线程都必须共用”的注册表基线。

---

## 1. Enum Registry

### UserQueueGuardStatus

- `VALID`
- `EXPIRED_GRACE`

### OrderStatus

- `CREATED`
- `WAIT_PAY`
- `PAID`
- `FULFILLING`
- `SHIPPED`
- `DELIVERED`
- `COMPLETED`
- `CANCELED`
- `AFTERSALE_OPEN`
- `PARTIAL_REFUNDED`
- `FULL_REFUNDED`

### QueueEntryStatus

- `PENDING_RISK`
- `ACTIVE`
- `FROZEN`
- `SUSPENDED_REVIEW`
- `REMOVED`
- `WON_PENDING_RELEASE`
- `CASHBACK_RELEASED`
- `CLAWBACK_DONE`

### WithdrawalStatus

- `APPLIED`
- `RISK_REVIEW`
- `PROCESSING`
- `SUCCESS`
- `REJECTED`
- `FAILED`
- `REVERSED`

### InviteRelationStatus

- `BOUND`
- `PENDING_EFFECTIVE`
- `EFFECTIVE`
- `INVALID`

### AccountDeleteStatus

- `NOT_REQUESTED`
- `DELETE_REQUESTED`
- `PENDING_SETTLEMENT`
- `READY_TO_ANONYMIZE`
- `ANONYMIZED`
- `CANCELED_BY_USER`

### SettlementSlotStatus

- `SCHEDULED`
- `RUNNING`
- `SUCCEEDED`
- `FAILED`
- `REPLAYED`

### AdminRole

- `SUPER_ADMIN`
- `OPS_ADMIN`
- `CS_ADMIN`
- `FINANCE_ADMIN`
- `RISK_ADMIN`

### WalletActivationMethod

- `INVITE`
- `TASK`
- `ADMIN_OVERRIDE`

---

## 2. State Machine Registry

### UserQueueGuard

- `VALID -> EXPIRED_GRACE`：保活到期
- `EXPIRED_GRACE -> VALID`：签到 / 道具 / 活动恢复
- `EXPIRED_GRACE -> 队列订单批量移出`：超过宽限期

### QueueEntry

- `PENDING_RISK -> ACTIVE`
- `ACTIVE -> FROZEN`
- `FROZEN -> ACTIVE`
- `ACTIVE -> SUSPENDED_REVIEW`
- `FROZEN -> REMOVED`
- `ACTIVE -> REMOVED`
- `ACTIVE -> WON_PENDING_RELEASE`
- `WON_PENDING_RELEASE -> CASHBACK_RELEASED`
- `CASHBACK_RELEASED -> CLAWBACK_DONE`

### Withdrawal

- `APPLIED -> RISK_REVIEW`
- `RISK_REVIEW -> PROCESSING`
- `RISK_REVIEW -> REJECTED`
- `PROCESSING -> SUCCESS`
- `PROCESSING -> FAILED`
- `SUCCESS -> REVERSED`

### AccountDelete

- `NOT_REQUESTED -> DELETE_REQUESTED`
- `DELETE_REQUESTED -> PENDING_SETTLEMENT`
- `PENDING_SETTLEMENT -> READY_TO_ANONYMIZE`
- `READY_TO_ANONYMIZE -> ANONYMIZED`
- `DELETE_REQUESTED -> CANCELED_BY_USER`

---

## 3. API Contract Registry

### API Prefix

- C 端：`/v1`
- Admin：`/v1/admin`

### 必须幂等的 C 端动作

- `POST /v1/orders`
- `POST /v1/orders/:orderId/payment-intents`
- `POST /v1/queue-guard/check-in`
- `POST /v1/queue-entries/:queueEntryId/boost`
- `POST /v1/tasks/:taskId/claim`
- `POST /v1/withdrawals`
- `POST /v1/me/delete-account-requests`

### Shared Read API Conventions (Batch 9)

- 所有 `...Id` 字段：`string` (UUID)
- 所有时间字段：`string` (ISO 8601 UTC)
- 所有金额字段：`integer` (minor unit)
- 所有 JSON 字段命名：`camelCase`
- 列表 Response 统一结构：`items` (array), `nextCursor` (string | null, 仅分页列表)
- 列表 Request Query 统一允许：`cursor` (string | null), `limit` (integer | null)

### C 端只读 API 字段定义 (Batch 9)

#### GET `/v1/me`
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

#### GET `/v1/products`
- `items`: ProductListItem[]
- **ProductListItem**: `productId`, `title`, `coverImageUrl`, `priceMinor`, `currency`, `defaultCashbackCapMinor`, `queueEnabled`, `soldOut`

#### GET `/v1/products/{productId}`
- `productId`: string
- `title`, `descriptionText`, `coverImageUrl`, `galleryImageUrls`, `priceMinor`, `currency`, `defaultCashbackCapMinor`, `queueEnabled`, `soldOut`, `maxOrderQty`, `skus`
- **ProductDetailSku**: `skuId`, `label`, `priceMinor`, `soldOut`

#### GET `/v1/queue-guard`
- `status`: `UserQueueGuardStatus`
- `validUntil`, `graceUntil`, `lastCheckinAt`, `canCheckInNow`, `activeEntriesCount`, `frozenEntriesCount`

#### GET `/v1/queue-entries`
- `items`: QueueEntryListItem[], `nextCursor`
- **QueueEntryListItem**: `queueEntryId`, `orderId`, `productId`, `productTitle`, `productCoverImageUrl`, `quantity`, `status`, `activeRank`, `boostUsedCount`, `canBoost`, `isInProtectZone`, `nextSettlementSlotAt`, `finalCashbackMinor`, `currency`

#### GET `/v1/queue-entries/{queueEntryId}`
- `queueEntryId`, `orderId`, `productId`, `productTitle`, `productCoverImageUrl`, `productSkuLabel`, `quantity`, `paidAmountMinor`, `currency`, `status`, `activeRank`, `boostUsedCount`, `canBoost`, `isInProtectZone`, `queueGuardStatus`, `createdAt`, `wonSettlementSlotAt`, `cashbackAvailableAt`, `finalCashbackMinor`, `timeline`
- **QueueEntryTimelineItem**: `timelineId`, `occurredAt`, `title`, `descriptionText`

#### GET `/v1/tasks`
- `items`: TaskListItem[]
- **TaskListItem**: `taskId`, `title`, `descriptionText`, `categoryLabel`, `rewardSummaryText`, `progressCurrent`, `progressTarget`, `claimable`, `claimed`, `expiresAt`

#### GET `/v1/invites/me`
- `inviteCode`, `inviteLink`, `canBindInviteCode`, `bindWindowEndsAt`, `totalInviteCount`, `pendingEffectiveInviteCount`, `effectiveInviteCount`, `invalidInviteCount`, `walletActivated`, `walletActivationMethod`

#### GET `/v1/invites/records`
- `items`: InviteRecordListItem[], `nextCursor`
- **InviteRecordListItem**: `relationId`, `inviteeMaskedPhone`, `status`, `createdAt`, `effectiveAt`, `invalidReasonText`

#### GET `/v1/wallet`
- `walletActivated`, `activationMethod`, `pendingBalanceMinor`, `availableBalanceMinor`, `frozenBalanceMinor`, `currency`, `canWithdraw`, `hasSettlementException`

#### GET `/v1/wallet/ledgers`
- `items`: WalletLedgerListItem[], `nextCursor`
- **WalletLedgerListItem**: `ledgerId`, `title`, `balanceBucket`, `deltaMinor`, `createdAt`, `relatedOrderId`, `relatedWithdrawalId`, `noteText`

#### GET `/v1/withdrawals`
- `items`: WithdrawalListItem[], `nextCursor`
- **WithdrawalListItem**: `withdrawalId`, `amountMinor`, `currency`, `status`, `createdAt`, `updatedAt`, `rejectReasonText`

#### GET `/v1/rules`
- `items`: RuleListItem[]
- **RuleListItem**: `slug`, `title`, `summary`, `version`, `updatedAt`

#### GET `/v1/rules/{slug}`
- `slug`, `title`, `version`, `contentMarkdown`, `updatedAt`

### Admin 只读 API 字段定义 (Batch 9)

#### GET `/v1/admin/dashboard/summary`
- `paidOrderCountToday`, `activeQueueEntryCount`, `frozenQueueEntryCount`, `scheduledSettlementSlotCount`, `runningSettlementSlotCount`, `pendingWithdrawalCount`, `pendingRiskCaseCount`

#### GET `/v1/admin/products`
- `items`: AdminProductListItem[], `nextCursor`
- **AdminProductListItem**: `productId`, `title`, `priceMinor`, `currency`, `marketCode`, `queueEnabled`, `soldOut`, `updatedAt`

#### GET `/v1/admin/orders`
- `items`: AdminOrderListItem[], `nextCursor`
- **AdminOrderListItem**: `orderId`, `userId`, `userPhoneMasked`, `productId`, `productTitle`, `quantity`, `paidAmountMinor`, `currency`, `status`, `createdAt`, `paidAt`

#### GET `/v1/admin/queue-pools`
- `items`: AdminQueuePoolListItem[]
- **AdminQueuePoolListItem**: `marketCode`, `activeQueueEntryCount`, `frozenQueueEntryCount`, `nextSettlementSlotAt`

#### GET `/v1/admin/queue-entries`
- `items`: AdminQueueEntryListItem[], `nextCursor`
- **AdminQueueEntryListItem**: `queueEntryId`, `orderId`, `userId`, `userPhoneMasked`, `productTitle`, `status`, `activeRank`, `boostUsedCount`, `createdAt`, `wonSettlementSlotAt`

#### GET `/v1/admin/settlement-slots`
- `items`: AdminSettlementSlotListItem[], `nextCursor`
- **AdminSettlementSlotListItem**: `settlementSlotId`, `marketCode`, `slotAt`, `status`, `winnerQueueEntryId`, `updatedAt`

#### GET `/v1/admin/campaigns`
- `items`: AdminCampaignListItem[], `nextCursor`
- **AdminCampaignListItem**: `campaignId`, `slug`, `title`, `startsAt`, `endsAt`, `active`

#### GET `/v1/admin/tasks`
- `items`: AdminTaskListItem[], `nextCursor`
- **AdminTaskListItem**: `taskId`, `title`, `categoryLabel`, `rewardSummaryText`, `active`, `updatedAt`

#### GET `/v1/admin/invites`
- `items`: AdminInviteListItem[], `nextCursor`
- **AdminInviteListItem**: `relationId`, `inviterUserId`, `inviterPhoneMasked`, `inviteeUserId`, `inviteePhoneMasked`, `status`, `createdAt`, `effectiveAt`, `invalidReasonText`

#### GET `/v1/admin/withdrawals`
- `items`: AdminWithdrawalListItem[], `nextCursor`
- **AdminWithdrawalListItem**: `withdrawalId`, `userId`, `userPhoneMasked`, `amountMinor`, `currency`, `status`, `createdAt`, `updatedAt`, `rejectReasonText`

#### GET `/v1/admin/risk-cases`
- `items`: AdminRiskCaseListItem[], `nextCursor`
- **AdminRiskCaseListItem**: `riskCaseId`, `entityType`, `entityId`, `riskScore`, `summaryText`, `createdAt`, `updatedAt`

#### GET `/v1/admin/risk-cases/{id}`
- `riskCaseId`, `entityType`, `entityId`, `riskScore`, `summaryText`, `hitRulesTextList`, `decisionText`, `createdAt`, `updatedAt`

#### GET `/v1/admin/audit-logs`
- `items`: AdminAuditLogListItem[], `nextCursor`
- **AdminAuditLogListItem**: `auditLogId`, `actorAdminId`, `actorRole`, `action`, `targetType`, `targetId`, `reasonText`, `createdAt`

---

## 必须幂等的服务端回调 / Worker 动作

- 支付回调
- 时隙结算
- 钱包释放
- 钱包扣回
- 提现回调

---

## 4. Event Registry

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

---

## 5. Worker Registry

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

---

## 6. Queue / Cron Registry

### Queue Names

- `payments-events`
- `queue-guard`
- `settlement-slots`
- `wallet-events`
- `invites`
- `withdrawals`
- `risk-cases`

### Cron Names

- `queue-guard-freeze-scan`
- `queue-guard-remove-scan`
- `settlement-slot-dispatch`
- `cashback-release-scan`
- `invite-effective-scan`

---

## 7. Domain / Route Registry

### Public Domains

#### local

- Web: `http://localhost:3000`
- Admin: `http://localhost:3001`
- API: `http://localhost:4000`
- Assets: `http://localhost:9000`

#### dev

- Web: `https://dev.queuefree.com`
- Admin: `https://dev-admin.queuefree.com`
- API: `https://dev-api.queuefree.com`
- Assets: `https://dev-assets.queuefree.com`

#### staging

- Web: `https://stg.queuefree.com`
- Admin: `https://stg-admin.queuefree.com`
- API: `https://stg-api.queuefree.com`
- Assets: `https://stg-assets.queuefree.com`

#### prod

- Web: `https://queuefree.com`
- Admin: `https://admin.queuefree.com`
- API: `https://api.queuefree.com`
- Assets: `https://assets.queuefree.com`

### Web Public Routes

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

### Mobile Routes

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

### Admin Routes

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

## 8. Environment Variable Registry（分组基线）

### mobile

- `EXPO_PUBLIC_APP_ENV`
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_WEB_BASE_URL`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`

### web

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_WEB_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

### admin

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ADMIN_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`

### api

- `NODE_ENV`
- `APP_ENV`
- `PORT`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `SENTRY_DSN`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_BASE_URL`
- `RESEND_API_KEY`
- `SMS_PROVIDER_NAME`
- `SMS_PROVIDER_BASE_URL`
- `SMS_PROVIDER_API_KEY`

### worker

- `NODE_ENV`
- `APP_ENV`
- `DATABASE_URL`
- `REDIS_URL`
- `SENTRY_DSN`
- `API_INTERNAL_BASE_URL`

### shared

shared 不直接读取 secret。

shared 只定义：

- 环境名枚举
- 域名与公开路径常量
- runtime config schema
- 默认 fallback 值

---

## 9. Launch Baseline Registry

- Market: `PH`
- Currency: `PHP`
- Timezone: `Asia/Manila`
- Locale: `en-PH`
- Language: `English`
- Rule Version: `v1.2`
- Rewarded Ads Default: `false`
