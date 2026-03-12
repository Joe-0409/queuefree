# QueueFree Mobile Screen → Backend Domain Dependency Map v1.2

状态：Pre-OpenAPI Boundary  
唯一规则源：`queuefree_prd_v1_2`

本文件**不是 API path 注册表**。  
本文件只说明：手机端每个冻结路由，后续会依赖哪个**后端模块域**。

在 backend 尚未完成 registry + OpenAPI 之前：

- 这里**不写**猜测型 REST path
- 这里**不写**请求字段 / 响应字段
- 这里**不写** DTO 结构
- 前端继续只用 `packages/shared` + 本地 mock

---

## 1. Public 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(public)/welcome` | 欢迎、规则摘要、风险提示 | rules content | 静态说明 |
| `/(public)/auth/phone` | 手机号输入、法律同意、邀请码 | auth / invite bind policy | 本地表单 + demo flow |
| `/(public)/auth/otp` | OTP 校验、登录注册合流 | auth / session | 本地表单 + demo flow |

## 2. Tab 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/(tabs)/home` | 商品摘要、活动摘要、规则入口 | product catalog / rules content / notifications | 本地 mock |
| `/(app)/(tabs)/queue` | 队列列表、当前排名、保活状态 | queue entries / queue guard | 本地 mock |
| `/(app)/(tabs)/tasks` | 任务列表、领奖 | tasks | 本地 mock |
| `/(app)/(tabs)/invites` | 邀请码、邀请状态、奖励记录 | invites | 本地 mock |
| `/(app)/(tabs)/wallet` | 钱包总览、账变、提现记录 | wallet / withdrawals / withdrawal accounts | 本地 mock |
| `/(app)/(tabs)/me` | 资料、地址、安全、规则、删除账号入口 | profile / addresses / devices / account deletion | 本地 mock |

## 3. Detail Stack 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/product/[productId]` | 商品详情 | product catalog | 本地 mock |
| `/(app)/checkout/[productId]` | 地址选择、订单确认、支付前置 | addresses / orders / payment intents | 本地 mock |
| `/(app)/orders/success/[orderId]` | 支付成功、入队成功 | orders / queue entries / queue guard | 本地 mock |
| `/(app)/queue/[entryId]` | 队列详情、boost 展示 | queue entries / queue boost | 本地 mock |
| `/(app)/wallet/withdraw` | 提现申请 | wallet / withdrawals / withdrawal accounts | 本地表单 |
| `/(app)/me/addresses` | 地址列表、地址新增 | addresses | 本地表单 |
| `/(app)/me/security` | 设备、安全、登出 | devices / auth session | 本地 mock |
| `/(app)/rules` | 规则中心 | rules content | 静态说明 |
| `/(app)/rules/queue` | 队列规则 | rules content | 静态说明 |
| `/(app)/rules/wallet` | 钱包规则 | rules content | 静态说明 |
| `/(app)/rules/activity/[campaignId]` | 活动规则 | rules content / campaigns | 静态说明 |
| `/(app)/privacy` | 隐私政策 | public compliance content | 静态说明 |
| `/(app)/terms` | 服务条款 | public compliance content | 静态说明 |
| `/(app)/support` | 客服 / 申诉说明 | support contact content | 静态说明 |
| `/(app)/delete-account` | 删除账号说明与申请占位 | account deletion | 本地 demo flow |

---

## 4. 正确接线顺序

1. 后端先更新 registry（如果有新增冻结项）
2. 后端导出 OpenAPI
3. 重新生成 `packages/api-client`
4. 前端再把对应模块从 mock 切到 generated SDK

顺序不能反。
