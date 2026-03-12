# Batch 12 Root API Client Integration Check

## Scope

本批次确保根目录 `package.json` 和 `turbo.json` 正确集成了 API Client 生成与校验链路。

## Prerequisites

- `@hey-api/openapi-ts` 已安装在根目录
- `@hey-api/client-fetch` 已安装在根目录
- `packages/api-client/package.json` 已配置窄入口导出

## Apply

运行自动应用脚本：

```bash
node scripts/apply-api-client-root-integration.mjs
```

如果需要覆盖现有配置：

```bash
node scripts/apply-api-client-root-integration.mjs --force
```

## Verify

运行验证脚本：

```bash
node scripts/verify-api-client-root-integration.mjs
```

预期输出：

```
✅ Script exists: generate:api-client
✅ Script exists: verify:generated-adapter-bridge
✅ Script exists: verify:generated-api-client
✅ Script exists: verify:frontend-guardrails
✅ Turbo task exists: typecheck
✅ Script file exists: scripts/generate-api-client.mjs
✅ Script file exists: scripts/verify-generated-adapter-bridge.mjs
✅ Script file exists: scripts/verify-generated-api-client.mjs
```

## Full Pipeline Test

完整测试生成与校验链路：

```bash
pnpm run generate:api-client
pnpm run verify:generated-adapter-bridge
pnpm typecheck
```

## Files Changed

- `package.json` - 添加生成与校验脚本
- `turbo.json` - 添加 typecheck 任务配置（如尚未存在）

## Design Decisions

1. **脚本命名约定** - 使用 `generate:*` 和 `verify:*` 前缀，与现有 frontend guardrails 保持一致
2. **Turbo 任务** - `typecheck` 任务配置为无输出 (`outputs: []`)，因为 TypeScript 不生成构建产物
3. **门禁串联** - `verify:frontend-guardrails` 串联所有校验步骤，确保单一命令即可完成全量验证

## Next Steps

完成本批次后，可继续：

1. 运行 `pnpm generate:api-client` 生成最新 SDK
2. 实现前端 Generated Bridge 的真实接线
3. 将 `MOBILE_GENERATED_ADAPTER_READY` 和 `ADMIN_GENERATED_ADAPTER_READY` 改为 `true`
