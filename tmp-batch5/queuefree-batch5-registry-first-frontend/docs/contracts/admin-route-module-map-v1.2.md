# QueueFree Admin Route ↔ Module Map v1.2

状态：Informational  
规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`
4. `packages/shared`

本文件不是新的冻结项注册表。  
本文件只用于说明：**本轮 `apps/admin` 骨架如何映射到已经冻结的 Admin 路由与 PRD 模块。**

---

## 1. 登录与总览

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/login` | 9.3 Admin IA / 登录 | 登录壳页面、协议提示、Skeleton 入口 |
| `/` | 11.1 Dashboard | 指标卡、队列摘要、资金摘要、待处理事项 |

---

## 2. 运营域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/products` | 11.2 商品管理 | 商品列表、入队开关/活动绑定占位 |
| `/products/[productId]` | 11.2 商品管理 | 商品详情骨架、价格库存与队列设置占位 |
| `/orders` | 11.3 订单管理 | 订单列表、状态概览、售后/退款占位 |
| `/orders/[orderId]` | 11.3 订单管理 | 订单详情骨架、履约与售后占位 |
| `/queues` | 11.4 队列管理 | 队列列表、状态摘要、事件日志入口占位 |
| `/queues/[entryId]` | 11.4 队列管理 | 队列详情、Boost/冻结/移出说明占位 |
| `/slots` | 11.5 时隙管理 | 时隙列表、执行状态摘要 |
| `/slots/[slotId]` | 11.5 时隙管理 | 时隙详情、重试/重放占位 |
| `/campaigns` | 11.6 活动管理 | 活动列表、封顶与额外时隙占位 |
| `/campaigns/[campaignId]` | 11.6 活动管理 | 活动详情、规则文案占位 |
| `/tasks` | 11.7 任务与邀请管理 | 任务列表、奖励配置占位 |
| `/tasks/[taskId]` | 11.7 任务与邀请管理 | 任务详情骨架 |
| `/invites` | 11.7 任务与邀请管理 | 邀请关系列表、有效状态摘要 |
| `/invites/[relationId]` | 11.7 任务与邀请管理 | 邀请关系详情骨架 |

---

## 3. 资金风控域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/wallet` | 11.8 钱包与提现管理 | 钱包总览、账变占位、激活方式提示 |
| `/withdrawals` | 11.8 钱包与提现管理 | 提现列表、审核阶段占位 |
| `/risk` | 11.9 风控后台 | 风险案件池、命中线索占位 |
| `/risk/[caseId]` | 11.9 风控后台 | 风险案件详情、人工决策占位 |

---

## 4. 治理域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/governance` | 11.10 权限与审计 | RBAC、角色权限矩阵、敏感操作说明 |
| `/audit` | 11.10 权限与审计 | 审计日志列表、导出占位 |

---

## 5. 本轮明确不做的内容

- 真实鉴权
- 真实 RBAC 校验
- 真实 Admin API 接入
- 真实 Prisma / CMS / 审核动作
- 未登记 contract 的 request / response 字段
