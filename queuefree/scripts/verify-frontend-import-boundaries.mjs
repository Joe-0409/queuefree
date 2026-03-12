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
