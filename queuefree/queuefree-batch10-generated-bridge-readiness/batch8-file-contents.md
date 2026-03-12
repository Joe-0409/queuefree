# Batch 8 Changed File Contents

## `package.json`

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
    "verify:frontend-guardrails": "pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries && pnpm verify:mock-data-boundary && pnpm verify:adapter-switch-boundary",
    "verify:mock-data-boundary": "node ./scripts/verify-mock-data-boundary.mjs",
    "verify:adapter-switch-boundary": "node ./scripts/verify-adapter-switch-boundary.mjs"
  },
  "devDependencies": {
    "turbo": "^2.4.4",
    "typescript": "^5.8.3"
  }
}

```

## `README-第8批-前端适配器切换位与OpenAPI接线准备.md`

```
# QueueFree 第 8 批：前端适配器切换位与 OpenAPI 接线准备

这批不是新增业务规则，也不是新增页面。

这批做的是：

- 把 `apps/mobile` 和 `apps/admin` 的数据读取路径改成：
  - page
  - query hook
  - repository
  - read adapter
  - mock adapter / generated adapter
- 让后端一旦给出 OpenAPI，前端只需要改 `generated adapter` 和 `resolve` 层，不需要大面积改页面。
- 继续保持 registry-first，不手写新的业务 API contract。

## 你现在怎么用

1. 下载并解压第 8 批压缩包。
2. 用这批文件覆盖你本地仓库。
3. 打开 VS Code。
4. 点 `Terminal -> New Terminal`。
5. 依次执行：

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

## 这批的重点

- 还是 mock 数据
- 还是 skeleton 页面
- 但是 repository 后面已经多了一层 adapter
- 将来接真实 OpenAPI 时，优先替换：
  - `apps/mobile/src/adapters/*generated.ts`
  - `apps/admin/src/adapters/*generated.ts`
  - `*resolve.ts`

## 这批没有做什么

- 没有新增 route
- 没有新增 env var
- 没有新增 shared contract
- 没有手写 `packages/api-client` 业务 SDK
- 没有猜测后端 request / response 字段

```

## `scripts/verify-registry-first-frontend.mjs`

```
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'docs', 'registry', 'registry-baseline-v1.2.md');
const registryText = fs.readFileSync(registryPath, 'utf8');

const generatedDir = path.join(repoRoot, 'packages', 'api-client', 'src', 'generated');
const hasGeneratedClient = fs.existsSync(generatedDir)
  && fs.readdirSync(generatedDir).some((name) => !name.startsWith('.'));

const forbiddenApiFragments = ['/v1/', '/v1/admin'];
const allowedFilesForApiFragments = new Set([
  path.normalize('docs/contracts/queuefree-collaboration-contract-v1.2.md'),
  path.normalize('docs/registry/registry-baseline-v1.2.md')
]);

const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json']);
const codeScanRoots = [
  'apps',
  path.join('packages', 'api-client'),
  path.join('docs', 'contracts'),
  path.join('docs', 'handoffs')
];
const appScanRoots = [
  path.join('apps', 'mobile'),
  path.join('apps', 'web'),
  path.join('apps', 'admin')
];
const violations = [];

function extractEnvSection(appName, nextHeading) {
  const startHeading = `### ${appName}`;
  const startIndex = registryText.indexOf(startHeading);
  const endIndex = registryText.indexOf(nextHeading, startIndex + startHeading.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Failed to parse environment registry for ${appName}`);
  }

  return registryText
    .slice(startIndex + startHeading.length, endIndex)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/`([^`]+)`/);
      return match ? match[1] : line.slice(2).trim();
    })
    .filter((token) => token.startsWith('EXPO_PUBLIC_') || token.startsWith('NEXT_PUBLIC_'));
}

const allowedEnvByApp = {
  mobile: new Set(extractEnvSection('mobile', '### web')),
  web: new Set(extractEnvSection('web', '### admin')),
  admin: new Set(extractEnvSection('admin', '### api'))
};

function walk(dirPath, onFile) {
  if (!fs.existsSync(dirPath)) return;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo' || entry.name === 'dist') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, onFile);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!textExtensions.has(ext) && entry.name !== '.env.example') {
      continue;
    }

    onFile(fullPath, entry.name);
  }
}

function detectAppType(relPath) {
  if (relPath.startsWith(path.normalize(path.join('apps', 'mobile')))) return 'mobile';
  if (relPath.startsWith(path.normalize(path.join('apps', 'web')))) return 'web';
  if (relPath.startsWith(path.normalize(path.join('apps', 'admin')))) return 'admin';
  return null;
}

function collectPublicEnvTokens(text) {
  return [...new Set(text.match(/\b(?:EXPO_PUBLIC|NEXT_PUBLIC)_[A-Z0-9_]+\b/g) ?? [])];
}

