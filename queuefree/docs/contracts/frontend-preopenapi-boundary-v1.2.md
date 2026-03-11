# QueueFree Frontend Pre-OpenAPI Boundary v1.2

状态：Informational 
唯一规则源：`queuefree_prd_v1_2`

本文件不是 registry，也不是新的共享契约。

本文件只用于声明：**在 backend 还没有完成 registry + OpenAPI 之前，前端线程到底可以做什么，不能做什么。**

## 当前允许

- 做页面骨架
- 做 loading / error / empty / success feedback
- 做本地 mock 数据
- 做模块级别的 handoff 文档
- 做 `packages/api-client` 的空占位和生成说明
- 做前端目录、组件、布局、主题、格式化、导航

## 当前不允许

- 手写 REST path 常量
- 手写 request / response field
- 手写业务 DTO
- 在 `packages/api-client` 手写 SDK
- 在 `packages/shared` 混入 NestJS DTO
- 在页面文案里把猜测型 path 当成既成事实

## 正确顺序

1. backend 先更新 registry
2. backend 再导出 OpenAPI
3. 生成 `packages/api-client`
4. frontend 再切真实数据
