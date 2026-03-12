# Batch 12 Changed File Contents

## `README-第12批-Generated-Bridge覆盖与SDK接线槽位.md` (new)
```md
# QueueFree 第 12 批：Generated Bridge 覆盖与 SDK 接线槽位

这批不是新增页面。

这批做的是：在不新增任何冻结项的前提下，把 mobile / admin / runtime-config 的 generated bridge 槽位与 coverage 门禁补齐。

## 你现在怎么用

1. 下载并解压本批压缩包
2. 用这批文件覆盖你本地仓库
3. 打开 VS Code
4. 打开终端
5. 依次运行：

```bash
pnpm install
pnpm verify:frontend-guardrails
pnpm dev:web
```

管理后台：

```bash
pnpm dev:admin
```

手机端：

```bash
pnpm dev:mobile
```

## 这批新增了什么

- mobile generated bridge manifest
- mobile runtime-config generated bridge manifest
- admin generated bridge manifest
- generated bridge coverage 校验脚本
- readiness coverage gate
- banner 可见性更新

## 当前仍然不是

- 真实后端接通版
- 真实鉴权版
- 真实 API 版

只有 backend 把 OpenAPI 导出来之后，前端才能继续把 generated bridge 真正实现掉。
```

## `apps/admin/src/adapters/admin-read-adapter.generated.ts` (modified)
```ts
import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind,
  AdminReadAdapter
} from './admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';
import {
  fetchAdminDashboardDataFromGeneratedBridge,
  fetchAdminDetailPageConfigFromGeneratedBridge,
  fetchAdminListPageConfigFromGeneratedBridge
} from '@/generated-bridge/admin-generated-screen-bridge';

export const generatedAdminReadAdapter: AdminReadAdapter = {
  fetchAdminDashboardData: () => fetchAdminDashboardDataFromGeneratedBridge(),
  fetchAdminListPageConfig: (kind: AdminListPageKind) => fetchAdminListPageConfigFromGeneratedBridge(kind),
  fetchAdminDetailPageConfig: (kind: AdminDetailPageKind, id: string) => fetchAdminDetailPageConfigFromGeneratedBridge(kind, id)
};

export type { AdminDashboardData, AdminDetailPageKind, AdminListPageKind, DetailPageConfig, ListPageConfig };
```

## `apps/admin/src/adapters/admin-read-adapter.readiness.ts` (modified)
```ts
import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';
import { getAdminGeneratedBridgeCoverageSummary } from '@/generated-bridge/admin-generated-bridge.manifest';

export type AdminGeneratedAdapterReadiness = {
  screenDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  coverageReady: boolean;
  bridgeCoverage: {
    total: number;
    wired: number;
    pending: number;
  };
  reasons: string[];
};

/**
 * Flip this to true only after Admin screen-model mapping is implemented against generated SDK methods.
 */
export const ADMIN_GENERATED_ADAPTER_READY = false;

export function getAdminGeneratedAdapterReadiness(): AdminGeneratedAdapterReadiness {
  const reasons: string[] = [];
  const bridgeCoverage = getAdminGeneratedBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!ADMIN_GENERATED_ADAPTER_READY) {
    reasons.push('Admin screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  if (!coverageReady) {
    reasons.push(`Admin generated bridge coverage is ${bridgeCoverage.wired}/${bridgeCoverage.total}.`);
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && ADMIN_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: ADMIN_GENERATED_ADAPTER_READY,
    coverageReady,
    bridgeCoverage,
    reasons
  };
}
```

## `apps/admin/src/components/admin-skeleton-banner.tsx` (modified)
```tsx
import { getAdminReadAdapterStatusSummary } from '@/adapters/admin-read-adapter.resolve';
import { Card, CardContent } from '@/components/ui/card';

export function AdminSkeletonBanner(): React.ReactElement {
  const status = getAdminReadAdapterStatusSummary();

  return (
    <Card className="border-brand/20 bg-brand-soft">
      <CardContent className="space-y-3 p-5">
        <div className="text-sm font-semibold text-slate-950">Admin Skeleton</div>
        <p className="text-sm text-slate-700">
          Data source: <span className="font-semibold">{status.screenDataMode}</span> · api-client mode:{' '}
          <span className="font-semibold">{status.apiClientRuntimeMode}</span> · screen-model validation:{' '}
          <span className="font-semibold">active</span>
        </p>
        <p className="text-sm text-slate-700">
          Generated bridge coverage: <span className="font-semibold">{status.bridgeCoverage.wired}</span> /{' '}
          <span className="font-semibold">{status.bridgeCoverage.total}</span>
        </p>
        <p className="text-sm text-slate-700">
          This batch is route-safe and registry-safe. Data, actions, and permissions are placeholders only. No real authentication, no real API,
          and no unregistered contract has been added here.
        </p>
        <ul className="space-y-2 text-sm text-slate-700">
          {status.reasons.map((reason) => (
            <li key={reason} className="rounded-2xl border border-brand/20 bg-white/70 px-3 py-2">
              {reason}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
```

