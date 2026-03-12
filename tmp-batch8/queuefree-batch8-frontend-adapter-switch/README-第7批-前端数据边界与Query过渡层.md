# QueueFree 第7批：前端数据边界与 Query 过渡层

这批不是接真实后端。

这批做的是：

- mobile 与 admin 页面不再直接 import 本地 mock 源文件
- 新增 query hook -> repository -> mock adapter 过渡层
- 新增 mock data boundary 校验脚本
- 保持 registry-first，不新增任何冻结项

## 启动方式

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

## 这一批适合做什么

- 演示页面路径是否完整
- 演示 loading / error / empty state 是否到位
- 演示后续 OpenAPI 接进来时，页面层无需大改

## 这一批还不做什么

- 不接真实鉴权
- 不接真实 REST 数据
- 不新增共享字段
- 不新增 API path
- 不新增 env var
