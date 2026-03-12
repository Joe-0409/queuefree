# QueueFree Automation Readiness Handoff

## 1. 文档目的

本文档用于记录“距离允许生成自动化文件还差什么”。它不是 registry，也不是部署说明，而是一个跨线程、跨平台的阻塞项总表。只有当本表所有阻塞项都完成并被明确批准后，服务器线程才可以进入自动化文件生成阶段。

## 2. 状态枚举

只使用三个状态：

* missing
* in_progress
* done

## 3. 记录字段

每条阻塞项记录以下字段：

* Area
* Platform
* Missing Type
* Item
* Status
* Owner
* Evidence
* Unlocks

## 4. 初始阻塞项建议表

| Area | Platform | Missing Type | Item | Status | Owner | Evidence | Unlocks |
| -------- | ----------------- | ------------ | ------------------------------------------ | ------- | ----------- | -------------------------- | --------------------------------- |
| Registry | Shared | governance | /v1/health 用途登记已合入 | missing | Server | registry PR | Render health config generation |
| Registry | Shared | governance | CI/CD Secret Registry 已合入 | missing | Server | registry PR | any future automation work |
| GitHub | GitHub | manual setup | secret 存放策略已定（repo / env / org） | missing | Founder/Ops | settings screenshot | workflow secret wiring |
| Vercel | Vercel | identifier | Web/Admin 项目归属与 production branch 已确认 | missing | Ops | project screenshots | vercel automation decisions |
| Vercel | Vercel | domain | custom domains 全部绑定完成 | missing | Ops | domain screenshots | prod / staging routing confidence |
| Render | Render | identifier | API / Worker service 绑定与 branch 策略已确认 | missing | Ops | service screenshots | render deploy config generation |
| Render | Render | manual setup | API health check 已确认复用 /v1/health | missing | Ops | health settings screenshot | render health wiring |
| Expo | EAS | identifier | Expo owner / slug / project 归属已确认 | missing | Mobile | dashboard screenshot | eas config generation |
| Expo | EAS | identifier | iOS bundle id / Android package name 已确认 | missing | Mobile | mobile config note | eas submit setup |
| Apple | App Store Connect | identifier | ascAppId 已记录 | missing | Founder/Ops | ASC screenshot | ios submit automation |
| Apple | App Store Connect | manual setup | Apple API Key 或 app-specific password 方案已定 | missing | Founder/Ops | decision note | ios submit automation |
| Google | Play Console | manual setup | Google Play app 已创建 | missing | Founder/Ops | console screenshot | android submit automation |
| Google | Play Console | manual setup | 首次手工上传已完成 | missing | Founder/Ops | release record | android API submissions |
| Review | App Review | manual setup | C 端 / Admin demo 账号与审核路径文档已备齐 | missing | Product/Ops | review docs | store submission readiness |

## 5. 进入自动化阶段的准入规则

只有当以下条件同时满足，服务器线程才可以开始生成：

* `render.yaml`
* `vercel.json`
* `apps/mobile/eas.json`
* `.github/workflows/*`
* `.env.example` 与环境样例文件

准入条件如下：

* registry patch 已合入
* handoff 表中所有阻塞项为 done
* 平台接线截图与证据已留存
* 已明确批准进入自动化文件生成阶段

## 6. 文档维护规则

* 本文档只记录 readiness，不新增 registry 项
* 若某条阻塞项需要新增 env / route / API path / secret 名，必须回到 registry patch 流程
* 任何线程不得绕过本表直接生成自动化文件

## 7. 未来自动化前仍缺的 identifiers / manual setup checklist

### 必须补齐的 identifiers

* GitHub
  * 仓库可见性
  * 是否使用 environments
  * secret 存放层级策略
* Vercel
  * Web/Admin 项目归属
  * root directory
  * production branch
  * custom domain 绑定状态
* Render
  * API service 标识
  * Worker service 标识
  * 每个 service 的 branch 绑定
  * auto-deploy 模式
  * /v1/health 已配置为 API health check
* Expo / EAS
  * owner / organization
  * slug
  * EAS project 归属
  * iOS bundle identifier
  * Android package name
* Apple
  * App Store Connect app record
  * ascAppId
  * API Key 还是 app-specific password 的提交方案决策
* Google
  * Play Console app record
  * package name
  * 首次手工上传完成状态

### 必须完成的 manual steps

* GitHub：确认 secret 治理策略与 plan 能力
* Vercel：完成 repo 连接、项目建立、生产分支与域名绑定
* Render：完成 service 创建、branch 绑定、health check 设为 /v1/health
* Expo / EAS：至少跑通一次可用 build 流程
* Apple：创建 App Store Connect app，准备审核资料
* Google：创建 Play app，准备 service account，完成首次手工上传
