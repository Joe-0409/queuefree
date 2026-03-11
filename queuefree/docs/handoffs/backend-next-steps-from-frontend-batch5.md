# Backend Next Steps from Frontend Batch 5

## 前端本轮已完成

- 清理了 `packages/api-client` 中的手写 path 占位
- 清理了 mobile 里的未登记 env var
- 清理了前端页面 / 文档里的猜测型 API path 描述
- 新增 pre-OpenAPI 边界校验脚本

## 你接下来需要做的事

1. 对新增冻结项先更新 registry
2. 按模块导出 OpenAPI
3. 生成 `packages/api-client`
4. 以模块分批给前端接线：
 - auth
 - products
 - orders / payment
 - queue / queue guard
 - wallet / withdrawals
 - tasks
 - invites
 - rules content
 - admin read-only domains

## 你当前不要做的事

- 不要跳过 registry 直接给前端口头字段
- 不要把 DTO 类型塞进 `packages/shared`
- 不要让前端手抄接口
