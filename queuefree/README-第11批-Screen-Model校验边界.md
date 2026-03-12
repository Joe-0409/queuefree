# 第11批：Screen Model 校验边界

这批不是新增页面，而是把前端当前 skeleton 仓库补成：

```text
page -> query hook -> repository -> screen-model validation -> read adapter
```

## 你现在怎么做

1. 下载并解压这批仓库。
2. 用它覆盖你本地当前的 QueueFree 前端仓库。
3. 打开 VS Code。
4. 打开终端。
5. 运行：

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:web
```

后台：

```bash
pnpm dev:admin
```

手机端：

```bash
pnpm dev:mobile
```

## 这批新增了什么

- mobile screen model zod schema
- admin screen model zod schema
- repository 层统一 parse / validate
- `verify:screen-model-validation` 门禁脚本
- Batch 11 handoff 文档

## 这批没有做什么

- 没有新增 route
- 没有新增 env var
- 没有新增 API path
- 没有新增 request / response field
- 没有真实接后端
- 没有改 `packages/shared`
- 没有改 registry baseline
