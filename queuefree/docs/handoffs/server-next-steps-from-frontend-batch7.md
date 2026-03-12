# Server Next Steps from Frontend Batch 7

## 前端本轮已完成

- 新增 pre-OpenAPI query / repository 过渡层
- 新增 mock data boundary 校验脚本
- 当前 mobile 与 admin 页面仍保持 registry 内既有路由不变

## 你接下来需要做的事

1. 继续保证 local / dev / staging / prod 的公开域名与 registry 一致
2. 保证 mobile / web / admin 公开 env 名称不漂移
3. 为后端导出 OpenAPI 与 packages/api-client 生成流程预留稳定构建位点
4. 在 preview / CI 环境中预留前端 boundary 校验脚本执行能力

## 你当前不要做的事

- 不要私自新增前端公开 env
- 不要把 Web `/contact` 改回 `/support`
- 不要把未登记 API path 先写入部署说明
