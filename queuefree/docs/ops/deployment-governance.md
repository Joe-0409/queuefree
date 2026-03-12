# QueueFree Deployment Governance

## 1. 文档目的

本文档用于锁定 QueueFree 在进入自动化文件生成前的部署治理边界、平台职责、secret 策略、health check 规则、自动化准入门槛与禁止事项。本文档是 `docs/registry/registry-baseline-v1.2.md` 的运维解释层，不替代 registry，也不定义新的共享契约。

## 2. 真相源优先级

QueueFree 三线程统一遵循以下真相源优先级：

1. `queuefree_prd_v1_2`
2. `docs/contracts/queuefree-collaboration-contract-v1.2.md`
3. `packages/shared`
4. `packages/api-client`
5. `docs/registry/registry-baseline-v1.2.md`
6. 各线程临时草稿

若下位来源与上位来源冲突，必须以上位来源为准；不得通过实现代码、平台配置或自动化文件反向定义契约。

## 3. 服务器线程职责边界

服务器线程只负责以下范围：

* 环境分层与部署环境映射
* 域名、平台归属与平台接线方案
* CI/CD 治理策略
* Secret 治理策略
* 监控、告警、备份、恢复与发布前运维准备
* 审核演示环境与发布 checklist 的运维收口

服务器线程不得擅自新增或修改：

* enum / state
* API path
* request / response field
* table field
* event / worker / queue / cron
* env var / domain / route

如确需变更，必须先更新 registry，再继续生成任何配置或实现。

## 4. 当前平台基线

当前平台基线固定为：

* Web / Admin：Vercel
* API / Worker：Render
* Postgres：Supabase
* Redis：Upstash
* Object Storage：Cloudflare R2
* DNS / SSL / WAF：Cloudflare
* Mobile build / submit：Expo EAS
* CI：GitHub Actions
* Error Monitoring：Sentry
* Product Analytics：PostHog
* Email：Resend

当前阶段默认优先使用平台原生 Git 集成，而不是先生成显式自动化脚本。Vercel for GitHub 支持 Git 自动部署、Preview Deployment 与自定义域名更新；Render 支持绑定 Git 分支自动部署，并允许后续切换到 deploy hooks；Render health checks 只适用于 web services；Expo 的构建与提交流程支持在 CI 中运行，但 CI 认证依赖 `EXPO_TOKEN`，而商店提交还依赖平台侧前置项。

## 5. Health Check 治理规则

* QueueFree 统一复用既有 `GET /v1/health`
* 不新增 `/health`
* 不新增任何其他 health path 别名
* Render Web Service health check 必须复用 `GET /v1/health`
* `services/worker` 不引入 HTTP health path

该规则的目的是避免 registry、OpenAPI、SDK 与平台配置分叉。Render 官方说明 health check endpoint 用于 web service 的健康探测与零停机部署判断，因此必须与现有 API contract 对齐。

## 6. CI/CD Secret 治理规则

* CI/CD Secret Registry 与应用运行时 Environment Variable Registry 分离
* 当前阶段：`Current Phase Required = 无`
* Future Automation Reserved 仅限：
  * `VERCEL_TOKEN`
  * `RENDER_DEPLOY_HOOK_URL_*`
  * `EXPO_TOKEN`
  * `APPLE_ASC_API_KEY_P8`
  * `EXPO_APPLE_APP_SPECIFIC_PASSWORD`
  * `GOOGLE_PLAY_SERVICE_ACCOUNT_JSON`
* 除上述已登记项外，不得在自动化文件或平台后台发明新的 CI/CD secret 名
* GitHub 仅作为 secret 存放与消费边界；后续可根据 plan 与权限策略决定使用 repository secrets、environment secrets 或 organization secrets。

## 7. 自动化准入门槛

在以下条件全部满足前，禁止生成 `render.yaml`、`vercel.json`、`apps/mobile/eas.json`、`.github/workflows/*`、`.env.example` 或任何平台 YAML / JSON / workflow：

* `docs/registry/registry-baseline-v1.2.md` 已合入本轮 patch
* 平台项目与环境映射已在 `docs/ops/platform-manual-setup-checklist.md` 中收口
* 所有 required identifiers 已收集完毕
* 所有手工平台接线已完成
* 自动化所需 secret 已在平台后台或 GitHub 中准备完成
* `docs/handoffs/automation-readiness-handoff.md` 中的阻塞项状态全部转为 done
* 明确批准进入“自动化文件生成阶段”

## 8. 当前阶段允许的交付物

当前阶段只允许：

* registry patch
* ops 文档
* handoff 文档
* manual setup checklist
* readiness checklist
* 审核与发布前准备文档

当前阶段不允许：

* 平台 YAML
* GitHub Actions workflow
* EAS 配置
* 环境变量模板
* SDK 生成产物
* API / Worker / Web / Admin / Mobile 实现代码

## 9. References

建议在文末附上这组官方参考链接，供后续自动化阶段核验：

* GitHub Actions secrets / environments 官方文档 (https://docs.github.com/actions/security-guides/using-secrets-in-github-actions)
* Vercel for GitHub / Git deployments / custom domains 官方文档 (https://vercel.com/docs/git/vercel-for-github)
* Render deploys / deploy hooks / health checks 官方文档 (https://render.com/docs/health-checks)
* Expo Build / Submit / CI 官方文档 (https://docs.expo.dev/build/building-on-ci/)
