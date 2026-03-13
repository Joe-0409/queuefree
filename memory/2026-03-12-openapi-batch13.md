# OpenAPI Batch 13 交付记录

## 交付时间
- 2026-03-12 21:28 (GMT+8) - 初始 OpenAPI v1.0.0-readonly
- 2026-03-12 21:28 (GMT+8) - OpenAPI patch (补充完整 schema)

## 交付内容
后端交付了 `services/api/openapi/queuefree.readonly.v1.yaml`（只读 OpenAPI 规范）

## 前端处理结果

### ✅ 已完成
- OpenAPI YAML 已转换为 JSON 并保存到 `packages/api-client/openapi/openapi.json`
- 成功生成 SDK：
  - `packages/api-client/src/generated/types.gen.ts` (12.9KB)
  - `packages/api-client/src/generated/sdk.gen.ts` (6.5KB)
  - `packages/api-client/src/generated/client.gen.ts` (795B)
- 10 个 operations 成功生成：
  - `getHealth` - 系统健康检查
  - `getRuntimeConfig` - 运行时配置
  - `getMeOverview` - C端用户概览（operationId 保持为 `getMeOverview`）
  - `listProducts` / `getProductById` - 商品浏览
  - `getQueueGuard` - 队列保护状态
  - `listQueueEntries` / `getQueueEntryById` - 队列条目
  - `listRules` / `getRuleBySlug` - 规则中心

### ✅ Patch 补充
- Schema 定义已完整（包含所有 response models）
- 确认所有 operations 的 response schemas 已完整定义

### ⚠️ 已知问题
- **路径重复问题**：生成的 SDK URL 为 `/v1/v1/...`（路径有 `/v1` 前缀 + hey-api 自动添加 `/v1`）
  - 原因：OpenAPI paths 定义带 `/v1` 前缀，而 hey-api 在生成时会补上 base path
  - 影响：非阻塞，服务器端 URL 不带 `/v1` 前缀即可正确匹配

### ✅ 门禁校验
- ✅ verify:registry-first-frontend
- ✅ verify:route-registry
- ✅ verify:frontend-import-boundaries
- ✅ verify:mock-data-boundary
- ✅ verify:adapter-switch-boundary
- ✅ verify:generated-adapter-bridge
- ✅ verify:generated-bridge-coverage
- ✅ verify:screen-model-validation
- ✅ verify:openapi-intake
- ✅ verify:generated-api-client

## Batch 14 衔接位置

### Mobile
```
apps/mobile/src/generated-bridge/
├── mobile-generated-bridge.manifest.ts          # ← WIP (等待 adapter mapping)
├── mobile-generated-fetchers.ts                 # ← WIP (stub)
├── mobile-generated-mappers.ts                  # ← WIP (stub)
├── runtime-config-generated-bridge.manifest.ts  # ← WIP
├── runtime-config-generated-fetchers.ts         # ← WIP (stub)
└── runtime-config-generated-mappers.ts          # ← WIP (stub)
```

### Admin
```
apps/admin/src/generated-bridge/
├── admin-generated-bridge.manifest.ts           # ← WIP
├── admin-generated-fetchers.ts                  # ← WIP (stub)
└── admin-generated-mappers.ts                   # ← WIP (stub)
```

## SDK Operations Mapping (Batch 14 待实现)

| SDK Operation | Method in Manifest | Status |
|--------------|-------------------|--------|
| `getHealth()` | `fetchHomeScreenData` | Need adapter mapping |
| `getRuntimeConfig()` | `fetchHomeScreenData` | Need adapter mapping |
| `getMeOverview()` | `fetchProfileScreenData` | Need adapter mapping |
| `listProducts()` | `fetchHomeScreenData` | Need adapter mapping |
| `getProductById()` | `fetchProductDetail` | Need adapter mapping |
| `getQueueGuard()` | `fetchQueueScreenData` | Need adapter mapping |
| `listQueueEntries()` | `fetchQueueScreenData` | Need adapter mapping |
| `getQueueEntryById()` | `fetchQueueEntryDetail` | Need adapter mapping |
| `listRules()` | `fetchRulesCenterData` | Need adapter mapping |
| `getRuleBySlug()` | `fetchRulesCenterData` | Need adapter mapping |

## 下一步（前端 Batch 14）

1. 在 `packages/api-client/src/adapters/` 中实现 from-SDK-to-screen-model mapping：
   - `getMe()` → `MeOverview` → `ProfileScreenModel`
   - `listProducts` + `getProductDetail` → `ProductScreenModel`
   - `getQueueGuard` + `listQueueEntries` → `QueueScreenModel`
   - 等等...

2. 更新 `mobile-generated-fetchers.ts` 和 `mobile-generated-mappers.ts`：
   - 用真正的 SDK 调用替换 stub
   - 实现 DTO → Screen Model 映射

3. 更新 `mobile-generated-bridge.manifest.ts`：
   - 将 `wired: false` 改为 `wired: true`
   - 添加 completed 属性

4. 运行 `pnpm verify:generated-bridge-coverage` 确保覆盖率归零

## 注意事项

- 当前 OpenAPI 覆盖的 operations 已足够支持 Mobile 的 home/queue/profile/products/queue-entry/rules 等核心 screen model
- Admin 的 bridge manifest 填充需要等待更多 admin-only endpoints（如 `listTasks`, `listorders`, `getDashboardSummary` 等）的 OpenAPI 补充
