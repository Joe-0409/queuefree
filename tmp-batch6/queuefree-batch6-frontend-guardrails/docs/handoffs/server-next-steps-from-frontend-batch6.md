# Server Next Steps from Frontend Batch 6

## 前端本轮已完成

- 把前端仓库的 route / env / import 边界校验补齐了
- 当前 Web / Mobile / Admin 路由文件都已与 registry 对齐

## 你接下来需要做的事

1. 继续保证 Web / Admin / API 本地域名与 registry 一致
2. 保证环境变量分组不漂移：
   - mobile 只暴露已登记 `EXPO_PUBLIC_*`
   - web 只暴露已登记 `NEXT_PUBLIC_*`
   - admin 只暴露已登记 `NEXT_PUBLIC_*`
3. 为后端后续导出 OpenAPI 预留稳定地址与环境分层
4. 等 backend 出最小 OpenAPI 后，再把前端 CI / preview 环境接到 generated sdk 流程

## 你当前不要做的事

- 不要私自增加前端公开 env 名称
- 不要把 Web `/contact` 改回 `/support`
- 不要把未登记的 API path 提前写进部署配置说明
