import fs from 'node:fs';
import path from 'node:path';

export const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];
export const OPENAPI_SPEC_CANDIDATES = [
 'openapi.json',
 'openapi.yaml',
 'openapi.yml',
 'spec.json',
 'spec.yaml',
 'spec.yml'
];

export const PLACEHOLDER_INDEX_CONTENT = `/**
 * QueueFree pre-OpenAPI placeholder.
 *
 * Do not add hand-written business contracts here.
 * Replace this file with a generated SDK entrypoint only after backend exports OpenAPI.
 */
export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'placeholder';
export const API_CLIENT_IS_GENERATED = false;

export async function loadGeneratedApiClient(): Promise<never> {
 throw new Error(
 '[QueueFree api-client] packages/api-client is still in placeholder mode. ' +
 'Ask backend to export OpenAPI first, then run pnpm generate:api-client.'
 );
}
`;

export const GENERATED_INDEX_CONTENT = `/**
 * QueueFree generated SDK barrel.
 *
 * This file is rewritten by scripts/generate-api-client.mjs.
 * Do not hand-edit.
 */
export * from './generated/client';

export type ApiClientRuntimeMode = 'placeholder' | 'generated';

export const API_CLIENT_RUNTIME_MODE: ApiClientRuntimeMode = 'generated';
export const API_CLIENT_IS_GENERATED = true;

export async function loadGeneratedApiClient() {
 return import('./generated/client');
}
`;

export function getRepoRoot() {
 return process.cwd();
}

export function getApiClientPaths(repoRoot = getRepoRoot()) {
 const packageRoot = path.join(repoRoot, 'packages', 'api-client');
 const openapiRoot = path.join(packageRoot, 'openapi');
 const srcRoot = path.join(packageRoot, 'src');
 const generatedRoot = path.join(srcRoot, 'generated');
 const generatedClientRoot = path.join(generatedRoot, 'client');

 return {
 packageRoot,
 openapiRoot,
 srcRoot,
 generatedRoot,
 generatedClientRoot,
 indexPath: path.join(srcRoot, 'index.ts'),
 stampPath: path.join(generatedRoot, '.generated-stamp.json'),
 gitkeepPath: path.join(generatedRoot, '.gitkeep')
 };
}

export function ensureGeneratedRoot(paths = getApiClientPaths()) {
 fs.mkdirSync(paths.generatedRoot, { recursive: true });
 if (!fs.existsSync(paths.gitkeepPath)) {
 fs.writeFileSync(paths.gitkeepPath, '');
 }
}

export function writePlaceholderIndex(paths = getApiClientPaths()) {
 fs.writeFileSync(paths.indexPath, PLACEHOLDER_INDEX_CONTENT);
}

export function writeGeneratedIndex(paths = getApiClientPaths()) {
 fs.writeFileSync(paths.indexPath, GENERATED_INDEX_CONTENT);
}

export function resetGeneratedArtifacts(paths = getApiClientPaths()) {
 if (fs.existsSync(paths.generatedClientRoot)) {
 fs.rmSync(paths.generatedClientRoot, { recursive: true, force: true });
 }

 if (fs.existsSync(paths.stampPath)) {
 fs.rmSync(paths.stampPath, { force: true });
 }

 ensureGeneratedRoot(paths);
}

export function hasGeneratedClient(paths = getApiClientPaths()) {
 return fs.existsSync(path.join(paths.generatedClientRoot, 'index.ts'));
}

export function findOpenApiSpec(paths = getApiClientPaths()) {
 for (const candidate of OPENAPI_SPEC_CANDIDATES) {
 const candidatePath = path.join(paths.openapiRoot, candidate);
 if (fs.existsSync(candidatePath)) {
 return candidatePath;
 }
 }

 return null;
}

export async function loadOpenApiDocument(specPath) {
 const rawText = fs.readFileSync(specPath, 'utf8');
 const ext = path.extname(specPath).toLowerCase();

 if (ext === '.json') {
 return JSON.parse(rawText);
 }

 if (ext === '.yaml' || ext === '.yml') {
 const yamlModule = await import('yaml');
 return yamlModule.parse(rawText);
 }

 throw new Error(`Unsupported OpenAPI extension: ${ext}`);
}

export function collectOperations(spec) {
 const operations = [];
 const pathsObject = spec?.paths ?? {};

 for (const [routePath, pathItem] of Object.entries(pathsObject)) {
 if (!pathItem || typeof pathItem !== 'object') continue;

 for (const method of HTTP_METHODS) {
 const operation = pathItem[method];
 if (!operation || typeof operation !== 'object') continue;

 operations.push({
 path: routePath,
 method,
 operation
 });
 }
 }

 return operations;
}

export function validateOpenApiDocument(spec) {
 const violations = [];
 const warnings = [];

 if (!spec || typeof spec !== 'object') {
 return {
 violations: ['OpenAPI document is empty or not an object.'],
 warnings,
 operations: []
 };
 }

 const version = typeof spec.openapi === 'string' ? spec.openapi : '';
 if (!version.startsWith('3.')) {
 violations.push(`OpenAPI version must start with 3.x. Received: ${version || '<missing>'}`);
 }

 const operations = collectOperations(spec);
 if (operations.length === 0) {
 violations.push('OpenAPI document does not contain any HTTP operations under paths.');
 }

 const allowedPrefixes = ['/v1', '/v1/admin'];
 const operationIds = new Map();

 for (const item of operations) {
 if (!allowedPrefixes.some((prefix) => item.path === prefix || item.path.startsWith(`${prefix}/`))) {
 violations.push(`Path ${item.path} is outside the frozen API prefixes /v1 and /v1/admin.`);
 }

 const operationId = typeof item.operation.operationId === 'string' ? item.operation.operationId.trim() : '';
 if (!operationId) {
 violations.push(`${item.method.toUpperCase()} ${item.path} is missing operationId.`);
 } else if (operationIds.has(operationId)) {
 violations.push(
 `${item.method.toUpperCase()} ${item.path} duplicates operationId ${operationId} already used by ${operationIds.get(operationId)}.`
 );
 } else {
 operationIds.set(operationId, `${item.method.toUpperCase()} ${item.path}`);
 }

 if (!item.operation.tags || !Array.isArray(item.operation.tags) || item.operation.tags.length === 0) {
 warnings.push(`${item.method.toUpperCase()} ${item.path} does not declare tags. Generation still works, but module ownership becomes less clear.`);
 }
 }

 return { violations, warnings, operations };
}

export function writeGenerationStamp(paths, specPath, operationCount) {
 const payload = {
 specFile: path.relative(getRepoRoot(), specPath),
 generatedAt: new Date().toISOString(),
 generator: 'openapi-typescript-codegen',
 operationCount
 };

 fs.writeFileSync(paths.stampPath, JSON.stringify(payload, null, 2) + '\n');
}
