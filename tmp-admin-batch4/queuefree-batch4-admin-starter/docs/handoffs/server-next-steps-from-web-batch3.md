# 给服务器线程：第 3 批 Web 官网完成后的衔接说明

## 1. 本轮没有新增冻结项

这轮没有新增：

- 域名
- 子域名
- Web 公开路径
- 环境变量

所以这轮 **不需要你改 registry**。

## 2. 你现在要确保的事情

请在服务器线程继续按锁定基线准备：

- `queuefree.com` -> `apps/web`
- `admin.queuefree.com` -> `apps/admin`（后续批次）
- `api.queuefree.com` -> `services/api`

并且确保以下公开页面在生产环境能直接访问：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

## 3. Vercel 侧建议

当你进入服务器线程后，请把 `apps/web` 作为独立 Vercel Project 管理。

需要确认：

- Root Directory：`apps/web`
- Node 版本与 PRD 基线一致
- 环境变量按 registry 中 web 分组录入
- 自定义域名绑定 `queuefree.com`
- SSL 自动开启

## 4. 这一批页面目前是什么状态

这一批是：

- 可运行的官网骨架
- 可展示的合规页骨架
- 可给审核看路径结构

还不是：

- 最终 SEO 完整站
- 最终 CRM / 表单集成版
- 最终法务审定文案版

## 5. 你后面需要配合的点

后续如果 Web 接入：

- 真实 contact 表单
- 真实规则 CMS
- 真实下载跳转
- 审核演示路径说明页

请继续沿用当前固定 URL，不要改路径。
