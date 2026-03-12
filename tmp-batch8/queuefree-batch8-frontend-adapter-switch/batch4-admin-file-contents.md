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
