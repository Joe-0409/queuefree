# @queuefree/api-client

这个包当前只做 **占位**。

根据 PRD v1.2 和协作契约：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 这里**不能手写猜测型 DTO**
- 这里**不能手写猜测型请求 / 响应结构**

因此当前只保留：

1. package 位置
2. API path 常量
3. “等待 OpenAPI 生成”的占位说明

下一步正确顺序：

1. 后端先输出 OpenAPI
2. 用生成器生成 SDK 到这里
3. 前端再把 mock 数据替换为真实调用
