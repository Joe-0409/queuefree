import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const generatedDir = path.join(repoRoot, 'packages', 'api-client', 'src', 'generated');
const hasGeneratedClient = fs.existsSync(generatedDir)
  && fs.readdirSync(generatedDir).some((name) => !name.startsWith('.'));

if (hasGeneratedClient) {
  console.log('Generated api-client detected. Pre-OpenAPI frontend boundary check is skipped.');
  process.exit(0);
}

const forbiddenEnvTokens = [
  'EXPO_PUBLIC_ENV_NAME',
  'EXPO_PUBLIC_ENABLE_DEMO_MODE'
];

const forbiddenApiFragments = ['/v1/', '/v1/admin'];
const allowedFilesForApiFragments = new Set([
  path.normalize('docs/contracts/queuefree-collaboration-contract-v1.2.md'),
  path.normalize('docs/registry/registry-baseline-v1.2.md')
]);

const scanRoots = [
  'apps',
  path.join('packages', 'api-client'),
  path.join('docs', 'contracts'),
  path.join('docs', 'handoffs')
];

const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json']);
const violations = [];

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
    if (!textExtensions.has(ext) && entry.name !== '.env.example') {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const normalizedRelPath = path.normalize(relPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    for (const token of forbiddenEnvTokens) {
      if (text.includes(token)) {
        violations.push(`${relPath}: contains forbidden pre-registry env token ${token}`);
      }
    }

    if (!allowedFilesForApiFragments.has(normalizedRelPath)) {
      for (const fragment of forbiddenApiFragments) {
        if (text.includes(fragment)) {
          violations.push(`${relPath}: contains hard-coded API fragment ${fragment} before OpenAPI generation`);
        }
      }
    }
  }
}

for (const root of scanRoots) {
  walk(path.join(repoRoot, root));
}

const illegalManualClientFile = path.join(repoRoot, 'packages', 'api-client', 'src', 'endpoints.ts');
if (fs.existsSync(illegalManualClientFile)) {
  violations.push('packages/api-client/src/endpoints.ts should not exist before OpenAPI generation.');
}

if (violations.length > 0) {
  console.error('Registry-first frontend verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Registry-first frontend verification passed. No forbidden pre-OpenAPI API path or env token was found.');
