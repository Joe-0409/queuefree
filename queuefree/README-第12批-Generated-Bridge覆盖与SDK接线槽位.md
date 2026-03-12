# QueueFree 第 12 批：Generated Bridge 覆盖与 SDK 接线槽位

这批不是新增页面。

这批做的是：在不新增任何冻结项的前提下，把 mobile / admin / runtime-config 的 generated bridge 槽位与 coverage 门禁补齐。

## 你现在怎么用

1. 下载并解压本批压缩包
2. 用这批文件覆盖你本地仓库
3. 打开 VS Code
4. 打开终端
5. 依次运行：

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:web
```

管理后台：

```bash
pnpm dev:admin
```

手机端：

```bash
pnpm dev:mobile
```

## 这批新增了什么

- mobile generated bridge manifest
- mobile runtime-config generated bridge manifest
- admin generated bridge manifest
- generated bridge coverage 校验脚本
- readiness coverage gate
- banner 可见性更新

## 当前仍然不是

- 真实后端接通版
- 真实鉴权版
- 真实 API 版

只有 backend 把 OpenAPI 导出来之后，前端才能继续把 generated bridge 真正实现掉。
