#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const violations = [];

const configs = [
  {
    name: 'mobile read adapter',
    interfaceFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'mobile-read-adapter.ts'),
    manifestFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-bridge.manifest.ts'),
    bridgeFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-screen-bridge.ts'),
    fetcherFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-fetchers.ts'),
    mapperFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'mobile-generated-mappers.ts'),
    typeName: 'MobileReadAdapter'
  },
  {
    name: 'mobile runtime-config adapter',
    interfaceFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'adapters', 'runtime-config-adapter.ts'),
    manifestFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'runtime-config-generated-bridge.manifest.ts'),
    bridgeFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'runtime-config-generated-bridge.ts'),
    fetcherFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'runtime-config-generated-fetchers.ts'),
    mapperFile: path.join(repoRoot, 'apps', 'mobile', 'src', 'generated-bridge', 'runtime-config-generated-mappers.ts'),
    typeName: 'RuntimeConfigAdapter'
  },
  {
    name: 'admin read adapter',
    interfaceFile: path.join(repoRoot, 'apps', 'admin', 'src', 'adapters', 'admin-read-adapter.ts'),
    manifestFile: path.join(repoRoot, 'apps', 'admin', 'src', 'generated-bridge', 'admin-generated-bridge.manifest.ts'),
    bridgeFile: path.join(repoRoot, 'apps', 'admin', 'src', 'generated-bridge', 'admin-generated-screen-bridge.ts'),
    fetcherFile: path.join(repoRoot, 'apps', 'admin', 'src', 'generated-bridge', 'admin-generated-fetchers.ts'),
    mapperFile: path.join(repoRoot, 'apps', 'admin', 'src', 'generated-bridge', 'admin-generated-mappers.ts'),
    typeName: 'AdminReadAdapter'
  }
];

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

function fetcherNameForMethod(method) {
  if (method === 'getRuntimeConfig') return 'fetchRuntimeConfigRawFromGeneratedSource';
  return `fetch${method.slice(5)}RawFromGeneratedSource`;
}

function mapperNameForMethod(method) {
  if (method === 'getRuntimeConfig') return 'mapGeneratedRuntimeConfigPayload';
  return `mapGenerated${method.slice(5)}Payload`;
}

for (const config of configs) {
  for (const file of [config.interfaceFile, config.manifestFile, config.bridgeFile, config.fetcherFile, config.mapperFile]) {
    if (!fs.existsSync(file)) {
      violations.push(`${config.name}: missing file ${path.relative(repoRoot, file)}`);
    }
  }
  if (violations.length > 0) {
    continue;
  }

  const interfaceText = read(config.interfaceFile);
  const manifestText = read(config.manifestFile);
  const bridgeText = read(config.bridgeFile);
  const fetcherText = read(config.fetcherFile);
  const mapperText = read(config.mapperFile);

  const expectedMethods = extractTypeAliasMethods(interfaceText, config.typeName);
  const manifestMethods = extractManifestMethods(manifestText);

  for (const method of expectedMethods) {
    const bridgeName = bridgeNameForMethod(method);
    const fetcherName = fetcherNameForMethod(method);
    const mapperName = mapperNameForMethod(method);

    if (!manifestMethods.includes(method)) {
      violations.push(`${config.name}: manifest missing method ${method}`);
    }

    if (!bridgeText.includes(bridgeName)) {
      violations.push(`${config.name}: bridge file missing ${bridgeName}`);
    }

    if (!fetcherText.includes(fetcherName)) {
      violations.push(`${config.name}: fetcher file missing ${fetcherName}`);
    }

    if (!mapperText.includes(mapperName)) {
      violations.push(`${config.name}: mapper file missing ${mapperName}`);
    }

    if (!manifestText.includes(`bridge: '${bridgeName}'`)) {
      violations.push(`${config.name}: manifest missing bridge name ${bridgeName}`);
    }

    if (!manifestText.includes(`fetcher: '${fetcherName}'`)) {
      violations.push(`${config.name}: manifest missing fetcher name ${fetcherName}`);
    }

    if (!manifestText.includes(`mapper: '${mapperName}'`)) {
      violations.push(`${config.name}: manifest missing mapper name ${mapperName}`);
    }
  }

  for (const method of manifestMethods) {
    if (!expectedMethods.includes(method)) {
      violations.push(`${config.name}: manifest contains extra method ${method}`);
    }
  }
}

if (violations.length > 0) {
  console.error('Generated fetch/map slot verification failed:\n');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log('Generated fetch/map slots verified. Every generated adapter method now has manifest + bridge + fetcher + mapper coverage.');
