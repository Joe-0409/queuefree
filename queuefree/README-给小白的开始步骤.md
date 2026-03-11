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
