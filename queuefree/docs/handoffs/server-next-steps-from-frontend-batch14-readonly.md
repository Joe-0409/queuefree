# Server handoff after frontend batch14 readonly

前端 readonly generated bridge 已接到真实 SDK。

## 服务器侧当前无需变更

- 不新增前端 env var
- 不改公开路由
- 不改 Web `/contact`

## 下一步更有价值的工作

1. 保证各环境的 `NEXT_PUBLIC_API_BASE_URL` / `EXPO_PUBLIC_API_BASE_URL` 指向正确 readonly API
2. 在 CI 中串联：
   - verify-openapi-intake
   - generate:api-client
   - verify-generated-api-client
   - verify:frontend-guardrails
3. 等 write OpenAPI 就绪后，再加入更严格的 bridge coverage gate
