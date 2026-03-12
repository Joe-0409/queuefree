# QueueFree Mobile Screen -> API Map v1.2

状态：Working Baseline  
唯一规则源：`queuefree_prd_v1_2`  
用途：把手机端页面、PRD 路由、后端 API 对接关系先对齐，避免三个线程各写各的。

---

## 1. 使用规则

1. 本文件只做 **屏幕与已锁定 API path 的映射**
2. **不在这里猜测 DTO 字段**
3. 实际请求 / 响应字段必须以后端 OpenAPI 为准
4. `packages/api-client` 只允许由 OpenAPI 生成；当前前端骨架先用本地 mock 数据
5. 若要新增 API path，必须先更新 registry 和协作契约

---

## 2. Public 路由映射

### `/(public)/welcome`

用途：

- 欢迎页 / 风险提示 / 规则摘要

API：

- 无强依赖
- 可选：`GET /v1/rules`

Owner：

- Frontend 先用静态说明
- Backend 后续补规则聚合能力

---

### `/(public)/auth/phone`

用途：

- 输入手机号
- 同意隐私政策与服务条款
- 发送 OTP
- 可选绑定邀请码

API：

- `POST /v1/auth/otp/send`
- `POST /v1/invites/bind`（仅当业务确认在登录前允许预绑定；否则登录后触发）

Owner：

- Frontend：表单、校验、loading、error
- Backend：OTP 发送、限流、风控

---

### `/(public)/auth/otp`

用途：

- 验证 OTP
- 登录 / 注册合流

API：

- `POST /v1/auth/otp/verify`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`

Owner：

- Backend 提供 token / session
- Frontend 接入成功后跳转 Home

---

## 3. Tabs 路由映射

### `/(app)/(tabs)/home`

用途：

- 商品列表
- 今日活动摘要
- 今日时隙摘要
- 规则入口

API：

- `GET /v1/products`
- `GET /v1/rules`
- `GET /v1/notifications`（可后置）

---

### `/(app)/(tabs)/queue`

用途：

- 队列列表
- 当前有效排名
- 保活状态
- 每日签到

API：

- `GET /v1/queue-entries`
- `GET /v1/queue-guard`
- `POST /v1/queue-guard/check-in`

---

### `/(app)/(tabs)/tasks`

用途：

- 新手任务 / 每日任务 / 成长任务 / 信任任务
- 领奖

API：

- `GET /v1/tasks`
- `POST /v1/tasks/:taskId/claim`

---

### `/(app)/(tabs)/invites`

用途：

- 邀请码
- 邀请状态
- 有效邀请数
- 奖励记录

API：

- `GET /v1/invites/me`
- `GET /v1/invites/records`
- `POST /v1/invites/bind`

---

### `/(app)/(tabs)/wallet`

用途：

- 钱包总览
- 待释放 / 可提现 / 冻结余额
- 提现记录
- 提现账户列表
- 钱包账变流水

API：

- `GET /v1/wallet`
- `GET /v1/wallet/ledgers`
- `GET /v1/withdrawals`
- `GET /v1/withdrawal-accounts`

---

### `/(app)/(tabs)/me`

用途：

- 我的资料
- 地址
- 设备与安全
- 规则、隐私、条款、客服、删除账号入口

API：

- `GET /v1/me`
- `PATCH /v1/me/profile`
- `GET /v1/me/devices`

---

## 4. Detail Stack 路由映射

### `/(app)/product/[productId]`

用途：

- 商品详情
- SKU 展示
- 数量选择
- 规则摘要

API：

- `GET /v1/products/:productId`

---

### `/(app)/checkout/[productId]`

用途：

- 地址选择 / 编辑
- 价格拆解
- 规则确认
- 创建订单
- 创建支付意图

API：

- `GET /v1/me/addresses`
- `POST /v1/me/addresses`
- `POST /v1/orders`
- `POST /v1/orders/:orderId/payment-intents`

---

### `/(app)/orders/success/[orderId]`

用途：

- 支付成功 / 入队成功
- 展示队列结果、当前名次、保活状态、下一时隙

API：

- `GET /v1/orders/:orderId`
- `GET /v1/queue-entries`
- `GET /v1/queue-guard`

说明：

- PRD 没有单独给 “根据 orderId 查询 queueEntryId 的独立接口”，可由订单详情或队列列表聚合返回；实际字段以后端 OpenAPI 为准。

---

### `/(app)/queue/[entryId]`

用途：

- 队列详情
- Boost
- 事件日志

API：

- `GET /v1/queue-entries/:queueEntryId`
- `POST /v1/queue-entries/:queueEntryId/boost`

---

### `/(app)/wallet/withdraw`

用途：

- 提现账户管理
- 发起提现

API：

- `GET /v1/withdrawal-accounts`
- `POST /v1/withdrawal-accounts`
- `POST /v1/withdrawals`
- `GET /v1/withdrawals`

---

### `/(app)/me/addresses`

用途：

- 地址列表
- 新增地址

API：

- `GET /v1/me/addresses`
- `POST /v1/me/addresses`

---

### `/(app)/me/security`

用途：

- 设备查看
- 会话与退出登录

API：

- `GET /v1/me/devices`
- `POST /v1/auth/logout`

---

### `/(app)/rules`

用途：

- 规则中心
- FAQ

API：

- `GET /v1/rules`

---

### `/(app)/rules/queue`

用途：

- 队列规则页

API：

- `GET /v1/rules/queue`
- 若后端最终统一成 slug 形式，则使用：`GET /v1/rules/:slug`

---

### `/(app)/rules/wallet`

用途：

- 钱包 / 提现规则页

API：

- `GET /v1/rules/wallet`
- 若后端最终统一成 slug 形式，则使用：`GET /v1/rules/:slug`

---

### `/(app)/rules/activity/[campaignId]`

用途：

- 活动规则页

API：

- `GET /v1/rules/:slug`
- 或活动详情聚合接口（待后端 OpenAPI 明确）

说明：

- 这里不手写字段，先保留页面和深链占位。

---

### `/(app)/privacy`

用途：

- App 内隐私政策

API：

- 可无 API，直接静态页
- 或复用：`GET /v1/rules/:slug`

---

### `/(app)/terms`

用途：

- App 内服务条款

API：

- 可无 API，直接静态页
- 或复用：`GET /v1/rules/:slug`

---

### `/(app)/support`

用途：

- 客服 / 申诉 / 联系方式

API：

- 可无强依赖
- 可选：`GET /v1/notifications`

---

### `/(app)/delete-account`

用途：

- 删除账号说明
- 阻塞项说明
- 提交删除申请

API：

- `GET /v1/me`
- `GET /v1/orders`
- `GET /v1/wallet`
- `POST /v1/me/delete-account-requests`

---

## 5. 第一阶段建议对接顺序

### Sprint 0

- 先把 `packages/shared` 对齐
- 后端输出 OpenAPI 骨架
- 前端保留 mock 数据，路由先跑起来

### Sprint 1

- Auth
- Home / Product
- Checkout / Payment Intent
- Order Success / Queue Entry 初版

### Sprint 2

- Queue
- Check-in
- Boost
- Freeze / Restore / Remove 展示态

### Sprint 3

- Wallet
- Withdrawal accounts
- Withdrawals
- Ledgers

### Sprint 4

- Tasks
- Invites
- Notifications

---

## 6. 明确不做的事

这份文件**不做**下面这些猜测：

1. 不猜 DTO class
2. 不猜字段命名细节
3. 不猜响应 envelope
4. 不猜分页结构
5. 不猜错误码格式
6. 不猜鉴权 header 具体实现

这些都以后端 OpenAPI 为准。
