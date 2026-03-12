#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`✅ ${message}`);
}

async function verifyRootIntegration() {
  console.log('[QueueFree Batch 12] Verifying root API client integration...\n');

  // Verify package.json scripts
  const packageJsonPath = path.resolve(repoRoot, 'package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  const requiredScripts = [
    'generate:api-client',
    'verify:generated-adapter-bridge',
    'verify:generated-api-client',
    'verify:frontend-guardrails'
  ];

  for (const script of requiredScripts) {
    if (packageJson.scripts[script]) {
      pass(`Script exists: ${script}`);
    } else {
      fail(`Missing script: ${script}`);
    }
  }

  console.log('');

  // Verify turbo.json tasks
  const turboJsonPath = path.resolve(repoRoot, 'turbo.json');
  const turboJson = JSON.parse(await readFile(turboJsonPath, 'utf8'));

  if (turboJson.tasks && turboJson.tasks.typecheck) {
    pass('Turbo task exists: typecheck');
  } else {
    fail('Missing turbo task: typecheck');
  }

  console.log('');

  // Verify scripts exist
  const requiredScriptsFiles = [
    'scripts/generate-api-client.mjs',
    'scripts/verify-generated-adapter-bridge.mjs',
    'scripts/verify-generated-api-client.mjs'
  ];

  for (const scriptFile of requiredScriptsFiles) {
    try {
      await readFile(path.resolve(repoRoot, scriptFile), 'utf8');
      pass(`Script file exists: ${scriptFile}`);
    } catch {
      fail(`Missing script file: ${scriptFile}`);
    }
  }

  console.log('\n[QueueFree Batch 12] Root integration verified!\n');
}

verifyRootIntegration().catch((error) => {
  console.error('Error verifying root integration:', error.message);
  process.exit(1);
});