## `apps/admin/src/generated-bridge/admin-generated-bridge.manifest.ts` (new)
```ts
import type { AdminReadAdapter } from '@/adapters/admin-read-adapter';

export type AdminGeneratedBridgeManifestEntry = {
  method: keyof AdminReadAdapter;
  bridge: string;
  wired: boolean;
  note: string;
};

export const adminGeneratedBridgeManifest = [
  {
    method: 'fetchAdminDashboardData',
    bridge: 'fetchAdminDashboardDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for admin dashboard summary tables.'
  },
  {
    method: 'fetchAdminListPageConfig',
    bridge: 'fetchAdminListPageConfigFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for admin list modules.'
  },
  {
    method: 'fetchAdminDetailPageConfig',
    bridge: 'fetchAdminDetailPageConfigFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for admin detail modules.'
  }
] satisfies ReadonlyArray<AdminGeneratedBridgeManifestEntry>;

export function getAdminGeneratedBridgeCoverageSummary() {
  const total = adminGeneratedBridgeManifest.length;
  const wired = adminGeneratedBridgeManifest.filter((entry) => entry.wired).length;

  return {
    total,
    wired,
    pending: total - wired
  };
}
```

## `apps/admin/src/generated-bridge/admin-generated-screen-bridge.ts` (new)
```ts
import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind
} from '@/adapters/admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';

async function unsupported<T>(bridgeMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree admin skeleton] ${bridgeMethod} is not wired yet. ` +
      'Backend must export registered OpenAPI first, then frontend can replace this generated bridge with DTO-to-screen-model mapping.'
  );
}

export async function fetchAdminDashboardDataFromGeneratedBridge(): Promise<AdminDashboardData> {
  return unsupported<AdminDashboardData>('fetchAdminDashboardDataFromGeneratedBridge');
}

export async function fetchAdminListPageConfigFromGeneratedBridge(
  _kind: AdminListPageKind
): Promise<ListPageConfig> {
  return unsupported<ListPageConfig>('fetchAdminListPageConfigFromGeneratedBridge');
}

export async function fetchAdminDetailPageConfigFromGeneratedBridge(
  _kind: AdminDetailPageKind,
  _id: string
): Promise<DetailPageConfig> {
  return unsupported<DetailPageConfig>('fetchAdminDetailPageConfigFromGeneratedBridge');
}
```

## `apps/mobile/src/adapters/mobile-read-adapter.generated.ts` (modified)
```ts
import type {
  DeleteAccountPreviewData,
  HomeScreenData,
  InvitesScreenData,
  MobileReadAdapter,
  OrderSuccessData,
  ProfileScreenData,
  QueueScreenData,
  RulesCenterData,
  TasksScreenData,
  WalletScreenData
} from './mobile-read-adapter';
import type {
  ProductCardModel,
  QueueEntryCardModel
} from '../models/mobile-screen-models';
import {
  fetchDeleteAccountPreviewFromGeneratedBridge,
  fetchHomeScreenDataFromGeneratedBridge,
  fetchInvitesScreenDataFromGeneratedBridge,
  fetchOrderSuccessDataFromGeneratedBridge,
  fetchProductDetailFromGeneratedBridge,
  fetchProfileScreenDataFromGeneratedBridge,
  fetchQueueEntryDetailFromGeneratedBridge,
  fetchQueueScreenDataFromGeneratedBridge,
  fetchRulesCenterDataFromGeneratedBridge,
  fetchTasksScreenDataFromGeneratedBridge,
  fetchWalletScreenDataFromGeneratedBridge
} from '../generated-bridge/mobile-generated-screen-bridge';

export const generatedMobileReadAdapter: MobileReadAdapter = {
  fetchHomeScreenData: () => fetchHomeScreenDataFromGeneratedBridge(),
  fetchQueueScreenData: () => fetchQueueScreenDataFromGeneratedBridge(),
  fetchTasksScreenData: () => fetchTasksScreenDataFromGeneratedBridge(),
  fetchInvitesScreenData: () => fetchInvitesScreenDataFromGeneratedBridge(),
  fetchWalletScreenData: () => fetchWalletScreenDataFromGeneratedBridge(),
  fetchProfileScreenData: () => fetchProfileScreenDataFromGeneratedBridge(),
  fetchProductDetail: (productId: string) => fetchProductDetailFromGeneratedBridge(productId),
  fetchQueueEntryDetail: (entryId: string) => fetchQueueEntryDetailFromGeneratedBridge(entryId),
  fetchRulesCenterData: () => fetchRulesCenterDataFromGeneratedBridge(),
  fetchOrderSuccessData: (orderId: string) => fetchOrderSuccessDataFromGeneratedBridge(orderId),
  fetchDeleteAccountPreview: () => fetchDeleteAccountPreviewFromGeneratedBridge()
};

export type {
  DeleteAccountPreviewData,
  HomeScreenData,
  InvitesScreenData,
  OrderSuccessData,
  ProfileScreenData,
  QueueScreenData,
  RulesCenterData,
  TasksScreenData,
  WalletScreenData,
  ProductCardModel,
  QueueEntryCardModel
};
```

## `apps/mobile/src/adapters/mobile-read-adapter.readiness.ts` (modified)
```ts
import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';
import { getMobileGeneratedBridgeCoverageSummary } from '../generated-bridge/mobile-generated-bridge.manifest';

export type MobileGeneratedAdapterReadiness = {
  screenDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  coverageReady: boolean;
  bridgeCoverage: {
    total: number;
    wired: number;
    pending: number;
  };
  reasons: string[];
};

/**
 * Flip this to true only after batch-level generated adapter mapping is implemented.
 * This keeps the repository safe even if packages/api-client has already been generated.
 */
export const MOBILE_GENERATED_ADAPTER_READY = false;

