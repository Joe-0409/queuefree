import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const appRoots = [
  path.join(repoRoot, 'apps', 'mobile', 'src'),
  path.join(repoRoot, 'apps', 'admin', 'src')
];
const fileExtensions = new Set(['.ts', '.tsx', '.js', '.mjs']);
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

    if (!fileExtensions.has(path.extname(entry.name))) {
      continue;
    }

    const relPath = path.relative(repoRoot, fullPath);
    const text = fs.readFileSync(fullPath, 'utf8');

    const importsApiClient = text.includes('@queuefree/api-client');
    const isGeneratedAdapter = relPath.includes('/adapters/') && relPath.endsWith('.generated.ts');
    const isReadinessFile = relPath.includes('/adapters/') && relPath.endsWith('.readiness.ts');
    const isGeneratedBridge = relPath.includes('/generated-bridge/');

    if (importsApiClient && !isGeneratedAdapter && !isReadinessFile && !isGeneratedBridge) {
      violations.push(`${relPath}: @queuefree/api-client may only be imported inside adapter *.generated.ts, *.readiness.ts, or generated-bridge files.`);
    }

    if ((isGeneratedAdapter || isGeneratedBridge) && (text.includes('demo-data') || text.includes('admin-content'))) {
      violations.push(`${relPath}: generated adapter/bridge must not import mock/demo content sources.`);
    }

    if (isGeneratedBridge && (text.includes('.mock') || text.includes('mockMobileReadAdapter') || text.includes('mockAdminReadAdapter'))) {
      violations.push(`${relPath}: generated bridge must not depend on mock adapters.`);
    }
  }
}

for (const root of appRoots) {
  walk(root);
}

if (violations.length > 0) {
  console.error('Generated adapter bridge verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Generated adapter bridge verified. api-client imports stay inside generated/readiness/bridge files only.');
