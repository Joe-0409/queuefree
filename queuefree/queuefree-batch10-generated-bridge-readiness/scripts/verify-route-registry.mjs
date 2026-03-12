import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const registryPath = path.join(repoRoot, 'docs', 'registry', 'registry-baseline-v1.2.md');
const registryText = fs.readFileSync(registryPath, 'utf8');

function extractList(startHeading, endHeading) {
  const startIndex = registryText.indexOf(startHeading);
  const endIndex = registryText.indexOf(endHeading, startIndex + startHeading.length);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(`Failed to parse registry section: ${startHeading}`);
  }

  const block = registryText.slice(startIndex + startHeading.length, endIndex);
  return block
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => {
      const match = line.match(/`([^`]+)`/);
      return match ? match[1] : line.slice(2).trim();
    });
}

const expectedWebRoutes = new Set(extractList('### Web Public Routes', '### Mobile Routes'));
const expectedMobileRoutes = new Set(extractList('### Mobile Routes', '### Admin Routes'));
const expectedAdminRoutes = new Set(extractList('### Admin Routes', '---'));

function walk(dirPath, predicate) {
  const collected = [];
  if (!fs.existsSync(dirPath)) return collected;

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      collected.push(...walk(fullPath, predicate));
      continue;
    }
    if (predicate(fullPath, entry.name)) {
      collected.push(fullPath);
    }
  }

  return collected;
}

function stripRouteGroups(parts) {
  return parts.filter((part) => !(part.startsWith('(') && part.endsWith(')')));
}

function normalizeNextRoute(relativeFilePath) {
  const withoutPage = relativeFilePath === 'page.tsx'
    ? ''
    : relativeFilePath.replace(/[/\\]page\.tsx$/, '');
  const parts = stripRouteGroups(withoutPage.split(path.sep).filter(Boolean));
  if (parts.length === 0) {
    return '/';
  }
  return `/${parts.join('/')}`;
}

function normalizeMobileRoute(relativeFilePath) {
  const extless = relativeFilePath.replace(/\.tsx$/, '');
  if (extless === 'index') {
    return null;
  }
  const normalized = extless.endsWith(`${path.sep}index`)
    ? extless.slice(0, -`${path.sep}index`.length)
    : extless;
  return `/${normalized.split(path.sep).join('/')}`;
}

function collectWebRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'web', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name === 'page.tsx')
      .map((fullPath) => normalizeNextRoute(path.relative(appDir, fullPath)))
  );
}

function collectAdminRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'admin', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name === 'page.tsx')
      .map((fullPath) => normalizeNextRoute(path.relative(appDir, fullPath)))
  );
}

function collectMobileRoutes() {
  const appDir = path.join(repoRoot, 'apps', 'mobile', 'app');
  return new Set(
    walk(appDir, (_fullPath, name) => name.endsWith('.tsx') && name !== '_layout.tsx')
      .map((fullPath) => normalizeMobileRoute(path.relative(appDir, fullPath)))
      .filter(Boolean)
  );
}

function diffSets(expected, actual) {
  return {
    missing: [...expected].filter((item) => !actual.has(item)).sort(),
    extra: [...actual].filter((item) => !expected.has(item)).sort()
  };
}

const checks = [
  { name: 'web', expected: expectedWebRoutes, actual: collectWebRoutes() },
  { name: 'mobile', expected: expectedMobileRoutes, actual: collectMobileRoutes() },
  { name: 'admin', expected: expectedAdminRoutes, actual: collectAdminRoutes() }
];

const failures = [];

for (const check of checks) {
  const diff = diffSets(check.expected, check.actual);
  if (diff.missing.length > 0 || diff.extra.length > 0) {
    failures.push({ ...check, ...diff });
  }
}

if (failures.length > 0) {
  console.error('Route registry verification failed.');
  for (const failure of failures) {
    console.error(`\n[${failure.name}]`);
    if (failure.missing.length > 0) {
      console.error(`Missing routes: ${failure.missing.join(', ')}`);
    }
    if (failure.extra.length > 0) {
      console.error(`Extra routes: ${failure.extra.join(', ')}`);
    }
  }
  process.exit(1);
}

for (const check of checks) {
  console.log(`Route registry verified for ${check.name}: ${check.actual.size} routes aligned with registry.`);
}
