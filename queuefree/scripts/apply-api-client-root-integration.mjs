#!/usr/bin/env node

import { constants as fsConstants } from 'node:fs';
import { access, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const packageJsonPath = path.resolve(repoRoot, 'package.json');
const turboJsonPath = path.resolve(repoRoot, 'turbo.json');

const desiredScripts = {
  'generate:api-client': 'pnpm --filter @queuefree/api-client run generate',
  'verify:generated-adapter-bridge': 'pnpm --filter @queuefree/api-client run verify:generated-adapter-bridge',
};

const desiredTurboTasks = {
  'generate:api-client': {
    cache: false,
    outputs: ['packages/api-client/src/generated/**'],
  },
  'verify:generated-adapter-bridge': {
    dependsOn: ['generate:api-client'],
    outputs: [],
  },
};

function log(message) {
  console.log(`[queuefree] ${message}`);
}

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

function stableStringify(value) {
  return JSON.stringify(value, null, 2) + '\n';
}

function sameJson(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
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

function applyScripts(packageJson, force) {
  const next = structuredClone(packageJson);
  next.scripts ??= {};

  for (const [name, command] of Object.entries(desiredScripts)) {
    if (!(name in next.scripts)) {
      next.scripts[name] = command;
      log(`added package.json script: ${name}`);
      continue;
    }

    if (next.scripts[name] === command) {
      continue;
    }

    if (!force) {
      fail(
        [
          `package.json already contains script \`${name}\` with a different value.`,
          `Current: ${next.scripts[name]}`,
          `Wanted:  ${command}`,
          'Re-run with --force to replace it.',
        ].join('\n'),
      );
    }

    next.scripts[name] = command;
    log(`replaced package.json script with --force: ${name}`);
  }

  return next;
}

function ensureTaskShape(existing, wanted, force, label) {
  if (existing == null) {
    return wanted;
  }

  if (sameJson(existing, wanted)) {
    return existing;
  }

  if (!force) {
    fail(
      [
        `turbo.json task \`${label}\` already exists with a different shape.`,
        `Current: ${JSON.stringify(existing)}`,
        `Wanted:  ${JSON.stringify(wanted)}`,
        'Re-run with --force to replace it.',
      ].join('\n'),
    );
  }

  log(`replaced turbo.json task with --force: ${label}`);
  return wanted;
}

function applyTurboTasks(turboJson, force) {
  const next = structuredClone(turboJson);
  next.tasks ??= {};

  for (const [taskName, taskConfig] of Object.entries(desiredTurboTasks)) {
    const hadTask = taskName in next.tasks;
    next.tasks[taskName] = ensureTaskShape(next.tasks[taskName], taskConfig, force, taskName);

    if (!hadTask) {
      log(`added turbo task: ${taskName}`);
    }
  }

  return next;
}

async function main() {
  const force = process.argv.includes('--force');
  const packageJson = await readJson(packageJsonPath, 'package.json');
  const turboJson = await readJson(turboJsonPath, 'turbo.json');

  const nextPackageJson = applyScripts(packageJson, force);
  const nextTurboJson = applyTurboTasks(turboJson, force);

  await writeFile(packageJsonPath, stableStringify(nextPackageJson), 'utf8');
  await writeFile(turboJsonPath, stableStringify(nextTurboJson), 'utf8');

  log('root api-client integration applied');
  log('next steps:');
  log('  1) pnpm run generate:api-client');
  log('  2) pnpm run verify:generated-adapter-bridge');
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
