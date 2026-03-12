# Frontend Generated Bridge Coverage v1.2

状态：Batch 12 / Frontend  
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的共享契约。  
本文件只描述前端本地的 generated bridge 结构与覆盖率门禁。

## 背景

当前前端已经有：

- page
- query hook
- repository
- screen-model validation
- adapter switch

但在 backend 交付正式 OpenAPI 之前，还不能直接写真实 generated mapping。
为了避免后面 SDK 一到位就临时乱接，本批次先把 **generated bridge 槽位** 固定下来。

## 当前结构

### mobile

- `apps/mobile/src/adapters/mobile-read-adapter.generated.ts`
- `apps/mobile/src/generated-bridge/mobile-generated-screen-bridge.ts`
- `apps/mobile/src/generated-bridge/mobile-generated-bridge.manifest.ts`

### mobile runtime config

- `apps/mobile/src/adapters/runtime-config-adapter.generated.ts`
- `apps/mobile/src/generated-bridge/runtime-config-generated-bridge.ts`
- `apps/mobile/src/generated-bridge/runtime-config-generated-bridge.manifest.ts`

### admin

- `apps/admin/src/adapters/admin-read-adapter.generated.ts`
- `apps/admin/src/generated-bridge/admin-generated-screen-bridge.ts`
- `apps/admin/src/generated-bridge/admin-generated-bridge.manifest.ts`

## 规则

1. `*.generated.ts` 只负责 **委托** 到 generated bridge，不直接在文件里堆满 mapping 逻辑。
2. `generated-bridge` 是未来 DTO → screen-model mapping 的唯一落点。
3. page / query / repository 不允许直接 import `generated-bridge`。
4. 没有 OpenAPI 时，`generated-bridge` 只能抛出明确的 not wired 错误，不得猜 DTO 字段。
5. readiness 现在除了看 `API_CLIENT_IS_GENERATED` 与 `*_GENERATED_ADAPTER_READY`，还要看 `bridgeCoverage.pending === 0`。

## 目的

这批的目的不是“接通真实 SDK”，而是把真实 SDK **将来应该接在哪些文件、哪些方法、哪些屏幕** 先固定住。

这样后续 backend 一旦按 registry 导出最小只读 OpenAPI，前端只需要：

1. 生成 `packages/api-client`
2. 在 `generated-bridge` 中实现 DTO → screen-model mapping
3. 将对应 `wired` 改为 `true`
4. 最后再打开 `*_GENERATED_ADAPTER_READY`

顺序仍然不能反。
