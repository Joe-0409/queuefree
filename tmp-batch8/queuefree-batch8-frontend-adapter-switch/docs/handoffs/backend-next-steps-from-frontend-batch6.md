# Backend Next Steps from Frontend Batch 6

## 前端本轮已完成

- 新增 route registry 校验脚本
- 新增 frontend import boundary 校验脚本
- 强化了 public env registry 校验
- 新增前端路由审计与 guardrail 说明文档

## 你接下来需要做的事

1. 继续保持 registry-first
2. 对真正需要开放给前端的 API path / field，先登记再导出 OpenAPI
3. 优先给出最小可消费的只读 OpenAPI：
   - runtime config
   - products
   - campaigns
   - tasks
   - invites
   - wallet summary
   - withdrawals list
   - admin read-only dashboards
4. 生成 `packages/api-client`
5. 通知前端切第 7 批真实 SDK 接线

## 你当前不要做的事

- 不要把 DTO / Swagger 类型直接丢给前端
- 不要口头补字段让前端手抄
- 不要跳过 registry 直接新增冻结项
