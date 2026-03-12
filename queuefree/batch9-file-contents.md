# Batch 9 新增 / 修改文件内容汇总

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
    "verify:frontend-guardrails": "pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries && pnpm verify:mock-data-boundary && pnpm verify:adapter-switch-boundary && pnpm verify:openapi-intake && pnpm verify:generated-api-client",
    "generate:api-client": "node ./scripts/generate-api-client.mjs",
    "reset:api-client-placeholder": "node ./scripts/reset-api-client-placeholder.mjs"
  },
  "devDependencies": {
    "openapi-typescript-codegen": "^0.29.0",
    "turbo": "^2.4.4",
    "typescript": "^5.8.3",
    "yaml": "^2.8.1"
  }
}

```

## `README-第9批-OpenAPI输入与SDK生成脚手架.md`

```markdown
# QueueFree 第9批：OpenAPI 输入与 SDK 生成脚手架

这批的目标不是新增页面，而是把前端仓库补成“**后端一给 OpenAPI，前端就能立刻生成 packages/api-client**”的状态。

## 这批做了什么

- 增加 OpenAPI 输入校验脚本
- 增加 SDK 生成脚本
- 增加生成产物一致性校验
- 增加一键回到 pre-OpenAPI placeholder 的重置脚本
- 增加 batch9 的前后端 / 服务器 handoff 文档

## 你现在怎么做

1. 下载并解压这批压缩包
2. 用它覆盖你本地仓库
3. 打开 VS Code
4. 打开终端
5. 输入：

```bash
pnpm install
pnpm verify:frontend-guardrails
```

如果 backend 还没给 OpenAPI，第二行会正常通过，因为 `verify:openapi-intake` 会直接 skip。

## backend 给 OpenAPI 以后怎么做

把 spec 放到：

```text
packages/api-client/openapi/
```

支持文件名：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

然后依次输入：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
pnpm verify:frontend-guardrails
```

## 如果你想回到 placeholder 模式

输入：

```bash
pnpm reset:api-client-placeholder
```

这个命令会删除 `packages/api-client/src/generated/client`，并把 `packages/api-client/src/index.ts` 改回 pre-OpenAPI placeholder。

```

## `packages/api-client/README.md`

```markdown
# @queuefree/api-client

状态：OpenAPI Intake Ready / Pre-Generation Placeholder

这个包当前**仍然不包含任何手写业务 API contract**。

根据 `queuefree_prd_v1_2`、协作契约、registry baseline：

- `packages/api-client` 只能由 **OpenAPI 生成**
- 前端在没有 OpenAPI 的阶段，**不能**在这里手写 path / request / response / DTO / schema
- 前端当前只能继续使用：
  - `packages/shared`
  - 各 app 内部的本地 mock / placeholder 数据

## 当前目录职责

- `openapi/`：backend 导出的 OpenAPI 原始输入文件
- `src/index.ts`：生成前的 placeholder barrel，生成后会被脚本改写
- `src/generated/`：生成产物目录

## 正确顺序

1. 后端先更新 registry（如果触碰冻结项）
2. 后端导出 OpenAPI 到 `packages/api-client/openapi`
3. 前端执行 `pnpm verify:openapi-intake`
4. 前端执行 `pnpm generate:api-client`
5. 前端再把 adapter 从 mock 切到 generated SDK

## 当前允许保留的内容

- 这个包的位置
- `src/index.ts` 的 placeholder barrel
- `openapi/` 目录占位与说明文档
- `src/generated/` 目录占位与生成产物

## 当前明确不允许

- 手写 REST path 常量
- 手写请求 / 响应字段
- 手写业务 DTO
- 把 NestJS DTO / Swagger 类型复制到这里
- 让前端页面直接依赖未生成的 service path 文本

```

## `packages/api-client/openapi/README.md`

```markdown
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
5. 前端再切换 generated adapter

## 注意

- 不要把手写 request / response 示例塞进这里
- 不要把 Postman collection 当成 OpenAPI 放进来
- OpenAPI path 必须继续受 registry baseline 已冻结的 C 端 / Admin API 前缀约束
- spec 存在但 SDK 未生成时，`pnpm verify:frontend-guardrails` 会失败，这是故意的

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
export {};
`;

