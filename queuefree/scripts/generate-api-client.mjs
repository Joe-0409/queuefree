#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { constants as fsConstants } from 'node:fs';
import {
  access,
  mkdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const DEFAULT_SPEC_CANDIDATES = [
  'services/api/openapi/queuefree.readonly.typed.v1.yaml',
  'services/api/openapi/queuefree.readonly.v1.yaml',
  'services/api/openapi/queuefree.v1.yaml',
  'services/api/openapi/openapi.yaml',
  'services/api/openapi/openapi.json',
];

function parseArgs(argv) {
  const parsed = {};

  for (let i = 0; i < argv.length; i += 1) {
    const current = argv[i];

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

async function resolveInput(specArg) {
  if (specArg) {
    const absolute = path.resolve(repoRoot, specArg);

    if (await fileExists(absolute)) {
      return absolute;
    }

    throw new Error(`OpenAPI input not found: ${absolute}`);
  }

  for (const candidate of DEFAULT_SPEC_CANDIDATES) {
    const absolute = path.resolve(repoRoot, candidate);

    if (await fileExists(absolute)) {
      return absolute;
    }
  }

  throw new Error(
    [
      'Unable to resolve an OpenAPI input file.',
      'Checked candidates:',
      ...DEFAULT_SPEC_CANDIDATES.map((candidate) => `- ${candidate}`),
      'Pass --input <path> to override.',
    ].join('\n'),
  );
}

async function loadGenerator() {
  try {
    const module = await import('@hey-api/openapi-ts');

    if (typeof module.createClient !== 'function') {
      throw new Error('`createClient()` was not found in @hey-api/openapi-ts.');
    }

    return module.createClient;
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);

    throw new Error(
      [
        'Unable to load `@hey-api/openapi-ts`.',
        'Install it in the workspace root first, pinned to an exact version.',
        'Example:',
        '  pnpm add -D -E @hey-api/openapi-ts @hey-api/client-fetch',
        `Original error: ${details}`,
      ].join('\n'),
    );
  }
}

async function ensureWorkspaceFiles() {
  const packageRoot = path.resolve(repoRoot, 'packages/api-client');
  const packageIndex = path.resolve(packageRoot, 'src/index.ts');

  await mkdir(path.dirname(packageIndex), { recursive: true });

  const rootIndexSource = `/**\n * Intentionally empty runtime root.\n *\n * Rationale:\n * - Prevent accidental broad imports from \`@queuefree/api-client\` in Expo / Metro.\n * - Runtime SDK imports must use narrow subpaths:\n *   - \`@queuefree/api-client/sdk\`\n *   - \`@queuefree/api-client/client\`\n * - Type imports should use:\n *   - \`@queuefree/api-client/types\`\n */\nexport {};\n`;

  await writeFile(packageIndex, rootIndexSource, 'utf8');
}

async function hardenGeneratedIndex(outputDir) {
  const indexPath = path.resolve(outputDir, 'index.ts');
  const narrowedSource = `/**\n * Narrow generated entry.\n *\n * Keep runtime operation imports on \`sdk.gen.ts\` so Expo / Metro can tree-shake\n * named operation functions more reliably.\n */\nexport * from './types.gen';\nexport { client } from './client.gen';\n`;

  await writeFile(indexPath, narrowedSource, 'utf8');
}

async function verifyRequiredArtifacts(outputDir) {
  const required = ['client.gen.ts', 'sdk.gen.ts', 'types.gen.ts'];
  const missing = [];

  for (const fileName of required) {
    const absolute = path.resolve(outputDir, fileName);
    if (!(await fileExists(absolute))) {
      missing.push(fileName);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Code generation completed, but required files are missing: ${missing.join(', ')}`,
    );
  }
}

async function maybeLogSummary({ input, output }) {
  const relativeInput = path.relative(repoRoot, input) || input;
  const relativeOutput = path.relative(repoRoot, output) || output;
  const packageJsonPath = path.resolve(repoRoot, 'packages/api-client/package.json');
  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8'));

  console.log('[queuefree] generated api client');
  console.log(`  input:  ${relativeInput}`);
  console.log(`  output: ${relativeOutput}`);
  console.log(`  exports: ${Object.keys(packageJson.exports).join(', ')}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const inputRaw = await resolveInput(args.input);
  const output = path.resolve(
    repoRoot,
    typeof args.output === 'string' ? args.output : 'packages/api-client/src/generated',
  );
  const skipVerify = Boolean(args['skip-verify']);
  const keepOutput = Boolean(args['keep-output']);
  const createClient = await loadGenerator();

  await ensureWorkspaceFiles();

  // Strip servers to prevent hardcoding queuefree.com domains
  const openapiContent = JSON.parse(await readFile(inputRaw, 'utf8'));
  if (openapiContent.servers) {
    delete openapiContent.servers;
  }
  const input = path.join(path.dirname(inputRaw), 'openapi.temp.json');
  await writeFile(input, JSON.stringify(openapiContent));

  if (!keepOutput) {
    await rm(output, { recursive: true, force: true });
  }

  await mkdir(output, { recursive: true });

  await createClient({
    input,
    output,
    plugins: [
      '@hey-api/client-fetch',
      {
        name: '@hey-api/sdk',
        operations: {
          strategy: 'flat',
        },
      },
    ],
  });

  await rm(input, { force: true });

  await verifyRequiredArtifacts(output);
  await hardenGeneratedIndex(output);
  await maybeLogSummary({ input: inputRaw, output });

  if (!skipVerify) {
    const verifyScript = path.resolve(repoRoot, 'scripts/verify-generated-adapter-bridge.mjs');
    const result = spawnSync(process.execPath, [verifyScript], {
      cwd: repoRoot,
      stdio: 'inherit',
    });

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
});
