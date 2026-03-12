# Backend Next Steps from Admin Batch 4

规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`
4. `packages/shared`
5. `packages/api-client`

## 当前前端状态

`apps/admin` 第1批已落地，但仍是 **Admin Skeleton**：

- 只有冻结路由的页面骨架
- 没有真实鉴权
- 没有真实 Admin API
- 没有新增 registry 项
- 没有新增 shared contract

## 后端线程下一步建议

### 1. 不要直接给前端口头字段

任何新增或修改以下内容，都必须先登记，再生成：

- Admin API path
- request field
- response field
- 风控案件字段
- 提现审核字段
- 审计字段
- 商品/订单/队列后台详情字段

### 2. 优先补齐最小 Admin OpenAPI 只读链路

建议先做只读，不做写操作：

- 商品列表 / 详情
- 订单列表 / 详情
- 队列列表 / 详情
- 时隙列表 / 详情
- 活动列表 / 详情
- 任务列表 / 详情
- 邀请关系列表 / 详情
- 钱包总览
- 提现列表
- 风险案件列表 / 详情
- 审计日志列表

### 3. 真实动作接口先延后

以下动作在没有 registry 登记前不要让前端接：

- 后台减量
- 售后与退款录入
- 冻结 / 解冻 / 移出队列
- 时隙重试 / 重放
- 活动上下线
- 任务上下线
- 提现审核 / 驳回
- 风险人工决策
- 角色权限修改

### 4. 生成方式要求

- `packages/api-client` 只能由 OpenAPI 生成
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 不要让前端直接依赖 `services/api` 内部类型
