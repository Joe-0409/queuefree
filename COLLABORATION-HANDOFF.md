# QueueFree 协同工作提示词（2026-03-12）

## 项目状态概览

**当前批号：** Batch 13 (Frontend Generated Fetch/Mapper Slots)

**运行状态：**
- ✅ Web: http://localhost:3000 (Next.js)
- ✅ Admin: http://localhost:3001 (Next.js)
- ✅ Mobile: exp://10.40.0.121:8081 (Expo)
- ✅ API: http://localhost:4000 (NestJS)
- ✅ Registry-first / pre-OpenAPI 模式

## Batch 13 已完成

### Frontend (Mobile + Admin)
- ✅ Generated fetcher slots 创建完成
- ✅ Generated mapper slots 创建完成
- ✅ Manifest + Bridge + Fetcher + Mapper 四层一致性验证通过
- ✅ Mock 仍是唯一数据源
- ✅ `pnpm verify:generated-fetch-map-slots` 通过

### Gated Line (registry-baseline-v1.2.md)
- 所有冻结项已锁定（enum, state, API path, env var, domain, route）
- `packages/shared` 只包含稳定共享 contract
- `packages/api-client` 只能由 OpenAPI 生成
- Web `/contact`, Mobile/Admin 路由、前端公开 env 保持冻结

## 三方当前任务

### Frontend 线程
**当前状态：** Batch 13 完成，等待后端 OpenAPI

**下一步（等待 OpenAPI 后）：**
1. 后端提供最小只读 OpenAPI
2. 生成 `packages/api-client`
3. 填充 generated fetcher/mapper 实现
4. DTO → screen-model 映射

**不能做的事（Batch 13）：**
- ❌ 不能手写猜测型 API path
- ❌ 不能往 api-client 塞手写 DTO
- ❌ 不能新增前端 env
- ❌ 不能改 Web /contact
- ❌ 不能新增 Mobile/Admin 路由
- ❌ 不能跳过 registry

---

### Backend 线程
**当前状态：** NestJS API 运行中，有基本 DTO 和 controllers

**需要配合：**
1. 提供**最小只读 OpenAPI**（最小集，仅读接口）
2. 基于 `registry-baseline-v1.2.md` 的字段
3. 不要先给写接口（Batch 13 只需要只读）
4. 不要口头给字段，先登记→OpenAPI→生成 SDK

**OpenAPI 交付后的顺序：**
1. backend 更新 registry（如有新增冻结项）
2. backend 导出 OpenAPI
3. frontend 运行 `pnpm generate:api-client`
4. frontend 在 fetcher slot 中调用 generated SDK
5. frontend 在 mapper slot 中完成 DTO → screen model mapping
6. frontend 把对应 `*_GENERATED_ADAPTER_READY = true`
7. 前端门禁通过后，再进入联调

---

### Server 线程
**当前状态：** 维持 registry baseline

**需要配合：**
1. 不要抢先新增前端 env（mobile/web/admin）
2. 不要改 Web 对外路径（/privacy, /terms, /rules, /delete-account, /contact）
3. 等待 backend OpenAPI 到位后，再协助补：
   - CI 中 `generate:api-client` 的顺序
   - staging 联调顺序
   - spec 文件分发与缓存策略

**保持域名不变：**
- web: queuefree.com
- admin: admin.queuefree.com
- api: api.queuefree.com
- assets: assets.queuefree.com

## 文件结构

```
queuefree/
├── apps/
│   ├── mobile/          # Mobile frontend (Expo)
│   │   └── src/
│   │       ├── adapters/
│   │       │   ├── mobile-read-adapter.*
│   │       │   └── runtime-config-adapter.*
│   │       └── generated-bridge/
│   │           ├── mobile-generated-*
│   │           └── runtime-config-generated-*
│   ├── admin/           # Admin backend (Next.js)
│   │   └── src/
│   │       ├── adapters/
│   │       │   └── admin-read-adapter.*
│   │       └── generated-bridge/
│   │           └── admin-generated-*
│   └── web/             # Web frontend (Next.js)
├── services/
│   └── api/             # NestJS API
│       └── src/
│           ├── consumer/
│           ├── admin/
│           ├── rules/
│           └── system/
├── packages/
│   ├── shared/          # Shared contract (frozen)
│   ├── api-client/      # Generated from OpenAPI (placeholder)
│   └── ui-tokens/       # UI tokens
└── docs/
    ├── registry/        # Registry baseline
    ├── contracts/       # contracts
    └── handoffs/        # Handoff docs
```

## 当前 OpenAPI 状态

**位置：** `services/api/openapi/openapi.json`

**当前 API endpoints:**
- `/v1/health` (system)
- `/v1/system/runtime-config` (system)
- `/v1/rules` (rules)
- `/v1/rules/:slug` (rules)
- `/v1/v1/me` (consumer)
- `/v1/v1/products` (consumer)
- `/v1/v1/products/:productId` (consumer)
- `/v1/v1/queue-guard` (consumer)
- `/v1/v1/queue-entries` (consumer)
- `/v1/v1/queue-entries/:queueEntryId` (consumer)
- `/v1/v1/tasks` (consumer)
- `/v1/v1/invites/me` (consumer)
- `/v1/v1/invites/records` (consumer)
- `/v1/v1/wallet` (consumer)
- `/v1/v1/wallet/ledgers` (consumer)
- `/v1/v1/withdrawals` (consumer)
- `/v1/v1/admin/dashboard/summary` (admin)

**注意：** `/v1/v1/...` 是重复前缀问题，需要修复为 `/v1/...`

## 下一步行动项

### 紧急（优先级 1）
1. 后端提供最小只读 OpenAPI（基于 registry-baseline-v1.2.md）
2. 修复 API `/v1/v1/...` 重复前缀问题

### 后续（优先级 2）
1. Frontend 运行 `pnpm generate:api-client`
2. 填充 generated fetcher/mapper
3. DTO → screen-model 映射
4. `*_GENERATED_ADAPTER_READY = true`
5. 联调

---

**_FETCHER SLOT 和 MAPPER SLOT 是什么？_

- **fetcher slot:** 未来只负责调用 `packages/api-client` 的 generated SDK
- **mapper slot:** 未来只负责把 DTO/raw payload 转成 app-local screen model
- **bridge:** 连接 fetcher 和 mapper 的胶水层
- **manifest:** 描述 adapter 方法与 fetcher/mapper 的映射关系

**这样拆的好处：**
1. OpenAPI 到位前，不需要猜 DTO 字段
2. OpenAPI 到位后，SDK 接线位置唯一
3. 页面与 query hook 不需要因为 DTO 变化而反复改写
4. mock/generated 两条链路的切换点始终停留在 adapter resolve 层
