# QueueFree Frontend Mobile Write Generated Bridge v1.2

状态：Informational
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的共享契约。

本文件只说明：在已生成 readonly+write SDK 的前提下，mobile 写链路如何接到 app-local generated bridge。

## 本批接线范围

### 已接通的 SDK operation

- `createOrder`
- `createPaymentIntent`
- `checkInQueueGuard`

### 已接通的页面

- `/(app)/checkout/[productId]`
- `/(app)/(tabs)/queue`

## 设计边界

1. `packages/api-client` 继续保持纯生成产物
2. DTO → app-local model 的映射继续放在 `apps/mobile/src/generated-bridge/**`
3. 不新增任何 route / env var / API path / request field / response field
4. 不在 page / query / repository 层直接 import SDK

## 目录结构

```text
apps/mobile/src/adapters/mobile-write-adapter.ts
apps/mobile/src/adapters/mobile-write-adapter.generated.ts
apps/mobile/src/adapters/mobile-write-adapter.mock.ts
apps/mobile/src/adapters/mobile-write-adapter.resolve.ts
apps/mobile/src/adapters/mobile-write-adapter.readiness.ts

apps/mobile/src/generated-bridge/mobile-generated-write-fetchers.ts
apps/mobile/src/generated-bridge/mobile-generated-write-mappers.ts
apps/mobile/src/generated-bridge/mobile-generated-write-bridge.ts
apps/mobile/src/generated-bridge/mobile-generated-write-bridge.manifest.ts

apps/mobile/src/lib/mobile-write-repository.ts
apps/mobile/src/queries/use-mobile-write-mutations.ts
```

## 当前限制

### 1. `skuId` 与 `addressId`

`createOrder` 的 generated request body 需要：

- `productId`
- `skuId`
- `quantity`
- `addressId`

其中 `productId` 与 `quantity` 当前页面已有；但 `skuId` / `addressId` 目前没有 readonly API 提供可靠来源。

因此本批采用：

- 前端不猜默认值
- 不伪造字段
- 页面允许手动输入 backend 已存在的真实 ID

### 2. 支付完成回跳

本批只做到：

- 创建订单
- 创建 payment intent
- 打开 provider checkout URL

本批还没有：

- provider 回跳 deep link
- 订单状态轮询
- 付款后自动跳 `orders/success/[orderId]`

## 为什么这样做是安全的

因为这批没有引入新的 contract，只是消费已经生成出来的 SDK operation 和 DTO。