for (const root of codeScanRoots) {
  walk(path.join(repoRoot, root), (fullPath) => {
    const relPath = path.relative(repoRoot, fullPath);
    const normalizedRelPath = path.normalize(relPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    if (!hasGeneratedClient && !allowedFilesForApiFragments.has(normalizedRelPath)) {
      for (const fragment of forbiddenApiFragments) {
        if (text.includes(fragment)) {
          violations.push(`${relPath}: contains hard-coded API fragment ${fragment} before OpenAPI generation`);
        }
      }
    }
  });
}

for (const root of appScanRoots) {
  walk(path.join(repoRoot, root), (fullPath, fileName) => {
    const relPath = path.relative(repoRoot, fullPath);
    const appType = detectAppType(path.normalize(relPath));
    if (!appType) return;

    const text = fs.readFileSync(fullPath, 'utf8');
    const tokens = collectPublicEnvTokens(text);
    const allowed = allowedEnvByApp[appType];

    for (const token of tokens) {
      if (!allowed.has(token)) {
        violations.push(`${relPath}: references non-registered public env token ${token}`);
      }
    }

    if (fileName === '.env.example') {
      const declared = new Set(
        text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith('#') && line.includes('='))
          .map((line) => line.split('=')[0].trim())
      );

      for (const token of allowed) {
        if (!declared.has(token)) {
          violations.push(`${relPath}: missing registered public env token ${token}`);
        }
      }

      for (const token of declared) {
        if ((token.startsWith('EXPO_PUBLIC_') || token.startsWith('NEXT_PUBLIC_')) && !allowed.has(token)) {
          violations.push(`${relPath}: declares non-registered public env token ${token}`);
        }
      }
    }
  });
}

const illegalManualClientFile = path.join(repoRoot, 'packages', 'api-client', 'src', 'endpoints.ts');
if (!hasGeneratedClient && fs.existsSync(illegalManualClientFile)) {
  violations.push('packages/api-client/src/endpoints.ts should not exist before OpenAPI generation.');
}

if (violations.length > 0) {
  console.error('Registry-first frontend verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

if (hasGeneratedClient) {
  console.log('Generated api-client detected. Pre-OpenAPI API fragment checks were skipped. Env registry checks still passed.');
} else {
  console.log('Registry-first frontend verification passed. No forbidden pre-OpenAPI API path or non-registered public env token was found.');
}

```

## `scripts/verify-route-registry.mjs`

```
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'docs', 'registry', 'registry-baseline-v1.2.md');
const registryText = fs.readFileSync(registryPath, 'utf8');

function extractList(startHeading, endHeading) {
  const startIndex = registryText.indexOf(startHeading);
  const endIndex = registryText.indexOf(endHeading, startIndex + startHeading.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Failed to parse registry section: ${startHeading}`);
  }

  const block = registryText.slice(startIndex + startHeading.length, endIndex);
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/`([^`]+)`/);
      return match ? match[1] : line.slice(2).trim();
    });
}

const expectedWebRoutes = new Set(extractList('### Web Public Routes', '### Mobile Routes'));
const expectedMobileRoutes = new Set(extractList('### Mobile Routes', '### Admin Routes'));
const expectedAdminRoutes = new Set(extractList('### Admin Routes', '---'));

function walk(dirPath, predicate) {
  const collected = [];
  if (!fs.existsSync(dirPath)) return collected;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collected.push(...walk(fullPath, predicate));
      continue;
    }
    if (predicate(fullPath, entry.name)) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function stripRouteGroups(parts) {
  return parts.filter((part) => !(part.startsWith('(') && part.endsWith(')')));
}

function normalizeNextRoute(relativeFilePath) {
  const withoutPage = relativeFilePath === 'page.tsx'
    ? ''
    : relativeFilePath.replace(/[/\\]page\.tsx$/, '');
  const parts = stripRouteGroups(withoutPage.split(path.sep).filter(Boolean));
  if (parts.length === 0) {
    return '/';
  }
  return `/${parts.join('/')}`;
}

function normalizeMobileRoute(relativeFilePath) {
  const extless = relativeFilePath.replace(/\.tsx$/, '');
  if (extless === 'index') {
    return null;
  }
  const normalized = extless.endsWith(`${path.sep}index`)
    ? extless.slice(0, -`${path.sep}index`.length)
    : extless;
  return `/${normalized.split(path.sep).join('/')}`;
}

function collectWebRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'web', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name === 'page.tsx')
      .map((fullPath) => normalizeNextRoute(path.relative(appDir, fullPath)))
  );
}

function collectAdminRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'admin', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name === 'page.tsx')
      .map((fullPath) => normalizeNextRoute(path.relative(appDir, fullPath)))
  );
}

function collectMobileRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'mobile', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name.endsWith('.tsx') && name !== '_layout.tsx')
      .map((fullPath) => normalizeMobileRoute(path.relative(appDir, fullPath)))
      .filter(Boolean)
  );
}

function diffSets(expected, actual) {
  return {
    missing: [...expected].filter((item) => !actual.has(item)).sort(),
    extra: [...actual].filter((item) => !expected.has(item)).sort()
  };
}

const checks = [
  { name: 'web', expected: expectedWebRoutes, actual: collectWebRoutes() },
  { name: 'mobile', expected: expectedMobileRoutes, actual: collectMobileRoutes() },
  { name: 'admin', expected: expectedAdminRoutes, actual: collectAdminRoutes() }
];

const failures = [];

for (const check of checks) {
  const diff = diffSets(check.expected, check.actual);
  if (diff.missing.length > 0 || diff.extra.length > 0) {
    failures.push({ ...check, ...diff });
  }
}

if (failures.length > 0) {
  console.error('Route registry verification failed.');
  for (const failure of failures) {
    console.error(`\n[${failure.name}]`);
    if (failure.missing.length > 0) {
      console.error(`Missing routes: ${failure.missing.join(', ')}`);
    }
    if (failure.extra.length > 0) {
      console.error(`Extra routes: ${failure.extra.join(', ')}`);
    }
  }
  process.exit(1);
}

for (const check of checks) {
  console.log(`Route registry verified for ${check.name}: ${check.actual.size} routes aligned with registry.`);
}

