# QueueFree 第10批：Generated Adapter 就绪门禁与可见性

这批不新增页面，也不新增共享契约。

这批的目标是：

1. 让 `packages/api-client` 暴露最小运行时模式信息
2. 让 mobile / admin 明确显示自己当前到底是 mock 还是 generated
3. 让 generated SDK 到位以后，前端不会误以为“已经能用了”
4. 新增本地门禁，确保 `@queuefree/api-client` 只出现在允许的位置

## 这批做了什么

- `packages/api-client` placeholder / generated barrel 现在会导出：
  - `API_CLIENT_RUNTIME_MODE`
  - `API_CLIENT_IS_GENERATED`
  - `loadGeneratedApiClient()`
- mobile 增加 generated adapter readiness 文件
- runtime-config adapter 增加 generated readiness 文件
- admin 增加 generated adapter readiness 文件
- mobile / admin banner 现在会把当前数据源与阻塞原因显示出来
- 新增 `pnpm verify:generated-adapter-bridge`
- `pnpm verify:frontend-guardrails` 现在会把上面这项也串起来

## 你现在怎么做

1. 下载并解压这批压缩包
2. 用它覆盖你本地仓库
3. 打开 VS Code
4. 打开终端
5. 依次输入：

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

## backend 交付 OpenAPI 之后要注意什么

就算 `packages/api-client` 已经生成成功，前端也**不会自动切到 generated**。

原因是：

- `API_CLIENT_IS_GENERATED = true` 只表示 SDK 文件已经生成
- 不代表 mobile / admin 的 screen-model mapping 已经写完
- 所以各 app 还会额外检查 `*_GENERATED_ADAPTER_READY`

只有：

- SDK 已生成
- 对应 app 的 generated adapter mapping 已完成

前端才应该从 mock 切到 generated。

## 这批适合什么场景

- 你要把当前仓库继续保持 registry-first
- 你要避免“刚生成 SDK 就误切生产链路”
- 你要把当前 skeleton 模式对创始人、后端、服务器都显示得更清楚
