# 给服务器线程的衔接说明（Frontend Batch 8）

本轮前端没有新增 env var，也没有修改任何域名或冻结路由。

你这边暂时只需要继续维持现有 registry baseline：

- web: `queuefree.com`
- admin: `admin.queuefree.com`
- api: `api.queuefree.com`
- assets: `assets.queuefree.com`

## 需要你关注的点

### 1. 不要抢先新增前端 env

本轮 adapter 切换位是代码结构准备，不需要新增：

- mobile env var
- web env var
- admin env var

### 2. 继续按现有对外路径准备发布

Web 公共路由仍固定为：

- `/privacy`
- `/terms`
- `/rules`
- `/delete-account`
- `/contact`

### 3. 等 backend OpenAPI 到位后，再协助补：

- OpenAPI 产物分发路径
- CI 中 generated SDK 的校验或构建顺序
- staging 环境联调顺序