```

## `scripts/verify-frontend-import-boundaries.mjs`

```
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const violations = [];

const fileExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.json']);
const scanTargets = [
  path.join(repoRoot, 'apps', 'mobile'),
  path.join(repoRoot, 'apps', 'web'),
  path.join(repoRoot, 'apps', 'admin'),
  path.join(repoRoot, 'packages', 'shared')
];

const forbiddenByScope = [
  {
    scopeLabel: 'frontend-apps',
    rootDirs: [
      path.join(repoRoot, 'apps', 'mobile'),
      path.join(repoRoot, 'apps', 'web'),
      path.join(repoRoot, 'apps', 'admin')
    ],
    tokens: [
      '@nestjs/',
      '@nestjs/swagger',
      'class-validator',
      '@prisma/client',
      'services/api',
      'services/worker',
      'bullmq'
    ]
  },
  {
    scopeLabel: 'packages/shared',
    rootDirs: [path.join(repoRoot, 'packages', 'shared')],
    tokens: [
      '@nestjs/',
      '@nestjs/swagger',
      'class-validator',
      '@prisma/client',
      'PrismaClient',
      'services/api',
      'services/worker'
    ]
  }
];

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

    const ext = path.extname(entry.name);
    if (!fileExtensions.has(ext) && entry.name !== 'package.json') {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    for (const scope of forbiddenByScope) {
      if (!scope.rootDirs.some((rootDir) => fullPath.startsWith(rootDir))) {
        continue;
      }

      for (const token of scope.tokens) {
        if (text.includes(token)) {
          violations.push(`${relPath}: contains forbidden ${scope.scopeLabel} token ${token}`);
        }
      }
    }
  }
}

for (const target of scanTargets) {
  walk(target);
}

