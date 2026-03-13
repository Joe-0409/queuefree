# Backend handoff after frontend batch14 readonly

前端已完成 readonly generated bridge 真接线，当前状态：

- Mobile readonly 已接：runtime config / me / products / queue guard / queue entries / rules
- Admin readonly 已接：health / runtime config / products / queue entries / governance(rules)
- 所有现有前端门禁脚本已通过

## Backend 下一步优先级

1. 继续补 Admin readonly：orders / slots / campaigns / tasks / invites / withdrawals / risk / audit
2. 再补 write OpenAPI：
   - createOrder
   - createPaymentIntent
   - checkInQueueGuard
3. 所有新增 request / response 字段仍需先 registry，再 OpenAPI，再前端消费

## 需要避免的事

- 不要口头给字段
- 不要让前端手写 DTO
- 不要绕过 `packages/api-client`
