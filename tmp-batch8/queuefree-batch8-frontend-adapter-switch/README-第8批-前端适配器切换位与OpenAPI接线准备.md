# QueueFree 第 8 批：前端适配器切换位与 OpenAPI 接线准备

这批不是新增业务规则，也不是新增页面。

这批做的是：

- 把 `apps/mobile` 和 `apps/admin` 的数据读取路径改成：
  - page
  - query hook
  - repository
  - read adapter
  - mock adapter / generated adapter
- 让后端一旦给出 OpenAPI，前端只需要改 `generated adapter` 和 `resolve` 层，不需要大面积改页面。
- 继续保持 registry-first，不手写新的业务 API contract。

## 你现在怎么用

1. 下载并解压第 8 批压缩包。
2. 用这批文件覆盖你本地仓库。
3. 打开 VS Code。
4. 点 `Terminal -> New Terminal`。
5. 依次执行：

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

## 这批的重点

- 还是 mock 数据
- 还是 skeleton 页面
- 但是 repository 后面已经多了一层 adapter
- 将来接真实 OpenAPI 时，优先替换：
  - `apps/mobile/src/adapters/*generated.ts`
  - `apps/admin/src/adapters/*generated.ts`
  - `*resolve.ts`

## 这批没有做什么

- 没有新增 route
- 没有新增 env var
- 没有新增 shared contract
- 没有手写 `packages/api-client` 业务 SDK
- 没有猜测后端 request / response 字段