if (violations.length > 0) {
  console.error('Frontend import boundary verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Frontend import boundaries verified. No forbidden backend or Nest/Prisma imports were found.');

```

## `scripts/verify-mock-data-boundary.mjs`

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
    description: 'mobile src files outside demo and mock-adapter layers must not import demo-data directly',
    allowPatterns: [
      /src[\/]lib[\/]demo-data\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.mock\.ts$/
    ]
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'src'),
    blockedFragments: ['lib/admin-content'],
    description: 'admin src files outside content and mock-adapter layers must not import admin-content directly',
    allowPatterns: [
      /src[\/]lib[\/]admin-content\.ts$/,
      /src[\/]adapters[\/]admin-read-adapter\.mock\.ts$/
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

## `scripts/verify-adapter-switch-boundary.mjs`

```
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

## `apps/mobile/src/models/mobile-screen-models.ts`

```
import type {
  InviteRelationStatus,
  QueueEntryStatus,
  UserQueueGuardStatus,
  WithdrawalStatus
} from '@queuefree/shared';

export type ProductCardModel = {
  id: string;
  title: string;
  subtitle: string;
  priceMinor: number;
  cashbackCapMinor: number;
  stockLabel: string;
};

export type QueueEntryCardModel = {
  id: string;
  orderId: string;
  productTitle: string;
  status: QueueEntryStatus;
  currentRank: number | null;
  boostUsed: number;
  nextSlotAt: string;
  eligibleCashbackMinor: number;
};

export type TaskCardModel = {
  id: string;
  title: string;
  rewardLabel: string;
  progressLabel: string;
  claimable: boolean;
};

export type InviteRecordModel = {
  id: string;
  maskedPhone: string;
  status: InviteRelationStatus;
  reason: string;
};

export type WalletLedgerModel = {
  id: string;
  title: string;
  amountMinor: number;
  createdAt: string;
};

export type WithdrawalRecordModel = {
  id: string;
  amountMinor: number;
  status: WithdrawalStatus;
  createdAt: string;
};

export type ProfileModel = {
  displayName: string;
  phoneNumber: string;
  marketLabel: string;
  timezoneLabel: string;
};

export type GuardModel = {
  status: UserQueueGuardStatus;
  validUntil: string;
  graceUntil: string;
};

export type WalletSummaryModel = {
  activationLabel: string;
  pendingBalanceMinor: number;
  availableBalanceMinor: number;
  frozenBalanceMinor: number;
  showRecoverableDebtHint: boolean;
};

```

## `apps/mobile/src/lib/demo-data.ts`

```
import {
  DEFAULT_RUNTIME_CONFIG,
  formatDateTime,
  formatMinorMoney
} from '@queuefree/shared';
import type {
  GuardModel,
  InviteRecordModel,
  ProductCardModel,
  ProfileModel,
  QueueEntryCardModel,
  TaskCardModel,
  WalletLedgerModel,
  WalletSummaryModel,
  WithdrawalRecordModel
} from '../models/mobile-screen-models';

export type {
  GuardModel,
  InviteRecordModel,
  ProductCardModel,
  ProfileModel,
  QueueEntryCardModel,
  TaskCardModel,
  WalletLedgerModel,
  WalletSummaryModel,
  WithdrawalRecordModel
} from '../models/mobile-screen-models';

export const demoProducts: ProductCardModel[] = [
  {
    id: 'prod-iphone-case',
    title: 'Premium Phone Case',
    subtitle: 'Real product · Queue eligible',
    priceMinor: 59900,
    cashbackCapMinor: 120000,
    stockLabel: 'Soft reserved stock available'
  },
  {
    id: 'prod-earbuds',
    title: 'Wireless Earbuds',
    subtitle: 'Popular item · Fast checkout flow',
    priceMinor: 149900,
    cashbackCapMinor: 200000,
    stockLabel: '12 units left today'
  },
  {
    id: 'prod-bottle',
    title: 'Insulated Bottle',
    subtitle: 'Daily essentials · Queue eligible',
    priceMinor: 79900,
    cashbackCapMinor: 100000,
    stockLabel: 'Open for queue entry'
  }
];

export const demoQueueEntries: QueueEntryCardModel[] = [
  {
    id: 'entry-1001',
    orderId: 'order-9001',
    productTitle: 'Wireless Earbuds',
    status: 'ACTIVE',
    currentRank: 41,
    boostUsed: 1,
    nextSlotAt: '2026-03-11T13:00:00.000Z',
    eligibleCashbackMinor: 149900
  },
  {
    id: 'entry-1002',
    orderId: 'order-9002',
    productTitle: 'Premium Phone Case',
    status: 'FROZEN',
    currentRank: null,
    boostUsed: 0,
    nextSlotAt: '2026-03-11T17:00:00.000Z',
    eligibleCashbackMinor: 59900
  },
  {
    id: 'entry-1003',
    orderId: 'order-9003',
    productTitle: 'Insulated Bottle',
    status: 'WON_PENDING_RELEASE',
    currentRank: 1,
    boostUsed: 2,
    nextSlotAt: '2026-03-11T09:00:00.000Z',
    eligibleCashbackMinor: 79900
  }
];

export const demoTasks: TaskCardModel[] = [
  {
    id: 'task-welcome',
    title: 'Complete your first sign-in',
    rewardLabel: 'Queue guard extension',
    progressLabel: '1 / 1',
    claimable: true
  },
  {
    id: 'task-profile',
    title: 'Add your first address',
    rewardLabel: 'Trust progress +1',
    progressLabel: '0 / 1',
    claimable: false
  },
  {
    id: 'task-repeat',
    title: 'Place a second order',
    rewardLabel: 'Activity fragments',
    progressLabel: '1 / 2',
    claimable: false
  }
];

export const demoInviteRecords: InviteRecordModel[] = [
  {
    id: 'invite-1',
    maskedPhone: '+63 9*** *** 204',
    status: 'EFFECTIVE',
    reason: 'Wallet activation path completed'
  },
  {
    id: 'invite-2',
    maskedPhone: '+63 9*** *** 883',
    status: 'PENDING_EFFECTIVE',
    reason: 'Cooling-off window still running'
  },
  {
    id: 'invite-3',
    maskedPhone: '+63 9*** *** 771',
    status: 'INVALID',
    reason: 'Expired bind window'
  }
];

export const demoWallet: WalletSummaryModel = {
  activationLabel: 'Invite or trust task required',
  pendingBalanceMinor: 79900,
  availableBalanceMinor: 188000,
  frozenBalanceMinor: 50000,
  showRecoverableDebtHint: false
};

export const demoLedgers: WalletLedgerModel[] = [
  {
    id: 'ledger-1',
    title: 'Cashback pending created',
    amountMinor: 79900,
    createdAt: '2026-03-11T09:01:00.000Z'
  },
  {
    id: 'ledger-2',
    title: 'Withdrawal submitted',
    amountMinor: -50000,
    createdAt: '2026-03-10T07:10:00.000Z'
  },
  {
    id: 'ledger-3',
    title: 'Cashback released',
    amountMinor: 188000,
    createdAt: '2026-03-08T15:00:00.000Z'
  }
];

export const demoWithdrawals: WithdrawalRecordModel[] = [
  {
    id: 'wd-1',
    amountMinor: 50000,
    status: 'PROCESSING',
    createdAt: '2026-03-10T07:10:00.000Z'
  },
  {
    id: 'wd-2',
    amountMinor: 120000,
    status: 'SUCCESS',
    createdAt: '2026-03-08T08:10:00.000Z'
  }
];

export const demoProfile: ProfileModel = {
  displayName: 'QueueFree Demo User',
  phoneNumber: '+63 912 345 6789',
  marketLabel: `${DEFAULT_RUNTIME_CONFIG.marketCode} · ${DEFAULT_RUNTIME_CONFIG.currencyCode}`,
  timezoneLabel: DEFAULT_RUNTIME_CONFIG.timezone
};

export const demoGuard: GuardModel = {
  status: 'VALID',
  validUntil: '2026-03-12T11:00:00.000Z',
  graceUntil: '2026-03-15T11:00:00.000Z'
};

export const demoRuleFaq = [
  'Buy a real product, then the paid order may join the public queue.',
  'Queue rank is the current effective rank, not a historical absolute number.',
  'Each order gets one queue seat. Quantity changes money, not seat count.',
  'Boost works at order level and cannot cross the Top30 protection zone.'
];

export function getProductById(productId: string) {
  return demoProducts.find((item) => item.id === productId) ?? demoProducts[0];
}

export function getQueueEntryById(entryId: string) {
  return demoQueueEntries.find((item) => item.id === entryId) ?? demoQueueEntries[0];
}

export function formatQueueEntrySummary(entryId: string) {
  const entry = getQueueEntryById(entryId);

  return {
    title: entry.productTitle,
    rankLabel: entry.currentRank ? `#${entry.currentRank}` : 'Frozen',
    nextSlotLabel: formatDateTime(entry.nextSlotAt),
    cashbackLabel: formatMinorMoney(entry.eligibleCashbackMinor)
  };
}