export function getMobileGeneratedAdapterReadiness(): MobileGeneratedAdapterReadiness {
  const reasons: string[] = [];
  const bridgeCoverage = getMobileGeneratedBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!MOBILE_GENERATED_ADAPTER_READY) {
    reasons.push('Mobile screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  if (!coverageReady) {
    reasons.push(`Mobile generated bridge coverage is ${bridgeCoverage.wired}/${bridgeCoverage.total}.`);
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && MOBILE_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: MOBILE_GENERATED_ADAPTER_READY,
    coverageReady,
    bridgeCoverage,
    reasons
  };
}
```

## `apps/mobile/src/adapters/runtime-config-adapter.generated.ts` (modified)
```ts
import type { RuntimeConfig } from '@queuefree/shared';
import type { RuntimeConfigAdapter } from './runtime-config-adapter';
import { getRuntimeConfigFromGeneratedBridge } from '../generated-bridge/runtime-config-generated-bridge';

export const generatedRuntimeConfigAdapter: RuntimeConfigAdapter = {
  getRuntimeConfig: () => getRuntimeConfigFromGeneratedBridge()
};

export type { RuntimeConfig };
```

## `apps/mobile/src/adapters/runtime-config-adapter.readiness.ts` (modified)
```ts
import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';
import { getRuntimeConfigGeneratedBridgeCoverageSummary } from '../generated-bridge/runtime-config-generated-bridge.manifest';

export type RuntimeConfigAdapterReadiness = {
  runtimeConfigMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  coverageReady: boolean;
  bridgeCoverage: {
    total: number;
    wired: number;
    pending: number;
  };
  reasons: string[];
};

/**
 * Flip this to true only after runtime-config wiring is implemented against generated SDK or another registered backend contract.
 */
export const RUNTIME_CONFIG_GENERATED_ADAPTER_READY = false;

export function getRuntimeConfigAdapterReadiness(): RuntimeConfigAdapterReadiness {
  const reasons: string[] = [];
  const bridgeCoverage = getRuntimeConfigGeneratedBridgeCoverageSummary();
  const coverageReady = bridgeCoverage.pending === 0;

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!RUNTIME_CONFIG_GENERATED_ADAPTER_READY) {
    reasons.push('Runtime config generated adapter wiring is intentionally disabled in this batch.');
  }

  if (!coverageReady) {
    reasons.push(`Runtime config generated bridge coverage is ${bridgeCoverage.wired}/${bridgeCoverage.total}.`);
  }

  return {
    runtimeConfigMode: API_CLIENT_IS_GENERATED && RUNTIME_CONFIG_GENERATED_ADAPTER_READY && coverageReady ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: RUNTIME_CONFIG_GENERATED_ADAPTER_READY,
    coverageReady,
    bridgeCoverage,
    reasons
  };
}
```

## `apps/mobile/src/components/demo-banner.tsx` (modified)
```tsx
import { StyleSheet, Text, View } from 'react-native';
import { mobileTheme } from '@queuefree/ui-tokens';
import { getMobileReadAdapterStatusSummary } from '../adapters/mobile-read-adapter.resolve';
import { getRuntimeConfigAdapterStatusSummary } from '../adapters/runtime-config-adapter.resolve';

export function DemoBanner() {
  const screenDataStatus = getMobileReadAdapterStatusSummary();
  const runtimeConfigStatus = getRuntimeConfigAdapterStatusSummary();

  return (
    <View style={styles.banner}>
      <Text style={styles.title}>Demo mode</Text>
      <Text style={styles.text}>
        Screen data: {screenDataStatus.screenDataMode} · Runtime config: {runtimeConfigStatus.runtimeConfigMode} · api-client:{' '}
        {screenDataStatus.apiClientRuntimeMode} · screen-model validation: active
      </Text>
      <Text style={styles.text}>
        Generated bridge coverage — screens: {screenDataStatus.bridgeCoverage.wired}/{screenDataStatus.bridgeCoverage.total} · runtime config:{' '}
        {runtimeConfigStatus.bridgeCoverage.wired}/{runtimeConfigStatus.bridgeCoverage.total}
      </Text>
      {screenDataStatus.reasons.map((reason) => (
        <Text key={`screen-${reason}`} style={styles.bullet}>
          • {reason}
        </Text>
      ))}
      {runtimeConfigStatus.reasons
        .filter((reason) => !screenDataStatus.reasons.includes(reason))
        .map((reason) => (
          <Text key={`runtime-${reason}`} style={styles.bullet}>
            • {reason}
          </Text>
        ))}
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
    fontWeight: '700'
  },
  text: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  },
  bullet: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 17
  }
});
```

## `apps/mobile/src/generated-bridge/mobile-generated-bridge.manifest.ts` (new)
```ts
import type { MobileReadAdapter } from '../adapters/mobile-read-adapter';

export type MobileGeneratedBridgeManifestEntry = {
  method: keyof MobileReadAdapter;
  bridge: string;
  wired: boolean;
  note: string;
};

export const mobileGeneratedBridgeManifest = [
  {
    method: 'fetchHomeScreenData',
    bridge: 'fetchHomeScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for products feed + next slot summary.'
  },
  {
    method: 'fetchQueueScreenData',
    bridge: 'fetchQueueScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for queue guard + queue entries list.'
  },
  {
    method: 'fetchTasksScreenData',
    bridge: 'fetchTasksScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for tasks list.'
  },
  {
    method: 'fetchInvitesScreenData',
    bridge: 'fetchInvitesScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for invite code + records.'
  },
  {
    method: 'fetchWalletScreenData',
    bridge: 'fetchWalletScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for wallet summary + ledgers + withdrawals.'
  },
  {
    method: 'fetchProfileScreenData',
    bridge: 'fetchProfileScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for me/profile overview.'
  },
  {
    method: 'fetchProductDetail',
    bridge: 'fetchProductDetailFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for product detail.'
  },
  {
    method: 'fetchQueueEntryDetail',
    bridge: 'fetchQueueEntryDetailFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for queue entry detail.'
  },
  {
    method: 'fetchRulesCenterData',
    bridge: 'fetchRulesCenterDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for rules/FAQ payload.'
  },
  {
    method: 'fetchOrderSuccessData',
    bridge: 'fetchOrderSuccessDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for order success / queue summary.'
  },
  {
    method: 'fetchDeleteAccountPreview',
    bridge: 'fetchDeleteAccountPreviewFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for delete-account preview and blockers.'
  }
] satisfies ReadonlyArray<MobileGeneratedBridgeManifestEntry>;

