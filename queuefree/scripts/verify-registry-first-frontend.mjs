import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'docs', 'registry', 'registry-baseline-v1.2.md');
const registryText = fs.readFileSync(registryPath, 'utf8');

const generatedDir = path.join(repoRoot, 'packages', 'api-client', 'src', 'generated');
const hasGeneratedClient = fs.existsSync(generatedDir)
  && fs.readdirSync(generatedDir).some((name) => !name.startsWith('.'));

const forbiddenApiFragments = ['/v1/', '/v1/admin'];
const allowedFilesForApiFragments = new Set([
  path.normalize('docs/contracts/queuefree-collaboration-contract-v1.2.md'),
  path.normalize('docs/registry/registry-baseline-v1.2.md')
]);

const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json']);
const codeScanRoots = [
  'apps',
  path.join('packages', 'api-client'),
  path.join('docs', 'contracts'),
  path.join('docs', 'handoffs')
];
const appScanRoots = [
  path.join('apps', 'mobile'),
  path.join('apps', 'web'),
  path.join('apps', 'admin')
];
const violations = [];

function extractEnvSection(appName, nextHeading) {
  const startHeading = `### ${appName}`;
  const startIndex = registryText.indexOf(startHeading);
  const endIndex = registryText.indexOf(nextHeading, startIndex + startHeading.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Failed to parse environment registry for ${appName}`);
  }

  return registryText
    .slice(startIndex + startHeading.length, endIndex)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/`([^`]+)`/);
      return match ? match[1] : line.slice(2).trim();
    })
    .filter((token) => token.startsWith('EXPO_PUBLIC_') || token.startsWith('NEXT_PUBLIC_'));
}

const allowedEnvByApp = {
  mobile: new Set(extractEnvSection('mobile', '### web')),
  web: new Set(extractEnvSection('web', '### admin')),
  admin: new Set(extractEnvSection('admin', '### api'))
};

function walk(dirPath, onFile) {
  if (!fs.existsSync(dirPath)) return;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.turbo' || entry.name === 'dist') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, onFile);
      continue;
    }

    const ext = path.extname(entry.name);
    if (!textExtensions.has(ext) && entry.name !== '.env.example') {
      continue;
    }

    onFile(fullPath, entry.name);
  }
}

function detectAppType(relPath) {
  if (relPath.startsWith(path.normalize(path.join('apps', 'mobile')))) return 'mobile';
  if (relPath.startsWith(path.normalize(path.join('apps', 'web')))) return 'web';
  if (relPath.startsWith(path.normalize(path.join('apps', 'admin')))) return 'admin';
  return null;
}

function collectPublicEnvTokens(text) {
  return [...new Set(text.match(/\b(?:EXPO_PUBLIC|NEXT_PUBLIC)_[A-Z0-9_]+\b/g) ?? [])];
}

for (const root of codeScanRoots) {
  walk(path.join(repoRoot, root), (fullPath) => {
    const relPath = path.relative(repoRoot, fullPath);
    const normalizedRelPath = path.normalize(relPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    if (!hasGeneratedClient && !allowedFilesForApiFragments.has(normalizedRelPath)) {
      for (const fragment of forbiddenApiFragments) {
        if (text.includes(fragment)) {
          violations.push(`${relPath}: contains hard-coded API fragment ${fragment} before OpenAPI generation`);
        }
      }
    }
  });
}

for (const root of appScanRoots) {
  walk(path.join(repoRoot, root), (fullPath, fileName) => {
    const relPath = path.relative(repoRoot, fullPath);
    const appType = detectAppType(path.normalize(relPath));
    if (!appType) return;

    const text = fs.readFileSync(fullPath, 'utf8');
    const tokens = collectPublicEnvTokens(text);
    const allowed = allowedEnvByApp[appType];

    for (const token of tokens) {
      if (!allowed.has(token)) {
        violations.push(`${relPath}: references non-registered public env token ${token}`);
      }
    }

    if (fileName === '.env.example') {
      const declared = new Set(
        text
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line && !line.startsWith('#') && line.includes('='))
          .map((line) => line.split('=')[0].trim())
      );

      for (const token of allowed) {
        if (!declared.has(token)) {
          violations.push(`${relPath}: missing registered public env token ${token}`);
        }
      }

      for (const token of declared) {
        if ((token.startsWith('EXPO_PUBLIC_') || token.startsWith('NEXT_PUBLIC_')) && !allowed.has(token)) {
          violations.push(`${relPath}: declares non-registered public env token ${token}`);
        }
      }
    }
  });
}

const illegalManualClientFile = path.join(repoRoot, 'packages', 'api-client', 'src', 'endpoints.ts');
if (!hasGeneratedClient && fs.existsSync(illegalManualClientFile)) {
  violations.push('packages/api-client/src/endpoints.ts should not exist before OpenAPI generation.');
}

if (violations.length > 0) {
  console.error('Registry-first frontend verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

if (hasGeneratedClient) {
  console.log('Generated api-client detected. Pre-OpenAPI API fragment checks were skipped. Env registry checks still passed.');
} else {
  console.log('Registry-first frontend verification passed. No forbidden pre-OpenAPI API path or non-registered public env token was found.');
}