```

## `apps/mobile/src/adapters/mobile-read-adapter.ts`

```
import { ACCOUNT_DELETE_STATUSES } from '@queuefree/shared';
import type {
  GuardModel,
  InviteRecordModel,
  ProductCardModel,
  ProfileModel,
  QueueEntryCardModel,
  TaskCardModel,
  WalletLedgerModel,
  WalletSummaryModel,
  WithdrawalRecordModel
} from '../models/mobile-screen-models';

export type HomeScreenData = {
  products: ProductCardModel[];
  nextSlotAt: string | null;
};

export type QueueScreenData = {
  guard: GuardModel;
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
  wallet: WalletSummaryModel;
  ledgers: WalletLedgerModel[];
  withdrawals: WithdrawalRecordModel[];
};

export type ProfileScreenData = {
  profile: ProfileModel;
};

export type RulesCenterData = {
  faq: string[];
};

export type OrderSuccessData = {
  entryId: string;
  summary: {
    title: string;
    rankLabel: string;
    nextSlotLabel: string;
    cashbackLabel: string;
  };
};

export type DeleteAccountPreviewData = {
  statuses: typeof ACCOUNT_DELETE_STATUSES;
  blockers: string[];
  impactNotes: string[];
};

export type MobileReadAdapter = {
  fetchHomeScreenData(): Promise<HomeScreenData>;
  fetchQueueScreenData(): Promise<QueueScreenData>;
  fetchTasksScreenData(): Promise<TasksScreenData>;
  fetchInvitesScreenData(): Promise<InvitesScreenData>;
  fetchWalletScreenData(): Promise<WalletScreenData>;
  fetchProfileScreenData(): Promise<ProfileScreenData>;
  fetchProductDetail(productId: string): Promise<ProductCardModel>;
  fetchQueueEntryDetail(entryId: string): Promise<QueueEntryCardModel>;
  fetchRulesCenterData(): Promise<RulesCenterData>;
  fetchOrderSuccessData(orderId: string): Promise<OrderSuccessData>;
  fetchDeleteAccountPreview(): Promise<DeleteAccountPreviewData>;
};

```

## `apps/mobile/src/adapters/mobile-read-adapter.mock.ts`

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
  getQueueEntryById
} from '../lib/demo-data';
import { waitForMock } from '../lib/mock-delay';
import type { MobileReadAdapter } from './mobile-read-adapter';

export const mockMobileReadAdapter: MobileReadAdapter = {
  async fetchHomeScreenData() {
    await waitForMock();
    return {
      products: demoProducts,
      nextSlotAt: demoQueueEntries[0]?.nextSlotAt ?? null
    };
  },

  async fetchQueueScreenData() {
    await waitForMock();
    return {
      guard: demoGuard,
      entries: demoQueueEntries
    };
  },

  async fetchTasksScreenData() {
    await waitForMock();
    return {
      tasks: demoTasks
    };
  },

  async fetchInvitesScreenData() {
    await waitForMock();
    return {
      inviteCode: 'QUEUEFREE2026',
      records: demoInviteRecords
    };
  },

  async fetchWalletScreenData() {
    await waitForMock();
    return {
      wallet: demoWallet,
      ledgers: demoLedgers,
      withdrawals: demoWithdrawals
    };
  },

  async fetchProfileScreenData() {
    await waitForMock();
    return {
      profile: demoProfile
    };
  },

  async fetchProductDetail(productId: string) {
    await waitForMock();
    return getProductById(productId);
  },

  async fetchQueueEntryDetail(entryId: string) {
    await waitForMock();
    return getQueueEntryById(entryId);
  },

  async fetchRulesCenterData() {
    await waitForMock();
    return {
      faq: demoRuleFaq
    };
  },

  async fetchOrderSuccessData(_orderId: string) {
    await waitForMock();
    const entryId = demoQueueEntries[0]?.id ?? 'entry-1001';

    return {
      entryId,
      summary: formatQueueEntrySummary(entryId)
    };
  },

  async fetchDeleteAccountPreview() {
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
};

```

## `apps/mobile/src/adapters/mobile-read-adapter.generated.ts`

```
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

async function unsupported<T>(adapterMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree mobile skeleton] ${adapterMethod} is not wired yet. ` +
      'Wait for backend OpenAPI export and generated packages/api-client, then replace the generated adapter implementation.'
  );
}

export const generatedMobileReadAdapter: MobileReadAdapter = {
  fetchHomeScreenData: () => unsupported<HomeScreenData>('fetchHomeScreenData'),
  fetchQueueScreenData: () => unsupported<QueueScreenData>('fetchQueueScreenData'),
  fetchTasksScreenData: () => unsupported<TasksScreenData>('fetchTasksScreenData'),
  fetchInvitesScreenData: () => unsupported<InvitesScreenData>('fetchInvitesScreenData'),
  fetchWalletScreenData: () => unsupported<WalletScreenData>('fetchWalletScreenData'),
  fetchProfileScreenData: () => unsupported<ProfileScreenData>('fetchProfileScreenData'),
  fetchProductDetail: (_productId: string) => unsupported<ProductCardModel>('fetchProductDetail'),
  fetchQueueEntryDetail: (_entryId: string) => unsupported<QueueEntryCardModel>('fetchQueueEntryDetail'),
  fetchRulesCenterData: () => unsupported<RulesCenterData>('fetchRulesCenterData'),
  fetchOrderSuccessData: (_orderId: string) => unsupported<OrderSuccessData>('fetchOrderSuccessData'),
  fetchDeleteAccountPreview: () => unsupported<DeleteAccountPreviewData>('fetchDeleteAccountPreview')
};

