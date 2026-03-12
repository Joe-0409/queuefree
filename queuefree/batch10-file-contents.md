# Batch 10 新增 / 修改文件完整内容汇总

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
    "verify:frontend-guardrails": "pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries && pnpm verify:mock-data-boundary && pnpm verify:adapter-switch-boundary && pnpm verify:generated-adapter-bridge && pnpm verify:openapi-intake && pnpm verify:generated-api-client",
    "generate:api-client": "node ./scripts/generate-api-client.mjs",
    "reset:api-client-placeholder": "node ./scripts/reset-api-client-placeholder.mjs",
    "verify:generated-adapter-bridge": "node ./scripts/verify-generated-adapter-bridge.mjs"
  },
  "devDependencies": {
    "openapi-typescript-codegen": "^0.29.0",
    "turbo": "^2.4.4",
    "typescript": "^5.8.3",
    "yaml": "^2.8.1"
  }
}
```

## `README-第10批-Generated-Adapter就绪门禁与可见性.md`

```md
# QueueFree 第10批：Generated Adapter 就绪门禁与可见性

这批不新增页面，也不新增共享契约。

这批的目标是：

1. 让 `packages/api-client` 暴露最小运行时模式信息
2. 让 mobile / admin 明确显示自己当前到底是 mock 还是 generated
3. 让 generated SDK 到位以后，前端不会误以为“已经能用了”
4. 新增本地门禁，确保 `@queuefree/api-client` 只出现在允许的位置

## 这批做了什么

- `packages/api-client` placeholder / generated barrel 现在会导出：
  - `API_CLIENT_RUNTIME_MODE`
  - `API_CLIENT_IS_GENERATED`
  - `loadGeneratedApiClient()`
- mobile 增加 generated adapter readiness 文件
- runtime-config adapter 增加 generated readiness 文件
- admin 增加 generated adapter readiness 文件
- mobile / admin banner 现在会把当前数据源与阻塞原因显示出来
- 新增 `pnpm verify:generated-adapter-bridge`
- `pnpm verify:frontend-guardrails` 现在会把上面这项也串起来

## 你现在怎么做

1. 下载并解压这批压缩包
2. 用它覆盖你本地仓库
3. 打开 VS Code
4. 打开终端
5. 依次输入：

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

## backend 交付 OpenAPI 之后要注意什么

就算 `packages/api-client` 已经生成成功，前端也**不会自动切到 generated**。

原因是：

- `API_CLIENT_IS_GENERATED = true` 只表示 SDK 文件已经生成
- 不代表 mobile / admin 的 screen-model mapping 已经写完
- 所以各 app 还会额外检查 `*_GENERATED_ADAPTER_READY`

只有：

- SDK 已生成
- 对应 app 的 generated adapter mapping 已完成

前端才应该从 mock 切到 generated。

## 这批适合什么场景

- 你要把当前仓库继续保持 registry-first
- 你要避免“刚生成 SDK 就误切生产链路”
- 你要把当前 skeleton 模式对创始人、后端、服务器都显示得更清楚
```

## `packages/api-client/src/index.ts`

```ts
/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'placeholder';
export const API_CLIENT_IS_GENERATED = false;

export async function loadGeneratedApiClient(): Promise<never> {
  throw new Error(
    '[QueueFree api-client] packages/api-client is still in placeholder mode. ' +
      'Ask backend to export OpenAPI first, then run pnpm generate:api-client.'
  );
}
```

## `packages/api-client/README.md`

```md
# @queuefree/api-client

状态：pre-OpenAPI placeholder / generated SDK target

## 目的

`packages/api-client` 是 QueueFree 前端唯一允许消费的 SDK 包之一。

根据 PRD v1.2 与协作契约：

- 前端只能消费 `packages/shared` 和 `packages/api-client`
- `packages/api-client` 只能由 OpenAPI 生成
- 不允许在这里手写猜测型业务 path / DTO / response contract

## 当前模式

在 backend 还没有导出 OpenAPI 之前，本包保持 **placeholder 模式**，对外只暴露最小运行时元信息：

- `API_CLIENT_RUNTIME_MODE`
- `API_CLIENT_IS_GENERATED`
- `loadGeneratedApiClient()`

这些导出不是业务 contract，只用于前端适配器判断当前仓库是否已经进入 generated SDK 模式。

## 输入目录

OpenAPI 原始文件只允许放在：

