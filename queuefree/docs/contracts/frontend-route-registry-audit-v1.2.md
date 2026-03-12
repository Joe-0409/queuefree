# QueueFree Frontend Route Registry Audit v1.2

状态：Informational  
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的 registry，也不是新的共享契约。

它只用于说明：**当前前端仓库里的 Mobile / Web / Admin 路由文件，是否已经与 `docs/registry/registry-baseline-v1.2.md` 对齐。**

## 审计范围

- `apps/mobile/app/**`
- `apps/web/app/**`
- `apps/admin/app/**`
- `docs/registry/registry-baseline-v1.2.md`

## 当前结果

### Web

- Registry 路由数：9
- 当前页面路由数：9
- 结果：已对齐

覆盖项：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

### Mobile

- Registry 路由数：24
- 当前页面路由数：24
- 结果：已对齐

覆盖项：

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

### Admin

- Registry 路由数：22
- 当前页面路由数：22
- 结果：已对齐

覆盖项：

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

## 使用方式

在仓库根目录运行：

```bash
pnpm verify:route-registry
```

如果未来有人：

- 擅自新增页面路由
- 擅自删除冻结路由
- 把 Web `/contact` 改回 `/support`
- 在 Admin 或 Mobile 增减未登记路径

这个校验会直接失败。
