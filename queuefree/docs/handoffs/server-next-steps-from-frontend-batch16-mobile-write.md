# 给服务器的衔接说明（Batch 16 mobile write）

当前前端已接通 mobile 写链路：

- createOrder
- createPaymentIntent
- checkInQueueGuard

服务器侧请注意：

1. 不新增前端 env var
2. 不改现有公开域名和冻结路由
3. 确保移动端访问的 API base URL 在真机 / 模拟器环境可达
4. 确保 provider checkout URL 可被移动端外部浏览器正常打开

本批还没有 deep link 回跳要求，所以服务器现在不用新增 app 回跳配置。
