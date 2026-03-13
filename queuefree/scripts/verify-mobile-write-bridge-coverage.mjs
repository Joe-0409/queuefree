import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const violations = [];

const config = {
  name: 'mobile write adapter',
  interfaceFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'mobile-write-adapter.ts'),
  generatedFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'mobile-write-adapter.generated.ts'),
  manifestFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-write-bridge.manifest.ts'),
  bridgeFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-write-bridge.ts')
};

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function extractTypeAliasMethods(fileText, typeName) {
  const start = fileText.indexOf(`export type ${typeName} = {`);
  if (start === -1) {
    return [];
  }
  const body = fileText.slice(start, fileText.indexOf('};', start));
  const methods = [];
  const methodPattern = /^\s*([A-Za-z0-9_]+)\s*\(/gm;
  for (const match of body.matchAll(methodPattern)) {
    methods.push(match[1]);
  }
  return methods;
}

function extractManifestMethods(fileText) {
  return [...fileText.matchAll(/method:\s*'([^']+)'/g)].map((match) => match[1]);
}

function bridgeNameForMethod(method) {
  return `${method}FromGeneratedBridge`;
}

for (const file of [config.interfaceFile, config.generatedFile, config.manifestFile, config.bridgeFile]) {
  if (!fs.existsSync(file)) {
    violations.push(`${config.name}: missing file ${path.relative(repoRoot, file)}`);
  }
}

if (violations.length === 0) {
  const interfaceText = read(config.interfaceFile);
  const generatedText = read(config.generatedFile);
  const manifestText = read(config.manifestFile);
  const bridgeText = read(config.bridgeFile);

  const expectedMethods = extractTypeAliasMethods(interfaceText, 'MobileWriteAdapter');
  const manifestMethods = extractManifestMethods(manifestText);

  for (const method of expectedMethods) {
    if (!manifestMethods.includes(method)) {
      violations.push(`${config.name}: manifest missing method ${method}`);
    }

    const bridgeName = bridgeNameForMethod(method);
    if (!bridgeText.includes(`function ${bridgeName}`) && !bridgeText.includes(`function ${bridgeName}(`)) {
      violations.push(`${config.name}: bridge file missing export ${bridgeName}`);
    }

    if (!generatedText.includes(bridgeName)) {
      violations.push(`${config.name}: generated adapter not delegating via ${bridgeName}`);
    }
  }

  for (const method of manifestMethods) {
    if (!expectedMethods.includes(method)) {
      violations.push(`${config.name}: manifest contains extra method ${method}`);
    }
  }
}

if (violations.length > 0) {
  console.error('Mobile write bridge coverage verification failed\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('✅ verify:mobile-write-bridge-coverage passed');