```

## `apps/mobile/src/adapters/mobile-read-adapter.resolve.ts`

```
import { generatedMobileReadAdapter } from './mobile-read-adapter.generated';
import { mockMobileReadAdapter } from './mobile-read-adapter.mock';
import type { MobileReadAdapter } from './mobile-read-adapter';

export type MobileReadAdapterMode = 'mock' | 'generated';

/**
 * Pre-OpenAPI lock:
 * keep frontend on mock mode until backend exports OpenAPI and packages/api-client is generated.
 */
export const MOBILE_READ_ADAPTER_MODE: MobileReadAdapterMode = 'mock';

export function resolveMobileReadAdapter(): MobileReadAdapter {
  if (MOBILE_READ_ADAPTER_MODE === 'generated') {
    return generatedMobileReadAdapter;
  }

  return mockMobileReadAdapter;
}

```

## `apps/mobile/src/adapters/runtime-config-adapter.ts`

```
import type { RuntimeConfig } from '@queuefree/shared';

export type RuntimeConfigAdapter = {
  getRuntimeConfig(): Promise<RuntimeConfig>;
};

```

## `apps/mobile/src/adapters/runtime-config-adapter.mock.ts`

```
import {
  DEFAULT_RUNTIME_CONFIG,
  type RuntimeConfig
} from '@queuefree/shared';
import { waitForMock } from '../lib/mock-delay';
import type { RuntimeConfigAdapter } from './runtime-config-adapter';

export const mockRuntimeConfigAdapter: RuntimeConfigAdapter = {
  async getRuntimeConfig(): Promise<RuntimeConfig> {
    await waitForMock();
    return DEFAULT_RUNTIME_CONFIG;
  }
};

```

## `apps/mobile/src/adapters/runtime-config-adapter.generated.ts`

```
import type { RuntimeConfig } from '@queuefree/shared';
import type { RuntimeConfigAdapter } from './runtime-config-adapter';

async function unsupported(): Promise<RuntimeConfig> {
  throw new Error(
    '[QueueFree mobile skeleton] runtime config adapter is not wired yet. Replace it only after backend exports the runtime config contract via OpenAPI or registered REST wiring.'
  );
}

export const generatedRuntimeConfigAdapter: RuntimeConfigAdapter = {
  getRuntimeConfig: unsupported
};

```

## `apps/mobile/src/adapters/runtime-config-adapter.resolve.ts`

```
import type { RuntimeConfigAdapter } from './runtime-config-adapter';
import { generatedRuntimeConfigAdapter } from './runtime-config-adapter.generated';
import { mockRuntimeConfigAdapter } from './runtime-config-adapter.mock';

export type RuntimeConfigAdapterMode = 'mock' | 'generated';

export const RUNTIME_CONFIG_ADAPTER_MODE: RuntimeConfigAdapterMode = 'mock';

export function resolveRuntimeConfigAdapter(): RuntimeConfigAdapter {
  if (RUNTIME_CONFIG_ADAPTER_MODE === 'generated') {
    return generatedRuntimeConfigAdapter;
  }

  return mockRuntimeConfigAdapter;
}

```

## `apps/mobile/src/lib/mobile-repository.ts`

```
import { resolveMobileReadAdapter } from '../adapters/mobile-read-adapter.resolve';

export type {
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

function getAdapter() {
  return resolveMobileReadAdapter();
}

export function fetchHomeScreenData() {
  return getAdapter().fetchHomeScreenData();
}

export function fetchQueueScreenData() {
  return getAdapter().fetchQueueScreenData();
}

export function fetchTasksScreenData() {
  return getAdapter().fetchTasksScreenData();
}

export function fetchInvitesScreenData() {
  return getAdapter().fetchInvitesScreenData();
}

export function fetchWalletScreenData() {
  return getAdapter().fetchWalletScreenData();
}

export function fetchProfileScreenData() {
  return getAdapter().fetchProfileScreenData();
}

export function fetchProductDetail(productId: string) {
  return getAdapter().fetchProductDetail(productId);
}

export function fetchQueueEntryDetail(entryId: string) {
  return getAdapter().fetchQueueEntryDetail(entryId);
}

export function fetchRulesCenterData() {
  return getAdapter().fetchRulesCenterData();
}

export function fetchOrderSuccessData(orderId: string) {
  return getAdapter().fetchOrderSuccessData(orderId);
}

export function fetchDeleteAccountPreview() {
  return getAdapter().fetchDeleteAccountPreview();
}

```

## `apps/mobile/src/hooks/use-runtime-config.ts`

```
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRuntimeConfigStore } from '../store/runtime-config-store';
import {
  RUNTIME_CONFIG_ADAPTER_MODE,
  resolveRuntimeConfigAdapter
} from '../adapters/runtime-config-adapter.resolve';

export function useRuntimeConfig() {
  const replaceRuntimeConfig = useRuntimeConfigStore((state) => state.replaceRuntimeConfig);
  const config = useRuntimeConfigStore((state) => state.config);

  const query = useQuery({
    queryKey: ['runtime-config', RUNTIME_CONFIG_ADAPTER_MODE],
    queryFn: () => resolveRuntimeConfigAdapter().getRuntimeConfig(),
    staleTime: 60_000
  });

  useEffect(() => {
    if (query.data) {
      replaceRuntimeConfig(query.data);
    }
  }, [query.data, replaceRuntimeConfig]);

  return {
    ...query,
    config
  };
}

