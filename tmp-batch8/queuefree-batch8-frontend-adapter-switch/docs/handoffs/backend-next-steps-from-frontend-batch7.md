# Backend Next Steps from Frontend Batch 7

## 前端本轮已完成

- mobile 与 admin 页面不再直接读取本地 mock 源文件
- 新增 query / repository / mock adapter 过渡层
- 新增 mock data boundary 校验脚本
- 本轮没有新增任何 registry 项

## 你接下来需要做的事

1. 继续保持 registry-first
2. 优先为 **已经登记过的只读能力** 导出 OpenAPI，范围优先覆盖：
   - C 端商品列表与商品详情
   - C 端队列列表、队列详情、用户保活状态
   - C 端任务列表
   - C 端邀请概览与邀请记录
   - C 端钱包概览、账变列表、提现记录
   - C 端个人资料与规则中心
   - Admin dashboard summary
   - Admin 订单列表、队列列表、时隙列表、活动列表、任务列表、邀请列表、提现列表、风险案件列表、审计日志列表
3. 生成 `packages/api-client`
4. 通知前端开始 batch 8 的真实 SDK 读链路接线

## 你当前不要做的事

- 不要口头补字段让前端手抄
- 不要把 DTO / Swagger 类型直接丢给前端
- 不要为了配前端 skeleton 临时发明未登记 detail path