export function getMobileGeneratedBridgeCoverageSummary() {
  const total = mobileGeneratedBridgeManifest.length;
  const wired = mobileGeneratedBridgeManifest.filter((entry) => entry.wired).length;

  return {
    total,
    wired,
    pending: total - wired
  };
}
```

## `apps/mobile/src/generated-bridge/mobile-generated-screen-bridge.ts` (new)
```ts
import type {
  DeleteAccountPreviewData,
  HomeScreenData,
  InvitesScreenData,
  OrderSuccessData,
  ProfileScreenData,
  QueueScreenData,
  RulesCenterData,
  TasksScreenData,
  WalletScreenData
} from '../adapters/mobile-read-adapter';
import type { ProductCardModel, QueueEntryCardModel } from '../models/mobile-screen-models';

async function unsupported<T>(bridgeMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree mobile skeleton] ${bridgeMethod} is not wired yet. ` +
      'Backend must export registered OpenAPI first, then frontend can replace this generated bridge with DTO-to-screen-model mapping.'
  );
}

export async function fetchHomeScreenDataFromGeneratedBridge(): Promise<HomeScreenData> {
  return unsupported<HomeScreenData>('fetchHomeScreenDataFromGeneratedBridge');
}

export async function fetchQueueScreenDataFromGeneratedBridge(): Promise<QueueScreenData> {
  return unsupported<QueueScreenData>('fetchQueueScreenDataFromGeneratedBridge');
}

export async function fetchTasksScreenDataFromGeneratedBridge(): Promise<TasksScreenData> {
  return unsupported<TasksScreenData>('fetchTasksScreenDataFromGeneratedBridge');
}

export async function fetchInvitesScreenDataFromGeneratedBridge(): Promise<InvitesScreenData> {
  return unsupported<InvitesScreenData>('fetchInvitesScreenDataFromGeneratedBridge');
}

export async function fetchWalletScreenDataFromGeneratedBridge(): Promise<WalletScreenData> {
  return unsupported<WalletScreenData>('fetchWalletScreenDataFromGeneratedBridge');
}

export async function fetchProfileScreenDataFromGeneratedBridge(): Promise<ProfileScreenData> {
  return unsupported<ProfileScreenData>('fetchProfileScreenDataFromGeneratedBridge');
}

export async function fetchProductDetailFromGeneratedBridge(_productId: string): Promise<ProductCardModel> {
  return unsupported<ProductCardModel>('fetchProductDetailFromGeneratedBridge');
}

export async function fetchQueueEntryDetailFromGeneratedBridge(_entryId: string): Promise<QueueEntryCardModel> {
  return unsupported<QueueEntryCardModel>('fetchQueueEntryDetailFromGeneratedBridge');
}

export async function fetchRulesCenterDataFromGeneratedBridge(): Promise<RulesCenterData> {
  return unsupported<RulesCenterData>('fetchRulesCenterDataFromGeneratedBridge');
}

export async function fetchOrderSuccessDataFromGeneratedBridge(_orderId: string): Promise<OrderSuccessData> {
  return unsupported<OrderSuccessData>('fetchOrderSuccessDataFromGeneratedBridge');
}

export async function fetchDeleteAccountPreviewFromGeneratedBridge(): Promise<DeleteAccountPreviewData> {
  return unsupported<DeleteAccountPreviewData>('fetchDeleteAccountPreviewFromGeneratedBridge');
}
```

## `apps/mobile/src/generated-bridge/runtime-config-generated-bridge.manifest.ts` (new)
```ts
import type { RuntimeConfigAdapter } from '../adapters/runtime-config-adapter';

export type RuntimeConfigGeneratedBridgeManifestEntry = {
  method: keyof RuntimeConfigAdapter;
  bridge: string;
  wired: boolean;
  note: string;
};

export const runtimeConfigGeneratedBridgeManifest = [
  {
    method: 'getRuntimeConfig',
    bridge: 'getRuntimeConfigFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated SDK coverage for runtime config or another registered backend delivery path.'
  }
] satisfies ReadonlyArray<RuntimeConfigGeneratedBridgeManifestEntry>;

export function getRuntimeConfigGeneratedBridgeCoverageSummary() {
  const total = runtimeConfigGeneratedBridgeManifest.length;
  const wired = runtimeConfigGeneratedBridgeManifest.filter((entry) => entry.wired).length;

  return {
    total,
    wired,
    pending: total - wired
  };
}
```

## `apps/mobile/src/generated-bridge/runtime-config-generated-bridge.ts` (new)
```ts
import type { RuntimeConfig } from '@queuefree/shared';

export async function getRuntimeConfigFromGeneratedBridge(): Promise<RuntimeConfig> {
  throw new Error(
    '[QueueFree mobile skeleton] getRuntimeConfigFromGeneratedBridge is not wired yet. ' +
      'Replace it only after backend exports a registered runtime-config contract and packages/api-client is generated from OpenAPI.'
  );
}
```

