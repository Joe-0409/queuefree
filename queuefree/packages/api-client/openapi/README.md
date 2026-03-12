# packages/api-client/openapi

这里是 **backend 导出的 OpenAPI 原始文件输入位**。

当前允许的文件名：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

## 正确顺序

1. backend 先完成 registry 对齐
2. backend 导出 OpenAPI 到本目录
3. 前端执行：`pnpm verify:openapi-intake`
4. 前端执行：`pnpm generate:api-client`
5. 前端再切换 generated adapter

## 注意

- 不要把手写 request / response 示例塞进这里
- 不要把 Postman collection 当成 OpenAPI 放进来
- OpenAPI path 必须继续受 registry baseline 已冻结的 C 端 / Admin API 前缀约束
- spec 存在但 SDK 未生成时，`pnpm verify:frontend-guardrails` 会失败，这是故意的
