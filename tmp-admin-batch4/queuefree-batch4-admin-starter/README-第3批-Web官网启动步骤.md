# QueueFree 第 3 批：Web 官网 / 合规页启动步骤（给小白）

这份说明对应：

- `apps/web` 官网与合规页骨架
- 固定公开路径：`/`、`/privacy`、`/terms`、`/rules`、`/rules/queue`、`/rules/wallet`、`/rules/activity/[slug]`、`/delete-account`、`/contact`

## 1. 你先做什么

先下载我给你的 **第 3 批压缩包**，解压到桌面。

建议文件夹名字保持不变，或者改成：

```text
queuefree
```

## 2. 你电脑里要先装好的软件

如果你前两批已经装过，这里不用重复装。

必须有：

- VS Code
- GitHub Desktop
- Git
- Node.js 22.22.1
- pnpm 10.32.x

如果没装，请去这些官方页面下载：

- VS Code 官方下载页
- GitHub Desktop 官方下载页
- Node.js 22.22.1 官方发布页
- pnpm 官方安装页

## 3. 怎么打开项目

打开 VS Code。

点：

```text
File -> Open Folder -> 选择 queuefree
```

然后点：

```text
Terminal -> New Terminal
```

## 4. 第一次安装依赖

在底部黑色窗口里输入：

```bash
pnpm install
```

这个命令会把整个 monorepo 需要的依赖都装好。

## 5. 启动官网

还是在项目根目录输入：

```bash
pnpm dev:web
```

启动成功后，浏览器打开：

```text
http://localhost:3000
```

你应该能看到：

- 首页
- 隐私政策页
- 服务条款页
- 规则中心页
- 队列规则页
- 钱包规则页
- 活动规则示例页
- 删除账号页
- 联系我们页

## 6. 你如果已经有上一批项目怎么办

最简单的办法：

1. 把第 3 批压缩包解压出来
2. 用第 3 批的整个文件夹替换掉你之前本地的旧文件夹
3. 再执行一次：

```bash
pnpm install
pnpm dev:web
```

## 7. 这一批你需要发给后端和服务器的文件

发这些：

- `docs/contracts/queuefree-collaboration-contract-v1.2.md`
- `docs/registry/registry-baseline-v1.2.md`
- `docs/contracts/web-public-route-map-v1.2.md`
- `docs/handoffs/backend-next-steps-from-web-batch3.md`
- `docs/handoffs/server-next-steps-from-web-batch3.md`
- `docs/handoffs/第3批-发给后端和服务器的话术.md`

## 8. 你现在不用担心的东西

这一批还没有做：

- 真正可提交的客服表单
- CMS 后台编辑规则文案
- SEO 细化
- 官网下载落地页
- Admin 后台页面骨架

这一批的目标很明确：

**先把 Web 官网和所有合规公开页面完整落盘。**