## `docs/contracts/frontend-generated-adapter-readiness-v1.2.md` (modified)
```md
# Frontend Generated Adapter Readiness v1.2

状态：Batch 12 / Frontend

## 目标

在不新增任何 registry 冻结项的前提下，让前端明确区分下面 4 件事：

1. `packages/api-client` 是否仍是 placeholder
2. `packages/api-client` 是否已经由 OpenAPI 生成
3. 即使 SDK 已生成，screen-model mapping 是否已经写完
4. generated bridge 槽位是否已经全部补齐

## 为什么要加这一层

仅仅生成 SDK，并不代表 mobile / admin 已经具备可用的数据链路。

前端页面当前依赖的是 app-local screen model，而不是直接把 generated SDK response 丢给页面。
因此在 generated SDK 到位后，还需要额外一层 **mapping readiness** 和 **bridge coverage**。

## 当前规则

### packages/api-client

当前会对外导出：

- `API_CLIENT_RUNTIME_MODE`
- `API_CLIENT_IS_GENERATED`
- `loadGeneratedApiClient()`

这 3 个导出不是新的业务 contract，只是前端用来判断 SDK 当前所处模式的最小运行时信息。

### mobile

mobile 现在需要同时满足：

- `API_CLIENT_IS_GENERATED === true`
- `MOBILE_GENERATED_ADAPTER_READY === true`
- `bridgeCoverage.pending === 0`

否则继续走 mock adapter。

runtime config 也一样：

- `API_CLIENT_IS_GENERATED === true`
- `RUNTIME_CONFIG_GENERATED_ADAPTER_READY === true`
- `bridgeCoverage.pending === 0`

否则继续走 mock runtime config adapter。

### admin

admin 现在需要同时满足：

- `API_CLIENT_IS_GENERATED === true`
- `ADMIN_GENERATED_ADAPTER_READY === true`
- `bridgeCoverage.pending === 0`

否则继续走 mock adapter。

## 当前门禁脚本

### `pnpm verify:generated-adapter-bridge`

作用：

- 限制 `@queuefree/api-client` 只能出现在 `*.generated.ts`、`*.readiness.ts` 或 `generated-bridge` 文件
- 防止 page / query / repository / mock adapter 直接依赖 generated SDK
- 防止 generated adapter / bridge 偷偷引用 `demo-data` / `admin-content`

### `pnpm verify:generated-bridge-coverage`

作用：

- 校验 generated adapter 的每个方法都有对应的 bridge 槽位
- 校验 mobile / runtime-config / admin 的 bridge manifest 没有漏项或多项
- 在没有 OpenAPI 的阶段，也先把“未来接线位置”冻结住

## 当前结论

这批不是“已经接通真实后端”。

这批只是把 generated SDK readiness 的**可见性**、**切换门禁**和**bridge 覆盖率**补齐，避免后续 SDK 一生成，前端误以为所有 screen 已经完成真实接线。
```

## `docs/contracts/frontend-generated-bridge-coverage-v1.2.md` (new)
```md
# Frontend Generated Bridge Coverage v1.2

状态：Batch 12 / Frontend  
唯一规则源：`queuefree_prd_v1_2`

本文件不是新的共享契约。  
本文件只描述前端本地的 generated bridge 结构与覆盖率门禁。

## 背景

当前前端已经有：

- page
- query hook
- repository
- screen-model validation
- adapter switch

但在 backend 交付正式 OpenAPI 之前，还不能直接写真实 generated mapping。
为了避免后面 SDK 一到位就临时乱接，本批次先把 **generated bridge 槽位** 固定下来。

## 当前结构

### mobile

- `apps/mobile/src/adapters/mobile-read-adapter.generated.ts`
- `apps/mobile/src/generated-bridge/mobile-generated-screen-bridge.ts`
- `apps/mobile/src/generated-bridge/mobile-generated-bridge.manifest.ts`

### mobile runtime config

- `apps/mobile/src/adapters/runtime-config-adapter.generated.ts`
- `apps/mobile/src/generated-bridge/runtime-config-generated-bridge.ts`
- `apps/mobile/src/generated-bridge/runtime-config-generated-bridge.manifest.ts`

### admin

- `apps/admin/src/adapters/admin-read-adapter.generated.ts`
- `apps/admin/src/generated-bridge/admin-generated-screen-bridge.ts`
- `apps/admin/src/generated-bridge/admin-generated-bridge.manifest.ts`

## 规则

1. `*.generated.ts` 只负责 **委托** 到 generated bridge，不直接在文件里堆满 mapping 逻辑。
2. `generated-bridge` 是未来 DTO → screen-model mapping 的唯一落点。
3. page / query / repository 不允许直接 import `generated-bridge`。
4. 没有 OpenAPI 时，`generated-bridge` 只能抛出明确的 not wired 错误，不得猜 DTO 字段。
5. readiness 现在除了看 `API_CLIENT_IS_GENERATED` 与 `*_GENERATED_ADAPTER_READY`，还要看 `bridgeCoverage.pending === 0`。

## 目的

这批的目的不是“接通真实 SDK”，而是把真实 SDK **将来应该接在哪些文件、哪些方法、哪些屏幕** 先固定住。

这样后续 backend 一旦按 registry 导出最小只读 OpenAPI，前端只需要：

1. 生成 `packages/api-client`
2. 在 `generated-bridge` 中实现 DTO → screen-model mapping
3. 将对应 `wired` 改为 `true`
4. 最后再打开 `*_GENERATED_ADAPTER_READY`

顺序仍然不能反。
```

