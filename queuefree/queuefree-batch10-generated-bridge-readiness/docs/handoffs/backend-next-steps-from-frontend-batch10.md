# 给后端线程的衔接说明（Frontend Batch 10）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

本轮补的是：

- generated SDK readiness 可见性
- mobile / admin generated adapter 切换门禁
- `@queuefree/api-client` 使用范围门禁

## 你下一步最适合给什么

请继续优先给 **最小只读 OpenAPI**。

前端现在已经能明确区分：

1. SDK 是否已经生成
2. screen-model mapping 是否已经写完

也就是说，你一旦给出 spec，前端可以先生成 SDK，但不会误切到 generated 模式。

## 你要继续遵守的约束

- 先 registry，再 OpenAPI，再前端生成 SDK
- 不要跳过 `operationId`
- 不要只给 Postman collection
- 不要把未登记字段塞进 spec
- 不要让前端猜字段

## 前端这边已经准备好的切换信号

当你交付 spec 后，前端可以先完成：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
```

随后前端会在下一个 batch 里，只修改：

- mobile `*.generated.ts`
- runtime-config `*.generated.ts`
- admin `*.generated.ts`

而不是大面积改页面。
