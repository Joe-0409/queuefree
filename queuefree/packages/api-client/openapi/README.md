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
5. 前端执行：`pnpm verify:generated-api-client`
6. 前端再补 `*.generated.ts` 的 screen-model mapping
7. 对应 app 的 `*_GENERATED_ADAPTER_READY` 变为 `true`

## 注意

- 不要把手写 request / response 示例塞进这里
- 不要把 Postman collection 当成 OpenAPI 放进来
- OpenAPI path 必须继续受 registry baseline 已冻结的 C 端 / Admin API 前缀约束
- spec 存在但 SDK 未生成时，`pnpm verify:frontend-guardrails` 会失败，这是故意的
- SDK 已生成，也不代表 app 会自动切到 generated；app 还会检查 generated adapter readiness
