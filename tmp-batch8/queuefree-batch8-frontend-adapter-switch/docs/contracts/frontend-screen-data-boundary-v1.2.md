# Frontend Screen Data Boundary v1.2

状态：Locked for pre-OpenAPI frontend work  
适用范围：`apps/mobile`、`apps/admin`

## 目标

在 backend 还没有导出正式 OpenAPI 之前，前端允许继续做 skeleton / demo mode，
但页面层不得直接引用 mock data 源文件。

## 当前允许的数据流

页面 / route file
-> query hook
-> app-local repository
-> app-local demo content

## 当前禁止的数据流

页面 / route file
-> 直接 import `src/lib/demo-data`

页面 / route file
-> 直接 import `src/lib/admin-content`

## 为什么这样做

1. 不发明新的共享契约
2. 不把页面直接绑死在本地占位数据上
3. 等 backend 输出 OpenAPI 后，只需要替换 repository 内部实现
4. route 层可以先把 loading / error / empty state 做完整

## 允许触达的真相源

1. `queuefree_prd_v1_2`
2. `packages/shared`
3. `packages/api-client`（待 OpenAPI 生成）
4. `docs/registry/registry-baseline-v1.2.md`

## 本文档不新增任何冻结项

- 不新增 route
- 不新增 env var
- 不新增 API path
- 不新增 request field
- 不新增 response field
- 不新增 enum / state

## 后续切换方式

当 backend 提供正式 OpenAPI 后：

query hook
-> repository
-> generated `packages/api-client`

页面层无需再大规模重写。
