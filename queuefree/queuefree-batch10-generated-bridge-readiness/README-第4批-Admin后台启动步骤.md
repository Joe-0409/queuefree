# QueueFree 第4批：Admin 后台骨架启动步骤

这批内容是 `apps/admin` 的第一批骨架。

特点：

- 只使用已经冻结的 Admin 路由
- 不新增 route
- 不新增 env var
- 不接真实鉴权
- 不接真实 API
- 所有页面都明确标注为 **Admin Skeleton**
- 目标是：**先能跑、能看路径、能给后端和服务器对齐**

---

## 1. 先准备软件

如果你前面几批已经装过，这一步可以跳过。

你需要：

1. Node.js `22.22.1`
2. pnpm `10.32.0`
3. VS Code

---

## 2. 打开项目

把压缩包解压后，用 VS Code 打开整个 `queuefree` 文件夹。

---

## 3. 安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

---

## 4. 启动 Admin 后台

继续输入：

```bash
pnpm dev:admin
```

---

## 5. 打开浏览器

访问：

```text
http://localhost:3001
```

登录页地址：

```text
http://localhost:3001/login
```

Dashboard 地址：

```text
http://localhost:3001
```

---

## 6. 本轮页面范围

已落地的冻结路由：

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

---

## 7. 当前这批不能做什么

这批 **不能**：

- 真实登录
- 真实权限控制
- 真实 API 请求
- 真实数据库
- 真实审核动作
- 真实提现审批
- 真实风控决策

这些动作都要等后端线程先登记 contract，再通过 OpenAPI 生成 `packages/api-client` 后接入。

---

## 8. 发给后端与服务器

请把下面文件发给另外两个对话框：

- `docs/contracts/admin-route-module-map-v1.2.md`
- `docs/handoffs/backend-next-steps-from-admin-batch4.md`
- `docs/handoffs/server-next-steps-from-admin-batch4.md`
- `docs/handoffs/第4批-发给后端和服务器的话术.md`