```

## `apps/admin/src/models/admin-screen-models.ts`

```
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

```

## `apps/admin/src/lib/admin-content.ts`

```
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
import type { DataTableConfig } from '@/components/ui/data-table';
import type { DetailPageConfig, ListPageConfig, Metric } from '@/models/admin-screen-models';

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

## `apps/admin/src/adapters/admin-read-adapter.ts`

```
import type { DataTableConfig } from '@/components/ui/data-table';
import type { DetailPageConfig, ListPageConfig, Metric } from '@/models/admin-screen-models';

export type AdminDashboardData = {
  metrics: Metric[];
  queueTable: DataTableConfig;
  walletTable: DataTableConfig;
  backlogTable: DataTableConfig;
  riskNotes: string[];
};

export type AdminListPageKind =
  | 'products'
  | 'orders'
  | 'queues'
  | 'slots'
  | 'campaigns'
  | 'tasks'
  | 'invites'
  | 'wallet'
  | 'withdrawals'
  | 'risk'
  | 'governance'
  | 'audit';

export type AdminDetailPageKind = 'product' | 'order' | 'queue' | 'slot' | 'campaign' | 'task' | 'invite' | 'risk';

export type AdminReadAdapter = {
  fetchAdminDashboardData(): Promise<AdminDashboardData>;
  fetchAdminListPageConfig(kind: AdminListPageKind): Promise<ListPageConfig>;
  fetchAdminDetailPageConfig(kind: AdminDetailPageKind, id: string): Promise<DetailPageConfig>;
};

```

## `apps/admin/src/adapters/admin-read-adapter.mock.ts`

```
import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable,
  getDetailPageConfig,
  getListPageConfig
} from '@/lib/admin-content';
import { waitForMock } from '@/lib/mock-delay';
import type { AdminReadAdapter } from './admin-read-adapter';

export const mockAdminReadAdapter: AdminReadAdapter = {
  async fetchAdminDashboardData() {
    await waitForMock();
    return {
      metrics: dashboardMetrics,
      queueTable: dashboardQueueTable,
      walletTable: dashboardWalletTable,
      backlogTable: dashboardBacklogTable,
      riskNotes: dashboardRiskNotes
    };
  },

  async fetchAdminListPageConfig(kind) {
    await waitForMock();
    return getListPageConfig(kind);
  },

  async fetchAdminDetailPageConfig(kind, id) {
    await waitForMock();
    return getDetailPageConfig(kind, id);
  }
};

```

## `apps/admin/src/adapters/admin-read-adapter.generated.ts`

```
import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind,
  AdminReadAdapter
} from './admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';

async function unsupported<T>(adapterMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree admin skeleton] ${adapterMethod} is not wired yet. ` +
      'Wait for backend OpenAPI export and generated packages/api-client, then replace the generated adapter implementation.'
  );
}

export const generatedAdminReadAdapter: AdminReadAdapter = {
  fetchAdminDashboardData: () => unsupported<AdminDashboardData>('fetchAdminDashboardData'),
  fetchAdminListPageConfig: (_kind: AdminListPageKind) => unsupported<ListPageConfig>('fetchAdminListPageConfig'),
  fetchAdminDetailPageConfig: (_kind: AdminDetailPageKind, _id: string) => unsupported<DetailPageConfig>('fetchAdminDetailPageConfig')
};

```

## `apps/admin/src/adapters/admin-read-adapter.resolve.ts`

```
import { generatedAdminReadAdapter } from './admin-read-adapter.generated';
import { mockAdminReadAdapter } from './admin-read-adapter.mock';
import type { AdminReadAdapter } from './admin-read-adapter';

export type AdminReadAdapterMode = 'mock' | 'generated';

/**
 * Pre-OpenAPI lock:
 * keep Admin on mock mode until backend exports OpenAPI and packages/api-client is generated.
 */
export const ADMIN_READ_ADAPTER_MODE: AdminReadAdapterMode = 'mock';

export function resolveAdminReadAdapter(): AdminReadAdapter {
  if (ADMIN_READ_ADAPTER_MODE === 'generated') {
    return generatedAdminReadAdapter;
  }

  return mockAdminReadAdapter;
}

```

## `apps/admin/src/lib/admin-repository.ts`

```
import { resolveAdminReadAdapter } from '@/adapters/admin-read-adapter.resolve';

export type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind
} from '@/adapters/admin-read-adapter';

function getAdapter() {
  return resolveAdminReadAdapter();
}

export function fetchAdminDashboardData() {
  return getAdapter().fetchAdminDashboardData();
}

export function fetchAdminListPageConfig(kind: import('@/adapters/admin-read-adapter').AdminListPageKind) {
  return getAdapter().fetchAdminListPageConfig(kind);
}

export function fetchAdminDetailPageConfig(
  kind: import('@/adapters/admin-read-adapter').AdminDetailPageKind,
  id: string
) {
  return getAdapter().fetchAdminDetailPageConfig(kind, id);
}

```

## `docs/contracts/frontend-read-adapter-switch-plan-v1.2.md`

```
# Frontend Read Adapter Switch Plan v1.2

状态：Locked by registry-first / pre-OpenAPI boundary

## 1. 目的

在 backend OpenAPI 尚未提供之前，前端不能手写猜测型 SDK。
因此本轮将数据读取链路统一收敛为：

- page
- query hook
- repository
- read adapter
- mock adapter / generated adapter

