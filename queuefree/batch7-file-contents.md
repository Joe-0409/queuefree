## package.json
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
    "verify:frontend-guardrails": "pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries && pnpm verify:mock-data-boundary",
    "verify:mock-data-boundary": "node ./scripts/verify-mock-data-boundary.mjs"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "typescript": "^5.8.3"
  }
}
```

## README-第7批-前端数据边界与Query过渡层.md
```
# QueueFree 第7批：前端数据边界与 Query 过渡层

这批不是接真实后端。

这批做的是：

- mobile 与 admin 页面不再直接 import 本地 mock 源文件
- 新增 query hook -> repository -> mock adapter 过渡层
- 新增 mock data boundary 校验脚本
- 保持 registry-first，不新增任何冻结项

## 启动方式

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:web
```

后台：

```bash
pnpm dev:admin
```

手机端：

```bash
pnpm dev:mobile
```

## 这一批适合做什么

- 演示页面路径是否完整
- 演示 loading / error / empty state 是否到位
- 演示后续 OpenAPI 接进来时，页面层无需大改

## 这一批还不做什么

- 不接真实鉴权
- 不接真实 REST 数据
- 不新增共享字段
- 不新增 API path
- 不新增 env var
```

## scripts/verify-mock-data-boundary.mjs
```
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const checks = [
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'app'),
    blockedFragments: ['src/lib/demo-data'],
    description: 'mobile app route files must not import demo-data directly'
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'app'),
    blockedFragments: ['lib/admin-content'],
    description: 'admin app route files must not import admin-content directly'
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'src'),
    blockedFragments: ['lib/demo-data'],
    description: 'mobile src files outside repository/query layers must not import demo-data directly',
    allowPatterns: [
      /src[\/]lib[\/]demo-data\.ts$/,
      /src[\/]lib[\/]mobile-repository\.ts$/,
      /src[\/]queries[\/]use-mobile-queries\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'src'),
    blockedFragments: ['lib/admin-content'],
    description: 'admin src files outside repository/query layers must not import admin-content directly',
    allowPatterns: [
      /src[\/]lib[\/]admin-content\.ts$/,
      /src[\/]lib[\/]admin-repository\.ts$/,
      /src[\/]queries[\/]use-admin-queries\.ts$/
    ]
  }
];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(absolutePath));
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

const violations = [];

for (const check of checks) {
  const rootExists = statSync(check.rootDir, { throwIfNoEntry: false });
  if (!rootExists) {
    continue;
  }

  const files = walk(check.rootDir);

  for (const filePath of files) {
    const normalized = filePath.split(path.sep).join('/');
    const isAllowed = check.allowPatterns?.some((pattern) => pattern.test(normalized)) ?? false;
    if (isAllowed) {
      continue;
    }

    const content = readFileSync(filePath, 'utf8');
    for (const fragment of check.blockedFragments) {
      if (content.includes(fragment)) {
        violations.push(`${check.description}: ${path.relative(repoRoot, filePath)}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Mock data boundary violations found:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('verify-mock-data-boundary passed');
```

## docs/contracts/frontend-screen-data-boundary-v1.2.md
```
# Frontend Screen Data Boundary v1.2

状态：Locked for pre-OpenAPI frontend work  
适用范围：`apps/mobile`、`apps/admin`

## 目标

在 backend 还没有导出正式 OpenAPI 之前，前端允许继续做 skeleton / demo mode，
但页面层不得直接引用 mock data 源文件。

## 当前允许的数据流

页面 / route file
-> query hook
-> app-local repository
-> app-local demo content

## 当前禁止的数据流

页面 / route file
-> 直接 import `src/lib/demo-data`

页面 / route file
-> 直接 import `src/lib/admin-content`

## 为什么这样做

1. 不发明新的共享契约
2. 不把页面直接绑死在本地占位数据上
3. 等 backend 输出 OpenAPI 后，只需要替换 repository 内部实现
4. route 层可以先把 loading / error / empty state 做完整

## 允许触达的真相源

1. `queuefree_prd_v1_2`
2. `packages/shared`
3. `packages/api-client`（待 OpenAPI 生成）
4. `docs/registry/registry-baseline-v1.2.md`

## 本文档不新增任何冻结项

- 不新增 route
- 不新增 env var
- 不新增 API path
- 不新增 request field
- 不新增 response field
- 不新增 enum / state

## 后续切换方式

当 backend 提供正式 OpenAPI 后：

query hook
-> repository
-> generated `packages/api-client`

页面层无需再大规模重写。
```

## docs/handoffs/backend-next-steps-from-frontend-batch7.md
```
# Backend Next Steps from Frontend Batch 7

## 前端本轮已完成

- mobile 与 admin 页面不再直接读取本地 mock 源文件
- 新增 query / repository / mock adapter 过渡层
- 新增 mock data boundary 校验脚本
- 本轮没有新增任何 registry 项

## 你接下来需要做的事

1. 继续保持 registry-first
2. 优先为 **已经登记过的只读能力** 导出 OpenAPI，范围优先覆盖：
   - C 端商品列表与商品详情
   - C 端队列列表、队列详情、用户保活状态
   - C 端任务列表
   - C 端邀请概览与邀请记录
   - C 端钱包概览、账变列表、提现记录
   - C 端个人资料与规则中心
   - Admin dashboard summary
   - Admin 订单列表、队列列表、时隙列表、活动列表、任务列表、邀请列表、提现列表、风险案件列表、审计日志列表
3. 生成 `packages/api-client`
4. 通知前端开始 batch 8 的真实 SDK 读链路接线

## 你当前不要做的事

- 不要口头补字段让前端手抄
- 不要把 DTO / Swagger 类型直接丢给前端
- 不要为了配前端 skeleton 临时发明未登记 detail path
```

## docs/handoffs/server-next-steps-from-frontend-batch7.md
```
# Server Next Steps from Frontend Batch 7

## 前端本轮已完成

- 新增 pre-OpenAPI query / repository 过渡层
- 新增 mock data boundary 校验脚本
- 当前 mobile 与 admin 页面仍保持 registry 内既有路由不变

## 你接下来需要做的事

1. 继续保证 local / dev / staging / prod 的公开域名与 registry 一致
2. 保证 mobile / web / admin 公开 env 名称不漂移
3. 为后端导出 OpenAPI 与 packages/api-client 生成流程预留稳定构建位点
4. 在 preview / CI 环境中预留前端 boundary 校验脚本执行能力

## 你当前不要做的事

- 不要私自新增前端公开 env
- 不要把 Web `/contact` 改回 `/support`
- 不要把未登记 API path 先写入部署说明
```

## docs/handoffs/第7批-发给后端和服务器的话术.md
```
从现在开始，QueueFree 三线程继续按以下优先级执行：

1. queuefree_prd_v1_2
2. packages/shared
3. packages/api-client
4. docs/registry/registry-baseline-v1.2.md
5. 线程内部草稿

