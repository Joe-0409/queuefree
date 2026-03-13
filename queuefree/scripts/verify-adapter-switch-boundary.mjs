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
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'src'),
    blockedFragments: ['mobile-write-adapter.mock', 'mobile-write-adapter.generated'],
    description: 'mobile source files must not import concrete write adapters directly',
    allowPatterns: [
      /src[\/]adapters[\/]mobile-write-adapter\.resolve\.ts$/,
      /src[\/]adapters[\/]mobile-write-adapter\.mock\.ts$/,
      /src[\/]adapters[\/]mobile-write-adapter\.generated\.ts$/
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
      /src[\/]adapters[\/]admin-read-adapter\.mock\.ts$/,
      /src[\/]generated-bridge[\/]/
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
      /src[\/]adapters[\/]mobile-write-adapter\.generated\.ts$/,
      /src[\/]adapters[\/]mobile-read-adapter\.readiness\.ts$/,
      /src[\/]adapters[\/]runtime-config-adapter\.readiness\.ts$/,
      /src[\/]adapters[\/]mobile-write-adapter\.readiness\.ts$/
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
