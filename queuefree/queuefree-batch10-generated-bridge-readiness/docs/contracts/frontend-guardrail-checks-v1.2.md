# QueueFree Frontend Guardrail Checks v1.2

状态：Informational  
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的共享契约。

本文件只说明：当前前端线程新增了哪些**本地质量门禁脚本**，以及它们分别防止什么问题。

## 新增脚本

### 1. `pnpm verify:registry-first-frontend`

作用：

- 校验 mobile / web / admin 只使用已登记的公开 env var
- 校验 pre-OpenAPI 阶段没有手写业务 API path 片段
- 校验 `packages/api-client` 没有回退成手写 SDK

### 2. `pnpm verify:route-registry`

作用：

- 校验 `apps/mobile` 的 expo-router 页面路径与 registry 一致
- 校验 `apps/web` 的公开页面路径与 registry 一致
- 校验 `apps/admin` 的后台路径与 registry 一致

### 3. `pnpm verify:frontend-import-boundaries`

作用：

- 校验前端 app 没有直接引入 NestJS / Prisma / worker 侧依赖
- 校验 `packages/shared` 没有混入 NestJS DTO / Prisma runtime 绑定逻辑

### 4. `pnpm verify:mock-data-boundary`

作用：

- 校验 page / query / repository 层没有直接偷用 `demo-data` 或 `admin-content`
- 把 mock 数据限定在 adapter / mock content 层

### 5. `pnpm verify:adapter-switch-boundary`

作用：

- 校验 app 内仍然使用 page → query hook → repository → adapter 的切换结构
- 防止页面直接跨层 import mock adapter 或 generated adapter

### 6. `pnpm verify:generated-adapter-bridge`

作用：

- 限制 `@queuefree/api-client` 只能出现在 `*.generated.ts` 或 `*.readiness.ts`
- 防止 page / query / repository / mock adapter 直接依赖 generated SDK
- 防止 generated adapter 偷偷引用 mock content

### 7. `pnpm verify:openapi-intake`

作用：

- 校验 backend 给出的 OpenAPI 输入文件是否合法
- 校验 path 前缀继续落在冻结 API 前缀范围内
- 校验 operationId 完整性

### 8. `pnpm verify:generated-api-client`

作用：

- 校验 spec、生成物、`packages/api-client/src/index.ts` 三者是否同步
- 校验 `packages/api-client/src` 没有长出额外手写业务文件

### 9. `pnpm verify:frontend-guardrails`

作用：

- 串联执行上面所有校验
- 建议作为本地提交前的统一检查入口

## 设计目的

这批脚本不是为了新增功能，而是为了避免 5 类问题再次出现：

1. 前端偷偷长出未登记路径
2. 前端重新手写猜测型 API path / SDK
3. `packages/shared` 被污染成后端运行时代码仓库
4. generated SDK 直接泄漏到 page / query / repository 层
5. SDK 已生成但 screen-model mapping 尚未完成时，被误切到 generated 模式

## 当前边界

在 backend 尚未导出正式 OpenAPI 之前，前端仍然保持：

- 页面骨架可继续做
- mock / placeholder 可继续做
- 真实 SDK 接入继续等待 OpenAPI 生成后再做
