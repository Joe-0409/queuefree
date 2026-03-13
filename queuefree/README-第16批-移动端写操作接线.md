# QueueFree 第 16 批：移动端写操作接线

状态：Batch 16
唯一规则源：`queuefree_prd_v1_2`

本批目标：

- 在不新增任何冻结项的前提下
- 使用已生成的 `packages/api-client`
- 把 mobile 现有路由内的写操作接到 generated bridge

本批只接 3 个已存在于 SDK 的写操作：

- `createOrder`
- `createPaymentIntent`
- `checkInQueueGuard`

## 本批结果

### 已接通

- `/(app)/checkout/[productId]`
 - 真实调用 `createOrder`
 - 真实调用 `createPaymentIntent`
 - 返回 provider checkout URL
- `/(app)/(tabs)/queue`
 - 真实调用 `checkInQueueGuard`
 - 刷新 queue screen query

### 没有做的事

- 没有新增路由
- 没有新增 env var
- 没有改 `packages/shared`
- 没有往 `packages/api-client` 塞手写 adapter / DTO
- 没有接支付完成回跳
- 没有接订单状态轮询

## 小白怎么启动

先在项目根目录打开终端，输入：

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:mobile
```

如果要继续看官网或后台：

```bash
pnpm dev:web
pnpm dev:admin
```

## 当前已知限制

- checkout 写链路虽然已接通，但 `skuId` 和 `addressId` 目前缺少 readonly 读取来源，所以页面里先做成手动输入。
- `orders/success/[orderId]` 只有在支付真的完成、且 queue entry 已经出现后才会正常展示。
- Batch 16 仍然不包含 orders/payment callback/after-sale 等完整写链路。
