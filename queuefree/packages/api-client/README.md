# @queuefree/api-client

状态：OpenAPI Intake Ready / Pre-Generation Placeholder

这个包当前**仍然不包含任何手写业务 API contract**。

根据 `queuefree_prd_v1_2`、协作契约、registry baseline：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 前端在没有 OpenAPI 的阶段，**不能**在这里手写 path / request / response / DTO / schema
- 前端当前只能继续使用：
  - `packages/shared`
  - 各 app 内部的本地 mock / placeholder 数据

## 当前目录职责

- `openapi/`：backend 导出的 OpenAPI 原始输入文件
- `src/index.ts`：生成前的 placeholder barrel，生成后会被脚本改写
- `src/generated/`：生成产物目录

## 正确顺序

1. 后端先更新 registry（如果触碰冻结项）
2. 后端导出 OpenAPI 到 `packages/api-client/openapi`
3. 前端执行 `pnpm verify:openapi-intake`
4. 前端执行 `pnpm generate:api-client`
5. 前端再把 adapter 从 mock 切到 generated SDK

## 当前允许保留的内容

- 这个包的位置
- `src/index.ts` 的 placeholder barrel
- `openapi/` 目录占位与说明文档
- `src/generated/` 目录占位与生成产物

## 当前明确不允许

- 手写 REST path 常量
- 手写请求 / 响应字段
- 手写业务 DTO
- 把 NestJS DTO / Swagger 类型复制到这里
- 让前端页面直接依赖未生成的 service path 文本