```text
packages/api-client/openapi/
```

支持：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

## 生成命令

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
```

## 回到 placeholder

```bash
pnpm reset:api-client-placeholder
```

## 重要限制

- 不要把手写 REST path 塞进本包
- 不要把页面 view-model 放进本包
- 不要把 NestJS DTO / Swagger 类型塞进本包
- 真正的业务 SDK 必须来自 backend 已登记、已导出的 OpenAPI
```

## `packages/api-client/openapi/README.md`

```md
# packages/api-client/openapi

这里是 **backend 导出的 OpenAPI 原始文件输入位**。

当前允许的文件名：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

## 正确顺序

1. backend 先完成 registry 对齐
2. backend 导出 OpenAPI 到本目录
3. 前端执行：`pnpm verify:openapi-intake`
4. 前端执行：`pnpm generate:api-client`
5. 前端执行：`pnpm verify:generated-api-client`
6. 前端再补 `*.generated.ts` 的 screen-model mapping
7. 对应 app 的 `*_GENERATED_ADAPTER_READY` 变为 `true`

## 注意

- 不要把手写 request / response 示例塞进这里
- 不要把 Postman collection 当成 OpenAPI 放进来
- OpenAPI path 必须继续受 registry baseline 已冻结的 C 端 / Admin API 前缀约束
- spec 存在但 SDK 未生成时，`pnpm verify:frontend-guardrails` 会失败，这是故意的
- SDK 已生成，也不代表 app 会自动切到 generated；app 还会检查 generated adapter readiness
```

## `scripts/_openapi-helpers.mjs`

```javascript
import fs from 'node:fs';
import path from 'node:path';

export const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
export const OPENAPI_SPEC_CANDIDATES = [
  'openapi.json',
  'openapi.yaml',
  'openapi.yml',
  'spec.json',
  'spec.yaml',
  'spec.yml'
];

export const PLACEHOLDER_INDEX_CONTENT = `/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'placeholder';
export const API_CLIENT_IS_GENERATED = false;

export async function loadGeneratedApiClient(): Promise<never> {
  throw new Error(
    '[QueueFree api-client] packages/api-client is still in placeholder mode. ' +
      'Ask backend to export OpenAPI first, then run pnpm generate:api-client.'
  );
}
`;

export const GENERATED_INDEX_CONTENT = `/**
 * QueueFree generated SDK barrel.
 *
 * This file is rewritten by scripts/generate-api-client.mjs.
 * Do not hand-edit.
 */
export * from './generated/client';

export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'generated';
export const API_CLIENT_IS_GENERATED = true;

