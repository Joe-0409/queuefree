# QueueFree Platform Manual Setup Checklist

## 1. 文档目的

本文档用于记录 QueueFree 在进入自动化之前必须完成的平台手工接线、账号准备、域名绑定、项目归属、提交前置条件与证据留存。本文档不定义新的 registry 项，只记录“现有冻结项已经如何在平台侧落地”。

## 2. GitHub

### 必查项

* 仓库可见性：public / private / internal
* 当前 GitHub plan
* GitHub Actions 是否已启用
* 是否允许使用 environments
* secret 策略采用：
  * repository secrets
  * environment secrets
  * organization secrets

### 需要留痕的证据

* 仓库 Settings 截图
* Actions 可用性截图
* environments 配置截图（如果启用）
* secret 存放策略说明

## 3. Vercel

### 必查项

* 是否已连接 GitHub repo
* apps/web 是否已建立项目
* apps/admin 是否已建立项目
* 每个项目的 root directory 是否确认
* 每个项目的 production branch 是否确认
* 固定域名是否已绑定：
  * queuefree.com
  * admin.queuefree.com
  * dev / staging 对应域名
* 当前阶段是否仅使用 Vercel for GitHub
* 是否暂不启用 VERCEL_TOKEN

### 需要留痕的证据

* project overview 截图
* Git integration 设置截图
* production branch 截图
* domain settings 截图

## 4. Render

### 必查项

* Render workspace 是否确认
* services/api 是否已建立为 Web Service
* services/worker 是否已建立为 Worker / Background Worker
* 每个 service 的 Git branch 绑定是否确认
* auto-deploy 模式是否确认
* API health check 是否明确设置为既有 `GET /v1/health`
* 当前阶段是否先使用 Render 原生 Git 自动部署
* RENDER_DEPLOY_HOOK_URL_* 是否仅作为 future automation reserved，不在当前启用

### 需要留痕的证据

* service overview 截图
* Git branch 绑定截图
* auto-deploy 设置截图
* health check path 截图

## 5. Supabase / Upstash / Cloudflare / R2

### 必查项

* dev / staging / prod 是否已建立独立资源
* Cloudflare DNS 是否已接管
* assets.* 域名是否已绑定到 R2 访问路径
* 资源命名是否已记录到内部 ops 文档
* 是否已确认不把这些平台资源标识扩展成新的 registry 项

### 需要留痕的证据

* 项目清单截图
* DNS 记录截图
* 资源命名表
* 环境映射表

## 6. Expo / EAS

### 必查项

* Expo account owner / organization 是否确认
* app slug 是否确认
* iOS bundle identifier 是否确认
* Android package name 是否确认
* 是否已本地完成至少一次可用 build 流程验证
* 是否已决定未来是否通过 EXPO_TOKEN 进入 CI build / submit
* 当前阶段是否仍然不生成 apps/mobile/eas.json

### 需要留痕的证据

* Expo dashboard 项目截图
* EAS project 归属截图
* 本地成功 build 记录
* bundle id / package name 记录表

## 7. Apple

### 必查项

* Apple Developer account 是否就绪
* App Store Connect app 是否已创建
* ascAppId 是否已记录
* bundle identifier 是否与移动端计划一致
* 后续提交路径是否采用：
  * APPLE_ASC_API_KEY_P8 主路径
  * EXPO_APPLE_APP_SPECIFIC_PASSWORD 备用路径
* 审核 demo 账号与审核步骤说明是否已准备

### 需要留痕的证据

* App Store Connect app 截图
* ascAppId 记录
* 审核说明文档链接
* demo 账号记录（不放明文密码）

## 8. Google Play

### 必查项

* Google Play Developer account 是否就绪
* Play Console app 是否已创建
* package name 是否确认
* Google Service Account Key 是否已准备
* 是否已至少完成一次手工上传
* 后续是否计划通过 GOOGLE_PLAY_SERVICE_ACCOUNT_JSON 进入自动提交

### 需要留痕的证据

* Play Console app 截图
* package name 记录
* service account 记录位置
* 首次手工上传完成记录

## 9. 审核与合规

### 必查项

* Web 合规页已上线并可访问：
  * /privacy
  * /terms
  * /rules
  * /delete-account
  * /contact
* App 内合规入口已定义
* C 端 demo 账号已准备
* Admin demo 账号已准备
* 审核路径文档已准备

### 需要留痕的证据

* 合规页截图
* app 内入口截图
* demo 账号台账
* 审核路径文档链接
