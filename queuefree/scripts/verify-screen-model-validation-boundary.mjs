import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const violations = [];

const requiredFiles = [
  {
    file: path.join(repoRoot, 'apps', 'mobile', 'src', 'lib', 'mobile-repository.ts'),
    mustInclude: ['mobile-screen-validators'],
    description: 'mobile repository must validate adapter output via mobile-screen-validators'
  },
  {
    file: path.join(repoRoot, 'apps', 'admin', 'src', 'lib', 'admin-repository.ts'),
    mustInclude: ['admin-screen-validators'],
    description: 'admin repository must validate adapter output via admin-screen-validators'
  }
];

for (const check of requiredFiles) {
  const exists = statSync(check.file, { throwIfNoEntry: false });
  if (!exists) {
    violations.push(`${check.description}: missing file ${path.relative(repoRoot, check.file)}`);
    continue;
  }

  const content = readFileSync(check.file, 'utf8');
  for (const fragment of check.mustInclude) {
    if (!content.includes(fragment)) {
      violations.push(`${check.description}: ${path.relative(repoRoot, check.file)}`);
    }
  }
}

const disallowedImports = [
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters'),
    blockedFragments: ['/schemas/', 'screen-validators'],
    description: 'mobile adapters must stay raw and must not own screen-model validation'
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'src', 'adapters'),
    blockedFragments: ['/schemas/', 'screen-validators'],
    description: 'admin adapters must stay raw and must not own screen-model validation'
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'mobile', 'app'),
    blockedFragments: ['screen-validators', '/schemas/'],
    description: 'mobile route files must not import screen validators or schemas directly'
  },
  {
    rootDir: path.join(repoRoot, 'apps', 'admin', 'app'),
    blockedFragments: ['screen-validators', '/schemas/'],
    description: 'admin route files must not import screen validators or schemas directly'
  }
];

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  let files = [];

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walk(absolutePath));
    } else if (/\.(ts|tsx|js|mjs)$/.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

for (const check of disallowedImports) {
  const rootExists = statSync(check.rootDir, { throwIfNoEntry: false });
  if (!rootExists) {
    continue;
  }

  const files = walk(check.rootDir);

  for (const filePath of files) {
    const content = readFileSync(filePath, 'utf8');
    for (const fragment of check.blockedFragments) {
      if (content.includes(fragment)) {
        violations.push(`${check.description}: ${path.relative(repoRoot, filePath)}`);
      }
    }
  }
}

if (violations.length > 0) {
  console.error('Screen-model validation boundary violations found:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('verify-screen-model-validation passed');
