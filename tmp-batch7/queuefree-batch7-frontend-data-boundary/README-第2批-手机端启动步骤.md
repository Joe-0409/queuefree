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

