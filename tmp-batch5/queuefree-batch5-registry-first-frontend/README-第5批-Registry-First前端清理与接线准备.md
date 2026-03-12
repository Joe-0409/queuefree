# QueueFree 第 5 批：Registry-First 前端清理与接线准备

这批不是新增业务页面。

这批的目标只有两个：

1. 把前面前端骨架里不够严格的地方清理掉，重新对齐 **PRD v1.2 + 协作契约 + registry baseline**
2. 把后续 `packages/api-client` 的真正接线顺序锁回到：**registry -> OpenAPI -> generated sdk -> frontend consume**

---

## 这批修正了什么

- 删除了 `packages/api-client` 里的手写 API path 占位文件
- 把 `packages/api-client` 改回 **pre-OpenAPI placeholder**
- 把 Mobile 里的未登记环境变量清理掉，只保留 registry 已登记变量
- 把前端页面和 handoff 文档里出现的“猜测型 API path”提示语改成 **模块级说明**
- 新增一个本地校验脚本：`pnpm verify:registry-first-frontend`

---

## 你现在怎么用

### 1）打开项目

用 VS Code 打开整个项目文件夹。

### 2）安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

### 3）先跑这条检查

```bash
pnpm verify:registry-first-frontend
```

如果通过，你会看到：

```text
Registry-first frontend verification passed.
```

### 4）再启动你要看的前端

手机端：

```bash
pnpm dev:mobile
```

官网：

```bash
pnpm dev:web
```

后台：

```bash
pnpm dev:admin
```

### 5）这批最重要的协作顺序

从现在开始，前端这边默认遵守下面顺序：

1. 后端先补 registry
2. 后端再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再删 mock、接真实 SDK

前端不要反过来先猜接口。
