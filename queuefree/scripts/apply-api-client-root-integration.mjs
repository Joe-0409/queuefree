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
    'generate:api-client': 'pnpm --filter @queuefree/api-client run generate',
    'verify:generated-adapter-bridge': 'pnpm --filter @queuefree/api-client run verify:generated-adapter-bridge'
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