export async function loadGeneratedApiClient() {
  return import('./generated/client');
}
`;

export function getRepoRoot() {
  return process.cwd();
}

export function getApiClientPaths(repoRoot = getRepoRoot()) {
  const packageRoot = path.join(repoRoot, 'packages', 'api-client');
  const openapiRoot = path.join(packageRoot, 'openapi');
  const srcRoot = path.join(packageRoot, 'src');
  const generatedRoot = path.join(srcRoot, 'generated');
  const generatedClientRoot = path.join(generatedRoot, 'client');

  return {
    packageRoot,
    openapiRoot,
    srcRoot,
    generatedRoot,
    generatedClientRoot,
    indexPath: path.join(srcRoot, 'index.ts'),
    stampPath: path.join(generatedRoot, '.generated-stamp.json'),
    gitkeepPath: path.join(generatedRoot, '.gitkeep')
  };
}

export function ensureGeneratedRoot(paths = getApiClientPaths()) {
  fs.mkdirSync(paths.generatedRoot, { recursive: true });
  if (!fs.existsSync(paths.gitkeepPath)) {
    fs.writeFileSync(paths.gitkeepPath, '');
  }
}

export function writePlaceholderIndex(paths = getApiClientPaths()) {
  fs.writeFileSync(paths.indexPath, PLACEHOLDER_INDEX_CONTENT);
}

export function writeGeneratedIndex(paths = getApiClientPaths()) {
  fs.writeFileSync(paths.indexPath, GENERATED_INDEX_CONTENT);
}

export function resetGeneratedArtifacts(paths = getApiClientPaths()) {
  if (fs.existsSync(paths.generatedClientRoot)) {
    fs.rmSync(paths.generatedClientRoot, { recursive: true, force: true });
  }

  if (fs.existsSync(paths.stampPath)) {
    fs.rmSync(paths.stampPath, { force: true });
  }

  ensureGeneratedRoot(paths);
}

export function hasGeneratedClient(paths = getApiClientPaths()) {
  return fs.existsSync(path.join(paths.generatedClientRoot, 'index.ts'));
}

export function findOpenApiSpec(paths = getApiClientPaths()) {
  for (const candidate of OPENAPI_SPEC_CANDIDATES) {
    const candidatePath = path.join(paths.openapiRoot, candidate);
    if (fs.existsSync(candidatePath)) {
      return candidatePath;
    }
  }

  return null;
}

export async function loadOpenApiDocument(specPath) {
  const rawText = fs.readFileSync(specPath, 'utf8');
  const ext = path.extname(specPath).toLowerCase();

  if (ext === '.json') {
    return JSON.parse(rawText);
  }

  if (ext === '.yaml' || ext === '.yml') {
    const yamlModule = await import('yaml');
    return yamlModule.parse(rawText);
  }

  throw new Error(`Unsupported OpenAPI extension: ${ext}`);
}

export function collectOperations(spec) {
  const operations = [];
  const pathsObject = spec?.paths ?? {};

  for (const [routePath, pathItem] of Object.entries(pathsObject)) {
    if (!pathItem || typeof pathItem !== 'object') continue;

    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];
      if (!operation || typeof operation !== 'object') continue;

      operations.push({
        path: routePath,
        method,
        operation
      });
    }
  }

  return operations;
}

export function validateOpenApiDocument(spec) {
  const violations = [];
  const warnings = [];

  if (!spec || typeof spec !== 'object') {
    return {
      violations: ['OpenAPI document is empty or not an object.'],
      warnings,
      operations: []
    };
  }

  const version = typeof spec.openapi === 'string' ? spec.openapi : '';
  if (!version.startsWith('3.')) {
    violations.push(`OpenAPI version must start with 3.x. Received: ${version || '<missing>'}`);
  }

  const operations = collectOperations(spec);
  if (operations.length === 0) {
    violations.push('OpenAPI document does not contain any HTTP operations under paths.');
  }

  const allowedPrefixes = ['/v1', '/v1/admin'];
  const operationIds = new Map();

  for (const item of operations) {
    if (!allowedPrefixes.some((prefix) => item.path === prefix || item.path.startsWith(`${prefix}/`))) {
      violations.push(`Path ${item.path} is outside the frozen API prefixes /v1 and /v1/admin.`);
    }

    const operationId = typeof item.operation.operationId === 'string' ? item.operation.operationId.trim() : '';
    if (!operationId) {
      violations.push(`${item.method.toUpperCase()} ${item.path} is missing operationId.`);
    } else if (operationIds.has(operationId)) {
      violations.push(
        `${item.method.toUpperCase()} ${item.path} duplicates operationId ${operationId} already used by ${operationIds.get(operationId)}.`
      );
    } else {
      operationIds.set(operationId, `${item.method.toUpperCase()} ${item.path}`);
    }

    if (!item.operation.tags || !Array.isArray(item.operation.tags) || item.operation.tags.length === 0) {
      warnings.push(`${item.method.toUpperCase()} ${item.path} does not declare tags. Generation still works, but module ownership becomes less clear.`);
    }
  }

  return { violations, warnings, operations };
}

export function writeGenerationStamp(paths, specPath, operationCount) {
  const payload = {
    specFile: path.relative(getRepoRoot(), specPath),
    generatedAt: new Date().toISOString(),
    generator: 'openapi-typescript-codegen',
    operationCount
  };

  fs.writeFileSync(paths.stampPath, JSON.stringify(payload, null, 2) + '\n');
}
```

## `scripts/verify-generated-adapter-bridge.mjs`

```javascript
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
    const isMockAdapter = relPath.includes('/adapters/') && relPath.endsWith('.mock.ts');

    if (importsApiClient && !isGeneratedAdapter && !isReadinessFile) {
      violations.push(`${relPath}: @queuefree/api-client may only be imported inside adapter *.generated.ts or *.readiness.ts files.`);
    }

    if (isGeneratedAdapter && (text.includes('demo-data') || text.includes('admin-content'))) {
      violations.push(`${relPath}: generated adapter must not import mock/demo content sources.`);
    }

    if (isMockAdapter && importsApiClient) {
      violations.push(`${relPath}: mock adapter must not import @queuefree/api-client.`);
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

console.log('Generated adapter bridge verified. api-client imports stay inside generated/readiness adapter files only.');
```

