# QueueFree 第 2 批：给后端线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 当前前端状态

前端第 2 批已经完成 `apps/mobile` 路由骨架。

当前手机端：

- 只依赖 `packages/shared`
- 继续使用本地 mock / placeholder 数据
- 已经移除手写猜测型 API path 说明
- 等待后端按 registry-first 顺序补齐 OpenAPI

## 后端线程下一步正确顺序

1. 若触碰冻结项，先更新 `docs/registry/registry-baseline-v1.2.md`
2. 再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再逐模块替换本地 mock

## 后端优先建议的模块域

建议按下面顺序推进，不要求你在本文件里口头发明字段：

1. auth / session
2. product catalog
3. orders / payment intents
4. queue entries / queue guard / boost
5. wallet / withdrawal accounts / withdrawals
6. tasks
7. invites
8. profile / addresses / devices
9. rules content / notifications
10. account deletion

## 对后端线程的硬约束提醒

- 不要跳过 registry 直接新增 path / field / state
- 不要在没有 OpenAPI 的情况下让前端手写 contract
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 前端只会消费 `packages/shared` 和生成后的 `packages/api-client`

## 当前前端最需要你输出什么

1. registry 更新（如果你新增冻结项）
2. OpenAPI 文件
3. 生成好的 `packages/api-client`
4. runtime config 的真实下发链路
5. 按模块分批可读可接的最小 SDK
