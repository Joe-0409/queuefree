# @queuefree/api-client

状态：Pre-OpenAPI Placeholder

这个包当前**不包含任何手写业务 API contract**。

根据 `queuefree_prd_v1_2`、协作契约、registry baseline：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 前端在没有 OpenAPI 的阶段，**不能**在这里手写 path / request / response / DTO / schema
- 前端当前只能继续使用：
  - `packages/shared`
  - 各 app 内部的本地 mock / placeholder 数据

## 正确顺序

1. 后端先更新 registry（如果触碰冻结项）
2. 后端导出 OpenAPI
3. 用生成器生成 `packages/api-client`
4. 前端再从本地 mock 切换到 generated SDK

## 当前允许保留的内容

- 这个包的位置
- `src/index.ts` 的空占位入口
- `openapi/` 目录占位
- `src/generated/` 目录占位

## 当前明确不允许

- 手写 REST path 常量
- 手写请求 / 响应字段
- 手写业务 DTO
- 把 NestJS DTO / Swagger 类型复制到这里