## `apps/mobile/src/adapters/mobile-read-adapter.readiness.ts`

```ts
import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';

export type MobileGeneratedAdapterReadiness = {
  screenDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  reasons: string[];
};

/**
 * Flip this to true only after batch-level generated adapter mapping is implemented.
 * This keeps the repository safe even if packages/api-client has already been generated.
 */
export const MOBILE_GENERATED_ADAPTER_READY = false;

export function getMobileGeneratedAdapterReadiness(): MobileGeneratedAdapterReadiness {
  const reasons: string[] = [];

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!MOBILE_GENERATED_ADAPTER_READY) {
    reasons.push('Mobile screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && MOBILE_GENERATED_ADAPTER_READY ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: MOBILE_GENERATED_ADAPTER_READY,
    reasons
  };
}
```

## `apps/mobile/src/adapters/runtime-config-adapter.readiness.ts`

```ts
import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';

export type RuntimeConfigAdapterReadiness = {
  runtimeConfigMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  reasons: string[];
};

/**
 * Flip this to true only after runtime-config wiring is implemented against generated SDK or another registered backend contract.
 */
export const RUNTIME_CONFIG_GENERATED_ADAPTER_READY = false;

export function getRuntimeConfigAdapterReadiness(): RuntimeConfigAdapterReadiness {
  const reasons: string[] = [];

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!RUNTIME_CONFIG_GENERATED_ADAPTER_READY) {
    reasons.push('Runtime config generated adapter wiring is intentionally disabled in this batch.');
  }

  return {
    runtimeConfigMode: API_CLIENT_IS_GENERATED && RUNTIME_CONFIG_GENERATED_ADAPTER_READY ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: RUNTIME_CONFIG_GENERATED_ADAPTER_READY,
    reasons
  };
}
```

## `apps/mobile/src/adapters/mobile-read-adapter.resolve.ts`

```ts
import { generatedMobileReadAdapter } from './mobile-read-adapter.generated';
import { mockMobileReadAdapter } from './mobile-read-adapter.mock';
import type { MobileReadAdapter } from './mobile-read-adapter';
import { getMobileGeneratedAdapterReadiness } from './mobile-read-adapter.readiness';

export type MobileReadAdapterMode = 'mock' | 'generated';

export const MOBILE_READ_ADAPTER_MODE: MobileReadAdapterMode = getMobileGeneratedAdapterReadiness().screenDataMode;

export function getMobileReadAdapterStatusSummary() {
  return getMobileGeneratedAdapterReadiness();
}

export function resolveMobileReadAdapter(): MobileReadAdapter {
  if (MOBILE_READ_ADAPTER_MODE === 'generated') {
    return generatedMobileReadAdapter;
  }

  return mockMobileReadAdapter;
}
```

## `apps/mobile/src/adapters/runtime-config-adapter.resolve.ts`

```ts
import type { RuntimeConfigAdapter } from './runtime-config-adapter';
import { generatedRuntimeConfigAdapter } from './runtime-config-adapter.generated';
import { mockRuntimeConfigAdapter } from './runtime-config-adapter.mock';
import { getRuntimeConfigAdapterReadiness } from './runtime-config-adapter.readiness';

export type RuntimeConfigAdapterMode = 'mock' | 'generated';

export const RUNTIME_CONFIG_ADAPTER_MODE: RuntimeConfigAdapterMode = getRuntimeConfigAdapterReadiness().runtimeConfigMode;

export function getRuntimeConfigAdapterStatusSummary() {
  return getRuntimeConfigAdapterReadiness();
}

export function resolveRuntimeConfigAdapter(): RuntimeConfigAdapter {
  if (RUNTIME_CONFIG_ADAPTER_MODE === 'generated') {
    return generatedRuntimeConfigAdapter;
  }

  return mockRuntimeConfigAdapter;
}
```

## `apps/mobile/src/components/demo-banner.tsx`

```ts
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
        {screenDataStatus.apiClientRuntimeMode}
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
    "@tanstack/react-query": "^5.66.0",
    "clsx": "^2.1.1",
    "next": "^15.3.0",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "tailwind-merge": "^2.5.5",
    "@queuefree/api-client": "workspace:*"
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

## `apps/admin/src/adapters/admin-read-adapter.readiness.ts`

```ts
import { API_CLIENT_IS_GENERATED, API_CLIENT_RUNTIME_MODE } from '@queuefree/api-client';

