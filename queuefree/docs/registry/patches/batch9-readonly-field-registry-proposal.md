### C 端只读 Core 列表约定（Batch 9 Proposal）

对于所有支持分页的只读列表接口，统一采用以下约定：

#### 列表 Request Query
- `cursor: string | null` (分页游标)
- `limit: number` (分页条数)

#### 列表 Response 通用结构
- `items: T[]`
- `nextCursor: string | null`

### C 端只读 Core API 字段登记（Batch 9 Proposal）

#### `GET /v1/tasks`
- Response: `TaskListResponse`
  - `items: TaskListItem[]`
- `TaskListItem`:
  - `taskId: string`
  - `title: string`
  - `rewardCashbackAmountMinor: number`
  - `isClaimed: boolean`

#### `GET /v1/invites/me`
- Response: `UserInviteOverviewResponse`
  - `inviteCode: string`
  - `totalInvitedCount: number`
  - `effectiveInvitedCount: number`

#### `GET /v1/invites/records`
- Response: `InviteRecordListResponse`
  - `items: InviteRecordListItem[]`
- `InviteRecordListItem`:
  - `relationId: string`
  - `inviteePhoneMasked: string`
  - `status: InviteRelationStatus`
  - `createdAt: string`

#### `GET /v1/wallet`
- Response: `WalletOverviewResponse`
  - `balanceMinor: number`
  - `pendingCashbackMinor: number`
  - `totalWithdrawnMinor: number`

#### `GET /v1/wallet/ledgers`
- Response: `WalletLedgerListResponse`
  - `items: WalletLedgerListItem[]`
- `WalletLedgerListItem`:
  - `ledgerId: string`
  - `amountMinor: number`
  - `type: string` (e.g., "CASHBACK", "WITHDRAWAL")
  - `description: string`
  - `createdAt: string`

#### `GET /v1/withdrawals`
- Response: `WithdrawalListResponse`
  - `items: WithdrawalListItem[]`
- `WithdrawalListItem`:
  - `withdrawalId: string`
  - `amountMinor: number`
  - `status: WithdrawalStatus`
  - `createdAt: string`

### Admin 只读 API 字段登记（Batch 9 Proposal）

#### `GET /v1/admin/dashboard/summary`
- Response: `AdminDashboardSummaryResponse`
  - `totalActiveUsers: number`
  - `totalActiveEntries: number`
  - `totalPendingWithdrawals: number`
  - `todayOrderCount: number`

#### `GET /v1/admin/risk-cases`
- Response: `RiskCaseListResponse`
  - `items: RiskCaseListItem[]`
- `RiskCaseListItem`:
  - `caseId: string`
  - `subjectType: string`
  - `subjectId: string`
  - `riskScore: number`
  - `status: string`
  - `createdAt: string`
