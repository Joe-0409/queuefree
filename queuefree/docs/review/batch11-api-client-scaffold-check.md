# Batch 11 API Client Scaffold Check

## Scope

- 不新增环境变量
- 不修改 public domains
- 不新增业务 path / field / enum / state
- 只补 `packages/api-client` 生成脚手架与桥接校验脚本

## Key decisions

1. 包根 `@queuefree/api-client` 保持空运行时入口，避免 Expo 误用 broad barrel 导入。
2. 公开运行时入口只保留：
   - `@queuefree/api-client/sdk`
   - `@queuefree/api-client/client`
   - `@queuefree/api-client/types`
3. 代码生成使用 `@hey-api/openapi-ts` 的 Fetch client + flat SDK，优先选择 tree-shakeable 函数式导出。
4. `verify:generated-adapter-bridge` 会阻止：
   - generated 层读取 env
   - generated 层写死 public domains
   - generated 层反向依赖 adapter / repository / page / mock / backend-only imports
   - consumer 侧从包根或 generated internals 直接导入