export type AdminGeneratedAdapterReadiness = {
  screenDataMode: 'mock' | 'generated';
  apiClientRuntimeMode: typeof API_CLIENT_RUNTIME_MODE;
  generatedAdapterReady: boolean;
  reasons: string[];
};

/**
 * Flip this to true only after Admin screen-model mapping is implemented against generated SDK methods.
 */
export const ADMIN_GENERATED_ADAPTER_READY = false;

export function getAdminGeneratedAdapterReadiness(): AdminGeneratedAdapterReadiness {
  const reasons: string[] = [];

  if (!API_CLIENT_IS_GENERATED) {
    reasons.push('packages/api-client is still in placeholder mode.');
  }

  if (!ADMIN_GENERATED_ADAPTER_READY) {
    reasons.push('Admin screen-model mapping to generated SDK is intentionally disabled in this batch.');
  }

  return {
    screenDataMode: API_CLIENT_IS_GENERATED && ADMIN_GENERATED_ADAPTER_READY ? 'generated' : 'mock',
    apiClientRuntimeMode: API_CLIENT_RUNTIME_MODE,
    generatedAdapterReady: ADMIN_GENERATED_ADAPTER_READY,
    reasons
  };
}
```

## `apps/admin/src/adapters/admin-read-adapter.resolve.ts`

```ts
import { generatedAdminReadAdapter } from './admin-read-adapter.generated';
import { mockAdminReadAdapter } from './admin-read-adapter.mock';
import type { AdminReadAdapter } from './admin-read-adapter';
import { getAdminGeneratedAdapterReadiness } from './admin-read-adapter.readiness';

export type AdminReadAdapterMode = 'mock' | 'generated';

export const ADMIN_READ_ADAPTER_MODE: AdminReadAdapterMode = getAdminGeneratedAdapterReadiness().screenDataMode;

export function getAdminReadAdapterStatusSummary() {
  return getAdminGeneratedAdapterReadiness();
}

export function resolveAdminReadAdapter(): AdminReadAdapter {
  if (ADMIN_READ_ADAPTER_MODE === 'generated') {
    return generatedAdminReadAdapter;
  }

  return mockAdminReadAdapter;
}
```

## `apps/admin/src/components/admin-skeleton-banner.tsx`

```ts
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
          <span className="font-semibold">{status.apiClientRuntimeMode}</span>
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

## `docs/contracts/frontend-generated-adapter-readiness-v1.2.md`

```md
# Frontend Generated Adapter Readiness v1.2

状态：Batch 10 / Frontend

## 目标

在不新增任何 registry 冻结项的前提下，让前端明确区分下面 3 件事：

1. `packages/api-client` 是否仍是 placeholder
2. `packages/api-client` 是否已经由 OpenAPI 生成
3. 即使 SDK 已生成，screen-model mapping 是否已经写完

## 为什么要加这一层

仅仅生成 SDK，并不代表 mobile / admin 已经具备可用的数据链路。

前端页面当前依赖的是 app-local screen model，而不是直接把 generated SDK response 丢给页面。
因此在 generated SDK 到位后，还需要额外一层 **mapping readiness**。

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

否则继续走 mock adapter。

runtime config 也一样：

- `API_CLIENT_IS_GENERATED === true`
- `RUNTIME_CONFIG_GENERATED_ADAPTER_READY === true`

否则继续走 mock runtime config adapter。

### admin

admin 现在需要同时满足：

- `API_CLIENT_IS_GENERATED === true`
- `ADMIN_GENERATED_ADAPTER_READY === true`

否则继续走 mock adapter。

## 当前门禁脚本

### `pnpm verify:generated-adapter-bridge`

作用：

- 限制 `@queuefree/api-client` 只能出现在 `*.generated.ts` 或 `*.readiness.ts`
- 防止 page / query / repository / mock adapter 直接依赖 generated SDK
- 防止 generated adapter 偷偷引用 `demo-data` / `admin-content`

## 当前结论

这批不是“已经接通真实后端”。

这批只是把 generated SDK readiness 的**可见性**和**切换门禁**补齐，避免后续 SDK 一生成，前端误以为所有 screen 已经完成真实接线。
```

