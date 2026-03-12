# Batch 6 File Contents

## `.gitignore`

```
node_modules
.pnpm-store
.turbo
.expo
dist
coverage
.DS_Store
*.log
.env
.env.local
apps/mobile/.expo
apps/mobile/dist

.next
apps/web/.next
```

## `.npmrc`

```
node-linker=hoisted
```

## `.nvmrc`

```
22.22.1
```

## `README-第2批-手机端启动步骤.md`

```
# QueueFree 第 2 批：手机端骨架（小白版）

这次你拿到的是 **可直接放进仓库的完整骨架**，重点是：

1. 补上 Monorepo 根文件
2. 补上 `packages/shared`
3. 预留 `packages/ui-tokens`
4. 预留 `packages/api-client` 占位
5. 直接给你 `apps/mobile` 可复制骨架
6. 继续沿用第 1 批的协作契约和命名注册表

---

## 一、这批和上一批的区别

上一批更偏“规则地基”。

这一批把真正的**代码目录和手机端页面骨架**补出来了：

- 欢迎页
- 手机号登录页
- OTP 页
- 首页
- 商品详情页
- 订单确认页
- 支付成功 / 入队成功页
- 队列页
- 队列详情页
- 任务页
- 邀请页
- 钱包页
- 提现页
- 我的页
- 规则中心
- 隐私 / 条款 / 客服 / 删除账号页

---

## 二、先下载哪些软件

下面都用**官方地址**下载：

1. VS Code  
   下载页：`https://code.visualstudio.com/download`

2. GitHub Desktop  
   下载页：`https://desktop.github.com/download/`

3. Git  
   下载页：`https://git-scm.com/install/`

4. Node.js 22.22.1  
   下载页：`https://nodejs.org/en/blog/release/v22.22.1`

5. pnpm 安装说明  
   官方文档：`https://pnpm.io/installation`

6. Docker Desktop  
   下载页：`https://www.docker.com/products/docker-desktop/`

7. Expo 环境准备  
   官方文档：`https://docs.expo.dev/get-started/set-up-your-environment/`

8. Expo 创建项目 / 环境说明  
   官方文档：`https://docs.expo.dev/get-started/create-a-project/`

---

## 三、最推荐的电脑

最稳：**Mac**

因为这个项目最终要做：

- iPhone 预览
- iOS 打包
- App Store 提交

这些最后都要回到 Mac。

如果你现在只有 Windows，也能先做：

- Web
- Admin
- 后端
- Worker
- 数据库联调
- 安卓调试

---

## 四、你要怎么把这批代码放进电脑

### 第 1 步：创建文件夹

在桌面创建一个文件夹：

```text
queuefree
```

### 第 2 步：把这次压缩包解压进去

解压后，你应该看到类似目录：

```text
queuefree/
  apps/
  packages/
  docs/
  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.base.json
  .nvmrc
  .npmrc
  .gitignore
  README-第2批-手机端启动步骤.md
```

### 第 3 步：打开 VS Code

操作顺序：

1. 打开 VS Code
2. 左上角点：`File`
3. 点：`Open Folder`
4. 选择你的 `queuefree` 文件夹
5. 点确认

### 第 4 步：打开终端

在 VS Code 顶部点：

```text
Terminal -> New Terminal
```

底部会出现一个黑色窗口。

### 第 5 步：先检查 Node

在黑色窗口输入：

```bash
node -v
```

如果你看到 `v22.22.x` 附近的版本，说明 Node 正常。

### 第 6 步：安装 pnpm（如果还没装）

输入：

```bash
npm install -g pnpm@10.32.0
```

然后输入：

```bash
pnpm -v
```

### 第 7 步：安装所有依赖

在项目根目录输入：

```bash
pnpm install
```

第一次安装会比较久，这是正常的。

### 第 8 步：启动手机端

输入：

```bash
pnpm dev:mobile
```

启动后终端里会出现二维码和一些选项。

### 第 9 步：手机预览

你有 3 种方式：

#### 方式 A：真机最简单

1. 手机安装 **Expo Go**
2. 手机和电脑连同一个 Wi‑Fi
3. 用 Expo Go 扫终端里的二维码

#### 方式 B：安卓模拟器

1. 安装 Android Studio
2. 打开 Android Studio
3. 先创建一个模拟器
4. 再回 VS Code 终端输入：

```bash
pnpm android
```

#### 方式 C：iPhone 模拟器（Mac）

1. 先装 Xcode
2. 打开 iOS Simulator
3. 回终端输入：

```bash
pnpm ios
```

---

## 五、如果启动失败，你先看这 6 个地方

### 1）是不是没在项目根目录

你要确认终端当前目录就是：

```text
queuefree
```

### 2）是不是 Node 版本装错

必须优先按这个项目的基线走：

- Node 22.22.x
- pnpm 10.32.x

### 3）是不是没先装 pnpm

如果 `pnpm` 报找不到命令，重新执行：

```bash
npm install -g pnpm@10.32.0
```

### 4）是不是网络导致依赖没装完整

重新执行：

```bash
pnpm install
```

### 5）是不是手机没和电脑同一个 Wi‑Fi

真机扫不到二维码，最常见就是这个问题。

### 6）是不是 Android Studio / Xcode 还没装

如果你想用模拟器，必须先把模拟器软件装好。

---

## 六、你这次需要发给后端和服务器什么

把下面 3 个文件直接发过去：

1. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
2. `docs/registry/registry-baseline-v1.2.md`
3. `docs/contracts/mobile-screen-api-map-v1.2.md`

再补一句：

> 这是前端第 2 批手机端骨架。当前没有手写猜测型 DTO，`packages/api-client` 仍是占位，等后端按 PRD 导出 OpenAPI 后再生成 SDK。请以后端 OpenAPI 为准，把实际请求/响应补进 `packages/api-client`，再由前端替换 mock 数据。

---

## 七、这批代码现在能做什么

现在这批更像：

- 可运行的手机端页面骨架
- 已锁定路由
- 已锁定共享常量 / 枚举 / 运行时默认值
- 已内置演示数据
- 已预留 Query / Zustand / react-hook-form / zod

也就是说：

- 你现在可以先把页面跑起来
- 后端可以按屏幕 -> API 映射开始做 OpenAPI
- 服务器可以按 Monorepo / 环境变量 / Expo / API / Worker 继续接

---

## 八、这批代码现在还没做什么

为了不违反 PRD，这次**没有**做下面这些事：

1. 没有手写猜测型 OpenAPI SDK
2. 没有猜测后端 DTO 字段
3. 没有把运营阈值写死进业务逻辑
4. 没有乱加多语言 / 多市场
5. 没有接入真实支付
6. 没有接入真实短信
7. 没有接入真实数据库
8. 没有接入真实登录态持久化

这些要等后端和服务器继续接上。

---

## 九、下一批我建议你继续生成什么

你下一次直接让我继续时，建议顺序是：

1. `apps/web` 官网合规页骨架
2. `apps/admin` 后台壳子骨架
3. `services/api` NestJS 基础骨架
4. `services/worker` Worker 基础骨架
5. OpenAPI 导出与 `packages/api-client` 真生成

这样三条线程最不容易打架。

---

## 十、上一批文档

下面这份是上一批的小白说明，我一起保留了，方便你回看：

# QueueFree 第一批可复制文件（小白版）

这是第一批“先锁规则、再开工”的文件。

这批文件的目标不是把整个项目一次做完，而是先把 **前端 / 后端 / 服务器** 三条线最容易冲突的地方锁死：

1. 统一规则源：`queuefree_prd_v1_2`
2. 统一协作协议：`docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. 统一共享常量 / 枚举 / 路由 / 运行时配置：`packages/shared`
4. 统一命名注册表：`docs/registry/registry-baseline-v1.2.md`

---

## 你先做什么

### 第 1 步：先安装这些软件

先只装下面这些“必须软件”：

1. **Google Chrome** 或你平时用的浏览器
2. **VS Code**（写代码的软件）
3. **GitHub Desktop**（图形化管理代码，不容易出错）
4. **Node.js 22.22.1 LTS**（按 PRD 锁定基线）
5. **pnpm 10.32.0**（项目依赖安装工具）
6. **Docker Desktop**（本地数据库和 Redis 要靠它）

如果你要看手机页面，再加：

7. **Expo Go**（手机 App，用手机扫码看效果）
8. **Android Studio**（安卓模拟器）

如果你要最终打 iPhone 包：

9. **Xcode**（只能在 Mac 上安装）

---

## 推荐电脑选择

### 最稳妥方案

**直接用 MacBook。**

原因：

- QueueFree 的官方一线开发基线就是 macOS
- iPhone 打包和提审最终离不开 Xcode
- Android、Web、后端、数据库、本地联调也都能在 Mac 上完成

### 如果你现在只有 Windows

也能先做下面这些：

- Web 官网
- Admin 后台
- 后端 API
- Worker
- 数据库联调
- 安卓调试

但是：

- **iPhone 真机打包和 App Store 提交最后还是需要 Mac**

---

## 第 2 步：建立项目文件夹

在桌面手工创建一个文件夹，名字写：

`queuefree`

然后把这个压缩包里的文件放进去。

建议最后目录长这样：

```text
queuefree/
  README-给小白的开始步骤.md
  package.json
  pnpm-workspace.yaml
  turbo.json
  tsconfig.base.json
  .nvmrc
  .gitignore
  docs/
  packages/
```

---

## 第 3 步：第一次打开项目

1. 打开 **VS Code**
2. 左上角点：**File / Open Folder**
3. 选中你的 `queuefree` 文件夹
4. 打开后，如果看到左边有文件树，就说明成功了

---

## 第 4 步：第一次安装依赖

打开 VS Code 后：

1. 顶部菜单点 **Terminal / New Terminal**
2. 在最下面弹出的黑色窗口里，逐条输入下面命令

```bash
node -v
pnpm -v
pnpm install
```

如果前两条命令能看到版本号，说明 Node 和 pnpm 安装成功。

如果 `pnpm install` 成功结束，说明这批基础文件已经能被项目识别。

---

## 第 5 步：你现在把什么发给后端和服务器

你把下面两个文件直接发给后端对话框和服务器对话框：

1. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
2. `docs/registry/registry-baseline-v1.2.md`

再补一句：

> 从现在开始，QueueFree 统一以 queuefree_prd_v1_2 为唯一规则源；共享枚举、固定硬规则、公共路由、环境与域名注册、事件与 worker 命名，先按 packages/shared 与 docs/registry 执行；如需新增字段或状态，必须先登记再生成代码。

---

## 第 6 步：这批文件的意义

这批文件不是 UI 页面。

这批是 **“地基文件”**：

- 前端后面写页面时，不会乱写路由和状态
- 后端后面写 API 时，不会乱发明字段和状态
- 服务器后面写环境变量和域名时，不会乱改地址
- 三个线程都先围着同一个 shared contract 工作

---

## 下一批建议生成顺序

按最稳顺序，下一批我建议你继续让我生成：

1. `apps/mobile` 基础骨架
2. `apps/web` 官网合规页骨架
3. `apps/admin` 后台壳子骨架
4. `services/api` NestJS 骨架
5. `services/worker` Worker 骨架

不要一开始就乱跳到很细的业务页面，不然三个线程会再次漂移。
```

## `README-第3批-Web官网启动步骤.md`

```
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
```

## `README-第4批-Admin后台启动步骤.md`

```
# QueueFree 第4批：Admin 后台骨架启动步骤

这批内容是 `apps/admin` 的第一批骨架。

特点：

- 只使用已经冻结的 Admin 路由
- 不新增 route
- 不新增 env var
- 不接真实鉴权
- 不接真实 API
- 所有页面都明确标注为 **Admin Skeleton**
- 目标是：**先能跑、能看路径、能给后端和服务器对齐**

---

## 1. 先准备软件

如果你前面几批已经装过，这一步可以跳过。

你需要：

1. Node.js `22.22.1`
2. pnpm `10.32.0`
3. VS Code

---

## 2. 打开项目

把压缩包解压后，用 VS Code 打开整个 `queuefree` 文件夹。

---

## 3. 安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

---

## 4. 启动 Admin 后台

继续输入：

```bash
pnpm dev:admin
```

---

## 5. 打开浏览器

访问：

```text
http://localhost:3001
```

登录页地址：

```text
http://localhost:3001/login
```

Dashboard 地址：

```text
http://localhost:3001
```

---

## 6. 本轮页面范围

已落地的冻结路由：

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

---

## 7. 当前这批不能做什么

这批 **不能**：

- 真实登录
- 真实权限控制
- 真实 API 请求
- 真实数据库
- 真实审核动作
- 真实提现审批
- 真实风控决策

这些动作都要等后端线程先登记 contract，再通过 OpenAPI 生成 `packages/api-client` 后接入。

---

## 8. 发给后端与服务器

请把下面文件发给另外两个对话框：

- `docs/contracts/admin-route-module-map-v1.2.md`
- `docs/handoffs/backend-next-steps-from-admin-batch4.md`
- `docs/handoffs/server-next-steps-from-admin-batch4.md`
- `docs/handoffs/第4批-发给后端和服务器的话术.md`
```

## `README-第5批-Registry-First前端清理与接线准备.md`

```
# QueueFree 第 5 批：Registry-First 前端清理与接线准备

这批不是新增业务页面。

这批的目标只有两个：

1. 把前面前端骨架里不够严格的地方清理掉，重新对齐 **PRD v1.2 + 协作契约 + registry baseline**
2. 把后续 `packages/api-client` 的真正接线顺序锁回到：**registry -> OpenAPI -> generated sdk -> frontend consume**

---

## 这批修正了什么

- 删除了 `packages/api-client` 里的手写 API path 占位文件
- 把 `packages/api-client` 改回 **pre-OpenAPI placeholder**
- 把 Mobile 里的未登记环境变量清理掉，只保留 registry 已登记变量
- 把前端页面和 handoff 文档里出现的“猜测型 API path”提示语改成 **模块级说明**
- 新增一个本地校验脚本：`pnpm verify:registry-first-frontend`

---

## 你现在怎么用

### 1）打开项目

用 VS Code 打开整个项目文件夹。

### 2）安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

### 3）先跑这条检查

```bash
pnpm verify:registry-first-frontend
```

如果通过，你会看到：

```text
Registry-first frontend verification passed.
```

### 4）再启动你要看的前端

手机端：

```bash
pnpm dev:mobile
```

官网：

```bash
pnpm dev:web
```

后台：

```bash
pnpm dev:admin
```

### 5）这批最重要的协作顺序

从现在开始，前端这边默认遵守下面顺序：

1. 后端先补 registry
2. 后端再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再删 mock、接真实 SDK

前端不要反过来先猜接口。
```

## `README-第6批-前端质量门禁与Registry对齐.md`

```
# QueueFree 第 6 批：前端质量门禁与 Registry 对齐

这一批不是继续新增页面，而是先把前端仓库的边界锁死，避免：

- 未登记路由直接写进页面
- 未登记 public env 直接写进 app
- 没有 OpenAPI 时重新手写业务 API path
- `packages/shared` 混入 NestJS / Prisma 运行时代码

## 你现在要做什么

在项目根目录打开终端，执行：

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:web
```

如果要看后台：

```bash
pnpm dev:admin
```

如果要看手机端：

```bash
pnpm dev:mobile
```

## 这批新增了什么

- `pnpm verify:registry-first-frontend`
- `pnpm verify:route-registry`
- `pnpm verify:frontend-import-boundaries`
- `pnpm verify:frontend-guardrails`
- 前端路由审计文档
- 前端质量门禁说明文档
- 发给后端 / 服务器的话术

## 这批没有新增什么

- 没有新增 route
- 没有新增 env var
- 没有新增 enum / state / API field
- 没有新增 shared contract
- 没有新增手写 sdk
```

## `apps/admin/.env.example`

```
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_ADMIN_BASE_URL=http://localhost:3001
NEXT_PUBLIC_SENTRY_DSN=
```

## `apps/admin/app/(console)/audit/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Audit'
};

export default function AuditPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('audit')} />;
}
```

## `apps/admin/app/(console)/campaigns/[campaignId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Campaign detail'
};

export default function CampaignDetailPage({ params }: { params: { campaignId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('campaign', params.campaignId)} />;
}
```

## `apps/admin/app/(console)/campaigns/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Campaigns'
};

export default function CampaignsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('campaigns')} />;
}
```

## `apps/admin/app/(console)/error.tsx`

```
'use client';

import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleError({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card className="border-danger/20 bg-danger-soft">
          <CardContent className="space-y-4 p-6">
            <div className="text-lg font-semibold text-slate-950">Console route error</div>
            <p className="text-sm text-slate-700">
              The current admin module failed to render. Retry the route. If real data is already wired in the future, verify registry updates and generated SDK output before debugging UI code.
            </p>
            <Button onClick={reset}>Retry</Button>
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}
```

## `apps/admin/app/(console)/governance/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Governance'
};

export default function GovernancePage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('governance')} />;
}
```

## `apps/admin/app/(console)/invites/[relationId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Invite detail'
};

export default function InviteDetailPage({ params }: { params: { relationId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('invite', params.relationId)} />;
}
```

## `apps/admin/app/(console)/invites/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Invites'
};

export default function InvitesPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('invites')} />;
}
```

## `apps/admin/app/(console)/layout.tsx`

```
import { AdminShell } from '@/components/admin-shell';

export default function ConsoleLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return <AdminShell>{children}</AdminShell>;
}
```

## `apps/admin/app/(console)/loading.tsx`

```
import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleLoading(): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card>
          <CardContent className="space-y-3 p-6">
            <div className="text-sm font-semibold text-slate-950">Loading console module</div>
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}
```

## `apps/admin/app/(console)/orders/[orderId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Order detail'
};

export default function OrderDetailPage({ params }: { params: { orderId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('order', params.orderId)} />;
}
```

## `apps/admin/app/(console)/orders/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Orders'
};

export default function OrdersPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('orders')} />;
}
```

## `apps/admin/app/(console)/page.tsx`

```
import { formatDateTime, LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_TIMEZONE } from '@queuefree/shared';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable
} from '@/lib/admin-content';

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');

export default function DashboardPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow="Dashboard"
          title="QueueFree admin overview"
          description="Core KPI blocks for operations, queue health, funds, risk backlog, and governance follow-up."
          meta={[
            `Market: ${LAUNCH_MARKET}`,
            `Timezone: ${LAUNCH_TIMEZONE}`,
            `Rule version: ${LAUNCH_RULE_VERSION}`,
            `Snapshot: ${generatedAt}`
          ]}
        />

        <AdminSkeletonBanner />

        <section className="grid gap-4 lg:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr,0.95fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Queue and slot attention"
                description="Operational snapshot aligned to fixed settlement slots and queue protection rules."
              />
              <DataTable columns={dashboardQueueTable.columns} rows={dashboardQueueTable.rows} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Funds and approvals"
                description="Withdrawal review and pending release items remain mock-only in this batch."
              />
              <DataTable columns={dashboardWalletTable.columns} rows={dashboardWalletTable.rows} />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Backlog focus"
                description="These rows indicate what real Admin APIs should prioritize once contracts are registered."
              />
              <DataTable columns={dashboardBacklogTable.columns} rows={dashboardBacklogTable.rows} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title="Guardrails for this batch" description="What stays intentionally out of scope in batch 4." />
              <ul className="space-y-3 text-sm text-slate-600">
                {dashboardRiskNotes.map((note) => (
                  <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/admin/app/(console)/products/[productId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Product detail'
};

export default function ProductDetailPage({ params }: { params: { productId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('product', params.productId)} />;
}
```

## `apps/admin/app/(console)/products/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Products'
};

export default function ProductsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('products')} />;
}
```

## `apps/admin/app/(console)/queues/[entryId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Queue detail'
};

export default function QueueDetailPage({ params }: { params: { entryId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('queue', params.entryId)} />;
}
```

## `apps/admin/app/(console)/queues/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Queues'
};

export default function QueuesPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('queues')} />;
}
```

## `apps/admin/app/(console)/risk/[caseId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Risk case detail'
};

export default function RiskDetailPage({ params }: { params: { caseId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('risk', params.caseId)} />;
}
```

## `apps/admin/app/(console)/risk/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Risk'
};

export default function RiskPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('risk')} />;
}
```

## `apps/admin/app/(console)/slots/[slotId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Slot detail'
};

export default function SlotDetailPage({ params }: { params: { slotId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('slot', params.slotId)} />;
}
```

## `apps/admin/app/(console)/slots/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Slots'
};

export default function SlotsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('slots')} />;
}
```

## `apps/admin/app/(console)/tasks/[taskId]/page.tsx`

```
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Task detail'
};

export default function TaskDetailPage({ params }: { params: { taskId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('task', params.taskId)} />;
}
```

## `apps/admin/app/(console)/tasks/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Tasks'
};

export default function TasksPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('tasks')} />;
}
```

## `apps/admin/app/(console)/wallet/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Wallet'
};

export default function WalletPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('wallet')} />;
}
```

## `apps/admin/app/(console)/withdrawals/page.tsx`

```
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Withdrawals'
};

export default function WithdrawalsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('withdrawals')} />;
}
```

## `apps/admin/app/error.tsx`

```
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Admin page error</div>
          <p className="text-sm text-slate-700">
            This admin route failed to render. Retry the page. If it still fails after real Admin SDK integration, check the generated client and registry updates first.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

## `apps/admin/app/globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 248 250 252;
  --foreground: 15 23 42;
  --muted: 100 116 139;
  --border: 226 232 240;
  --panel: 255 255 255;
  --panel-muted: 241 245 249;
  --sidebar: 15 23 42;
  --sidebar-foreground: 226 232 240;
  --brand: 37 99 235;
  --brand-soft: 219 234 254;
  --accent: 15 118 110;
  --accent-soft: 204 251 241;
  --warning: 180 83 9;
  --warning-soft: 254 243 199;
  --danger: 185 28 28;
  --danger-soft: 254 226 226;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.06), transparent 28%),
    radial-gradient(circle at bottom left, rgba(15, 118, 110, 0.05), transparent 24%),
    rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

p {
  line-height: 1.7;
}

button,
input {
  font: inherit;
}

::selection {
  background: rgba(37, 99, 235, 0.18);
}
```

## `apps/admin/app/layout.tsx`

```
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { adminAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(adminAppEnv.adminBaseUrl),
  title: {
    default: 'QueueFree Admin',
    template: '%s | QueueFree Admin'
  },
  description: 'QueueFree admin skeleton for operations, finance, risk, governance, and audit modules.'
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

## `apps/admin/app/loading.tsx`

```
import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading admin page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  );
}
```

## `apps/admin/app/login/page.tsx`

```
import Link from 'next/link';
import { LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_WEBSITE } from '@queuefree/shared';
import { webTheme } from '@queuefree/ui-tokens';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { PageShell } from '@/components/page-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Login'
};

export default function LoginPage(): React.ReactElement {
  return (
    <PageShell width="narrow">
      <div className="space-y-6" style={{ maxWidth: `calc(${webTheme.maxWidth.content} - 34rem)` }}>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">QueueFree Admin</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Admin login skeleton</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            This page is intentionally non-functional in batch 4. It exists to lock the route, screen layout, and compliance copy before
            real authentication is registered and wired.
          </p>
        </div>

        <AdminSkeletonBanner />

        <Card>
          <CardHeader>
            <CardTitle>Sign-in placeholder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Admin email or phone" placeholder="ops@queuefree.example" />
            <Input label="Password / OTP placeholder" placeholder="Not connected in this batch" />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/">Enter skeleton dashboard</ButtonLink>
              <ButtonLink href={`https://${LAUNCH_WEBSITE}/terms`} variant="secondary">
                View public terms
              </ButtonLink>
            </div>
            <p className="text-xs text-slate-500">
              Launch market is locked to {LAUNCH_MARKET}. Rule version is {LAUNCH_RULE_VERSION}. Real auth and RBAC must follow registry-first
              registration before API wiring.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why this page stays minimal for now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>No real session, password, OTP, or SSO contract has been registered for Admin in this batch.</p>
            <p>Frontend will not invent authentication fields or response shapes outside `packages/api-client`.</p>
            <p>
              Public compliance pages stay on the main website. Open{' '}
              <Link className="font-semibold text-brand" href={`https://${LAUNCH_WEBSITE}/privacy`}>
                queuefree.com/privacy
              </Link>{' '}
              for the public privacy policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
```

## `apps/admin/app/not-found.tsx`

```
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage(): React.ReactElement {
  return (
    <PageShell width="narrow">
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            This Admin skeleton only exposes the frozen routes defined in PRD v1.2 and the registry baseline.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Back to dashboard</ButtonLink>
            <ButtonLink href="/login" variant="secondary">
              Open login
            </ButtonLink>
          </div>
          <p className="text-xs text-slate-500">
            Missing paths should be added only after registry-first registration.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}
```

## `apps/admin/next-env.d.ts`

```
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file should not be edited manually.
```

## `apps/admin/next.config.mjs`

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@queuefree/shared', '@queuefree/ui-tokens']
};

export default nextConfig;
```

## `apps/admin/package.json`

```
{
  "name": "@queuefree/admin",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@queuefree/shared": "workspace:*",
    "@queuefree/ui-tokens": "workspace:*",
    "clsx": "^2.1.1",
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/node": "^22.15.21",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}
```

## `apps/admin/postcss.config.mjs`

```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

## `apps/admin/src/components/admin-page-header.tsx`

```
import * as React from 'react';

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  meta = []
}: AdminPageHeaderProps): React.ReactElement {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">{eyebrow}</div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-600">{description}</p>
      </div>
      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {meta.map((item) => (
            <span key={item} className="rounded-full border border-border bg-panel px-3 py-2 text-xs font-semibold text-slate-600">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
```

## `apps/admin/src/components/admin-shell.tsx`

```
import { webTheme } from '@queuefree/ui-tokens';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminTopbar } from '@/components/admin-topbar';

export function AdminShell({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full" style={{ maxWidth: `calc(${webTheme.maxWidth.content} + 30rem)` }}>
        <AdminSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}
```

## `apps/admin/src/components/admin-sidebar.tsx`

```
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNavigation, getActiveNavItem, isNavItemActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function AdminSidebar(): React.ReactElement {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);

  return (
    <aside className="hidden w-80 shrink-0 border-r border-slate-800 bg-sidebar text-sidebar-foreground lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-slate-800 px-6 py-6">
          <Link href="/" className="block">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">QueueFree</div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-white">Admin Skeleton</div>
          </Link>
          <p className="mt-3 text-sm text-slate-400">
            Frozen-route first shell for operations, finance, risk, governance, and audit.
          </p>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {adminNavigation.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="px-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{group.title}</div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isNavItemActive(item.href, pathname);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block rounded-2xl border px-4 py-3 transition-colors',
                        active
                          ? 'border-slate-600 bg-slate-800 text-white'
                          : 'border-transparent bg-transparent text-slate-300 hover:border-slate-800 hover:bg-slate-900'
                      )}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-400">{item.description}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-6 py-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Current view</div>
            <div className="mt-2 text-sm font-semibold text-white">{activeItem?.label ?? 'Unregistered route'}</div>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              This shell intentionally avoids real auth, RBAC, or API data until registry-first contracts are added.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
```

## `apps/admin/src/components/admin-skeleton-banner.tsx`

```
import { Card, CardContent } from '@/components/ui/card';

export function AdminSkeletonBanner(): React.ReactElement {
  return (
    <Card className="border-brand/20 bg-brand-soft">
      <CardContent className="space-y-2 p-5">
        <div className="text-sm font-semibold text-slate-950">Admin Skeleton</div>
        <p className="text-sm text-slate-700">
          This batch is route-safe and registry-safe. Data, actions, and permissions are placeholders only. No real authentication, no real API,
          and no unregistered contract has been added here.
        </p>
      </CardContent>
    </Card>
  );
}
```

## `apps/admin/src/components/admin-topbar.tsx`

```
'use client';

import { LAUNCH_MARKET, LAUNCH_RULE_VERSION } from '@queuefree/shared';
import { usePathname } from 'next/navigation';
import { getActiveNavItem } from '@/lib/navigation';

export function AdminTopbar(): React.ReactElement {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">QueueFree Admin</div>
          <div className="mt-1 text-lg font-bold tracking-tight text-slate-950">{activeItem?.label ?? 'Admin Skeleton'}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">Env: {appEnv}</span>
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">Market: {LAUNCH_MARKET}</span>
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">
            Rule: {LAUNCH_RULE_VERSION}
          </span>
        </div>
      </div>
    </header>
  );
}
```

## `apps/admin/src/components/metric-card.tsx`

```
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  tone?: BadgeTone;
};

export function MetricCard({ title, value, description, tone = 'slate' }: MetricCardProps): React.ReactElement {
  return (
    <Card className={cn(tone === 'brand' && 'border-brand/20', tone === 'warning' && 'border-warning/20', tone === 'danger' && 'border-danger/20')}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-700">{title}</div>
          <Badge tone={tone}>{title}</Badge>
        </div>
        <div className="text-3xl font-bold tracking-tight text-slate-950">{value}</div>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}
```

## `apps/admin/src/components/module-detail-page.tsx`

```
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { DetailPageConfig } from '@/lib/admin-content';

export function ModuleDetailPage({ config }: { config: DetailPageConfig }): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.description}
          meta={config.meta}
        />

        <AdminSkeletonBanner />

        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={config.badgeTone}>{config.badgeLabel}</Badge>
          <ButtonLink href={config.backHref} variant="secondary">
            Back to list
          </ButtonLink>
        </div>

        {config.metrics.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-4">
            {config.metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            {config.sections.map((section) => (
              <Card key={section.title}>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title={section.title} description={section.description} />
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {section.rows.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{row.label}</dt>
                        <dd className="mt-2 text-sm font-medium text-slate-900">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Action placeholders" description="Buttons stay informational until action contracts are registered." />
                <div className="space-y-3">
                  {config.actions.map((action) => (
                    <div key={action} className="rounded-2xl border border-border bg-panel-muted px-4 py-3 text-sm text-slate-700">
                      {action}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Route and module alignment" description="This detail page stays within the frozen route scope." />
                <ul className="space-y-3 text-sm text-slate-600">
                  {config.notes.map((note) => (
                    <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Related navigation" description="Use frozen routes only." />
                <div className="flex flex-wrap gap-2">
                  {config.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/admin/src/components/module-list-page.tsx`

```
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { DataTable, type DataTableConfig } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import type { ListPageConfig } from '@/lib/admin-content';

export function ModuleListPage({ config }: { config: ListPageConfig }): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.description}
          meta={config.meta}
        />

        <AdminSkeletonBanner />

        {config.metrics.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-4">
            {config.metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title={config.tableTitle} description={config.tableDescription} />
              <DataTable columns={config.table.columns} rows={config.table.rows} emptyMessage={config.table.emptyMessage} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title="Current skeleton notes" description="These notes explain why the screen is intentionally static in batch 4." />
              <ul className="space-y-3 text-sm text-slate-600">
                {config.notes.map((note) => (
                  <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {config.secondaryTable ? (
          <section>
            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title={config.secondaryTable.title} description={config.secondaryTable.description} />
                <DataTable
                  columns={config.secondaryTable.columns}
                  rows={config.secondaryTable.rows}
                  emptyMessage={config.secondaryTable.emptyMessage}
                />
              </CardContent>
            </Card>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}
```

## `apps/admin/src/components/page-shell.tsx`

```
import * as React from 'react';
import { cn } from '@/lib/utils';

type PageShellProps = {
  children: React.ReactNode;
  width?: 'default' | 'narrow';
};

export function PageShell({ children, width = 'default' }: PageShellProps): React.ReactElement {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-8 sm:px-6 lg:px-8',
        width === 'default' ? 'max-w-[96rem]' : 'max-w-3xl'
      )}
    >
      {children}
    </div>
  );
}
```

## `apps/admin/src/components/section-title.tsx`

```
type SectionTitleProps = {
  title: string;
  description: string;
};

export function SectionTitle({ title, description }: SectionTitleProps): React.ReactElement {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}
```

## `apps/admin/src/components/ui/badge.tsx`

```
import * as React from 'react';
import { cn } from '@/lib/utils';

const tones = {
  slate: 'border-border bg-white text-slate-700',
  brand: 'border-brand/20 bg-brand-soft text-blue-900',
  accent: 'border-accent/20 bg-accent-soft text-teal-900',
  warning: 'border-warning/20 bg-warning-soft text-amber-900',
  danger: 'border-danger/20 bg-danger-soft text-red-900'
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({
  children,
  tone = 'slate',
  className
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}): React.ReactElement {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}
```

## `apps/admin/src/components/ui/button.tsx`

```
import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'border-transparent bg-brand text-white hover:bg-blue-700',
  secondary: 'border-border bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
} as const;

type ButtonVariant = keyof typeof styles;

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children
}: BaseProps & { href: string }): React.ReactElement {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors',
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  type = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

## `apps/admin/src/components/ui/card.tsx`

```
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn('rounded-[1.5rem] border border-border bg-panel shadow-panel', className)} {...props} />;
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn('border-b border-border px-6 py-5', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement {
  return <h2 className={cn('text-lg font-bold tracking-tight text-slate-950', className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn('px-6 py-5', className)} {...props} />;
}
```

## `apps/admin/src/components/ui/data-table.tsx`

```
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type TableCellValue =
  | string
  | number
  | {
      label: string;
      tone?: BadgeTone;
    };

export type DataTableColumn = {
  key: string;
  label: string;
  align?: 'left' | 'right';
};

export type DataTableRow = Record<string, TableCellValue>;

export type DataTableConfig = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  emptyMessage?: string;
};

function renderCell(value: TableCellValue): React.ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return <Badge tone={value.tone}>{value.label}</Badge>;
}

export function DataTable({
  columns,
  rows,
  emptyMessage = 'No placeholder rows were configured for this skeleton view.'
}: DataTableConfig): React.ReactElement {
  if (rows.length === 0) {
    return <div className="rounded-2xl border border-dashed border-border px-4 py-8 text-sm text-slate-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="min-w-full border-collapse">
        <thead className="bg-panel-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500',
                  column.align === 'right' && 'text-right'
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-border">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-4 py-4 text-sm text-slate-700',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {renderCell(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## `apps/admin/src/components/ui/input.tsx`

```
type InputProps = {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

export function Input({ label, placeholder, type = 'text' }: InputProps): React.ReactElement {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand"
      />
    </label>
  );
}
```

## `apps/admin/src/lib/admin-content.ts`

```
import {
  ACCOUNT_DELETE_STATUSES,
  ADMIN_ROLES,
  INVITE_MAX_DEPTH,
  INVITE_RELATION_STATUSES,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  ORDER_STATUSES,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_ENTRY_STATUSES,
  QUEUE_TOP_PROTECTED_COUNT,
  SETTLEMENT_SLOT_STATUSES,
  USER_QUEUE_GUARD_STATUSES,
  WALLET_ACTIVATION_METHODS,
  WITHDRAWAL_STATUSES,
  formatDateTime,
  formatMinorMoney
} from '@queuefree/shared';
import type { BadgeTone } from '@/components/ui/badge';
import type { DataTableConfig } from '@/components/ui/data-table';

export type Metric = {
  title: string;
  value: string;
  description: string;
  tone?: BadgeTone;
};

export type ListPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  metrics: Metric[];
  tableTitle: string;
  tableDescription: string;
  table: DataTableConfig;
  secondaryTable?: DataTableConfig & {
    title: string;
    description: string;
  };
  notes: string[];
};

export type DetailSection = {
  title: string;
  description: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
};

export type DetailPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  badgeLabel: string;
  badgeTone: BadgeTone;
  backHref: string;
  metrics: Metric[];
  sections: DetailSection[];
  actions: string[];
  notes: string[];
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');
const nextSlotAt = formatDateTime('2026-03-11T12:00:00.000Z');
const lastDeliveryAt = formatDateTime('2026-03-10T06:15:00.000Z');

function statusTone(value: string): BadgeTone {
  if (value.includes('FAILED') || value.includes('REJECTED') || value.includes('REMOVED') || value.includes('INVALID')) {
    return 'danger';
  }

  if (value.includes('FROZEN') || value.includes('RISK') || value.includes('PENDING') || value.includes('GRACE')) {
    return 'warning';
  }

  if (value.includes('SUCCESS') || value.includes('SUCCEEDED') || value.includes('ACTIVE') || value.includes('EFFECTIVE')) {
    return 'accent';
  }

  return 'brand';
}

export const dashboardMetrics: Metric[] = [
  {
    title: 'Active queue entries',
    value: '1,284',
    description: `Includes only ${QUEUE_ENTRY_STATUSES[1]} entries eligible for slot settlement.`,
    tone: 'accent'
  },
  {
    title: 'Pending release',
    value: formatMinorMoney(486500),
    description: 'Won orders remain in pending balance until delivery plus observation period.',
    tone: 'warning'
  },
  {
    title: 'Withdrawals in review',
    value: '27',
    description: `Pipeline spans ${WITHDRAWAL_STATUSES[1]} and ${WITHDRAWAL_STATUSES[2]} only.`,
    tone: 'brand'
  },
  {
    title: 'Open risk backlog',
    value: '14',
    description: 'Orders, invites, and withdrawals awaiting manual decision.',
    tone: 'danger'
  }
];

export const dashboardQueueTable: DataTableConfig = {
  columns: [
    { key: 'module', label: 'Module' },
    { key: 'snapshot', label: 'Snapshot' },
    { key: 'note', label: 'Current note' }
  ],
  rows: [
    {
      module: 'Queue protection',
      snapshot: `${QUEUE_TOP_PROTECTED_COUNT} protected positions`,
      note: 'Boost cannot enter or cross the protected zone.'
    },
    {
      module: 'Boost limit',
      snapshot: `${QUEUE_BOOST_MAX_PER_ENTRY} per order`,
      note: 'Still a placeholder action in Admin until write contracts are registered.'
    },
    {
      module: 'Next slot',
      snapshot: nextSlotAt,
      note: 'Slot execution and replay controls remain non-functional in this batch.'
    }
  ]
};

export const dashboardWalletTable: DataTableConfig = {
  columns: [
    { key: 'scope', label: 'Scope' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount', align: 'right' },
    { key: 'note', label: 'Note' }
  ],
  rows: [
    {
      scope: 'Pending cashback release',
      status: { label: QUEUE_ENTRY_STATUSES[5], tone: statusTone(QUEUE_ENTRY_STATUSES[5]) },
      amount: formatMinorMoney(486500),
      note: 'Delivery observation window still applies.'
    },
    {
      scope: 'Withdrawals awaiting finance',
      status: { label: WITHDRAWAL_STATUSES[1], tone: statusTone(WITHDRAWAL_STATUSES[1]) },
      amount: formatMinorMoney(193000),
      note: 'Finance decision remains a placeholder.'
    },
    {
      scope: 'Withdrawals processing',
      status: { label: WITHDRAWAL_STATUSES[2], tone: statusTone(WITHDRAWAL_STATUSES[2]) },
      amount: formatMinorMoney(72500),
      note: 'No payout provider integration in this batch.'
    }
  ]
};

export const dashboardBacklogTable: DataTableConfig = {
  columns: [
    { key: 'lane', label: 'Lane' },
    { key: 'count', label: 'Count', align: 'right' },
    { key: 'priority', label: 'Priority' },
    { key: 'note', label: 'Next contract dependency' }
  ],
  rows: [
    {
      lane: 'Order aftersale review',
      count: '8',
      priority: { label: 'High', tone: 'warning' },
      note: 'Requires registered Admin order action payload.'
    },
    {
      lane: 'Queue removal review',
      count: '5',
      priority: { label: 'High', tone: 'warning' },
      note: 'Requires registered Admin queue action payload.'
    },
    {
      lane: 'Withdrawal review',
      count: '27',
      priority: { label: 'Critical', tone: 'danger' },
      note: 'Needs registered Admin withdrawal decision contract.'
    },
    {
      lane: 'Risk case decision',
      count: '14',
      priority: { label: 'Critical', tone: 'danger' },
      note: 'Needs registered risk decision payload and audit reason contract.'
    }
  ]
};

export const dashboardRiskNotes = [
  'No Admin API path has been added in this batch. The app is route-safe, not data-complete.',
  'The frontend will not invent request or response fields for approvals, actions, or audit reasons.',
  `Shared rule version remains locked to ${LAUNCH_RULE_VERSION} for market ${LAUNCH_MARKET}.`,
  'Any new Admin mutation must update the registry baseline first, then OpenAPI, then packages/api-client.'
];

function baseMeta(): string[] {
  return [`Market: ${LAUNCH_MARKET}`, `Timezone: ${LAUNCH_TIMEZONE}`, `Rule: ${LAUNCH_RULE_VERSION}`, `Snapshot: ${generatedAt}`];
}

const listConfigs: Record<
  'products' | 'orders' | 'queues' | 'slots' | 'campaigns' | 'tasks' | 'invites' | 'wallet' | 'withdrawals' | 'risk' | 'governance' | 'audit',
  ListPageConfig
> = {
  products: {
    eyebrow: 'Operations · Products',
    title: 'Products',
    description: 'Skeleton list for catalog, queue eligibility, and campaign binding under the frozen /products route.',
    meta: baseMeta(),
    metrics: [
      { title: 'Sellable in PH', value: '18', description: 'Products currently exposed to the single launch market.', tone: 'accent' },
      { title: 'Queue enabled', value: '13', description: 'Only queue-eligible products may create queue seats.', tone: 'brand' },
      { title: 'Campaign bound', value: '4', description: 'Products with active campaign binding placeholders.', tone: 'warning' },
      { title: 'Needs stock review', value: '2', description: 'Placeholder flag for stock and pricing validation.', tone: 'danger' }
    ],
    tableTitle: 'Catalog placeholder rows',
    tableDescription: 'These rows are presentation-only and do not imply a final Admin API response.',
    table: {
      columns: [
        { key: 'productId', label: 'Product ID' },
        { key: 'market', label: 'Market' },
        { key: 'queue', label: 'Queue' },
        { key: 'campaign', label: 'Campaign binding' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          productId: 'prod-demo-101',
          market: 'PH',
          queue: { label: 'Enabled', tone: 'accent' },
          campaign: 'March Starter Promo',
          note: 'Queueable consumer gadget bundle.'
        },
        {
          productId: 'prod-demo-202',
          market: 'PH',
          queue: { label: 'Disabled', tone: 'warning' },
          campaign: 'None',
          note: 'Inventory or fulfilment review required before queue enablement.'
        },
        {
          productId: 'prod-demo-303',
          market: 'PH',
          queue: { label: 'Enabled', tone: 'accent' },
          campaign: 'Queue Booster Week',
          note: 'Keep activity rules copy aligned with public website.'
        }
      ]
    },
    secondaryTable: {
      title: 'Why the page stays static',
      description: 'Product CRUD and SKU editing need registered Admin contracts before implementation.',
      columns: [
        { key: 'module', label: 'Need' },
        { key: 'status', label: 'Current state' },
        { key: 'dependency', label: 'Dependency' }
      ],
      rows: [
        {
          module: 'Product list API',
          status: { label: 'Not connected', tone: 'warning' },
          dependency: 'Register Admin read-only product contract.'
        },
        {
          module: 'Product write actions',
          status: { label: 'Blocked', tone: 'danger' },
          dependency: 'Register product CRUD payloads and audit reason fields.'
        }
      ]
    },
    notes: [
      'No product DTO or Swagger type has been copied into frontend code.',
      'Queue enablement remains visual-only until Admin write endpoints are registered.',
      'Campaign binding stays descriptive so frontend does not invent nested product schemas.'
    ]
  },
  orders: {
    eyebrow: 'Operations · Orders',
    title: 'Orders',
    description: 'Skeleton list for order lookup, fulfilment visibility, and aftersale notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Paid orders', value: '162', description: `Rows commonly show ${ORDER_STATUSES[2]} or later lifecycle stages.`, tone: 'accent' },
      { title: 'Awaiting fulfilment', value: '37', description: ORDER_STATUSES[3], tone: 'brand' },
      { title: 'Aftersale open', value: '9', description: ORDER_STATUSES[8], tone: 'warning' },
      { title: 'Refund risk', value: '4', description: `${ORDER_STATUSES[9]} or ${ORDER_STATUSES[10]} need queue clawback review.`, tone: 'danger' }
    ],
    tableTitle: 'Order placeholder rows',
    tableDescription: 'List page aligns to PRD order management scope without inventing Admin action payloads.',
    table: {
      columns: [
        { key: 'orderId', label: 'Order ID' },
        { key: 'status', label: 'Status' },
        { key: 'queueSeat', label: 'Queue seat' },
        { key: 'amount', label: 'Paid amount', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          orderId: 'ord-demo-5001',
          status: { label: ORDER_STATUSES[2], tone: statusTone(ORDER_STATUSES[2]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(159900),
          note: 'Ready for queue entry creation after risk pass.'
        },
        {
          orderId: 'ord-demo-5002',
          status: { label: ORDER_STATUSES[8], tone: statusTone(ORDER_STATUSES[8]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(219900),
          note: 'Aftersale review may imply cashback clawback later.'
        },
        {
          orderId: 'ord-demo-5003',
          status: { label: ORDER_STATUSES[5], tone: statusTone(ORDER_STATUSES[5]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(89900),
          note: 'Delivery timestamp becomes truth source for pending release countdown.'
        }
      ]
    },
    notes: [
      'No hidden order mutation is wired here. Batch 4 is read-only by design.',
      'Backend order adjustment, refund entry, and logistics write operations must be registered before frontend actions exist.',
      'The table is a placeholder screen, not a final API response contract.'
    ]
  },
  queues: {
    eyebrow: 'Operations · Queues',
    title: 'Queues',
    description: 'Skeleton list for queue pool health, effective rank visibility, and freeze or removal review.',
    meta: baseMeta(),
    metrics: [
      { title: 'Active entries', value: '1,284', description: QUEUE_ENTRY_STATUSES[1], tone: 'accent' },
      { title: 'Frozen entries', value: '86', description: QUEUE_ENTRY_STATUSES[2], tone: 'warning' },
      { title: 'Winning pending release', value: '21', description: QUEUE_ENTRY_STATUSES[5], tone: 'brand' },
      { title: 'Removed entries', value: '48', description: QUEUE_ENTRY_STATUSES[4], tone: 'danger' }
    ],
    tableTitle: 'Queue entry placeholder rows',
    tableDescription: 'Current effective rank is descriptive only; no queue write actions are attached.',
    table: {
      columns: [
        { key: 'entryId', label: 'Entry ID' },
        { key: 'status', label: 'Status' },
        { key: 'effectiveRank', label: 'Effective rank', align: 'right' },
        { key: 'boostUsed', label: 'Boost used', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          entryId: 'qe-demo-9001',
          status: { label: QUEUE_ENTRY_STATUSES[1], tone: statusTone(QUEUE_ENTRY_STATUSES[1]) },
          effectiveRank: '31',
          boostUsed: '2 / 2',
          note: `Best possible boost insertion still stops at rank ${QUEUE_TOP_PROTECTED_COUNT + 1}.`
        },
        {
          entryId: 'qe-demo-9002',
          status: { label: QUEUE_ENTRY_STATUSES[2], tone: statusTone(QUEUE_ENTRY_STATUSES[2]) },
          effectiveRank: '—',
          boostUsed: '1 / 2',
          note: `User guard is currently ${USER_QUEUE_GUARD_STATUSES[1]}.`
        },
        {
          entryId: 'qe-demo-9003',
          status: { label: QUEUE_ENTRY_STATUSES[5], tone: statusTone(QUEUE_ENTRY_STATUSES[5]) },
          effectiveRank: 'Winner',
          boostUsed: '0 / 2',
          note: 'Pending release remains blocked until delivery plus observation window.'
        }
      ]
    },
    notes: [
      'Queue ranking, freeze, restore, and remove operations must remain backend-transactional and are not wired in this batch.',
      `Boost rules still follow shared hard limits: max ${QUEUE_BOOST_MAX_PER_ENTRY} per order and no crossing the Top${QUEUE_TOP_PROTECTED_COUNT}.`,
      'Event log rows are placeholders only until a read contract is registered.'
    ]
  },
  slots: {
    eyebrow: 'Operations · Slots',
    title: 'Settlement slots',
    description: 'Skeleton list for slot scheduling, execution outcome, and replay surfaces.',
    meta: baseMeta(),
    metrics: [
      { title: 'Scheduled today', value: '3', description: 'Default daily slot count fallback for MVP launch.', tone: 'brand' },
      { title: 'Running now', value: '1', description: SETTLEMENT_SLOT_STATUSES[1], tone: 'warning' },
      { title: 'Succeeded', value: '8', description: SETTLEMENT_SLOT_STATUSES[2], tone: 'accent' },
      { title: 'Needs replay', value: '1', description: `${SETTLEMENT_SLOT_STATUSES[3]} or ${SETTLEMENT_SLOT_STATUSES[4]}`, tone: 'danger' }
    ],
    tableTitle: 'Slot placeholder rows',
    tableDescription: 'Rows reflect fixed-slot settlement thinking, but not a final Admin slot API shape.',
    table: {
      columns: [
        { key: 'slotId', label: 'Slot ID' },
        { key: 'status', label: 'Status' },
        { key: 'market', label: 'Market' },
        { key: 'slotAt', label: 'Slot at' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          slotId: 'slot-20260311-1200',
          status: { label: SETTLEMENT_SLOT_STATUSES[0], tone: statusTone(SETTLEMENT_SLOT_STATUSES[0]) },
          market: 'PH',
          slotAt: nextSlotAt,
          note: 'Scheduled slot awaiting dispatcher trigger.'
        },
        {
          slotId: 'slot-20260311-1600',
          status: { label: SETTLEMENT_SLOT_STATUSES[1], tone: statusTone(SETTLEMENT_SLOT_STATUSES[1]) },
          market: 'PH',
          slotAt: formatDateTime('2026-03-11T08:00:00.000Z'),
          note: 'Execution in progress. Replay controls stay disabled.'
        },
        {
          slotId: 'slot-20260310-2000',
          status: { label: SETTLEMENT_SLOT_STATUSES[4], tone: statusTone(SETTLEMENT_SLOT_STATUSES[4]) },
          market: 'PH',
          slotAt: formatDateTime('2026-03-10T12:00:00.000Z'),
          note: 'Replay placeholder only. Needs registered Admin replay action.'
        }
      ]
    },
    notes: [
      'Slot create, retry, and replay actions are intentionally not wired.',
      'Frontend does not invent winner payloads or settlement replay schemas.',
      'Slot timestamps remain displayed in the locked launch timezone.'
    ]
  },
  campaigns: {
    eyebrow: 'Operations · Campaigns',
    title: 'Campaigns',
    description: 'Skeleton list for campaign scope, cashback caps, extra slots, and public rules-copy surfaces.',
    meta: baseMeta(),
    metrics: [
      { title: 'Active campaigns', value: '4', description: 'Campaign shell only. No live write path in this batch.', tone: 'brand' },
      { title: 'Bound products', value: '9', description: 'Presentation-only count for product scope.', tone: 'accent' },
      { title: 'Extra slots planned', value: '2', description: 'Extra slot scheduling remains a placeholder.', tone: 'warning' },
      { title: 'Copy review needed', value: '1', description: 'Public activity rules page must stay aligned with admin configuration.', tone: 'danger' }
    ],
    tableTitle: 'Campaign placeholder rows',
    tableDescription: 'Campaign visuals help align frontend and backend without inventing a final contract.',
    table: {
      columns: [
        { key: 'campaignId', label: 'Campaign ID' },
        { key: 'status', label: 'Lifecycle' },
        { key: 'cap', label: 'Cashback cap', align: 'right' },
        { key: 'slotMode', label: 'Slot mode' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          campaignId: 'cmp-march-starter',
          status: { label: 'Drafted in skeleton', tone: 'warning' },
          cap: formatMinorMoney(200000),
          slotMode: 'Default slots',
          note: 'Keep public rules text synchronized after real contract registration.'
        },
        {
          campaignId: 'cmp-queue-booster',
          status: { label: 'Placeholder active', tone: 'accent' },
          cap: formatMinorMoney(150000),
          slotMode: 'Extra slot requested',
          note: 'Additional slot logic must stay backend-driven.'
        }
      ]
    },
    notes: [
      'Campaign rules text is a UI placeholder, not the public rules truth source.',
      'Frontend will not infer product inclusion arrays or campaign write payloads.',
      'Any new campaign route or field must be registered first.'
    ]
  },
  tasks: {
    eyebrow: 'Operations · Tasks',
    title: 'Tasks',
    description: 'Skeleton list for task definitions, lifecycle notes, and reward placeholder content.',
    meta: baseMeta(),
    metrics: [
      { title: 'New user tasks', value: '5', description: 'First-session education and activation placeholders.', tone: 'brand' },
      { title: 'Daily tasks', value: '3', description: 'Recurring participation shells only.', tone: 'accent' },
      { title: 'Trust tasks', value: '2', description: 'Manual verification surfaces not wired yet.', tone: 'warning' },
      { title: 'Needs reward contract', value: '4', description: 'Task reward payloads are not registered yet.', tone: 'danger' }
    ],
    tableTitle: 'Task placeholder rows',
    tableDescription: 'Tasks remain descriptive so frontend does not invent Admin task payloads.',
    table: {
      columns: [
        { key: 'taskId', label: 'Task ID' },
        { key: 'scope', label: 'Scope' },
        { key: 'reward', label: 'Reward hint' },
        { key: 'status', label: 'Lifecycle' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          taskId: 'task-checkin-streak',
          scope: 'Daily',
          reward: 'Guard time or soft incentive',
          status: { label: 'Skeleton only', tone: 'warning' },
          note: 'Do not finalize reward schema without registry registration.'
        },
        {
          taskId: 'task-first-order',
          scope: 'New user',
          reward: 'Onboarding reward',
          status: { label: 'Skeleton only', tone: 'warning' },
          note: 'Task claim endpoints already exist for C-end, Admin config does not yet.'
        }
      ]
    },
    notes: [
      'This page does not invent task definition fields or write payloads.',
      'Task lifecycle labels are local presentation content, not shared enums.',
      'Backend should register task admin read and write contracts separately.'
    ]
  },
  invites: {
    eyebrow: 'Operations · Invites',
    title: 'Invites',
    description: 'Skeleton list for invite relation lookup, effectiveness review, and activation notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Bound relations', value: '240', description: INVITE_RELATION_STATUSES[0], tone: 'brand' },
      { title: 'Pending effective', value: '31', description: INVITE_RELATION_STATUSES[1], tone: 'warning' },
      { title: 'Effective', value: '179', description: INVITE_RELATION_STATUSES[2], tone: 'accent' },
      { title: 'Invalid', value: '12', description: INVITE_RELATION_STATUSES[3], tone: 'danger' }
    ],
    tableTitle: 'Invite placeholder rows',
    tableDescription: 'Relation status and wallet activation hints use only shared frozen values.',
    table: {
      columns: [
        { key: 'relationId', label: 'Relation ID' },
        { key: 'status', label: 'Status' },
        { key: 'activation', label: 'Wallet activation' },
        { key: 'depth', label: 'Depth', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          relationId: 'inv-rel-1001',
          status: { label: INVITE_RELATION_STATUSES[2], tone: statusTone(INVITE_RELATION_STATUSES[2]) },
          activation: WALLET_ACTIVATION_METHODS[0],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Effective after cooling-off and qualifying behavior.'
        },
        {
          relationId: 'inv-rel-1002',
          status: { label: INVITE_RELATION_STATUSES[1], tone: statusTone(INVITE_RELATION_STATUSES[1]) },
          activation: WALLET_ACTIVATION_METHODS[1],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Awaiting effectivity window.'
        },
        {
          relationId: 'inv-rel-1003',
          status: { label: INVITE_RELATION_STATUSES[3], tone: statusTone(INVITE_RELATION_STATUSES[3]) },
          activation: WALLET_ACTIVATION_METHODS[2],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Invalidation reason must come from backend once contract is registered.'
        }
      ]
    },
    notes: [
      'Invite relation detail pages remain display-only.',
      'No extra invite depth or unofficial status has been introduced.',
      'Wallet activation method labels come from shared frozen enums only.'
    ]
  },
  wallet: {
    eyebrow: 'Funds · Wallet',
    title: 'Wallet',
    description: 'Skeleton overview for user wallet balances, activation hints, and append-only ledger placeholders.',
    meta: baseMeta(),
    metrics: [
      { title: 'Pending balance', value: formatMinorMoney(486500), description: 'Waiting for delivery and observation completion.', tone: 'warning' },
      { title: 'Available balance', value: formatMinorMoney(265200), description: 'Presentation-only amount for payout review shell.', tone: 'accent' },
      { title: 'Frozen balance', value: formatMinorMoney(82200), description: 'May be affected by risk, review, or clawback handling.', tone: 'brand' },
      { title: 'Exceptions flagged', value: '3', description: 'Front-end will not display negative wallet balances.', tone: 'danger' }
    ],
    tableTitle: 'Wallet overview placeholder rows',
    tableDescription: 'Wallet rows are user-facing summaries, not a final admin ledger schema.',
    table: {
      columns: [
        { key: 'scope', label: 'Scope' },
        { key: 'pending', label: 'Pending', align: 'right' },
        { key: 'available', label: 'Available', align: 'right' },
        { key: 'frozen', label: 'Frozen', align: 'right' },
        { key: 'note', label: 'Finance note' }
      ],
      rows: [
        {
          scope: 'user-demo-1001',
          pending: formatMinorMoney(125000),
          available: formatMinorMoney(63200),
          frozen: formatMinorMoney(0),
          note: `Last delivery reference: ${lastDeliveryAt}`
        },
        {
          scope: 'user-demo-2008',
          pending: formatMinorMoney(0),
          available: formatMinorMoney(94200),
          frozen: formatMinorMoney(17500),
          note: 'Frozen amount under manual review.'
        },
        {
          scope: 'user-demo-3011',
          pending: formatMinorMoney(361500),
          available: formatMinorMoney(107800),
          frozen: formatMinorMoney(64700),
          note: 'Potential exception note only; internal debt remains backend-only.'
        }
      ]
    },
    secondaryTable: {
      title: 'Activation and ledger placeholders',
      description: 'Activation methods use frozen shared enums. Ledger remains append-only in backend design.',
      columns: [
        { key: 'topic', label: 'Topic' },
        { key: 'value', label: 'Current placeholder' },
        { key: 'note', label: 'Why it matters' }
      ],
      rows: [
        {
          topic: 'Activation methods',
          value: WALLET_ACTIVATION_METHODS.join(', '),
          note: 'UI copy must stay aligned with backend wallet-activation truth.'
        },
        {
          topic: 'Account deletion guard',
          value: ACCOUNT_DELETE_STATUSES.join(', '),
          note: 'Delete-account readiness may depend on wallet settlement completion.'
        }
      ]
    },
    notes: [
      'No ledger API contract has been invented here.',
      'Recoverable debt remains backend-internal and is not surfaced as a negative visible balance.',
      'Withdrawal and risk linkage remain placeholders until registered contracts exist.'
    ]
  },
  withdrawals: {
    eyebrow: 'Funds · Withdrawals',
    title: 'Withdrawals',
    description: 'Skeleton list for withdrawal pipeline, finance review, and payout placeholder handling.',
    meta: baseMeta(),
    metrics: [
      { title: 'Applied', value: '41', description: WITHDRAWAL_STATUSES[0], tone: 'brand' },
      { title: 'Risk review', value: '18', description: WITHDRAWAL_STATUSES[1], tone: 'warning' },
      { title: 'Processing', value: '9', description: WITHDRAWAL_STATUSES[2], tone: 'accent' },
      { title: 'Rejected or failed', value: '5', description: `${WITHDRAWAL_STATUSES[4]} / ${WITHDRAWAL_STATUSES[5]}`, tone: 'danger' }
    ],
    tableTitle: 'Withdrawal placeholder rows',
    tableDescription: 'List rows use only frozen withdrawal statuses and no unregistered action payloads.',
    table: {
      columns: [
        { key: 'withdrawalId', label: 'Withdrawal ID' },
        { key: 'status', label: 'Status' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'channel', label: 'Channel' },
        { key: 'note', label: 'Finance note' }
      ],
      rows: [
        {
          withdrawalId: 'wd-20260311-001',
          status: { label: WITHDRAWAL_STATUSES[1], tone: statusTone(WITHDRAWAL_STATUSES[1]) },
          amount: formatMinorMoney(30000),
          channel: 'Bank placeholder',
          note: 'Needs risk review and finance context.'
        },
        {
          withdrawalId: 'wd-20260311-014',
          status: { label: WITHDRAWAL_STATUSES[2], tone: statusTone(WITHDRAWAL_STATUSES[2]) },
          amount: formatMinorMoney(80000),
          channel: 'Wallet-to-bank placeholder',
          note: 'No payout provider status mapping in batch 4.'
        },
        {
          withdrawalId: 'wd-20260310-022',
          status: { label: WITHDRAWAL_STATUSES[4], tone: statusTone(WITHDRAWAL_STATUSES[4]) },
          amount: formatMinorMoney(45000),
          channel: 'Bank placeholder',
          note: 'Rejection reason is not modeled here until registered.'
        }
      ]
    },
    notes: [
      'Approval, rejection, and payout operations are intentionally disabled.',
      'No rejection-reason schema has been invented.',
      'Withdrawal actions must include audit and idempotency handling once backend registers them.'
    ]
  },
  risk: {
    eyebrow: 'Funds & Risk · Cases',
    title: 'Risk cases',
    description: 'Skeleton case pool for abnormal orders, invites, withdrawals, and queue reviews.',
    meta: baseMeta(),
    metrics: [
      { title: 'Queue-related cases', value: '5', description: 'Freeze, remove, and restore review placeholders.', tone: 'warning' },
      { title: 'Order-related cases', value: '3', description: 'Split-order and aftersale risk shells.', tone: 'danger' },
      { title: 'Invite-related cases', value: '2', description: 'Effectivity and invalidation review shells.', tone: 'brand' },
      { title: 'Withdrawal-related cases', value: '4', description: 'Manual payout review remains blocked until contract registration.', tone: 'accent' }
    ],
    tableTitle: 'Risk case placeholder rows',
    tableDescription: 'This page avoids new risk enums and keeps status language local to the screen.',
    table: {
      columns: [
        { key: 'caseId', label: 'Case ID' },
        { key: 'objectType', label: 'Object type' },
        { key: 'signal', label: 'Primary signal' },
        { key: 'priority', label: 'Priority' },
        { key: 'note', label: 'Current note' }
      ],
      rows: [
        {
          caseId: 'risk-1001',
          objectType: 'Withdrawal',
          signal: 'High-value payout review',
          priority: { label: 'Critical', tone: 'danger' },
          note: 'Awaiting registered decision payload.'
        },
        {
          caseId: 'risk-1002',
          objectType: 'Order',
          signal: 'Rapid split-order pattern',
          priority: { label: 'High', tone: 'warning' },
          note: 'May affect queue eligibility if backend confirms.'
        },
        {
          caseId: 'risk-1003',
          objectType: 'Invite',
          signal: 'Effectivity exception',
          priority: { label: 'Medium', tone: 'brand' },
          note: 'Review relation lifecycle against invite rules.'
        }
      ]
    },
    notes: [
      'This page intentionally avoids inventing a frozen risk-status enum.',
      'Decision, freeze, and release actions require registry-first payload registration.',
      'Case linkage to orders, invites, withdrawals, and queues stays descriptive only.'
    ]
  },
  governance: {
    eyebrow: 'Governance',
    title: 'Governance',
    description: 'Skeleton governance surface for RBAC, role matrix, and sensitive-operation approval notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Roles registered', value: String(ADMIN_ROLES.length), description: 'Only frozen Admin roles are displayed.', tone: 'brand' },
      { title: 'Sensitive domains', value: '4', description: 'Funds, risk, governance, and queue-control surfaces.', tone: 'warning' },
      { title: 'Approval notes required', value: '6', description: 'Placeholder count for sensitive write actions.', tone: 'accent' },
      { title: 'Blocked write flows', value: '8', description: 'No real write flow until contract registration.', tone: 'danger' }
    ],
    tableTitle: 'Role matrix placeholder',
    tableDescription: 'Role names come directly from shared frozen enums. Scope text is UI-only.',
    table: {
      columns: [
        { key: 'role', label: 'Role' },
        { key: 'scope', label: 'Primary scope' },
        { key: 'restricted', label: 'Sensitive limit' },
        { key: 'note', label: 'Governance note' }
      ],
      rows: ADMIN_ROLES.map((role) => ({
        role,
        scope:
          role === 'SUPER_ADMIN'
            ? 'All modules'
            : role === 'OPS_ADMIN'
              ? 'Products, campaigns, tasks, slots'
              : role === 'CS_ADMIN'
                ? 'Read-only customer support surfaces'
                : role === 'FINANCE_ADMIN'
                  ? 'Wallet and withdrawals'
                  : 'Risk review and enforcement',
        restricted:
          role === 'OPS_ADMIN'
            ? 'Cannot move wallet funds'
            : role === 'CS_ADMIN'
              ? 'Cannot approve finance or risk actions'
              : role === 'FINANCE_ADMIN'
                ? 'Cannot alter product or queue rules'
                : role === 'RISK_ADMIN'
                  ? 'Cannot rewrite public compliance routes'
                  : 'Requires audit reason on sensitive actions',
        note: 'UI matrix only. Real RBAC policy stays backend-owned.'
      }))
    },
    notes: [
      'Role values use only the shared frozen AdminRole enum.',
      'Permission granularity is intentionally described in prose until backend registers policy details.',
      'Sensitive-operation reason capture should be modeled with audit contracts before UI forms exist.'
    ]
  },
  audit: {
    eyebrow: 'Governance · Audit',
    title: 'Audit log',
    description: 'Skeleton audit view for sensitive operations, traceability, and export placeholder planning.',
    meta: baseMeta(),
    metrics: [
      { title: 'Tracked domains', value: '11', description: 'Products, orders, queues, slots, campaigns, tasks, invites, wallet, withdrawals, risk, governance.', tone: 'brand' },
      { title: 'Sensitive actions pending contract', value: '8', description: 'Write flows still blocked in this batch.', tone: 'warning' },
      { title: 'Export placeholder', value: '1', description: 'Export UI stays informational only.', tone: 'accent' },
      { title: 'Missing reason schema', value: '1', description: 'Audit reason payload not registered yet.', tone: 'danger' }
    ],
    tableTitle: 'Audit placeholder rows',
    tableDescription: 'Rows illustrate the kind of traceability the backend should later expose.',
    table: {
      columns: [
        { key: 'time', label: 'Time' },
        { key: 'actor', label: 'Actor' },
        { key: 'module', label: 'Module' },
        { key: 'action', label: 'Action' },
        { key: 'reason', label: 'Reason placeholder' }
      ],
      rows: [
        {
          time: generatedAt,
          actor: 'finance-admin-demo',
          module: 'Withdrawals',
          action: 'Placeholder review open',
          reason: 'Reason schema not registered yet.'
        },
        {
          time: formatDateTime('2026-03-11T05:30:00.000Z'),
          actor: 'risk-admin-demo',
          module: 'Risk',
          action: 'Placeholder case inspection',
          reason: 'Decision payload intentionally absent.'
        },
        {
          time: formatDateTime('2026-03-10T14:20:00.000Z'),
          actor: 'ops-admin-demo',
          module: 'Slots',
          action: 'Placeholder replay investigation',
          reason: 'Replay action contract not registered.'
        }
      ]
    },
    notes: [
      'This table is illustrative only and does not define a final audit schema.',
      'Audit export remains a placeholder link or button until backend registration happens.',
      'Sensitive reasons must be registered before the UI adds structured input.'
    ]
  }
};

export function getListPageConfig(
  key: keyof typeof listConfigs
): ListPageConfig {
  return listConfigs[key];
}

export function getDetailPageConfig(
  key: 'product' | 'order' | 'queue' | 'slot' | 'campaign' | 'task' | 'invite' | 'risk',
  id: string
): DetailPageConfig {
  switch (key) {
    case 'product':
      return {
        eyebrow: 'Operations · Product detail',
        title: `Product ${id}`,
        description: 'Catalog detail shell for pricing, queue eligibility, stock notes, and campaign bindings.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Frozen route detail',
        badgeTone: 'brand',
        backHref: '/products',
        metrics: [
          { title: 'Queue eligibility', value: 'Enabled', description: 'Placeholder only. No write action attached.', tone: 'accent' },
          { title: 'Market scope', value: LAUNCH_MARKET, description: 'Single launch market is locked in v1.2.', tone: 'brand' },
          { title: 'Default cap', value: formatMinorMoney(200000), description: 'Product-level cashback cap placeholder.', tone: 'warning' },
          { title: 'Stock review', value: 'Manual', description: 'Stock editing is out of scope in this batch.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Catalog overview',
            description: 'Baseline placeholders for a product record.',
            rows: [
              { label: 'Product ID', value: id },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Queue setting', value: 'Queue-enabled placeholder' },
              { label: 'Activity binding', value: 'March Starter Promo placeholder' }
            ]
          },
          {
            title: 'Pricing and stock',
            description: 'Displayed as screen copy only, not a final API contract.',
            rows: [
              { label: 'Current price hint', value: formatMinorMoney(159900) },
              { label: 'Inventory hint', value: 'Stock managed by backend truth source' },
              { label: 'SKU scope', value: 'Single-product order model preserved' },
              { label: 'Admin action state', value: 'Read-only skeleton' }
            ]
          }
        ],
        actions: [
          'Create product — disabled until registry and OpenAPI registration.',
          'Update queue setting — disabled until Admin write contract exists.',
          'Bind to campaign — disabled until campaign write contract exists.'
        ],
        notes: [
          'This page must not define product write payloads ahead of backend registration.',
          'Queue enablement and campaign binding are shown only as placeholders.',
          'The route is frozen; the data schema is not invented here.'
        ],
        relatedLinks: [
          { href: '/products', label: 'Products' },
          { href: '/campaigns', label: 'Campaigns' },
          { href: '/orders', label: 'Orders' }
        ]
      };

    case 'order':
      return {
        eyebrow: 'Operations · Order detail',
        title: `Order ${id}`,
        description: 'Order detail shell for fulfilment, queue linkage, payment snapshot, and aftersale placeholder handling.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: ORDER_STATUSES[2],
        badgeTone: statusTone(ORDER_STATUSES[2]),
        backHref: '/orders',
        metrics: [
          { title: 'Order state', value: ORDER_STATUSES[2], description: 'Sample state only; no live fetch in batch 4.', tone: 'accent' },
          { title: 'Quantity', value: '2', description: 'One order can have quantity > 1 but still only one queue seat.', tone: 'brand' },
          { title: 'Paid amount', value: formatMinorMoney(219900), description: 'Minor-unit formatted via shared formatter.', tone: 'warning' },
          { title: 'Queue seat', value: '1', description: 'Hard rule from PRD and shared constants.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Order snapshot',
            description: 'Static placeholders aligned to PRD order concepts.',
            rows: [
              { label: 'Order ID', value: id },
              { label: 'Current status', value: ORDER_STATUSES[2] },
              { label: 'Launch market', value: LAUNCH_MARKET },
              { label: 'Rule version', value: LAUNCH_RULE_VERSION }
            ]
          },
          {
            title: 'Fulfilment and queue',
            description: 'These labels do not define any backend response shape.',
            rows: [
              { label: 'Queue linkage', value: '1 order = 1 queue entry' },
              { label: 'Shipping truth source', value: 'Logistics callback or admin confirmation' },
              { label: 'Delivery reference', value: lastDeliveryAt },
              { label: 'Aftersale placeholder', value: ORDER_STATUSES[8] }
            ]
          }
        ],
        actions: [
          'Reduce quantity — disabled until registered Admin order action.',
          'Record refund / aftersale — disabled until registry and OpenAPI are updated.',
          'Override fulfilment state — disabled until registered audit-aware mutation exists.'
        ],
        notes: [
          'No refund payload or logistics patch schema has been added here.',
          'The frontend screen should consume generated Admin APIs later, not internal backend types.',
          'Queue seat behavior remains fixed: quantity changes amount, not seat count.'
        ],
        relatedLinks: [
          { href: '/orders', label: 'Orders' },
          { href: '/queues', label: 'Queues' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'queue':
      return {
        eyebrow: 'Operations · Queue detail',
        title: `Queue entry ${id}`,
        description: 'Queue detail shell for status, effective rank, guard linkage, settlement context, and event-log placeholders.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: QUEUE_ENTRY_STATUSES[1],
        badgeTone: statusTone(QUEUE_ENTRY_STATUSES[1]),
        backHref: '/queues',
        metrics: [
          { title: 'Effective rank', value: '31', description: `Rank ${QUEUE_TOP_PROTECTED_COUNT + 1} is the best boost target outside the protected zone.`, tone: 'accent' },
          { title: 'Boost used', value: '2 / 2', description: `Per-order boost cap is ${QUEUE_BOOST_MAX_PER_ENTRY}.`, tone: 'warning' },
          { title: 'Guard state', value: USER_QUEUE_GUARD_STATUSES[0], description: 'Guard remains user-level, not order-level.', tone: 'brand' },
          { title: 'Settlement context', value: nextSlotAt, description: 'Winner selection occurs on fixed settlement slots only.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Queue state',
            description: 'Frozen-route detail view for a single queue entry.',
            rows: [
              { label: 'Entry ID', value: id },
              { label: 'Current status', value: QUEUE_ENTRY_STATUSES[1] },
              { label: 'Protected zone size', value: String(QUEUE_TOP_PROTECTED_COUNT) },
              { label: 'Current effective rank', value: '31' }
            ]
          },
          {
            title: 'Guard and settlement',
            description: 'Queue rules stay aligned to shared constants and PRD v1.2.',
            rows: [
              { label: 'User guard status', value: USER_QUEUE_GUARD_STATUSES[0] },
              { label: 'Next slot', value: nextSlotAt },
              { label: 'Boost rule', value: `No entry may cross Top${QUEUE_TOP_PROTECTED_COUNT}` },
              { label: 'Winner release', value: QUEUE_ENTRY_STATUSES[5] }
            ]
          }
        ],
        actions: [
          'Freeze entry — disabled until queue mutation contract is registered.',
          'Restore entry — disabled until queue mutation contract is registered.',
          'Remove entry — disabled until queue mutation contract is registered.'
        ],
        notes: [
          'Queue status values come only from the shared frozen enum.',
          'Event logs and rank histories are not guessed here.',
          'Any mutation must remain backend-transactional and audit-aware.'
        ],
        relatedLinks: [
          { href: '/queues', label: 'Queues' },
          { href: '/slots', label: 'Slots' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'slot':
      return {
        eyebrow: 'Operations · Slot detail',
        title: `Settlement slot ${id}`,
        description: 'Slot detail shell for schedule, execution state, and replay placeholder handling.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: SETTLEMENT_SLOT_STATUSES[0],
        badgeTone: statusTone(SETTLEMENT_SLOT_STATUSES[0]),
        backHref: '/slots',
        metrics: [
          { title: 'Slot state', value: SETTLEMENT_SLOT_STATUSES[0], description: 'Illustrative only for this skeleton screen.', tone: 'brand' },
          { title: 'Scheduled at', value: nextSlotAt, description: 'Launch timezone formatting stays locked.', tone: 'warning' },
          { title: 'Market', value: LAUNCH_MARKET, description: 'One market pool for MVP launch.', tone: 'accent' },
          { title: 'Replay state', value: SETTLEMENT_SLOT_STATUSES[4], description: 'Replay controls are placeholders only.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Schedule context',
            description: 'Slot scheduling is shown without creating a final response schema.',
            rows: [
              { label: 'Slot ID', value: id },
              { label: 'Status', value: SETTLEMENT_SLOT_STATUSES[0] },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Slot at', value: nextSlotAt }
            ]
          },
          {
            title: 'Execution notes',
            description: 'Replay and manual dispatch remain backend-owned concerns.',
            rows: [
              { label: 'Execution model', value: 'Fixed slot settlement' },
              { label: 'Winner count', value: '1 active top-ranked order per slot' },
              { label: 'Retry placeholder', value: SETTLEMENT_SLOT_STATUSES[3] },
              { label: 'Replay placeholder', value: SETTLEMENT_SLOT_STATUSES[4] }
            ]
          }
        ],
        actions: [
          'Create slot — disabled until Admin write contract is registered.',
          'Retry slot — disabled until replay / retry payload is registered.',
          'Replay slot — disabled until replay / retry payload is registered.'
        ],
        notes: [
          'No winner schema or settlement replay contract has been guessed.',
          'Slots remain backend-driven even when Admin surfaces controls later.',
          'Timezone display stays Asia/Manila for MVP launch.'
        ],
        relatedLinks: [
          { href: '/slots', label: 'Slots' },
          { href: '/queues', label: 'Queues' },
          { href: '/campaigns', label: 'Campaigns' }
        ]
      };

    case 'campaign':
      return {
        eyebrow: 'Operations · Campaign detail',
        title: `Campaign ${id}`,
        description: 'Campaign detail shell for product scope, cap hints, slot adjustments, and rules-copy planning.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Campaign skeleton',
        badgeTone: 'brand',
        backHref: '/campaigns',
        metrics: [
          { title: 'Cashback cap', value: formatMinorMoney(200000), description: 'Example cap only, not final contract data.', tone: 'warning' },
          { title: 'Bound products', value: '4', description: 'Placeholder count for scope review.', tone: 'accent' },
          { title: 'Extra slots', value: '1', description: 'Extra slot logic remains backend-owned.', tone: 'brand' },
          { title: 'Copy sync risk', value: '1', description: 'Public rules copy must match admin state later.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Campaign overview',
            description: 'Descriptive placeholders for ops and content teams.',
            rows: [
              { label: 'Campaign ID', value: id },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Cashback cap hint', value: formatMinorMoney(200000) },
              { label: 'Activity route sync', value: '/rules/activity/[slug]' }
            ]
          },
          {
            title: 'Execution notes',
            description: 'Backend remains the truth source for slot and eligibility calculations.',
            rows: [
              { label: 'Product scope', value: 'Placeholder list only' },
              { label: 'Extra slots', value: 'Optional, backend-managed' },
              { label: 'Rules copy', value: 'Public website alignment required' },
              { label: 'Current state', value: 'Read-only skeleton' }
            ]
          }
        ],
        actions: [
          'Edit campaign basics — disabled until registered Admin payloads exist.',
          'Bind products — disabled until product scope contract exists.',
          'Publish campaign copy — disabled until public rules sync contract exists.'
        ],
        notes: [
          'Campaign public copy cannot become the secret truth source; it must mirror backend truth.',
          'No new activity route has been added here.',
          'Product scope arrays are not guessed on the frontend.'
        ],
        relatedLinks: [
          { href: '/campaigns', label: 'Campaigns' },
          { href: '/products', label: 'Products' },
          { href: '/slots', label: 'Slots' }
        ]
      };

    case 'task':
      return {
        eyebrow: 'Operations · Task detail',
        title: `Task ${id}`,
        description: 'Task detail shell for lifecycle notes, reward hinting, and launch readiness checks.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Task skeleton',
        badgeTone: 'warning',
        backHref: '/tasks',
        metrics: [
          { title: 'Lifecycle', value: 'Skeleton only', description: 'No admin task lifecycle contract exists yet.', tone: 'warning' },
          { title: 'Reward hint', value: 'Guard time / soft reward', description: 'Placeholder wording only.', tone: 'brand' },
          { title: 'Audience', value: 'Daily or onboarding', description: 'Scope kept textual on purpose.', tone: 'accent' },
          { title: 'Contract state', value: 'Unregistered', description: 'No Admin task config payload yet.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Task overview',
            description: 'This screen stays conceptual until registry registration happens.',
            rows: [
              { label: 'Task ID', value: id },
              { label: 'Current state', value: 'Skeleton only' },
              { label: 'Reward hint', value: 'Guard time, fragments, or onboarding reward' },
              { label: 'Write path', value: 'Not registered' }
            ]
          }
        ],
        actions: [
          'Update task — disabled until task admin contract is registered.',
          'Schedule task — disabled until task admin contract is registered.',
          'Retire task — disabled until task admin contract is registered.'
        ],
        notes: [
          'Task configuration is intentionally text-only here.',
          'No task DTO or response model has been copied into shared code.',
          'Backend should register read and write paths separately for Admin.'
        ],
        relatedLinks: [
          { href: '/tasks', label: 'Tasks' },
          { href: '/invites', label: 'Invites' },
          { href: '/governance', label: 'Governance' }
        ]
      };

    case 'invite':
      return {
        eyebrow: 'Operations · Invite detail',
        title: `Invite relation ${id}`,
        description: 'Invite relation detail shell for lifecycle, effectivity, and wallet-activation guidance.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: INVITE_RELATION_STATUSES[1],
        badgeTone: statusTone(INVITE_RELATION_STATUSES[1]),
        backHref: '/invites',
        metrics: [
          { title: 'Relation status', value: INVITE_RELATION_STATUSES[1], description: 'Uses frozen shared invite statuses only.', tone: 'warning' },
          { title: 'Depth', value: String(INVITE_MAX_DEPTH), description: 'Single-level invite depth is fixed in MVP.', tone: 'brand' },
          { title: 'Activation hint', value: WALLET_ACTIVATION_METHODS[0], description: 'Wallet activation method comes from shared enum.', tone: 'accent' },
          { title: 'Invalidation review', value: INVITE_RELATION_STATUSES[3], description: 'Reason payload is intentionally absent.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Relation overview',
            description: 'Invite lifecycle placeholder data only.',
            rows: [
              { label: 'Relation ID', value: id },
              { label: 'Status', value: INVITE_RELATION_STATUSES[1] },
              { label: 'Depth', value: String(INVITE_MAX_DEPTH) },
              { label: 'Wallet activation', value: WALLET_ACTIVATION_METHODS[0] }
            ]
          },
          {
            title: 'Effectivity and review',
            description: 'Detailed reasons must come from backend after registration.',
            rows: [
              { label: 'Cooling-off state', value: 'Pending effective placeholder' },
              { label: 'Invalidation status', value: INVITE_RELATION_STATUSES[3] },
              { label: 'Reason payload', value: 'Not registered in batch 4' },
              { label: 'Reward linkage', value: 'Placeholder only' }
            ]
          }
        ],
        actions: [
          'Invalidate relation — disabled until decision payload is registered.',
          'Restore relation — disabled until decision payload is registered.',
          'Adjust reward linkage — disabled until admin reward contract exists.'
        ],
        notes: [
          'No unofficial invite status has been introduced.',
          'Invalidation reasons must not be guessed in the frontend.',
          'Wallet activation method values come only from shared frozen enums.'
        ],
        relatedLinks: [
          { href: '/invites', label: 'Invites' },
          { href: '/wallet', label: 'Wallet' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'risk':
      return {
        eyebrow: 'Funds & Risk · Case detail',
        title: `Risk case ${id}`,
        description: 'Risk case detail shell for linked objects, signals, and decision placeholder surfaces.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Manual review',
        badgeTone: 'danger',
        backHref: '/risk',
        metrics: [
          { title: 'Linked object', value: 'Withdrawal', description: 'Example only; not a final case schema.', tone: 'warning' },
          { title: 'Current lane', value: 'Manual review', description: 'Local UI wording only.', tone: 'danger' },
          { title: 'Linked queue note', value: QUEUE_ENTRY_STATUSES[2], description: 'Review may affect queue status later.', tone: 'brand' },
          { title: 'Decision contract', value: 'Missing', description: 'No admin risk decision payload registered yet.', tone: 'accent' }
        ],
        sections: [
          {
            title: 'Case overview',
            description: 'Case details remain descriptive to avoid freezing unregistered fields.',
            rows: [
              { label: 'Case ID', value: id },
              { label: 'Primary object', value: 'Withdrawal placeholder' },
              { label: 'Primary signal', value: 'Large payout anomaly' },
              { label: 'Current handling', value: 'Manual review placeholder' }
            ]
          },
          {
            title: 'Linked objects',
            description: 'Relationship text only; no nested response contract is implied.',
            rows: [
              { label: 'Order reference', value: 'ord-demo-5002' },
              { label: 'Queue reference', value: 'qe-demo-9002' },
              { label: 'Withdrawal reference', value: 'wd-20260311-001' },
              { label: 'Invite reference', value: 'inv-rel-1002' }
            ]
          }
        ],
        actions: [
          'Approve risk case — disabled until decision payload and audit reason are registered.',
          'Reject risk case — disabled until decision payload and audit reason are registered.',
          'Escalate to governance — disabled until workflow contract is registered.'
        ],
        notes: [
          'This page intentionally does not introduce a frozen risk-case status enum.',
          'Linked-object identifiers are illustrative screen text, not final API fields.',
          'Decision and enforcement actions must be registered before frontend implementation.'
        ],
        relatedLinks: [
          { href: '/risk', label: 'Risk cases' },
          { href: '/withdrawals', label: 'Withdrawals' },
          { href: '/queues', label: 'Queues' }
        ]
      };
  }
}
```

## `apps/admin/src/lib/env.ts`

```
export const adminAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  adminBaseUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URL ?? 'http://localhost:3001',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''
} as const;
```

## `apps/admin/src/lib/navigation.ts`

```
import { ADMIN_ROUTES } from '@queuefree/shared';

export type AdminRoute = (typeof ADMIN_ROUTES)[number];

export type AdminNavItem = {
  href: AdminRoute;
  label: string;
  description: string;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

export const adminNavigation: AdminNavGroup[] = [
  {
    title: 'Overview',
    items: [
      {
        href: '/',
        label: 'Dashboard',
        description: 'Core business metrics, queue health, fund summary, and pending reviews.'
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        href: '/products',
        label: 'Products',
        description: 'Catalog, queue eligibility, and campaign binding placeholders.'
      },
      {
        href: '/orders',
        label: 'Orders',
        description: 'Order search, fulfilment snapshot, aftersale placeholder.'
      },
      {
        href: '/queues',
        label: 'Queues',
        description: 'Queue pool views, freeze notes, and event-log placeholders.'
      },
      {
        href: '/slots',
        label: 'Slots',
        description: 'Fixed settlement slot scheduling and replay surfaces.'
      },
      {
        href: '/campaigns',
        label: 'Campaigns',
        description: 'Cashback cap, extra slots, and rules-copy shells.'
      },
      {
        href: '/tasks',
        label: 'Tasks',
        description: 'Task configuration, reward notes, and lifecycle placeholders.'
      },
      {
        href: '/invites',
        label: 'Invites',
        description: 'Invite relation lookup, invalidation notes, and reward review.'
      }
    ]
  },
  {
    title: 'Funds & Risk',
    items: [
      {
        href: '/wallet',
        label: 'Wallet',
        description: 'User wallet overview, ledger placeholders, activation hints.'
      },
      {
        href: '/withdrawals',
        label: 'Withdrawals',
        description: 'Withdrawal pipeline and finance-review queue.'
      },
      {
        href: '/risk',
        label: 'Risk',
        description: 'Risk case pool, linked object review, and decision placeholders.'
      }
    ]
  },
  {
    title: 'Governance',
    items: [
      {
        href: '/governance',
        label: 'Governance',
        description: 'Role matrix, approval guardrails, and sensitive-operation notes.'
      },
      {
        href: '/audit',
        label: 'Audit',
        description: 'Audit lookup shell and export placeholder.'
      }
    ]
  }
];

const flattenedNavItems = adminNavigation.flatMap((group) => group.items);

export function isNavItemActive(href: AdminRoute, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveNavItem(pathname: string): AdminNavItem | null {
  return flattenedNavItems.find((item) => isNavItemActive(item.href, pathname)) ?? null;
}
```

## `apps/admin/src/lib/utils.ts`

```
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## `apps/admin/tailwind.config.ts`

```
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        panel: {
          DEFAULT: 'rgb(var(--panel) / <alpha-value>)',
          muted: 'rgb(var(--panel-muted) / <alpha-value>)'
        },
        sidebar: {
          DEFAULT: 'rgb(var(--sidebar) / <alpha-value>)',
          foreground: 'rgb(var(--sidebar-foreground) / <alpha-value>)'
        },
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)'
        },
        warning: {
          DEFAULT: 'rgb(var(--warning) / <alpha-value>)',
          soft: 'rgb(var(--warning-soft) / <alpha-value>)'
        },
        danger: {
          DEFAULT: 'rgb(var(--danger) / <alpha-value>)',
          soft: 'rgb(var(--danger-soft) / <alpha-value>)'
        }
      },
      maxWidth: {
        content: '72rem'
      },
      boxShadow: {
        panel: '0 20px 50px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
```

## `apps/admin/tsconfig.json`

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "allowJs": false,
    "strict": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

## `apps/mobile/.env.example`

```
EXPO_PUBLIC_APP_ENV=local
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
EXPO_PUBLIC_WEB_BASE_URL=http://localhost:3000
EXPO_PUBLIC_SENTRY_DSN=
EXPO_PUBLIC_POSTHOG_KEY=
EXPO_PUBLIC_POSTHOG_HOST=
```

## `apps/mobile/app/(app)/(tabs)/_layout.tsx`

```
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12
        }
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="queue" options={{ title: "Queue" }} />
      <Tabs.Screen name="tasks" options={{ title: "Tasks" }} />
      <Tabs.Screen name="invites" options={{ title: "Invites" }} />
      <Tabs.Screen name="wallet" options={{ title: "Wallet" }} />
      <Tabs.Screen name="me" options={{ title: "Me" }} />
    </Tabs>
  );
}
```

## `apps/mobile/app/(app)/(tabs)/home.tsx`

```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney, formatDateTime } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoProducts, demoQueueEntries } from "../../../src/lib/demo-data";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function HomeTabScreen() {
  const { config } = useRuntimeConfig();
  const nextSlot = demoQueueEntries[0]?.nextSlotAt;

  return (
    <Screen
      title="Home"
      subtitle="Understand the path in seconds: buy a real product, join the queue, then wait for fixed settlement slots."
    >
      <DemoBanner />

      <SectionCard title="Today at a glance" description="MVP launch stays fixed to PH / PHP / Asia/Manila / English.">
        <Text>• Market: {config.marketCode}</Text>
        <Text>• Currency: {config.currencyCode}</Text>
        <Text>• Check-in keeps all active entries valid for {config.baseGuardHours} hours</Text>
        <Text>• Next visible settlement slot: {nextSlot ? formatDateTime(nextSlot) : "TBD"}</Text>
      </SectionCard>

      <SectionCard title="Queue-friendly products" description="There is no cart in MVP. Quantity is chosen on the product page, then the order goes straight to checkout.">
        <View style={{ gap: 12 }}>
          {demoProducts.map((product) => (
            <SectionCard
              key={product.id}
              title={product.title}
              description={`${product.subtitle} · ${product.stockLabel}`}
            >
              <Text>Price: {formatMinorMoney(product.priceMinor)}</Text>
              <Text>Default cashback cap: {formatMinorMoney(product.cashbackCapMinor)}</Text>
              <PrimaryButton
                label="View product"
                onPress={() =>
                  router.push({
                    pathname: "/(app)/product/[productId]",
                    params: { productId: product.id }
                  })
                }
              />
            </SectionCard>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Quick access" description="All main legal and rule pages must stay reachable in-app.">
        <View style={{ gap: 10 }}>
          <NavRow
            label="Rules center"
            description="Open queue, wallet, and activity rules"
            onPress={() => router.push("/(app)/rules")}
          />
          <NavRow
            label="Queue tab"
            description="See current effective rank and guard status"
            onPress={() => router.push("/(app)/(tabs)/queue")}
          />
          <NavRow
            label="Support"
            description="Customer service and appeal entry"
            onPress={() => router.push("/(app)/support")}
          />
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/(tabs)/invites.tsx`

```
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { demoInviteRecords } from "../../../src/lib/demo-data";
import { getInviteStatusTone } from "../../../src/lib/status-maps";

export default function InvitesTabScreen() {
  return (
    <Screen
      title="Invites"
      subtitle="Invite logic stays single-layer only. Effective and invalid states must remain explainable."
    >
      <DemoBanner />

      <SectionCard title="My invite code" description="Binding stays optional and time-limited for MVP.">
        <Text>Invite code: QUEUEFREE2026</Text>
        <Text>Effective invites help later wallet activation or trust flow, depending on backend rules.</Text>
      </SectionCard>

      <SectionCard title="Invite records" description="The UI must clearly show BOUND / PENDING_EFFECTIVE / EFFECTIVE / INVALID.">
        <View style={{ gap: 12 }}>
          {demoInviteRecords.map((record) => (
            <SectionCard
              key={record.id}
              title={record.maskedPhone}
              description={record.reason}
              rightSlot={<StatusPill label={record.status} tone={getInviteStatusTone(record.status)} />}
            >
              <Text>Reason: {record.reason}</Text>
            </SectionCard>
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/(tabs)/me.tsx`

```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoProfile } from "../../../src/lib/demo-data";

export default function MeTabScreen() {
  return (
    <Screen
      title="Me"
      subtitle="Keep profile, security, legal pages, support, and delete account entry easy to find."
    >
      <DemoBanner />

      <SectionCard title={demoProfile.displayName} description={demoProfile.phoneNumber}>
        <Text>{demoProfile.marketLabel}</Text>
        <Text>{demoProfile.timezoneLabel}</Text>
      </SectionCard>

      <SectionCard title="Account and support" description="These pages are mandatory for store review readiness.">
        <View style={{ gap: 10 }}>
          <NavRow label="Addresses" description="Manage shipping addresses" onPress={() => router.push("/(app)/me/addresses")} />
          <NavRow label="Security" description="Devices and session actions" onPress={() => router.push("/(app)/me/security")} />
          <NavRow label="Rules center" description="Queue, wallet, and activity rules" onPress={() => router.push("/(app)/rules")} />
          <NavRow label="Privacy policy" description="In-app privacy page" onPress={() => router.push("/(app)/privacy")} />
          <NavRow label="Terms of service" description="In-app terms page" onPress={() => router.push("/(app)/terms")} />
          <NavRow label="Support" description="Customer service and appeal" onPress={() => router.push("/(app)/support")} />
          <NavRow label="Delete account" description="Request + settlement + anonymization path" onPress={() => router.push("/(app)/delete-account")} />
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/(tabs)/queue.tsx`

```
import { useState } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { demoGuard, demoQueueEntries } from "../../../src/lib/demo-data";
import { getGuardStatusTone, getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function QueueTabScreen() {
  const { config } = useRuntimeConfig();
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null);

  return (
    <Screen
      title="Queue"
      subtitle="Queue pages show the current effective rank, not a historical absolute rank."
    >
      <DemoBanner />

      <SectionCard
        title="Queue guard"
        description="Check-in is user-level. One successful check-in helps all active queue entries stay valid together."
        rightSlot={<StatusPill label={demoGuard.status} tone={getGuardStatusTone(demoGuard.status)} />}
      >
        <KeyValueRow label="Valid until" value={formatDateTime(demoGuard.validUntil)} />
        <KeyValueRow label="Grace until" value={formatDateTime(demoGuard.graceUntil)} />
        <Text>If guard expires, entries become frozen first, then may be removed after the grace window.</Text>
        {checkedInAt ? <Text>Last demo check-in: {formatDateTime(checkedInAt)}</Text> : null}
        <PrimaryButton label="Demo check-in" onPress={() => setCheckedInAt(new Date().toISOString())} />
      </SectionCard>

      <SectionCard title="My queue entries" description={`Top${config.protectZoneSize} is protected. Boost is limited to ${config.boostLimitPerEntry} times per order.`}>
        <View style={{ gap: 12 }}>
          {demoQueueEntries.map((entry) => (
            <SectionCard
              key={entry.id}
              title={entry.productTitle}
              description={`Order ${entry.orderId}`}
              rightSlot={<StatusPill label={entry.status} tone={getQueueStatusTone(entry.status)} />}
            >
              <KeyValueRow label="Current rank" value={entry.currentRank ? `#${entry.currentRank}` : "Not ranked"} />
              <KeyValueRow label="Boost used" value={`${entry.boostUsed} / ${config.boostLimitPerEntry}`} />
              <KeyValueRow label="Next slot" value={formatDateTime(entry.nextSlotAt)} />
              <KeyValueRow label="Eligible cashback base" value={formatMinorMoney(entry.eligibleCashbackMinor)} />
              <PrimaryButton
                label="View queue detail"
                onPress={() =>
                  router.push({
                    pathname: "/(app)/queue/[entryId]",
                    params: { entryId: entry.id }
                  })
                }
              />
            </SectionCard>
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/(tabs)/tasks.tsx`

```
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoTasks } from "../../../src/lib/demo-data";

export default function TasksTabScreen() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const claimedSet = useMemo(() => new Set(claimedIds), [claimedIds]);

  return (
    <Screen
      title="Tasks"
      subtitle="Tasks can extend retention, grant fragments, or support wallet activation paths later."
    >
      <DemoBanner />

      <SectionCard title="Task center" description="Rewards should remain traceable. Real task reads and claims must come from the generated client after backend registers the task contract.">
        <View style={{ gap: 12 }}>
          {demoTasks.map((task) => {
            const alreadyClaimed = claimedSet.has(task.id);
            return (
              <SectionCard key={task.id} title={task.title} description={task.rewardLabel}>
                <Text>Progress: {task.progressLabel}</Text>
                <Text>Status: {alreadyClaimed ? "Already claimed in demo mode" : task.claimable ? "Ready to claim" : "Not ready yet"}</Text>
                <PrimaryButton
                  label={alreadyClaimed ? "Claimed" : task.claimable ? "Claim demo reward" : "Not claimable yet"}
                  disabled={!task.claimable || alreadyClaimed}
                  onPress={() => setClaimedIds((current) => [...current, task.id])}
                />
              </SectionCard>
            );
          })}
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/(tabs)/wallet.tsx`

```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { demoLedgers, demoWallet, demoWithdrawals } from "../../../src/lib/demo-data";
import { getWithdrawalStatusTone } from "../../../src/lib/status-maps";

export default function WalletTabScreen() {
  return (
    <Screen
      title="Wallet"
      subtitle="Cashback enters pending first. Only later, after the release path is satisfied, it may become withdrawable."
    >
      <DemoBanner />

      <SectionCard title="Balances" description="Frontend should never show a negative wallet. Recoverable debt stays internal and only shows a general settlement hint when necessary.">
        <KeyValueRow label="Pending" value={formatMinorMoney(demoWallet.pendingBalanceMinor)} emphasize />
        <KeyValueRow label="Available" value={formatMinorMoney(demoWallet.availableBalanceMinor)} emphasize />
        <KeyValueRow label="Frozen" value={formatMinorMoney(demoWallet.frozenBalanceMinor)} emphasize />
        <Text>Activation path: {demoWallet.activationLabel}</Text>
        {demoWallet.showRecoverableDebtHint ? <Text>There is a settlement exception to resolve.</Text> : null}
        <PrimaryButton label="Go to withdraw" onPress={() => router.push("/(app)/wallet/withdraw")} />
      </SectionCard>

      <SectionCard title="Withdrawal records" description="Submitted withdrawals freeze available balance until approval or rejection.">
        <View style={{ gap: 12 }}>
          {demoWithdrawals.map((item) => (
            <SectionCard
              key={item.id}
              title={item.id}
              description={formatDateTime(item.createdAt)}
              rightSlot={<StatusPill label={item.status} tone={getWithdrawalStatusTone(item.status)} />}
            >
              <Text>Amount: {formatMinorMoney(item.amountMinor)}</Text>
            </SectionCard>
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Ledger preview" description="Real backend must keep wallet ledger append-only.">
        <View style={{ gap: 10 }}>
          {demoLedgers.map((ledger) => (
            <NavRow
              key={ledger.id}
              label={ledger.title}
              description={formatDateTime(ledger.createdAt)}
              rightSlot={<Text>{formatMinorMoney(ledger.amountMinor)}</Text>}
            />
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/_layout.tsx`

```
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
```

## `apps/mobile/app/(app)/checkout/[productId].tsx`

```
import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { getProductById } from "../../../src/lib/demo-data";

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ productId: string; quantity?: string }>();
  const productId = params.productId || "prod-earbuds";
  const quantity = Number(params.quantity ?? 1);
  const product = useMemo(() => getProductById(productId), [productId]);
  const [agreeToRules, setAgreeToRules] = useState(false);

  const totalMinor = product.priceMinor * quantity;
  const orderId = `order-${product.id}-demo`;

  return (
    <Screen
      title="Checkout"
      subtitle="The order snapshot should be fixed at checkout. Payment success later becomes the queue conversion page."
    >
      <DemoBanner />

      <SectionCard title="Shipping address" description="The real backend later uses the user's saved address list.">
        <Text>Demo address: 21 Ayala Avenue, Makati City, Metro Manila</Text>
      </SectionCard>

      <SectionCard title="Order snapshot" description="One order, one product, multiple quantity allowed.">
        <KeyValueRow label="Product" value={product.title} />
        <KeyValueRow label="Unit price" value={formatMinorMoney(product.priceMinor)} />
        <KeyValueRow label="Quantity" value={String(quantity)} />
        <KeyValueRow label="Payable total" value={formatMinorMoney(totalMinor)} emphasize />
      </SectionCard>

      <SectionCard title="Payment and rules" description="Do not use IAP / Play Billing for physical goods. Real payment providers must go through backend adapters.">
        <CheckboxRow
          checked={agreeToRules}
          onPress={() => setAgreeToRules((current) => !current)}
          label="I understand the queue rules, payment rules, and refund impact."
          hint="The real frontend later uses generated order creation and payment-intent calls after backend exports OpenAPI."
        />
      </SectionCard>

      <View style={{ gap: 12 }}>
        <PrimaryButton
          label="Pay and create demo order"
          disabled={!agreeToRules}
          onPress={() =>
            router.replace({
              pathname: "/(app)/orders/success/[orderId]",
              params: { orderId }
            })
          }
        />
        {!agreeToRules ? <Text>Please confirm the rules before continuing.</Text> : null}
      </View>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/delete-account.tsx`

```
import { useState } from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "../../src/components/primary-button";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { StatusPill } from "../../src/components/status-pill";

export default function DeleteAccountScreen() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Screen
      title="Delete account"
      subtitle="Deletion in this product is not a simple disable action. It is request + settlement + anonymization."
    >
      <SectionCard
        title="Deletion lifecycle"
        description="The final backend should drive these states."
        rightSlot={<StatusPill label={submitted ? "DELETE_REQUESTED" : "NOT_REQUESTED"} tone={submitted ? "warning" : "neutral"} />}
      >
        <View style={{ gap: 8 }}>
          <Text>• DELETE_REQUESTED</Text>
          <Text>• PENDING_SETTLEMENT</Text>
          <Text>• READY_TO_ANONYMIZE</Text>
          <Text>• ANONYMIZED</Text>
        </View>
      </SectionCard>

      <SectionCard title="Before you submit" description="Show blockers, impact, and unsettled items clearly.">
        <View style={{ gap: 8 }}>
          <Text>• Active queue entries may be removed or settled according to rules.</Text>
          <Text>• Wallet and order settlement must finish before anonymization.</Text>
          <Text>• Some records may stay retained for anti-fraud, tax, legal, or audit reasons.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Demo action" description="The real backend later connects the generated delete-account request call with idempotency protection.">
        <PrimaryButton
          label={submitted ? "Demo request submitted" : "Submit demo delete request"}
          disabled={submitted}
          variant="danger"
          onPress={() => setSubmitted(true)}
        />
        {submitted ? <Text>Your demo request is now shown as submitted. Real backend later advances the state machine.</Text> : null}
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/me/addresses.tsx`

```
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";

const schema = z.object({
  fullName: z.string().min(2, "Please enter the receiver name."),
  phoneNumber: z.string().min(10, "Please enter the receiver phone."),
  line1: z.string().min(5, "Please enter the full address.")
});

type FormValues = z.infer<typeof schema>;

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState([
    "Juan Dela Cruz · +63 912 345 6789 · 21 Ayala Avenue, Makati City"
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      line1: ""
    }
  });

  const submit = form.handleSubmit((values) => {
    setAddresses((current) => [
      `${values.fullName} · ${values.phoneNumber} · ${values.line1}`,
      ...current
    ]);
    form.reset();
  });

  return (
    <Screen title="Addresses" subtitle="The real backend later connects address list and address save through generated client calls.">
      <SectionCard title="Saved addresses" description="Use clear shipping details before checkout.">
        <View style={{ gap: 10 }}>
          {addresses.map((item) => (
            <NavRow key={item} label={item} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Add new address" description="This starter keeps the form local only.">
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <TextField
              label="Receiver name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Juan Dela Cruz"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Receiver phone"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="+63 9xx xxx xxxx"
              keyboardType="phone-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="line1"
          render={({ field, fieldState }) => (
            <TextField
              label="Address line"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="21 Ayala Avenue, Makati City"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Save demo address" onPress={submit} />
        <Text>Checkout later reads the selected address snapshot, not a mutable live address object.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/me/security.tsx`

```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useAuthStore } from "../../../src/store/auth-store";

const demoDevices = [
  "iPhone 15 Pro · Manila · Active now",
  "Chrome on MacBook · Makati · 2 hours ago"
];

export default function SecurityScreen() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen
      title="Security"
      subtitle="Session refresh and logout later connect through generated auth client calls. Device visibility is useful for user trust and support."
    >
      <SectionCard title="Devices" description="The real backend later connects device visibility through generated client calls.">
        <View style={{ gap: 10 }}>
          {demoDevices.map((device) => (
            <NavRow key={device} label={device} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Session actions" description="Demo logout only clears local state.">
        <PrimaryButton
          label="Log out"
          variant="danger"
          onPress={() => {
            logout();
            router.replace("/(public)/welcome");
          }}
        />
        <Text>Session refresh and logout later come from the generated auth client after backend exports OpenAPI.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/orders/success/[orderId].tsx`

```
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";
import { KeyValueRow } from "../../../../src/components/key-value-row";
import { PrimaryButton } from "../../../../src/components/primary-button";
import { formatQueueEntrySummary } from "../../../../src/lib/demo-data";

export default function OrderSuccessScreen() {
  const params = useLocalSearchParams<{ orderId: string }>();
  const orderId = params.orderId || "order-demo";
  const summary = formatQueueEntrySummary("entry-1001");

  return (
    <Screen
      title="Order paid"
      subtitle="Payment success is not the end page. It should turn into the queue conversion page."
    >
      <SectionCard title="Payment result" description="The real backend will create the queue entry after successful payment and basic risk pass.">
        <KeyValueRow label="Order ID" value={orderId} />
        <KeyValueRow label="Queue item" value={summary.title} />
        <KeyValueRow label="Current effective rank" value={summary.rankLabel} />
        <KeyValueRow label="Next settlement slot" value={summary.nextSlotLabel} />
        <KeyValueRow label="Eligible cashback base" value={summary.cashbackLabel} />
      </SectionCard>

      <SectionCard title="Next actions" description="Keep check-in active, watch the next slot, and review queue rules at any time.">
        <Text>• Daily check-in is user-level</Text>
        <Text>• Boost is order-level</Text>
        <Text>• Top30 remains protected</Text>
      </SectionCard>

      <PrimaryButton
        label="Open queue detail"
        onPress={() =>
          router.replace({
            pathname: "/(app)/queue/[entryId]",
            params: { entryId: "entry-1001" }
          })
        }
      />
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/privacy.tsx`

```
import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";

export default function PrivacyScreen() {
  return (
    <Screen
      title="Privacy policy"
      subtitle="The public web page and the in-app page must both exist for review readiness."
    >
      <SectionCard title="Policy outline" description="Replace this starter copy with legal-reviewed content before release.">
        <View style={{ gap: 8 }}>
          <Text>• What data the product collects and why.</Text>
          <Text>• Login, order, queue, wallet, support, and risk-related data uses.</Text>
          <Text>• Account deletion request process and retention exceptions.</Text>
          <Text>• Anti-fraud and risk retention where legally required.</Text>
          <Text>• Contact method for privacy questions.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Important note" description="This starter page is structural only, not final legal text.">
        <Text>Before store submission, replace this with your final privacy policy content and keep the web version aligned at /privacy.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/product/[productId].tsx`

```
import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { getProductById } from "../../../src/lib/demo-data";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string }>();
  const productId = params.productId || "prod-earbuds";
  const product = useMemo(() => getProductById(productId), [productId]);
  const { config } = useRuntimeConfig();
  const [quantity, setQuantity] = useState(1);

  const totalMinor = product.priceMinor * quantity;

  return (
    <Screen
      title={product.title}
      subtitle="One order contains one product only, but quantity may be greater than one."
    >
      <DemoBanner />

      <SectionCard title="Product summary" description={product.subtitle}>
        <KeyValueRow label="Unit price" value={formatMinorMoney(product.priceMinor)} />
        <KeyValueRow label="Queue cashback cap" value={formatMinorMoney(product.cashbackCapMinor)} />
        <KeyValueRow label="Stock" value={product.stockLabel} />
        <Text>There is no cart. Checkout starts directly from this page in MVP.</Text>
      </SectionCard>

      <SectionCard title="Choose quantity" description={`Default maximum quantity fallback is ${config.defaultOrderMaxQty}.`}>
        <KeyValueRow label="Current quantity" value={String(quantity)} emphasize />
        <KeyValueRow label="Estimated total" value={formatMinorMoney(totalMinor)} emphasize />
        <View style={{ flexDirection: "row", gap: 12 }}>
          <PrimaryButton
            label="−"
            variant="secondary"
            disabled={quantity <= 1}
            onPress={() => setQuantity((current) => Math.max(1, current - 1))}
          />
          <PrimaryButton
            label="+"
            disabled={quantity >= config.defaultOrderMaxQty}
            onPress={() => setQuantity((current) => Math.min(config.defaultOrderMaxQty, current + 1))}
          />
        </View>
      </SectionCard>

      <SectionCard title="What the order means" description="Quantity affects the payment amount, not the number of queue seats.">
        <Text>• One paid order equals one queue seat</Text>
        <Text>• Quantity does not create multiple seats</Text>
        <Text>• Split orders may still be reviewed by risk rules if behavior looks abnormal</Text>
      </SectionCard>

      <PrimaryButton
        label="Go to checkout"
        onPress={() =>
          router.push({
            pathname: "/(app)/checkout/[productId]",
            params: { productId: product.id, quantity: String(quantity) }
          })
        }
      />
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/queue/[entryId].tsx`

```
import { useMemo, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getQueueEntryById } from "../../../src/lib/demo-data";
import { getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function QueueDetailScreen() {
  const params = useLocalSearchParams<{ entryId: string }>();
  const entryId = params.entryId || "entry-1001";
  const entry = useMemo(() => getQueueEntryById(entryId), [entryId]);
  const { config } = useRuntimeConfig();
  const [boostUsedDemo, setBoostUsedDemo] = useState(entry.boostUsed);

  const isProtectedZone = typeof entry.currentRank === "number" && entry.currentRank <= config.protectZoneSize;
  const boostRemaining = Math.max(config.boostLimitPerEntry - boostUsedDemo, 0);
  const canBoost = entry.status === "ACTIVE" && boostRemaining > 0 && !isProtectedZone;

  const eventLog = [
    "Order paid and queue entry created",
    "Current effective rank recalculated",
    "User queue guard valid",
    boostUsedDemo > 0 ? `Boost used ${boostUsedDemo} time(s)` : "No boost used yet"
  ];

  return (
    <Screen
      title="Queue detail"
      subtitle="This page should explain exactly why the entry is active, frozen, winning, or removed."
    >
      <DemoBanner />

      <SectionCard
        title={entry.productTitle}
        description={`Order ${entry.orderId}`}
        rightSlot={<StatusPill label={entry.status} tone={getQueueStatusTone(entry.status)} />}
      >
        <KeyValueRow label="Current rank" value={entry.currentRank ? `#${entry.currentRank}` : "Not ranked"} />
        <KeyValueRow label="Next slot" value={formatDateTime(entry.nextSlotAt)} />
        <KeyValueRow label="Eligible cashback base" value={formatMinorMoney(entry.eligibleCashbackMinor)} />
        <KeyValueRow label="Boost remaining" value={String(boostRemaining)} emphasize />
      </SectionCard>

      <SectionCard title="Boost" description="Boost is order-level, limited per entry, and cannot cross the Top30 protection zone.">
        <Text>{isProtectedZone ? `This entry is already in Top${config.protectZoneSize}, so boost is disabled.` : "Boost can still be used if the backend confirms availability."}</Text>
        <PrimaryButton
          label={canBoost ? "Use demo boost" : "Boost unavailable"}
          disabled={!canBoost}
          onPress={() => setBoostUsedDemo((current) => current + 1)}
        />
      </SectionCard>

      <SectionCard title="Event log" description="Queue event trails should remain traceable for users and admins.">
        <View style={{ gap: 8 }}>
          {eventLog.map((eventItem) => (
            <Text key={eventItem}>• {eventItem}</Text>
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/rules/activity/[campaignId].tsx`

```
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";

export default function ActivityRulesScreen() {
  const params = useLocalSearchParams<{ campaignId: string }>();
  const campaignId = params.campaignId || "campaign-summer-2026";

  return (
    <Screen
      title="Activity rules"
      subtitle="Campaign and activity copy should later come from backend-managed content, not permanent page-level hardcoding."
    >
      <SectionCard title="Campaign snapshot" description={`Campaign ID: ${campaignId}`}>
        <View style={{ gap: 8 }}>
          <Text>• Activity scope may be limited to specific products or windows.</Text>
          <Text>• Activity copy should stay consistent with rule center and web public rules.</Text>
          <Text>• Rewarded ads remain off for the first review build.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Implementation note" description="This page is a starter placeholder until rules content is delivered by backend and CMS-like config.">
        <Text>Real frontend later consumes generated rules content contracts after backend registers and exports the public rules API.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/rules/index.tsx`

```
import { router } from "expo-router";
import { View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoRuleFaq } from "../../../src/lib/demo-data";

export default function RulesCenterScreen() {
  return (
    <Screen
      title="Rules center"
      subtitle="Rules must be reachable from all main flows. This is the hub page for queue, wallet, activity, legal, and support pages."
    >
      <DemoBanner />

      <SectionCard title="Open a rule page" description="These routes are fixed by the PRD and collaboration contract.">
        <View style={{ gap: 10 }}>
          <NavRow label="Queue rules" description="Rank, check-in, boost, freeze, and removal" onPress={() => router.push("/(app)/rules/queue")} />
          <NavRow label="Wallet rules" description="Pending, available, frozen, and withdrawals" onPress={() => router.push("/(app)/rules/wallet")} />
          <NavRow label="Activity rules" description="Campaign-specific rule detail" onPress={() => router.push({ pathname: "/(app)/rules/activity/[campaignId]", params: { campaignId: "campaign-summer-2026" } })} />
          <NavRow label="Privacy policy" description="In-app privacy page" onPress={() => router.push("/(app)/privacy")} />
          <NavRow label="Terms of service" description="In-app terms page" onPress={() => router.push("/(app)/terms")} />
          <NavRow label="Support" description="Customer service and appeal entry" onPress={() => router.push("/(app)/support")} />
          <NavRow label="Delete account" description="Request + settlement + anonymization path" onPress={() => router.push("/(app)/delete-account")} />
        </View>
      </SectionCard>

      <SectionCard title="FAQ snapshot">
        <View style={{ gap: 8 }}>
          {demoRuleFaq.map((item) => (
            <NavRow key={item} label={item} />
          ))}
        </View>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/rules/queue.tsx`

```
import { Text, View } from "react-native";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function QueueRulesScreen() {
  const { config } = useRuntimeConfig();

  return (
    <Screen
      title="Queue rules"
      subtitle="This page explains the public queue without black-box language."
    >
      <SectionCard title="Core queue logic" description="These are locked MVP rules from the PRD.">
        <View style={{ gap: 8 }}>
          <Text>• There is no cart in MVP.</Text>
          <Text>• One order contains one product, but quantity can be greater than one.</Text>
          <Text>• One order equals one queue seat.</Text>
          <Text>• Quantity affects money, not the number of seats.</Text>
          <Text>• Queue rank shown in the app is the current effective rank.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Check-in and freeze" description="Queue guard is user-level, not order-level.">
        <Text>• One check-in keeps all active entries valid for {config.baseGuardHours} hours.</Text>
        <Text>• After expiry, entries can become frozen first.</Text>
        <Text>• Grace lasts {config.freezeGraceHours} hours by default fallback config.</Text>
      </SectionCard>

      <SectionCard title="Boost and protection zone" description="Boost is order-level and strictly limited.">
        <Text>• Each order can use boost up to {config.boostLimitPerEntry} times.</Text>
        <Text>• Top{config.protectZoneSize} is the protected zone.</Text>
        <Text>• Protected-zone entries cannot be crossed by boost.</Text>
        <Text>• Entries already inside the protected zone cannot use boost again.</Text>
      </SectionCard>

      <SectionCard title="Settlement slots" description="Winning is tied to fixed slots, not instant first-place conversion.">
        <Text>• The system uses fixed settlement slots.</Text>
        <Text>• Each slot settles only the current effective #1 eligible entry.</Text>
        <Text>• Frozen entries keep their sort score but do not participate in effective ranking.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/rules/wallet.tsx`

```
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

export default function WalletRulesScreen() {
  const { config } = useRuntimeConfig();

  return (
    <Screen
      title="Wallet rules"
      subtitle="Wallet pages must explain pending, available, frozen, release, withdrawal, and general settlement exceptions."
    >
      <SectionCard title="Three visible balance buckets" description="Frontend only shows user-facing buckets and keeps negative display out of the UI.">
        <View style={{ gap: 8 }}>
          <Text>• Pending: newly created cashback that is not withdrawable yet.</Text>
          <Text>• Available: released cashback that can be used for withdrawal requests.</Text>
          <Text>• Frozen: money locked by a withdrawal process or review path.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Release path" description="Winning cashback should not become instantly withdrawable.">
        <Text>• Winner cashback first enters pending balance.</Text>
        <Text>• Release happens only after valid delivery truth and the observation period.</Text>
        <Text>• Default observation fallback is {config.observationHoursAfterDelivery} hours.</Text>
      </SectionCard>

      <SectionCard title="Withdrawal limits" description="These values are runtime-config driven.">
        <Text>• Minimum: {formatMinorMoney(config.withdrawMinAmountMinor)}</Text>
        <Text>• Single max: {formatMinorMoney(config.withdrawSingleMaxMinor)}</Text>
        <Text>• Daily max: {formatMinorMoney(config.withdrawDailyMaxMinor)}</Text>
      </SectionCard>

      <SectionCard title="Settlement exceptions" description="Internal recoverable debt is a backend field and should not leak as a negative wallet figure.">
        <Text>• The app only needs a general hint such as “There is a settlement exception to resolve.”</Text>
        <Text>• Detailed debt math stays on backend and admin views.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/support.tsx`

```
import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";

export default function SupportScreen() {
  return (
    <Screen
      title="Support"
      subtitle="App copy can say Support / Contact Us, while the public web route remains locked to /contact."
    >
      <SectionCard title="Contact channels" description="Replace placeholder details with your real support channels before release.">
        <View style={{ gap: 8 }}>
          <Text>• Email: support@queuefree.com</Text>
          <Text>• Support hours: Mon–Sat, 09:00–18:00 Asia/Manila</Text>
          <Text>• Use this channel for order, queue, withdrawal, or account concerns.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Appeal path" description="Users should have a clear support and appeal route for queue, risk, and withdrawal issues.">
        <Text>Keep support reachable from home, queue, wallet, and me pages.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/terms.tsx`

```
import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";

export default function TermsScreen() {
  return (
    <Screen
      title="Terms of service"
      subtitle="This page is the in-app terms entry for store review readiness."
    >
      <SectionCard title="Terms outline" description="Replace this starter copy with legal-reviewed terms before release.">
        <View style={{ gap: 8 }}>
          <Text>• User eligibility and account rules.</Text>
          <Text>• Order, payment, refund, queue, and wallet behavior.</Text>
          <Text>• Suspension, review, and support escalation handling.</Text>
          <Text>• Account deletion process and legal exceptions.</Text>
          <Text>• Contact method and governing terms notice.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Important note" description="This starter page is structural only, not final legal text.">
        <Text>Before store submission, replace this with your final terms content and keep the web version aligned at /terms.</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(app)/wallet/withdraw.tsx`

```
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { formatMinorMoney } from "@queuefree/shared";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

const schema = z.object({
  amountMinor: z
    .string()
    .regex(/^\d+$/, "Amount must be a whole-number minor unit string.")
    .min(1, "Amount is required."),
  accountName: z.string().min(2, "Please enter the account name."),
  accountNumber: z.string().min(4, "Please enter the account number.")
});

type FormValues = z.infer<typeof schema>;

export default function WithdrawScreen() {
  const { config } = useRuntimeConfig();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountMinor: String(config.withdrawMinAmountMinor),
      accountName: "",
      accountNumber: ""
    }
  });

  const submit = form.handleSubmit((values) => {
    const amount = Number(values.amountMinor);

    if (amount < config.withdrawMinAmountMinor || amount > config.withdrawSingleMaxMinor) {
      form.setError("amountMinor", {
        type: "manual",
        message: `Amount should stay between ${formatMinorMoney(config.withdrawMinAmountMinor)} and ${formatMinorMoney(config.withdrawSingleMaxMinor)}.`
      });
      return;
    }

    setSubmitted(true);
  });

  return (
    <Screen
      title="Withdraw"
      subtitle="The MVP keeps min, single-max, and daily-max values in runtime config, not in page-level hardcoded constants."
    >
      <SectionCard title="Withdrawal limits" description="These are default fallback values until backend runtime config is connected.">
        <Text>Minimum: {formatMinorMoney(config.withdrawMinAmountMinor)}</Text>
        <Text>Single max: {formatMinorMoney(config.withdrawSingleMaxMinor)}</Text>
        <Text>Daily max: {formatMinorMoney(config.withdrawDailyMaxMinor)}</Text>
      </SectionCard>

      <SectionCard title="Submit a withdrawal" description="The real backend later connects generated withdrawal submission plus server-side risk review.">
        <Controller
          control={form.control}
          name="amountMinor"
          render={({ field, fieldState }) => (
            <TextField
              label="Amount (minor unit integer)"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="50000"
              keyboardType="number-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="accountName"
          render={({ field, fieldState }) => (
            <TextField
              label="Account name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Juan Dela Cruz"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="accountNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Account number"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="09123456789"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Submit demo withdrawal" onPress={submit} />
        {submitted ? <Text>Demo withdrawal submitted. Real backend later moves the status through APPLIED / RISK_REVIEW / PROCESSING / SUCCESS or failure states.</Text> : null}
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(public)/_layout.tsx`

```
import { Stack } from "expo-router";

export default function PublicLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
```

## `apps/mobile/app/(public)/auth/otp.tsx`

```
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { z } from "zod";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { PrimaryButton } from "../../../src/components/primary-button";
import { TextField } from "../../../src/components/text-field";
import { useAuthStore } from "../../../src/store/auth-store";

const schema = z.object({
  otpCode: z
    .string()
    .length(6, "Please enter the 6-digit OTP.")
    .regex(/^\d+$/, "OTP should be numeric.")
});

type FormValues = z.infer<typeof schema>;

export default function OtpScreen() {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const login = useAuthStore((state) => state.login);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      otpCode: ""
    }
  });

  const submit = form.handleSubmit(() => {
    login(phoneNumber || "+63 912 345 6789");
    router.replace("/(app)/(tabs)/home");
  });

  return (
    <Screen
      title="Verify OTP"
      subtitle={`We are using a demo flow now. Enter any 6 digits to continue for ${phoneNumber || "your phone number"}.`}
    >
      <SectionCard title="Step 2" description="Real backend flow later verifies the OTP through generated OpenAPI client calls.">
        <Controller
          control={form.control}
          name="otpCode"
          render={({ field, fieldState }) => (
            <TextField
              label="OTP code"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="123456"
              keyboardType="number-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Verify and enter app" onPress={submit} />
        <PrimaryButton
          label="Back to phone step"
          variant="secondary"
          onPress={() => router.back()}
        />
      </SectionCard>

      <SectionCard title="Reminder" description="The real app must keep privacy policy, terms, support, rules, and delete account access available in-app.">
        <Text>• Language stays English for MVP</Text>
        <Text>• No country selector in MVP</Text>
        <Text>• Session refresh later comes from the generated auth client after backend exports OpenAPI</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(public)/auth/phone.tsx`

```
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { PrimaryButton } from "../../../src/components/primary-button";
import { TextField } from "../../../src/components/text-field";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { useAuthStore } from "../../../src/store/auth-store";

const schema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(16, "Phone number is too long."),
  inviteCode: z.string().max(24, "Invite code is too long.").optional().or(z.literal("")),
  agreeToLegal: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the privacy policy and terms before continuing." })
  })
});

type FormValues = z.infer<typeof schema>;

export default function PhoneAuthScreen() {
  const setPhoneNumber = useAuthStore((state) => state.setPhoneNumber);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      inviteCode: "",
      agreeToLegal: false as never
    }
  });

  const submit = form.handleSubmit((values) => {
    setPhoneNumber(values.phoneNumber);
    router.push("/(public)/auth/otp");
  });

  return (
    <Screen
      title="Phone sign in"
      subtitle="Use one phone number for both registration and login. Invite code binding stays optional."
    >
      <SectionCard title="Step 1" description="Enter your phone number and confirm legal consent.">
        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Phone number"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="+63 9xx xxx xxxx"
              keyboardType="phone-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="inviteCode"
          render={({ field, fieldState }) => (
            <TextField
              label="Invite code (optional)"
              value={field.value ?? ""}
              onChangeText={field.onChange}
              placeholder="QUEUEFREE2026"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="agreeToLegal"
          render={({ field, fieldState }) => (
            <View style={{ gap: 6 }}>
              <CheckboxRow
                checked={Boolean(field.value)}
                onPress={() => field.onChange(!field.value)}
                label="I agree to the Privacy Policy and Terms of Service."
                hint="The app will keep in-app privacy, terms, support, and delete account access."
              />
              {fieldState.error ? <Text style={{ color: "#B91C1C", fontSize: 12 }}>{fieldState.error.message}</Text> : null}
            </View>
          )}
        />

        <PrimaryButton label="Send demo OTP" onPress={submit} />
      </SectionCard>

      <SectionCard title="What happens next" description="OTP success will create the user account, default wallet, and default queue guard record on the real backend.">
        <Text>• This starter uses demo flow only</Text>
        <Text>• Backend should later register and export the OTP send contract through OpenAPI</Text>
        <Text>• Frontend should swap mock flow after OpenAPI SDK is generated</Text>
      </SectionCard>
    </Screen>
  );
}
```

## `apps/mobile/app/(public)/welcome.tsx`

```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { PrimaryButton } from "../../src/components/primary-button";
import { DemoBanner } from "../../src/components/demo-banner";

export default function WelcomeScreen() {
  return (
    <Screen
      title="QueueFree"
      subtitle="Buy real products, join the public queue, and follow transparent rules."
    >
      <DemoBanner />

      <SectionCard
        title="How it works"
        description="The MVP path is simple: browse products, pay for a real product, then your paid order may enter the public queue."
      >
        <Text>• No cart in MVP</Text>
        <Text>• One order equals one queue seat</Text>
        <Text>• Cashback may apply based on public queue rules</Text>
      </SectionCard>

      <SectionCard
        title="What stays transparent"
        description="Current effective rank, check-in status, next settlement slot, and wallet states are all visible in the app."
      >
        <Text>• Queue rank is current effective rank</Text>
        <Text>• Top30 is a protected zone</Text>
        <Text>• Cashback goes to pending first, then may become withdrawable later</Text>
      </SectionCard>

      <SectionCard
        title="Launch baseline"
        description="The first launch is fixed to PH / PHP / Asia/Manila / English."
      >
        <Text>• No country selector in MVP</Text>
        <Text>• No guaranteed income language</Text>
        <Text>• Rewarded ads stay off for the first review build</Text>
      </SectionCard>

      <View style={{ gap: 12 }}>
        <PrimaryButton label="Continue with phone" onPress={() => router.push("/(public)/auth/phone")} />
        <PrimaryButton
          label="Preview home directly"
          variant="secondary"
          onPress={() => router.push("/(app)/(tabs)/home")}
        />
      </View>
    </Screen>
  );
}
```

## `apps/mobile/app/_layout.tsx`

```
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProviders } from "../src/providers/app-providers";

export default function RootLayout() {
  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </AppProviders>
  );
}
```

## `apps/mobile/app/index.tsx`

```
import { Redirect } from "expo-router";
import { useAuthStore } from "../src/store/auth-store";

export default function IndexScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <Redirect href={isAuthenticated ? "/(app)/(tabs)/home" : "/(public)/welcome"} />;
}
```

## `apps/mobile/app.json`

```
{
  "expo": {
    "name": "QueueFree",
    "slug": "queuefree-mobile",
    "version": "0.1.0",
    "scheme": "queuefree",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "plugins": ["expo-router"],
    "ios": {
      "supportsTablet": false,
      "bundleIdentifier": "com.queuefree.mobile"
    },
    "android": {
      "package": "com.queuefree.mobile"
    },
    "extra": {
      "eas": {
        "projectId": "REPLACE_ME_LATER"
      }
    }
  }
}
```

## `apps/mobile/babel.config.js`

```
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"]
  };
};
```

## `apps/mobile/expo-env.d.ts`

```
/// <reference types="expo/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_APP_ENV?: string;
    EXPO_PUBLIC_API_BASE_URL?: string;
    EXPO_PUBLIC_WEB_BASE_URL?: string;
    EXPO_PUBLIC_SENTRY_DSN?: string;
    EXPO_PUBLIC_POSTHOG_KEY?: string;
    EXPO_PUBLIC_POSTHOG_HOST?: string;
  }
}
```

## `apps/mobile/package.json`

```
{
  "name": "@queuefree/mobile",
  "private": true,
  "version": "0.1.0",
  "main": "expo-router/entry",
  "scripts": {
    "dev": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@queuefree/api-client": "workspace:*",
    "@queuefree/shared": "workspace:*",
    "@queuefree/ui-tokens": "workspace:*",
    "@tanstack/react-query": "^5.66.0",
    "expo": "^54.0.0",
    "expo-constants": "^18.0.0",
    "expo-router": "^6.0.0",
    "expo-status-bar": "^3.0.0",
    "expo-system-ui": "^6.0.0",
    "react": "^19.1.0",
    "react-hook-form": "^7.62.0",
    "react-native": "^0.81.0",
    "react-native-gesture-handler": "^2.28.0",
    "react-native-safe-area-context": "^5.6.0",
    "react-native-screens": "^4.16.0",
    "zod": "^3.25.0",
    "zustand": "^5.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.1.10",
    "babel-preset-expo": "^54.0.0",
    "typescript": "^5.8.3"
  }
}
```

## `apps/mobile/src/components/checkbox-row.tsx`

```
import { Pressable, StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type CheckboxRowProps = {
  checked: boolean;
  onPress: () => void;
  label: string;
  hint?: string;
};

export function CheckboxRow({ checked, onPress, label, hint }: CheckboxRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={[styles.box, checked ? styles.boxChecked : null]}>
        {checked ? <Text style={styles.checkMark}>✓</Text> : null}
      </View>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: mobileTheme.spacing.sm
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    backgroundColor: mobileTheme.colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2
  },
  boxChecked: {
    backgroundColor: mobileTheme.colors.brand,
    borderColor: mobileTheme.colors.brand
  },
  checkMark: {
    color: "#ffffff",
    fontWeight: "700"
  },
  textBox: {
    flex: 1,
    gap: 4
  },
  label: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 14,
    lineHeight: 20
  },
  hint: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 18
  }
});
```

## `apps/mobile/src/components/demo-banner.tsx`

```
import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

export function DemoBanner() {
  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Demo mode</Text>
      <Text style={styles.text}>
        This screen uses local mock data for now. Replace it with generated OpenAPI SDK calls after backend exports OpenAPI.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: mobileTheme.colors.infoSoft,
    borderRadius: mobileTheme.radius.md,
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.xs
  },
  title: {
    color: mobileTheme.colors.info,
    fontWeight: "700"
  },
  text: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  }
});
```

## `apps/mobile/src/components/empty-state.tsx`

```
import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: mobileTheme.colors.surfaceMuted,
    borderRadius: mobileTheme.radius.lg,
    padding: mobileTheme.spacing.lg,
    gap: mobileTheme.spacing.xs
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: mobileTheme.colors.textPrimary
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: mobileTheme.colors.textSecondary
  }
});
```

## `apps/mobile/src/components/key-value-row.tsx`

```
import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type KeyValueRowProps = {
  label: string;
  value: string;
  emphasize?: boolean;
};

export function KeyValueRow({ label, value, emphasize = false }: KeyValueRowProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, emphasize ? styles.emphasize : null]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: mobileTheme.spacing.md
  },
  label: {
    flex: 1,
    color: mobileTheme.colors.textSecondary,
    fontSize: 14
  },
  value: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right"
  },
  emphasize: {
    fontWeight: "700"
  }
});
```

## `apps/mobile/src/components/nav-row.tsx`

```
import { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type NavRowProps = {
  label: string;
  description?: string;
  rightSlot?: ReactNode;
  onPress?: () => void;
};

export function NavRow({ label, description, rightSlot, onPress }: NavRowProps) {
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <View style={styles.textBox}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <View style={styles.right}>
        {rightSlot}
        <Text style={styles.chevron}>›</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 56,
    borderRadius: mobileTheme.radius.md,
    paddingHorizontal: mobileTheme.spacing.md,
    paddingVertical: mobileTheme.spacing.sm,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: mobileTheme.spacing.md
  },
  textBox: {
    flex: 1,
    gap: 4
  },
  label: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: "600",
    fontSize: 15
  },
  description: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: mobileTheme.spacing.xs
  },
  chevron: {
    fontSize: 20,
    color: mobileTheme.colors.textMuted
  }
});
```

## `apps/mobile/src/components/primary-button.tsx`

```
import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "brand" | "secondary" | "danger";
  disabled?: boolean;
  loading?: boolean;
  leftSlot?: ReactNode;
};

export function PrimaryButton({
  label,
  onPress,
  variant = "brand",
  disabled = false,
  loading = false,
  leftSlot
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        isDisabled ? styles.disabled : null,
        pressed && !isDisabled ? styles.pressed : null
      ]}
    >
      {loading ? <ActivityIndicator color="#ffffff" /> : leftSlot}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 48,
    borderRadius: mobileTheme.radius.md,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: mobileTheme.spacing.sm,
    paddingHorizontal: mobileTheme.spacing.md
  },
  label: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15
  },
  disabled: {
    opacity: 0.55
  },
  pressed: {
    transform: [{ scale: 0.99 }]
  }
});

const variantStyles = StyleSheet.create({
  brand: {
    backgroundColor: mobileTheme.colors.brand
  },
  secondary: {
    backgroundColor: mobileTheme.colors.textSecondary
  },
  danger: {
    backgroundColor: mobileTheme.colors.danger
  }
});
```

## `apps/mobile/src/components/screen.tsx`

```
import { PropsWithChildren, ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mobileTheme } from "@queuefree/ui-tokens";

type ScreenProps = PropsWithChildren<{
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  scrollable?: boolean;
}>;

export function Screen({
  children,
  title,
  subtitle,
  rightSlot,
  scrollable = true
}: ScreenProps) {
  const content = (
    <View style={styles.inner}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {rightSlot ? <View>{rightSlot}</View> : null}
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      {scrollable ? <ScrollView contentContainerStyle={styles.content}>{content}</ScrollView> : <View style={styles.content}>{content}</View>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: mobileTheme.colors.background
  },
  content: {
    flexGrow: 1
  },
  inner: {
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.md
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: mobileTheme.spacing.md
  },
  headerText: {
    flex: 1,
    gap: mobileTheme.spacing.xs
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: mobileTheme.colors.textPrimary
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: mobileTheme.colors.textSecondary
  }
});
```

## `apps/mobile/src/components/section-card.tsx`

```
import { PropsWithChildren, ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type SectionCardProps = PropsWithChildren<{
  title?: string;
  description?: string;
  rightSlot?: ReactNode;
}>;

export function SectionCard({ children, title, description, rightSlot }: SectionCardProps) {
  return (
    <View style={styles.card}>
      {title || description || rightSlot ? (
        <View style={styles.header}>
          <View style={styles.headerText}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {description ? <Text style={styles.description}>{description}</Text> : null}
          </View>
          {rightSlot ? <View>{rightSlot}</View> : null}
        </View>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.lg,
    padding: mobileTheme.spacing.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    gap: mobileTheme.spacing.sm
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: mobileTheme.spacing.md
  },
  headerText: {
    flex: 1,
    gap: mobileTheme.spacing.xs
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: mobileTheme.colors.textPrimary
  },
  description: {
    fontSize: 13,
    lineHeight: 18,
    color: mobileTheme.colors.textSecondary
  }
});
```

## `apps/mobile/src/components/status-pill.tsx`

```
import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type StatusPillProps = {
  label: string;
  tone?: "brand" | "success" | "warning" | "danger" | "neutral";
};

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return (
    <View style={[styles.base, toneStyles[tone].container]}>
      <Text style={[styles.text, toneStyles[tone].text]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 10,
    minHeight: 28,
    borderRadius: mobileTheme.radius.pill,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start"
  },
  text: {
    fontSize: 12,
    fontWeight: "700"
  }
});

const toneStyles = StyleSheet.create({
  brand: {
    container: { backgroundColor: mobileTheme.colors.brandSoft },
    text: { color: mobileTheme.colors.brand }
  },
  success: {
    container: { backgroundColor: mobileTheme.colors.successSoft },
    text: { color: mobileTheme.colors.success }
  },
  warning: {
    container: { backgroundColor: mobileTheme.colors.warningSoft },
    text: { color: mobileTheme.colors.warning }
  },
  danger: {
    container: { backgroundColor: mobileTheme.colors.dangerSoft },
    text: { color: mobileTheme.colors.danger }
  },
  neutral: {
    container: { backgroundColor: mobileTheme.colors.surfaceMuted },
    text: { color: mobileTheme.colors.textSecondary }
  }
});
```

## `apps/mobile/src/components/text-field.tsx`

```
import { StyleSheet, Text, TextInput, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

type TextFieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  keyboardType?: "default" | "phone-pad" | "number-pad";
  secureTextEntry?: boolean;
  errorText?: string;
};

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  errorText
}: TextFieldProps) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={[styles.input, errorText ? styles.inputError : null]}
        placeholderTextColor={mobileTheme.colors.textMuted}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    gap: 8
  },
  label: {
    color: mobileTheme.colors.textPrimary,
    fontWeight: "600",
    fontSize: 14
  },
  input: {
    minHeight: 48,
    backgroundColor: mobileTheme.colors.surface,
    borderRadius: mobileTheme.radius.md,
    paddingHorizontal: mobileTheme.spacing.md,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    color: mobileTheme.colors.textPrimary
  },
  inputError: {
    borderColor: mobileTheme.colors.danger
  },
  error: {
    color: mobileTheme.colors.danger,
    fontSize: 12
  }
});
```

## `apps/mobile/src/hooks/use-runtime-config.ts`

```
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEFAULT_RUNTIME_CONFIG } from "@queuefree/shared";
import { useRuntimeConfigStore } from "../store/runtime-config-store";

async function loadRuntimeConfig() {
  return DEFAULT_RUNTIME_CONFIG;
}

export function useRuntimeConfig() {
  const replaceRuntimeConfig = useRuntimeConfigStore((state) => state.replaceRuntimeConfig);
  const config = useRuntimeConfigStore((state) => state.config);

  const query = useQuery({
    queryKey: ["runtime-config"],
    queryFn: loadRuntimeConfig,
    staleTime: 60_000
  });

  useEffect(() => {
    if (query.data) {
      replaceRuntimeConfig(query.data);
    }
  }, [query.data, replaceRuntimeConfig]);

  return {
    ...query,
    config
  };
}
```

## `apps/mobile/src/lib/demo-data.ts`

```
import {
  DEFAULT_RUNTIME_CONFIG,
  formatDateTime,
  formatMinorMoney,
  type InviteRelationStatus,
  type QueueEntryStatus,
  type UserQueueGuardStatus,
  type WithdrawalStatus
} from "@queuefree/shared";

export type ProductCardModel = {
  id: string;
  title: string;
  subtitle: string;
  priceMinor: number;
  cashbackCapMinor: number;
  stockLabel: string;
};

export type QueueEntryCardModel = {
  id: string;
  orderId: string;
  productTitle: string;
  status: QueueEntryStatus;
  currentRank: number | null;
  boostUsed: number;
  nextSlotAt: string;
  eligibleCashbackMinor: number;
};

export type TaskCardModel = {
  id: string;
  title: string;
  rewardLabel: string;
  progressLabel: string;
  claimable: boolean;
};

export type InviteRecordModel = {
  id: string;
  maskedPhone: string;
  status: InviteRelationStatus;
  reason: string;
};

export type WalletLedgerModel = {
  id: string;
  title: string;
  amountMinor: number;
  createdAt: string;
};

export type WithdrawalRecordModel = {
  id: string;
  amountMinor: number;
  status: WithdrawalStatus;
  createdAt: string;
};

export const demoProducts: ProductCardModel[] = [
  {
    id: "prod-iphone-case",
    title: "Premium Phone Case",
    subtitle: "Real product · Queue eligible",
    priceMinor: 59900,
    cashbackCapMinor: 120000,
    stockLabel: "Soft reserved stock available"
  },
  {
    id: "prod-earbuds",
    title: "Wireless Earbuds",
    subtitle: "Popular item · Fast checkout flow",
    priceMinor: 149900,
    cashbackCapMinor: 200000,
    stockLabel: "12 units left today"
  },
  {
    id: "prod-bottle",
    title: "Insulated Bottle",
    subtitle: "Daily essentials · Queue eligible",
    priceMinor: 79900,
    cashbackCapMinor: 100000,
    stockLabel: "Open for queue entry"
  }
];

export const demoQueueEntries: QueueEntryCardModel[] = [
  {
    id: "entry-1001",
    orderId: "order-9001",
    productTitle: "Wireless Earbuds",
    status: "ACTIVE",
    currentRank: 41,
    boostUsed: 1,
    nextSlotAt: "2026-03-11T13:00:00.000Z",
    eligibleCashbackMinor: 149900
  },
  {
    id: "entry-1002",
    orderId: "order-9002",
    productTitle: "Premium Phone Case",
    status: "FROZEN",
    currentRank: null,
    boostUsed: 0,
    nextSlotAt: "2026-03-11T17:00:00.000Z",
    eligibleCashbackMinor: 59900
  },
  {
    id: "entry-1003",
    orderId: "order-9003",
    productTitle: "Insulated Bottle",
    status: "WON_PENDING_RELEASE",
    currentRank: 1,
    boostUsed: 2,
    nextSlotAt: "2026-03-11T09:00:00.000Z",
    eligibleCashbackMinor: 79900
  }
];

export const demoTasks: TaskCardModel[] = [
  {
    id: "task-welcome",
    title: "Complete your first sign-in",
    rewardLabel: "Queue guard extension",
    progressLabel: "1 / 1",
    claimable: true
  },
  {
    id: "task-profile",
    title: "Add your first address",
    rewardLabel: "Trust progress +1",
    progressLabel: "0 / 1",
    claimable: false
  },
  {
    id: "task-repeat",
    title: "Place a second order",
    rewardLabel: "Activity fragments",
    progressLabel: "1 / 2",
    claimable: false
  }
];

export const demoInviteRecords: InviteRecordModel[] = [
  {
    id: "invite-1",
    maskedPhone: "+63 9*** *** 204",
    status: "EFFECTIVE",
    reason: "Wallet activation path completed"
  },
  {
    id: "invite-2",
    maskedPhone: "+63 9*** *** 883",
    status: "PENDING_EFFECTIVE",
    reason: "Cooling-off window still running"
  },
  {
    id: "invite-3",
    maskedPhone: "+63 9*** *** 771",
    status: "INVALID",
    reason: "Expired bind window"
  }
];

export const demoWallet = {
  activationLabel: "Invite or trust task required",
  pendingBalanceMinor: 79900,
  availableBalanceMinor: 188000,
  frozenBalanceMinor: 50000,
  showRecoverableDebtHint: false
};

export const demoLedgers: WalletLedgerModel[] = [
  {
    id: "ledger-1",
    title: "Cashback pending created",
    amountMinor: 79900,
    createdAt: "2026-03-11T09:01:00.000Z"
  },
  {
    id: "ledger-2",
    title: "Withdrawal submitted",
    amountMinor: -50000,
    createdAt: "2026-03-10T07:10:00.000Z"
  },
  {
    id: "ledger-3",
    title: "Cashback released",
    amountMinor: 188000,
    createdAt: "2026-03-08T15:00:00.000Z"
  }
];

export const demoWithdrawals: WithdrawalRecordModel[] = [
  {
    id: "wd-1",
    amountMinor: 50000,
    status: "PROCESSING",
    createdAt: "2026-03-10T07:10:00.000Z"
  },
  {
    id: "wd-2",
    amountMinor: 120000,
    status: "SUCCESS",
    createdAt: "2026-03-08T08:10:00.000Z"
  }
];

export const demoProfile = {
  displayName: "QueueFree Demo User",
  phoneNumber: "+63 912 345 6789",
  marketLabel: `${DEFAULT_RUNTIME_CONFIG.marketCode} · ${DEFAULT_RUNTIME_CONFIG.currencyCode}`,
  timezoneLabel: DEFAULT_RUNTIME_CONFIG.timezone
};

export const demoGuard = {
  status: "VALID" as UserQueueGuardStatus,
  validUntil: "2026-03-12T11:00:00.000Z",
  graceUntil: "2026-03-15T11:00:00.000Z"
};

export const demoRuleFaq = [
  "Buy a real product, then the paid order may join the public queue.",
  "Queue rank is the current effective rank, not a historical absolute number.",
  "Each order gets one queue seat. Quantity changes money, not seat count.",
  "Boost works at order level and cannot cross the Top30 protection zone."
];

export function getProductById(productId: string) {
  return demoProducts.find((item) => item.id === productId) ?? demoProducts[0];
}

export function getQueueEntryById(entryId: string) {
  return demoQueueEntries.find((item) => item.id === entryId) ?? demoQueueEntries[0];
}

export function formatQueueEntrySummary(entryId: string) {
  const entry = getQueueEntryById(entryId);

  return {
    title: entry.productTitle,
    rankLabel: entry.currentRank ? `#${entry.currentRank}` : "Frozen",
    nextSlotLabel: formatDateTime(entry.nextSlotAt),
    cashbackLabel: formatMinorMoney(entry.eligibleCashbackMinor)
  };
}
```

## `apps/mobile/src/lib/env.ts`

```
export const appEnv = {
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? ''
} as const;
```

## `apps/mobile/src/lib/status-maps.ts`

```
import type {
  InviteRelationStatus,
  QueueEntryStatus,
  UserQueueGuardStatus,
  WithdrawalStatus
} from "@queuefree/shared";

type Tone = "brand" | "success" | "warning" | "danger" | "neutral";

export function getQueueStatusTone(status: QueueEntryStatus): Tone {
  switch (status) {
    case "ACTIVE":
      return "brand";
    case "WON_PENDING_RELEASE":
    case "CASHBACK_RELEASED":
      return "success";
    case "FROZEN":
      return "warning";
    case "REMOVED":
    case "CLAWBACK_DONE":
      return "danger";
    default:
      return "neutral";
  }
}

export function getInviteStatusTone(status: InviteRelationStatus): Tone {
  switch (status) {
    case "EFFECTIVE":
      return "success";
    case "PENDING_EFFECTIVE":
      return "warning";
    case "INVALID":
      return "danger";
    default:
      return "brand";
  }
}

export function getWithdrawalStatusTone(status: WithdrawalStatus): Tone {
  switch (status) {
    case "SUCCESS":
      return "success";
    case "PROCESSING":
    case "RISK_REVIEW":
      return "warning";
    case "FAILED":
    case "REJECTED":
    case "REVERSED":
      return "danger";
    default:
      return "brand";
  }
}

export function getGuardStatusTone(status: UserQueueGuardStatus): Tone {
  return status === "VALID" ? "success" : "warning";
}
```

## `apps/mobile/src/providers/app-providers.tsx`

```
import { PropsWithChildren } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryProvider } from "./query-provider";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryProvider>{children}</QueryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
```

## `apps/mobile/src/providers/query-provider.tsx`

```
import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: PropsWithChildren) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0
          }
        }
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

## `apps/mobile/src/store/auth-store.ts`

```
import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  phoneNumber: string;
  accessToken: string;
  setPhoneNumber: (phoneNumber: string) => void;
  login: (phoneNumber: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  phoneNumber: "",
  accessToken: "",
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  login: (phoneNumber) =>
    set({
      isAuthenticated: true,
      phoneNumber,
      accessToken: `demo-token-for-${phoneNumber}`
    }),
  logout: () =>
    set({
      isAuthenticated: false,
      phoneNumber: "",
      accessToken: ""
    })
}));
```

## `apps/mobile/src/store/runtime-config-store.ts`

```
import { create } from "zustand";
import { DEFAULT_RUNTIME_CONFIG, type RuntimeConfig } from "@queuefree/shared";

type RuntimeConfigState = {
  config: RuntimeConfig;
  replaceRuntimeConfig: (config: RuntimeConfig) => void;
};

export const useRuntimeConfigStore = create<RuntimeConfigState>((set) => ({
  config: DEFAULT_RUNTIME_CONFIG,
  replaceRuntimeConfig: (config) => set({ config })
}));
```

## `apps/mobile/tsconfig.json`

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "types": ["node"],
    "allowSyntheticDefaultImports": true
  },
  "include": ["app/**/*.ts", "app/**/*.tsx", "src/**/*.ts", "src/**/*.tsx", "expo-env.d.ts"]
}
```

## `apps/web/.env.example`

```
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_WEB_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

## `apps/web/app/contact/page.tsx`

```
import Link from 'next/link';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { ButtonLink } from '@/components/ui/button';

const contactTopics = [
  {
    title: 'Order & queue questions',
    body: 'Use this path when the user needs help with order payment, queue status, ranking changes, freeze, restore, or slot settlement visibility.'
  },
  {
    title: 'Wallet & withdrawal questions',
    body: 'Use this path for pending balance, available balance, activation, withdrawal review, rejection, or payout investigation.'
  },
  {
    title: 'Account deletion & appeal',
    body: 'Use this path when the user wants deletion guidance, settlement blockers, or appeal support for moderation and risk decisions.'
  }
] as const;

export default function ContactPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Contact & Appeal"
          title="Public support entry for users, reviewers, and partners"
          description="This page exists to keep a public contact and appeal route on the launch website. The in-app support entry remains part of the mobile flow."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Current launch intent</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Public contact path for web review</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">In-app support entry for logged-in users</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Appeal route for deletion, queue, wallet, or risk issues</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-3">
          {contactTopics.map((topic, index) => (
            <SectionCard
              key={topic.title}
              title={topic.title}
              body={topic.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'accent' : 'warning'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">What to publish before launch</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <p>
              The public route is already fixed as <span className="font-semibold text-slate-950">/contact</span>.
              This starter keeps the compliance page in place even before a live ticketing or email adapter is wired.
            </p>
            <p>
              When the server thread finishes deployment wiring, this page can be upgraded to point at the final support mailbox, ticket form, or CRM workflow without changing the public route.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/rules" variant="primary">Rules Center</ButtonLink>
            <ButtonLink href="/delete-account" variant="secondary">Delete Account</ButtonLink>
            <Link href="/privacy" className="inline-flex items-center text-sm font-semibold text-brand hover:underline">
              Privacy Policy
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/delete-account/page.tsx`

```
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { deleteAccountBlockers, deleteAccountFlow, deleteStatusList } from '@/lib/site-content';

export default function DeleteAccountPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Delete Account"
          title="Deletion means request, settlement, then anonymization"
          description="QueueFree must keep a public delete-account guidance page and an in-app deletion entry. The launch flow does not promise instant physical deletion."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="Before anonymization"
            body={deleteAccountFlow.join(' ')}
            tone="brand"
          />
          <SectionCard
            title="Common blockers"
            body={deleteAccountBlockers.join(' ')}
            tone="warning"
          />
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Deletion statuses</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {deleteStatusList.map((status) => (
              <div key={status} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {status}
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              While settlement is pending, the account cannot create new orders, add withdrawal accounts, file new
              withdrawals, or bind a new invite code.
            </p>
            <p>
              Active, frozen, or review-held queue entries leave the ranking with the unified deletion-removal reason in the backend flow.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/error.tsx`

```
'use client';

import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <PageShell>
      <Card className="border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Public page error</div>
          <p className="text-sm text-slate-700">
            This public page failed to render. Retry the route. If the failure persists after real API integration, check the generated client and the deployed content source.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}
```

## `apps/web/app/globals.css`

```
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 248 250 252;
  --foreground: 15 23 42;
  --muted: 100 116 139;
  --border: 226 232 240;
  --brand: 37 99 235;
  --brand-soft: 219 234 254;
  --accent: 15 118 110;
  --accent-soft: 204 251 241;
  --warning: 180 83 9;
  --warning-soft: 254 243 199;
  --danger: 185 28 28;
  --danger-soft: 254 226 226;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

p {
  line-height: 1.7;
}

::selection {
  background: rgba(37, 99, 235, 0.18);
}
```

## `apps/web/app/layout.tsx`

```
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LAUNCH_WEBSITE } from '@queuefree/shared';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { publicAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(publicAppEnv.webBaseUrl || `https://${LAUNCH_WEBSITE}`),
  title: {
    default: 'QueueFree',
    template: '%s | QueueFree'
  },
  description: 'QueueFree public website for product overview, rules, privacy, terms, account deletion, and contact guidance.',
  openGraph: {
    title: 'QueueFree',
    description: 'Shopping-first public queue promotion with public rules and compliance pages.',
    url: `https://${LAUNCH_WEBSITE}`,
    siteName: 'QueueFree'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
```

## `apps/web/app/loading.tsx`

```
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <PageShell>
      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading public page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </PageShell>
  );
}
```

## `apps/web/app/not-found.tsx`

```
import { ButtonLink } from '@/components/ui/button';
import { PageShell } from '@/components/page-shell';

export default function NotFound(): React.ReactElement {
  return (
    <PageShell>
      <div className="rounded-[2rem] border border-border bg-white p-10 text-center shadow-panel">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">Page not found</h1>
        <p className="mt-4 text-sm text-slate-600">
          The requested page is not part of the public launch route set. Use the rules center or homepage instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/rules" variant="secondary">Rules Center</ButtonLink>
        </div>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/page.tsx`

```
import {
  DEFAULT_RUNTIME_CONFIG,
  LAUNCH_WEBSITE,
  ORDER_QUEUE_SEAT_COUNT,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_TOP_PROTECTED_COUNT,
  formatMinorMoney
} from '@queuefree/shared';
import { ButtonLink } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { complianceLinks, heroBullets, howItWorks, launchBaseline, ruleHighlights } from '@/lib/site-content';

export default function HomePage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-12">
        <PageHero
          eyebrow="Public Website"
          title="Buy real products. Join the public queue after payment."
          description="QueueFree is positioned as shopping-first commerce with a transparent queue promotion model. Public rules, privacy, terms, account deletion, and contact pages remain accessible on the web."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Launch baseline</p>
              <div className="mt-5 grid gap-3">
                {launchBaseline.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-slate-300">{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">What the website must do</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-600">
              {heroBullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/rules">Read the rules</ButtonLink>
              <ButtonLink href="/contact" variant="secondary">
                Contact & appeal
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-slate-950 p-8 text-slate-50 shadow-panel">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Reviewer-friendly summary</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Queue seat rule</p>
                <p className="mt-2 text-lg font-semibold">{ORDER_QUEUE_SEAT_COUNT} order = {ORDER_QUEUE_SEAT_COUNT} seat</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Protected zone</p>
                <p className="mt-2 text-lg font-semibold">Top {QUEUE_TOP_PROTECTED_COUNT}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Boost limit</p>
                <p className="mt-2 text-lg font-semibold">{QUEUE_BOOST_MAX_PER_ENTRY} per entry</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">Default cashback cap</p>
                <p className="mt-2 text-lg font-semibold">{formatMinorMoney(DEFAULT_RUNTIME_CONFIG.defaultCashbackCapMinor)}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">How it works</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Web copy aligned with the locked PRD</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {howItWorks.map((item) => (
              <SectionCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Rule highlights</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Hard rules stay consistent across app, web, backend, and ops</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {ruleHighlights.map((item, index) => (
              <SectionCard
                key={item.title}
                title={item.title}
                body={item.body}
                tone={index === 0 ? 'brand' : index === 1 ? 'warning' : index === 2 ? 'accent' : 'default'}
              />
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Public routes</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950">Launch website path checklist</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {complianceLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30"
              >
                <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                <p className="mt-2 text-sm text-slate-600">{LAUNCH_WEBSITE}{item.href}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/privacy/page.tsx`

```
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { privacySections } from '@/lib/site-content';

export default function PrivacyPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Privacy Policy"
          title="How QueueFree handles launch-phase user data"
          description="This public page exists so app users, reviewers, and partners can inspect the data-handling model used by the MVP launch."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {privacySections.map((section, index) => (
            <SectionCard
              key={section.title}
              title={section.title}
              body={section.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'accent' : 'default'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Launch policy notes</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <p>
              QueueFree uses phone-based authentication, order information, queue-state events, wallet ledgers,
              withdrawal records, and risk-control inputs to run the commerce flow. The system keeps public rules and
              audit-friendly traces because the queue and wallet model must stay explainable.
            </p>
            <p>
              Account deletion follows a settlement-and-anonymize path. Open financial or order obligations can delay
              anonymization until the business flow is complete.
            </p>
            <p>
              This starter keeps public copy on the website. In a later batch, the team can switch selected policy
              sections to runtime-managed content without changing the locked route structure.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/rules/activity/[slug]/page.tsx`

```
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { activityRulesBySlug, type ActivitySlug } from '@/lib/site-content';

type ActivityRulePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams(): Array<{ slug: ActivitySlug }> {
  return Object.keys(activityRulesBySlug).map((slug) => ({ slug: slug as ActivitySlug }));
}

export default async function ActivityRulePage({ params }: ActivityRulePageProps): Promise<React.ReactElement> {
  const { slug } = await params;
  const activity = activityRulesBySlug[slug as ActivitySlug];

  if (!activity) {
    notFound();
  }

  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Activity Rules"
          title={activity.title}
          description={activity.summary}
        />

        <section className="grid gap-4 lg:grid-cols-2">
          <SectionCard
            title="What this activity can do"
            body={activity.highlights.join(' ')}
            tone="brand"
          />
          <SectionCard
            title="What this activity cannot do"
            body={activity.constraints.join(' ')}
            tone="warning"
          />
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Public campaign breakdown</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">Highlights</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {activity.highlights.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-brand" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-warning">Constraints</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                {activity.constraints.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-warning" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/rules/page.tsx`

```
import Link from 'next/link';
import { DEFAULT_RUNTIME_CONFIG, QUEUE_BOOST_MAX_PER_ENTRY, QUEUE_TOP_PROTECTED_COUNT } from '@queuefree/shared';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { ButtonLink } from '@/components/ui/button';

export default function RulesCenterPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Rules Center"
          title="Public rules for queue, wallet, activities, and deletion"
          description="The website keeps a simple but review-ready rules center. Hard rules come from the locked PRD and shared constants. Adjustable thresholds are shown as runtime fallback examples only."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Runtime fallback snapshot</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Top protected zone: {QUEUE_TOP_PROTECTED_COUNT}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Boost limit per entry: {QUEUE_BOOST_MAX_PER_ENTRY}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Base guard hours: {DEFAULT_RUNTIME_CONFIG.baseGuardHours}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Freeze grace hours: {DEFAULT_RUNTIME_CONFIG.freezeGraceHours}</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-3">
          <SectionCard
            title="Queue rules"
            body="Public queue, protected zone, boost boundaries, frozen-entry behavior, and fixed settlement slot rules."
            tone="brand"
          />
          <SectionCard
            title="Wallet rules"
            body="Pending-to-available release, activation gates, withdrawal thresholds, and clawback boundaries."
            tone="accent"
          />
          <SectionCard
            title="Activity rules"
            body="Campaign pages may vary by activity slug, but cannot override hard product, queue, or wallet rules."
            tone="warning"
          />
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Rule entry points</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Link href="/rules/queue" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Queue rules</p>
              <p className="mt-2 text-sm text-slate-600">Ranking, frozen entries, boost, and slot settlement.</p>
            </Link>
            <Link href="/rules/wallet" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Wallet rules</p>
              <p className="mt-2 text-sm text-slate-600">Pending, available, frozen, activation, and withdrawal rules.</p>
            </Link>
            <Link href="/rules/activity/launch-week" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Launch-week activity</p>
              <p className="mt-2 text-sm text-slate-600">Example public campaign page using the locked slug route.</p>
            </Link>
            <Link href="/delete-account" className="rounded-3xl border border-border bg-slate-50 p-5 transition-colors hover:border-brand hover:bg-brand-soft/30">
              <p className="text-sm font-semibold text-slate-950">Delete account</p>
              <p className="mt-2 text-sm text-slate-600">Deletion means request, settlement, then anonymization.</p>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/terms" variant="secondary">Terms</ButtonLink>
            <ButtonLink href="/privacy" variant="secondary">Privacy</ButtonLink>
            <ButtonLink href="/contact" variant="primary">Contact</ButtonLink>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/rules/queue/page.tsx`

```
import {
  ORDER_QUEUE_SEAT_COUNT,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_TOP_PROTECTED_COUNT,
  formatDateTime
} from '@queuefree/shared';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { queueRuleCards, queueStatusList } from '@/lib/site-content';

export default function QueueRulesPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Queue Rules"
          title="How ranking, freeze, restore, and settlement work"
          description="The public queue is governed by fixed rules. Display rank is derived from active entries, while sorting truth stays on sortScore in the backend."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">At a glance</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{ORDER_QUEUE_SEAT_COUNT} order = {ORDER_QUEUE_SEAT_COUNT} seat</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Top {QUEUE_TOP_PROTECTED_COUNT} cannot be jumped by boost</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Boost cap: {QUEUE_BOOST_MAX_PER_ENTRY} per entry</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Display example time: {formatDateTime('2026-03-11T12:00:00Z')}</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {queueRuleCards.map((item, index) => (
            <SectionCard
              key={item.title}
              title={item.title}
              body={item.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'default' : index === 2 ? 'warning' : 'accent'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Queue entry statuses</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {queueStatusList.map((status) => (
              <div key={status} className="rounded-2xl border border-border bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
                {status}
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              Winning is determined only at the instant a fixed settlement slot runs. The winner is the current valid rank #1.
            </p>
            <p>
              Frozen entries preserve original ordering value but are excluded from valid rank and settlement until restored.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/rules/wallet/page.tsx`

```
import {
  DEFAULT_RUNTIME_CONFIG,
  formatMinorMoney,
  WALLET_SUPPORTS_PEER_TRANSFER,
  WALLET_SUPPORTS_TOP_UP
} from '@queuefree/shared';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { walletRuleCards } from '@/lib/site-content';

export default function WalletRulesPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Wallet Rules"
          title="Pending, available, frozen, activation, and withdrawal boundaries"
          description="The public web page explains the wallet model without exposing internal debt handling details that are reserved for backend accounting logic."
          aside={
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-soft">Fallback launch values</p>
              <div className="mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Minimum withdrawal: {formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawMinAmountMinor)}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Single max: {formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawSingleMaxMinor)}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Daily max: {formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawDailyMaxMinor)}</div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Rewarded ads default: {DEFAULT_RUNTIME_CONFIG.rewardedAdsEnabled ? 'On' : 'Off'}</div>
              </div>
            </div>
          }
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {walletRuleCards.map((item, index) => (
            <SectionCard
              key={item.title}
              title={item.title}
              body={item.body}
              tone={index === 0 ? 'warning' : index === 1 ? 'accent' : 'default'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Wallet capabilities excluded in MVP</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <SectionCard
              title="Top-up"
              body={`Wallet top-up is ${WALLET_SUPPORTS_TOP_UP ? 'enabled' : 'disabled'} in the launch baseline.`}
              tone="danger"
            />
            <SectionCard
              title="Peer transfer"
              body={`User-to-user wallet transfer is ${WALLET_SUPPORTS_PEER_TRANSFER ? 'enabled' : 'disabled'} in the launch baseline.`}
              tone="danger"
            />
          </div>
          <div className="mt-8 space-y-4 text-sm text-slate-600">
            <p>
              Cashback is calculated from eligible product value and capped by rule-based limits. Shipping, taxes,
              packaging, and value-added fees are outside the cashback base.
            </p>
            <p>
              Refunds or after-sale changes can reduce pending cashback or trigger clawback logic after release.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/app/terms/page.tsx`

```
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { SectionCard } from '@/components/section-card';
import { termsSections } from '@/lib/site-content';

export default function TermsPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-10">
        <PageHero
          eyebrow="Terms of Service"
          title="Core service boundaries for the QueueFree MVP"
          description="This public page summarizes the shopping-first operating model, queue promotion boundaries, wallet flow, and launch scope locked by PRD v1.2."
        />

        <section className="grid gap-4 lg:grid-cols-2">
          {termsSections.map((section, index) => (
            <SectionCard
              key={section.title}
              title={section.title}
              body={section.body}
              tone={index === 0 ? 'brand' : index === 1 ? 'warning' : 'default'}
            />
          ))}
        </section>

        <section className="rounded-[2rem] border border-border bg-white p-8 shadow-panel">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">Important launch commitments</h2>
          <div className="mt-6 space-y-5 text-sm text-slate-600">
            <p>
              The service does not sell guaranteed winnings, guaranteed cashback, queue priority for sale, or direct
              cash-probability rights. Users buy physical products and may later receive cashback under public rules.
            </p>
            <p>
              Wallet balance is operationally separated into pending, available, and frozen. Withdrawal review and risk
              review remain available to the platform when required.
            </p>
            <p>
              Public website copy must remain consistent with the mobile app, backend API, and admin governance flow.
            </p>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
```

## `apps/web/next-env.d.ts`

```
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file is auto-generated by Next.js.
```

## `apps/web/next.config.mjs`

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@queuefree/shared', '@queuefree/ui-tokens']
};

export default nextConfig;
```

## `apps/web/package.json`

```
{
  "name": "@queuefree/web",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start -p 3000",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@queuefree/shared": "workspace:*",
    "@queuefree/ui-tokens": "workspace:*",
    "clsx": "^2.1.1",
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/node": "^22.15.21",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}
```

## `apps/web/postcss.config.mjs`

```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

## `apps/web/src/components/page-hero.tsx`

```
import * as React from 'react';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
};

export function PageHero({ eyebrow, title, description, aside }: PageHeroProps): React.ReactElement {
  return (
    <section className="grid gap-6 rounded-[2rem] border border-border bg-white p-8 shadow-panel lg:grid-cols-[minmax(0,1fr)_320px] lg:p-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>
      </div>
      {aside ? <div className="rounded-3xl bg-slate-950 p-6 text-slate-50">{aside}</div> : null}
    </section>
  );
}
```

## `apps/web/src/components/page-shell.tsx`

```
import * as React from 'react';

export function PageShell({ children }: { children: React.ReactNode }): React.ReactElement {
  return <div className="mx-auto max-w-content px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}
```

## `apps/web/src/components/section-card.tsx`

```
import * as React from 'react';
import { Card } from '@/components/ui/card';

export function SectionCard({
  title,
  body,
  tone = 'default'
}: {
  title: string;
  body: string;
  tone?: 'default' | 'brand' | 'accent' | 'warning' | 'danger';
}): React.ReactElement {
  const toneMap = {
    default: 'border-border bg-white',
    brand: 'border-brand/15 bg-brand-soft/40',
    accent: 'border-accent/15 bg-accent-soft/40',
    warning: 'border-warning/20 bg-warning-soft/40',
    danger: 'border-danger/15 bg-danger-soft/40'
  } as const;

  return (
    <Card className={toneMap[tone]}>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-3 text-sm text-slate-600">{body}</p>
    </Card>
  );
}
```

## `apps/web/src/components/site-footer.tsx`

```
import Link from 'next/link';
import { LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_TIMEZONE } from '@queuefree/shared';
import { complianceLinks, siteName } from '@/lib/site-content';

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-950">{siteName}</p>
          <p className="mt-3 max-w-xl text-sm text-slate-600">
            Shopping-first public queue promotion. Real product purchase remains the core transaction.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-slate-500">
            Market {LAUNCH_MARKET} · Timezone {LAUNCH_TIMEZONE} · Rule {LAUNCH_RULE_VERSION}
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {complianceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-600 transition-colors hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

## `apps/web/src/components/site-header.tsx`

```
import Link from 'next/link';
import { complianceLinks, siteName } from '@/lib/site-content';
import { ButtonLink } from '@/components/ui/button';

export function SiteHeader(): React.ReactElement {
  return (
    <header className="border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight text-slate-950">
          {siteName}
        </Link>
        <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          {complianceLinks.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 transition-colors hover:bg-slate-100 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/rules" variant="ghost">
            Rules
          </ButtonLink>
          <ButtonLink href="/delete-account" variant="primary">
            Delete Account
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
```

## `apps/web/src/components/ui/button.tsx`

```
import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

const styles = {
  primary:
    'bg-brand text-white hover:bg-blue-700 border border-transparent',
  secondary:
    'bg-white text-slate-900 hover:bg-slate-50 border border-border',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent'
} as const;

type ButtonVariant = keyof typeof styles;

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children
}: BaseProps & { href: string }): React.ReactElement {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors',
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  type = 'button',
  variant = 'primary',
  className,
  children
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-colors',
        styles[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
```

## `apps/web/src/components/ui/card.tsx`

```
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, children }: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return (
    <div className={cn('rounded-3xl border border-border bg-white p-6 shadow-panel', className)}>
      {children}
    </div>
  );
}
```

## `apps/web/src/lib/env.ts`

```
export const publicAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? ''
} as const;
```

## `apps/web/src/lib/site-content.ts`

```
import {
  ACCOUNT_DELETE_STATUSES,
  DEFAULT_RUNTIME_CONFIG,
  LAUNCH_CURRENCY,
  LAUNCH_LANGUAGE,
  LAUNCH_LOCALE,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  LAUNCH_WEBSITE,
  ORDER_QUEUE_SEAT_COUNT,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_ENTRY_STATUSES,
  QUEUE_TOP_PROTECTED_COUNT,
  WALLET_SUPPORTS_PEER_TRANSFER,
  WALLET_SUPPORTS_TOP_UP,
  formatMinorMoney
} from '@queuefree/shared';

export const siteName = 'QueueFree';

export const launchBaseline = [
  { label: 'Launch market', value: LAUNCH_MARKET },
  { label: 'Currency', value: LAUNCH_CURRENCY },
  { label: 'Timezone', value: LAUNCH_TIMEZONE },
  { label: 'Locale', value: LAUNCH_LOCALE },
  { label: 'Language', value: LAUNCH_LANGUAGE },
  { label: 'Rule version', value: LAUNCH_RULE_VERSION }
] as const;

export const heroBullets = [
  'Buy real products, then join the public queue after payment succeeds.',
  'Queue settlement uses fixed slots instead of instant wins.',
  'Cashback may apply based on public rules. It is not guaranteed.',
  'Rules, privacy, terms, contact, and account deletion pages stay public on the web.'
] as const;

export const howItWorks = [
  {
    title: '1. Buy a real product',
    body: 'MVP has no cart. One order contains one product, but the quantity can be multiple.'
  },
  {
    title: '2. Payment creates one queue seat',
    body: `${ORDER_QUEUE_SEAT_COUNT} order creates ${ORDER_QUEUE_SEAT_COUNT} queue seat. Quantity changes order value, not seat count.`
  },
  {
    title: '3. Check in to keep queue entries active',
    body: 'Check-in is user-level. One daily check-in protects all of the user’s active queue orders.'
  },
  {
    title: '4. Fixed settlement slots decide winners',
    body: `Each slot settles the current valid rank #1. Frozen orders do not join valid ranking or settlement.`
  }
] as const;

export const ruleHighlights = [
  {
    title: 'Protected zone',
    body: `Top ${QUEUE_TOP_PROTECTED_COUNT} is protected. Boost cannot jump into or past the protected zone.`
  },
  {
    title: 'Boost limits',
    body: `Boost is per order and capped at ${QUEUE_BOOST_MAX_PER_ENTRY} times for each queue entry.`
  },
  {
    title: 'Wallet model',
    body: `Cashback lands in pending first, then moves to available after delivery plus the observation window.`
  },
  {
    title: 'No wallet top-up',
    body: `Wallet top-up is ${WALLET_SUPPORTS_TOP_UP ? 'enabled' : 'disabled'}, and peer transfer is ${WALLET_SUPPORTS_PEER_TRANSFER ? 'enabled' : 'disabled'} in MVP.`
  }
] as const;

export const complianceLinks = [
  { href: '/', label: 'Home' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
  { href: '/rules', label: 'Rules Center' },
  { href: '/delete-account', label: 'Delete Account' },
  { href: '/contact', label: 'Contact & Appeal' }
] as const;

export const queueRuleCards = [
  {
    title: 'Public queue by market',
    body: `MVP runs one public pool for the launch market ${LAUNCH_MARKET}. Cross-country mixed pools are out of scope.`
  },
  {
    title: 'Seat truth',
    body: 'Queue truth is sortScore. Displayed rank is a derived valid rank for active entries only.'
  },
  {
    title: 'Frozen entries',
    body: 'Frozen orders keep their original sort score, but stop participating in valid ranking and settlement until restored.'
  },
  {
    title: 'Settlement timing',
    body: `The default runtime fallback keeps ${DEFAULT_RUNTIME_CONFIG.defaultDailySlotCount} settlement slots per day, but actual slot schedules must come from runtime config.`
  }
] as const;

export const walletRuleCards = [
  {
    title: 'Pending balance',
    body: 'Winning a slot creates pending cashback first. Pending balance is not withdrawable.'
  },
  {
    title: 'Available balance',
    body: 'Available balance appears only after delivery is confirmed and the observation window ends.'
  },
  {
    title: 'Withdrawal thresholds',
    body: `Fallback launch values are min ${formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawMinAmountMinor)}, single max ${formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawSingleMaxMinor)}, daily max ${formatMinorMoney(DEFAULT_RUNTIME_CONFIG.withdrawDailyMaxMinor)}.`
  },
  {
    title: 'Activation gate',
    body: 'Withdrawal requires wallet activation. MVP keeps two paths: valid invite or non-social activation task.'
  }
] as const;

export const activityRulesBySlug = {
  'launch-week': {
    title: 'Launch Week Rules',
    summary: 'Launch week introduces selected products, fixed settlement slots, and public rule disclosure. No guaranteed cashback language may be used.',
    highlights: [
      'Only campaign-tagged products join the activity scope.',
      'Campaign rules can adjust cashback cap and slot density, but cannot change one order equals one queue seat.',
      'Protected zone, boost cap, and pending-to-available wallet flow remain unchanged.'
    ],
    constraints: [
      'No forced ad viewing.',
      'No sale of queue priority or probability rights.',
      'No claim of guaranteed winnings.'
    ]
  },
  'first-order-focus': {
    title: 'First Order Focus Rules',
    summary: 'This sample activity page shows how the public website explains onboarding campaigns without changing the platform’s hard rules.',
    highlights: [
      'First-order tasks can grant soft rewards such as guard hours, XP, or boost fragments.',
      'Real product purchase and public queue rules still govern eligibility.',
      'Invite rewards remain single-layer only.'
    ],
    constraints: [
      'No wallet top-up.',
      'No peer transfer.',
      'No multi-level referral structure.'
    ]
  }
} as const;

export type ActivitySlug = keyof typeof activityRulesBySlug;

export const deleteAccountBlockers = [
  'Active, frozen, or review-held queue entries still tied to the account.',
  'Pending, available, or frozen wallet balance waiting for settlement.',
  'A withdrawal request that is still processing or under review.',
  'Orders that are still unfulfilled, in after-sale handling, or waiting for delivery truth.'
] as const;

export const deleteAccountFlow = [
  'Submit a delete-account request inside the app.',
  'The account moves into delete-request or pending-settlement status depending on open business items.',
  'Active, frozen, or suspended queue entries leave ranking with the unified removal reason.',
  'After settlement completes, the account becomes ready for anonymization.',
  'MVP uses logical deletion plus PII anonymization instead of instant physical deletion.'
] as const;

export const queueStatusList = QUEUE_ENTRY_STATUSES;
export const deleteStatusList = ACCOUNT_DELETE_STATUSES;

export const privacySections = [
  {
    title: 'What data we collect',
    body: 'The MVP product flow uses phone-based sign-in, order data, queue activity, wallet records, device and risk-control signals, plus customer-support context needed to operate the service.'
  },
  {
    title: 'Why we collect it',
    body: 'Data is used to provide authentication, order fulfillment, queue settlement, wallet release, withdrawals, fraud prevention, customer support, and legal compliance.'
  },
  {
    title: 'Retention and deletion',
    body: 'Deleting the account does not always mean instant erasure. Financial, audit, order, and risk data can stay as anonymized or legally retained records when required.'
  },
  {
    title: 'Public rule transparency',
    body: `Launch website ${LAUNCH_WEBSITE} keeps public pages for rules, privacy, terms, contact, and delete-account guidance so users and app reviewers can inspect the operating model.`
  }
] as const;

export const termsSections = [
  {
    title: 'Real-goods commerce first',
    body: 'Users purchase physical goods. Queue participation is an attached promotion rule after payment succeeds and does not replace the product purchase itself.'
  },
  {
    title: 'No guaranteed cashback',
    body: 'Cashback may apply according to public queue rules, settlement slots, and wallet release conditions. No part of the service promises winnings.'
  },
  {
    title: 'Operational controls',
    body: 'Risk review, order reduction, refund handling, withdrawal review, and account deletion settlement can affect the user journey when necessary for compliance or fraud control.'
  },
  {
    title: 'Launch scope',
    body: `The first MVP launch is locked to market ${LAUNCH_MARKET}, locale ${LAUNCH_LOCALE}, currency ${LAUNCH_CURRENCY}, and timezone ${LAUNCH_TIMEZONE}.`
  }
] as const;
```

## `apps/web/src/lib/utils.ts`

```
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## `apps/web/tailwind.config.ts`

```
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)'
        },
        warning: {
          DEFAULT: 'rgb(var(--warning) / <alpha-value>)',
          soft: 'rgb(var(--warning-soft) / <alpha-value>)'
        },
        danger: {
          DEFAULT: 'rgb(var(--danger) / <alpha-value>)',
          soft: 'rgb(var(--danger-soft) / <alpha-value>)'
        }
      },
      maxWidth: {
        content: '72rem'
      },
      borderRadius: {
        xl2: '1.5rem'
      },
      boxShadow: {
        panel: '0 20px 45px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;
```

## `apps/web/tsconfig.json`

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "allowJs": false,
    "strict": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}
```

## `batch4-admin-file-contents.md`

```
# Batch 4 Admin Files

## `package.json`

```json
{
  "name": "queuefree",
  "private": true,
  "version": "0.1.0",
  "packageManager": "pnpm@10.32.0",
  "engines": {
    "node": ">=22.22.0 <23"
  },
  "scripts": {
    "dev:mobile": "pnpm --filter @queuefree/mobile dev",
    "android": "pnpm --filter @queuefree/mobile android",
    "ios": "pnpm --filter @queuefree/mobile ios",
    "web:mobile": "pnpm --filter @queuefree/mobile web",
    "typecheck": "turbo run typecheck",
    "dev:web": "pnpm --filter @queuefree/web dev",
    "build:web": "pnpm --filter @queuefree/web build",
    "dev:admin": "pnpm --filter @queuefree/admin dev",
    "build:admin": "pnpm --filter @queuefree/admin build"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "typescript": "^5.8.3"
  }
}

```

## `README-第4批-Admin后台启动步骤.md`

```md
# QueueFree 第4批：Admin 后台骨架启动步骤

这批内容是 `apps/admin` 的第一批骨架。

特点：

- 只使用已经冻结的 Admin 路由
- 不新增 route
- 不新增 env var
- 不接真实鉴权
- 不接真实 API
- 所有页面都明确标注为 **Admin Skeleton**
- 目标是：**先能跑、能看路径、能给后端和服务器对齐**

---

## 1. 先准备软件

如果你前面几批已经装过，这一步可以跳过。

你需要：

1. Node.js `22.22.1`
2. pnpm `10.32.0`
3. VS Code

---

## 2. 打开项目

把压缩包解压后，用 VS Code 打开整个 `queuefree` 文件夹。

---

## 3. 安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

---

## 4. 启动 Admin 后台

继续输入：

```bash
pnpm dev:admin
```

---

## 5. 打开浏览器

访问：

```text
http://localhost:3001
```

登录页地址：

```text
http://localhost:3001/login
```

Dashboard 地址：

```text
http://localhost:3001
```

---

## 6. 本轮页面范围

已落地的冻结路由：

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

---

## 7. 当前这批不能做什么

这批 **不能**：

- 真实登录
- 真实权限控制
- 真实 API 请求
- 真实数据库
- 真实审核动作
- 真实提现审批
- 真实风控决策

这些动作都要等后端线程先登记 contract，再通过 OpenAPI 生成 `packages/api-client` 后接入。

---

## 8. 发给后端与服务器

请把下面文件发给另外两个对话框：

- `docs/contracts/admin-route-module-map-v1.2.md`
- `docs/handoffs/backend-next-steps-from-admin-batch4.md`
- `docs/handoffs/server-next-steps-from-admin-batch4.md`
- `docs/handoffs/第4批-发给后端和服务器的话术.md`

```

## `docs/contracts/admin-route-module-map-v1.2.md`

```md
# QueueFree Admin Route ↔ Module Map v1.2

状态：Informational  
规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`
4. `packages/shared`

本文件不是新的冻结项注册表。  
本文件只用于说明：**本轮 `apps/admin` 骨架如何映射到已经冻结的 Admin 路由与 PRD 模块。**

---

## 1. 登录与总览

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/login` | 9.3 Admin IA / 登录 | 登录壳页面、协议提示、Skeleton 入口 |
| `/` | 11.1 Dashboard | 指标卡、队列摘要、资金摘要、待处理事项 |

---

## 2. 运营域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/products` | 11.2 商品管理 | 商品列表、入队开关/活动绑定占位 |
| `/products/[productId]` | 11.2 商品管理 | 商品详情骨架、价格库存与队列设置占位 |
| `/orders` | 11.3 订单管理 | 订单列表、状态概览、售后/退款占位 |
| `/orders/[orderId]` | 11.3 订单管理 | 订单详情骨架、履约与售后占位 |
| `/queues` | 11.4 队列管理 | 队列列表、状态摘要、事件日志入口占位 |
| `/queues/[entryId]` | 11.4 队列管理 | 队列详情、Boost/冻结/移出说明占位 |
| `/slots` | 11.5 时隙管理 | 时隙列表、执行状态摘要 |
| `/slots/[slotId]` | 11.5 时隙管理 | 时隙详情、重试/重放占位 |
| `/campaigns` | 11.6 活动管理 | 活动列表、封顶与额外时隙占位 |
| `/campaigns/[campaignId]` | 11.6 活动管理 | 活动详情、规则文案占位 |
| `/tasks` | 11.7 任务与邀请管理 | 任务列表、奖励配置占位 |
| `/tasks/[taskId]` | 11.7 任务与邀请管理 | 任务详情骨架 |
| `/invites` | 11.7 任务与邀请管理 | 邀请关系列表、有效状态摘要 |
| `/invites/[relationId]` | 11.7 任务与邀请管理 | 邀请关系详情骨架 |

---

## 3. 资金风控域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/wallet` | 11.8 钱包与提现管理 | 钱包总览、账变占位、激活方式提示 |
| `/withdrawals` | 11.8 钱包与提现管理 | 提现列表、审核阶段占位 |
| `/risk` | 11.9 风控后台 | 风险案件池、命中线索占位 |
| `/risk/[caseId]` | 11.9 风控后台 | 风险案件详情、人工决策占位 |

---

## 4. 治理域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/governance` | 11.10 权限与审计 | RBAC、角色权限矩阵、敏感操作说明 |
| `/audit` | 11.10 权限与审计 | 审计日志列表、导出占位 |

---

## 5. 本轮明确不做的内容

- 真实鉴权
- 真实 RBAC 校验
- 真实 Admin API 接入
- 真实 Prisma / CMS / 审核动作
- 未登记 contract 的 request / response 字段

```

## `docs/handoffs/backend-next-steps-from-admin-batch4.md`

```md
# Backend Next Steps from Admin Batch 4

规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`
4. `packages/shared`
5. `packages/api-client`

## 当前前端状态

`apps/admin` 第1批已落地，但仍是 **Admin Skeleton**：

- 只有冻结路由的页面骨架
- 没有真实鉴权
- 没有真实 Admin API
- 没有新增 registry 项
- 没有新增 shared contract

## 后端线程下一步建议

### 1. 不要直接给前端口头字段

任何新增或修改以下内容，都必须先登记，再生成：

- Admin API path
- request field
- response field
- 风控案件字段
- 提现审核字段
- 审计字段
- 商品/订单/队列后台详情字段

### 2. 优先补齐最小 Admin OpenAPI 只读链路

建议先做只读，不做写操作：

- 商品列表 / 详情
- 订单列表 / 详情
- 队列列表 / 详情
- 时隙列表 / 详情
- 活动列表 / 详情
- 任务列表 / 详情
- 邀请关系列表 / 详情
- 钱包总览
- 提现列表
- 风险案件列表 / 详情
- 审计日志列表

### 3. 真实动作接口先延后

以下动作在没有 registry 登记前不要让前端接：

- 后台减量
- 售后与退款录入
- 冻结 / 解冻 / 移出队列
- 时隙重试 / 重放
- 活动上下线
- 任务上下线
- 提现审核 / 驳回
- 风险人工决策
- 角色权限修改

### 4. 生成方式要求

- `packages/api-client` 只能由 OpenAPI 生成
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 不要让前端直接依赖 `services/api` 内部类型

```

## `docs/handoffs/server-next-steps-from-admin-batch4.md`

```md
# Server Next Steps from Admin Batch 4

规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`

## 当前前端状态

`apps/admin` 第1批已经落地本地可运行骨架。

本轮没有新增：

- 域名
- 子域名
- 环境变量
- 路由

## 服务器线程下一步建议

### 1. 保持现有域名基线不变

只使用已登记域名：

- local: `http://localhost:3001`
- dev: `https://dev-admin.queuefree.com`
- staging: `https://stg-admin.queuefree.com`
- prod: `https://admin.queuefree.com`

### 2. 保持现有 admin 环境变量不变

只使用已登记的 admin 环境变量：

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ADMIN_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`

### 3. 优先做的部署准备

- Admin 单独站点部署位
- dev / staging / prod 分环境
- Sentry 前端接线预留
- CI 跑 `pnpm --filter @queuefree/admin build`
- 与 Web / API 分离部署

### 4. 当前不要擅自追加

- 不要新增 Admin secret 命名
- 不要私自更改 admin 子域名
- 不要把 `/contact`、Web 公共页搬到 Admin
- 不要新增 admin 路由重写

```

## `docs/handoffs/第4批-发给后端和服务器的话术.md`

```md
从现在开始，QueueFree 三线程继续按以下优先级执行：

1. queuefree_prd_v1_2
2. docs/contracts/queuefree-collaboration-contract-v1.2.md
3. docs/registry/registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

本轮前端已落地 apps/admin 第1批骨架，但没有新增任何 registry 项，也没有新增共享 contract。

请以后端 / 服务器线程继续遵守：
- 任何新增或修改 enum / state / API path / request field / response field / table field / event / worker / queue / cron / env var / domain / route，必须先登记，再生成代码。
- packages/api-client 只能由 OpenAPI 生成。
- 前端当前只接受已登记路径下的最小 Admin OpenAPI 接线，不接受口头字段。

```

## `apps/admin/.env.example`

```
NEXT_PUBLIC_APP_ENV=local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
NEXT_PUBLIC_ADMIN_BASE_URL=http://localhost:3001
NEXT_PUBLIC_SENTRY_DSN=

```

## `apps/admin/app/(console)/audit/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Audit'
};

export default function AuditPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('audit')} />;
}

```

## `apps/admin/app/(console)/campaigns/[campaignId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Campaign detail'
};

export default function CampaignDetailPage({ params }: { params: { campaignId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('campaign', params.campaignId)} />;
}

```

## `apps/admin/app/(console)/campaigns/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Campaigns'
};

export default function CampaignsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('campaigns')} />;
}

```

## `apps/admin/app/(console)/governance/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Governance'
};

export default function GovernancePage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('governance')} />;
}

```

## `apps/admin/app/(console)/invites/[relationId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Invite detail'
};

export default function InviteDetailPage({ params }: { params: { relationId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('invite', params.relationId)} />;
}

```

## `apps/admin/app/(console)/invites/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Invites'
};

export default function InvitesPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('invites')} />;
}

```

## `apps/admin/app/(console)/layout.tsx`

```tsx
import { AdminShell } from '@/components/admin-shell';

export default function ConsoleLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return <AdminShell>{children}</AdminShell>;
}

```

## `apps/admin/app/(console)/orders/[orderId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Order detail'
};

export default function OrderDetailPage({ params }: { params: { orderId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('order', params.orderId)} />;
}

```

## `apps/admin/app/(console)/orders/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Orders'
};

export default function OrdersPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('orders')} />;
}

```

## `apps/admin/app/(console)/page.tsx`

```tsx
import { formatDateTime, LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_TIMEZONE } from '@queuefree/shared';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable
} from '@/lib/admin-content';

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');

export default function DashboardPage(): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow="Dashboard"
          title="QueueFree admin overview"
          description="Core KPI blocks for operations, queue health, funds, risk backlog, and governance follow-up."
          meta={[
            `Market: ${LAUNCH_MARKET}`,
            `Timezone: ${LAUNCH_TIMEZONE}`,
            `Rule version: ${LAUNCH_RULE_VERSION}`,
            `Snapshot: ${generatedAt}`
          ]}
        />

        <AdminSkeletonBanner />

        <section className="grid gap-4 lg:grid-cols-4">
          {dashboardMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.25fr,0.95fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Queue and slot attention"
                description="Operational snapshot aligned to fixed settlement slots and queue protection rules."
              />
              <DataTable columns={dashboardQueueTable.columns} rows={dashboardQueueTable.rows} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Funds and approvals"
                description="Withdrawal review and pending release items remain mock-only in this batch."
              />
              <DataTable columns={dashboardWalletTable.columns} rows={dashboardWalletTable.rows} />
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle
                title="Backlog focus"
                description="These rows indicate what real Admin APIs should prioritize once contracts are registered."
              />
              <DataTable columns={dashboardBacklogTable.columns} rows={dashboardBacklogTable.rows} />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title="Guardrails for this batch" description="What stays intentionally out of scope in batch 4." />
              <ul className="space-y-3 text-sm text-slate-600">
                {dashboardRiskNotes.map((note) => (
                  <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </PageShell>
  );
}

```

## `apps/admin/app/(console)/products/[productId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Product detail'
};

export default function ProductDetailPage({ params }: { params: { productId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('product', params.productId)} />;
}

```

## `apps/admin/app/(console)/products/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Products'
};

export default function ProductsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('products')} />;
}

```

## `apps/admin/app/(console)/queues/[entryId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Queue detail'
};

export default function QueueDetailPage({ params }: { params: { entryId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('queue', params.entryId)} />;
}

```

## `apps/admin/app/(console)/queues/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Queues'
};

export default function QueuesPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('queues')} />;
}

```

## `apps/admin/app/(console)/risk/[caseId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Risk case detail'
};

export default function RiskDetailPage({ params }: { params: { caseId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('risk', params.caseId)} />;
}

```

## `apps/admin/app/(console)/risk/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Risk'
};

export default function RiskPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('risk')} />;
}

```

## `apps/admin/app/(console)/slots/[slotId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Slot detail'
};

export default function SlotDetailPage({ params }: { params: { slotId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('slot', params.slotId)} />;
}

```

## `apps/admin/app/(console)/slots/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Slots'
};

export default function SlotsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('slots')} />;
}

```

## `apps/admin/app/(console)/tasks/[taskId]/page.tsx`

```tsx
import { ModuleDetailPage } from '@/components/module-detail-page';
import { getDetailPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Task detail'
};

export default function TaskDetailPage({ params }: { params: { taskId: string } }): React.ReactElement {
  return <ModuleDetailPage config={getDetailPageConfig('task', params.taskId)} />;
}

```

## `apps/admin/app/(console)/tasks/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Tasks'
};

export default function TasksPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('tasks')} />;
}

```

## `apps/admin/app/(console)/wallet/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Wallet'
};

export default function WalletPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('wallet')} />;
}

```

## `apps/admin/app/(console)/withdrawals/page.tsx`

```tsx
import { ModuleListPage } from '@/components/module-list-page';
import { getListPageConfig } from '@/lib/admin-content';

export const metadata = {
  title: 'Withdrawals'
};

export default function WithdrawalsPage(): React.ReactElement {
  return <ModuleListPage config={getListPageConfig('withdrawals')} />;
}

```

## `apps/admin/app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 248 250 252;
  --foreground: 15 23 42;
  --muted: 100 116 139;
  --border: 226 232 240;
  --panel: 255 255 255;
  --panel-muted: 241 245 249;
  --sidebar: 15 23 42;
  --sidebar-foreground: 226 232 240;
  --brand: 37 99 235;
  --brand-soft: 219 234 254;
  --accent: 15 118 110;
  --accent-soft: 204 251 241;
  --warning: 180 83 9;
  --warning-soft: 254 243 199;
  --danger: 185 28 28;
  --danger-soft: 254 226 226;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top right, rgba(37, 99, 235, 0.06), transparent 28%),
    radial-gradient(circle at bottom left, rgba(15, 118, 110, 0.05), transparent 24%),
    rgb(var(--background));
  color: rgb(var(--foreground));
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}

p {
  line-height: 1.7;
}

button,
input {
  font: inherit;
}

::selection {
  background: rgba(37, 99, 235, 0.18);
}

```

## `apps/admin/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

const adminBaseUrl = process.env.NEXT_PUBLIC_ADMIN_BASE_URL ?? 'http://localhost:3001';

export const metadata: Metadata = {
  metadataBase: new URL(adminBaseUrl),
  title: {
    default: 'QueueFree Admin',
    template: '%s | QueueFree Admin'
  },
  description: 'QueueFree admin skeleton for operations, finance, risk, governance, and audit modules.'
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```

## `apps/admin/app/login/page.tsx`

```tsx
import Link from 'next/link';
import { LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_WEBSITE } from '@queuefree/shared';
import { webTheme } from '@queuefree/ui-tokens';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { PageShell } from '@/components/page-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export const metadata = {
  title: 'Login'
};

export default function LoginPage(): React.ReactElement {
  return (
    <PageShell width="narrow">
      <div className="space-y-6" style={{ maxWidth: `calc(${webTheme.maxWidth.content} - 34rem)` }}>
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand">QueueFree Admin</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">Admin login skeleton</h1>
          <p className="max-w-2xl text-sm text-slate-600">
            This page is intentionally non-functional in batch 4. It exists to lock the route, screen layout, and compliance copy before
            real authentication is registered and wired.
          </p>
        </div>

        <AdminSkeletonBanner />

        <Card>
          <CardHeader>
            <CardTitle>Sign-in placeholder</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Admin email or phone" placeholder="ops@queuefree.example" />
            <Input label="Password / OTP placeholder" placeholder="Not connected in this batch" />
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/">Enter skeleton dashboard</ButtonLink>
              <ButtonLink href={`https://${LAUNCH_WEBSITE}/terms`} variant="secondary">
                View public terms
              </ButtonLink>
            </div>
            <p className="text-xs text-slate-500">
              Launch market is locked to {LAUNCH_MARKET}. Rule version is {LAUNCH_RULE_VERSION}. Real auth and RBAC must follow registry-first
              registration before API wiring.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why this page stays minimal for now</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>No real session, password, OTP, or SSO contract has been registered for Admin in this batch.</p>
            <p>Frontend will not invent authentication fields or response shapes outside `packages/api-client`.</p>
            <p>
              Public compliance pages stay on the main website. Open{' '}
              <Link className="font-semibold text-brand" href={`https://${LAUNCH_WEBSITE}/privacy`}>
                queuefree.com/privacy
              </Link>{' '}
              for the public privacy policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}

```

## `apps/admin/app/not-found.tsx`

```tsx
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFoundPage(): React.ReactElement {
  return (
    <PageShell width="narrow">
      <Card>
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-600">
            This Admin skeleton only exposes the frozen routes defined in PRD v1.2 and the registry baseline.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/">Back to dashboard</ButtonLink>
            <ButtonLink href="/login" variant="secondary">
              Open login
            </ButtonLink>
          </div>
          <p className="text-xs text-slate-500">
            Missing paths should be added only after registry-first registration.
          </p>
        </CardContent>
      </Card>
    </PageShell>
  );
}

```

## `apps/admin/next-env.d.ts`

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// This file should not be edited manually.

```

## `apps/admin/next.config.mjs`

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@queuefree/shared', '@queuefree/ui-tokens']
};

export default nextConfig;

```

## `apps/admin/package.json`

```json
{
  "name": "@queuefree/admin",
  "private": true,
  "version": "0.1.0",
  "scripts": {
    "dev": "next dev -p 3001",
    "build": "next build",
    "start": "next start -p 3001",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@queuefree/shared": "workspace:*",
    "@queuefree/ui-tokens": "workspace:*",
    "clsx": "^2.1.1",
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^2.5.5"
  },
  "devDependencies": {
    "@types/node": "^22.15.21",
    "@types/react": "^19.1.2",
    "@types/react-dom": "^19.1.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.8.3"
  }
}

```

## `apps/admin/postcss.config.mjs`

```
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

```

## `apps/admin/src/components/admin-page-header.tsx`

```tsx
import * as React from 'react';

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string[];
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  meta = []
}: AdminPageHeaderProps): React.ReactElement {
  return (
    <div className="space-y-3">
      <div className="text-xs font-semibold uppercase tracking-[0.3em] text-brand">{eyebrow}</div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        <p className="max-w-3xl text-sm text-slate-600">{description}</p>
      </div>
      {meta.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {meta.map((item) => (
            <span key={item} className="rounded-full border border-border bg-panel px-3 py-2 text-xs font-semibold text-slate-600">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

```

## `apps/admin/src/components/admin-shell.tsx`

```tsx
import { webTheme } from '@queuefree/ui-tokens';
import { AdminSidebar } from '@/components/admin-sidebar';
import { AdminTopbar } from '@/components/admin-topbar';

export function AdminShell({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen w-full" style={{ maxWidth: `calc(${webTheme.maxWidth.content} + 30rem)` }}>
        <AdminSidebar />
        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <AdminTopbar />
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </div>
  );
}

```

## `apps/admin/src/components/admin-sidebar.tsx`

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminNavigation, getActiveNavItem, isNavItemActive } from '@/lib/navigation';
import { cn } from '@/lib/utils';

export function AdminSidebar(): React.ReactElement {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);

  return (
    <aside className="hidden w-80 shrink-0 border-r border-slate-800 bg-sidebar text-sidebar-foreground lg:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-slate-800 px-6 py-6">
          <Link href="/" className="block">
            <div className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">QueueFree</div>
            <div className="mt-2 text-2xl font-bold tracking-tight text-white">Admin Skeleton</div>
          </Link>
          <p className="mt-3 text-sm text-slate-400">
            Frozen-route first shell for operations, finance, risk, governance, and audit.
          </p>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {adminNavigation.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="px-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{group.title}</div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isNavItemActive(item.href, pathname);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'block rounded-2xl border px-4 py-3 transition-colors',
                        active
                          ? 'border-slate-600 bg-slate-800 text-white'
                          : 'border-transparent bg-transparent text-slate-300 hover:border-slate-800 hover:bg-slate-900'
                      )}
                    >
                      <div className="text-sm font-semibold">{item.label}</div>
                      <div className="mt-1 text-xs leading-5 text-slate-400">{item.description}</div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800 px-6 py-5">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-4">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Current view</div>
            <div className="mt-2 text-sm font-semibold text-white">{activeItem?.label ?? 'Unregistered route'}</div>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              This shell intentionally avoids real auth, RBAC, or API data until registry-first contracts are added.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

```

## `apps/admin/src/components/admin-skeleton-banner.tsx`

```tsx
import { Card, CardContent } from '@/components/ui/card';

export function AdminSkeletonBanner(): React.ReactElement {
  return (
    <Card className="border-brand/20 bg-brand-soft">
      <CardContent className="space-y-2 p-5">
        <div className="text-sm font-semibold text-slate-950">Admin Skeleton</div>
        <p className="text-sm text-slate-700">
          This batch is route-safe and registry-safe. Data, actions, and permissions are placeholders only. No real authentication, no real API,
          and no unregistered contract has been added here.
        </p>
      </CardContent>
    </Card>
  );
}

```

## `apps/admin/src/components/admin-topbar.tsx`

```tsx
'use client';

import { LAUNCH_MARKET, LAUNCH_RULE_VERSION } from '@queuefree/shared';
import { usePathname } from 'next/navigation';
import { getActiveNavItem } from '@/lib/navigation';

export function AdminTopbar(): React.ReactElement {
  const pathname = usePathname();
  const activeItem = getActiveNavItem(pathname);
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-[96rem] flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">QueueFree Admin</div>
          <div className="mt-1 text-lg font-bold tracking-tight text-slate-950">{activeItem?.label ?? 'Admin Skeleton'}</div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">Env: {appEnv}</span>
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">Market: {LAUNCH_MARKET}</span>
          <span className="rounded-full border border-border bg-panel px-3 py-2 font-semibold text-slate-600">
            Rule: {LAUNCH_RULE_VERSION}
          </span>
        </div>
      </div>
    </header>
  );
}

```

## `apps/admin/src/components/metric-card.tsx`

```tsx
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: string;
  description: string;
  tone?: BadgeTone;
};

export function MetricCard({ title, value, description, tone = 'slate' }: MetricCardProps): React.ReactElement {
  return (
    <Card className={cn(tone === 'brand' && 'border-brand/20', tone === 'warning' && 'border-warning/20', tone === 'danger' && 'border-danger/20')}>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-semibold text-slate-700">{title}</div>
          <Badge tone={tone}>{title}</Badge>
        </div>
        <div className="text-3xl font-bold tracking-tight text-slate-950">{value}</div>
        <p className="text-sm text-slate-600">{description}</p>
      </CardContent>
    </Card>
  );
}

```

## `apps/admin/src/components/module-detail-page.tsx`

```tsx
import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { DetailPageConfig } from '@/lib/admin-content';

export function ModuleDetailPage({ config }: { config: DetailPageConfig }): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.description}
          meta={config.meta}
        />

        <AdminSkeletonBanner />

        <div className="flex flex-wrap items-center gap-3">
          <Badge tone={config.badgeTone}>{config.badgeLabel}</Badge>
          <ButtonLink href={config.backHref} variant="secondary">
            Back to list
          </ButtonLink>
        </div>

        {config.metrics.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-4">
            {config.metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
          <div className="space-y-6">
            {config.sections.map((section) => (
              <Card key={section.title}>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title={section.title} description={section.description} />
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {section.rows.map((row) => (
                      <div key={row.label} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                        <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{row.label}</dt>
                        <dd className="mt-2 text-sm font-medium text-slate-900">{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Action placeholders" description="Buttons stay informational until action contracts are registered." />
                <div className="space-y-3">
                  {config.actions.map((action) => (
                    <div key={action} className="rounded-2xl border border-border bg-panel-muted px-4 py-3 text-sm text-slate-700">
                      {action}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Route and module alignment" description="This detail page stays within the frozen route scope." />
                <ul className="space-y-3 text-sm text-slate-600">
                  {config.notes.map((note) => (
                    <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                      {note}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title="Related navigation" description="Use frozen routes only." />
                <div className="flex flex-wrap gap-2">
                  {config.relatedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </PageShell>
  );
}

```

## `apps/admin/src/components/module-list-page.tsx`

```tsx
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { SectionTitle } from '@/components/section-title';
import { DataTable, type DataTableConfig } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import type { ListPageConfig } from '@/lib/admin-content';

export function ModuleListPage({ config }: { config: ListPageConfig }): React.ReactElement {
  return (
    <PageShell>
      <div className="space-y-8">
        <AdminPageHeader
          eyebrow={config.eyebrow}
          title={config.title}
          description={config.description}
          meta={config.meta}
        />

        <AdminSkeletonBanner />

        {config.metrics.length > 0 ? (
          <section className="grid gap-4 lg:grid-cols-4">
            {config.metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </section>
        ) : null}

        <section className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title={config.tableTitle} description={config.tableDescription} />
              <DataTable columns={config.table.columns} rows={config.table.rows} emptyMessage={config.table.emptyMessage} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4 p-6">
              <SectionTitle title="Current skeleton notes" description="These notes explain why the screen is intentionally static in batch 4." />
              <ul className="space-y-3 text-sm text-slate-600">
                {config.notes.map((note) => (
                  <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                    {note}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {config.secondaryTable ? (
          <section>
            <Card>
              <CardContent className="space-y-4 p-6">
                <SectionTitle title={config.secondaryTable.title} description={config.secondaryTable.description} />
                <DataTable
                  columns={config.secondaryTable.columns}
                  rows={config.secondaryTable.rows}
                  emptyMessage={config.secondaryTable.emptyMessage}
                />
              </CardContent>
            </Card>
          </section>
        ) : null}
      </div>
    </PageShell>
  );
}

```

## `apps/admin/src/components/page-shell.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

type PageShellProps = {
  children: React.ReactNode;
  width?: 'default' | 'narrow';
};

export function PageShell({ children, width = 'default' }: PageShellProps): React.ReactElement {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-8 sm:px-6 lg:px-8',
        width === 'default' ? 'max-w-[96rem]' : 'max-w-3xl'
      )}
    >
      {children}
    </div>
  );
}

```

## `apps/admin/src/components/section-title.tsx`

```tsx
type SectionTitleProps = {
  title: string;
  description: string;
};

export function SectionTitle({ title, description }: SectionTitleProps): React.ReactElement {
  return (
    <div className="space-y-1">
      <h2 className="text-lg font-bold tracking-tight text-slate-950">{title}</h2>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

```

## `apps/admin/src/components/ui/badge.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

const tones = {
  slate: 'border-border bg-white text-slate-700',
  brand: 'border-brand/20 bg-brand-soft text-blue-900',
  accent: 'border-accent/20 bg-accent-soft text-teal-900',
  warning: 'border-warning/20 bg-warning-soft text-amber-900',
  danger: 'border-danger/20 bg-danger-soft text-red-900'
} as const;

export type BadgeTone = keyof typeof tones;

export function Badge({
  children,
  tone = 'slate',
  className
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}): React.ReactElement {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold', tones[tone], className)}>
      {children}
    </span>
  );
}

```

## `apps/admin/src/components/ui/button.tsx`

```tsx
import Link from 'next/link';
import * as React from 'react';
import { cn } from '@/lib/utils';

const styles = {
  primary: 'border-transparent bg-brand text-white hover:bg-blue-700',
  secondary: 'border-border bg-white text-slate-900 hover:bg-slate-50',
  ghost: 'border-transparent bg-transparent text-slate-700 hover:bg-slate-100'
} as const;

type ButtonVariant = keyof typeof styles;

type BaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

export function ButtonLink({
  href,
  variant = 'primary',
  className,
  children
}: BaseProps & { href: string }): React.ReactElement {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors',
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Button({
  type = 'button',
  variant = 'primary',
  className,
  children,
  ...props
}: BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

```

## `apps/admin/src/components/ui/card.tsx`

```tsx
import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn('rounded-[1.5rem] border border-border bg-panel shadow-panel', className)} {...props} />;
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn('border-b border-border px-6 py-5', className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>): React.ReactElement {
  return <h2 className={cn('text-lg font-bold tracking-tight text-slate-950', className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  return <div className={cn('px-6 py-5', className)} {...props} />;
}

```

## `apps/admin/src/components/ui/data-table.tsx`

```tsx
import { Badge, type BadgeTone } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type TableCellValue =
  | string
  | number
  | {
      label: string;
      tone?: BadgeTone;
    };

export type DataTableColumn = {
  key: string;
  label: string;
  align?: 'left' | 'right';
};

export type DataTableRow = Record<string, TableCellValue>;

export type DataTableConfig = {
  columns: DataTableColumn[];
  rows: DataTableRow[];
  emptyMessage?: string;
};

function renderCell(value: TableCellValue): React.ReactNode {
  if (typeof value === 'string' || typeof value === 'number') {
    return value;
  }

  return <Badge tone={value.tone}>{value.label}</Badge>;
}

export function DataTable({
  columns,
  rows,
  emptyMessage = 'No placeholder rows were configured for this skeleton view.'
}: DataTableConfig): React.ReactElement {
  if (rows.length === 0) {
    return <div className="rounded-2xl border border-dashed border-border px-4 py-8 text-sm text-slate-500">{emptyMessage}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="min-w-full border-collapse">
        <thead className="bg-panel-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500',
                  column.align === 'right' && 'text-right'
                )}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-border">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={cn(
                    'px-4 py-4 text-sm text-slate-700',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {renderCell(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

```

## `apps/admin/src/components/ui/input.tsx`

```tsx
type InputProps = {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
};

export function Input({ label, placeholder, type = 'text' }: InputProps): React.ReactElement {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-brand"
      />
    </label>
  );
}

```

## `apps/admin/src/lib/admin-content.ts`

```ts
import {
  ACCOUNT_DELETE_STATUSES,
  ADMIN_ROLES,
  INVITE_MAX_DEPTH,
  INVITE_RELATION_STATUSES,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  ORDER_STATUSES,
  QUEUE_BOOST_MAX_PER_ENTRY,
  QUEUE_ENTRY_STATUSES,
  QUEUE_TOP_PROTECTED_COUNT,
  SETTLEMENT_SLOT_STATUSES,
  USER_QUEUE_GUARD_STATUSES,
  WALLET_ACTIVATION_METHODS,
  WITHDRAWAL_STATUSES,
  formatDateTime,
  formatMinorMoney
} from '@queuefree/shared';
import type { BadgeTone } from '@/components/ui/badge';
import type { DataTableConfig } from '@/components/ui/data-table';

export type Metric = {
  title: string;
  value: string;
  description: string;
  tone?: BadgeTone;
};

export type ListPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  metrics: Metric[];
  tableTitle: string;
  tableDescription: string;
  table: DataTableConfig;
  secondaryTable?: DataTableConfig & {
    title: string;
    description: string;
  };
  notes: string[];
};

export type DetailSection = {
  title: string;
  description: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
};

export type DetailPageConfig = {
  eyebrow: string;
  title: string;
  description: string;
  meta: string[];
  badgeLabel: string;
  badgeTone: BadgeTone;
  backHref: string;
  metrics: Metric[];
  sections: DetailSection[];
  actions: string[];
  notes: string[];
  relatedLinks: Array<{
    href: string;
    label: string;
  }>;
};

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');
const nextSlotAt = formatDateTime('2026-03-11T12:00:00.000Z');
const lastDeliveryAt = formatDateTime('2026-03-10T06:15:00.000Z');

function statusTone(value: string): BadgeTone {
  if (value.includes('FAILED') || value.includes('REJECTED') || value.includes('REMOVED') || value.includes('INVALID')) {
    return 'danger';
  }

  if (value.includes('FROZEN') || value.includes('RISK') || value.includes('PENDING') || value.includes('GRACE')) {
    return 'warning';
  }

  if (value.includes('SUCCESS') || value.includes('SUCCEEDED') || value.includes('ACTIVE') || value.includes('EFFECTIVE')) {
    return 'accent';
  }

  return 'brand';
}

export const dashboardMetrics: Metric[] = [
  {
    title: 'Active queue entries',
    value: '1,284',
    description: `Includes only ${QUEUE_ENTRY_STATUSES[1]} entries eligible for slot settlement.`,
    tone: 'accent'
  },
  {
    title: 'Pending release',
    value: formatMinorMoney(486500),
    description: 'Won orders remain in pending balance until delivery plus observation period.',
    tone: 'warning'
  },
  {
    title: 'Withdrawals in review',
    value: '27',
    description: `Pipeline spans ${WITHDRAWAL_STATUSES[1]} and ${WITHDRAWAL_STATUSES[2]} only.`,
    tone: 'brand'
  },
  {
    title: 'Open risk backlog',
    value: '14',
    description: 'Orders, invites, and withdrawals awaiting manual decision.',
    tone: 'danger'
  }
];

export const dashboardQueueTable: DataTableConfig = {
  columns: [
    { key: 'module', label: 'Module' },
    { key: 'snapshot', label: 'Snapshot' },
    { key: 'note', label: 'Current note' }
  ],
  rows: [
    {
      module: 'Queue protection',
      snapshot: `${QUEUE_TOP_PROTECTED_COUNT} protected positions`,
      note: 'Boost cannot enter or cross the protected zone.'
    },
    {
      module: 'Boost limit',
      snapshot: `${QUEUE_BOOST_MAX_PER_ENTRY} per order`,
      note: 'Still a placeholder action in Admin until write contracts are registered.'
    },
    {
      module: 'Next slot',
      snapshot: nextSlotAt,
      note: 'Slot execution and replay controls remain non-functional in this batch.'
    }
  ]
};

export const dashboardWalletTable: DataTableConfig = {
  columns: [
    { key: 'scope', label: 'Scope' },
    { key: 'status', label: 'Status' },
    { key: 'amount', label: 'Amount', align: 'right' },
    { key: 'note', label: 'Note' }
  ],
  rows: [
    {
      scope: 'Pending cashback release',
      status: { label: QUEUE_ENTRY_STATUSES[5], tone: statusTone(QUEUE_ENTRY_STATUSES[5]) },
      amount: formatMinorMoney(486500),
      note: 'Delivery observation window still applies.'
    },
    {
      scope: 'Withdrawals awaiting finance',
      status: { label: WITHDRAWAL_STATUSES[1], tone: statusTone(WITHDRAWAL_STATUSES[1]) },
      amount: formatMinorMoney(193000),
      note: 'Finance decision remains a placeholder.'
    },
    {
      scope: 'Withdrawals processing',
      status: { label: WITHDRAWAL_STATUSES[2], tone: statusTone(WITHDRAWAL_STATUSES[2]) },
      amount: formatMinorMoney(72500),
      note: 'No payout provider integration in this batch.'
    }
  ]
};

export const dashboardBacklogTable: DataTableConfig = {
  columns: [
    { key: 'lane', label: 'Lane' },
    { key: 'count', label: 'Count', align: 'right' },
    { key: 'priority', label: 'Priority' },
    { key: 'note', label: 'Next contract dependency' }
  ],
  rows: [
    {
      lane: 'Order aftersale review',
      count: '8',
      priority: { label: 'High', tone: 'warning' },
      note: 'Requires registered Admin order action payload.'
    },
    {
      lane: 'Queue removal review',
      count: '5',
      priority: { label: 'High', tone: 'warning' },
      note: 'Requires registered Admin queue action payload.'
    },
    {
      lane: 'Withdrawal review',
      count: '27',
      priority: { label: 'Critical', tone: 'danger' },
      note: 'Needs registered Admin withdrawal decision contract.'
    },
    {
      lane: 'Risk case decision',
      count: '14',
      priority: { label: 'Critical', tone: 'danger' },
      note: 'Needs registered risk decision payload and audit reason contract.'
    }
  ]
};

export const dashboardRiskNotes = [
  'No Admin API path has been added in this batch. The app is route-safe, not data-complete.',
  'The frontend will not invent request or response fields for approvals, actions, or audit reasons.',
  `Shared rule version remains locked to ${LAUNCH_RULE_VERSION} for market ${LAUNCH_MARKET}.`,
  'Any new Admin mutation must update the registry baseline first, then OpenAPI, then packages/api-client.'
];

function baseMeta(): string[] {
  return [`Market: ${LAUNCH_MARKET}`, `Timezone: ${LAUNCH_TIMEZONE}`, `Rule: ${LAUNCH_RULE_VERSION}`, `Snapshot: ${generatedAt}`];
}

const listConfigs: Record<
  'products' | 'orders' | 'queues' | 'slots' | 'campaigns' | 'tasks' | 'invites' | 'wallet' | 'withdrawals' | 'risk' | 'governance' | 'audit',
  ListPageConfig
> = {
  products: {
    eyebrow: 'Operations · Products',
    title: 'Products',
    description: 'Skeleton list for catalog, queue eligibility, and campaign binding under the frozen /products route.',
    meta: baseMeta(),
    metrics: [
      { title: 'Sellable in PH', value: '18', description: 'Products currently exposed to the single launch market.', tone: 'accent' },
      { title: 'Queue enabled', value: '13', description: 'Only queue-eligible products may create queue seats.', tone: 'brand' },
      { title: 'Campaign bound', value: '4', description: 'Products with active campaign binding placeholders.', tone: 'warning' },
      { title: 'Needs stock review', value: '2', description: 'Placeholder flag for stock and pricing validation.', tone: 'danger' }
    ],
    tableTitle: 'Catalog placeholder rows',
    tableDescription: 'These rows are presentation-only and do not imply a final Admin API response.',
    table: {
      columns: [
        { key: 'productId', label: 'Product ID' },
        { key: 'market', label: 'Market' },
        { key: 'queue', label: 'Queue' },
        { key: 'campaign', label: 'Campaign binding' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          productId: 'prod-demo-101',
          market: 'PH',
          queue: { label: 'Enabled', tone: 'accent' },
          campaign: 'March Starter Promo',
          note: 'Queueable consumer gadget bundle.'
        },
        {
          productId: 'prod-demo-202',
          market: 'PH',
          queue: { label: 'Disabled', tone: 'warning' },
          campaign: 'None',
          note: 'Inventory or fulfilment review required before queue enablement.'
        },
        {
          productId: 'prod-demo-303',
          market: 'PH',
          queue: { label: 'Enabled', tone: 'accent' },
          campaign: 'Queue Booster Week',
          note: 'Keep activity rules copy aligned with public website.'
        }
      ]
    },
    secondaryTable: {
      title: 'Why the page stays static',
      description: 'Product CRUD and SKU editing need registered Admin contracts before implementation.',
      columns: [
        { key: 'module', label: 'Need' },
        { key: 'status', label: 'Current state' },
        { key: 'dependency', label: 'Dependency' }
      ],
      rows: [
        {
          module: 'Product list API',
          status: { label: 'Not connected', tone: 'warning' },
          dependency: 'Register Admin read-only product contract.'
        },
        {
          module: 'Product write actions',
          status: { label: 'Blocked', tone: 'danger' },
          dependency: 'Register product CRUD payloads and audit reason fields.'
        }
      ]
    },
    notes: [
      'No product DTO or Swagger type has been copied into frontend code.',
      'Queue enablement remains visual-only until Admin write endpoints are registered.',
      'Campaign binding stays descriptive so frontend does not invent nested product schemas.'
    ]
  },
  orders: {
    eyebrow: 'Operations · Orders',
    title: 'Orders',
    description: 'Skeleton list for order lookup, fulfilment visibility, and aftersale notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Paid orders', value: '162', description: `Rows commonly show ${ORDER_STATUSES[2]} or later lifecycle stages.`, tone: 'accent' },
      { title: 'Awaiting fulfilment', value: '37', description: ORDER_STATUSES[3], tone: 'brand' },
      { title: 'Aftersale open', value: '9', description: ORDER_STATUSES[8], tone: 'warning' },
      { title: 'Refund risk', value: '4', description: `${ORDER_STATUSES[9]} or ${ORDER_STATUSES[10]} need queue clawback review.`, tone: 'danger' }
    ],
    tableTitle: 'Order placeholder rows',
    tableDescription: 'List page aligns to PRD order management scope without inventing Admin action payloads.',
    table: {
      columns: [
        { key: 'orderId', label: 'Order ID' },
        { key: 'status', label: 'Status' },
        { key: 'queueSeat', label: 'Queue seat' },
        { key: 'amount', label: 'Paid amount', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          orderId: 'ord-demo-5001',
          status: { label: ORDER_STATUSES[2], tone: statusTone(ORDER_STATUSES[2]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(159900),
          note: 'Ready for queue entry creation after risk pass.'
        },
        {
          orderId: 'ord-demo-5002',
          status: { label: ORDER_STATUSES[8], tone: statusTone(ORDER_STATUSES[8]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(219900),
          note: 'Aftersale review may imply cashback clawback later.'
        },
        {
          orderId: 'ord-demo-5003',
          status: { label: ORDER_STATUSES[5], tone: statusTone(ORDER_STATUSES[5]) },
          queueSeat: '1 seat',
          amount: formatMinorMoney(89900),
          note: 'Delivery timestamp becomes truth source for pending release countdown.'
        }
      ]
    },
    notes: [
      'No hidden order mutation is wired here. Batch 4 is read-only by design.',
      'Backend order adjustment, refund entry, and logistics write operations must be registered before frontend actions exist.',
      'The table is a placeholder screen, not a final API response contract.'
    ]
  },
  queues: {
    eyebrow: 'Operations · Queues',
    title: 'Queues',
    description: 'Skeleton list for queue pool health, effective rank visibility, and freeze or removal review.',
    meta: baseMeta(),
    metrics: [
      { title: 'Active entries', value: '1,284', description: QUEUE_ENTRY_STATUSES[1], tone: 'accent' },
      { title: 'Frozen entries', value: '86', description: QUEUE_ENTRY_STATUSES[2], tone: 'warning' },
      { title: 'Winning pending release', value: '21', description: QUEUE_ENTRY_STATUSES[5], tone: 'brand' },
      { title: 'Removed entries', value: '48', description: QUEUE_ENTRY_STATUSES[4], tone: 'danger' }
    ],
    tableTitle: 'Queue entry placeholder rows',
    tableDescription: 'Current effective rank is descriptive only; no queue write actions are attached.',
    table: {
      columns: [
        { key: 'entryId', label: 'Entry ID' },
        { key: 'status', label: 'Status' },
        { key: 'effectiveRank', label: 'Effective rank', align: 'right' },
        { key: 'boostUsed', label: 'Boost used', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          entryId: 'qe-demo-9001',
          status: { label: QUEUE_ENTRY_STATUSES[1], tone: statusTone(QUEUE_ENTRY_STATUSES[1]) },
          effectiveRank: '31',
          boostUsed: '2 / 2',
          note: `Best possible boost insertion still stops at rank ${QUEUE_TOP_PROTECTED_COUNT + 1}.`
        },
        {
          entryId: 'qe-demo-9002',
          status: { label: QUEUE_ENTRY_STATUSES[2], tone: statusTone(QUEUE_ENTRY_STATUSES[2]) },
          effectiveRank: '—',
          boostUsed: '1 / 2',
          note: `User guard is currently ${USER_QUEUE_GUARD_STATUSES[1]}.`
        },
        {
          entryId: 'qe-demo-9003',
          status: { label: QUEUE_ENTRY_STATUSES[5], tone: statusTone(QUEUE_ENTRY_STATUSES[5]) },
          effectiveRank: 'Winner',
          boostUsed: '0 / 2',
          note: 'Pending release remains blocked until delivery plus observation window.'
        }
      ]
    },
    notes: [
      'Queue ranking, freeze, restore, and remove operations must remain backend-transactional and are not wired in this batch.',
      `Boost rules still follow shared hard limits: max ${QUEUE_BOOST_MAX_PER_ENTRY} per order and no crossing the Top${QUEUE_TOP_PROTECTED_COUNT}.`,
      'Event log rows are placeholders only until a read contract is registered.'
    ]
  },
  slots: {
    eyebrow: 'Operations · Slots',
    title: 'Settlement slots',
    description: 'Skeleton list for slot scheduling, execution outcome, and replay surfaces.',
    meta: baseMeta(),
    metrics: [
      { title: 'Scheduled today', value: '3', description: 'Default daily slot count fallback for MVP launch.', tone: 'brand' },
      { title: 'Running now', value: '1', description: SETTLEMENT_SLOT_STATUSES[1], tone: 'warning' },
      { title: 'Succeeded', value: '8', description: SETTLEMENT_SLOT_STATUSES[2], tone: 'accent' },
      { title: 'Needs replay', value: '1', description: `${SETTLEMENT_SLOT_STATUSES[3]} or ${SETTLEMENT_SLOT_STATUSES[4]}`, tone: 'danger' }
    ],
    tableTitle: 'Slot placeholder rows',
    tableDescription: 'Rows reflect fixed-slot settlement thinking, but not a final Admin slot API shape.',
    table: {
      columns: [
        { key: 'slotId', label: 'Slot ID' },
        { key: 'status', label: 'Status' },
        { key: 'market', label: 'Market' },
        { key: 'slotAt', label: 'Slot at' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          slotId: 'slot-20260311-1200',
          status: { label: SETTLEMENT_SLOT_STATUSES[0], tone: statusTone(SETTLEMENT_SLOT_STATUSES[0]) },
          market: 'PH',
          slotAt: nextSlotAt,
          note: 'Scheduled slot awaiting dispatcher trigger.'
        },
        {
          slotId: 'slot-20260311-1600',
          status: { label: SETTLEMENT_SLOT_STATUSES[1], tone: statusTone(SETTLEMENT_SLOT_STATUSES[1]) },
          market: 'PH',
          slotAt: formatDateTime('2026-03-11T08:00:00.000Z'),
          note: 'Execution in progress. Replay controls stay disabled.'
        },
        {
          slotId: 'slot-20260310-2000',
          status: { label: SETTLEMENT_SLOT_STATUSES[4], tone: statusTone(SETTLEMENT_SLOT_STATUSES[4]) },
          market: 'PH',
          slotAt: formatDateTime('2026-03-10T12:00:00.000Z'),
          note: 'Replay placeholder only. Needs registered Admin replay action.'
        }
      ]
    },
    notes: [
      'Slot create, retry, and replay actions are intentionally not wired.',
      'Frontend does not invent winner payloads or settlement replay schemas.',
      'Slot timestamps remain displayed in the locked launch timezone.'
    ]
  },
  campaigns: {
    eyebrow: 'Operations · Campaigns',
    title: 'Campaigns',
    description: 'Skeleton list for campaign scope, cashback caps, extra slots, and public rules-copy surfaces.',
    meta: baseMeta(),
    metrics: [
      { title: 'Active campaigns', value: '4', description: 'Campaign shell only. No live write path in this batch.', tone: 'brand' },
      { title: 'Bound products', value: '9', description: 'Presentation-only count for product scope.', tone: 'accent' },
      { title: 'Extra slots planned', value: '2', description: 'Extra slot scheduling remains a placeholder.', tone: 'warning' },
      { title: 'Copy review needed', value: '1', description: 'Public activity rules page must stay aligned with admin configuration.', tone: 'danger' }
    ],
    tableTitle: 'Campaign placeholder rows',
    tableDescription: 'Campaign visuals help align frontend and backend without inventing a final contract.',
    table: {
      columns: [
        { key: 'campaignId', label: 'Campaign ID' },
        { key: 'status', label: 'Lifecycle' },
        { key: 'cap', label: 'Cashback cap', align: 'right' },
        { key: 'slotMode', label: 'Slot mode' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          campaignId: 'cmp-march-starter',
          status: { label: 'Drafted in skeleton', tone: 'warning' },
          cap: formatMinorMoney(200000),
          slotMode: 'Default slots',
          note: 'Keep public rules text synchronized after real contract registration.'
        },
        {
          campaignId: 'cmp-queue-booster',
          status: { label: 'Placeholder active', tone: 'accent' },
          cap: formatMinorMoney(150000),
          slotMode: 'Extra slot requested',
          note: 'Additional slot logic must stay backend-driven.'
        }
      ]
    },
    notes: [
      'Campaign rules text is a UI placeholder, not the public rules truth source.',
      'Frontend will not infer product inclusion arrays or campaign write payloads.',
      'Any new campaign route or field must be registered first.'
    ]
  },
  tasks: {
    eyebrow: 'Operations · Tasks',
    title: 'Tasks',
    description: 'Skeleton list for task definitions, lifecycle notes, and reward placeholder content.',
    meta: baseMeta(),
    metrics: [
      { title: 'New user tasks', value: '5', description: 'First-session education and activation placeholders.', tone: 'brand' },
      { title: 'Daily tasks', value: '3', description: 'Recurring participation shells only.', tone: 'accent' },
      { title: 'Trust tasks', value: '2', description: 'Manual verification surfaces not wired yet.', tone: 'warning' },
      { title: 'Needs reward contract', value: '4', description: 'Task reward payloads are not registered yet.', tone: 'danger' }
    ],
    tableTitle: 'Task placeholder rows',
    tableDescription: 'Tasks remain descriptive so frontend does not invent Admin task payloads.',
    table: {
      columns: [
        { key: 'taskId', label: 'Task ID' },
        { key: 'scope', label: 'Scope' },
        { key: 'reward', label: 'Reward hint' },
        { key: 'status', label: 'Lifecycle' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          taskId: 'task-checkin-streak',
          scope: 'Daily',
          reward: 'Guard time or soft incentive',
          status: { label: 'Skeleton only', tone: 'warning' },
          note: 'Do not finalize reward schema without registry registration.'
        },
        {
          taskId: 'task-first-order',
          scope: 'New user',
          reward: 'Onboarding reward',
          status: { label: 'Skeleton only', tone: 'warning' },
          note: 'Task claim endpoints already exist for C-end, Admin config does not yet.'
        }
      ]
    },
    notes: [
      'This page does not invent task definition fields or write payloads.',
      'Task lifecycle labels are local presentation content, not shared enums.',
      'Backend should register task admin read and write contracts separately.'
    ]
  },
  invites: {
    eyebrow: 'Operations · Invites',
    title: 'Invites',
    description: 'Skeleton list for invite relation lookup, effectiveness review, and activation notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Bound relations', value: '240', description: INVITE_RELATION_STATUSES[0], tone: 'brand' },
      { title: 'Pending effective', value: '31', description: INVITE_RELATION_STATUSES[1], tone: 'warning' },
      { title: 'Effective', value: '179', description: INVITE_RELATION_STATUSES[2], tone: 'accent' },
      { title: 'Invalid', value: '12', description: INVITE_RELATION_STATUSES[3], tone: 'danger' }
    ],
    tableTitle: 'Invite placeholder rows',
    tableDescription: 'Relation status and wallet activation hints use only shared frozen values.',
    table: {
      columns: [
        { key: 'relationId', label: 'Relation ID' },
        { key: 'status', label: 'Status' },
        { key: 'activation', label: 'Wallet activation' },
        { key: 'depth', label: 'Depth', align: 'right' },
        { key: 'note', label: 'Ops note' }
      ],
      rows: [
        {
          relationId: 'inv-rel-1001',
          status: { label: INVITE_RELATION_STATUSES[2], tone: statusTone(INVITE_RELATION_STATUSES[2]) },
          activation: WALLET_ACTIVATION_METHODS[0],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Effective after cooling-off and qualifying behavior.'
        },
        {
          relationId: 'inv-rel-1002',
          status: { label: INVITE_RELATION_STATUSES[1], tone: statusTone(INVITE_RELATION_STATUSES[1]) },
          activation: WALLET_ACTIVATION_METHODS[1],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Awaiting effectivity window.'
        },
        {
          relationId: 'inv-rel-1003',
          status: { label: INVITE_RELATION_STATUSES[3], tone: statusTone(INVITE_RELATION_STATUSES[3]) },
          activation: WALLET_ACTIVATION_METHODS[2],
          depth: String(INVITE_MAX_DEPTH),
          note: 'Invalidation reason must come from backend once contract is registered.'
        }
      ]
    },
    notes: [
      'Invite relation detail pages remain display-only.',
      'No extra invite depth or unofficial status has been introduced.',
      'Wallet activation method labels come from shared frozen enums only.'
    ]
  },
  wallet: {
    eyebrow: 'Funds · Wallet',
    title: 'Wallet',
    description: 'Skeleton overview for user wallet balances, activation hints, and append-only ledger placeholders.',
    meta: baseMeta(),
    metrics: [
      { title: 'Pending balance', value: formatMinorMoney(486500), description: 'Waiting for delivery and observation completion.', tone: 'warning' },
      { title: 'Available balance', value: formatMinorMoney(265200), description: 'Presentation-only amount for payout review shell.', tone: 'accent' },
      { title: 'Frozen balance', value: formatMinorMoney(82200), description: 'May be affected by risk, review, or clawback handling.', tone: 'brand' },
      { title: 'Exceptions flagged', value: '3', description: 'Front-end will not display negative wallet balances.', tone: 'danger' }
    ],
    tableTitle: 'Wallet overview placeholder rows',
    tableDescription: 'Wallet rows are user-facing summaries, not a final admin ledger schema.',
    table: {
      columns: [
        { key: 'scope', label: 'Scope' },
        { key: 'pending', label: 'Pending', align: 'right' },
        { key: 'available', label: 'Available', align: 'right' },
        { key: 'frozen', label: 'Frozen', align: 'right' },
        { key: 'note', label: 'Finance note' }
      ],
      rows: [
        {
          scope: 'user-demo-1001',
          pending: formatMinorMoney(125000),
          available: formatMinorMoney(63200),
          frozen: formatMinorMoney(0),
          note: `Last delivery reference: ${lastDeliveryAt}`
        },
        {
          scope: 'user-demo-2008',
          pending: formatMinorMoney(0),
          available: formatMinorMoney(94200),
          frozen: formatMinorMoney(17500),
          note: 'Frozen amount under manual review.'
        },
        {
          scope: 'user-demo-3011',
          pending: formatMinorMoney(361500),
          available: formatMinorMoney(107800),
          frozen: formatMinorMoney(64700),
          note: 'Potential exception note only; internal debt remains backend-only.'
        }
      ]
    },
    secondaryTable: {
      title: 'Activation and ledger placeholders',
      description: 'Activation methods use frozen shared enums. Ledger remains append-only in backend design.',
      columns: [
        { key: 'topic', label: 'Topic' },
        { key: 'value', label: 'Current placeholder' },
        { key: 'note', label: 'Why it matters' }
      ],
      rows: [
        {
          topic: 'Activation methods',
          value: WALLET_ACTIVATION_METHODS.join(', '),
          note: 'UI copy must stay aligned with backend wallet-activation truth.'
        },
        {
          topic: 'Account deletion guard',
          value: ACCOUNT_DELETE_STATUSES.join(', '),
          note: 'Delete-account readiness may depend on wallet settlement completion.'
        }
      ]
    },
    notes: [
      'No ledger API contract has been invented here.',
      'Recoverable debt remains backend-internal and is not surfaced as a negative visible balance.',
      'Withdrawal and risk linkage remain placeholders until registered contracts exist.'
    ]
  },
  withdrawals: {
    eyebrow: 'Funds · Withdrawals',
    title: 'Withdrawals',
    description: 'Skeleton list for withdrawal pipeline, finance review, and payout placeholder handling.',
    meta: baseMeta(),
    metrics: [
      { title: 'Applied', value: '41', description: WITHDRAWAL_STATUSES[0], tone: 'brand' },
      { title: 'Risk review', value: '18', description: WITHDRAWAL_STATUSES[1], tone: 'warning' },
      { title: 'Processing', value: '9', description: WITHDRAWAL_STATUSES[2], tone: 'accent' },
      { title: 'Rejected or failed', value: '5', description: `${WITHDRAWAL_STATUSES[4]} / ${WITHDRAWAL_STATUSES[5]}`, tone: 'danger' }
    ],
    tableTitle: 'Withdrawal placeholder rows',
    tableDescription: 'List rows use only frozen withdrawal statuses and no unregistered action payloads.',
    table: {
      columns: [
        { key: 'withdrawalId', label: 'Withdrawal ID' },
        { key: 'status', label: 'Status' },
        { key: 'amount', label: 'Amount', align: 'right' },
        { key: 'channel', label: 'Channel' },
        { key: 'note', label: 'Finance note' }
      ],
      rows: [
        {
          withdrawalId: 'wd-20260311-001',
          status: { label: WITHDRAWAL_STATUSES[1], tone: statusTone(WITHDRAWAL_STATUSES[1]) },
          amount: formatMinorMoney(30000),
          channel: 'Bank placeholder',
          note: 'Needs risk review and finance context.'
        },
        {
          withdrawalId: 'wd-20260311-014',
          status: { label: WITHDRAWAL_STATUSES[2], tone: statusTone(WITHDRAWAL_STATUSES[2]) },
          amount: formatMinorMoney(80000),
          channel: 'Wallet-to-bank placeholder',
          note: 'No payout provider status mapping in batch 4.'
        },
        {
          withdrawalId: 'wd-20260310-022',
          status: { label: WITHDRAWAL_STATUSES[4], tone: statusTone(WITHDRAWAL_STATUSES[4]) },
          amount: formatMinorMoney(45000),
          channel: 'Bank placeholder',
          note: 'Rejection reason is not modeled here until registered.'
        }
      ]
    },
    notes: [
      'Approval, rejection, and payout operations are intentionally disabled.',
      'No rejection-reason schema has been invented.',
      'Withdrawal actions must include audit and idempotency handling once backend registers them.'
    ]
  },
  risk: {
    eyebrow: 'Funds & Risk · Cases',
    title: 'Risk cases',
    description: 'Skeleton case pool for abnormal orders, invites, withdrawals, and queue reviews.',
    meta: baseMeta(),
    metrics: [
      { title: 'Queue-related cases', value: '5', description: 'Freeze, remove, and restore review placeholders.', tone: 'warning' },
      { title: 'Order-related cases', value: '3', description: 'Split-order and aftersale risk shells.', tone: 'danger' },
      { title: 'Invite-related cases', value: '2', description: 'Effectivity and invalidation review shells.', tone: 'brand' },
      { title: 'Withdrawal-related cases', value: '4', description: 'Manual payout review remains blocked until contract registration.', tone: 'accent' }
    ],
    tableTitle: 'Risk case placeholder rows',
    tableDescription: 'This page avoids new risk enums and keeps status language local to the screen.',
    table: {
      columns: [
        { key: 'caseId', label: 'Case ID' },
        { key: 'objectType', label: 'Object type' },
        { key: 'signal', label: 'Primary signal' },
        { key: 'priority', label: 'Priority' },
        { key: 'note', label: 'Current note' }
      ],
      rows: [
        {
          caseId: 'risk-1001',
          objectType: 'Withdrawal',
          signal: 'High-value payout review',
          priority: { label: 'Critical', tone: 'danger' },
          note: 'Awaiting registered decision payload.'
        },
        {
          caseId: 'risk-1002',
          objectType: 'Order',
          signal: 'Rapid split-order pattern',
          priority: { label: 'High', tone: 'warning' },
          note: 'May affect queue eligibility if backend confirms.'
        },
        {
          caseId: 'risk-1003',
          objectType: 'Invite',
          signal: 'Effectivity exception',
          priority: { label: 'Medium', tone: 'brand' },
          note: 'Review relation lifecycle against invite rules.'
        }
      ]
    },
    notes: [
      'This page intentionally avoids inventing a frozen risk-status enum.',
      'Decision, freeze, and release actions require registry-first payload registration.',
      'Case linkage to orders, invites, withdrawals, and queues stays descriptive only.'
    ]
  },
  governance: {
    eyebrow: 'Governance',
    title: 'Governance',
    description: 'Skeleton governance surface for RBAC, role matrix, and sensitive-operation approval notes.',
    meta: baseMeta(),
    metrics: [
      { title: 'Roles registered', value: String(ADMIN_ROLES.length), description: 'Only frozen Admin roles are displayed.', tone: 'brand' },
      { title: 'Sensitive domains', value: '4', description: 'Funds, risk, governance, and queue-control surfaces.', tone: 'warning' },
      { title: 'Approval notes required', value: '6', description: 'Placeholder count for sensitive write actions.', tone: 'accent' },
      { title: 'Blocked write flows', value: '8', description: 'No real write flow until contract registration.', tone: 'danger' }
    ],
    tableTitle: 'Role matrix placeholder',
    tableDescription: 'Role names come directly from shared frozen enums. Scope text is UI-only.',
    table: {
      columns: [
        { key: 'role', label: 'Role' },
        { key: 'scope', label: 'Primary scope' },
        { key: 'restricted', label: 'Sensitive limit' },
        { key: 'note', label: 'Governance note' }
      ],
      rows: ADMIN_ROLES.map((role) => ({
        role,
        scope:
          role === 'SUPER_ADMIN'
            ? 'All modules'
            : role === 'OPS_ADMIN'
              ? 'Products, campaigns, tasks, slots'
              : role === 'CS_ADMIN'
                ? 'Read-only customer support surfaces'
                : role === 'FINANCE_ADMIN'
                  ? 'Wallet and withdrawals'
                  : 'Risk review and enforcement',
        restricted:
          role === 'OPS_ADMIN'
            ? 'Cannot move wallet funds'
            : role === 'CS_ADMIN'
              ? 'Cannot approve finance or risk actions'
              : role === 'FINANCE_ADMIN'
                ? 'Cannot alter product or queue rules'
                : role === 'RISK_ADMIN'
                  ? 'Cannot rewrite public compliance routes'
                  : 'Requires audit reason on sensitive actions',
        note: 'UI matrix only. Real RBAC policy stays backend-owned.'
      }))
    },
    notes: [
      'Role values use only the shared frozen AdminRole enum.',
      'Permission granularity is intentionally described in prose until backend registers policy details.',
      'Sensitive-operation reason capture should be modeled with audit contracts before UI forms exist.'
    ]
  },
  audit: {
    eyebrow: 'Governance · Audit',
    title: 'Audit log',
    description: 'Skeleton audit view for sensitive operations, traceability, and export placeholder planning.',
    meta: baseMeta(),
    metrics: [
      { title: 'Tracked domains', value: '11', description: 'Products, orders, queues, slots, campaigns, tasks, invites, wallet, withdrawals, risk, governance.', tone: 'brand' },
      { title: 'Sensitive actions pending contract', value: '8', description: 'Write flows still blocked in this batch.', tone: 'warning' },
      { title: 'Export placeholder', value: '1', description: 'Export UI stays informational only.', tone: 'accent' },
      { title: 'Missing reason schema', value: '1', description: 'Audit reason payload not registered yet.', tone: 'danger' }
    ],
    tableTitle: 'Audit placeholder rows',
    tableDescription: 'Rows illustrate the kind of traceability the backend should later expose.',
    table: {
      columns: [
        { key: 'time', label: 'Time' },
        { key: 'actor', label: 'Actor' },
        { key: 'module', label: 'Module' },
        { key: 'action', label: 'Action' },
        { key: 'reason', label: 'Reason placeholder' }
      ],
      rows: [
        {
          time: generatedAt,
          actor: 'finance-admin-demo',
          module: 'Withdrawals',
          action: 'Placeholder review open',
          reason: 'Reason schema not registered yet.'
        },
        {
          time: formatDateTime('2026-03-11T05:30:00.000Z'),
          actor: 'risk-admin-demo',
          module: 'Risk',
          action: 'Placeholder case inspection',
          reason: 'Decision payload intentionally absent.'
        },
        {
          time: formatDateTime('2026-03-10T14:20:00.000Z'),
          actor: 'ops-admin-demo',
          module: 'Slots',
          action: 'Placeholder replay investigation',
          reason: 'Replay action contract not registered.'
        }
      ]
    },
    notes: [
      'This table is illustrative only and does not define a final audit schema.',
      'Audit export remains a placeholder link or button until backend registration happens.',
      'Sensitive reasons must be registered before the UI adds structured input.'
    ]
  }
};

export function getListPageConfig(
  key: keyof typeof listConfigs
): ListPageConfig {
  return listConfigs[key];
}

export function getDetailPageConfig(
  key: 'product' | 'order' | 'queue' | 'slot' | 'campaign' | 'task' | 'invite' | 'risk',
  id: string
): DetailPageConfig {
  switch (key) {
    case 'product':
      return {
        eyebrow: 'Operations · Product detail',
        title: `Product ${id}`,
        description: 'Catalog detail shell for pricing, queue eligibility, stock notes, and campaign bindings.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Frozen route detail',
        badgeTone: 'brand',
        backHref: '/products',
        metrics: [
          { title: 'Queue eligibility', value: 'Enabled', description: 'Placeholder only. No write action attached.', tone: 'accent' },
          { title: 'Market scope', value: LAUNCH_MARKET, description: 'Single launch market is locked in v1.2.', tone: 'brand' },
          { title: 'Default cap', value: formatMinorMoney(200000), description: 'Product-level cashback cap placeholder.', tone: 'warning' },
          { title: 'Stock review', value: 'Manual', description: 'Stock editing is out of scope in this batch.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Catalog overview',
            description: 'Baseline placeholders for a product record.',
            rows: [
              { label: 'Product ID', value: id },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Queue setting', value: 'Queue-enabled placeholder' },
              { label: 'Activity binding', value: 'March Starter Promo placeholder' }
            ]
          },
          {
            title: 'Pricing and stock',
            description: 'Displayed as screen copy only, not a final API contract.',
            rows: [
              { label: 'Current price hint', value: formatMinorMoney(159900) },
              { label: 'Inventory hint', value: 'Stock managed by backend truth source' },
              { label: 'SKU scope', value: 'Single-product order model preserved' },
              { label: 'Admin action state', value: 'Read-only skeleton' }
            ]
          }
        ],
        actions: [
          'Create product — disabled until registry and OpenAPI registration.',
          'Update queue setting — disabled until Admin write contract exists.',
          'Bind to campaign — disabled until campaign write contract exists.'
        ],
        notes: [
          'This page must not define product write payloads ahead of backend registration.',
          'Queue enablement and campaign binding are shown only as placeholders.',
          'The route is frozen; the data schema is not invented here.'
        ],
        relatedLinks: [
          { href: '/products', label: 'Products' },
          { href: '/campaigns', label: 'Campaigns' },
          { href: '/orders', label: 'Orders' }
        ]
      };

    case 'order':
      return {
        eyebrow: 'Operations · Order detail',
        title: `Order ${id}`,
        description: 'Order detail shell for fulfilment, queue linkage, payment snapshot, and aftersale placeholder handling.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: ORDER_STATUSES[2],
        badgeTone: statusTone(ORDER_STATUSES[2]),
        backHref: '/orders',
        metrics: [
          { title: 'Order state', value: ORDER_STATUSES[2], description: 'Sample state only; no live fetch in batch 4.', tone: 'accent' },
          { title: 'Quantity', value: '2', description: 'One order can have quantity > 1 but still only one queue seat.', tone: 'brand' },
          { title: 'Paid amount', value: formatMinorMoney(219900), description: 'Minor-unit formatted via shared formatter.', tone: 'warning' },
          { title: 'Queue seat', value: '1', description: 'Hard rule from PRD and shared constants.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Order snapshot',
            description: 'Static placeholders aligned to PRD order concepts.',
            rows: [
              { label: 'Order ID', value: id },
              { label: 'Current status', value: ORDER_STATUSES[2] },
              { label: 'Launch market', value: LAUNCH_MARKET },
              { label: 'Rule version', value: LAUNCH_RULE_VERSION }
            ]
          },
          {
            title: 'Fulfilment and queue',
            description: 'These labels do not define any backend response shape.',
            rows: [
              { label: 'Queue linkage', value: '1 order = 1 queue entry' },
              { label: 'Shipping truth source', value: 'Logistics callback or admin confirmation' },
              { label: 'Delivery reference', value: lastDeliveryAt },
              { label: 'Aftersale placeholder', value: ORDER_STATUSES[8] }
            ]
          }
        ],
        actions: [
          'Reduce quantity — disabled until registered Admin order action.',
          'Record refund / aftersale — disabled until registry and OpenAPI are updated.',
          'Override fulfilment state — disabled until registered audit-aware mutation exists.'
        ],
        notes: [
          'No refund payload or logistics patch schema has been added here.',
          'The frontend screen should consume generated Admin APIs later, not internal backend types.',
          'Queue seat behavior remains fixed: quantity changes amount, not seat count.'
        ],
        relatedLinks: [
          { href: '/orders', label: 'Orders' },
          { href: '/queues', label: 'Queues' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'queue':
      return {
        eyebrow: 'Operations · Queue detail',
        title: `Queue entry ${id}`,
        description: 'Queue detail shell for status, effective rank, guard linkage, settlement context, and event-log placeholders.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: QUEUE_ENTRY_STATUSES[1],
        badgeTone: statusTone(QUEUE_ENTRY_STATUSES[1]),
        backHref: '/queues',
        metrics: [
          { title: 'Effective rank', value: '31', description: `Rank ${QUEUE_TOP_PROTECTED_COUNT + 1} is the best boost target outside the protected zone.`, tone: 'accent' },
          { title: 'Boost used', value: '2 / 2', description: `Per-order boost cap is ${QUEUE_BOOST_MAX_PER_ENTRY}.`, tone: 'warning' },
          { title: 'Guard state', value: USER_QUEUE_GUARD_STATUSES[0], description: 'Guard remains user-level, not order-level.', tone: 'brand' },
          { title: 'Settlement context', value: nextSlotAt, description: 'Winner selection occurs on fixed settlement slots only.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Queue state',
            description: 'Frozen-route detail view for a single queue entry.',
            rows: [
              { label: 'Entry ID', value: id },
              { label: 'Current status', value: QUEUE_ENTRY_STATUSES[1] },
              { label: 'Protected zone size', value: String(QUEUE_TOP_PROTECTED_COUNT) },
              { label: 'Current effective rank', value: '31' }
            ]
          },
          {
            title: 'Guard and settlement',
            description: 'Queue rules stay aligned to shared constants and PRD v1.2.',
            rows: [
              { label: 'User guard status', value: USER_QUEUE_GUARD_STATUSES[0] },
              { label: 'Next slot', value: nextSlotAt },
              { label: 'Boost rule', value: `No entry may cross Top${QUEUE_TOP_PROTECTED_COUNT}` },
              { label: 'Winner release', value: QUEUE_ENTRY_STATUSES[5] }
            ]
          }
        ],
        actions: [
          'Freeze entry — disabled until queue mutation contract is registered.',
          'Restore entry — disabled until queue mutation contract is registered.',
          'Remove entry — disabled until queue mutation contract is registered.'
        ],
        notes: [
          'Queue status values come only from the shared frozen enum.',
          'Event logs and rank histories are not guessed here.',
          'Any mutation must remain backend-transactional and audit-aware.'
        ],
        relatedLinks: [
          { href: '/queues', label: 'Queues' },
          { href: '/slots', label: 'Slots' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'slot':
      return {
        eyebrow: 'Operations · Slot detail',
        title: `Settlement slot ${id}`,
        description: 'Slot detail shell for schedule, execution state, and replay placeholder handling.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: SETTLEMENT_SLOT_STATUSES[0],
        badgeTone: statusTone(SETTLEMENT_SLOT_STATUSES[0]),
        backHref: '/slots',
        metrics: [
          { title: 'Slot state', value: SETTLEMENT_SLOT_STATUSES[0], description: 'Illustrative only for this skeleton screen.', tone: 'brand' },
          { title: 'Scheduled at', value: nextSlotAt, description: 'Launch timezone formatting stays locked.', tone: 'warning' },
          { title: 'Market', value: LAUNCH_MARKET, description: 'One market pool for MVP launch.', tone: 'accent' },
          { title: 'Replay state', value: SETTLEMENT_SLOT_STATUSES[4], description: 'Replay controls are placeholders only.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Schedule context',
            description: 'Slot scheduling is shown without creating a final response schema.',
            rows: [
              { label: 'Slot ID', value: id },
              { label: 'Status', value: SETTLEMENT_SLOT_STATUSES[0] },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Slot at', value: nextSlotAt }
            ]
          },
          {
            title: 'Execution notes',
            description: 'Replay and manual dispatch remain backend-owned concerns.',
            rows: [
              { label: 'Execution model', value: 'Fixed slot settlement' },
              { label: 'Winner count', value: '1 active top-ranked order per slot' },
              { label: 'Retry placeholder', value: SETTLEMENT_SLOT_STATUSES[3] },
              { label: 'Replay placeholder', value: SETTLEMENT_SLOT_STATUSES[4] }
            ]
          }
        ],
        actions: [
          'Create slot — disabled until Admin write contract is registered.',
          'Retry slot — disabled until replay / retry payload is registered.',
          'Replay slot — disabled until replay / retry payload is registered.'
        ],
        notes: [
          'No winner schema or settlement replay contract has been guessed.',
          'Slots remain backend-driven even when Admin surfaces controls later.',
          'Timezone display stays Asia/Manila for MVP launch.'
        ],
        relatedLinks: [
          { href: '/slots', label: 'Slots' },
          { href: '/queues', label: 'Queues' },
          { href: '/campaigns', label: 'Campaigns' }
        ]
      };

    case 'campaign':
      return {
        eyebrow: 'Operations · Campaign detail',
        title: `Campaign ${id}`,
        description: 'Campaign detail shell for product scope, cap hints, slot adjustments, and rules-copy planning.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Campaign skeleton',
        badgeTone: 'brand',
        backHref: '/campaigns',
        metrics: [
          { title: 'Cashback cap', value: formatMinorMoney(200000), description: 'Example cap only, not final contract data.', tone: 'warning' },
          { title: 'Bound products', value: '4', description: 'Placeholder count for scope review.', tone: 'accent' },
          { title: 'Extra slots', value: '1', description: 'Extra slot logic remains backend-owned.', tone: 'brand' },
          { title: 'Copy sync risk', value: '1', description: 'Public rules copy must match admin state later.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Campaign overview',
            description: 'Descriptive placeholders for ops and content teams.',
            rows: [
              { label: 'Campaign ID', value: id },
              { label: 'Market', value: LAUNCH_MARKET },
              { label: 'Cashback cap hint', value: formatMinorMoney(200000) },
              { label: 'Activity route sync', value: '/rules/activity/[slug]' }
            ]
          },
          {
            title: 'Execution notes',
            description: 'Backend remains the truth source for slot and eligibility calculations.',
            rows: [
              { label: 'Product scope', value: 'Placeholder list only' },
              { label: 'Extra slots', value: 'Optional, backend-managed' },
              { label: 'Rules copy', value: 'Public website alignment required' },
              { label: 'Current state', value: 'Read-only skeleton' }
            ]
          }
        ],
        actions: [
          'Edit campaign basics — disabled until registered Admin payloads exist.',
          'Bind products — disabled until product scope contract exists.',
          'Publish campaign copy — disabled until public rules sync contract exists.'
        ],
        notes: [
          'Campaign public copy cannot become the secret truth source; it must mirror backend truth.',
          'No new activity route has been added here.',
          'Product scope arrays are not guessed on the frontend.'
        ],
        relatedLinks: [
          { href: '/campaigns', label: 'Campaigns' },
          { href: '/products', label: 'Products' },
          { href: '/slots', label: 'Slots' }
        ]
      };

    case 'task':
      return {
        eyebrow: 'Operations · Task detail',
        title: `Task ${id}`,
        description: 'Task detail shell for lifecycle notes, reward hinting, and launch readiness checks.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Task skeleton',
        badgeTone: 'warning',
        backHref: '/tasks',
        metrics: [
          { title: 'Lifecycle', value: 'Skeleton only', description: 'No admin task lifecycle contract exists yet.', tone: 'warning' },
          { title: 'Reward hint', value: 'Guard time / soft reward', description: 'Placeholder wording only.', tone: 'brand' },
          { title: 'Audience', value: 'Daily or onboarding', description: 'Scope kept textual on purpose.', tone: 'accent' },
          { title: 'Contract state', value: 'Unregistered', description: 'No Admin task config payload yet.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Task overview',
            description: 'This screen stays conceptual until registry registration happens.',
            rows: [
              { label: 'Task ID', value: id },
              { label: 'Current state', value: 'Skeleton only' },
              { label: 'Reward hint', value: 'Guard time, fragments, or onboarding reward' },
              { label: 'Write path', value: 'Not registered' }
            ]
          }
        ],
        actions: [
          'Update task — disabled until task admin contract is registered.',
          'Schedule task — disabled until task admin contract is registered.',
          'Retire task — disabled until task admin contract is registered.'
        ],
        notes: [
          'Task configuration is intentionally text-only here.',
          'No task DTO or response model has been copied into shared code.',
          'Backend should register read and write paths separately for Admin.'
        ],
        relatedLinks: [
          { href: '/tasks', label: 'Tasks' },
          { href: '/invites', label: 'Invites' },
          { href: '/governance', label: 'Governance' }
        ]
      };

    case 'invite':
      return {
        eyebrow: 'Operations · Invite detail',
        title: `Invite relation ${id}`,
        description: 'Invite relation detail shell for lifecycle, effectivity, and wallet-activation guidance.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: INVITE_RELATION_STATUSES[1],
        badgeTone: statusTone(INVITE_RELATION_STATUSES[1]),
        backHref: '/invites',
        metrics: [
          { title: 'Relation status', value: INVITE_RELATION_STATUSES[1], description: 'Uses frozen shared invite statuses only.', tone: 'warning' },
          { title: 'Depth', value: String(INVITE_MAX_DEPTH), description: 'Single-level invite depth is fixed in MVP.', tone: 'brand' },
          { title: 'Activation hint', value: WALLET_ACTIVATION_METHODS[0], description: 'Wallet activation method comes from shared enum.', tone: 'accent' },
          { title: 'Invalidation review', value: INVITE_RELATION_STATUSES[3], description: 'Reason payload is intentionally absent.', tone: 'danger' }
        ],
        sections: [
          {
            title: 'Relation overview',
            description: 'Invite lifecycle placeholder data only.',
            rows: [
              { label: 'Relation ID', value: id },
              { label: 'Status', value: INVITE_RELATION_STATUSES[1] },
              { label: 'Depth', value: String(INVITE_MAX_DEPTH) },
              { label: 'Wallet activation', value: WALLET_ACTIVATION_METHODS[0] }
            ]
          },
          {
            title: 'Effectivity and review',
            description: 'Detailed reasons must come from backend after registration.',
            rows: [
              { label: 'Cooling-off state', value: 'Pending effective placeholder' },
              { label: 'Invalidation status', value: INVITE_RELATION_STATUSES[3] },
              { label: 'Reason payload', value: 'Not registered in batch 4' },
              { label: 'Reward linkage', value: 'Placeholder only' }
            ]
          }
        ],
        actions: [
          'Invalidate relation — disabled until decision payload is registered.',
          'Restore relation — disabled until decision payload is registered.',
          'Adjust reward linkage — disabled until admin reward contract exists.'
        ],
        notes: [
          'No unofficial invite status has been introduced.',
          'Invalidation reasons must not be guessed in the frontend.',
          'Wallet activation method values come only from shared frozen enums.'
        ],
        relatedLinks: [
          { href: '/invites', label: 'Invites' },
          { href: '/wallet', label: 'Wallet' },
          { href: '/risk', label: 'Risk cases' }
        ]
      };

    case 'risk':
      return {
        eyebrow: 'Funds & Risk · Case detail',
        title: `Risk case ${id}`,
        description: 'Risk case detail shell for linked objects, signals, and decision placeholder surfaces.',
        meta: [...baseMeta(), `Route param: ${id}`],
        badgeLabel: 'Manual review',
        badgeTone: 'danger',
        backHref: '/risk',
        metrics: [
          { title: 'Linked object', value: 'Withdrawal', description: 'Example only; not a final case schema.', tone: 'warning' },
          { title: 'Current lane', value: 'Manual review', description: 'Local UI wording only.', tone: 'danger' },
          { title: 'Linked queue note', value: QUEUE_ENTRY_STATUSES[2], description: 'Review may affect queue status later.', tone: 'brand' },
          { title: 'Decision contract', value: 'Missing', description: 'No admin risk decision payload registered yet.', tone: 'accent' }
        ],
        sections: [
          {
            title: 'Case overview',
            description: 'Case details remain descriptive to avoid freezing unregistered fields.',
            rows: [
              { label: 'Case ID', value: id },
              { label: 'Primary object', value: 'Withdrawal placeholder' },
              { label: 'Primary signal', value: 'Large payout anomaly' },
              { label: 'Current handling', value: 'Manual review placeholder' }
            ]
          },
          {
            title: 'Linked objects',
            description: 'Relationship text only; no nested response contract is implied.',
            rows: [
              { label: 'Order reference', value: 'ord-demo-5002' },
              { label: 'Queue reference', value: 'qe-demo-9002' },
              { label: 'Withdrawal reference', value: 'wd-20260311-001' },
              { label: 'Invite reference', value: 'inv-rel-1002' }
            ]
          }
        ],
        actions: [
          'Approve risk case — disabled until decision payload and audit reason are registered.',
          'Reject risk case — disabled until decision payload and audit reason are registered.',
          'Escalate to governance — disabled until workflow contract is registered.'
        ],
        notes: [
          'This page intentionally does not introduce a frozen risk-case status enum.',
          'Linked-object identifiers are illustrative screen text, not final API fields.',
          'Decision and enforcement actions must be registered before frontend implementation.'
        ],
        relatedLinks: [
          { href: '/risk', label: 'Risk cases' },
          { href: '/withdrawals', label: 'Withdrawals' },
          { href: '/queues', label: 'Queues' }
        ]
      };
  }
}

```

## `apps/admin/src/lib/navigation.ts`

```ts
import { ADMIN_ROUTES } from '@queuefree/shared';

export type AdminRoute = (typeof ADMIN_ROUTES)[number];

export type AdminNavItem = {
  href: AdminRoute;
  label: string;
  description: string;
};

export type AdminNavGroup = {
  title: string;
  items: AdminNavItem[];
};

export const adminNavigation: AdminNavGroup[] = [
  {
    title: 'Overview',
    items: [
      {
        href: '/',
        label: 'Dashboard',
        description: 'Core business metrics, queue health, fund summary, and pending reviews.'
      }
    ]
  },
  {
    title: 'Operations',
    items: [
      {
        href: '/products',
        label: 'Products',
        description: 'Catalog, queue eligibility, and campaign binding placeholders.'
      },
      {
        href: '/orders',
        label: 'Orders',
        description: 'Order search, fulfilment snapshot, aftersale placeholder.'
      },
      {
        href: '/queues',
        label: 'Queues',
        description: 'Queue pool views, freeze notes, and event-log placeholders.'
      },
      {
        href: '/slots',
        label: 'Slots',
        description: 'Fixed settlement slot scheduling and replay surfaces.'
      },
      {
        href: '/campaigns',
        label: 'Campaigns',
        description: 'Cashback cap, extra slots, and rules-copy shells.'
      },
      {
        href: '/tasks',
        label: 'Tasks',
        description: 'Task configuration, reward notes, and lifecycle placeholders.'
      },
      {
        href: '/invites',
        label: 'Invites',
        description: 'Invite relation lookup, invalidation notes, and reward review.'
      }
    ]
  },
  {
    title: 'Funds & Risk',
    items: [
      {
        href: '/wallet',
        label: 'Wallet',
        description: 'User wallet overview, ledger placeholders, activation hints.'
      },
      {
        href: '/withdrawals',
        label: 'Withdrawals',
        description: 'Withdrawal pipeline and finance-review queue.'
      },
      {
        href: '/risk',
        label: 'Risk',
        description: 'Risk case pool, linked object review, and decision placeholders.'
      }
    ]
  },
  {
    title: 'Governance',
    items: [
      {
        href: '/governance',
        label: 'Governance',
        description: 'Role matrix, approval guardrails, and sensitive-operation notes.'
      },
      {
        href: '/audit',
        label: 'Audit',
        description: 'Audit lookup shell and export placeholder.'
      }
    ]
  }
];

const flattenedNavItems = adminNavigation.flatMap((group) => group.items);

export function isNavItemActive(href: AdminRoute, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function getActiveNavItem(pathname: string): AdminNavItem | null {
  return flattenedNavItems.find((item) => isNavItemActive(item.href, pathname)) ?? null;
}

```

## `apps/admin/src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

```

## `apps/admin/tailwind.config.ts`

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        panel: {
          DEFAULT: 'rgb(var(--panel) / <alpha-value>)',
          muted: 'rgb(var(--panel-muted) / <alpha-value>)'
        },
        sidebar: {
          DEFAULT: 'rgb(var(--sidebar) / <alpha-value>)',
          foreground: 'rgb(var(--sidebar-foreground) / <alpha-value>)'
        },
        brand: {
          DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
          soft: 'rgb(var(--brand-soft) / <alpha-value>)'
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)'
        },
        warning: {
          DEFAULT: 'rgb(var(--warning) / <alpha-value>)',
          soft: 'rgb(var(--warning-soft) / <alpha-value>)'
        },
        danger: {
          DEFAULT: 'rgb(var(--danger) / <alpha-value>)',
          soft: 'rgb(var(--danger-soft) / <alpha-value>)'
        }
      },
      maxWidth: {
        content: '72rem'
      },
      boxShadow: {
        panel: '0 20px 50px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};

export default config;

```

## `apps/admin/tsconfig.json`

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "allowJs": false,
    "strict": true,
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts"
  ],
  "exclude": ["node_modules"]
}

```
```

## `batch4-admin-file-tree.txt`

```
queuefree-batch4-admin-starter/
├── apps
│   └── admin
│       ├── app
│       │   ├── (console)
│       │   │   ├── audit
│       │   │   │   └── page.tsx
│       │   │   ├── campaigns
│       │   │   │   ├── [campaignId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── governance
│       │   │   │   └── page.tsx
│       │   │   ├── invites
│       │   │   │   ├── [relationId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── orders
│       │   │   │   ├── [orderId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── products
│       │   │   │   ├── [productId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── queues
│       │   │   │   ├── [entryId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── risk
│       │   │   │   ├── [caseId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── slots
│       │   │   │   ├── [slotId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── tasks
│       │   │   │   ├── [taskId]
│       │   │   │   │   └── page.tsx
│       │   │   │   └── page.tsx
│       │   │   ├── wallet
│       │   │   │   └── page.tsx
│       │   │   ├── withdrawals
│       │   │   │   └── page.tsx
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx
│       │   ├── login
│       │   │   └── page.tsx
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── not-found.tsx
│       ├── src
│       │   ├── components
│       │   │   ├── ui
│       │   │   │   ├── badge.tsx
│       │   │   │   ├── button.tsx
│       │   │   │   ├── card.tsx
│       │   │   │   ├── data-table.tsx
│       │   │   │   └── input.tsx
│       │   │   ├── admin-page-header.tsx
│       │   │   ├── admin-shell.tsx
│       │   │   ├── admin-sidebar.tsx
│       │   │   ├── admin-skeleton-banner.tsx
│       │   │   ├── admin-topbar.tsx
│       │   │   ├── metric-card.tsx
│       │   │   ├── module-detail-page.tsx
│       │   │   ├── module-list-page.tsx
│       │   │   ├── page-shell.tsx
│       │   │   └── section-title.tsx
│       │   └── lib
│       │       ├── admin-content.ts
│       │       ├── navigation.ts
│       │       └── utils.ts
│       ├── .env.example
│       ├── next-env.d.ts
│       ├── next.config.mjs
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── docs
│   ├── contracts
│   │   └── admin-route-module-map-v1.2.md
│   └── handoffs
│       ├── backend-next-steps-from-admin-batch4.md
│       ├── server-next-steps-from-admin-batch4.md
│       └── 第4批-发给后端和服务器的话术.md
├── README-第4批-Admin后台启动步骤.md
└── package.json
```

## `batch5-file-contents.md`

```
# Batch 5 File Contents

## `package.json`

```json
{
  "name": "queuefree",
  "private": true,
  "version": "0.1.0",
  "packageManager": "pnpm@10.32.0",
  "engines": {
    "node": ">=22.22.0 <23"
  },
  "scripts": {
    "dev:mobile": "pnpm --filter @queuefree/mobile dev",
    "android": "pnpm --filter @queuefree/mobile android",
    "ios": "pnpm --filter @queuefree/mobile ios",
    "web:mobile": "pnpm --filter @queuefree/mobile web",
    "typecheck": "pnpm verify:registry-first-frontend && turbo run typecheck",
    "dev:web": "pnpm --filter @queuefree/web dev",
    "build:web": "pnpm --filter @queuefree/web build",
    "dev:admin": "pnpm --filter @queuefree/admin dev",
    "build:admin": "pnpm --filter @queuefree/admin build",
    "verify:registry-first-frontend": "node ./scripts/verify-registry-first-frontend.mjs",
    "typecheck:frontends": "pnpm verify:registry-first-frontend && turbo run typecheck --filter=@queuefree/shared --filter=@queuefree/ui-tokens --filter=@queuefree/api-client --filter=@queuefree/mobile --filter=@queuefree/web --filter=@queuefree/admin"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "typescript": "^5.8.3"
  }
}

```

## `README-第5批-Registry-First前端清理与接线准备.md`

```md
# QueueFree 第 5 批：Registry-First 前端清理与接线准备

这批不是新增业务页面。

这批的目标只有两个：

1. 把前面前端骨架里不够严格的地方清理掉，重新对齐 **PRD v1.2 + 协作契约 + registry baseline**
2. 把后续 `packages/api-client` 的真正接线顺序锁回到：**registry -> OpenAPI -> generated sdk -> frontend consume**

---

## 这批修正了什么

- 删除了 `packages/api-client` 里的手写 API path 占位文件
- 把 `packages/api-client` 改回 **pre-OpenAPI placeholder**
- 把 Mobile 里的未登记环境变量清理掉，只保留 registry 已登记变量
- 把前端页面和 handoff 文档里出现的“猜测型 API path”提示语改成 **模块级说明**
- 新增一个本地校验脚本：`pnpm verify:registry-first-frontend`

---

## 你现在怎么用

### 1）打开项目

用 VS Code 打开整个项目文件夹。

### 2）安装依赖

在项目根目录打开终端，输入：

```bash
pnpm install
```

### 3）先跑这条检查

```bash
pnpm verify:registry-first-frontend
```

如果通过，你会看到：

```text
Registry-first frontend verification passed.
```

### 4）再启动你要看的前端

手机端：

```bash
pnpm dev:mobile
```

官网：

```bash
pnpm dev:web
```

后台：

```bash
pnpm dev:admin
```

### 5）这批最重要的协作顺序

从现在开始，前端这边默认遵守下面顺序：

1. 后端先补 registry
2. 后端再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再删 mock、接真实 SDK

前端不要反过来先猜接口。

```

## `scripts/verify-registry-first-frontend.mjs`

```js
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const generatedDir = path.join(repoRoot, 'packages', 'api-client', 'src', 'generated');
const hasGeneratedClient = fs.existsSync(generatedDir)
  && fs.readdirSync(generatedDir).some((name) => !name.startsWith('.'));

if (hasGeneratedClient) {
  console.log('Generated api-client detected. Pre-OpenAPI frontend boundary check is skipped.');
  process.exit(0);
}

const forbiddenEnvTokens = [
  'EXPO_PUBLIC_ENV_NAME',
  'EXPO_PUBLIC_ENABLE_DEMO_MODE'
];

const forbiddenApiFragments = ['/v1/', '/v1/admin'];
const allowedFilesForApiFragments = new Set([
  path.normalize('docs/contracts/queuefree-collaboration-contract-v1.2.md'),
  path.normalize('docs/registry/registry-baseline-v1.2.md')
]);

const scanRoots = [
  'apps',
  path.join('packages', 'api-client'),
  path.join('docs', 'contracts'),
  path.join('docs', 'handoffs')
];

const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json']);
const violations = [];

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo' || entry.name === 'dist') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!textExtensions.has(ext) && entry.name !== '.env.example') {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const normalizedRelPath = path.normalize(relPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    for (const token of forbiddenEnvTokens) {
      if (text.includes(token)) {
        violations.push(`${relPath}: contains forbidden pre-registry env token ${token}`);
      }
    }

    if (!allowedFilesForApiFragments.has(normalizedRelPath)) {
      for (const fragment of forbiddenApiFragments) {
        if (text.includes(fragment)) {
          violations.push(`${relPath}: contains hard-coded API fragment ${fragment} before OpenAPI generation`);
        }
      }
    }
  }
}

for (const root of scanRoots) {
  walk(path.join(repoRoot, root));
}

const illegalManualClientFile = path.join(repoRoot, 'packages', 'api-client', 'src', 'endpoints.ts');
if (fs.existsSync(illegalManualClientFile)) {
  violations.push('packages/api-client/src/endpoints.ts should not exist before OpenAPI generation.');
}

if (violations.length > 0) {
  console.error('Registry-first frontend verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Registry-first frontend verification passed. No forbidden pre-OpenAPI API path or env token was found.');

```

## `packages/api-client/package.json`

```json
{
  "name": "@queuefree/api-client",
  "private": true,
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}

```

## `packages/api-client/README.md`

```md
# @queuefree/api-client

状态：Pre-OpenAPI Placeholder

这个包当前**不包含任何手写业务 API contract**。

根据 `queuefree_prd_v1_2`、协作契约、registry baseline：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 前端在没有 OpenAPI 的阶段，**不能**在这里手写 path / request / response / DTO / schema
- 前端当前只能继续使用：
  - `packages/shared`
  - 各 app 内部的本地 mock / placeholder 数据

## 正确顺序

1. 后端先更新 registry（如果触碰冻结项）
2. 后端导出 OpenAPI
3. 用生成器生成 `packages/api-client`
4. 前端再从本地 mock 切换到 generated SDK

## 当前允许保留的内容

- 这个包的位置
- `src/index.ts` 的空占位入口
- `openapi/` 目录占位
- `src/generated/` 目录占位

## 当前明确不允许

- 手写 REST path 常量
- 手写请求 / 响应字段
- 手写业务 DTO
- 把 NestJS DTO / Swagger 类型复制到这里

```

## `packages/api-client/src/index.ts`

```ts
/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export {};

```

## `apps/mobile/.env.example`

```dotenv
EXPO_PUBLIC_APP_ENV=local
EXPO_PUBLIC_API_BASE_URL=http://localhost:4000
EXPO_PUBLIC_WEB_BASE_URL=http://localhost:3000
EXPO_PUBLIC_SENTRY_DSN=
EXPO_PUBLIC_POSTHOG_KEY=
EXPO_PUBLIC_POSTHOG_HOST=

```

## `apps/mobile/expo-env.d.ts`

```ts
/// <reference types="expo/types" />

declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_APP_ENV?: string;
    EXPO_PUBLIC_API_BASE_URL?: string;
    EXPO_PUBLIC_WEB_BASE_URL?: string;
    EXPO_PUBLIC_SENTRY_DSN?: string;
    EXPO_PUBLIC_POSTHOG_KEY?: string;
    EXPO_PUBLIC_POSTHOG_HOST?: string;
  }
}

```

## `apps/mobile/src/lib/env.ts`

```ts
export const appEnv = {
  appEnv: process.env.EXPO_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.EXPO_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.EXPO_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.EXPO_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.EXPO_PUBLIC_POSTHOG_HOST ?? ''
} as const;

```

## `apps/mobile/app/(public)/auth/phone.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { PrimaryButton } from "../../../src/components/primary-button";
import { TextField } from "../../../src/components/text-field";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { useAuthStore } from "../../../src/store/auth-store";

const schema = z.object({
  phoneNumber: z
    .string()
    .min(10, "Please enter a valid phone number.")
    .max(16, "Phone number is too long."),
  inviteCode: z.string().max(24, "Invite code is too long.").optional().or(z.literal("")),
  agreeToLegal: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the privacy policy and terms before continuing." })
  })
});

type FormValues = z.infer<typeof schema>;

export default function PhoneAuthScreen() {
  const setPhoneNumber = useAuthStore((state) => state.setPhoneNumber);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      inviteCode: "",
      agreeToLegal: false as never
    }
  });

  const submit = form.handleSubmit((values) => {
    setPhoneNumber(values.phoneNumber);
    router.push("/(public)/auth/otp");
  });

  return (
    <Screen
      title="Phone sign in"
      subtitle="Use one phone number for both registration and login. Invite code binding stays optional."
    >
      <SectionCard title="Step 1" description="Enter your phone number and confirm legal consent.">
        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Phone number"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="+63 9xx xxx xxxx"
              keyboardType="phone-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="inviteCode"
          render={({ field, fieldState }) => (
            <TextField
              label="Invite code (optional)"
              value={field.value ?? ""}
              onChangeText={field.onChange}
              placeholder="QUEUEFREE2026"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="agreeToLegal"
          render={({ field, fieldState }) => (
            <View style={{ gap: 6 }}>
              <CheckboxRow
                checked={Boolean(field.value)}
                onPress={() => field.onChange(!field.value)}
                label="I agree to the Privacy Policy and Terms of Service."
                hint="The app will keep in-app privacy, terms, support, and delete account access."
              />
              {fieldState.error ? <Text style={{ color: "#B91C1C", fontSize: 12 }}>{fieldState.error.message}</Text> : null}
            </View>
          )}
        />

        <PrimaryButton label="Send demo OTP" onPress={submit} />
      </SectionCard>

      <SectionCard title="What happens next" description="OTP success will create the user account, default wallet, and default queue guard record on the real backend.">
        <Text>• This starter uses demo flow only</Text>
        <Text>• Backend should later register and export the OTP send contract through OpenAPI</Text>
        <Text>• Frontend should swap mock flow after OpenAPI SDK is generated</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(public)/auth/otp.tsx`

```tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Text } from "react-native";
import { z } from "zod";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { PrimaryButton } from "../../../src/components/primary-button";
import { TextField } from "../../../src/components/text-field";
import { useAuthStore } from "../../../src/store/auth-store";

const schema = z.object({
  otpCode: z
    .string()
    .length(6, "Please enter the 6-digit OTP.")
    .regex(/^\d+$/, "OTP should be numeric.")
});

type FormValues = z.infer<typeof schema>;

export default function OtpScreen() {
  const phoneNumber = useAuthStore((state) => state.phoneNumber);
  const login = useAuthStore((state) => state.login);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      otpCode: ""
    }
  });

  const submit = form.handleSubmit(() => {
    login(phoneNumber || "+63 912 345 6789");
    router.replace("/(app)/(tabs)/home");
  });

  return (
    <Screen
      title="Verify OTP"
      subtitle={`We are using a demo flow now. Enter any 6 digits to continue for ${phoneNumber || "your phone number"}.`}
    >
      <SectionCard title="Step 2" description="Real backend flow later verifies the OTP through generated OpenAPI client calls.">
        <Controller
          control={form.control}
          name="otpCode"
          render={({ field, fieldState }) => (
            <TextField
              label="OTP code"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="123456"
              keyboardType="number-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Verify and enter app" onPress={submit} />
        <PrimaryButton
          label="Back to phone step"
          variant="secondary"
          onPress={() => router.back()}
        />
      </SectionCard>

      <SectionCard title="Reminder" description="The real app must keep privacy policy, terms, support, rules, and delete account access available in-app.">
        <Text>• Language stays English for MVP</Text>
        <Text>• No country selector in MVP</Text>
        <Text>• Session refresh later comes from the generated auth client after backend exports OpenAPI</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/(tabs)/tasks.tsx`

```tsx
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { demoTasks } from "../../../src/lib/demo-data";

export default function TasksTabScreen() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);

  const claimedSet = useMemo(() => new Set(claimedIds), [claimedIds]);

  return (
    <Screen
      title="Tasks"
      subtitle="Tasks can extend retention, grant fragments, or support wallet activation paths later."
    >
      <DemoBanner />

      <SectionCard title="Task center" description="Rewards should remain traceable. Real task reads and claims must come from the generated client after backend registers the task contract.">
        <View style={{ gap: 12 }}>
          {demoTasks.map((task) => {
            const alreadyClaimed = claimedSet.has(task.id);
            return (
              <SectionCard key={task.id} title={task.title} description={task.rewardLabel}>
                <Text>Progress: {task.progressLabel}</Text>
                <Text>Status: {alreadyClaimed ? "Already claimed in demo mode" : task.claimable ? "Ready to claim" : "Not ready yet"}</Text>
                <PrimaryButton
                  label={alreadyClaimed ? "Claimed" : task.claimable ? "Claim demo reward" : "Not claimable yet"}
                  disabled={!task.claimable || alreadyClaimed}
                  onPress={() => setClaimedIds((current) => [...current, task.id])}
                />
              </SectionCard>
            );
          })}
        </View>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/checkout/[productId].tsx`

```tsx
import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { getProductById } from "../../../src/lib/demo-data";

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ productId: string; quantity?: string }>();
  const productId = params.productId || "prod-earbuds";
  const quantity = Number(params.quantity ?? 1);
  const product = useMemo(() => getProductById(productId), [productId]);
  const [agreeToRules, setAgreeToRules] = useState(false);

  const totalMinor = product.priceMinor * quantity;
  const orderId = `order-${product.id}-demo`;

  return (
    <Screen
      title="Checkout"
      subtitle="The order snapshot should be fixed at checkout. Payment success later becomes the queue conversion page."
    >
      <DemoBanner />

      <SectionCard title="Shipping address" description="The real backend later uses the user's saved address list.">
        <Text>Demo address: 21 Ayala Avenue, Makati City, Metro Manila</Text>
      </SectionCard>

      <SectionCard title="Order snapshot" description="One order, one product, multiple quantity allowed.">
        <KeyValueRow label="Product" value={product.title} />
        <KeyValueRow label="Unit price" value={formatMinorMoney(product.priceMinor)} />
        <KeyValueRow label="Quantity" value={String(quantity)} />
        <KeyValueRow label="Payable total" value={formatMinorMoney(totalMinor)} emphasize />
      </SectionCard>

      <SectionCard title="Payment and rules" description="Do not use IAP / Play Billing for physical goods. Real payment providers must go through backend adapters.">
        <CheckboxRow
          checked={agreeToRules}
          onPress={() => setAgreeToRules((current) => !current)}
          label="I understand the queue rules, payment rules, and refund impact."
          hint="The real frontend later uses generated order creation and payment-intent calls after backend exports OpenAPI."
        />
      </SectionCard>

      <View style={{ gap: 12 }}>
        <PrimaryButton
          label="Pay and create demo order"
          disabled={!agreeToRules}
          onPress={() =>
            router.replace({
              pathname: "/(app)/orders/success/[orderId]",
              params: { orderId }
            })
          }
        />
        {!agreeToRules ? <Text>Please confirm the rules before continuing.</Text> : null}
      </View>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/wallet/withdraw.tsx`

```tsx
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { formatMinorMoney } from "@queuefree/shared";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";

const schema = z.object({
  amountMinor: z
    .string()
    .regex(/^\d+$/, "Amount must be a whole-number minor unit string.")
    .min(1, "Amount is required."),
  accountName: z.string().min(2, "Please enter the account name."),
  accountNumber: z.string().min(4, "Please enter the account number.")
});

type FormValues = z.infer<typeof schema>;

export default function WithdrawScreen() {
  const { config } = useRuntimeConfig();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      amountMinor: String(config.withdrawMinAmountMinor),
      accountName: "",
      accountNumber: ""
    }
  });

  const submit = form.handleSubmit((values) => {
    const amount = Number(values.amountMinor);

    if (amount < config.withdrawMinAmountMinor || amount > config.withdrawSingleMaxMinor) {
      form.setError("amountMinor", {
        type: "manual",
        message: `Amount should stay between ${formatMinorMoney(config.withdrawMinAmountMinor)} and ${formatMinorMoney(config.withdrawSingleMaxMinor)}.`
      });
      return;
    }

    setSubmitted(true);
  });

  return (
    <Screen
      title="Withdraw"
      subtitle="The MVP keeps min, single-max, and daily-max values in runtime config, not in page-level hardcoded constants."
    >
      <SectionCard title="Withdrawal limits" description="These are default fallback values until backend runtime config is connected.">
        <Text>Minimum: {formatMinorMoney(config.withdrawMinAmountMinor)}</Text>
        <Text>Single max: {formatMinorMoney(config.withdrawSingleMaxMinor)}</Text>
        <Text>Daily max: {formatMinorMoney(config.withdrawDailyMaxMinor)}</Text>
      </SectionCard>

      <SectionCard title="Submit a withdrawal" description="The real backend later connects generated withdrawal submission plus server-side risk review.">
        <Controller
          control={form.control}
          name="amountMinor"
          render={({ field, fieldState }) => (
            <TextField
              label="Amount (minor unit integer)"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="50000"
              keyboardType="number-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="accountName"
          render={({ field, fieldState }) => (
            <TextField
              label="Account name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Juan Dela Cruz"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="accountNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Account number"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="09123456789"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Submit demo withdrawal" onPress={submit} />
        {submitted ? <Text>Demo withdrawal submitted. Real backend later moves the status through APPLIED / RISK_REVIEW / PROCESSING / SUCCESS or failure states.</Text> : null}
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/me/addresses.tsx`

```tsx
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { TextField } from "../../../src/components/text-field";

const schema = z.object({
  fullName: z.string().min(2, "Please enter the receiver name."),
  phoneNumber: z.string().min(10, "Please enter the receiver phone."),
  line1: z.string().min(5, "Please enter the full address.")
});

type FormValues = z.infer<typeof schema>;

export default function AddressesScreen() {
  const [addresses, setAddresses] = useState([
    "Juan Dela Cruz · +63 912 345 6789 · 21 Ayala Avenue, Makati City"
  ]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      line1: ""
    }
  });

  const submit = form.handleSubmit((values) => {
    setAddresses((current) => [
      `${values.fullName} · ${values.phoneNumber} · ${values.line1}`,
      ...current
    ]);
    form.reset();
  });

  return (
    <Screen title="Addresses" subtitle="The real backend later connects address list and address save through generated client calls.">
      <SectionCard title="Saved addresses" description="Use clear shipping details before checkout.">
        <View style={{ gap: 10 }}>
          {addresses.map((item) => (
            <NavRow key={item} label={item} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Add new address" description="This starter keeps the form local only.">
        <Controller
          control={form.control}
          name="fullName"
          render={({ field, fieldState }) => (
            <TextField
              label="Receiver name"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Juan Dela Cruz"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="phoneNumber"
          render={({ field, fieldState }) => (
            <TextField
              label="Receiver phone"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="+63 9xx xxx xxxx"
              keyboardType="phone-pad"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={form.control}
          name="line1"
          render={({ field, fieldState }) => (
            <TextField
              label="Address line"
              value={field.value}
              onChangeText={field.onChange}
              placeholder="21 Ayala Avenue, Makati City"
              errorText={fieldState.error?.message}
            />
          )}
        />

        <PrimaryButton label="Save demo address" onPress={submit} />
        <Text>Checkout later reads the selected address snapshot, not a mutable live address object.</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/me/security.tsx`

```tsx
import { router } from "expo-router";
import { Text, View } from "react-native";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useAuthStore } from "../../../src/store/auth-store";

const demoDevices = [
  "iPhone 15 Pro · Manila · Active now",
  "Chrome on MacBook · Makati · 2 hours ago"
];

export default function SecurityScreen() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Screen
      title="Security"
      subtitle="Session refresh and logout later connect through generated auth client calls. Device visibility is useful for user trust and support."
    >
      <SectionCard title="Devices" description="The real backend later connects device visibility through generated client calls.">
        <View style={{ gap: 10 }}>
          {demoDevices.map((device) => (
            <NavRow key={device} label={device} />
          ))}
        </View>
      </SectionCard>

      <SectionCard title="Session actions" description="Demo logout only clears local state.">
        <PrimaryButton
          label="Log out"
          variant="danger"
          onPress={() => {
            logout();
            router.replace("/(public)/welcome");
          }}
        />
        <Text>Session refresh and logout later come from the generated auth client after backend exports OpenAPI.</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/rules/activity/[campaignId].tsx`

```tsx
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";

export default function ActivityRulesScreen() {
  const params = useLocalSearchParams<{ campaignId: string }>();
  const campaignId = params.campaignId || "campaign-summer-2026";

  return (
    <Screen
      title="Activity rules"
      subtitle="Campaign and activity copy should later come from backend-managed content, not permanent page-level hardcoding."
    >
      <SectionCard title="Campaign snapshot" description={`Campaign ID: ${campaignId}`}>
        <View style={{ gap: 8 }}>
          <Text>• Activity scope may be limited to specific products or windows.</Text>
          <Text>• Activity copy should stay consistent with rule center and web public rules.</Text>
          <Text>• Rewarded ads remain off for the first review build.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Implementation note" description="This page is a starter placeholder until rules content is delivered by backend and CMS-like config.">
        <Text>Real frontend later consumes generated rules content contracts after backend registers and exports the public rules API.</Text>
      </SectionCard>
    </Screen>
  );
}

```

## `apps/mobile/app/(app)/delete-account.tsx`

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { PrimaryButton } from "../../src/components/primary-button";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { StatusPill } from "../../src/components/status-pill";

export default function DeleteAccountScreen() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Screen
      title="Delete account"
      subtitle="Deletion in this product is not a simple disable action. It is request + settlement + anonymization."
    >
      <SectionCard
        title="Deletion lifecycle"
        description="The final backend should drive these states."
        rightSlot={<StatusPill label={submitted ? "DELETE_REQUESTED" : "NOT_REQUESTED"} tone={submitted ? "warning" : "neutral"} />}
      >
        <View style={{ gap: 8 }}>
          <Text>• DELETE_REQUESTED</Text>
          <Text>• PENDING_SETTLEMENT</Text>
          <Text>• READY_TO_ANONYMIZE</Text>
          <Text>• ANONYMIZED</Text>
        </View>
      </SectionCard>

      <SectionCard title="Before you submit" description="Show blockers, impact, and unsettled items clearly.">
        <View style={{ gap: 8 }}>
          <Text>• Active queue entries may be removed or settled according to rules.</Text>
          <Text>• Wallet and order settlement must finish before anonymization.</Text>
          <Text>• Some records may stay retained for anti-fraud, tax, legal, or audit reasons.</Text>
        </View>
      </SectionCard>

      <SectionCard title="Demo action" description="The real backend later connects the generated delete-account request call with idempotency protection.">
        <PrimaryButton
          label={submitted ? "Demo request submitted" : "Submit demo delete request"}
          disabled={submitted}
          variant="danger"
          onPress={() => setSubmitted(true)}
        />
        {submitted ? <Text>Your demo request is now shown as submitted. Real backend later advances the state machine.</Text> : null}
      </SectionCard>
    </Screen>
  );
}

```

## `apps/web/src/lib/env.ts`

```ts
export const publicAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  webBaseUrl: process.env.NEXT_PUBLIC_WEB_BASE_URL ?? 'http://localhost:3000',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? ''
} as const;

```

## `apps/web/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { LAUNCH_WEBSITE } from '@queuefree/shared';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { publicAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(publicAppEnv.webBaseUrl || `https://${LAUNCH_WEBSITE}`),
  title: {
    default: 'QueueFree',
    template: '%s | QueueFree'
  },
  description: 'QueueFree public website for product overview, rules, privacy, terms, account deletion, and contact guidance.',
  openGraph: {
    title: 'QueueFree',
    description: 'Shopping-first public queue promotion with public rules and compliance pages.',
    url: `https://${LAUNCH_WEBSITE}`,
    siteName: 'QueueFree'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

```

## `apps/web/app/loading.tsx`

```tsx
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <PageShell>
      <Card>
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading public page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </PageShell>
  );
}

```

## `apps/web/app/error.tsx`

```tsx
'use client';

import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <PageShell>
      <Card className="border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Public page error</div>
          <p className="text-sm text-slate-700">
            This public page failed to render. Retry the route. If the failure persists after real API integration, check the generated client and the deployed content source.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </PageShell>
  );
}

```

## `apps/admin/src/lib/env.ts`

```ts
export const adminAppEnv = {
  appEnv: process.env.NEXT_PUBLIC_APP_ENV ?? 'local',
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000',
  adminBaseUrl: process.env.NEXT_PUBLIC_ADMIN_BASE_URL ?? 'http://localhost:3001',
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? ''
} as const;

```

## `apps/admin/app/layout.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { adminAppEnv } from '@/lib/env';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(adminAppEnv.adminBaseUrl),
  title: {
    default: 'QueueFree Admin',
    template: '%s | QueueFree Admin'
  },
  description: 'QueueFree admin skeleton for operations, finance, risk, governance, and audit modules.'
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <html lang="en-PH">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

```

## `apps/admin/app/loading.tsx`

```tsx
import { Card, CardContent } from '@/components/ui/card';

export default function Loading(): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-3 p-6">
          <div className="text-sm font-semibold text-slate-950">Loading admin page</div>
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  );
}

```

## `apps/admin/app/error.tsx`

```tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Error({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6">
      <Card className="w-full max-w-xl border-danger/20 bg-danger-soft">
        <CardContent className="space-y-4 p-6">
          <div className="text-lg font-semibold text-slate-950">Admin page error</div>
          <p className="text-sm text-slate-700">
            This admin route failed to render. Retry the page. If it still fails after real Admin SDK integration, check the generated client and registry updates first.
          </p>
          <Button onClick={reset}>Retry</Button>
        </CardContent>
      </Card>
    </div>
  );
}

```

## `apps/admin/app/(console)/loading.tsx`

```tsx
import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleLoading(): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card>
          <CardContent className="space-y-3 p-6">
            <div className="text-sm font-semibold text-slate-950">Loading console module</div>
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-200" />
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}

```

## `apps/admin/app/(console)/error.tsx`

```tsx
'use client';

import { AdminShell } from '@/components/admin-shell';
import { PageShell } from '@/components/page-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ConsoleError({ reset }: { error: Error; reset: () => void }): React.ReactElement {
  return (
    <AdminShell>
      <PageShell>
        <Card className="border-danger/20 bg-danger-soft">
          <CardContent className="space-y-4 p-6">
            <div className="text-lg font-semibold text-slate-950">Console route error</div>
            <p className="text-sm text-slate-700">
              The current admin module failed to render. Retry the route. If real data is already wired in the future, verify registry updates and generated SDK output before debugging UI code.
            </p>
            <Button onClick={reset}>Retry</Button>
          </CardContent>
        </Card>
      </PageShell>
    </AdminShell>
  );
}

```

## `docs/contracts/mobile-screen-api-map-v1.2.md`

```md
# QueueFree Mobile Screen → Backend Domain Dependency Map v1.2

状态：Pre-OpenAPI Boundary  
唯一规则源：`queuefree_prd_v1_2`

本文件**不是 API path 注册表**。  
本文件只说明：手机端每个冻结路由，后续会依赖哪个**后端模块域**。

在 backend 尚未完成 registry + OpenAPI 之前：

- 这里**不写**猜测型 REST path
- 这里**不写**请求字段 / 响应字段
- 这里**不写** DTO 结构
- 前端继续只用 `packages/shared` + 本地 mock

---

## 1. Public 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(public)/welcome` | 欢迎、规则摘要、风险提示 | rules content | 静态说明 |
| `/(public)/auth/phone` | 手机号输入、法律同意、邀请码 | auth / invite bind policy | 本地表单 + demo flow |
| `/(public)/auth/otp` | OTP 校验、登录注册合流 | auth / session | 本地表单 + demo flow |

## 2. Tab 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/(tabs)/home` | 商品摘要、活动摘要、规则入口 | product catalog / rules content / notifications | 本地 mock |
| `/(app)/(tabs)/queue` | 队列列表、当前排名、保活状态 | queue entries / queue guard | 本地 mock |
| `/(app)/(tabs)/tasks` | 任务列表、领奖 | tasks | 本地 mock |
| `/(app)/(tabs)/invites` | 邀请码、邀请状态、奖励记录 | invites | 本地 mock |
| `/(app)/(tabs)/wallet` | 钱包总览、账变、提现记录 | wallet / withdrawals / withdrawal accounts | 本地 mock |
| `/(app)/(tabs)/me` | 资料、地址、安全、规则、删除账号入口 | profile / addresses / devices / account deletion | 本地 mock |

## 3. Detail Stack 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/product/[productId]` | 商品详情 | product catalog | 本地 mock |
| `/(app)/checkout/[productId]` | 地址选择、订单确认、支付前置 | addresses / orders / payment intents | 本地 mock |
| `/(app)/orders/success/[orderId]` | 支付成功、入队成功 | orders / queue entries / queue guard | 本地 mock |
| `/(app)/queue/[entryId]` | 队列详情、boost 展示 | queue entries / queue boost | 本地 mock |
| `/(app)/wallet/withdraw` | 提现申请 | wallet / withdrawals / withdrawal accounts | 本地表单 |
| `/(app)/me/addresses` | 地址列表、地址新增 | addresses | 本地表单 |
| `/(app)/me/security` | 设备、安全、登出 | devices / auth session | 本地 mock |
| `/(app)/rules` | 规则中心 | rules content | 静态说明 |
| `/(app)/rules/queue` | 队列规则 | rules content | 静态说明 |
| `/(app)/rules/wallet` | 钱包规则 | rules content | 静态说明 |
| `/(app)/rules/activity/[campaignId]` | 活动规则 | rules content / campaigns | 静态说明 |
| `/(app)/privacy` | 隐私政策 | public compliance content | 静态说明 |
| `/(app)/terms` | 服务条款 | public compliance content | 静态说明 |
| `/(app)/support` | 客服 / 申诉说明 | support contact content | 静态说明 |
| `/(app)/delete-account` | 删除账号说明与申请占位 | account deletion | 本地 demo flow |

---

## 4. 正确接线顺序

1. 后端先更新 registry（如果有新增冻结项）
2. 后端导出 OpenAPI
3. 重新生成 `packages/api-client`
4. 前端再把对应模块从 mock 切到 generated SDK

顺序不能反。

```

## `docs/contracts/web-public-route-map-v1.2.md`

```md
# QueueFree Web Public Route Map v1.2

状态：Drafted in Batch 3  
规则源：`queuefree_prd_v1_2` + `docs/contracts/queuefree-collaboration-contract-v1.2.md` + `docs/registry/registry-baseline-v1.2.md`

---

## 1. 本轮目标

落地 `apps/web` 的公开官网与合规页面骨架，严格遵守已经冻结的 Web 公共路由：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

本轮 **不新增** 路由，不修改任何已冻结路径。

---

## 2. 页面与职责映射

### `/`

用途：官网首页 / 审核首屏 / 品牌说明页

承担：

- 产品定位说明
- “买商品 -> 入队 -> 等时隙” 的公开解释
- 合规入口导航
- 首发市场与规则版本说明

### `/privacy`

用途：公开隐私政策页

承担：

- 数据收集范围说明
- 数据用途说明
- 删除与保留边界说明
- 公开规则与隐私关系说明

### `/terms`

用途：公开服务条款页

承担：

- 购物优先定位说明
- 非保证返现说明
- 风控 / 审核 / 售后影响说明
- 首发范围说明

### `/rules`

用途：规则中心首页

承担：

- 规则入口导航
- Queue / Wallet / Activity 子页分发
- 运行时参数只展示 fallback 示例，不作为业务真相源

### `/rules/queue`

用途：公开队列规则页

承担：

- 1 订单 = 1 席位
- Top30 保护区
- Boost 边界
- 冻结不参与有效排名
- 固定时隙结算说明

### `/rules/wallet`

用途：公开钱包与提现规则页

承担：

- pending / available / frozen 解释
- 钱包激活解释
- 提现门槛 fallback 示例
- 不支持充值 / 转账说明

### `/rules/activity/[slug]`

用途：公开活动规则页

承担：

- 活动规则独立 URL
- 展示活动可调整项与不可突破底线
- 作为活动链接、审核资料、投放落地页的规范页面

### `/delete-account`

用途：公开删除账号说明页

承担：

- 删除并非即时物理删除
- 阻塞项说明
- 状态机说明
- 清算后匿名化说明

### `/contact`

用途：公开客服 / 申诉入口说明页

承担：

- 联系与申诉分类说明
- 审核阶段的公开联系入口
- 后续接真实工单或邮箱时保持固定 URL 不变

---

## 3. 本轮约束

- 不新增 Web 冻结路由
- 不改 `/contact` 为 `/support`
- 不新增未登记 env var
- 不直接猜测后端规则 API 响应
- 当前页面文案以静态合规骨架为主
- 后续若切换为 CMS 或动态 rules 内容，必须以后端 OpenAPI 为准

```

## `docs/contracts/frontend-preopenapi-boundary-v1.2.md`

```md
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

```

## `docs/handoffs/backend-next-steps-from-mobile-batch2.md`

```md
# QueueFree 第 2 批：给后端线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 当前前端状态

前端第 2 批已经完成 `apps/mobile` 路由骨架。

当前手机端：

- 只依赖 `packages/shared`
- 继续使用本地 mock / placeholder 数据
- 已经移除手写猜测型 API path 说明
- 等待后端按 registry-first 顺序补齐 OpenAPI

## 后端线程下一步正确顺序

1. 若触碰冻结项，先更新 `docs/registry/registry-baseline-v1.2.md`
2. 再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再逐模块替换本地 mock

## 后端优先建议的模块域

建议按下面顺序推进，不要求你在本文件里口头发明字段：

1. auth / session
2. product catalog
3. orders / payment intents
4. queue entries / queue guard / boost
5. wallet / withdrawal accounts / withdrawals
6. tasks
7. invites
8. profile / addresses / devices
9. rules content / notifications
10. account deletion

## 对后端线程的硬约束提醒

- 不要跳过 registry 直接新增 path / field / state
- 不要在没有 OpenAPI 的情况下让前端手写 contract
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 前端只会消费 `packages/shared` 和生成后的 `packages/api-client`

## 当前前端最需要你输出什么

1. registry 更新（如果你新增冻结项）
2. OpenAPI 文件
3. 生成好的 `packages/api-client`
4. runtime config 的真实下发链路
5. 按模块分批可读可接的最小 SDK

```

## `docs/handoffs/server-next-steps-from-mobile-batch2.md`

```md
# QueueFree 第 2 批：给服务器线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 前端第 2 批已经固定的东西

已经固定且不要再改：

- Monorepo：`apps/` + `packages/`
- Mobile：Expo + React Native + expo-router
- Web / Admin：Next.js
- `packages/shared` 已存在
- `packages/api-client` 当前回到 pre-OpenAPI placeholder
- Mobile 路由已经按 PRD 固定

## 服务器线程下一步优先做什么

### 1）环境变量分组继续按 registry 走

至少分：

- `mobile`
- `web`
- `admin`
- `api`
- `worker`
- `shared`

### 2）Mobile 公开环境变量只使用已登记项

#### mobile
- `EXPO_PUBLIC_APP_ENV`
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_WEB_BASE_URL`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`

#### api / worker
- 数据库连接
- Redis 连接
- JWT secret
- 支付 provider secret
- 短信 provider secret
- Sentry DSN
- 对象存储配置

### 3）保持移动端访问入口不变

移动端后续主要连：

- 已登记的 API 域名矩阵
- 已登记的 Web 域名矩阵

不要改 public Web 固定路径：

- `/privacy`
- `/terms`
- `/rules`
- `/delete-account`
- `/contact`

### 4）把 Expo EAS 与 API 部署流程文档化

至少覆盖：

- local
- dev
- staging
- production

并明确：

- 谁负责 EAS build
- 谁负责 EAS submit
- 谁负责 Render API / Worker 部署
- 谁负责 Vercel Web / Admin 部署

## 服务器线程禁止事项

- 不要把 Web `/contact` 改回 `/support`
- 不要私自新增 mobile 公开环境变量
- 不要让 mobile 直接依赖 secret
- 不要让前端把业务阈值写进 `.env`

## 前端等你输出什么

1. 环境变量清单（按应用拆）
2. dev / staging / prod 域名表
3. Expo EAS 基本流程
4. API / Worker 部署矩阵
5. Sentry / PostHog 接入位说明
6. mobile 本地 `.env.example` 最终版

```

## `docs/handoffs/backend-next-steps-from-web-batch3.md`

```md
# 给后端线程：第 3 批 Web 官网完成后的衔接说明（Batch 5 清理后版本）

## 1. 本轮没有新增冻结项

这一批只落地了 `apps/web` 页面骨架。

没有新增：

- enum
- state
- API path
- request field
- response field
- table field
- event
- worker
- queue
- cron
- env var
- domain
- route

因此这轮 **不要求你修改 registry**。

## 2. 这批 Web 目前不消费猜测型 API

现在的官网与合规页：

- 直接消费 `packages/shared` 的硬规则常量
- 对可运营阈值只展示 fallback 示例
- 不依赖 `packages/api-client`

## 3. 你下一步需要准备什么

请你后续在后端线程补齐：

- public rules content 模块
- public compliance content 模块（如果你希望后续由后台管理）

注意：

- 如果你新增 path / field / state，先登记 registry，再生成 OpenAPI，再生成 `packages/api-client`
- Web 公开路径已经锁定，不要改 URL
- `/contact` 继续保持公开合规页面，不要改回 `/support`

## 4. 对 Web 来说你最重要的保证

- 规则内容未来即使切成动态数据，也必须保持现有公开 URL 不变
- 前端不会提前口头接字段，只会等待 registry + OpenAPI

```

## `docs/handoffs/三个对话框怎么继续发.md`

```md
# 你接下来怎么给三个对话框发消息（Batch 5 后版本，可直接复制）

## 发给前端对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、已有 packages/shared、已有 packages/api-client。保持 registry-first，不发明新的共享契约；在 backend 还没更新 registry + OpenAPI 前，只允许继续做前端内部骨架、loading/error/empty、mock 占位、以及接线准备工作。
```

## 发给后端对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、docs/handoffs/backend-next-steps-from-mobile-batch2.md、docs/handoffs/backend-next-steps-from-web-batch3.md、docs/handoffs/backend-next-steps-from-admin-batch4.md。当前前端已清理掉手写猜测型 API path，请严格按 registry-first 顺序：先登记，再 OpenAPI，再生成 packages/api-client。
```

## 发给服务器对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、docs/handoffs/server-next-steps-from-mobile-batch2.md、docs/handoffs/server-next-steps-from-web-batch3.md、docs/handoffs/server-next-steps-from-admin-batch4.md。当前前端已对齐 registry-first，请只使用已登记的环境变量、域名和公开路径继续推进部署与 EAS 流程。
```

```

## `docs/handoffs/backend-next-steps-from-frontend-batch5.md`

```md
# Backend Next Steps from Frontend Batch 5

## 前端本轮已完成

- 清理了 `packages/api-client` 中的手写 path 占位
- 清理了 mobile 里的未登记 env var
- 清理了前端页面 / 文档里的猜测型 API path 描述
- 新增 pre-OpenAPI 边界校验脚本

## 你接下来需要做的事

1. 对新增冻结项先更新 registry
2. 按模块导出 OpenAPI
3. 生成 `packages/api-client`
4. 以模块分批给前端接线：
   - auth
   - products
   - orders / payment
   - queue / queue guard
   - wallet / withdrawals
   - tasks
   - invites
   - rules content
   - admin read-only domains

## 你当前不要做的事

- 不要跳过 registry 直接给前端口头字段
- 不要把 DTO 类型塞进 `packages/shared`
- 不要让前端手抄接口

```

## `docs/handoffs/server-next-steps-from-frontend-batch5.md`

```md
# Server Next Steps from Frontend Batch 5

## 前端本轮已完成

- Mobile 公开 env 已清理回 registry baseline
- Web / Admin 公开路由继续保持不变
- `packages/api-client` 回到 pre-OpenAPI placeholder

## 你接下来需要做的事

1. 保持当前域名矩阵不变
2. 保持当前 env 分组不变
3. 补齐 EAS / Vercel / Render / Cloudflare 的部署与发布文档
4. 准备前端需要的最终 `.env.example` 与环境矩阵说明

## 你当前不要做的事

- 不要新增未登记公开 env
- 不要更改 Web `/contact`
- 不要更改 Admin / Web / API 已登记域名基线

```

## `docs/handoffs/第5批-发给后端和服务器的话术.md`

```md
当前前端已完成第5批 registry-first 清理，请后端与服务器线程统一继承：

1. queuefree_prd_v1_2
2. docs/contracts/queuefree-collaboration-contract-v1.2.md
3. docs/registry/registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

注意：
- 前端已删除手写猜测型 API path 占位
- mobile 已移除未登记 env var
- 从现在开始，必须严格执行：先登记，再 OpenAPI，再生成 packages/api-client，再让前端接真实数据

```
```

## `batch5-file-tree.txt`

```
queuefree-batch5-registry-first-frontend/
├── apps
│   ├── admin
│   │   ├── app
│   │   │   ├── (console)
│   │   │   │   ├── audit
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── campaigns
│   │   │   │   │   ├── [campaignId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── governance
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── invites
│   │   │   │   │   ├── [relationId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── orders
│   │   │   │   │   ├── [orderId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── products
│   │   │   │   │   ├── [productId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── queues
│   │   │   │   │   ├── [entryId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── risk
│   │   │   │   │   ├── [caseId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── slots
│   │   │   │   │   ├── [slotId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── tasks
│   │   │   │   │   ├── [taskId]
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── wallet
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── withdrawals
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── error.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   ├── error.tsx
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   ├── loading.tsx
│   │   │   └── not-found.tsx
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── ui
│   │   │   │   │   ├── badge.tsx
│   │   │   │   │   ├── button.tsx
│   │   │   │   │   ├── card.tsx
│   │   │   │   │   ├── data-table.tsx
│   │   │   │   │   └── input.tsx
│   │   │   │   ├── admin-page-header.tsx
│   │   │   │   ├── admin-shell.tsx
│   │   │   │   ├── admin-sidebar.tsx
│   │   │   │   ├── admin-skeleton-banner.tsx
│   │   │   │   ├── admin-topbar.tsx
│   │   │   │   ├── metric-card.tsx
│   │   │   │   ├── module-detail-page.tsx
│   │   │   │   ├── module-list-page.tsx
│   │   │   │   ├── page-shell.tsx
│   │   │   │   └── section-title.tsx
│   │   │   └── lib
│   │   │       ├── admin-content.ts
│   │   │       ├── env.ts
│   │   │       ├── navigation.ts
│   │   │       └── utils.ts
│   │   ├── .env.example
│   │   ├── next-env.d.ts
│   │   ├── next.config.mjs
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.ts
│   │   └── tsconfig.json
│   ├── mobile
│   │   ├── app
│   │   │   ├── (app)
│   │   │   │   ├── (tabs)
│   │   │   │   │   ├── _layout.tsx
│   │   │   │   │   ├── home.tsx
│   │   │   │   │   ├── invites.tsx
│   │   │   │   │   ├── me.tsx
│   │   │   │   │   ├── queue.tsx
│   │   │   │   │   ├── tasks.tsx
│   │   │   │   │   └── wallet.tsx
│   │   │   │   ├── checkout
│   │   │   │   │   └── [productId].tsx
│   │   │   │   ├── me
│   │   │   │   │   ├── addresses.tsx
│   │   │   │   │   └── security.tsx
│   │   │   │   ├── orders
│   │   │   │   │   └── success
│   │   │   │   │       └── [orderId].tsx
│   │   │   │   ├── product
│   │   │   │   │   └── [productId].tsx
│   │   │   │   ├── queue
│   │   │   │   │   └── [entryId].tsx
│   │   │   │   ├── rules
│   │   │   │   │   ├── activity
│   │   │   │   │   │   └── [campaignId].tsx
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── queue.tsx
│   │   │   │   │   └── wallet.tsx
│   │   │   │   ├── wallet
│   │   │   │   │   └── withdraw.tsx
│   │   │   │   ├── _layout.tsx
│   │   │   │   ├── delete-account.tsx
│   │   │   │   ├── privacy.tsx
│   │   │   │   ├── support.tsx
│   │   │   │   └── terms.tsx
│   │   │   ├── (public)
│   │   │   │   ├── auth
│   │   │   │   │   ├── otp.tsx
│   │   │   │   │   └── phone.tsx
│   │   │   │   ├── _layout.tsx
│   │   │   │   └── welcome.tsx
│   │   │   ├── _layout.tsx
│   │   │   └── index.tsx
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── checkbox-row.tsx
│   │   │   │   ├── demo-banner.tsx
│   │   │   │   ├── empty-state.tsx
│   │   │   │   ├── key-value-row.tsx
│   │   │   │   ├── nav-row.tsx
│   │   │   │   ├── primary-button.tsx
│   │   │   │   ├── screen.tsx
│   │   │   │   ├── section-card.tsx
│   │   │   │   ├── status-pill.tsx
│   │   │   │   └── text-field.tsx
│   │   │   ├── hooks
│   │   │   │   └── use-runtime-config.ts
│   │   │   ├── lib
│   │   │   │   ├── demo-data.ts
│   │   │   │   ├── env.ts
│   │   │   │   └── status-maps.ts
│   │   │   ├── providers
│   │   │   │   ├── app-providers.tsx
│   │   │   │   └── query-provider.tsx
│   │   │   └── store
│   │   │       ├── auth-store.ts
│   │   │       └── runtime-config-store.ts
│   │   ├── .env.example
│   │   ├── app.json
│   │   ├── babel.config.js
│   │   ├── expo-env.d.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── web
│       ├── app
│       │   ├── contact
│       │   │   └── page.tsx
│       │   ├── delete-account
│       │   │   └── page.tsx
│       │   ├── privacy
│       │   │   └── page.tsx
│       │   ├── rules
│       │   │   ├── activity
│       │   │   │   └── [slug]
│       │   │   │       └── page.tsx
│       │   │   ├── queue
│       │   │   │   └── page.tsx
│       │   │   ├── wallet
│       │   │   │   └── page.tsx
│       │   │   └── page.tsx
│       │   ├── terms
│       │   │   └── page.tsx
│       │   ├── error.tsx
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   ├── loading.tsx
│       │   ├── not-found.tsx
│       │   └── page.tsx
│       ├── src
│       │   ├── components
│       │   │   ├── ui
│       │   │   │   ├── button.tsx
│       │   │   │   └── card.tsx
│       │   │   ├── page-hero.tsx
│       │   │   ├── page-shell.tsx
│       │   │   ├── section-card.tsx
│       │   │   ├── site-footer.tsx
│       │   │   └── site-header.tsx
│       │   └── lib
│       │       ├── env.ts
│       │       ├── site-content.ts
│       │       └── utils.ts
│       ├── .env.example
│       ├── next-env.d.ts
│       ├── next.config.mjs
│       ├── package.json
│       ├── postcss.config.mjs
│       ├── tailwind.config.ts
│       └── tsconfig.json
├── docs
│   ├── contracts
│   │   ├── admin-route-module-map-v1.2.md
│   │   ├── frontend-preopenapi-boundary-v1.2.md
│   │   ├── mobile-screen-api-map-v1.2.md
│   │   ├── queuefree-collaboration-contract-v1.2.md
│   │   └── web-public-route-map-v1.2.md
│   ├── handoffs
│   │   ├── backend-next-steps-from-admin-batch4.md
│   │   ├── backend-next-steps-from-frontend-batch5.md
│   │   ├── backend-next-steps-from-mobile-batch2.md
│   │   ├── backend-next-steps-from-web-batch3.md
│   │   ├── server-next-steps-from-admin-batch4.md
│   │   ├── server-next-steps-from-frontend-batch5.md
│   │   ├── server-next-steps-from-mobile-batch2.md
│   │   ├── server-next-steps-from-web-batch3.md
│   │   ├── 三个对话框怎么继续发.md
│   │   ├── 第3批-发给后端和服务器的话术.md
│   │   ├── 第4批-发给后端和服务器的话术.md
│   │   └── 第5批-发给后端和服务器的话术.md
│   └── registry
│       └── registry-baseline-v1.2.md
├── packages
│   ├── api-client
│   │   ├── openapi
│   │   │   └── .gitkeep
│   │   ├── src
│   │   │   ├── generated
│   │   │   │   └── .gitkeep
│   │   │   └── index.ts
│   │   ├── package.json
│   │   ├── README.md
│   │   └── tsconfig.json
│   ├── shared
│   │   ├── src
│   │   │   ├── constants
│   │   │   │   ├── business-rules.ts
│   │   │   │   ├── launch.ts
│   │   │   │   ├── routes.ts
│   │   │   │   └── runtime-config-defaults.ts
│   │   │   ├── enums
│   │   │   │   ├── account-delete-status.ts
│   │   │   │   ├── admin-role.ts
│   │   │   │   ├── cron-name.ts
│   │   │   │   ├── event-name.ts
│   │   │   │   ├── invite-relation-status.ts
│   │   │   │   ├── order-status.ts
│   │   │   │   ├── queue-entry-status.ts
│   │   │   │   ├── queue-name.ts
│   │   │   │   ├── settlement-slot-status.ts
│   │   │   │   ├── user-queue-guard-status.ts
│   │   │   │   ├── wallet-activation-method.ts
│   │   │   │   ├── withdrawal-status.ts
│   │   │   │   └── worker-job-name.ts
│   │   │   ├── formatters
│   │   │   │   ├── datetime.ts
│   │   │   │   └── money.ts
│   │   │   ├── schemas
│   │   │   │   └── runtime-config.schema.ts
│   │   │   ├── types
│   │   │   │   └── runtime-config.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── ui-tokens
│       ├── src
│       │   ├── index.ts
│       │   ├── mobile-theme.ts
│       │   └── web-theme.ts
│       ├── package.json
│       └── tsconfig.json
├── scripts
│   └── verify-registry-first-frontend.mjs
├── .gitignore
├── .npmrc
├── .nvmrc
├── batch4-admin-file-contents.md
├── batch4-admin-file-tree.txt
├── package.json
├── pnpm-workspace.yaml
├── README-第2批-手机端启动步骤.md
├── README-第3批-Web官网启动步骤.md
├── README-第4批-Admin后台启动步骤.md
├── README-第5批-Registry-First前端清理与接线准备.md
├── tsconfig.base.json
└── turbo.json
```

## `batch6-file-tree.txt`

```
.gitignore
.npmrc
.nvmrc
README-第2批-手机端启动步骤.md
README-第3批-Web官网启动步骤.md
README-第4批-Admin后台启动步骤.md
README-第5批-Registry-First前端清理与接线准备.md
README-第6批-前端质量门禁与Registry对齐.md
apps/admin/.env.example
apps/admin/app/(console)/audit/page.tsx
apps/admin/app/(console)/campaigns/[campaignId]/page.tsx
apps/admin/app/(console)/campaigns/page.tsx
apps/admin/app/(console)/error.tsx
apps/admin/app/(console)/governance/page.tsx
apps/admin/app/(console)/invites/[relationId]/page.tsx
apps/admin/app/(console)/invites/page.tsx
apps/admin/app/(console)/layout.tsx
apps/admin/app/(console)/loading.tsx
apps/admin/app/(console)/orders/[orderId]/page.tsx
apps/admin/app/(console)/orders/page.tsx
apps/admin/app/(console)/page.tsx
apps/admin/app/(console)/products/[productId]/page.tsx
apps/admin/app/(console)/products/page.tsx
apps/admin/app/(console)/queues/[entryId]/page.tsx
apps/admin/app/(console)/queues/page.tsx
apps/admin/app/(console)/risk/[caseId]/page.tsx
apps/admin/app/(console)/risk/page.tsx
apps/admin/app/(console)/slots/[slotId]/page.tsx
apps/admin/app/(console)/slots/page.tsx
apps/admin/app/(console)/tasks/[taskId]/page.tsx
apps/admin/app/(console)/tasks/page.tsx
apps/admin/app/(console)/wallet/page.tsx
apps/admin/app/(console)/withdrawals/page.tsx
apps/admin/app/error.tsx
apps/admin/app/globals.css
apps/admin/app/layout.tsx
apps/admin/app/loading.tsx
apps/admin/app/login/page.tsx
apps/admin/app/not-found.tsx
apps/admin/next-env.d.ts
apps/admin/next.config.mjs
apps/admin/package.json
apps/admin/postcss.config.mjs
apps/admin/src/components/admin-page-header.tsx
apps/admin/src/components/admin-shell.tsx
apps/admin/src/components/admin-sidebar.tsx
apps/admin/src/components/admin-skeleton-banner.tsx
apps/admin/src/components/admin-topbar.tsx
apps/admin/src/components/metric-card.tsx
apps/admin/src/components/module-detail-page.tsx
apps/admin/src/components/module-list-page.tsx
apps/admin/src/components/page-shell.tsx
apps/admin/src/components/section-title.tsx
apps/admin/src/components/ui/badge.tsx
apps/admin/src/components/ui/button.tsx
apps/admin/src/components/ui/card.tsx
apps/admin/src/components/ui/data-table.tsx
apps/admin/src/components/ui/input.tsx
apps/admin/src/lib/admin-content.ts
apps/admin/src/lib/env.ts
apps/admin/src/lib/navigation.ts
apps/admin/src/lib/utils.ts
apps/admin/tailwind.config.ts
apps/admin/tsconfig.json
apps/mobile/.env.example
apps/mobile/app.json
apps/mobile/app/(app)/(tabs)/_layout.tsx
apps/mobile/app/(app)/(tabs)/home.tsx
apps/mobile/app/(app)/(tabs)/invites.tsx
apps/mobile/app/(app)/(tabs)/me.tsx
apps/mobile/app/(app)/(tabs)/queue.tsx
apps/mobile/app/(app)/(tabs)/tasks.tsx
apps/mobile/app/(app)/(tabs)/wallet.tsx
apps/mobile/app/(app)/_layout.tsx
apps/mobile/app/(app)/checkout/[productId].tsx
apps/mobile/app/(app)/delete-account.tsx
apps/mobile/app/(app)/me/addresses.tsx
apps/mobile/app/(app)/me/security.tsx
apps/mobile/app/(app)/orders/success/[orderId].tsx
apps/mobile/app/(app)/privacy.tsx
apps/mobile/app/(app)/product/[productId].tsx
apps/mobile/app/(app)/queue/[entryId].tsx
apps/mobile/app/(app)/rules/activity/[campaignId].tsx
apps/mobile/app/(app)/rules/index.tsx
apps/mobile/app/(app)/rules/queue.tsx
apps/mobile/app/(app)/rules/wallet.tsx
apps/mobile/app/(app)/support.tsx
apps/mobile/app/(app)/terms.tsx
apps/mobile/app/(app)/wallet/withdraw.tsx
apps/mobile/app/(public)/_layout.tsx
apps/mobile/app/(public)/auth/otp.tsx
apps/mobile/app/(public)/auth/phone.tsx
apps/mobile/app/(public)/welcome.tsx
apps/mobile/app/_layout.tsx
apps/mobile/app/index.tsx
apps/mobile/babel.config.js
apps/mobile/expo-env.d.ts
apps/mobile/package.json
apps/mobile/src/components/checkbox-row.tsx
apps/mobile/src/components/demo-banner.tsx
apps/mobile/src/components/empty-state.tsx
apps/mobile/src/components/key-value-row.tsx
apps/mobile/src/components/nav-row.tsx
apps/mobile/src/components/primary-button.tsx
apps/mobile/src/components/screen.tsx
apps/mobile/src/components/section-card.tsx
apps/mobile/src/components/status-pill.tsx
apps/mobile/src/components/text-field.tsx
apps/mobile/src/hooks/use-runtime-config.ts
apps/mobile/src/lib/demo-data.ts
apps/mobile/src/lib/env.ts
apps/mobile/src/lib/status-maps.ts
apps/mobile/src/providers/app-providers.tsx
apps/mobile/src/providers/query-provider.tsx
apps/mobile/src/store/auth-store.ts
apps/mobile/src/store/runtime-config-store.ts
apps/mobile/tsconfig.json
apps/web/.env.example
apps/web/app/contact/page.tsx
apps/web/app/delete-account/page.tsx
apps/web/app/error.tsx
apps/web/app/globals.css
apps/web/app/layout.tsx
apps/web/app/loading.tsx
apps/web/app/not-found.tsx
apps/web/app/page.tsx
apps/web/app/privacy/page.tsx
apps/web/app/rules/activity/[slug]/page.tsx
apps/web/app/rules/page.tsx
apps/web/app/rules/queue/page.tsx
apps/web/app/rules/wallet/page.tsx
apps/web/app/terms/page.tsx
apps/web/next-env.d.ts
apps/web/next.config.mjs
apps/web/package.json
apps/web/postcss.config.mjs
apps/web/src/components/page-hero.tsx
apps/web/src/components/page-shell.tsx
apps/web/src/components/section-card.tsx
apps/web/src/components/site-footer.tsx
apps/web/src/components/site-header.tsx
apps/web/src/components/ui/button.tsx
apps/web/src/components/ui/card.tsx
apps/web/src/lib/env.ts
apps/web/src/lib/site-content.ts
apps/web/src/lib/utils.ts
apps/web/tailwind.config.ts
apps/web/tsconfig.json
batch4-admin-file-contents.md
batch4-admin-file-tree.txt
batch5-file-contents.md
batch5-file-tree.txt
batch6-file-contents.md
batch6-file-tree.txt
docs/contracts/admin-route-module-map-v1.2.md
docs/contracts/frontend-guardrail-checks-v1.2.md
docs/contracts/frontend-preopenapi-boundary-v1.2.md
docs/contracts/frontend-route-registry-audit-v1.2.md
docs/contracts/mobile-screen-api-map-v1.2.md
docs/contracts/queuefree-collaboration-contract-v1.2.md
docs/contracts/web-public-route-map-v1.2.md
docs/handoffs/backend-next-steps-from-admin-batch4.md
docs/handoffs/backend-next-steps-from-frontend-batch5.md
docs/handoffs/backend-next-steps-from-frontend-batch6.md
docs/handoffs/backend-next-steps-from-mobile-batch2.md
docs/handoffs/backend-next-steps-from-web-batch3.md
docs/handoffs/server-next-steps-from-admin-batch4.md
docs/handoffs/server-next-steps-from-frontend-batch5.md
docs/handoffs/server-next-steps-from-frontend-batch6.md
docs/handoffs/server-next-steps-from-mobile-batch2.md
docs/handoffs/server-next-steps-from-web-batch3.md
docs/handoffs/三个对话框怎么继续发.md
docs/handoffs/第3批-发给后端和服务器的话术.md
docs/handoffs/第4批-发给后端和服务器的话术.md
docs/handoffs/第5批-发给后端和服务器的话术.md
docs/handoffs/第6批-发给后端和服务器的话术.md
docs/registry/registry-baseline-v1.2.md
package.json
packages/api-client/README.md
packages/api-client/openapi/.gitkeep
packages/api-client/package.json
packages/api-client/src/generated/.gitkeep
packages/api-client/src/index.ts
packages/api-client/tsconfig.json
packages/shared/package.json
packages/shared/src/constants/business-rules.ts
packages/shared/src/constants/launch.ts
packages/shared/src/constants/routes.ts
packages/shared/src/constants/runtime-config-defaults.ts
packages/shared/src/enums/account-delete-status.ts
packages/shared/src/enums/admin-role.ts
packages/shared/src/enums/cron-name.ts
packages/shared/src/enums/event-name.ts
packages/shared/src/enums/invite-relation-status.ts
packages/shared/src/enums/order-status.ts
packages/shared/src/enums/queue-entry-status.ts
packages/shared/src/enums/queue-name.ts
packages/shared/src/enums/settlement-slot-status.ts
packages/shared/src/enums/user-queue-guard-status.ts
packages/shared/src/enums/wallet-activation-method.ts
packages/shared/src/enums/withdrawal-status.ts
packages/shared/src/enums/worker-job-name.ts
packages/shared/src/formatters/datetime.ts
packages/shared/src/formatters/money.ts
packages/shared/src/index.ts
packages/shared/src/schemas/runtime-config.schema.ts
packages/shared/src/types/runtime-config.ts
packages/shared/tsconfig.json
packages/ui-tokens/package.json
packages/ui-tokens/src/index.ts
packages/ui-tokens/src/mobile-theme.ts
packages/ui-tokens/src/web-theme.ts
packages/ui-tokens/tsconfig.json
pnpm-workspace.yaml
scripts/verify-frontend-import-boundaries.mjs
scripts/verify-registry-first-frontend.mjs
scripts/verify-route-registry.mjs
tsconfig.base.json
turbo.json
```

## `docs/contracts/admin-route-module-map-v1.2.md`

```
# QueueFree Admin Route ↔ Module Map v1.2

状态：Informational  
规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`
4. `packages/shared`

本文件不是新的冻结项注册表。  
本文件只用于说明：**本轮 `apps/admin` 骨架如何映射到已经冻结的 Admin 路由与 PRD 模块。**

---

## 1. 登录与总览

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/login` | 9.3 Admin IA / 登录 | 登录壳页面、协议提示、Skeleton 入口 |
| `/` | 11.1 Dashboard | 指标卡、队列摘要、资金摘要、待处理事项 |

---

## 2. 运营域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/products` | 11.2 商品管理 | 商品列表、入队开关/活动绑定占位 |
| `/products/[productId]` | 11.2 商品管理 | 商品详情骨架、价格库存与队列设置占位 |
| `/orders` | 11.3 订单管理 | 订单列表、状态概览、售后/退款占位 |
| `/orders/[orderId]` | 11.3 订单管理 | 订单详情骨架、履约与售后占位 |
| `/queues` | 11.4 队列管理 | 队列列表、状态摘要、事件日志入口占位 |
| `/queues/[entryId]` | 11.4 队列管理 | 队列详情、Boost/冻结/移出说明占位 |
| `/slots` | 11.5 时隙管理 | 时隙列表、执行状态摘要 |
| `/slots/[slotId]` | 11.5 时隙管理 | 时隙详情、重试/重放占位 |
| `/campaigns` | 11.6 活动管理 | 活动列表、封顶与额外时隙占位 |
| `/campaigns/[campaignId]` | 11.6 活动管理 | 活动详情、规则文案占位 |
| `/tasks` | 11.7 任务与邀请管理 | 任务列表、奖励配置占位 |
| `/tasks/[taskId]` | 11.7 任务与邀请管理 | 任务详情骨架 |
| `/invites` | 11.7 任务与邀请管理 | 邀请关系列表、有效状态摘要 |
| `/invites/[relationId]` | 11.7 任务与邀请管理 | 邀请关系详情骨架 |

---

## 3. 资金风控域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/wallet` | 11.8 钱包与提现管理 | 钱包总览、账变占位、激活方式提示 |
| `/withdrawals` | 11.8 钱包与提现管理 | 提现列表、审核阶段占位 |
| `/risk` | 11.9 风控后台 | 风险案件池、命中线索占位 |
| `/risk/[caseId]` | 11.9 风控后台 | 风险案件详情、人工决策占位 |

---

## 4. 治理域

| 冻结路由 | PRD 模块 | 本轮页面职责 |
| --- | --- | --- |
| `/governance` | 11.10 权限与审计 | RBAC、角色权限矩阵、敏感操作说明 |
| `/audit` | 11.10 权限与审计 | 审计日志列表、导出占位 |

---

## 5. 本轮明确不做的内容

- 真实鉴权
- 真实 RBAC 校验
- 真实 Admin API 接入
- 真实 Prisma / CMS / 审核动作
- 未登记 contract 的 request / response 字段
```

## `docs/contracts/frontend-guardrail-checks-v1.2.md`

```
# QueueFree Frontend Guardrail Checks v1.2

状态：Informational  
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的共享契约。

本文件只说明：当前前端线程新增了哪些**本地质量门禁脚本**，以及它们分别防止什么问题。

## 新增脚本

### 1. `pnpm verify:registry-first-frontend`

作用：

- 校验 mobile / web / admin 只使用已登记的公开 env var
- 校验 pre-OpenAPI 阶段没有手写业务 API path 片段
- 校验 `packages/api-client` 没有回退成手写 SDK

### 2. `pnpm verify:route-registry`

作用：

- 校验 `apps/mobile` 的 expo-router 页面路径与 registry 一致
- 校验 `apps/web` 的公开页面路径与 registry 一致
- 校验 `apps/admin` 的后台路径与 registry 一致

### 3. `pnpm verify:frontend-import-boundaries`

作用：

- 校验前端 app 没有直接引入 NestJS / Prisma / worker 侧依赖
- 校验 `packages/shared` 没有混入 NestJS DTO / Prisma runtime 绑定逻辑

### 4. `pnpm verify:frontend-guardrails`

作用：

- 串联执行上面 3 项校验
- 建议作为本地提交前的统一检查入口

## 设计目的

这批脚本不是为了新增功能，而是为了避免三类问题再次出现：

1. 前端偷偷长出未登记路径
2. 前端重新手写猜测型 API path / SDK
3. `packages/shared` 被污染成后端运行时代码仓库

## 当前边界

在 backend 尚未导出正式 OpenAPI 之前，前端仍然保持：

- 页面骨架可继续做
- mock / placeholder 可继续做
- 真实 SDK 接入继续等待 OpenAPI 生成后再做
```

## `docs/contracts/frontend-preopenapi-boundary-v1.2.md`

```
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
```

## `docs/contracts/frontend-route-registry-audit-v1.2.md`

```
# QueueFree Frontend Route Registry Audit v1.2

状态：Informational  
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的 registry，也不是新的共享契约。

它只用于说明：**当前前端仓库里的 Mobile / Web / Admin 路由文件，是否已经与 `docs/registry/registry-baseline-v1.2.md` 对齐。**

## 审计范围

- `apps/mobile/app/**`
- `apps/web/app/**`
- `apps/admin/app/**`
- `docs/registry/registry-baseline-v1.2.md`

## 当前结果

### Web

- Registry 路由数：9
- 当前页面路由数：9
- 结果：已对齐

覆盖项：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

### Mobile

- Registry 路由数：24
- 当前页面路由数：24
- 结果：已对齐

覆盖项：

- `/(public)/welcome`
- `/(public)/auth/phone`
- `/(public)/auth/otp`
- `/(app)/(tabs)/home`
- `/(app)/(tabs)/queue`
- `/(app)/(tabs)/tasks`
- `/(app)/(tabs)/invites`
- `/(app)/(tabs)/wallet`
- `/(app)/(tabs)/me`
- `/(app)/product/[productId]`
- `/(app)/checkout/[productId]`
- `/(app)/orders/success/[orderId]`
- `/(app)/queue/[entryId]`
- `/(app)/wallet/withdraw`
- `/(app)/me/addresses`
- `/(app)/me/security`
- `/(app)/rules`
- `/(app)/rules/queue`
- `/(app)/rules/wallet`
- `/(app)/rules/activity/[campaignId]`
- `/(app)/privacy`
- `/(app)/terms`
- `/(app)/support`
- `/(app)/delete-account`

### Admin

- Registry 路由数：22
- 当前页面路由数：22
- 结果：已对齐

覆盖项：

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

## 使用方式

在仓库根目录运行：

```bash
pnpm verify:route-registry
```

如果未来有人：

- 擅自新增页面路由
- 擅自删除冻结路由
- 把 Web `/contact` 改回 `/support`
- 在 Admin 或 Mobile 增减未登记路径

这个校验会直接失败。
```

## `docs/contracts/mobile-screen-api-map-v1.2.md`

```
# QueueFree Mobile Screen → Backend Domain Dependency Map v1.2

状态：Pre-OpenAPI Boundary  
唯一规则源：`queuefree_prd_v1_2`

本文件**不是 API path 注册表**。  
本文件只说明：手机端每个冻结路由，后续会依赖哪个**后端模块域**。

在 backend 尚未完成 registry + OpenAPI 之前：

- 这里**不写**猜测型 REST path
- 这里**不写**请求字段 / 响应字段
- 这里**不写** DTO 结构
- 前端继续只用 `packages/shared` + 本地 mock

---

## 1. Public 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(public)/welcome` | 欢迎、规则摘要、风险提示 | rules content | 静态说明 |
| `/(public)/auth/phone` | 手机号输入、法律同意、邀请码 | auth / invite bind policy | 本地表单 + demo flow |
| `/(public)/auth/otp` | OTP 校验、登录注册合流 | auth / session | 本地表单 + demo flow |

## 2. Tab 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/(tabs)/home` | 商品摘要、活动摘要、规则入口 | product catalog / rules content / notifications | 本地 mock |
| `/(app)/(tabs)/queue` | 队列列表、当前排名、保活状态 | queue entries / queue guard | 本地 mock |
| `/(app)/(tabs)/tasks` | 任务列表、领奖 | tasks | 本地 mock |
| `/(app)/(tabs)/invites` | 邀请码、邀请状态、奖励记录 | invites | 本地 mock |
| `/(app)/(tabs)/wallet` | 钱包总览、账变、提现记录 | wallet / withdrawals / withdrawal accounts | 本地 mock |
| `/(app)/(tabs)/me` | 资料、地址、安全、规则、删除账号入口 | profile / addresses / devices / account deletion | 本地 mock |

## 3. Detail Stack 路由

| 冻结路由 | 页面职责 | 后端模块域 | 当前前端状态 |
| --- | --- | --- | --- |
| `/(app)/product/[productId]` | 商品详情 | product catalog | 本地 mock |
| `/(app)/checkout/[productId]` | 地址选择、订单确认、支付前置 | addresses / orders / payment intents | 本地 mock |
| `/(app)/orders/success/[orderId]` | 支付成功、入队成功 | orders / queue entries / queue guard | 本地 mock |
| `/(app)/queue/[entryId]` | 队列详情、boost 展示 | queue entries / queue boost | 本地 mock |
| `/(app)/wallet/withdraw` | 提现申请 | wallet / withdrawals / withdrawal accounts | 本地表单 |
| `/(app)/me/addresses` | 地址列表、地址新增 | addresses | 本地表单 |
| `/(app)/me/security` | 设备、安全、登出 | devices / auth session | 本地 mock |
| `/(app)/rules` | 规则中心 | rules content | 静态说明 |
| `/(app)/rules/queue` | 队列规则 | rules content | 静态说明 |
| `/(app)/rules/wallet` | 钱包规则 | rules content | 静态说明 |
| `/(app)/rules/activity/[campaignId]` | 活动规则 | rules content / campaigns | 静态说明 |
| `/(app)/privacy` | 隐私政策 | public compliance content | 静态说明 |
| `/(app)/terms` | 服务条款 | public compliance content | 静态说明 |
| `/(app)/support` | 客服 / 申诉说明 | support contact content | 静态说明 |
| `/(app)/delete-account` | 删除账号说明与申请占位 | account deletion | 本地 demo flow |

---

## 4. 正确接线顺序

1. 后端先更新 registry（如果有新增冻结项）
2. 后端导出 OpenAPI
3. 重新生成 `packages/api-client`
4. 前端再把对应模块从 mock 切到 generated SDK

顺序不能反。
```

## `docs/contracts/queuefree-collaboration-contract-v1.2.md`

```
# QueueFree 协作契约 v1.2

状态：Locked  
生效日期：2026-03-11  
唯一规则源：`queuefree_prd_v1_2`

---

## 1. 目标

本文件用于约束 QueueFree 的三个实现线程：

1. 前端线程（Mobile / Web / Admin）
2. 后端线程（API / Worker / DB / OpenAPI）
3. 服务器线程（环境 / 域名 / 部署 / CI/CD / Secret / Runbook）

目的只有一个：**避免三个线程各自脑补，从而出现字段不一致、状态不一致、路由不一致、域名不一致、环境变量不一致。**

---

## 2. 真相源优先级

发生冲突时，按下面顺序裁决：

1. `queuefree_prd_v1_2`
2. `packages/shared`
3. `packages/api-client`（仅由 OpenAPI 生成）
4. `docs/registry/registry-baseline-v1.2.md`
5. 线程内部草稿、临时说明、口头假设

任何线程都不得绕过第 1 层和第 2 层直接发明新规则。

---

## 3. 三线程边界

### 3.1 前端线程负责

前端线程只负责：

- Mobile / Web / Admin 页面与组件
- 路由实现
- 表单交互
- API 调用接入
- 加载态 / 错误态 / 空态 / 成功反馈
- 金额与时间格式化展示

前端线程 **不得负责**：

- 私自定义业务阈值
- 私自新增订单 / 钱包 / 队列状态
- 私自猜测 API 响应结构
- 私自把 DTO class 放进 `packages/shared`

前端线程只能消费：

- `packages/shared`
- `packages/api-client`

---

### 3.2 后端线程负责

后端线程只负责：

- NestJS 模块划分
- Prisma schema
- REST API
- DTO / validator / Swagger 装饰器
- BullMQ queue / worker
- 幂等与事务
- 资金账本
- 审计日志
- 运行时配置下发

后端线程 **不得负责**：

- 私自修改前端固定公开路由
- 私自改成 GraphQL
- 私自把 shared package 变成 NestJS DTO 仓库
- 私自把运行时配置改成前端硬编码

后端线程可以定义：

- `services/api`
- `services/worker`
- OpenAPI，并生成 `packages/api-client`

---

### 3.3 服务器线程负责

服务器线程只负责：

- 环境分层
- 域名与子域名
- GitHub / Vercel / Render / Supabase / Upstash / R2 / Cloudflare / Expo EAS 的部署与接线
- Secret 管理
- CI/CD
- 监控、告警、备份、恢复、回滚
- 审核前演示环境准备

服务器线程 **不得负责**：

- 私自新增业务字段
- 私自改 API 路径
- 私自改订单、钱包、队列状态枚举
- 私自把合规公开页路径改成别的地址

---

## 4. `packages/shared` 的硬边界

`packages/shared` 只允许放下面这些内容：

- enums
- constants
- schemas
- types
- formatters
- labels
- domain utils

`packages/shared` 明确禁止放：

- NestJS DTO class
- `class-validator` 装饰器
- `@nestjs/swagger` 装饰器
- Prisma model 绑定逻辑
- Controller request class
- Framework runtime 绑定代码

换句话说：

- **共享稳定 contract 放 shared**
- **Nest 专属协议层放 services/api**
- **前端 SDK 一律由 OpenAPI 生成到 packages/api-client**

---

## 5. 共享契约冻结项

以下内容属于冻结项，任何新增、删除、修改都必须先登记：

1. 枚举值
2. 状态机流转
3. API path
4. 请求字段
5. 响应字段
6. 数据表字段
7. 事件名
8. Worker 名称
9. Queue 名称
10. Cron 名称
11. 环境变量名
12. 域名
13. Web / Mobile / Admin 路由

未登记之前，不允许任何线程直接把它写进代码。

---

## 6. 固定硬规则与运行时配置边界

### 6.1 固定硬规则（可进 shared 常量）

这些规则可以进入 `packages/shared/src/constants/business-rules.ts`：

- `ORDER_QUEUE_SEAT_COUNT = 1`
- `QUEUE_TOP_PROTECTED_COUNT = 30`
- `QUEUE_BOOST_MAX_PER_ENTRY = 2`
- `INVITE_MAX_DEPTH = 1`
- `WALLET_SUPPORTS_TOP_UP = false`
- `WALLET_SUPPORTS_PEER_TRANSFER = false`

### 6.2 运行时配置（必须由后端返回）

这些值属于运营可调整项，必须由后端返回，前端只能消费，不能自己写死：

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

允许在 `packages/shared` 中定义：

- 运行时配置 schema
- 默认 fallback 值

但 fallback 不能绕过服务端作为长期真相源。

---

## 7. API 与路由冻结项

### 7.1 API 前缀

- C 端：`/v1`
- Admin：`/v1/admin`

### 7.2 Web 公开页固定路径

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

### 7.3 Mobile 核心路由固定路径

- `/(public)/welcome`
- `/(public)/auth/phone`
- `/(public)/auth/otp`
- `/(app)/(tabs)/home`
- `/(app)/(tabs)/queue`
- `/(app)/(tabs)/tasks`
- `/(app)/(tabs)/invites`
- `/(app)/(tabs)/wallet`
- `/(app)/(tabs)/me`
- `/(app)/product/[productId]`
- `/(app)/checkout/[productId]`
- `/(app)/orders/success/[orderId]`
- `/(app)/queue/[entryId]`
- `/(app)/wallet/withdraw`
- `/(app)/me/addresses`
- `/(app)/me/security`
- `/(app)/rules`
- `/(app)/rules/queue`
- `/(app)/rules/wallet`
- `/(app)/rules/activity/[campaignId]`
- `/(app)/privacy`
- `/(app)/terms`
- `/(app)/support`
- `/(app)/delete-account`

### 7.4 Admin 固定路由

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

---

## 8. 统一命名规范

### 8.1 事件命名

统一使用小写、点分隔：

- `queue.entry.created`
- `queue.entry.frozen`
- `queue.entry.restored`
- `queue.entry.removed`
- `queue.entry.boosted`
- `settlement.slot.settled`
- `wallet.pending.created`
- `wallet.cashback.released`
- `wallet.clawback.created`
- `withdrawal.applied`
- `withdrawal.approved`
- `withdrawal.rejected`
- `risk.case.created`
- `account.delete.requested`

### 8.2 Worker Job 命名

统一使用小写 kebab-case：

- `create-queue-entry-after-payment`
- `restore-frozen-entries-after-checkin`
- `freeze-expired-entries`
- `remove-expired-frozen-entries`
- `run-slot-settlement`
- `release-cashback-after-observation`
- `clawback-after-refund`
- `check-invite-cooling-off`
- `payout-after-withdrawal-approval`
- `score-risk-case`

### 8.3 Queue 名称

统一使用小写 kebab-case：

- `payments-events`
- `queue-guard`
- `settlement-slots`
- `wallet-events`
- `invites`
- `withdrawals`
- `risk-cases`

### 8.4 Cron 名称

统一使用小写 kebab-case：

- `queue-guard-freeze-scan`
- `queue-guard-remove-scan`
- `settlement-slot-dispatch`
- `cashback-release-scan`
- `invite-effective-scan`

---

## 9. 每轮输出必须带的四段

从现在开始，三个线程的每一轮输出都必须显式带这四段：

1. `Assumptions`
2. `Shared Contract Changes`
3. `Risks / Blockers`
4. `Files Changed`

要求：

- 如果没有新增契约，也必须写“无”
- 如果有新增状态或字段，必须写清楚具体值
- 如果修改了路径、事件、环境变量，必须逐项列出

---

## 10. 变更流程

### 10.1 新增共享字段时

必须同时完成：

1. 更新 PRD 假设说明（如确需补充）
2. 更新 `packages/shared`
3. 更新 `docs/registry/registry-baseline-v1.2.md`
4. 后端更新 OpenAPI
5. 重新生成 `packages/api-client`
6. 前端再开始消费

顺序不能反。

### 10.2 新增业务状态时

必须同时说明：

- 状态名称
- 进入条件
- 可流向状态
- UI 展示文案
- 审计日志事件
- 是否影响钱包 / 队列 / 提现 / 删除账号流程

### 10.3 新增环境变量时

必须同时说明：

- 变量名
- 所属应用（mobile/web/admin/api/worker/shared）
- 所在环境（local/dev/staging/prod）
- 是否 secret
- 默认值策略
- 使用位置

---

## 11. 禁止事项

三个线程统一禁止：

- 改技术栈
- 改 Monorepo 结构
- 在前端写死运营阈值
- 在 shared 里混入 NestJS DTO
- 在没有 OpenAPI 的情况下手写猜测型 API contract
- 把 Redis 当成订单或资金真相源
- 跳过 ledger 直接改钱包余额
- 跳过 audit log 做敏感后台操作
- 把 Web `/contact` 改回 `/support`
- 私自引入多市场、多语言、多币种 MVP 逻辑
- 在页面文案里写“保证赚钱 / 保证返现 / 保证免单”

---

## 12. 当前拍板结论（协作执行版）

### 12.1 首发锁定

- Market: `PH`
- Currency: `PHP`
- Timezone: `Asia/Manila`
- Locale: `en-PH`
- Website: `queuefree.com`
- 首审默认关闭 rewarded ads

### 12.2 产品锁定

- 无购物车
- 一单一商品，可多数量
- 1 个订单 = 1 个队列席位
- 用户级签到保活
- 订单级 Boost
- Top30 保护区
- 固定时隙结算
- 钱包先待释放后可提现
- 钱包激活双路径
- 单层邀请
- 删除账号 = 申请 + 清算 + 匿名化

### 12.3 技术锁定

- Monorepo: pnpm + Turborepo
- Mobile: Expo + React Native + expo-router
- Web/Admin: Next.js + Tailwind + shadcn/ui
- API: NestJS + Prisma + PostgreSQL + Redis + BullMQ
- Deploy: Vercel + Render + Supabase + Upstash + R2 + Cloudflare + Expo EAS
- `packages/shared` 只放稳定共享 contract
- `packages/api-client` 只从 OpenAPI 生成

---

## 13. 执行要求

从本文件生效开始：

- 前端线程先围绕 `packages/shared` 开工
- 后端线程先围绕 OpenAPI 与 `packages/shared` 对齐开工
- 服务器线程先围绕域名、环境变量分组、部署矩阵和 registry 开工
- 若三个线程发现冲突，以 `queuefree_prd_v1_2` 为准回退
```

## `docs/contracts/web-public-route-map-v1.2.md`

```
# QueueFree Web Public Route Map v1.2

状态：Drafted in Batch 3  
规则源：`queuefree_prd_v1_2` + `docs/contracts/queuefree-collaboration-contract-v1.2.md` + `docs/registry/registry-baseline-v1.2.md`

---

## 1. 本轮目标

落地 `apps/web` 的公开官网与合规页面骨架，严格遵守已经冻结的 Web 公共路由：

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

本轮 **不新增** 路由，不修改任何已冻结路径。

---

## 2. 页面与职责映射

### `/`

用途：官网首页 / 审核首屏 / 品牌说明页

承担：

- 产品定位说明
- “买商品 -> 入队 -> 等时隙” 的公开解释
- 合规入口导航
- 首发市场与规则版本说明

### `/privacy`

用途：公开隐私政策页

承担：

- 数据收集范围说明
- 数据用途说明
- 删除与保留边界说明
- 公开规则与隐私关系说明

### `/terms`

用途：公开服务条款页

承担：

- 购物优先定位说明
- 非保证返现说明
- 风控 / 审核 / 售后影响说明
- 首发范围说明

### `/rules`

用途：规则中心首页

承担：

- 规则入口导航
- Queue / Wallet / Activity 子页分发
- 运行时参数只展示 fallback 示例，不作为业务真相源

### `/rules/queue`

用途：公开队列规则页

承担：

- 1 订单 = 1 席位
- Top30 保护区
- Boost 边界
- 冻结不参与有效排名
- 固定时隙结算说明

### `/rules/wallet`

用途：公开钱包与提现规则页

承担：

- pending / available / frozen 解释
- 钱包激活解释
- 提现门槛 fallback 示例
- 不支持充值 / 转账说明

### `/rules/activity/[slug]`

用途：公开活动规则页

承担：

- 活动规则独立 URL
- 展示活动可调整项与不可突破底线
- 作为活动链接、审核资料、投放落地页的规范页面

### `/delete-account`

用途：公开删除账号说明页

承担：

- 删除并非即时物理删除
- 阻塞项说明
- 状态机说明
- 清算后匿名化说明

### `/contact`

用途：公开客服 / 申诉入口说明页

承担：

- 联系与申诉分类说明
- 审核阶段的公开联系入口
- 后续接真实工单或邮箱时保持固定 URL 不变

---

## 3. 本轮约束

- 不新增 Web 冻结路由
- 不改 `/contact` 为 `/support`
- 不新增未登记 env var
- 不直接猜测后端规则 API 响应
- 当前页面文案以静态合规骨架为主
- 后续若切换为 CMS 或动态 rules 内容，必须以后端 OpenAPI 为准
```

## `docs/handoffs/backend-next-steps-from-admin-batch4.md`

```
# Backend Next Steps from Admin Batch 4

规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`
4. `packages/shared`
5. `packages/api-client`

## 当前前端状态

`apps/admin` 第1批已落地，但仍是 **Admin Skeleton**：

- 只有冻结路由的页面骨架
- 没有真实鉴权
- 没有真实 Admin API
- 没有新增 registry 项
- 没有新增 shared contract

## 后端线程下一步建议

### 1. 不要直接给前端口头字段

任何新增或修改以下内容，都必须先登记，再生成：

- Admin API path
- request field
- response field
- 风控案件字段
- 提现审核字段
- 审计字段
- 商品/订单/队列后台详情字段

### 2. 优先补齐最小 Admin OpenAPI 只读链路

建议先做只读，不做写操作：

- 商品列表 / 详情
- 订单列表 / 详情
- 队列列表 / 详情
- 时隙列表 / 详情
- 活动列表 / 详情
- 任务列表 / 详情
- 邀请关系列表 / 详情
- 钱包总览
- 提现列表
- 风险案件列表 / 详情
- 审计日志列表

### 3. 真实动作接口先延后

以下动作在没有 registry 登记前不要让前端接：

- 后台减量
- 售后与退款录入
- 冻结 / 解冻 / 移出队列
- 时隙重试 / 重放
- 活动上下线
- 任务上下线
- 提现审核 / 驳回
- 风险人工决策
- 角色权限修改

### 4. 生成方式要求

- `packages/api-client` 只能由 OpenAPI 生成
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 不要让前端直接依赖 `services/api` 内部类型
```

## `docs/handoffs/backend-next-steps-from-frontend-batch5.md`

```
# Backend Next Steps from Frontend Batch 5

## 前端本轮已完成

- 清理了 `packages/api-client` 中的手写 path 占位
- 清理了 mobile 里的未登记 env var
- 清理了前端页面 / 文档里的猜测型 API path 描述
- 新增 pre-OpenAPI 边界校验脚本

## 你接下来需要做的事

1. 对新增冻结项先更新 registry
2. 按模块导出 OpenAPI
3. 生成 `packages/api-client`
4. 以模块分批给前端接线：
   - auth
   - products
   - orders / payment
   - queue / queue guard
   - wallet / withdrawals
   - tasks
   - invites
   - rules content
   - admin read-only domains

## 你当前不要做的事

- 不要跳过 registry 直接给前端口头字段
- 不要把 DTO 类型塞进 `packages/shared`
- 不要让前端手抄接口
```

## `docs/handoffs/backend-next-steps-from-frontend-batch6.md`

```
# Backend Next Steps from Frontend Batch 6

## 前端本轮已完成

- 新增 route registry 校验脚本
- 新增 frontend import boundary 校验脚本
- 强化了 public env registry 校验
- 新增前端路由审计与 guardrail 说明文档

## 你接下来需要做的事

1. 继续保持 registry-first
2. 对真正需要开放给前端的 API path / field，先登记再导出 OpenAPI
3. 优先给出最小可消费的只读 OpenAPI：
   - runtime config
   - products
   - campaigns
   - tasks
   - invites
   - wallet summary
   - withdrawals list
   - admin read-only dashboards
4. 生成 `packages/api-client`
5. 通知前端切第 7 批真实 SDK 接线

## 你当前不要做的事

- 不要把 DTO / Swagger 类型直接丢给前端
- 不要口头补字段让前端手抄
- 不要跳过 registry 直接新增冻结项
```

## `docs/handoffs/backend-next-steps-from-mobile-batch2.md`

```
# QueueFree 第 2 批：给后端线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 当前前端状态

前端第 2 批已经完成 `apps/mobile` 路由骨架。

当前手机端：

- 只依赖 `packages/shared`
- 继续使用本地 mock / placeholder 数据
- 已经移除手写猜测型 API path 说明
- 等待后端按 registry-first 顺序补齐 OpenAPI

## 后端线程下一步正确顺序

1. 若触碰冻结项，先更新 `docs/registry/registry-baseline-v1.2.md`
2. 再导出 OpenAPI
3. 再生成 `packages/api-client`
4. 前端再逐模块替换本地 mock

## 后端优先建议的模块域

建议按下面顺序推进，不要求你在本文件里口头发明字段：

1. auth / session
2. product catalog
3. orders / payment intents
4. queue entries / queue guard / boost
5. wallet / withdrawal accounts / withdrawals
6. tasks
7. invites
8. profile / addresses / devices
9. rules content / notifications
10. account deletion

## 对后端线程的硬约束提醒

- 不要跳过 registry 直接新增 path / field / state
- 不要在没有 OpenAPI 的情况下让前端手写 contract
- 不要把 NestJS DTO / Swagger class 放进 `packages/shared`
- 前端只会消费 `packages/shared` 和生成后的 `packages/api-client`

## 当前前端最需要你输出什么

1. registry 更新（如果你新增冻结项）
2. OpenAPI 文件
3. 生成好的 `packages/api-client`
4. runtime config 的真实下发链路
5. 按模块分批可读可接的最小 SDK
```

## `docs/handoffs/backend-next-steps-from-web-batch3.md`

```
# 给后端线程：第 3 批 Web 官网完成后的衔接说明（Batch 5 清理后版本）

## 1. 本轮没有新增冻结项

这一批只落地了 `apps/web` 页面骨架。

没有新增：

- enum
- state
- API path
- request field
- response field
- table field
- event
- worker
- queue
- cron
- env var
- domain
- route

因此这轮 **不要求你修改 registry**。

## 2. 这批 Web 目前不消费猜测型 API

现在的官网与合规页：

- 直接消费 `packages/shared` 的硬规则常量
- 对可运营阈值只展示 fallback 示例
- 不依赖 `packages/api-client`

## 3. 你下一步需要准备什么

请你后续在后端线程补齐：

- public rules content 模块
- public compliance content 模块（如果你希望后续由后台管理）

注意：

- 如果你新增 path / field / state，先登记 registry，再生成 OpenAPI，再生成 `packages/api-client`
- Web 公开路径已经锁定，不要改 URL
- `/contact` 继续保持公开合规页面，不要改回 `/support`

## 4. 对 Web 来说你最重要的保证

- 规则内容未来即使切成动态数据，也必须保持现有公开 URL 不变
- 前端不会提前口头接字段，只会等待 registry + OpenAPI
```

## `docs/handoffs/server-next-steps-from-admin-batch4.md`

```
# Server Next Steps from Admin Batch 4

规则源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `docs/registry/registry-baseline-v1.2.md`

## 当前前端状态

`apps/admin` 第1批已经落地本地可运行骨架。

本轮没有新增：

- 域名
- 子域名
- 环境变量
- 路由

## 服务器线程下一步建议

### 1. 保持现有域名基线不变

只使用已登记域名：

- local: `http://localhost:3001`
- dev: `https://dev-admin.queuefree.com`
- staging: `https://stg-admin.queuefree.com`
- prod: `https://admin.queuefree.com`

### 2. 保持现有 admin 环境变量不变

只使用已登记的 admin 环境变量：

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ADMIN_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`

### 3. 优先做的部署准备

- Admin 单独站点部署位
- dev / staging / prod 分环境
- Sentry 前端接线预留
- CI 跑 `pnpm --filter @queuefree/admin build`
- 与 Web / API 分离部署

### 4. 当前不要擅自追加

- 不要新增 Admin secret 命名
- 不要私自更改 admin 子域名
- 不要把 `/contact`、Web 公共页搬到 Admin
- 不要新增 admin 路由重写
```

## `docs/handoffs/server-next-steps-from-frontend-batch5.md`

```
# Server Next Steps from Frontend Batch 5

## 前端本轮已完成

- Mobile 公开 env 已清理回 registry baseline
- Web / Admin 公开路由继续保持不变
- `packages/api-client` 回到 pre-OpenAPI placeholder

## 你接下来需要做的事

1. 保持当前域名矩阵不变
2. 保持当前 env 分组不变
3. 补齐 EAS / Vercel / Render / Cloudflare 的部署与发布文档
4. 准备前端需要的最终 `.env.example` 与环境矩阵说明

## 你当前不要做的事

- 不要新增未登记公开 env
- 不要更改 Web `/contact`
- 不要更改 Admin / Web / API 已登记域名基线
```

## `docs/handoffs/server-next-steps-from-frontend-batch6.md`

```
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
```

## `docs/handoffs/server-next-steps-from-mobile-batch2.md`

```
# QueueFree 第 2 批：给服务器线程的衔接说明（Batch 5 清理后版本）

唯一规则源：`queuefree_prd_v1_2`

## 前端第 2 批已经固定的东西

已经固定且不要再改：

- Monorepo：`apps/` + `packages/`
- Mobile：Expo + React Native + expo-router
- Web / Admin：Next.js
- `packages/shared` 已存在
- `packages/api-client` 当前回到 pre-OpenAPI placeholder
- Mobile 路由已经按 PRD 固定

## 服务器线程下一步优先做什么

### 1）环境变量分组继续按 registry 走

至少分：

- `mobile`
- `web`
- `admin`
- `api`
- `worker`
- `shared`

### 2）Mobile 公开环境变量只使用已登记项

#### mobile
- `EXPO_PUBLIC_APP_ENV`
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_WEB_BASE_URL`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`

#### api / worker
- 数据库连接
- Redis 连接
- JWT secret
- 支付 provider secret
- 短信 provider secret
- Sentry DSN
- 对象存储配置

### 3）保持移动端访问入口不变

移动端后续主要连：

- 已登记的 API 域名矩阵
- 已登记的 Web 域名矩阵

不要改 public Web 固定路径：

- `/privacy`
- `/terms`
- `/rules`
- `/delete-account`
- `/contact`

### 4）把 Expo EAS 与 API 部署流程文档化

至少覆盖：

- local
- dev
- staging
- production

并明确：

- 谁负责 EAS build
- 谁负责 EAS submit
- 谁负责 Render API / Worker 部署
- 谁负责 Vercel Web / Admin 部署

## 服务器线程禁止事项

- 不要把 Web `/contact` 改回 `/support`
- 不要私自新增 mobile 公开环境变量
- 不要让 mobile 直接依赖 secret
- 不要让前端把业务阈值写进 `.env`

## 前端等你输出什么

1. 环境变量清单（按应用拆）
2. dev / staging / prod 域名表
3. Expo EAS 基本流程
4. API / Worker 部署矩阵
5. Sentry / PostHog 接入位说明
6. mobile 本地 `.env.example` 最终版
```

## `docs/handoffs/server-next-steps-from-web-batch3.md`

```
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
```

## `docs/handoffs/三个对话框怎么继续发.md`

```
# 你接下来怎么给三个对话框发消息（Batch 5 后版本，可直接复制）

## 发给前端对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、已有 packages/shared、已有 packages/api-client。保持 registry-first，不发明新的共享契约；在 backend 还没更新 registry + OpenAPI 前，只允许继续做前端内部骨架、loading/error/empty、mock 占位、以及接线准备工作。
```

## 发给后端对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、docs/handoffs/backend-next-steps-from-mobile-batch2.md、docs/handoffs/backend-next-steps-from-web-batch3.md、docs/handoffs/backend-next-steps-from-admin-batch4.md。当前前端已清理掉手写猜测型 API path，请严格按 registry-first 顺序：先登记，再 OpenAPI，再生成 packages/api-client。
```

## 发给服务器对话框

```text
继续按 queuefree_prd_v1_2 作为唯一规则源工作，并继承 docs/contracts/queuefree-collaboration-contract-v1.2.md、docs/registry/registry-baseline-v1.2.md、docs/handoffs/server-next-steps-from-mobile-batch2.md、docs/handoffs/server-next-steps-from-web-batch3.md、docs/handoffs/server-next-steps-from-admin-batch4.md。当前前端已对齐 registry-first，请只使用已登记的环境变量、域名和公开路径继续推进部署与 EAS 流程。
```
```

## `docs/handoffs/第3批-发给后端和服务器的话术.md`

```
把下面这段话发给另外两个对话框：

```text
从现在开始继续统一按 PRD v1.2 + 协作契约 + 注册表基线执行。
第 3 批前端已落地 apps/web 官网与公开合规页骨架，但本轮没有新增冻结项，没有新增 enum / state / API path / request field / response field / table field / event / worker / queue / cron / env var / domain / route。
请继续保持：
1) 任何冻结项修改先更新 docs/registry/registry-baseline-v1.2.md
2) 每轮输出显式包含 Assumptions / Shared Contract Changes / Risks / Blockers / Files Changed
3) Web 公共路径继续固定为 /contact，不要改回 /support
```
```

## `docs/handoffs/第4批-发给后端和服务器的话术.md`

```
从现在开始，QueueFree 三线程继续按以下优先级执行：

1. queuefree_prd_v1_2
2. docs/contracts/queuefree-collaboration-contract-v1.2.md
3. docs/registry/registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

本轮前端已落地 apps/admin 第1批骨架，但没有新增任何 registry 项，也没有新增共享 contract。

请以后端 / 服务器线程继续遵守：
- 任何新增或修改 enum / state / API path / request field / response field / table field / event / worker / queue / cron / env var / domain / route，必须先登记，再生成代码。
- packages/api-client 只能由 OpenAPI 生成。
- 前端当前只接受已登记路径下的最小 Admin OpenAPI 接线，不接受口头字段。
```

## `docs/handoffs/第5批-发给后端和服务器的话术.md`

```
当前前端已完成第5批 registry-first 清理，请后端与服务器线程统一继承：

1. queuefree_prd_v1_2
2. docs/contracts/queuefree-collaboration-contract-v1.2.md
3. docs/registry/registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

注意：
- 前端已删除手写猜测型 API path 占位
- mobile 已移除未登记 env var
- 从现在开始，必须严格执行：先登记，再 OpenAPI，再生成 packages/api-client，再让前端接真实数据
```

## `docs/handoffs/第6批-发给后端和服务器的话术.md`

```
从现在开始，前端线程已进入 batch 6：前端质量门禁与 registry 对齐阶段。

本轮没有新增任何共享契约，也没有新增任何冻结项。

请后端 / 服务器线程同步遵守：
- 继续以 queuefree_prd_v1_2 -> packages/shared -> packages/api-client -> docs/registry/registry-baseline-v1.2.md 为真相源优先级。
- 任何新增或修改 enum / state / API path / request field / response field / table field / event / worker / queue / cron / env var / domain / route，必须先登记，再生成代码。
- 前端当前已经新增本地 guardrail：会拦截未登记 route、未登记 public env、手写猜测型 path、以及前端越界引入 Nest/Prisma。

后端下一步优先事项：
- 先补 registry
- 再导出最小只读 OpenAPI
- 再生成 packages/api-client
- 前端随后做第 7 批真实 SDK 接线
```

## `docs/registry/registry-baseline-v1.2.md`

```
# QueueFree Registry Baseline v1.2

状态：Locked  
来源：`queuefree_prd_v1_2` + `packages/shared`

本文件用于登记“所有线程都必须共用”的注册表基线。

---

## 1. Enum Registry

### UserQueueGuardStatus

- `VALID`
- `EXPIRED_GRACE`

### OrderStatus

- `CREATED`
- `WAIT_PAY`
- `PAID`
- `FULFILLING`
- `SHIPPED`
- `DELIVERED`
- `COMPLETED`
- `CANCELED`
- `AFTERSALE_OPEN`
- `PARTIAL_REFUNDED`
- `FULL_REFUNDED`

### QueueEntryStatus

- `PENDING_RISK`
- `ACTIVE`
- `FROZEN`
- `SUSPENDED_REVIEW`
- `REMOVED`
- `WON_PENDING_RELEASE`
- `CASHBACK_RELEASED`
- `CLAWBACK_DONE`

### WithdrawalStatus

- `APPLIED`
- `RISK_REVIEW`
- `PROCESSING`
- `SUCCESS`
- `REJECTED`
- `FAILED`
- `REVERSED`

### InviteRelationStatus

- `BOUND`
- `PENDING_EFFECTIVE`
- `EFFECTIVE`
- `INVALID`

### AccountDeleteStatus

- `NOT_REQUESTED`
- `DELETE_REQUESTED`
- `PENDING_SETTLEMENT`
- `READY_TO_ANONYMIZE`
- `ANONYMIZED`
- `CANCELED_BY_USER`

### SettlementSlotStatus

- `SCHEDULED`
- `RUNNING`
- `SUCCEEDED`
- `FAILED`
- `REPLAYED`

### AdminRole

- `SUPER_ADMIN`
- `OPS_ADMIN`
- `CS_ADMIN`
- `FINANCE_ADMIN`
- `RISK_ADMIN`

### WalletActivationMethod

- `INVITE`
- `TASK`
- `ADMIN_OVERRIDE`

---

## 2. State Machine Registry

### UserQueueGuard

- `VALID -> EXPIRED_GRACE`：保活到期
- `EXPIRED_GRACE -> VALID`：签到 / 道具 / 活动恢复
- `EXPIRED_GRACE -> 队列订单批量移出`：超过宽限期

### QueueEntry

- `PENDING_RISK -> ACTIVE`
- `ACTIVE -> FROZEN`
- `FROZEN -> ACTIVE`
- `ACTIVE -> SUSPENDED_REVIEW`
- `FROZEN -> REMOVED`
- `ACTIVE -> REMOVED`
- `ACTIVE -> WON_PENDING_RELEASE`
- `WON_PENDING_RELEASE -> CASHBACK_RELEASED`
- `CASHBACK_RELEASED -> CLAWBACK_DONE`

### Withdrawal

- `APPLIED -> RISK_REVIEW`
- `RISK_REVIEW -> PROCESSING`
- `RISK_REVIEW -> REJECTED`
- `PROCESSING -> SUCCESS`
- `PROCESSING -> FAILED`
- `SUCCESS -> REVERSED`

### AccountDelete

- `NOT_REQUESTED -> DELETE_REQUESTED`
- `DELETE_REQUESTED -> PENDING_SETTLEMENT`
- `PENDING_SETTLEMENT -> READY_TO_ANONYMIZE`
- `READY_TO_ANONYMIZE -> ANONYMIZED`
- `DELETE_REQUESTED -> CANCELED_BY_USER`

---

## 3. API Contract Registry

### API Prefix

- C 端：`/v1`
- Admin：`/v1/admin`

### 必须幂等的 C 端动作

- `POST /v1/orders`
- `POST /v1/orders/:orderId/payment-intents`
- `POST /v1/queue-guard/check-in`
- `POST /v1/queue-entries/:queueEntryId/boost`
- `POST /v1/tasks/:taskId/claim`
- `POST /v1/withdrawals`
- `POST /v1/me/delete-account-requests`

### 必须幂等的服务端回调 / Worker 动作

- 支付回调
- 时隙结算
- 钱包释放
- 钱包扣回
- 提现回调

---

## 4. Event Registry

- `queue.entry.created`
- `queue.entry.frozen`
- `queue.entry.restored`
- `queue.entry.removed`
- `queue.entry.boosted`
- `settlement.slot.settled`
- `wallet.pending.created`
- `wallet.cashback.released`
- `wallet.clawback.created`
- `withdrawal.applied`
- `withdrawal.approved`
- `withdrawal.rejected`
- `risk.case.created`
- `account.delete.requested`

---

## 5. Worker Registry

- `create-queue-entry-after-payment`
- `restore-frozen-entries-after-checkin`
- `freeze-expired-entries`
- `remove-expired-frozen-entries`
- `run-slot-settlement`
- `release-cashback-after-observation`
- `clawback-after-refund`
- `check-invite-cooling-off`
- `payout-after-withdrawal-approval`
- `score-risk-case`

---

## 6. Queue / Cron Registry

### Queue Names

- `payments-events`
- `queue-guard`
- `settlement-slots`
- `wallet-events`
- `invites`
- `withdrawals`
- `risk-cases`

### Cron Names

- `queue-guard-freeze-scan`
- `queue-guard-remove-scan`
- `settlement-slot-dispatch`
- `cashback-release-scan`
- `invite-effective-scan`

---

## 7. Domain / Route Registry

### Public Domains

#### local

- Web: `http://localhost:3000`
- Admin: `http://localhost:3001`
- API: `http://localhost:4000`
- Assets: `http://localhost:9000`

#### dev

- Web: `https://dev.queuefree.com`
- Admin: `https://dev-admin.queuefree.com`
- API: `https://dev-api.queuefree.com`
- Assets: `https://dev-assets.queuefree.com`

#### staging

- Web: `https://stg.queuefree.com`
- Admin: `https://stg-admin.queuefree.com`
- API: `https://stg-api.queuefree.com`
- Assets: `https://stg-assets.queuefree.com`

#### prod

- Web: `https://queuefree.com`
- Admin: `https://admin.queuefree.com`
- API: `https://api.queuefree.com`
- Assets: `https://assets.queuefree.com`

### Web Public Routes

- `/`
- `/privacy`
- `/terms`
- `/rules`
- `/rules/queue`
- `/rules/wallet`
- `/rules/activity/[slug]`
- `/delete-account`
- `/contact`

### Mobile Routes

- `/(public)/welcome`
- `/(public)/auth/phone`
- `/(public)/auth/otp`
- `/(app)/(tabs)/home`
- `/(app)/(tabs)/queue`
- `/(app)/(tabs)/tasks`
- `/(app)/(tabs)/invites`
- `/(app)/(tabs)/wallet`
- `/(app)/(tabs)/me`
- `/(app)/product/[productId]`
- `/(app)/checkout/[productId]`
- `/(app)/orders/success/[orderId]`
- `/(app)/queue/[entryId]`
- `/(app)/wallet/withdraw`
- `/(app)/me/addresses`
- `/(app)/me/security`
- `/(app)/rules`
- `/(app)/rules/queue`
- `/(app)/rules/wallet`
- `/(app)/rules/activity/[campaignId]`
- `/(app)/privacy`
- `/(app)/terms`
- `/(app)/support`
- `/(app)/delete-account`

### Admin Routes

- `/login`
- `/`
- `/products`
- `/products/[productId]`
- `/orders`
- `/orders/[orderId]`
- `/queues`
- `/queues/[entryId]`
- `/slots`
- `/slots/[slotId]`
- `/campaigns`
- `/campaigns/[campaignId]`
- `/tasks`
- `/tasks/[taskId]`
- `/invites`
- `/invites/[relationId]`
- `/wallet`
- `/withdrawals`
- `/risk`
- `/risk/[caseId]`
- `/governance`
- `/audit`

---

## 8. Environment Variable Registry（分组基线）

### mobile

- `EXPO_PUBLIC_APP_ENV`
- `EXPO_PUBLIC_API_BASE_URL`
- `EXPO_PUBLIC_WEB_BASE_URL`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_POSTHOG_KEY`
- `EXPO_PUBLIC_POSTHOG_HOST`

### web

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_WEB_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

### admin

- `NEXT_PUBLIC_APP_ENV`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_ADMIN_BASE_URL`
- `NEXT_PUBLIC_SENTRY_DSN`

### api

- `NODE_ENV`
- `APP_ENV`
- `PORT`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `SENTRY_DSN`
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_BASE_URL`
- `RESEND_API_KEY`
- `SMS_PROVIDER_NAME`
- `SMS_PROVIDER_BASE_URL`
- `SMS_PROVIDER_API_KEY`

### worker

- `NODE_ENV`
- `APP_ENV`
- `DATABASE_URL`
- `REDIS_URL`
- `SENTRY_DSN`
- `API_INTERNAL_BASE_URL`

### shared

shared 不直接读取 secret。

shared 只定义：

- 环境名枚举
- 域名与公开路径常量
- runtime config schema
- 默认 fallback 值

---

## 9. Launch Baseline Registry

- Market: `PH`
- Currency: `PHP`
- Timezone: `Asia/Manila`
- Locale: `en-PH`
- Language: `English`
- Rule Version: `v1.2`
- Rewarded Ads Default: `false`
```

## `package.json`

```
{
  "name": "queuefree",
  "private": true,
  "version": "0.1.0",
  "packageManager": "pnpm@10.32.0",
  "engines": {
    "node": ">=22.22.0 <23"
  },
  "scripts": {
    "dev:mobile": "pnpm --filter @queuefree/mobile dev",
    "android": "pnpm --filter @queuefree/mobile android",
    "ios": "pnpm --filter @queuefree/mobile ios",
    "web:mobile": "pnpm --filter @queuefree/mobile web",
    "typecheck": "pnpm verify:frontend-guardrails && turbo run typecheck",
    "dev:web": "pnpm --filter @queuefree/web dev",
    "build:web": "pnpm --filter @queuefree/web build",
    "dev:admin": "pnpm --filter @queuefree/admin dev",
    "build:admin": "pnpm --filter @queuefree/admin build",
    "verify:registry-first-frontend": "node ./scripts/verify-registry-first-frontend.mjs",
    "typecheck:frontends": "pnpm verify:frontend-guardrails && turbo run typecheck --filter=@queuefree/shared --filter=@queuefree/ui-tokens --filter=@queuefree/api-client --filter=@queuefree/mobile --filter=@queuefree/web --filter=@queuefree/admin",
    "verify:route-registry": "node ./scripts/verify-route-registry.mjs",
    "verify:frontend-import-boundaries": "node ./scripts/verify-frontend-import-boundaries.mjs",
    "verify:frontend-guardrails": "pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "typescript": "^5.8.3"
  }
}
```

## `packages/api-client/README.md`

```
# @queuefree/api-client

状态：Pre-OpenAPI Placeholder

这个包当前**不包含任何手写业务 API contract**。

根据 `queuefree_prd_v1_2`、协作契约、registry baseline：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 前端在没有 OpenAPI 的阶段，**不能**在这里手写 path / request / response / DTO / schema
- 前端当前只能继续使用：
  - `packages/shared`
  - 各 app 内部的本地 mock / placeholder 数据

## 正确顺序

1. 后端先更新 registry（如果触碰冻结项）
2. 后端导出 OpenAPI
3. 用生成器生成 `packages/api-client`
4. 前端再从本地 mock 切换到 generated SDK

## 当前允许保留的内容

- 这个包的位置
- `src/index.ts` 的空占位入口
- `openapi/` 目录占位
- `src/generated/` 目录占位

## 当前明确不允许

- 手写 REST path 常量
- 手写请求 / 响应字段
- 手写业务 DTO
- 把 NestJS DTO / Swagger 类型复制到这里
```

## `packages/api-client/openapi/.gitkeep`

```

```

## `packages/api-client/package.json`

```
{
  "name": "@queuefree/api-client",
  "private": true,
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

## `packages/api-client/src/generated/.gitkeep`

```

```

## `packages/api-client/src/index.ts`

```
/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export {};
```

## `packages/api-client/tsconfig.json`

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

## `packages/shared/package.json`

```
{
  "name": "@queuefree/shared",
  "private": true,
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "zod": "^3.25.0"
  }
}
```

## `packages/shared/src/constants/business-rules.ts`

```
export const ORDER_QUEUE_SEAT_COUNT = 1 as const;
export const QUEUE_TOP_PROTECTED_COUNT = 30 as const;
export const QUEUE_BOOST_MAX_PER_ENTRY = 2 as const;
export const INVITE_MAX_DEPTH = 1 as const;
export const WALLET_SUPPORTS_TOP_UP = false as const;
export const WALLET_SUPPORTS_PEER_TRANSFER = false as const;
```

## `packages/shared/src/constants/launch.ts`

```
export const LAUNCH_MARKET = "PH" as const;
export const LAUNCH_CURRENCY = "PHP" as const;
export const LAUNCH_TIMEZONE = "Asia/Manila" as const;
export const LAUNCH_LANGUAGE = "English" as const;
export const LAUNCH_LOCALE = "en-PH" as const;
export const LAUNCH_WEBSITE = "queuefree.com" as const;
export const LAUNCH_RULE_VERSION = "v1.2" as const;
```

## `packages/shared/src/constants/routes.ts`

```
export const WEB_PUBLIC_ROUTES = [
  "/",
  "/privacy",
  "/terms",
  "/rules",
  "/rules/queue",
  "/rules/wallet",
  "/rules/activity/[slug]",
  "/delete-account",
  "/contact"
] as const;

export const MOBILE_INTERNAL_ROUTES = [
  "/(public)/welcome",
  "/(public)/auth/phone",
  "/(public)/auth/otp",
  "/(app)/(tabs)/home",
  "/(app)/(tabs)/queue",
  "/(app)/(tabs)/tasks",
  "/(app)/(tabs)/invites",
  "/(app)/(tabs)/wallet",
  "/(app)/(tabs)/me",
  "/(app)/product/[productId]",
  "/(app)/checkout/[productId]",
  "/(app)/orders/success/[orderId]",
  "/(app)/queue/[entryId]",
  "/(app)/wallet/withdraw",
  "/(app)/me/addresses",
  "/(app)/me/security",
  "/(app)/rules",
  "/(app)/rules/queue",
  "/(app)/rules/wallet",
  "/(app)/rules/activity/[campaignId]",
  "/(app)/privacy",
  "/(app)/terms",
  "/(app)/support",
  "/(app)/delete-account"
] as const;

export const ADMIN_ROUTES = [
  "/login",
  "/",
  "/products",
  "/products/[productId]",
  "/orders",
  "/orders/[orderId]",
  "/queues",
  "/queues/[entryId]",
  "/slots",
  "/slots/[slotId]",
  "/campaigns",
  "/campaigns/[campaignId]",
  "/tasks",
  "/tasks/[taskId]",
  "/invites",
  "/invites/[relationId]",
  "/wallet",
  "/withdrawals",
  "/risk",
  "/risk/[caseId]",
  "/governance",
  "/audit"
] as const;
```

## `packages/shared/src/constants/runtime-config-defaults.ts`

```
import {
  LAUNCH_CURRENCY,
  LAUNCH_LOCALE,
  LAUNCH_MARKET,
  LAUNCH_RULE_VERSION,
  LAUNCH_TIMEZONE,
  LAUNCH_WEBSITE
} from "./launch";
import type { RuntimeConfig } from "../types/runtime-config";
import { runtimeConfigSchema } from "../schemas/runtime-config.schema";

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = runtimeConfigSchema.parse({
  ruleVersion: LAUNCH_RULE_VERSION,
  marketCode: LAUNCH_MARKET,
  currencyCode: LAUNCH_CURRENCY,
  timezone: LAUNCH_TIMEZONE,
  locale: LAUNCH_LOCALE,
  unpaidOrderExpireMinutes: 15,
  stockSoftReserveMinutes: 15,
  baseGuardHours: 36,
  freezeGraceHours: 72,
  adGuardBonusHours: 12,
  protectZoneSize: 30,
  boostLimitPerEntry: 2,
  boostFragmentPerToken: 3,
  observationHoursAfterDelivery: 48,
  inviteBindWindowHours: 72,
  defaultCashbackCapMinor: 200000,
  withdrawMinAmountMinor: 30000,
  withdrawSingleMaxMinor: 500000,
  withdrawDailyMaxMinor: 1000000,
  defaultOrderMaxQty: 5,
  defaultDailySlotCount: 3,
  rewardedAdsEnabled: false,
  publicWebBaseUrl: `https://${LAUNCH_WEBSITE}`,
  publicRoutes: {
    privacy: `https://${LAUNCH_WEBSITE}/privacy`,
    terms: `https://${LAUNCH_WEBSITE}/terms`,
    rules: `https://${LAUNCH_WEBSITE}/rules`,
    deleteAccount: `https://${LAUNCH_WEBSITE}/delete-account`,
    contact: `https://${LAUNCH_WEBSITE}/contact`
  }
});
```

## `packages/shared/src/enums/account-delete-status.ts`

```
  export const ACCOUNT_DELETE_STATUSES = [
    "NOT_REQUESTED",
"DELETE_REQUESTED",
"PENDING_SETTLEMENT",
"READY_TO_ANONYMIZE",
"ANONYMIZED",
"CANCELED_BY_USER"
  ] as const;

  export type AccountDeleteStatus = (typeof ACCOUNT_DELETE_STATUSES)[number];
```

## `packages/shared/src/enums/admin-role.ts`

```
  export const ADMIN_ROLES = [
    "SUPER_ADMIN",
"OPS_ADMIN",
"CS_ADMIN",
"FINANCE_ADMIN",
"RISK_ADMIN"
  ] as const;

  export type AdminRole = (typeof ADMIN_ROLES)[number];
```

## `packages/shared/src/enums/cron-name.ts`

```
  export const CRON_NAMES = [
    "queue-guard-freeze-scan",
"queue-guard-remove-scan",
"settlement-slot-dispatch",
"cashback-release-scan",
"invite-effective-scan"
  ] as const;

  export type CronName = (typeof CRON_NAMES)[number];
```

## `packages/shared/src/enums/event-name.ts`

```
  export const EVENT_NAMES = [
    "queue.entry.created",
"queue.entry.frozen",
"queue.entry.restored",
"queue.entry.removed",
"queue.entry.boosted",
"settlement.slot.settled",
"wallet.pending.created",
"wallet.cashback.released",
"wallet.clawback.created",
"withdrawal.applied",
"withdrawal.approved",
"withdrawal.rejected",
"risk.case.created",
"account.delete.requested"
  ] as const;

  export type EventName = (typeof EVENT_NAMES)[number];
```

## `packages/shared/src/enums/invite-relation-status.ts`

```
  export const INVITE_RELATION_STATUSES = [
    "BOUND",
"PENDING_EFFECTIVE",
"EFFECTIVE",
"INVALID"
  ] as const;

  export type InviteRelationStatus = (typeof INVITE_RELATION_STATUSES)[number];
```

## `packages/shared/src/enums/order-status.ts`

```
  export const ORDER_STATUSES = [
    "CREATED",
"WAIT_PAY",
"PAID",
"FULFILLING",
"SHIPPED",
"DELIVERED",
"COMPLETED",
"CANCELED",
"AFTERSALE_OPEN",
"PARTIAL_REFUNDED",
"FULL_REFUNDED"
  ] as const;

  export type OrderStatus = (typeof ORDER_STATUSES)[number];
```

## `packages/shared/src/enums/queue-entry-status.ts`

```
  export const QUEUE_ENTRY_STATUSES = [
    "PENDING_RISK",
"ACTIVE",
"FROZEN",
"SUSPENDED_REVIEW",
"REMOVED",
"WON_PENDING_RELEASE",
"CASHBACK_RELEASED",
"CLAWBACK_DONE"
  ] as const;

  export type QueueEntryStatus = (typeof QUEUE_ENTRY_STATUSES)[number];
```

## `packages/shared/src/enums/queue-name.ts`

```
  export const QUEUE_NAMES = [
    "payments-events",
"queue-guard",
"settlement-slots",
"wallet-events",
"invites",
"withdrawals",
"risk-cases"
  ] as const;

  export type QueueName = (typeof QUEUE_NAMES)[number];
```

## `packages/shared/src/enums/settlement-slot-status.ts`

```
  export const SETTLEMENT_SLOT_STATUSES = [
    "SCHEDULED",
"RUNNING",
"SUCCEEDED",
"FAILED",
"REPLAYED"
  ] as const;

  export type SettlementSlotStatus = (typeof SETTLEMENT_SLOT_STATUSES)[number];
```

## `packages/shared/src/enums/user-queue-guard-status.ts`

```
  export const USER_QUEUE_GUARD_STATUSES = [
    "VALID",
"EXPIRED_GRACE"
  ] as const;

  export type UserQueueGuardStatus = (typeof USER_QUEUE_GUARD_STATUSES)[number];
```

## `packages/shared/src/enums/wallet-activation-method.ts`

```
  export const WALLET_ACTIVATION_METHODS = [
    "INVITE",
"TASK",
"ADMIN_OVERRIDE"
  ] as const;

  export type WalletActivationMethod = (typeof WALLET_ACTIVATION_METHODS)[number];
```

## `packages/shared/src/enums/withdrawal-status.ts`

```
  export const WITHDRAWAL_STATUSES = [
    "APPLIED",
"RISK_REVIEW",
"PROCESSING",
"SUCCESS",
"REJECTED",
"FAILED",
"REVERSED"
  ] as const;

  export type WithdrawalStatus = (typeof WITHDRAWAL_STATUSES)[number];
```

## `packages/shared/src/enums/worker-job-name.ts`

```
  export const WORKER_JOB_NAMES = [
    "create-queue-entry-after-payment",
"restore-frozen-entries-after-checkin",
"freeze-expired-entries",
"remove-expired-frozen-entries",
"run-slot-settlement",
"release-cashback-after-observation",
"clawback-after-refund",
"check-invite-cooling-off",
"payout-after-withdrawal-approval",
"score-risk-case"
  ] as const;

  export type WorkerJobName = (typeof WORKER_JOB_NAMES)[number];
```

## `packages/shared/src/formatters/datetime.ts`

```
import { LAUNCH_LOCALE, LAUNCH_TIMEZONE } from "../constants/launch";

export function formatDateTime(
  value: Date | string | number,
  timezone: string = LAUNCH_TIMEZONE,
  locale: string = LAUNCH_LOCALE,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(locale, {
    timeZone: timezone,
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    ...options
  }).format(date);
}

export function formatDateOnly(
  value: Date | string | number,
  timezone: string = LAUNCH_TIMEZONE,
  locale: string = LAUNCH_LOCALE
): string {
  return formatDateTime(value, timezone, locale, {
    year: "numeric",
    month: "short",
    day: "2-digit"
  });
}
```

## `packages/shared/src/formatters/money.ts`

```
import { LAUNCH_CURRENCY, LAUNCH_LOCALE } from "../constants/launch";

export function formatMinorMoney(
  minorValue: number,
  currency: string = LAUNCH_CURRENCY,
  locale: string = LAUNCH_LOCALE
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(minorValue / 100);
}
```

## `packages/shared/src/index.ts`

```
export * from "./constants/business-rules";
export * from "./constants/launch";
export * from "./constants/routes";
export * from "./constants/runtime-config-defaults";
export * from "./enums/account-delete-status";
export * from "./enums/admin-role";
export * from "./enums/cron-name";
export * from "./enums/event-name";
export * from "./enums/invite-relation-status";
export * from "./enums/order-status";
export * from "./enums/queue-entry-status";
export * from "./enums/queue-name";
export * from "./enums/settlement-slot-status";
export * from "./enums/user-queue-guard-status";
export * from "./enums/wallet-activation-method";
export * from "./enums/withdrawal-status";
export * from "./enums/worker-job-name";
export * from "./formatters/datetime";
export * from "./formatters/money";
export * from "./schemas/runtime-config.schema";
export * from "./types/runtime-config";
```

## `packages/shared/src/schemas/runtime-config.schema.ts`

```
import { z } from "zod";

export const publicRouteMapSchema = z.object({
  privacy: z.string().min(1),
  terms: z.string().min(1),
  rules: z.string().min(1),
  deleteAccount: z.string().min(1),
  contact: z.string().min(1)
});

export const runtimeConfigSchema = z.object({
  ruleVersion: z.string().min(1),
  marketCode: z.string().min(1),
  currencyCode: z.string().min(1),
  timezone: z.string().min(1),
  locale: z.string().min(1),
  unpaidOrderExpireMinutes: z.number().int().positive(),
  stockSoftReserveMinutes: z.number().int().positive(),
  baseGuardHours: z.number().int().positive(),
  freezeGraceHours: z.number().int().positive(),
  adGuardBonusHours: z.number().int().nonnegative(),
  protectZoneSize: z.number().int().positive(),
  boostLimitPerEntry: z.number().int().positive(),
  boostFragmentPerToken: z.number().int().positive(),
  observationHoursAfterDelivery: z.number().int().positive(),
  inviteBindWindowHours: z.number().int().positive(),
  defaultCashbackCapMinor: z.number().int().nonnegative(),
  withdrawMinAmountMinor: z.number().int().nonnegative(),
  withdrawSingleMaxMinor: z.number().int().nonnegative(),
  withdrawDailyMaxMinor: z.number().int().nonnegative(),
  defaultOrderMaxQty: z.number().int().positive(),
  defaultDailySlotCount: z.number().int().positive(),
  rewardedAdsEnabled: z.boolean(),
  publicWebBaseUrl: z.string().min(1),
  publicRoutes: publicRouteMapSchema
});

export type RuntimeConfigSchema = z.infer<typeof runtimeConfigSchema>;
```

## `packages/shared/src/types/runtime-config.ts`

```
export type PublicRouteMap = {
  privacy: string;
  terms: string;
  rules: string;
  deleteAccount: string;
  contact: string;
};

export type RuntimeConfig = {
  ruleVersion: string;
  marketCode: string;
  currencyCode: string;
  timezone: string;
  locale: string;
  unpaidOrderExpireMinutes: number;
  stockSoftReserveMinutes: number;
  baseGuardHours: number;
  freezeGraceHours: number;
  adGuardBonusHours: number;
  protectZoneSize: number;
  boostLimitPerEntry: number;
  boostFragmentPerToken: number;
  observationHoursAfterDelivery: number;
  inviteBindWindowHours: number;
  defaultCashbackCapMinor: number;
  withdrawMinAmountMinor: number;
  withdrawSingleMaxMinor: number;
  withdrawDailyMaxMinor: number;
  defaultOrderMaxQty: number;
  defaultDailySlotCount: number;
  rewardedAdsEnabled: boolean;
  publicWebBaseUrl: string;
  publicRoutes: PublicRouteMap;
};
```

## `packages/shared/tsconfig.json`

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

## `packages/ui-tokens/package.json`

```
{
  "name": "@queuefree/ui-tokens",
  "private": true,
  "version": "0.1.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

## `packages/ui-tokens/src/index.ts`

```
export * from './mobile-theme';
export * from './web-theme';
```

## `packages/ui-tokens/src/mobile-theme.ts`

```
export const mobileTheme = {
  colors: {
    background: "#F7F8FC",
    surface: "#FFFFFF",
    surfaceMuted: "#F1F4F9",
    textPrimary: "#111827",
    textSecondary: "#4B5563",
    textMuted: "#6B7280",
    border: "#E5E7EB",
    brand: "#2563EB",
    brandSoft: "#DBEAFE",
    success: "#0F766E",
    successSoft: "#CCFBF1",
    warning: "#B45309",
    warningSoft: "#FEF3C7",
    danger: "#B91C1C",
    dangerSoft: "#FEE2E2",
    info: "#1D4ED8",
    infoSoft: "#E0E7FF"
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 20,
    xl: 28
  },
  radius: {
    sm: 10,
    md: 14,
    lg: 20,
    pill: 999
  }
} as const;
```

## `packages/ui-tokens/src/web-theme.ts`

```
export const webTheme = {
  colors: {
    background: '#F8FAFC',
    surface: '#FFFFFF',
    surfaceMuted: '#EEF2FF',
    textPrimary: '#0F172A',
    textSecondary: '#334155',
    textMuted: '#64748B',
    border: '#E2E8F0',
    brand: '#2563EB',
    brandSoft: '#DBEAFE',
    accent: '#0F766E',
    accentSoft: '#CCFBF1',
    warning: '#B45309',
    warningSoft: '#FEF3C7',
    danger: '#B91C1C',
    dangerSoft: '#FEE2E2'
  },
  radius: {
    sm: '0.5rem',
    md: '0.875rem',
    lg: '1.25rem',
    xl: '1.75rem',
    pill: '9999px'
  },
  spacing: {
    xs: '0.375rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  maxWidth: {
    content: '72rem'
  }
} as const;
```

## `packages/ui-tokens/tsconfig.json`

```
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

## `pnpm-workspace.yaml`

```
packages:
  - apps/*
  - packages/*
```

## `scripts/verify-frontend-import-boundaries.mjs`

```
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const violations = [];

const fileExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json']);
const scanTargets = [
  path.join(repoRoot, 'apps', 'mobile'),
  path.join(repoRoot, 'apps', 'web'),
  path.join(repoRoot, 'apps', 'admin'),
  path.join(repoRoot, 'packages', 'shared')
];

const forbiddenByScope = [
  {
    scopeLabel: 'frontend-apps',
    rootDirs: [
      path.join(repoRoot, 'apps', 'mobile'),
      path.join(repoRoot, 'apps', 'web'),
      path.join(repoRoot, 'apps', 'admin')
    ],
    tokens: [
      '@nestjs/',
      '@nestjs/swagger',
      'class-validator',
      '@prisma/client',
      'services/api',
      'services/worker',
      'bullmq'
    ]
  },
  {
    scopeLabel: 'packages/shared',
    rootDirs: [path.join(repoRoot, 'packages', 'shared')],
    tokens: [
      '@nestjs/',
      '@nestjs/swagger',
      'class-validator',
      '@prisma/client',
      'PrismaClient',
      'services/api',
      'services/worker'
    ]
  }
];

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) return;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo' || entry.name === 'dist') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!fileExtensions.has(ext) && entry.name !== 'package.json') {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    for (const scope of forbiddenByScope) {
      if (!scope.rootDirs.some((rootDir) => fullPath.startsWith(rootDir))) {
        continue;
      }

      for (const token of scope.tokens) {
        if (text.includes(token)) {
          violations.push(`${relPath}: contains forbidden ${scope.scopeLabel} token ${token}`);
        }
      }
    }
  }
}

for (const target of scanTargets) {
  walk(target);
}

if (violations.length > 0) {
  console.error('Frontend import boundary verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Frontend import boundaries verified. No forbidden backend or Nest/Prisma imports were found.');
```

## `scripts/verify-registry-first-frontend.mjs`

```
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'docs', 'registry', 'registry-baseline-v1.2.md');
const registryText = fs.readFileSync(registryPath, 'utf8');

const generatedDir = path.join(repoRoot, 'packages', 'api-client', 'src', 'generated');
const hasGeneratedClient = fs.existsSync(generatedDir)
  && fs.readdirSync(generatedDir).some((name) => !name.startsWith('.'));

const forbiddenApiFragments = ['/v1/', '/v1/admin'];
const allowedFilesForApiFragments = new Set([
  path.normalize('docs/contracts/queuefree-collaboration-contract-v1.2.md'),
  path.normalize('docs/registry/registry-baseline-v1.2.md')
]);

const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json']);
const codeScanRoots = [
  'apps',
  path.join('packages', 'api-client'),
  path.join('docs', 'contracts'),
  path.join('docs', 'handoffs')
];
const appScanRoots = [
  path.join('apps', 'mobile'),
  path.join('apps', 'web'),
  path.join('apps', 'admin')
];
const violations = [];

function extractEnvSection(appName, nextHeading) {
  const startHeading = `### ${appName}`;
  const startIndex = registryText.indexOf(startHeading);
  const endIndex = registryText.indexOf(nextHeading, startIndex + startHeading.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Failed to parse environment registry for ${appName}`);
  }

  return registryText
    .slice(startIndex + startHeading.length, endIndex)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/`([^`]+)`/);
      return match ? match[1] : line.slice(2).trim();
    })
    .filter((token) => token.startsWith('EXPO_PUBLIC_') || token.startsWith('NEXT_PUBLIC_'));
}

const allowedEnvByApp = {
  mobile: new Set(extractEnvSection('mobile', '### web')),
  web: new Set(extractEnvSection('web', '### admin')),
  admin: new Set(extractEnvSection('admin', '### api'))
};

function walk(dirPath, onFile) {
  if (!fs.existsSync(dirPath)) return;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo' || entry.name === 'dist') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, onFile);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!textExtensions.has(ext) && entry.name !== '.env.example') {
      continue;
    }

    onFile(fullPath, entry.name);
  }
}

function detectAppType(relPath) {
  if (relPath.startsWith(path.normalize(path.join('apps', 'mobile')))) return 'mobile';
  if (relPath.startsWith(path.normalize(path.join('apps', 'web')))) return 'web';
  if (relPath.startsWith(path.normalize(path.join('apps', 'admin')))) return 'admin';
  return null;
}

function collectPublicEnvTokens(text) {
  return [...new Set(text.match(/\b(?:EXPO_PUBLIC|NEXT_PUBLIC)_[A-Z0-9_]+\b/g) ?? [])];
}

for (const root of codeScanRoots) {
  walk(path.join(repoRoot, root), (fullPath) => {
    const relPath = path.relative(repoRoot, fullPath);
    const normalizedRelPath = path.normalize(relPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    if (!hasGeneratedClient && !allowedFilesForApiFragments.has(normalizedRelPath)) {
      for (const fragment of forbiddenApiFragments) {
        if (text.includes(fragment)) {
          violations.push(`${relPath}: contains hard-coded API fragment ${fragment} before OpenAPI generation`);
        }
      }
    }
  });
}

for (const root of appScanRoots) {
  walk(path.join(repoRoot, root), (fullPath, fileName) => {
    const relPath = path.relative(repoRoot, fullPath);
    const appType = detectAppType(path.normalize(relPath));
    if (!appType) return;

    const text = fs.readFileSync(fullPath, 'utf8');
    const tokens = collectPublicEnvTokens(text);
    const allowed = allowedEnvByApp[appType];

    for (const token of tokens) {
      if (!allowed.has(token)) {
        violations.push(`${relPath}: references non-registered public env token ${token}`);
      }
    }

    if (fileName === '.env.example') {
      const declared = new Set(
        text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith('#') && line.includes('='))
          .map((line) => line.split('=')[0].trim())
      );

      for (const token of allowed) {
        if (!declared.has(token)) {
          violations.push(`${relPath}: missing registered public env token ${token}`);
        }
      }

      for (const token of declared) {
        if ((token.startsWith('EXPO_PUBLIC_') || token.startsWith('NEXT_PUBLIC_')) && !allowed.has(token)) {
          violations.push(`${relPath}: declares non-registered public env token ${token}`);
        }
      }
    }
  });
}

const illegalManualClientFile = path.join(repoRoot, 'packages', 'api-client', 'src', 'endpoints.ts');
if (!hasGeneratedClient && fs.existsSync(illegalManualClientFile)) {
  violations.push('packages/api-client/src/endpoints.ts should not exist before OpenAPI generation.');
}

if (violations.length > 0) {
  console.error('Registry-first frontend verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

if (hasGeneratedClient) {
  console.log('Generated api-client detected. Pre-OpenAPI API fragment checks were skipped. Env registry checks still passed.');
} else {
  console.log('Registry-first frontend verification passed. No forbidden pre-OpenAPI API path or non-registered public env token was found.');
}
```

## `scripts/verify-route-registry.mjs`

```
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'docs', 'registry', 'registry-baseline-v1.2.md');
const registryText = fs.readFileSync(registryPath, 'utf8');

function extractList(startHeading, endHeading) {
  const startIndex = registryText.indexOf(startHeading);
  const endIndex = registryText.indexOf(endHeading, startIndex + startHeading.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Failed to parse registry section: ${startHeading}`);
  }

  const block = registryText.slice(startIndex + startHeading.length, endIndex);
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/`([^`]+)`/);
      return match ? match[1] : line.slice(2).trim();
    });
}

const expectedWebRoutes = new Set(extractList('### Web Public Routes', '### Mobile Routes'));
const expectedMobileRoutes = new Set(extractList('### Mobile Routes', '### Admin Routes'));
const expectedAdminRoutes = new Set(extractList('### Admin Routes', '---'));

function walk(dirPath, predicate) {
  const collected = [];
  if (!fs.existsSync(dirPath)) return collected;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collected.push(...walk(fullPath, predicate));
      continue;
    }
    if (predicate(fullPath, entry.name)) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function stripRouteGroups(parts) {
  return parts.filter((part) => !(part.startsWith('(') && part.endsWith(')')));
}

function normalizeNextRoute(relativeFilePath) {
  const withoutPage = relativeFilePath === 'page.tsx'
    ? ''
    : relativeFilePath.replace(/[/\\]page\.tsx$/, '');
  const parts = stripRouteGroups(withoutPage.split(path.sep).filter(Boolean));
  if (parts.length === 0) {
    return '/';
  }
  return `/${parts.join('/')}`;
}

function normalizeMobileRoute(relativeFilePath) {
  const extless = relativeFilePath.replace(/\.tsx$/, '');
  if (extless === 'index') {
    return null;
  }
  const normalized = extless.endsWith(`${path.sep}index`)
    ? extless.slice(0, -`${path.sep}index`.length)
    : extless;
  return `/${normalized.split(path.sep).join('/')}`;
}

function collectWebRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'web', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name === 'page.tsx')
      .map((fullPath) => normalizeNextRoute(path.relative(appDir, fullPath)))
  );
}

function collectAdminRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'admin', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name === 'page.tsx')
      .map((fullPath) => normalizeNextRoute(path.relative(appDir, fullPath)))
  );
}

function collectMobileRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'mobile', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name.endsWith('.tsx') && name !== '_layout.tsx')
      .map((fullPath) => normalizeMobileRoute(path.relative(appDir, fullPath)))
      .filter(Boolean)
  );
}

function diffSets(expected, actual) {
  return {
    missing: [...expected].filter((item) => !actual.has(item)).sort(),
    extra: [...actual].filter((item) => !expected.has(item)).sort()
  };
}

const checks = [
  { name: 'web', expected: expectedWebRoutes, actual: collectWebRoutes() },
  { name: 'mobile', expected: expectedMobileRoutes, actual: collectMobileRoutes() },
  { name: 'admin', expected: expectedAdminRoutes, actual: collectAdminRoutes() }
];

const failures = [];

for (const check of checks) {
  const diff = diffSets(check.expected, check.actual);
  if (diff.missing.length > 0 || diff.extra.length > 0) {
    failures.push({ ...check, ...diff });
  }
}

if (failures.length > 0) {
  console.error('Route registry verification failed.');
  for (const failure of failures) {
    console.error(`\n[${failure.name}]`);
    if (failure.missing.length > 0) {
      console.error(`Missing routes: ${failure.missing.join(', ')}`);
    }
    if (failure.extra.length > 0) {
      console.error(`Extra routes: ${failure.extra.join(', ')}`);
    }
  }
  process.exit(1);
}

for (const check of checks) {
  console.log(`Route registry verified for ${check.name}: ${check.actual.size} routes aligned with registry.`);
}
```

## `tsconfig.base.json`

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": false,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "strict": true,
    "skipLibCheck": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "."
  }
}
```

## `turbo.json`

```
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "typecheck": {
      "outputs": []
    }
  }
}
```