这样做的目的不是定义新 contract，而是给未来的 generated `packages/api-client` 预留唯一切换点。

## 2. 适用范围

本轮仅覆盖：

- `apps/mobile`
- `apps/admin`

`apps/web` 当前以公开内容页为主，不强制增加 query / repository / adapter 层。

## 3. 当前模式

### mobile

- `src/adapters/mobile-read-adapter.ts`
- `src/adapters/mobile-read-adapter.mock.ts`
- `src/adapters/mobile-read-adapter.generated.ts`
- `src/adapters/mobile-read-adapter.resolve.ts`

### runtime config

- `src/adapters/runtime-config-adapter.ts`
- `src/adapters/runtime-config-adapter.mock.ts`
- `src/adapters/runtime-config-adapter.generated.ts`
- `src/adapters/runtime-config-adapter.resolve.ts`

### admin

- `src/adapters/admin-read-adapter.ts`
- `src/adapters/admin-read-adapter.mock.ts`
- `src/adapters/admin-read-adapter.generated.ts`
- `src/adapters/admin-read-adapter.resolve.ts`

## 4. 允许与禁止

### 允许

- 在 app 内定义 view-model 层的 screen data 类型
- 在 mock adapter 中消费 demo content / placeholder content
- 在 generated adapter 中保留 throwing placeholder
- 在 resolve 层统一决定当前使用 mock 还是 generated

### 禁止

- 在 `packages/api-client` 手写 path / DTO / response
- 在 page 层直接 import demo-data
- 在 query hook 层直接 import mock adapter
- 在 repository 层直接 import demo-data / admin-content
- 在 generated adapter 中猜测 backend 字段

## 5. OpenAPI 到位后的替换顺序

1. backend 先更新 registry（如触碰冻结项）
2. backend 导出 OpenAPI
3. 生成 `packages/api-client`
4. 前端替换：
   - `mobile-read-adapter.generated.ts`
   - `runtime-config-adapter.generated.ts`
   - `admin-read-adapter.generated.ts`
5. `*.resolve.ts` 从 `mock` 切到 `generated`
6. 保留页面、query hook、repository 结构不动

## 6. 为什么这样做

这样可以保证：

- 页面结构先稳定
- query key 先稳定
- repository 入口先稳定
- SDK 到位后只改 adapter 层
- 不需要大面积重写 screen 组件

```

## `docs/handoffs/backend-next-steps-from-frontend-batch8.md`

```
# 给后端线程的衔接说明（Frontend Batch 8）

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端已把 mobile / admin 的数据读取路径收敛为：

- page
- query hook
- repository
- read adapter
- generated adapter

后端下一步最适合提供的是：**最小只读 OpenAPI**，不要先给写接口。

## 建议优先顺序

### 1. mobile 只读 OpenAPI

请直接以 PRD v1.2 第 14.2 节和 registry baseline 的冻结 API 为准，优先覆盖这些模块：

- Auth 中前端已使用的只读会话恢复相关能力
- Products 列表 / 详情
- Queue guard
- Queue entries 列表 / 详情
- Tasks 列表
- Invites me / records
- Wallet 概览 / ledgers
- Withdrawals 列表
- Me 概览
- Rules 列表 / slug 详情

### 2. admin 只读 OpenAPI

请直接以 PRD v1.2 第 14.3 节和 registry baseline 的冻结 Admin API 为准，优先覆盖这些模块：

- dashboard summary
- products list
- orders list
- queue pools
- queue entries list
- settlement slots list
- campaigns list
- tasks list
- invites list
- withdrawals list
- risk cases list / detail
- audit logs list

## 对后端的约束提醒

- 不要口头给字段
- 先登记，再 OpenAPI，再生成 `packages/api-client`
- 前端当前不会接受未登记的 request / response 字段

```

## `docs/handoffs/server-next-steps-from-frontend-batch8.md`

```
# 给服务器线程的衔接说明（Frontend Batch 8）

本轮前端没有新增 env var，也没有修改任何域名或冻结路由。

你这边暂时只需要继续维持现有 registry baseline：

- web: `queuefree.com`
- admin: `admin.queuefree.com`
- api: `api.queuefree.com`
- assets: `assets.queuefree.com`

## 需要你关注的点

### 1. 不要抢先新增前端 env

本轮 adapter 切换位是代码结构准备，不需要新增：

- mobile env var
- web env var
- admin env var

### 2. 继续按现有对外路径准备发布

Web 公共路由仍固定为：

- `/privacy`
- `/terms`
- `/rules`
- `/delete-account`
- `/contact`

### 3. 等 backend OpenAPI 到位后，再协助补：

- OpenAPI 产物分发路径
- CI 中 generated SDK 的校验或构建顺序
- staging 环境联调顺序

```

## `docs/handoffs/第8批-发给后端和服务器的话术.md`

```
从现在开始，前端线程已进入 Batch 8：Read Adapter Switch Plan。

请后端和服务器继续严格遵守：

1. queuefree_prd_v1_2
2. queuefree-collaboration-contract-v1.2.md
3. registry-baseline-v1.2.md
4. packages/shared
5. packages/api-client

本轮前端没有新增任何冻结项，也没有新增 shared contract。

前端已将 mobile / admin 的数据读取链路统一为：
- page
- query hook
- repository
- read adapter
- mock adapter / generated adapter

后端下一步请优先提供最小只读 OpenAPI。
服务器线程本轮不要新增前端 env，也不要改动任何冻结路由与公开域名。

```