## `docs/contracts/frontend-guardrail-checks-v1.2.md` (modified)
```md
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

### 4. `pnpm verify:mock-data-boundary`

作用：

- 校验 page / query / repository 层没有直接偷用 `demo-data` 或 `admin-content`
- 把 mock 数据限定在 adapter / mock content 层

### 5. `pnpm verify:adapter-switch-boundary`

作用：

- 校验 app 内仍然使用 page → query hook → repository → adapter 的切换结构
- 防止页面直接跨层 import mock adapter 或 generated adapter
- 防止非 generated 层直接跨层 import `generated-bridge`

### 6. `pnpm verify:generated-adapter-bridge`

作用：

- 限制 `@queuefree/api-client` 只能出现在 `*.generated.ts`、`*.readiness.ts` 或 `generated-bridge`
- 防止 page / query / repository / mock adapter 直接依赖 generated SDK
- 防止 generated adapter / bridge 偷偷引用 mock content

### 7. `pnpm verify:generated-bridge-coverage`

作用：

- 校验 generated adapter 的每个方法都有对应的 generated bridge 槽位
- 校验 manifest 没有漏项或多项
- 把未来 DTO → screen-model mapping 的落点提前固定住

### 8. `pnpm verify:openapi-intake`

作用：

- 校验 backend 给出的 OpenAPI 输入文件是否合法
- 校验 path 前缀继续落在冻结 API 前缀范围内
- 校验 operationId 完整性

### 9. `pnpm verify:generated-api-client`

作用：

- 校验 spec、生成物、`packages/api-client/src/index.ts` 三者是否同步
- 校验 `packages/api-client/src` 没有长出额外手写业务文件

### 10. `pnpm verify:screen-model-validation`

作用：

- 校验 mobile / admin repository 必须对 adapter 返回值做 screen-model validation
- 校验 adapters 不直接依赖 schema / validator
- 校验 page route files 不直接依赖 schema / validator

### 11. `pnpm verify:frontend-guardrails`

作用：

- 串联执行上面所有校验
- 建议作为本地提交前的统一检查入口

## 设计目的

这批脚本不是为了新增功能，而是为了避免 7 类问题再次出现：

1. 前端偷偷长出未登记路径
2. 前端重新手写猜测型 API path / SDK
3. `packages/shared` 被污染成后端运行时代码仓库
4. generated SDK 直接泄漏到 page / query / repository 层
5. SDK 已生成但 screen-model mapping 尚未完成时，被误切到 generated 模式
6. mock / generated adapter 输出未经过统一 screen-model 校验就直接进入页面
7. generated adapter 方法数量与未来 bridge 槽位数量不一致

## 当前边界

在 backend 尚未导出正式 OpenAPI 之前，前端仍然保持：

- 页面骨架可继续做
- mock / placeholder 可继续做
- 真实 SDK 接入继续等待 OpenAPI 生成后再做
```

## `docs/handoffs/backend-next-steps-from-frontend-batch12.md` (new)
```md
# 给后端线程的衔接说明（Frontend Batch 12）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端本轮新增的是：

- generated bridge 槽位
- generated bridge coverage manifest
- readiness 增加 coverage gating

## 你现在最需要做什么

继续按既有 registry-first 顺序推进，不要口头给字段：

1. 先确认最小只读 OpenAPI 的冻结范围
2. 导出正式 OpenAPI
3. 生成 `packages/api-client`
4. 再让前端把 generated bridge 逐个实现

## 前端当前已经固定好的桥接槽位

### mobile

- fetchHomeScreenData
- fetchQueueScreenData
- fetchTasksScreenData
- fetchInvitesScreenData
- fetchWalletScreenData
- fetchProfileScreenData
- fetchProductDetail
- fetchQueueEntryDetail
- fetchRulesCenterData
- fetchOrderSuccessData
- fetchDeleteAccountPreview

### mobile runtime config

- getRuntimeConfig

### admin

- fetchAdminDashboardData
- fetchAdminListPageConfig
- fetchAdminDetailPageConfig

## 约束提醒

- 不要新增未登记 request / response 字段
- 不要让前端直接猜 DTO
- 先 registry / shared / OpenAPI，再前端消费
- 如果这轮你要改 API path、字段、状态、env、route，必须先更新 registry
```

## `docs/handoffs/server-next-steps-from-frontend-batch12.md` (new)
```md
# 给服务器线程的衔接说明（Frontend Batch 12）

本轮前端没有新增 env var，也没有修改任何冻结路由、域名或公开路径。

你这边本轮不需要新增：

- mobile env var
- web env var
- admin env var
- 公网域名
- Web 公共路径

## 你现在要维持的仍然是

- web: `queuefree.com`
- admin: `admin.queuefree.com`
- api: `api.queuefree.com`
- assets: `assets.queuefree.com`

## 等 backend OpenAPI 到位后，你再协助补

- CI 中 OpenAPI -> generated api-client -> frontend guardrails 的执行顺序
- staging 环境联调顺序
- 生成产物缓存与构建时机
- 如果需要，把 generated SDK 校验串进 PR / build pipeline

当前这轮只是把 generated bridge 槽位和 coverage gate 固定住，不涉及任何服务器侧新配置。
```

