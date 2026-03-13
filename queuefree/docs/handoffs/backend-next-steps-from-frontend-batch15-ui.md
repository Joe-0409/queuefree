# 给后端的衔接说明（Batch 15 UI）

本批只做前端视觉与组件层增强。

## 没改的东西
- 没有新增 route
- 没有新增 env var
- 没有新增 request / response 字段
- 没有改 `packages/shared`
- 没有往 `packages/api-client` 塞手写 DTO / adapter

## 你们暂时不用配合的内容
- 不需要新增接口
- 不需要改 OpenAPI
- 不需要改 registry

## 下一步仍然建议
继续准备 write OpenAPI：
- orders
- payment-intents
- queue-guard check-in
- 其他 mutation

前端下一批会在不破坏本批视觉层的前提下接入写操作。