export const GENERATED_INDEX_CONTENT = `/**
 * QueueFree generated SDK barrel.
 *
 * This file is rewritten by scripts/generate-api-client.mjs.
 * Do not hand-edit.
 */
export * from './generated/client';
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

## `scripts/verify-openapi-intake.mjs`

```javascript
import path from 'node:path';
import {
  findOpenApiSpec,
  getApiClientPaths,
  loadOpenApiDocument,
  validateOpenApiDocument
} from './_openapi-helpers.mjs';

const paths = getApiClientPaths();
const specPath = findOpenApiSpec(paths);

if (!specPath) {
  console.log(
    `verify-openapi-intake skipped: no OpenAPI file found under ${path.relative(process.cwd(), paths.openapiRoot)}.`
  );
  process.exit(0);
}

try {
  const spec = await loadOpenApiDocument(specPath);
  const result = validateOpenApiDocument(spec);

  if (result.violations.length > 0) {
    console.error(`OpenAPI intake verification failed for ${path.relative(process.cwd(), specPath)}:\n`);
    for (const violation of result.violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  console.log(
    `verify-openapi-intake passed for ${path.relative(process.cwd(), specPath)} with ${result.operations.length} operations.`
  );

  if (result.warnings.length > 0) {
    console.warn('\nOpenAPI intake warnings:');
    for (const warning of result.warnings) {
      console.warn(`- ${warning}`);
    }
  }
} catch (error) {
  console.error('OpenAPI intake verification crashed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

```

## `scripts/generate-api-client.mjs`

```javascript
import path from 'node:path';
import {
  findOpenApiSpec,
  getApiClientPaths,
  hasGeneratedClient,
  loadOpenApiDocument,
  resetGeneratedArtifacts,
  validateOpenApiDocument,
  writeGeneratedIndex,
  writeGenerationStamp
} from './_openapi-helpers.mjs';

const paths = getApiClientPaths();
const specPath = findOpenApiSpec(paths);

if (!specPath) {
  console.error(
    `generate-api-client failed: no OpenAPI file found under ${path.relative(process.cwd(), paths.openapiRoot)}. ` +
      'Ask backend to export openapi.json / openapi.yaml first.'
  );
  process.exit(1);
}

try {
  const spec = await loadOpenApiDocument(specPath);
  const result = validateOpenApiDocument(spec);

  if (result.violations.length > 0) {
    console.error(`OpenAPI intake verification failed for ${path.relative(process.cwd(), specPath)}:\n`);
    for (const violation of result.violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  const { generate } = await import('openapi-typescript-codegen');

  resetGeneratedArtifacts(paths);

  await generate({
    input: specPath,
    output: paths.generatedClientRoot,
    httpClient: 'fetch',
    useOptions: true,
    useUnionTypes: false,
    exportCore: true,
    exportServices: true,
    exportModels: true,
    exportSchemas: false
  });

  if (!hasGeneratedClient(paths)) {
    console.error('generate-api-client failed: generator finished but packages/api-client/src/generated/client/index.ts was not created.');
    process.exit(1);
  }

  writeGeneratedIndex(paths);
  writeGenerationStamp(paths, specPath, result.operations.length);

  console.log(
    `generate-api-client passed. Generated SDK from ${path.relative(process.cwd(), specPath)} into ${path.relative(process.cwd(), paths.generatedClientRoot)}.`
  );

  if (result.warnings.length > 0) {
    console.warn('\nOpenAPI generation warnings:');
    for (const warning of result.warnings) {
      console.warn(`- ${warning}`);
    }
  }
} catch (error) {
  console.error('generate-api-client crashed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

```

## `scripts/reset-api-client-placeholder.mjs`

```javascript
import { getApiClientPaths, resetGeneratedArtifacts, writePlaceholderIndex } from './_openapi-helpers.mjs';

try {
  const paths = getApiClientPaths();
  resetGeneratedArtifacts(paths);
  writePlaceholderIndex(paths);
  console.log('reset-api-client-placeholder passed. packages/api-client returned to pre-OpenAPI placeholder mode.');
} catch (error) {
  console.error('reset-api-client-placeholder crashed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}

```

## `scripts/verify-generated-api-client.mjs`

```javascript
import fs from 'node:fs';
import path from 'node:path';
import {
  findOpenApiSpec,
  GENERATED_INDEX_CONTENT,
  getApiClientPaths,
  hasGeneratedClient,
  PLACEHOLDER_INDEX_CONTENT
} from './_openapi-helpers.mjs';

const paths = getApiClientPaths();
const specPath = findOpenApiSpec(paths);
const generatedClientExists = hasGeneratedClient(paths);
const indexText = fs.readFileSync(paths.indexPath, 'utf8');

if (!specPath && !generatedClientExists) {
  if (indexText !== PLACEHOLDER_INDEX_CONTENT) {
    console.error('verify-generated-api-client failed: packages/api-client/src/index.ts should stay in placeholder mode before OpenAPI generation.');
    process.exit(1);
  }

  console.log('verify-generated-api-client skipped: no OpenAPI spec and no generated client detected. Placeholder mode is intact.');
  process.exit(0);
}

if (specPath && !generatedClientExists) {
  console.error(
    `verify-generated-api-client failed: ${path.relative(process.cwd(), specPath)} exists, but packages/api-client/src/generated/client/index.ts does not. Run pnpm generate:api-client.`
  );
  process.exit(1);
}

if (!specPath && generatedClientExists) {
  console.error('verify-generated-api-client failed: generated client exists but no source OpenAPI file was found in packages/api-client/openapi.');
  process.exit(1);
}

if (indexText !== GENERATED_INDEX_CONTENT) {
  console.error('verify-generated-api-client failed: packages/api-client/src/index.ts is not pointing at ./generated/client. Re-run pnpm generate:api-client.');
  process.exit(1);
}

const manualTopLevelFiles = fs
  .readdirSync(paths.srcRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name !== 'index.ts')
  .map((entry) => entry.name);

if (manualTopLevelFiles.length > 0) {
  console.error(
    `verify-generated-api-client failed: unexpected top-level manual files exist in packages/api-client/src: ${manualTopLevelFiles.join(', ')}`
  );
  process.exit(1);
}

console.log('verify-generated-api-client passed. Generated SDK and barrel export are aligned.');

```

## `docs/contracts/frontend-openapi-intake-pipeline-v1.2.md`

```markdown
# Frontend OpenAPI Intake Pipeline v1.2

状态：Batch 9 / Frontend

## 目标

在不新增任何 registry 冻结项的前提下，为前端仓库补齐 `packages/api-client` 的 **OpenAPI 输入 → 校验 → 生成 → 验证 → 回滚到 placeholder** 流程。

## 本轮边界

本轮**没有**新增：

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

## 输入位置

OpenAPI 原始文件只允许放在：

```text
packages/api-client/openapi/
```

支持文件名：

- `openapi.json`
- `openapi.yaml`
- `openapi.yml`
- `spec.json`
- `spec.yaml`
- `spec.yml`

## 输出位置

生成后的 SDK 固定输出到：

```text
packages/api-client/src/generated/client/
```

barrel 入口固定为：

```text
packages/api-client/src/index.ts
```

## 命令

### 1. 校验输入

```bash
pnpm verify:openapi-intake
```

会检查：

- OpenAPI 必须是 3.x
- 必须存在 `paths`
- 每个 operation 必须有 `operationId`
- path 必须继续落在 registry baseline 已冻结的 C 端 / Admin API 前缀范围内

### 2. 生成 SDK

```bash
pnpm generate:api-client
```

会执行：

- intake 校验
- 清理旧生成产物
- 用 `openapi-typescript-codegen` 生成 fetch client
- 重写 `packages/api-client/src/index.ts`
- 写入 `.generated-stamp.json`

### 3. 校验生成结果

```bash
pnpm verify:generated-api-client
```

会检查：

- spec 存在时，generated client 必须存在
- generated client 存在时，spec 也必须存在
- `src/index.ts` 必须指向 `./generated/client`
- `packages/api-client/src` 下不能出现额外手写业务文件

### 4. 回到 placeholder

```bash
pnpm reset:api-client-placeholder
```

适用于：

- backend spec 回滚
- 想清空错误生成物
- 切回纯 skeleton / mock 模式

## 对 frontend 的直接影响

- mobile / admin 现有 adapter 结构不变
- 后续只需要把 generated adapter 里的实现替换到 generated SDK 即可
- 页面层、query hook、repository 层不用大改

## 对 backend 的要求

- 先登记，再 OpenAPI，再交前端生成
- 不要口头给字段
- 不要只给 Postman collection
- 不要跳过 `operationId`

## 对 server 的要求

- CI 可以在 spec 存在时串联：
  - `pnpm verify:openapi-intake`
  - `pnpm generate:api-client`
  - `pnpm verify:generated-api-client`
  - `pnpm verify:frontend-guardrails`
- 当前不需要新增任何前端公开 env
- 当前不需要改公开域名和冻结路由

```

## `docs/handoffs/backend-next-steps-from-frontend-batch9.md`

```markdown
# 给后端线程的衔接说明（Frontend Batch 9）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端这边已经补齐了 `packages/api-client` 的 OpenAPI intake / generation / verification 脚手架。

## 你下一步最适合给什么

请直接给 **最小只读 OpenAPI 文件**，放到：

```text
packages/api-client/openapi/openapi.json
```

也可以是 yaml，但 JSON 最省事。

## 你要遵守的约束

- 先登记，再 OpenAPI，再前端生成 SDK
- path 必须继续落在 registry baseline 已冻结的 C 端 / Admin API 前缀范围内
- 每个 operation 必须有唯一 `operationId`
- 不要口头给字段
- 不要只给 Postman collection
- 不要把未登记的 request / response 字段塞进 spec

## 前端这边准备好了什么

你给出 spec 后，前端只需要跑：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
```

然后就能进入下一批 generated adapter 真接线。

## 建议优先顺序

### Mobile 只读 OpenAPI

优先给：

- session restore / me summary
- products list / detail
- queue guard
- queue entries list / detail
- tasks list
- invites me / records
- wallet overview / ledgers
- withdrawals list
- rules list / slug detail

### Admin 只读 OpenAPI

优先给：

- dashboard summary
- products list
- orders list
- queue pools / queue entries list
- settlement slots list
- campaigns list
- tasks list
- invites list
- withdrawals list
- risk cases list / detail
- audit logs list

```

## `docs/handoffs/server-next-steps-from-frontend-batch9.md`

```markdown
# 给服务器线程的衔接说明（Frontend Batch 9）

本轮前端没有新增 env var，也没有修改任何域名或冻结路由。

你这边本轮最应该准备的是：**等 backend spec 到位后，把 CI 的 SDK 生成链路串起来**。

## 本轮前端新增了什么

- `pnpm verify:openapi-intake`
- `pnpm generate:api-client`
- `pnpm verify:generated-api-client`
- `pnpm reset:api-client-placeholder`

## 你暂时不要做什么

- 不要新增 mobile / web / admin 公开 env
- 不要改 Web `/contact`
- 不要改现有对外域名
- 不要提前假设 OpenAPI 下载 URL

## 你后面可以协助做什么

当 backend 把 spec 文件交付到仓库后，CI 可以按这个顺序加：

```bash
pnpm verify:openapi-intake
pnpm generate:api-client
pnpm verify:generated-api-client
pnpm verify:frontend-guardrails
```

## 当前仍应保持的基线

- Web：`queuefree.com`
- Admin：`admin.queuefree.com`
- API：`api.queuefree.com`
- Assets：`assets.queuefree.com`

```

## `docs/handoffs/第9批-发给后端和服务器的话术.md`

```markdown
从现在开始，前端线程已进入 Batch 9：OpenAPI Intake Pipeline。

请后端和服务器继续严格遵守：

1. queuefree_prd_v1_2
2. queuefree-collaboration-contract-v1.2.md
3. registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端本轮新增的是：
- OpenAPI 输入校验脚本
- packages/api-client 生成脚本
- generated SDK 一致性校验
- 回到 placeholder 的重置脚本

后端下一步请优先提供最小只读 OpenAPI 文件。
服务器线程本轮不要新增前端 env，也不要改动任何冻结路由与公开域名。

```

