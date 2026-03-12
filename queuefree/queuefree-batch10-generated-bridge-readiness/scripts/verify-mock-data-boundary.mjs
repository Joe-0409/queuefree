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
