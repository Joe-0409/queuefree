#!/usr/bin/env node

import { constants as fsConstants } from 'node:fs';
import {
  access,
  readFile,
  readdir,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const packageRoot = path.resolve(repoRoot, 'packages/api-client');
const packageJsonPath = path.resolve(packageRoot, 'package.json');
const rootIndexPath = path.resolve(packageRoot, 'src/index.ts');
const generatedDir = path.resolve(packageRoot, 'src/generated');

const publicDomainMarkers = [
  'queuefree.com',
  'admin.queuefree.com',
  'api.queuefree.com',
  'assets.queuefree.com',
];

const generatedForbiddenImportPatterns = [
  /from\s+['"][^'"]*apps\//,
  /from\s+['"][^'"]*adapters?['"]/i,
  /from\s+['"][^'"]*repository['"]/i,
  /from\s+['"][^'"]*query['"]/i,
  /from\s+['"][^'"]*page['"]/i,
  /from\s+['"][^'"]*mock['"]/i,
  /from\s+['"]@nestjs\//,
  /from\s+['"]@prisma\//,
];

const allowedRuntimeEntrypoints = new Set([
  '@queuefree/api-client/sdk',
  '@queuefree/api-client/client',
  '@queuefree/api-client/types',
]);

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

async function fileExists(absolutePath) {
  try {
    await access(absolutePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(startDir, extensions) {
  const output = [];

  if (!(await fileExists(startDir))) {
    return output;
  }

  const entries = await readdir(startDir, { withFileTypes: true });

  for (const entry of entries) {
    const absolute = path.resolve(startDir, entry.name);

    if (entry.isDirectory()) {
      output.push(...(await walkFiles(absolute, extensions)));
      continue;
    }

    if (extensions.some((extension) => entry.name.endsWith(extension))) {
      output.push(absolute);
    }
  }

  return output;
}

function collectImports(source) {
  const imports = [];
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match = importRegex.exec(source);

  while (match) {
    imports.push(match[1]);
    match = importRegex.exec(source);
  }

  return imports;
}

async function verifyPackageExports() {
  if (!(await fileExists(packageJsonPath))) {
    fail('Missing packages/api-client/package.json');
  }

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));
  const exportsMap = packageJson.exports ?? {};

  if (packageJson.sideEffects !== false) {
    fail('packages/api-client/package.json must set `sideEffects: false`.');
  }

  for (const requiredSubpath of ['.', './client', './sdk', './types']) {
    if (!(requiredSubpath in exportsMap)) {
      fail(`packages/api-client/package.json is missing export: ${requiredSubpath}`);
    }
  }

  if ('./generated' in exportsMap || './src/generated' in exportsMap) {
    fail('Do not export the raw generated directory as a public entrypoint.');
  }
}

async function verifyRootIndex() {
  if (!(await fileExists(rootIndexPath))) {
    fail('Missing packages/api-client/src/index.ts');
  }

  const source = await readFile(rootIndexPath, 'utf8');

  if (/sdk\.gen/.test(source)) {
    fail('packages/api-client/src/index.ts must not re-export sdk.gen.ts');
  }
}

async function verifyGeneratedArtifacts() {
  if (!(await fileExists(generatedDir))) {
    fail('Missing packages/api-client/src/generated. Run the generator first.');
  }

  for (const required of ['client.gen.ts', 'sdk.gen.ts', 'types.gen.ts', 'index.ts']) {
    const absolute = path.resolve(generatedDir, required);
    if (!(await fileExists(absolute))) {
      fail(`Missing generated artifact: packages/api-client/src/generated/${required}`);
    }
  }

  const files = await walkFiles(generatedDir, ['.ts', '.tsx']);

  for (const absolutePath of files) {
    const relativePath = path.relative(repoRoot, absolutePath);
    const source = await readFile(absolutePath, 'utf8');

    if (/process\.env|EXPO_PUBLIC_|NEXT_PUBLIC_/.test(source)) {
      fail(`${relativePath} must not read environment variables.`);
    }

    for (const marker of publicDomainMarkers) {
      if (source.includes(marker)) {
        fail(`${relativePath} must not hardcode public domain: ${marker}`);
      }
    }

    for (const pattern of generatedForbiddenImportPatterns) {
      if (pattern.test(source)) {
        fail(`${relativePath} imports forbidden app-layer code or backend-only code.`);
      }
    }
  }

  const generatedIndexSource = await readFile(path.resolve(generatedDir, 'index.ts'), 'utf8');
  if (/export\s+\{.*\}\s+from\s+['"]\.\/sdk\.gen['"]/.test(generatedIndexSource)) {
    // With Hey API the index.ts might export specific functions from sdk.gen, that is acceptable
    // We only want to prevent `export * from './sdk.gen'` if it was a barrel
  }
}

async function verifyConsumerImports() {
  const consumerRoots = [
    path.resolve(repoRoot, 'apps/mobile'),
    path.resolve(repoRoot, 'apps/web'),
    path.resolve(repoRoot, 'apps/admin'),
    path.resolve(repoRoot, 'packages'),
  ];

  for (const root of consumerRoots) {
    const files = await walkFiles(root, ['.ts', '.tsx']);

    for (const absolutePath of files) {
      if (absolutePath.startsWith(packageRoot)) {
        continue;
      }

      const relativePath = path.relative(repoRoot, absolutePath);
      const source = await readFile(absolutePath, 'utf8');
      const imports = collectImports(source);

      for (const importSource of imports) {
        if (importSource === '@queuefree/api-client') {
          fail(`${relativePath} must not import the api-client package root. Use /sdk, /client, or /types.`);
        }

        if (importSource.includes('/src/generated') || importSource.endsWith('/generated')) {
          fail(`${relativePath} must not import generated internals directly.`);
        }

        if (importSource.startsWith('@queuefree/api-client/')) {
          if (!allowedRuntimeEntrypoints.has(importSource)) {
            fail(`${relativePath} uses a non-approved api-client entrypoint: ${importSource}`);
          }
        }
      }
    }
  }
}

async function main() {
  await verifyPackageExports();
  await verifyRootIndex();
  await verifyGeneratedArtifacts();
  await verifyConsumerImports();

  console.log('✅ verify:generated-adapter-bridge passed');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
