# Frontend Generated Adapter Readiness v1.2

状态：Batch 10 / Frontend

## 目标

在不新增任何 registry 冻结项的前提下，让前端明确区分下面 3 件事：

1. `packages/api-client` 是否仍是 placeholder
2. `packages/api-client` 是否已经由 OpenAPI 生成
3. 即使 SDK 已生成，screen-model mapping 是否已经写完

## 为什么要加这一层

仅仅生成 SDK，并不代表 mobile / admin 已经具备可用的数据链路。

前端页面当前依赖的是 app-local screen model，而不是直接把 generated SDK response丢给页面。
因此在 generated SDK 到位后，还需要额外一层 **mapping readiness**。

## 当前规则

### packages/api-client

当前会对外导出：

- `API_CLIENT_RUNTIME_MODE`
- `API_CLIENT_IS_GENERATED`
- `loadGeneratedApiClient()`

这 3 个导出不是新的业务 contract，只是前端用来判断 SDK 当前所处模式的最小运行时信息。

### mobile

mobile 现在需要同时满足：

- `API_CLIENT_IS_GENERATED === true`
- `MOBILE_GENERATED_ADAPTER_READY === true`

否则继续走 mock adapter。

runtime config 也一样：

- `API_CLIENT_IS_GENERATED === true`
- `RUNTIME_CONFIG_GENERATED_ADAPTER_READY === true`

否则继续走 mock runtime config adapter。

### admin

admin 现在需要同时满足：

- `API_CLIENT_IS_GENERATED === true`
- `ADMIN_GENERATED_ADAPTER_READY === true`

否则继续走 mock adapter。

## 当前门禁脚本

### `pnpm verify:generated-adapter-bridge`

作用：

- 限制 `@queuefree/api-client` 只能出现在 `*.generated.ts` 或 `*.readiness.ts`
- 防止 page / query / repository / mock adapter 直接依赖 generated SDK
- 防止 generated adapter 偷偷引用 `demo-data` / `admin-content`

## 当前结论

这批不是“已经接通真实后端”。

这批只是把 generated SDK readiness 的**可见性**和**切换门禁**补齐，避免后续 SDK 一生成，前端误以为所有 screen 已经完成真实接线。
