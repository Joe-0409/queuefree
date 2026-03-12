# QueueFree Web Public Route Map v1.2

状态：Drafted in Batch 3  
规则源：`queuefree_prd_v1_2` + `docs/contracts/queuefree-collaboration-contract-v1.2.md` + `docs/registry/registry-baseline-v1.2.md`

---

## 1. 本轮目标

落地 `apps/web` 的公开官网与合规页面骨架，严格遵守已经冻结的 Web 公共路由：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

本轮 **不新增** 路由，不修改任何已冻结路径。

---

## 2. 页面与职责映射

### `/`

用途：官网首页 / 审核首屏 / 品牌说明页

承担：

- 产品定位说明
- “买商品 -> 入队 -> 等时隙” 的公开解释
- 合规入口导航
- 首发市场与规则版本说明

### `/privacy`

用途：公开隐私政策页

承担：

- 数据收集范围说明
- 数据用途说明
- 删除与保留边界说明
- 公开规则与隐私关系说明

### `/terms`

用途：公开服务条款页

承担：

- 购物优先定位说明
- 非保证返现说明
- 风控 / 审核 / 售后影响说明
- 首发范围说明

### `/rules`

用途：规则中心首页

承担：

- 规则入口导航
- Queue / Wallet / Activity 子页分发
- 运行时参数只展示 fallback 示例，不作为业务真相源

### `/rules/queue`

用途：公开队列规则页

承担：

- 1 订单 = 1 席位
- Top30 保护区
- Boost 边界
- 冻结不参与有效排名
- 固定时隙结算说明

### `/rules/wallet`

用途：公开钱包与提现规则页

承担：

- pending / available / frozen 解释
- 钱包激活解释
- 提现门槛 fallback 示例
- 不支持充值 / 转账说明

### `/rules/activity/[slug]`

用途：公开活动规则页

承担：

- 活动规则独立 URL
- 展示活动可调整项与不可突破底线
- 作为活动链接、审核资料、投放落地页的规范页面

### `/delete-account`

用途：公开删除账号说明页

承担：

- 删除并非即时物理删除
- 阻塞项说明
- 状态机说明
- 清算后匿名化说明

### `/contact`

用途：公开客服 / 申诉入口说明页

承担：

- 联系与申诉分类说明
- 审核阶段的公开联系入口
- 后续接真实工单或邮箱时保持固定 URL 不变

---

## 3. 本轮约束

- 不新增 Web 冻结路由
- 不改 `/contact` 为 `/support`
- 不新增未登记 env var
- 不直接猜测后端规则 API 响应
- 当前页面文案以静态合规骨架为主
- 后续若切换为 CMS 或动态 rules 内容，必须以后端 OpenAPI 为准
