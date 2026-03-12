#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const force = process.argv.includes('--force');

async function applyRootIntegration() {
  console.log('[QueueFree Batch 12] Applying root API client integration...\n');

  // Apply package.json scripts
  const packageJsonPath = path.resolve(repoRoot, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  const requiredScripts = {
    'generate:api-client': 'node ./scripts/generate-api-client.mjs',
    'verify:generated-adapter-bridge': 'node ./scripts/verify-generated-adapter-bridge.mjs',
    'verify:generated-api-client': 'node ./scripts/verify-generated-api-client.mjs',
    'verify:frontend-guardrails': 'pnpm verify:registry-first-frontend && pnpm verify:route-registry && pnpm verify:frontend-import-boundaries && pnpm verify:mock-data-boundary && pnpm verify:adapter-switch-boundary && pnpm verify:generated-adapter-bridge && pnpm verify:generated-bridge-coverage && pnpm verify:screen-model-validation && pnpm verify:openapi-intake && pnpm verify:generated-api-client'
  };

  let packageJsonChanged = false;
  for (const [key, value] of Object.entries(requiredScripts)) {
    if (!packageJson.scripts[key]) {
      console.log(`  ✓ Adding script: ${key}`);
      packageJson.scripts[key] = value;
      packageJsonChanged = true;
    } else if (force && packageJson.scripts[key] !== value) {
      console.log(`  ⚠ Updating script: ${key}`);
      packageJson.scripts[key] = value;
      packageJsonChanged = true;
    } else if (packageJson.scripts[key] === value) {
      console.log(`  ✓ Script already exists: ${key}`);
    }
  }

  if (packageJsonChanged) {
    await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
    console.log('  ✓ package.json updated\n');
  } else {
    console.log('  ✓ package.json already up to date\n');
  }

  // Apply turbo.json tasks
  const turboJsonPath = path.resolve(repoRoot, 'turbo.json');
  const turboJson = JSON.parse(await readFile(turboJsonPath, 'utf8'));

  if (!turboJson.tasks) {
    turboJson.tasks = {};
  }

  if (!turboJson.tasks.typecheck) {
    console.log('  ✓ Adding turbo task: typecheck');
    turboJson.tasks.typecheck = { outputs: [] };
    await writeFile(turboJsonPath, JSON.stringify(turboJson, null, 2) + '\n', 'utf8');
    console.log('  ✓ turbo.json updated\n');
  } else {
    console.log('  ✓ Turbo task already exists: typecheck\n');
  }

  console.log('[QueueFree Batch 12] Root integration complete!\n');
  console.log('Next steps:');
  console.log('  1. Run: pnpm run generate:api-client');
  console.log('  2. Run: pnpm run verify:generated-adapter-bridge');
  console.log('  3. Run: pnpm typecheck\n');
}

applyRootIntegration().catch((error) => {
  console.error('Error applying root integration:', error.message);
  process.exit(1);
});