## `docs/handoffs/第12批-发给后端和服务器的话术.md` (new)
```md
从现在开始，前端线程已进入 Batch 12：Generated Bridge Coverage。

请后端和服务器继续严格遵守：

1. queuefree_prd_v1_2
2. queuefree-collaboration-contract-v1.2.md
3. registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

本轮前端没有新增任何冻结项，也没有新增 shared contract。

本轮前端新增的是：

- generated bridge 槽位
- generated bridge coverage manifest
- readiness coverage gate

当前 generated adapter 仍然不会启用真实链路，除非同时满足：

- packages/api-client 已由 OpenAPI 生成
- 对应 app 的 generated adapter ready 显式打开
- bridgeCoverage.pending === 0

后端下一步请继续优先提供最小只读 OpenAPI。
服务器线程本轮不要新增前端 env，也不要改动任何冻结路由、公开路径和域名。
```

## `package.json` (modified)
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
    "typecheck": "pnpm verify:frontend-guardrails && turbo run typecheck",
    "dev:web": "pnpm --filter @queuefree/web dev",
    "build:web": "pnpm --filter @queuefree/web build",
    "dev:admin": "pnpm --filter @queuefree/admin dev",
    "build:admin": "pnpm --filter @queuefree/admin build",
    "verify:registry-first-frontend": "node ./scripts/verify-registry-first-frontend.mjs",
    "typecheck:frontends": "pnpm verify:frontend-guardrails && turbo run typecheck --filter=@queuefree/shared --filter=@queuefree/ui-tokens --filter=@queuefree/api-client --filter=@queuefree/mobile --filter=@queuefree/web --filter=@queuefree/admin",
    "verify:route-registry": "node ./scripts/verify-route-registry.mjs",
    "verify:frontend-import-boundaries": "node ./scripts/verify-frontend-import-boundaries.mjs",
    "verify:mock-data-boundary": "node ./scripts/verify-mock-data-boundary.mjs",
    "verify:adapter-switch-boundary": "node ./scripts/verify-adapter-switch-boundary.mjs",
    "verify:openapi-intake": "node ./scripts/verify-openapi-intake.mjs",
    "verify:generated-api-client": "node ./scripts/verify-generated-api-client.mjs",
    "verify:frontend-openapi-pipeline": "pnpm verify:openapi-intake && pnpm verify:generated-api-client",
    "verify:frontend-guardrails": "pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries && pnpm verify:mock-data-boundary && pnpm verify:adapter-switch-boundary && pnpm verify:generated-adapter-bridge && pnpm verify:generated-bridge-coverage && pnpm verify:screen-model-validation && pnpm verify:openapi-intake && pnpm verify:generated-api-client",
    "generate:api-client": "node ./scripts/generate-api-client.mjs",
    "reset:api-client-placeholder": "node ./scripts/reset-api-client-placeholder.mjs",
    "verify:generated-adapter-bridge": "node ./scripts/verify-generated-adapter-bridge.mjs",
    "verify:screen-model-validation": "node ./scripts/verify-screen-model-validation-boundary.mjs",
    "verify:generated-bridge-coverage": "node ./scripts/verify-generated-bridge-coverage.mjs"
  },
  "devDependencies": {
    "openapi-typescript-codegen": "^0.29.0",
    "turbo": "^2.4.4",
    "typescript": "^5.8.3",
    "yaml": "^2.8.1"
  }
}
```

## `scripts/verify-adapter-switch-boundary.mjs` (modified)
```mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();

