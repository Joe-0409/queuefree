# QueueFree 三线程协作使用说明（v1.2 受控版）

本目录用于把 QueueFree 的三个 GPT 对话框改造成“受控协作模式”。

## 一、这次和以前的区别

从现在开始，三个线程都不能先脑补后写代码。

必须同时遵守这 3 份真相源：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`

## 二、你先做这几步

### 第 1 步：把仓库文档路径准备好

在你的仓库根目录执行：

```bash
mkdir -p docs/contracts
mkdir -p docs/registry
```

然后把这两个文件放进去：

- `docs/contracts/queuefree-collaboration-contract-v1.2.md`
- `docs/registry/registry-baseline-v1.2.md`

如果你现在手里只有上传版文件，就先复制内容保存成上面两个路径。

### 第 2 步：把 PRD 保留为唯一业务真相源

保留 `queuefree_prd_v1_2` 原文，不要改文件名语义，不要再让任何线程使用旧版 PRD 或口头规则替代它。

### 第 3 步：把下面 3 个提示词分别贴到 3 个对话框

- `frontend-prompt-governed-v1.2.txt`
- `backend-prompt-governed-v1.2.txt`
- `server-prompt-governed-v1.2.txt`

## 三、以后怎么发需求

### 情况 A：这次需求不新增共享契约

例如：

- 只是补页面
- 只是补 controller/service
- 只是补 workflow
- 只是补测试
- 只是补样式

你就直接说：

```text
按既有 registry 和 contract 继续，不允许新增共享字段或状态。开始生成代码。
```

### 情况 B：这次需求会新增共享契约

例如要新增：

- 字段
- 状态
- 路由
- API path
- 事件名
- worker / queue / cron
- 环境变量

你就先说：

```text
先做登记，不要生成业务代码。请先输出 registry 变更提案和需要修改的 shared / OpenAPI / 文档文件。
```

等对话框先把登记稿给出来后，你再回：

```text
登记通过。现在基于最新 registry 继续生成代码。
```

## 四、三线程统一输出格式

以后每一轮都必须显式带这 4 段：

1. `Assumptions`
2. `Shared Contract Changes`
3. `Risks / Blockers`
4. `Files Changed`

没有变更也必须写“无”。

## 五、你要重点盯住的地方

### 1. Web 路由不能乱改

公开页固定为：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

不要再把 Web 联系页写回 `/support`。

### 2. Mobile 路由不能漂移

必须以 registry 中锁定的 mobile routes 为准。

### 3. packages/shared 不能塞 NestJS DTO

shared 只能放稳定 contract：

- enums
- constants
- schemas
- types
- formatters
- labels
- domain utils

### 4. 前端不能自己发明阈值

这些必须由后端 runtime config 返回：

- 保活时长
- 冻结宽限期
- 提现金额门槛
- 单笔上限
- 单日上限
- 时隙列表
- 活动封顶金额
- 广告开关
- FAQ / 规则文案
- 市场币种 / 时区 / 语言

## 六、建议你的实际工作顺序

1. 先让后端线程产出 `packages/shared` 基线 + OpenAPI 方向
2. 再让前端线程基于 shared/api-client 开工
3. 服务器线程独立完成环境变量、域名、部署矩阵，但不得私改业务契约
4. 一旦任何线程要新增共享项，先停下来做 registry 变更

## 七、最省事的使用方式

你可以直接把 `prompt-bundle-governed-v1.2.txt` 打开，然后把对应段落复制到对应对话框。
