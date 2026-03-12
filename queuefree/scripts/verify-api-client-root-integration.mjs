#!/usr/bin/env node

import { constants as fsConstants } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const packageJsonPath = path.resolve(repoRoot, 'package.json');
const turboJsonPath = path.resolve(repoRoot, 'turbo.json');

const expectedScripts = {
  'generate:api-client': 'pnpm --filter @queuefree/api-client run generate',
  'verify:generated-adapter-bridge': 'pnpm --filter @queuefree/api-client run verify:generated-adapter-bridge',
};

const expectedTasks = {
  'generate:api-client': {
    cache: false,
    outputs: ['packages/api-client/src/generated/**'],
  },
  'verify:generated-adapter-bridge': {
    dependsOn: ['generate:api-client'],
    outputs: [],
  },
};

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

async function readJson(absolutePath, label) {
  if (!(await fileExists(absolutePath))) {
    fail(`Missing ${label}: ${path.relative(repoRoot, absolutePath)}`);
  }

  try {
    return JSON.parse(await readFile(absolutePath, 'utf8'));
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    fail(`Unable to parse ${label}: ${details}`);
  }
}

function assertEqual(label, current, wanted) {
  if (JSON.stringify(current) !== JSON.stringify(wanted)) {
    fail(`${label} mismatch. Current=${JSON.stringify(current)} Wanted=${JSON.stringify(wanted)}`);
  }
}

async function main() {
  const packageJson = await readJson(packageJsonPath, 'package.json');
  const turboJson = await readJson(turboJsonPath, 'turbo.json');

  for (const [name, command] of Object.entries(expectedScripts)) {
    const current = packageJson.scripts?.[name];
    if (!current) {
      fail(`package.json is missing script: ${name}`);
    }

    assertEqual(`package.json script ${name}`, current, command);
  }

  for (const [name, task] of Object.entries(expectedTasks)) {
    const current = turboJson.tasks?.[name];
    if (!current) {
      fail(`turbo.json is missing task: ${name}`);
    }

    assertEqual(`turbo.json task ${name}`, current, task);
  }

  console.log('✅ verify:api-client-root-integration passed');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
