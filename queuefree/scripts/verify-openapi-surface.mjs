#!/usr/bin/env node

import { constants as fsConstants } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const DEFAULT_SPEC_CANDIDATES = [
  'services/api/openapi/openapi.json',
  'services/api/openapi/openapi.yaml',
  'services/api/openapi/openapi.yml',
  'services/api/openapi/queuefree.openapi.json',
  'services/api/openapi/queuefree.v1.json',
  'services/api/openapi/queuefree.v1.yaml',
  'services/api/openapi/queuefree.v1.yml',
];

const CURRENT_CONFIRMED_BASELINE_PATHS = [
  '/v1/admin/dashboard/summary',
  '/v1/health',
  '/v1/invites/me',
  '/v1/invites/records',
  '/v1/me',
  '/v1/orders',
  '/v1/orders/{orderId}/payment-intents',
  '/v1/products',
  '/v1/products/{productId}',
  '/v1/queue-entries',
  '/v1/queue-entries/{queueEntryId}',
  '/v1/queue-guard',
  '/v1/queue-guard/check-in',
  '/v1/rules',
  '/v1/rules/{slug}',
  '/v1/system/runtime-config',
  '/v1/tasks',
  '/v1/wallet',
  '/v1/wallet/ledgers',
  '/v1/withdrawals',
];

function parseArgs(argv) {
  const parsed = {
    enforceBaseline: true,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];

    if (current === '--no-baseline') {
      parsed.enforceBaseline = false;
      continue;
    }

    if (!current.startsWith('--')) {
      continue;
    }

    const key = current.slice(2);
    const next = argv[i + 1];

    if (!next || next.startsWith('--')) {
      parsed[key] = true;
      continue;
    }

    parsed[key] = next;
    i += 1;
  }

  return parsed;
}

async function fileExists(absolutePath) {
  try {
    await access(absolutePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function resolveInput(inputArg) {
  if (typeof inputArg === 'string') {
    const absolute = path.resolve(repoRoot, inputArg);

    if (await fileExists(absolute)) {
      return absolute;
    }

    throw new Error(`OpenAPI document not found: ${absolute}`);
  }

  for (const candidate of DEFAULT_SPEC_CANDIDATES) {
    const absolute = path.resolve(repoRoot, candidate);

    if (await fileExists(absolute)) {
      return absolute;
    }
  }

  throw new Error(
    [
      'Unable to resolve an OpenAPI document.',
      'Checked candidates:',
      ...DEFAULT_SPEC_CANDIDATES.map((candidate) => `- ${candidate}`),
      'Pass --input <path> to override.',
    ].join('\n'),
  );
}

async function loadDocument(inputPath) {
  const source = await readFile(inputPath, 'utf8');

  try {
    return JSON.parse(source);
  } catch {}

  try {
    const yaml = await import('yaml');
    return yaml.parse(source);
  } catch (error) {
    const reason = error instanceof Error ? error.message : String(error);
    throw new Error(
      [
        `Failed to parse OpenAPI document: ${inputPath}`,
        'JSON parsing failed and the optional `yaml` package is unavailable.',
        'Either export JSON or install `yaml` in the workspace root.',
        `Original error: ${reason}`,
      ].join('\n'),
    );
  }
}

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function collectOperations(document) {
  const operations = [];
  const paths = document.paths ?? {};

  for (const [routePath, methods] of Object.entries(paths)) {
    if (!methods || typeof methods !== 'object') {
      continue;
    }

    for (const [httpMethod, operation] of Object.entries(methods)) {
      if (!operation || typeof operation !== 'object') {
        continue;
      }

      const normalizedMethod = httpMethod.toLowerCase();
      if (!['get', 'post', 'put', 'patch', 'delete'].includes(normalizedMethod)) {
        continue;
      }

      operations.push({
        path: routePath,
        method: normalizedMethod,
        operationId: operation.operationId ?? null,
      });
    }
  }

  return operations;
}

function validateOperationIds(operations) {
  const seen = new Map();
  const missing = [];
  const duplicates = [];

  for (const op of operations) {
    if (!op.operationId) {
      missing.push(`${op.method.toUpperCase()} ${op.path}`);
      continue;
    }

    if (seen.has(op.operationId)) {
      duplicates.push({
        operationId: op.operationId,
        locations: [seen.get(op.operationId), `${op.method.toUpperCase()} ${op.path}`],
      });
    } else {
      seen.set(op.operationId, `${op.method.toUpperCase()} ${op.path}`);
    }
  }

  return { missing, duplicates };
}

function validatePaths(document, operations) {
  const violations = [];

  for (const routePath of Object.keys(document.paths ?? {})) {
    if (!routePath.startsWith('/v1/')) {
      violations.push(`Path "${routePath}" does not start with /v1/`);
    }
  }

  return violations;
}

function validateServers(document) {
  const violations = [];
  const servers = document.servers ?? [];

  for (const server of servers) {
    if (!server.url) {
      continue;
    }

    if (server.url.includes('/v1')) {
      violations.push(`Server URL "${server.url}" should not include /v1`);
    }
  }

  return violations;
}

function validateBaseline(operations) {
  const presentPaths = new Set(operations.map((op) => op.path));
  const missing = [];

  for (const baselinePath of CURRENT_CONFIRMED_BASELINE_PATHS) {
    if (!presentPaths.has(baselinePath)) {
      missing.push(baselinePath);
    }
  }

  return missing;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputPath = await resolveInput(args.input);
  const document = await loadDocument(inputPath);

  const operations = collectOperations(document);

  const pathViolations = validatePaths(document, operations);
  const serverViolations = validateServers(document);
  const { missing: missingOperationIds, duplicates } = validateOperationIds(operations);

  let baselineMissing = [];
  if (args.enforceBaseline) {
    baselineMissing = validateBaseline(operations);
  }

  let hasError = false;

  if (pathViolations.length > 0) {
    hasError = true;
    console.error('❌ Path prefix violations:');
    for (const violation of pathViolations) {
      console.error(`  - ${violation}`);
    }
  }

  if (serverViolations.length > 0) {
    hasError = true;
    console.error('❌ Server URL violations:');
    for (const violation of serverViolations) {
      console.error(`  - ${violation}`);
    }
  }

  if (missingOperationIds.length > 0) {
    hasError = true;
    console.error('❌ Missing operationId:');
    for (const op of missingOperationIds) {
      console.error(`  - ${op}`);
    }
  }

  if (duplicates.length > 0) {
    hasError = true;
    console.error('❌ Duplicate operationId:');
    for (const dup of duplicates) {
      console.error(`  - "${dup.operationId}" used by:`);
      for (const loc of dup.locations) {
        console.error(`    • ${loc}`);
      }
    }
  }

  if (baselineMissing.length > 0) {
    hasError = true;
    console.error('❌ Baseline paths missing:');
    for (const path of baselineMissing) {
      console.error(`  - ${path}`);
    }
  }

  if (hasError) {
    console.error('');
    fail('OpenAPI surface validation failed.');
  }

  console.log('✅ OpenAPI surface validation passed.');
  console.log(`   - ${operations.length} operations validated`);
  console.log(`   - ${Object.keys(document.paths ?? {}).length} paths`);
  console.log(`   - ${document.servers?.length ?? 0} servers`);
  if (args.enforceBaseline) {
    console.log(`   - ${CURRENT_CONFIRMED_BASELINE_PATHS.length} baseline paths confirmed`);
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`❌ ${message}`);
  process.exit(1);
});
