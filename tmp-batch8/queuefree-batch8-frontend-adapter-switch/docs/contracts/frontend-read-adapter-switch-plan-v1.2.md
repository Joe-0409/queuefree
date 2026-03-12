# Frontend Read Adapter Switch Plan v1.2

状态：Locked by registry-first / pre-OpenAPI boundary

## 1. 目的

在 backend OpenAPI 尚未提供之前，前端不能手写猜测型 SDK。
因此本轮将数据读取链路统一收敛为：

- page
- query hook
- repository
- read adapter
- mock adapter / generated adapter

这样做的目的不是定义新 contract，而是给未来的 generated `packages/api-client` 预留唯一切换点。

## 2. 适用范围

本轮仅覆盖：

- `apps/mobile`
- `apps/admin`

`apps/web` 当前以公开内容页为主，不强制增加 query / repository / adapter 层。

## 3. 当前模式

### mobile

- `src/adapters/mobile-read-adapter.ts`
- `src/adapters/mobile-read-adapter.mock.ts`
- `src/adapters/mobile-read-adapter.generated.ts`
- `src/adapters/mobile-read-adapter.resolve.ts`

### runtime config

- `src/adapters/runtime-config-adapter.ts`
- `src/adapters/runtime-config-adapter.mock.ts`
- `src/adapters/runtime-config-adapter.generated.ts`
- `src/adapters/runtime-config-adapter.resolve.ts`

### admin

- `src/adapters/admin-read-adapter.ts`
- `src/adapters/admin-read-adapter.mock.ts`
- `src/adapters/admin-read-adapter.generated.ts`
- `src/adapters/admin-read-adapter.resolve.ts`

## 4. 允许与禁止

### 允许

- 在 app 内定义 view-model 层的 screen data 类型
- 在 mock adapter 中消费 demo content / placeholder content
- 在 generated adapter 中保留 throwing placeholder
- 在 resolve 层统一决定当前使用 mock 还是 generated

### 禁止

- 在 `packages/api-client` 手写 path / DTO / response
- 在 page 层直接 import demo-data
- 在 query hook 层直接 import mock adapter
- 在 repository 层直接 import demo-data / admin-content
- 在 generated adapter 中猜测 backend 字段

## 5. OpenAPI 到位后的替换顺序

1. backend 先更新 registry（如触碰冻结项）
2. backend 导出 OpenAPI
3. 生成 `packages/api-client`
4. 前端替换：
   - `mobile-read-adapter.generated.ts`
   - `runtime-config-adapter.generated.ts`
   - `admin-read-adapter.generated.ts`
5. `*.resolve.ts` 从 `mock` 切到 `generated`
6. 保留页面、query hook、repository 结构不动

## 6. 为什么这样做

这样可以保证：

- 页面结构先稳定
- query key 先稳定
- repository 入口先稳定
- SDK 到位后只改 adapter 层
- 不需要大面积重写 screen 组件
