# QueueFree 第9批：OpenAPI 输入与 SDK 生成脚手架

这批的目标不是新增页面，而是把前端仓库补成“**后端一给 OpenAPI，前端就能立刻生成 packages/api-client**”的状态。

## 这批做了什么

- 增加 OpenAPI 输入校验脚本
- 增加 SDK 生成脚本
- 增加生成产物一致性校验
- 增加一键回到 pre-OpenAPI placeholder 的重置脚本
- 增加 batch9 的前后端 / 服务器 handoff 文档

## 你现在怎么做

1. 下载并解压这批压缩包
2. 用它覆盖你本地仓库
3. 打开 VS Code
4. 打开终端
5. 输入：

```bash
pnpm install
pnpm verify:frontend-guardrails
```

如果 backend 还没给 OpenAPI，第二行会正常通过，因为 `verify:openapi-intake` 会直接 skip。

## backend 给 OpenAPI 以后怎么做

把 spec 放到：

```text
packages/api-client/openapi/
```

支持文件名：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

然后依次输入：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
pnpm verify:frontend-guardrails
```

## 如果你想回到 placeholder 模式

输入：

```bash
pnpm reset:api-client-placeholder
```

这个命令会删除 `packages/api-client/src/generated/client`，并把 `packages/api-client/src/index.ts` 改回 pre-OpenAPI placeholder。
