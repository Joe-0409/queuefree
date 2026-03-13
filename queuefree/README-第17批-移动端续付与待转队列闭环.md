# 第17批：移动端续付与待转队列闭环

这批不新增任何冻结项，只在现有 Mobile 路由内把 checkout 从"创建订单 + 发起支付"推进到"会话内可续付、可继续状态检查、可等待队列转化"。

## 本批做了什么

- 新增会话内 pending checkout store（Zustand）
- checkout 页面会记住当前 productId 对应的 skuId / addressId / quantity 草稿
- createOrder + createPaymentIntent 成功后，自动生成 pending session
- Home / Queue / Checkout / Order Success 可以继续使用 pending session
- Order Success 不再因为"暂时还没有 queue entry"而直接报桥接错误，而是进入 awaiting-queue-entry 状态
- Queue 页面会根据 queue entries 自动对 pending session 做本地 reconcile，发现对应 orderId 后自动标记为 queue entry visible

## 仍然没有做的事

- 还没有 address book readonly API
- 还没有 SKU readonly API
- 还没有 provider 回跳 deep link
- 还没有订单状态查询 API
- pending session 目前是**会话内状态**，不会跨 app 重启持久化

## 你现在怎么跑

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:mobile
```

Storybook：

```bash
pnpm storybook:mobile
```