const checks = [
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'src'),
    blockedFragments: ['mobile-read-adapter.mock', 'mobile-read-adapter.generated'],
    description: 'mobile source files must not import concrete adapters directly',
    allowPatterns: [
      /src[\/]adapters[\/]mobile-read-adapter\.resolve\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.mock\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.generated\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'src'),
    blockedFragments: ['admin-read-adapter.mock', 'admin-read-adapter.generated'],
    description: 'admin source files must not import concrete adapters directly',
    allowPatterns: [
      /src[\/]adapters[\/]admin-read-adapter\.resolve\.ts$/,
      /src[\/]adapters[\/]admin-read-adapter\.mock\.ts$/,
      /src[\/]adapters[\/]admin-read-adapter\.generated\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'src'),
    blockedFragments: ['lib/demo-data'],
    description: 'mobile source files outside demo and mock-adapter layers must not import demo-data directly',
    allowPatterns: [
      /src[\/]lib[\/]demo-data\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.mock\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'src'),
    blockedFragments: ['lib/admin-content'],
    description: 'admin source files outside content and mock-adapter layers must not import admin-content directly',
    allowPatterns: [
      /src[\/]lib[\/]admin-content\.ts$/,
      /src[\/]adapters[\/]admin-read-adapter\.mock\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'src'),
    blockedFragments: ['generated-bridge/'],
    description: 'mobile source files must not import generated bridge directly outside generated adapter or generated-bridge layers',
    allowPatterns: [
      /src[\/]generated-bridge[\/].+\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.generated\.ts$/,
      /src[\/]adapters[\/]runtime-config-adapter\.generated\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.readiness\.ts$/,
      /src[\/]adapters[\/]runtime-config-adapter\.readiness\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'src'),
    blockedFragments: ['generated-bridge/'],
    description: 'admin source files must not import generated bridge directly outside generated adapter or generated-bridge layers',
    allowPatterns: [
      /src[\/]generated-bridge[\/].+\.ts$/,
      /src[\/]adapters[\/]admin-read-adapter\.generated\.ts$/,
      /src[\/]adapters[\/]admin-read-adapter\.readiness\.ts$/
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
  console.error('Adapter switch boundary violations found:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('verify-adapter-switch-boundary passed');
```

## `scripts/verify-generated-adapter-bridge.mjs` (modified)
```mjs
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const appRoots = [
  path.join(repoRoot, 'apps', 'mobile', 'src'),
  path.join(repoRoot, 'apps', 'admin', 'src')
];
const fileExtensions = new Set(['.ts', '.tsx', '.js', '.mjs']);
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

    if (!fileExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    const importsApiClient = text.includes('@queuefree/api-client');
    const isGeneratedAdapter = relPath.includes('/adapters/') && relPath.endsWith('.generated.ts');
    const isReadinessFile = relPath.includes('/adapters/') && relPath.endsWith('.readiness.ts');
    const isGeneratedBridge = relPath.includes('/generated-bridge/');

    if (importsApiClient && !isGeneratedAdapter && !isReadinessFile && !isGeneratedBridge) {
      violations.push(`${relPath}: @queuefree/api-client may only be imported inside adapter *.generated.ts, *.readiness.ts, or generated-bridge files.`);
    }

    if ((isGeneratedAdapter || isGeneratedBridge) && (text.includes('demo-data') || text.includes('admin-content'))) {
      violations.push(`${relPath}: generated adapter/bridge must not import mock/demo content sources.`);
    }

    if (isGeneratedBridge && (text.includes('.mock') || text.includes('mockMobileReadAdapter') || text.includes('mockAdminReadAdapter'))) {
      violations.push(`${relPath}: generated bridge must not depend on mock adapters.`);
    }
  }
}

for (const root of appRoots) {
  walk(root);
}

if (violations.length > 0) {
  console.error('Generated adapter bridge verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Generated adapter bridge verified. api-client imports stay inside generated/readiness/bridge files only.');
```

## `scripts/verify-generated-bridge-coverage.mjs` (new)
```mjs
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const violations = [];

const configs = [
  {
    name: 'mobile read adapter',
    interfaceFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'mobile-read-adapter.ts'),
    generatedFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'mobile-read-adapter.generated.ts'),
    manifestFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-bridge.manifest.ts'),
    bridgeFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-screen-bridge.ts')
  },
  {
    name: 'mobile runtime-config adapter',
    interfaceFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'runtime-config-adapter.ts'),
    generatedFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'runtime-config-adapter.generated.ts'),
    manifestFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'runtime-config-generated-bridge.manifest.ts'),
    bridgeFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'runtime-config-generated-bridge.ts')
  },
  {
    name: 'admin read adapter',
    interfaceFile: path.join(repoRoot, 'apps', 'admin', 'src', 'adapters', 'admin-read-adapter.ts'),
    generatedFile: path.join(repoRoot, 'apps', 'admin', 'src', 'adapters', 'admin-read-adapter.generated.ts'),
    manifestFile: path.join(repoRoot, 'apps', 'admin', 'src', 'generated-bridge', 'admin-generated-bridge.manifest.ts'),
    bridgeFile: path.join(repoRoot, 'apps', 'admin', 'src', 'generated-bridge', 'admin-generated-screen-bridge.ts')
  }
];

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractTypeAliasMethods(fileText, typeName) {
  const start = fileText.indexOf(`export type ${typeName} = {`);
  if (start === -1) {
    return [];
  }
  const body = fileText.slice(start, fileText.indexOf('};', start));
  const methods = [];
  const methodPattern = /^\s*([A-Za-z0-9_]+)\s*\(/gm;
  for (const match of body.matchAll(methodPattern)) {
    methods.push(match[1]);
  }
  return methods;
}

function extractManifestMethods(fileText) {
  return [...fileText.matchAll(/method:\s*'([^']+)'/g)].map((match) => match[1]);
}

function bridgeNameForMethod(method) {
  return `${method}FromGeneratedBridge`;
}

for (const config of configs) {
  for (const file of [config.interfaceFile, config.generatedFile, config.manifestFile, config.bridgeFile]) {
    if (!fs.existsSync(file)) {
      violations.push(`${config.name}: missing file ${path.relative(repoRoot, file)}`);
    }
  }
  if (violations.length > 0) {
    continue;
  }

  const interfaceText = read(config.interfaceFile);
  const generatedText = read(config.generatedFile);
  const manifestText = read(config.manifestFile);
  const bridgeText = read(config.bridgeFile);

  const typeName = path.basename(config.interfaceFile) === 'admin-read-adapter.ts'
    ? 'AdminReadAdapter'
    : path.basename(config.interfaceFile) === 'runtime-config-adapter.ts'
      ? 'RuntimeConfigAdapter'
      : 'MobileReadAdapter';

  const expectedMethods = extractTypeAliasMethods(interfaceText, typeName);
  const manifestMethods = extractManifestMethods(manifestText);

  for (const method of expectedMethods) {
    if (!manifestMethods.includes(method)) {
      violations.push(`${config.name}: manifest missing method ${method}`);
    }

    const bridgeName = bridgeNameForMethod(method);
    if (!bridgeText.includes(`function ${bridgeName}`) && !bridgeText.includes(`function ${bridgeName}(`)) {
      violations.push(`${config.name}: bridge file missing export ${bridgeName}`);
    }

    if (!generatedText.includes(bridgeName)) {
      violations.push(`${config.name}: generated adapter not delegating via ${bridgeName}`);
    }
  }

  for (const method of manifestMethods) {
    if (!expectedMethods.includes(method)) {
      violations.push(`${config.name}: manifest contains extra method ${method}`);
    }
  }
}

if (violations.length > 0) {
  console.error('Generated bridge coverage verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Generated bridge coverage verified. Every generated adapter method has a bridge slot and manifest entry.');
```