前端第7批已完成：
- mobile / admin 的 query / repository / mock adapter 过渡层
- 页面不再直接 import demo-data / admin-content
- 新增 mock data boundary 校验脚本

本轮没有新增任何 registry 项，也没有新增共享 contract。

backend 请继续：
- 仅围绕已登记 API path 导出最小只读 OpenAPI
- 生成 packages/api-client

server 请继续：
- 保持域名、公开 env、preview/CI 执行边界不漂移
```

## apps/mobile/src/lib/mock-delay.ts
```
export async function waitForMock(delayMs = 120): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}
```

## apps/mobile/src/lib/mobile-repository.ts
```
import { ACCOUNT_DELETE_STATUSES } from '@queuefree/shared';
import {
  demoGuard,
  demoInviteRecords,
  demoLedgers,
  demoProducts,
  demoProfile,
  demoQueueEntries,
  demoRuleFaq,
  demoTasks,
  demoWallet,
  demoWithdrawals,
  formatQueueEntrySummary,
  getProductById,
  getQueueEntryById,
  type InviteRecordModel,
  type ProductCardModel,
  type QueueEntryCardModel,
  type TaskCardModel,
  type WalletLedgerModel,
  type WithdrawalRecordModel
} from './demo-data';
import { waitForMock } from './mock-delay';

export type HomeScreenData = {
  products: ProductCardModel[];
  nextSlotAt: string | null;
};

export type QueueScreenData = {
  guard: typeof demoGuard;
  entries: QueueEntryCardModel[];
};

export type TasksScreenData = {
  tasks: TaskCardModel[];
};

export type InvitesScreenData = {
  inviteCode: string;
  records: InviteRecordModel[];
};

export type WalletScreenData = {
  wallet: typeof demoWallet;
  ledgers: WalletLedgerModel[];
  withdrawals: WithdrawalRecordModel[];
};

export type ProfileScreenData = {
  profile: typeof demoProfile;
};

export type RulesCenterData = {
  faq: string[];
};

export type OrderSuccessData = {
  entryId: string;
  summary: ReturnType<typeof formatQueueEntrySummary>;
};

export type DeleteAccountPreviewData = {
  statuses: typeof ACCOUNT_DELETE_STATUSES;
  blockers: string[];
  impactNotes: string[];
};

export async function fetchHomeScreenData(): Promise<HomeScreenData> {
  await waitForMock();
  return {
    products: demoProducts,
    nextSlotAt: demoQueueEntries[0]?.nextSlotAt ?? null
  };
}

export async function fetchQueueScreenData(): Promise<QueueScreenData> {
  await waitForMock();
  return {
    guard: demoGuard,
    entries: demoQueueEntries
  };
}

export async function fetchTasksScreenData(): Promise<TasksScreenData> {
  await waitForMock();
  return {
    tasks: demoTasks
  };
}

export async function fetchInvitesScreenData(): Promise<InvitesScreenData> {
  await waitForMock();
  return {
    inviteCode: 'QUEUEFREE2026',
    records: demoInviteRecords
  };
}

export async function fetchWalletScreenData(): Promise<WalletScreenData> {
  await waitForMock();
  return {
    wallet: demoWallet,
    ledgers: demoLedgers,
    withdrawals: demoWithdrawals
  };
}

export async function fetchProfileScreenData(): Promise<ProfileScreenData> {
  await waitForMock();
  return {
    profile: demoProfile
  };
}

export async function fetchProductDetail(productId: string): Promise<ProductCardModel> {
  await waitForMock();
  return getProductById(productId);
}

export async function fetchQueueEntryDetail(entryId: string): Promise<QueueEntryCardModel> {
  await waitForMock();
  return getQueueEntryById(entryId);
}

export async function fetchRulesCenterData(): Promise<RulesCenterData> {
  await waitForMock();
  return {
    faq: demoRuleFaq
  };
}

export async function fetchOrderSuccessData(_orderId: string): Promise<OrderSuccessData> {
  await waitForMock();
  const entryId = demoQueueEntries[0]?.id ?? 'entry-1001';

  return {
    entryId,
    summary: formatQueueEntrySummary(entryId)
  };
}

export async function fetchDeleteAccountPreview(): Promise<DeleteAccountPreviewData> {
  await waitForMock();
  return {
    statuses: ACCOUNT_DELETE_STATUSES,
    blockers: [
      'Active or frozen queue entries may block immediate anonymization.',
      'Pending, available, or frozen wallet balances must settle first.',
      'Withdrawal processing and after-sales review may delay final anonymization.'
    ],
    impactNotes: [
      'Queue entries may be removed or settled according to the locked rules.',
      'Financial, order, risk, and audit records may retain irreversible reference IDs.',
      'MVP deletion is request + settlement + anonymization, not a simple disable switch.'
    ]
  };
}
```

## apps/mobile/src/queries/use-mobile-queries.ts
```
import { useQuery } from '@tanstack/react-query';
import {
  fetchDeleteAccountPreview,
  fetchHomeScreenData,
  fetchInvitesScreenData,
  fetchOrderSuccessData,
  fetchProductDetail,
  fetchProfileScreenData,
  fetchQueueEntryDetail,
  fetchQueueScreenData,
  fetchRulesCenterData,
  fetchTasksScreenData,
  fetchWalletScreenData
} from '../lib/mobile-repository';

const oneMinute = 60_000;

export function useHomeScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'home-screen'],
    queryFn: fetchHomeScreenData,
    staleTime: oneMinute
  });
}

export function useQueueScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'queue-screen'],
    queryFn: fetchQueueScreenData,
    staleTime: oneMinute
  });
}

export function useTasksScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'tasks-screen'],
    queryFn: fetchTasksScreenData,
    staleTime: oneMinute
  });
}

export function useInvitesScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'invites-screen'],
    queryFn: fetchInvitesScreenData,
    staleTime: oneMinute
  });
}

export function useWalletScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'wallet-screen'],
    queryFn: fetchWalletScreenData,
    staleTime: oneMinute
  });
}

export function useProfileScreenQuery() {
  return useQuery({
    queryKey: ['mobile', 'profile-screen'],
    queryFn: fetchProfileScreenData,
    staleTime: oneMinute
  });
}

export function useProductDetailQuery(productId: string) {
  return useQuery({
    queryKey: ['mobile', 'product-detail', productId],
    queryFn: () => fetchProductDetail(productId),
    staleTime: oneMinute,
    enabled: Boolean(productId)
  });
}

export function useQueueEntryDetailQuery(entryId: string) {
  return useQuery({
    queryKey: ['mobile', 'queue-entry-detail', entryId],
    queryFn: () => fetchQueueEntryDetail(entryId),
    staleTime: oneMinute,
    enabled: Boolean(entryId)
  });
}

export function useRulesCenterQuery() {
  return useQuery({
    queryKey: ['mobile', 'rules-center'],
    queryFn: fetchRulesCenterData,
    staleTime: oneMinute
  });
}

