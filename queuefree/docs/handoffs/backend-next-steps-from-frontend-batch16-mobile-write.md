# 给后端的衔接说明（Batch 16 mobile write）

当前前端已完成：

- `createOrder` 接线
- `createPaymentIntent` 接线
- `checkInQueueGuard` 接线

但 checkout 仍有两个真实缺口：

1. 缺少 product SKU readonly 来源
2. 缺少 address book readonly 来源

请后端下一步优先补：

- product detail / sku list readonly contract
- me / addresses readonly contract
- payment success return / order status readonly contract（至少其一）

当前前端没有新增任何冻结项，也没有手写猜字段。

如果后端后续补 OpenAPI：

- 继续先登记
- 再导出 OpenAPI
- 前端再生成 SDK
- 再把 checkout 页的手动 `skuId` / `addressId` 输入替换掉