## `docs/contracts/frontend-guardrail-checks-v1.2.md`

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

### 6. `pnpm verify:generated-adapter-bridge`

作用：

- 限制 `@queuefree/api-client` 只能出现在 `*.generated.ts` 或 `*.readiness.ts`
- 防止 page / query / repository / mock adapter 直接依赖 generated SDK
- 防止 generated adapter 偷偷引用 mock content

### 7. `pnpm verify:openapi-intake`

作用：

- 校验 backend 给出的 OpenAPI 输入文件是否合法
- 校验 path 前缀继续落在冻结 API 前缀范围内
- 校验 operationId 完整性

### 8. `pnpm verify:generated-api-client`

作用：

- 校验 spec、生成物、`packages/api-client/src/index.ts` 三者是否同步
- 校验 `packages/api-client/src` 没有长出额外手写业务文件

### 9. `pnpm verify:frontend-guardrails`

作用：

- 串联执行上面所有校验
- 建议作为本地提交前的统一检查入口

## 设计目的

这批脚本不是为了新增功能，而是为了避免 5 类问题再次出现：

1. 前端偷偷长出未登记路径
2. 前端重新手写猜测型 API path / SDK
3. `packages/shared` 被污染成后端运行时代码仓库
4. generated SDK 直接泄漏到 page / query / repository 层
5. SDK 已生成但 screen-model mapping 尚未完成时，被误切到 generated 模式

## 当前边界

在 backend 尚未导出正式 OpenAPI 之前，前端仍然保持：

- 页面骨架可继续做
- mock / placeholder 可继续做
- 真实 SDK 接入继续等待 OpenAPI 生成后再做
```

## `docs/handoffs/backend-next-steps-from-frontend-batch10.md`

```md
# 给后端线程的衔接说明（Frontend Batch 10）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

本轮补的是：

- generated SDK readiness 可见性
- mobile / admin generated adapter 切换门禁
- `@queuefree/api-client` 使用范围门禁

## 你下一步最适合给什么

请继续优先给 **最小只读 OpenAPI**。

前端现在已经能明确区分：

1. SDK 是否已经生成
2. screen-model mapping 是否已经写完

也就是说，你一旦给出 spec，前端可以先生成 SDK，但不会误切到 generated 模式。

## 你要继续遵守的约束

- 先 registry，再 OpenAPI，再前端生成 SDK
- 不要跳过 `operationId`
- 不要只给 Postman collection
- 不要把未登记字段塞进 spec
- 不要让前端猜字段

## 前端这边已经准备好的切换信号

当你交付 spec 后，前端可以先完成：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
```

随后前端会在下一个 batch 里，只修改：

- mobile `*.generated.ts`
- runtime-config `*.generated.ts`
- admin `*.generated.ts`

而不是大面积改页面。
```

## `docs/handoffs/server-next-steps-from-frontend-batch10.md`

```md
# 给服务器线程的衔接说明（Frontend Batch 10）

本轮前端没有新增任何冻结项，也没有新增公开 env / 路由 / 域名。

本轮只是补齐：

- generated SDK readiness 可见性
- generated adapter 切换门禁
- 本地 guardrail 扩展

## 对服务器线程的直接影响

当前仍然不需要：

- 新增前端 env var
- 新增路由
- 修改公开域名
- 修改 CI 部署目标

## 你下一步最适合接什么

等 backend 真正交付 OpenAPI 之后，服务器线程可以在 CI 里准备串联：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
pnpm verify:frontend-guardrails
```

但在 backend spec 落地之前，不需要提前改部署。

## 当前重点

继续保持：

- registry-first
- secret 与 env 不新增
- public route 不变
- queuefree.com/contact 不回退成 /support
```

## `docs/handoffs/第10批-发给后端和服务器的话术.md`

```md
从现在开始，QueueFree 三线程继续按以下优先级执行：

1. queuefree_prd_v1_2
2. docs/contracts/queuefree-collaboration-contract-v1.2.md
3. docs/registry/registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

前端第10批已落地：

- packages/api-client 最小 runtime mode 导出
- mobile / admin generated adapter readiness 门禁
- generated SDK 使用范围门禁

本轮没有新增：

- route
- env var
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
- domain

后端请继续优先交付最小只读 OpenAPI；
服务器请保持现有 env / route / domain / CI 基线不变，等 spec 落地后再串联生成步骤。
```