export function useOrderSuccessQuery(orderId: string) {
  return useQuery({
    queryKey: ['mobile', 'order-success', orderId],
    queryFn: () => fetchOrderSuccessData(orderId),
    staleTime: oneMinute,
    enabled: Boolean(orderId)
  });
}

export function useDeleteAccountPreviewQuery() {
  return useQuery({
    queryKey: ['mobile', 'delete-account-preview'],
    queryFn: fetchDeleteAccountPreview,
    staleTime: oneMinute
  });
}
```

## apps/mobile/src/components/query-state-card.tsx
```
import { Text, View } from 'react-native';
import { EmptyState } from './empty-state';
import { PrimaryButton } from './primary-button';
import { SectionCard } from './section-card';

type QueryStateCardProps = {
  title: string;
  description: string;
  mode: 'loading' | 'error';
  retryLabel?: string;
  onRetry?: () => void;
};

export function QueryStateCard({
  title,
  description,
  mode,
  retryLabel = 'Try again',
  onRetry
}: QueryStateCardProps) {
  return (
    <SectionCard title={mode === 'loading' ? 'Loading skeleton data' : 'Unable to load skeleton data'}>
      <EmptyState title={title} description={description} />
      {mode === 'loading' ? <Text>Fetching demo-mode data through the app-local repository.</Text> : null}
      {mode === 'error' && onRetry ? (
        <View>
          <PrimaryButton label={retryLabel} onPress={onRetry} />
        </View>
      ) : null}
    </SectionCard>
  );
}
```

## apps/mobile/src/lib/status-maps.ts
```
import type {
  AccountDeleteStatus,
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

export function getAccountDeleteStatusTone(status: AccountDeleteStatus): Tone {
  switch (status) {
    case "ANONYMIZED":
      return "success";
    case "DELETE_REQUESTED":
    case "PENDING_SETTLEMENT":
    case "READY_TO_ANONYMIZE":
      return "warning";
    case "CANCELED_BY_USER":
      return "danger";
    default:
      return "neutral";
  }
}
```

## apps/mobile/app/(app)/(tabs)/home.tsx
```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useHomeScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function HomeTabScreen() {
  const { config } = useRuntimeConfig();
  const homeQuery = useHomeScreenQuery();

  return (
    <Screen
      title="Home"
      subtitle="Understand the path in seconds: buy a real product, join the queue, then wait for fixed settlement slots."
    >
      <DemoBanner />

      {homeQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing home overview"
          description="This batch reads screen data through a repository layer instead of direct page imports."
        />
      ) : null}

      {homeQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Home overview is unavailable"
          description="Retry the demo-mode query. The future SDK swap happens inside the repository layer."
          onRetry={() => {
            void homeQuery.refetch();
          }}
        />
      ) : null}

      {homeQuery.data ? (
        <>
          <SectionCard title="Today at a glance" description="MVP launch stays fixed to PH / PHP / Asia/Manila / English.">
            <Text>• Market: {config.marketCode}</Text>
            <Text>• Currency: {config.currencyCode}</Text>
            <Text>• Check-in keeps all active entries valid for {config.baseGuardHours} hours</Text>
            <Text>• Next visible settlement slot: {homeQuery.data.nextSlotAt ? formatDateTime(homeQuery.data.nextSlotAt) : "TBD"}</Text>
          </SectionCard>

          <SectionCard title="Queue-friendly products" description="There is no cart in MVP. Quantity is chosen on the product page, then the order goes straight to checkout.">
            <View style={{ gap: 12 }}>
              {homeQuery.data.products.map((product) => (
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
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/(tabs)/queue.tsx
```
import { useState } from "react";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getGuardStatusTone, getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useQueueScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function QueueTabScreen() {
  const { config } = useRuntimeConfig();
  const queueQuery = useQueueScreenQuery();
  const [checkedInAt, setCheckedInAt] = useState<string | null>(null);

  return (
    <Screen
      title="Queue"
      subtitle="Queue pages show the current effective rank, not a historical absolute rank."
    >
      <DemoBanner />

      {queueQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing queue overview"
          description="Queue guard and queue entries now flow through a screen-level query boundary."
        />
      ) : null}

      {queueQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Queue overview is unavailable"
          description="Retry the repository-backed demo query."
          onRetry={() => {
            void queueQuery.refetch();
          }}
        />
      ) : null}

      {queueQuery.data ? (
        <>
          <SectionCard
            title="Queue guard"
            description="Check-in is user-level. One successful check-in helps all active queue entries stay valid together."
            rightSlot={<StatusPill label={queueQuery.data.guard.status} tone={getGuardStatusTone(queueQuery.data.guard.status)} />}
          >
            <KeyValueRow label="Valid until" value={formatDateTime(queueQuery.data.guard.validUntil)} />
            <KeyValueRow label="Grace until" value={formatDateTime(queueQuery.data.guard.graceUntil)} />
            <Text>If guard expires, entries become frozen first, then may be removed after the grace window.</Text>
            {checkedInAt ? <Text>Last demo check-in: {formatDateTime(checkedInAt)}</Text> : null}
            <PrimaryButton label="Demo check-in" onPress={() => setCheckedInAt(new Date().toISOString())} />
          </SectionCard>

          <SectionCard title="My queue entries" description={`Top${config.protectZoneSize} is protected. Boost is limited to ${config.boostLimitPerEntry} times per order.`}>
            <View style={{ gap: 12 }}>
              {queueQuery.data.entries.map((entry) => (
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
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/(tabs)/tasks.tsx
```
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useTasksScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function TasksTabScreen() {
  const [claimedIds, setClaimedIds] = useState<string[]>([]);
  const tasksQuery = useTasksScreenQuery();
  const claimedSet = useMemo(() => new Set(claimedIds), [claimedIds]);

  return (
    <Screen
      title="Tasks"
      subtitle="Tasks can extend retention, grant fragments, or support wallet activation paths later."
    >
      <DemoBanner />

      {tasksQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing task center"
          description="Task cards now read from a query hook instead of direct page-level mock imports."
        />
      ) : null}

      {tasksQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Task center is unavailable"
          description="Retry the repository-backed task query."
          onRetry={() => {
            void tasksQuery.refetch();
          }}
        />
      ) : null}

      {tasksQuery.data ? (
        <SectionCard title="Task center" description="Rewards should remain traceable. Real task reads and claims must come from the generated client after backend registers the task contract.">
          <View style={{ gap: 12 }}>
            {tasksQuery.data.tasks.map((task) => {
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
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/(tabs)/invites.tsx
```
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getInviteStatusTone } from "../../../src/lib/status-maps";
import { useInvitesScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function InvitesTabScreen() {
  const invitesQuery = useInvitesScreenQuery();

  return (
    <Screen
      title="Invites"
      subtitle="Invite logic stays single-layer only. Effective and invalid states must remain explainable."
    >
      <DemoBanner />

      {invitesQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing invite overview"
          description="Invite summary and invite records now flow through the mobile repository layer."
        />
      ) : null}

      {invitesQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Invite overview is unavailable"
          description="Retry the repository-backed invite query."
          onRetry={() => {
            void invitesQuery.refetch();
          }}
        />
      ) : null}

      {invitesQuery.data ? (
        <>
          <SectionCard title="My invite code" description="Binding stays optional and time-limited for MVP.">
            <Text>Invite code: {invitesQuery.data.inviteCode}</Text>
            <Text>Effective invites help later wallet activation or trust flow, depending on backend rules.</Text>
          </SectionCard>

          <SectionCard title="Invite records" description="The UI must clearly show BOUND / PENDING_EFFECTIVE / EFFECTIVE / INVALID.">
            <View style={{ gap: 12 }}>
              {invitesQuery.data.records.map((record) => (
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
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/(tabs)/wallet.tsx
```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getWithdrawalStatusTone } from "../../../src/lib/status-maps";
import { useWalletScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function WalletTabScreen() {
  const walletQuery = useWalletScreenQuery();

  return (
    <Screen
      title="Wallet"
      subtitle="Cashback enters pending first. Only later, after the release path is satisfied, it may become withdrawable."
    >
      <DemoBanner />

      {walletQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing wallet overview"
          description="Wallet balances, ledger preview, and withdrawal records now flow through the mobile repository layer."
        />
      ) : null}

      {walletQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Wallet overview is unavailable"
          description="Retry the repository-backed wallet query."
          onRetry={() => {
            void walletQuery.refetch();
          }}
        />
      ) : null}

      {walletQuery.data ? (
        <>
          <SectionCard title="Balances" description="Frontend should never show a negative wallet. Recoverable debt stays internal and only shows a general settlement hint when necessary.">
            <KeyValueRow label="Pending" value={formatMinorMoney(walletQuery.data.wallet.pendingBalanceMinor)} emphasize />
            <KeyValueRow label="Available" value={formatMinorMoney(walletQuery.data.wallet.availableBalanceMinor)} emphasize />
            <KeyValueRow label="Frozen" value={formatMinorMoney(walletQuery.data.wallet.frozenBalanceMinor)} emphasize />
            <Text>Activation path: {walletQuery.data.wallet.activationLabel}</Text>
            {walletQuery.data.wallet.showRecoverableDebtHint ? <Text>There is a settlement exception to resolve.</Text> : null}
            <PrimaryButton label="Go to withdraw" onPress={() => router.push("/(app)/wallet/withdraw")} />
          </SectionCard>

          <SectionCard title="Withdrawal records" description="Submitted withdrawals freeze available balance until approval or rejection.">
            <View style={{ gap: 12 }}>
              {walletQuery.data.withdrawals.map((item) => (
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
              {walletQuery.data.ledgers.map((ledger) => (
                <NavRow
                  key={ledger.id}
                  label={ledger.title}
                  description={formatDateTime(ledger.createdAt)}
                  rightSlot={<Text>{formatMinorMoney(ledger.amountMinor)}</Text>}
                />
              ))}
            </View>
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/(tabs)/me.tsx
```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useProfileScreenQuery } from "../../../src/queries/use-mobile-queries";

export default function MeTabScreen() {
  const profileQuery = useProfileScreenQuery();

  return (
    <Screen
      title="Me"
      subtitle="Keep profile, security, legal pages, support, and delete account entry easy to find."
    >
      <DemoBanner />

      {profileQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing account overview"
          description="Profile summary now reads from a screen query instead of a direct page import."
        />
      ) : null}

      {profileQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Account overview is unavailable"
          description="Retry the profile query."
          onRetry={() => {
            void profileQuery.refetch();
          }}
        />
      ) : null}

      {profileQuery.data ? (
        <>
          <SectionCard title={profileQuery.data.profile.displayName} description={profileQuery.data.profile.phoneNumber}>
            <Text>{profileQuery.data.profile.marketLabel}</Text>
            <Text>{profileQuery.data.profile.timezoneLabel}</Text>
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
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/product/[productId].tsx
```
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useProductDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function ProductDetailScreen() {
  const params = useLocalSearchParams<{ productId: string | string[] }>();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId || "prod-earbuds";
  const productQuery = useProductDetailQuery(productId);
  const { config } = useRuntimeConfig();
  const [quantity, setQuantity] = useState(1);

  const totalMinor = (productQuery.data?.priceMinor ?? 0) * quantity;

  return (
    <Screen
      title={productQuery.data?.title ?? "Product"}
      subtitle="One order contains one product only, but quantity may be greater than one."
    >
      <DemoBanner />

      {productQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing product detail"
          description="Product detail now reads through a repository-backed query."
        />
      ) : null}

      {productQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Product detail is unavailable"
          description="Retry the product detail query."
          onRetry={() => {
            void productQuery.refetch();
          }}
        />
      ) : null}

      {productQuery.data ? (
        <>
          <SectionCard title="Product summary" description={productQuery.data.subtitle}>
            <KeyValueRow label="Unit price" value={formatMinorMoney(productQuery.data.priceMinor)} />
            <KeyValueRow label="Queue cashback cap" value={formatMinorMoney(productQuery.data.cashbackCapMinor)} />
            <KeyValueRow label="Stock hint" value={productQuery.data.stockLabel} />
            <Text>The frontend may show summary hints, but queue eligibility and price truth stay on backend snapshots.</Text>
          </SectionCard>

          <SectionCard title="Choose quantity" description={`Default max quantity fallback: ${config.defaultOrderMaxQty}`}>
            <View style={{ gap: 10 }}>
              <KeyValueRow label="Quantity" value={String(quantity)} />
              <KeyValueRow label="Estimated subtotal" value={formatMinorMoney(totalMinor)} />
              <View style={{ flexDirection: "row", gap: 10 }}>
                <PrimaryButton label="-1" disabled={quantity <= 1} onPress={() => setQuantity((value) => Math.max(1, value - 1))} />
                <PrimaryButton label="+1" disabled={quantity >= config.defaultOrderMaxQty} onPress={() => setQuantity((value) => Math.min(config.defaultOrderMaxQty, value + 1))} />
              </View>
            </View>
          </SectionCard>

          <SectionCard title="Checkout path" description="There is no cart in MVP. The route goes straight from product detail to checkout.">
            <PrimaryButton
              label="Continue to checkout"
              onPress={() =>
                router.push({
                  pathname: "/(app)/checkout/[productId]",
                  params: { productId, quantity: String(quantity) }
                })
              }
            />
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/checkout/[productId].tsx
```
import { useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatMinorMoney } from "@queuefree/shared";
import { CheckboxRow } from "../../../src/components/checkbox-row";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useProductDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function CheckoutScreen() {
  const params = useLocalSearchParams<{ productId: string | string[]; quantity?: string | string[] }>();
  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId || "prod-earbuds";
  const requestedQuantity = Array.isArray(params.quantity) ? params.quantity[0] : params.quantity;
  const quantity = useMemo(() => Math.max(1, Number(requestedQuantity || 1)), [requestedQuantity]);
  const productQuery = useProductDetailQuery(productId);
  const [agreed, setAgreed] = useState(false);

  return (
    <Screen
      title="Checkout"
      subtitle="The order snapshot stays product-specific. Quantity changes money, not queue seat count."
    >
      {productQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing checkout snapshot"
          description="Checkout now reads the selected product through the repository-backed query layer."
        />
      ) : null}

      {productQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Checkout snapshot is unavailable"
          description="Retry the product query."
          onRetry={() => {
            void productQuery.refetch();
          }}
        />
      ) : null}

      {productQuery.data ? (
        <>
          <SectionCard title="Order snapshot" description="One order, one product, many quantity units allowed.">
            <KeyValueRow label="Product" value={productQuery.data.title} />
            <KeyValueRow label="Quantity" value={String(quantity)} />
            <KeyValueRow label="Unit price" value={formatMinorMoney(productQuery.data.priceMinor)} />
            <KeyValueRow label="Estimated item subtotal" value={formatMinorMoney(productQuery.data.priceMinor * quantity)} emphasize />
            <Text>Shipping, tax, packaging, and extra service charges stay outside the eligible cashback base.</Text>
          </SectionCard>

          <SectionCard title="Address and rules" description="The final backend will snapshot address, product, price, and campaign details at order creation time.">
            <Text>Selected shipping address: demo local selection</Text>
            <Text>Queue seat count: 1 order = 1 queue seat</Text>
            <CheckboxRow label="I understand that payment success may create one queue entry for this order." checked={agreed} onPress={() => setAgreed((value) => !value)} />
          </SectionCard>

          <SectionCard title="Payment action" description="The real backend later provides payment intent creation through the generated client.">
            <PrimaryButton
              label="Complete demo payment"
              disabled={!agreed}
              onPress={() =>
                router.replace({
                  pathname: "/(app)/orders/success/[orderId]",
                  params: { orderId: `order-${productId}` }
                })
              }
            />
          </SectionCard>
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/orders/success/[orderId].tsx
```
import { router, useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { KeyValueRow } from "../../../../src/components/key-value-row";
import { PrimaryButton } from "../../../../src/components/primary-button";
import { QueryStateCard } from "../../../../src/components/query-state-card";
import { Screen } from "../../../../src/components/screen";
import { SectionCard } from "../../../../src/components/section-card";
import { useOrderSuccessQuery } from "../../../../src/queries/use-mobile-queries";

export default function OrderSuccessScreen() {
  const params = useLocalSearchParams<{ orderId: string | string[] }>();
  const orderId = Array.isArray(params.orderId) ? params.orderId[0] : params.orderId || "order-demo";
  const orderQuery = useOrderSuccessQuery(orderId);

  return (
    <Screen
      title="Order paid"
      subtitle="Payment success is not the end page. It should turn into the queue conversion page."
    >
      {orderQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing queue conversion summary"
          description="Order success now reads its demo summary through the repository-backed query layer."
        />
      ) : null}

      {orderQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Queue conversion summary is unavailable"
          description="Retry the order-success query."
          onRetry={() => {
            void orderQuery.refetch();
          }}
        />
      ) : null}

      {orderQuery.data ? (
        <>
          <SectionCard title="Payment result" description="The real backend will create the queue entry after successful payment and basic risk pass.">
            <KeyValueRow label="Order ID" value={orderId} />
            <KeyValueRow label="Queue item" value={orderQuery.data.summary.title} />
            <KeyValueRow label="Current effective rank" value={orderQuery.data.summary.rankLabel} />
            <KeyValueRow label="Next settlement slot" value={orderQuery.data.summary.nextSlotLabel} />
            <KeyValueRow label="Eligible cashback base" value={orderQuery.data.summary.cashbackLabel} />
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
                params: { entryId: orderQuery.data.entryId }
              })
            }
          />
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/queue/[entryId].tsx
```
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";
import { formatDateTime, formatMinorMoney } from "@queuefree/shared";
import { DemoBanner } from "../../../src/components/demo-banner";
import { KeyValueRow } from "../../../src/components/key-value-row";
import { NavRow } from "../../../src/components/nav-row";
import { PrimaryButton } from "../../../src/components/primary-button";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { StatusPill } from "../../../src/components/status-pill";
import { getQueueStatusTone } from "../../../src/lib/status-maps";
import { useRuntimeConfig } from "../../../src/hooks/use-runtime-config";
import { useQueueEntryDetailQuery } from "../../../src/queries/use-mobile-queries";

export default function QueueDetailScreen() {
  const params = useLocalSearchParams<{ entryId: string | string[] }>();
  const entryId = Array.isArray(params.entryId) ? params.entryId[0] : params.entryId || "entry-1001";
  const entryQuery = useQueueEntryDetailQuery(entryId);
  const { config } = useRuntimeConfig();

  return (
    <Screen
      title="Queue detail"
      subtitle="This page explains rank, next slot, and queue events in a way the user can follow."
    >
      <DemoBanner />

      {entryQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing queue detail"
          description="Queue detail now reads through the repository-backed query boundary."
        />
      ) : null}

      {entryQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Queue detail is unavailable"
          description="Retry the queue-detail query."
          onRetry={() => {
            void entryQuery.refetch();
          }}
        />
      ) : null}

      {entryQuery.data ? (
        <>
          <SectionCard
            title={entryQuery.data.productTitle}
            description={`Order ${entryQuery.data.orderId}`}
            rightSlot={<StatusPill label={entryQuery.data.status} tone={getQueueStatusTone(entryQuery.data.status)} />}
          >
            <KeyValueRow label="Current effective rank" value={entryQuery.data.currentRank ? `#${entryQuery.data.currentRank}` : "Frozen or removed"} />
            <KeyValueRow label="Boost used" value={`${entryQuery.data.boostUsed} / ${config.boostLimitPerEntry}`} />
            <KeyValueRow label="Next settlement slot" value={formatDateTime(entryQuery.data.nextSlotAt)} />
            <KeyValueRow label="Eligible cashback base" value={formatMinorMoney(entryQuery.data.eligibleCashbackMinor)} emphasize />
          </SectionCard>

          <SectionCard title="What changed" description="All rank changes should map to explainable queue events later.">
            <View style={{ gap: 10 }}>
              <NavRow label="Paid order entered the public queue" description="Event source: payment success + risk pass" />
              <NavRow label="Active rank recalculated" description="Derived from active entries only" />
              <NavRow label="Top30 protection respected" description={`Best boost result cannot cross rank ${config.protectZoneSize + 1}`} />
            </View>
          </SectionCard>

          <PrimaryButton label="Back to queue tab" onPress={() => router.back()} />
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/rules/index.tsx
```
import { router } from "expo-router";
import { Text, View } from "react-native";
import { DemoBanner } from "../../../src/components/demo-banner";
import { NavRow } from "../../../src/components/nav-row";
import { QueryStateCard } from "../../../src/components/query-state-card";
import { Screen } from "../../../src/components/screen";
import { SectionCard } from "../../../src/components/section-card";
import { useRulesCenterQuery } from "../../../src/queries/use-mobile-queries";

export default function RulesCenterScreen() {
  const rulesQuery = useRulesCenterQuery();

  return (
    <Screen
      title="Rules center"
      subtitle="Rules are part of the product surface, not a hidden appendix."
    >
      <DemoBanner />

      <SectionCard title="Legal and help" description="Keep rules, privacy, terms, support, and delete-account pages easy to reach.">
        <View style={{ gap: 10 }}>
          <NavRow label="Queue rules" description="How ranking, Top30, and settlement slots work" onPress={() => router.push("/(app)/rules/queue")} />
          <NavRow label="Wallet rules" description="Pending, available, frozen, and withdrawal flow" onPress={() => router.push("/(app)/rules/wallet")} />
          <NavRow label="Activity rules" description="Current campaign-level rule page" onPress={() => router.push("/(app)/rules/activity/demo-campaign")} />
          <NavRow label="Privacy policy" description="How QueueFree handles personal data" onPress={() => router.push("/(app)/privacy")} />
          <NavRow label="Terms of service" description="Service contract and user obligations" onPress={() => router.push("/(app)/terms")} />
          <NavRow label="Support" description="Appeal and contact entry" onPress={() => router.push("/(app)/support")} />
          <NavRow label="Delete account" description="Request + settlement + anonymization path" onPress={() => router.push("/(app)/delete-account")} />
        </View>
      </SectionCard>

      {rulesQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing FAQ snapshot"
          description="Rule highlights now flow through the repository-backed query layer."
        />
      ) : null}

      {rulesQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="FAQ snapshot is unavailable"
          description="Retry the rules-center query."
          onRetry={() => {
            void rulesQuery.refetch();
          }}
        />
      ) : null}

      {rulesQuery.data ? (
        <SectionCard title="FAQ snapshot">
          <View style={{ gap: 8 }}>
            {rulesQuery.data.faq.map((item) => (
              <NavRow key={item} label={item} />
            ))}
          </View>
        </SectionCard>
      ) : null}
    </Screen>
  );
}
```

## apps/mobile/app/(app)/delete-account.tsx
```
import { useMemo, useState } from "react";
import { Text, View } from "react-native";
import { ACCOUNT_DELETE_STATUSES } from "@queuefree/shared";
import { PrimaryButton } from "../../src/components/primary-button";
import { QueryStateCard } from "../../src/components/query-state-card";
import { Screen } from "../../src/components/screen";
import { SectionCard } from "../../src/components/section-card";
import { StatusPill } from "../../src/components/status-pill";
import { getAccountDeleteStatusTone } from "../../src/lib/status-maps";
import { useDeleteAccountPreviewQuery } from "../../src/queries/use-mobile-queries";

export default function DeleteAccountScreen() {
  const [submitted, setSubmitted] = useState(false);
  const deleteQuery = useDeleteAccountPreviewQuery();
  const currentStatus = useMemo(() => (submitted ? ACCOUNT_DELETE_STATUSES[1] : ACCOUNT_DELETE_STATUSES[0]), [submitted]);

  return (
    <Screen
      title="Delete account"
      subtitle="Deletion in this product is not a simple disable action. It is request + settlement + anonymization."
    >
      {deleteQuery.isPending ? (
        <QueryStateCard
          mode="loading"
          title="Preparing deletion guidance"
          description="Deletion guidance now reads through the repository-backed query layer."
        />
      ) : null}

      {deleteQuery.isError ? (
        <QueryStateCard
          mode="error"
          title="Deletion guidance is unavailable"
          description="Retry the delete-account preview query."
          onRetry={() => {
            void deleteQuery.refetch();
          }}
        />
      ) : null}

      {deleteQuery.data ? (
        <>
          <SectionCard
            title="Deletion lifecycle"
            description="The final backend should drive these states."
            rightSlot={<StatusPill label={currentStatus} tone={getAccountDeleteStatusTone(currentStatus)} />}
          >
            <View style={{ gap: 8 }}>
              {deleteQuery.data.statuses.map((status) => (
                <Text key={status}>• {status}</Text>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Before you submit" description="Show blockers, impact, and unsettled items clearly.">
            <View style={{ gap: 8 }}>
              {deleteQuery.data.blockers.map((item) => (
                <Text key={item}>• {item}</Text>
              ))}
            </View>
          </SectionCard>

          <SectionCard title="Impact notes" description="The deletion path stays request + settlement + anonymization.">
            <View style={{ gap: 8 }}>
              {deleteQuery.data.impactNotes.map((item) => (
                <Text key={item}>• {item}</Text>
              ))}
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
        </>
      ) : null}
    </Screen>
  );
}
```

## apps/admin/package.json
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
    "@tanstack/react-query": "^5.66.0",
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

## apps/admin/app/layout.tsx
```
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AdminAppProviders } from '@/providers/admin-app-providers';
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
      <body className={inter.className}>
        <AdminAppProviders>{children}</AdminAppProviders>
      </body>
    </html>
  );
}
```

## apps/admin/app/(console)/page.tsx
```
import { DashboardScreen } from '@/components/dashboard-screen';

export default function DashboardPage(): React.ReactElement {
  return <DashboardScreen />;
}
```

## apps/admin/src/providers/query-provider.tsx
```
'use client';

import { PropsWithChildren, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }: PropsWithChildren): React.ReactElement {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: 60_000
          }
        }
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```

## apps/admin/src/providers/admin-app-providers.tsx
```
'use client';

import { PropsWithChildren } from 'react';
import { QueryProvider } from '@/providers/query-provider';

export function AdminAppProviders({ children }: PropsWithChildren): React.ReactElement {
  return <QueryProvider>{children}</QueryProvider>;
}
```

## apps/admin/src/lib/mock-delay.ts
```
export async function waitForMock(delayMs = 140): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, delayMs));
}
```

## apps/admin/src/lib/admin-repository.ts
```
import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable,
  getDetailPageConfig,
  getListPageConfig,
  type DetailPageConfig,
  type ListPageConfig,
  type Metric
} from '@/lib/admin-content';
import type { DataTableConfig } from '@/components/ui/data-table';
import { waitForMock } from '@/lib/mock-delay';

export type AdminDashboardData = {
  metrics: Metric[];
  queueTable: DataTableConfig;
  walletTable: DataTableConfig;
  backlogTable: DataTableConfig;
  riskNotes: string[];
};

export type AdminListPageKind = Parameters<typeof getListPageConfig>[0];
export type AdminDetailPageKind = Parameters<typeof getDetailPageConfig>[0];

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  await waitForMock();
  return {
    metrics: dashboardMetrics,
    queueTable: dashboardQueueTable,
    walletTable: dashboardWalletTable,
    backlogTable: dashboardBacklogTable,
    riskNotes: dashboardRiskNotes
  };
}

export async function fetchAdminListPageConfig(kind: AdminListPageKind): Promise<ListPageConfig> {
  await waitForMock();
  return getListPageConfig(kind);
}

export async function fetchAdminDetailPageConfig(kind: AdminDetailPageKind, id: string): Promise<DetailPageConfig> {
  await waitForMock();
  return getDetailPageConfig(kind, id);
}
```

## apps/admin/src/queries/use-admin-queries.ts
```
'use client';

import { useQuery } from '@tanstack/react-query';
import {
  fetchAdminDashboardData,
  fetchAdminDetailPageConfig,
  fetchAdminListPageConfig,
  type AdminDetailPageKind,
  type AdminListPageKind
} from '@/lib/admin-repository';

export function useAdminDashboardQuery() {
  return useQuery({
    queryKey: ['admin', 'dashboard-summary'],
    queryFn: fetchAdminDashboardData
  });
}

export function useAdminListPageQuery(kind: AdminListPageKind) {
  return useQuery({
    queryKey: ['admin', 'list-page', kind],
    queryFn: () => fetchAdminListPageConfig(kind)
  });
}

export function useAdminDetailPageQuery(kind: AdminDetailPageKind, id: string) {
  return useQuery({
    queryKey: ['admin', 'detail-page', kind, id],
    queryFn: () => fetchAdminDetailPageConfig(kind, id),
    enabled: Boolean(id)
  });
}
```

## apps/admin/src/components/query-state-panel.tsx
```
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type QueryStatePanelProps = {
  title: string;
  description: string;
  mode: 'loading' | 'error';
  onRetry?: () => void;
};

export function QueryStatePanel({ title, description, mode, onRetry }: QueryStatePanelProps): React.ReactElement {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {mode === 'loading' ? 'Loading skeleton data' : 'Unable to load skeleton data'}
          </p>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
        {mode === 'loading' ? (
          <p className="rounded-2xl border border-border bg-panel-muted px-4 py-3 text-sm text-slate-600">
            Fetching demo-mode screen data through the admin repository layer.
          </p>
        ) : null}
        {mode === 'error' && onRetry ? <Button onClick={onRetry}>Retry demo query</Button> : null}
      </CardContent>
    </Card>
  );
}
```

## apps/admin/src/components/dashboard-screen.tsx
```
'use client';

import { formatDateTime, LAUNCH_MARKET, LAUNCH_RULE_VERSION, LAUNCH_TIMEZONE } from '@queuefree/shared';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { QueryStatePanel } from '@/components/query-state-panel';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminDashboardQuery } from '@/queries/use-admin-queries';

const generatedAt = formatDateTime('2026-03-11T08:00:00.000Z');

export function DashboardScreen(): React.ReactElement {
  const dashboardQuery = useAdminDashboardQuery();

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

        {dashboardQuery.isPending ? (
          <QueryStatePanel
            mode="loading"
            title="Preparing admin dashboard"
            description="Dashboard data now flows through the app-local repository instead of direct page-level imports."
          />
        ) : null}

        {dashboardQuery.isError ? (
          <QueryStatePanel
            mode="error"
            title="Admin dashboard is unavailable"
            description="Retry the repository-backed dashboard query."
            onRetry={() => {
              void dashboardQuery.refetch();
            }}
          />
        ) : null}

        {dashboardQuery.data ? (
          <>
            <section className="grid gap-4 lg:grid-cols-4">
              {dashboardQuery.data.metrics.map((metric) => (
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
                  <DataTable columns={dashboardQuery.data.queueTable.columns} rows={dashboardQuery.data.queueTable.rows} />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle
                    title="Funds and approvals"
                    description="Withdrawal review and pending release items remain mock-only in this batch."
                  />
                  <DataTable columns={dashboardQuery.data.walletTable.columns} rows={dashboardQuery.data.walletTable.rows} />
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
                  <DataTable columns={dashboardQuery.data.backlogTable.columns} rows={dashboardQuery.data.backlogTable.rows} />
                </CardContent>
              </Card>
              <Card>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title="Guardrails for this batch" description="What stays intentionally out of scope in batch 7." />
                  <ul className="space-y-3 text-sm text-slate-600">
                    {dashboardQuery.data.riskNotes.map((note) => (
                      <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                        {note}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>
          </>
        ) : null}
      </div>
    </PageShell>
  );
}
```

## apps/admin/src/components/module-list-page.tsx
```
'use client';

import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { QueryStatePanel } from '@/components/query-state-panel';
import { SectionTitle } from '@/components/section-title';
import { DataTable } from '@/components/ui/data-table';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminListPageQuery } from '@/queries/use-admin-queries';
import type { AdminListPageKind } from '@/lib/admin-repository';

export function ModuleListPage({ kind }: { kind: AdminListPageKind }): React.ReactElement {
  const listQuery = useAdminListPageQuery(kind);

  return (
    <PageShell>
      <div className="space-y-8">
        {listQuery.data ? (
          <AdminPageHeader
            eyebrow={listQuery.data.eyebrow}
            title={listQuery.data.title}
            description={listQuery.data.description}
            meta={listQuery.data.meta}
          />
        ) : null}

        {!listQuery.data ? (
          <AdminPageHeader
            eyebrow="Admin skeleton"
            title="Loading module"
            description="Module config now flows through the admin repository layer."
            meta={[`Module: ${kind}`]}
          />
        ) : null}

        <AdminSkeletonBanner />

        {listQuery.isPending ? (
          <QueryStatePanel
            mode="loading"
            title="Preparing module list"
            description="This route now reads list-page config through a query hook and repository layer."
          />
        ) : null}

        {listQuery.isError ? (
          <QueryStatePanel
            mode="error"
            title="Module list is unavailable"
            description="Retry the repository-backed module query."
            onRetry={() => {
              void listQuery.refetch();
            }}
          />
        ) : null}

        {listQuery.data ? (
          <>
            {listQuery.data.metrics.length > 0 ? (
              <section className="grid gap-4 lg:grid-cols-4">
                {listQuery.data.metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </section>
            ) : null}

            <section className="grid gap-6 xl:grid-cols-[1.4fr,0.8fr]">
              <Card>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title={listQuery.data.tableTitle} description={listQuery.data.tableDescription} />
                  <DataTable columns={listQuery.data.table.columns} rows={listQuery.data.table.rows} emptyMessage={listQuery.data.table.emptyMessage} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="space-y-4 p-6">
                  <SectionTitle title="Current skeleton notes" description="These notes explain why the screen is intentionally static in batch 7." />
                  <ul className="space-y-3 text-sm text-slate-600">
                    {listQuery.data.notes.map((note) => (
                      <li key={note} className="rounded-2xl border border-border bg-panel-muted px-4 py-3">
                        {note}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {listQuery.data.secondaryTable ? (
              <section>
                <Card>
                  <CardContent className="space-y-4 p-6">
                    <SectionTitle title={listQuery.data.secondaryTable.title} description={listQuery.data.secondaryTable.description} />
                    <DataTable
                      columns={listQuery.data.secondaryTable.columns}
                      rows={listQuery.data.secondaryTable.rows}
                      emptyMessage={listQuery.data.secondaryTable.emptyMessage}
                    />
                  </CardContent>
                </Card>
              </section>
            ) : null}
          </>
        ) : null}
      </div>
    </PageShell>
  );
}
```

## apps/admin/src/components/module-detail-page.tsx
```
'use client';

import Link from 'next/link';
import { AdminPageHeader } from '@/components/admin-page-header';
import { AdminSkeletonBanner } from '@/components/admin-skeleton-banner';
import { MetricCard } from '@/components/metric-card';
import { PageShell } from '@/components/page-shell';
import { QueryStatePanel } from '@/components/query-state-panel';
import { SectionTitle } from '@/components/section-title';
import { Badge } from '@/components/ui/badge';
import { ButtonLink } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminDetailPageQuery } from '@/queries/use-admin-queries';
import type { AdminDetailPageKind } from '@/lib/admin-repository';

export function ModuleDetailPage({ kind, id }: { kind: AdminDetailPageKind; id: string }): React.ReactElement {
  const detailQuery = useAdminDetailPageQuery(kind, id);

  return (
    <PageShell>
      <div className="space-y-8">
        {detailQuery.data ? (
          <AdminPageHeader
            eyebrow={detailQuery.data.eyebrow}
            title={detailQuery.data.title}
            description={detailQuery.data.description}
            meta={detailQuery.data.meta}
          />
        ) : null}

        {!detailQuery.data ? (
          <AdminPageHeader
            eyebrow="Admin skeleton"
            title="Loading detail"
            description="Detail config now flows through the admin repository layer."
            meta={[`Module: ${kind}`, `Route param: ${id}`]}
          />
        ) : null}

        <AdminSkeletonBanner />

        {detailQuery.isPending ? (
          <QueryStatePanel
            mode="loading"
            title="Preparing detail screen"
            description="This route now reads detail-page config through a query hook and repository layer."
          />
        ) : null}

        {detailQuery.isError ? (
          <QueryStatePanel
            mode="error"
            title="Detail screen is unavailable"
            description="Retry the repository-backed detail query."
            onRetry={() => {
              void detailQuery.refetch();
            }}
          />
        ) : null}

        {detailQuery.data ? (
          <>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={detailQuery.data.badgeTone}>{detailQuery.data.badgeLabel}</Badge>
              <ButtonLink href={detailQuery.data.backHref} variant="secondary">
                Back to list
              </ButtonLink>
            </div>

            {detailQuery.data.metrics.length > 0 ? (
              <section className="grid gap-4 lg:grid-cols-4">
                {detailQuery.data.metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </section>
            ) : null}

            <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
              <div className="space-y-6">
                {detailQuery.data.sections.map((section) => (
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
                      {detailQuery.data.actions.map((action) => (
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
                      {detailQuery.data.notes.map((note) => (
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
                      {detailQuery.data.relatedLinks.map((link) => (
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
          </>
        ) : null}
      </div>
    </PageShell>
  );
}
```

## apps/admin/app/(console)/audit/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Audit logs'
};

export default function AuditPage(): React.ReactElement {
  return <ModuleListPage kind="audit" />;
}
```

## apps/admin/app/(console)/campaigns/[campaignId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Campaign detail'
};

export default function CampaignDetailPage({ params }: { params: { campaignId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="campaign" id={params.campaignId} />;
}
```

## apps/admin/app/(console)/campaigns/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Campaigns'
};

export default function CampaignsPage(): React.ReactElement {
  return <ModuleListPage kind="campaigns" />;
}
```

## apps/admin/app/(console)/governance/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Governance'
};

export default function GovernancePage(): React.ReactElement {
  return <ModuleListPage kind="governance" />;
}
```

## apps/admin/app/(console)/invites/[relationId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Invite detail'
};

export default function InviteDetailPage({ params }: { params: { relationId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="invite" id={params.relationId} />;
}
```

## apps/admin/app/(console)/invites/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Invites'
};

export default function InvitesPage(): React.ReactElement {
  return <ModuleListPage kind="invites" />;
}
```

## apps/admin/app/(console)/orders/[orderId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Order detail'
};

export default function OrderDetailPage({ params }: { params: { orderId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="order" id={params.orderId} />;
}
```

## apps/admin/app/(console)/orders/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Orders'
};

export default function OrdersPage(): React.ReactElement {
  return <ModuleListPage kind="orders" />;
}
```

## apps/admin/app/(console)/products/[productId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Product detail'
};

export default function ProductDetailPage({ params }: { params: { productId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="product" id={params.productId} />;
}
```

## apps/admin/app/(console)/products/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Products'
};

export default function ProductsPage(): React.ReactElement {
  return <ModuleListPage kind="products" />;
}
```

## apps/admin/app/(console)/queues/[entryId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Queue detail'
};

export default function QueueDetailPage({ params }: { params: { entryId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="queue" id={params.entryId} />;
}
```

## apps/admin/app/(console)/queues/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Queues'
};

export default function QueuesPage(): React.ReactElement {
  return <ModuleListPage kind="queues" />;
}
```

## apps/admin/app/(console)/risk/[caseId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Risk detail'
};

export default function RiskDetailPage({ params }: { params: { caseId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="risk" id={params.caseId} />;
}
```

## apps/admin/app/(console)/risk/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Risk cases'
};

export default function RiskPage(): React.ReactElement {
  return <ModuleListPage kind="risk" />;
}
```

## apps/admin/app/(console)/slots/[slotId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Slot detail'
};

export default function SlotDetailPage({ params }: { params: { slotId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="slot" id={params.slotId} />;
}
```

## apps/admin/app/(console)/slots/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Slots'
};

export default function SlotsPage(): React.ReactElement {
  return <ModuleListPage kind="slots" />;
}
```

## apps/admin/app/(console)/tasks/[taskId]/page.tsx
```
import { ModuleDetailPage } from '@/components/module-detail-page';

export const metadata = {
  title: 'Task detail'
};

export default function TaskDetailPage({ params }: { params: { taskId: string } }): React.ReactElement {
  return <ModuleDetailPage kind="task" id={params.taskId} />;
}
```

## apps/admin/app/(console)/tasks/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Tasks'
};

export default function TasksPage(): React.ReactElement {
  return <ModuleListPage kind="tasks" />;
}
```

## apps/admin/app/(console)/wallet/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Wallet'
};

export default function WalletPage(): React.ReactElement {
  return <ModuleListPage kind="wallet" />;
}
```

## apps/admin/app/(console)/withdrawals/page.tsx
```
import { ModuleListPage } from '@/components/module-list-page';

export const metadata = {
  title: 'Withdrawals'
};

export default function WithdrawalsPage(): React.ReactElement {
  return <ModuleListPage kind="withdrawals" />;
}
```

