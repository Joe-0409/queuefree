import fs from 'node:fs';
import path from 'node:path';
import {
  findOpenApiSpec,
  GENERATED_INDEX_CONTENT,
  getApiClientPaths,
  hasGeneratedClient,
  PLACEHOLDER_INDEX_CONTENT
} from './_openapi-helpers.mjs';

const paths = getApiClientPaths();
const specPath = findOpenApiSpec(paths);
const generatedClientExists = hasGeneratedClient(paths);
const indexText = fs.readFileSync(paths.indexPath, 'utf8');

if (!specPath && !generatedClientExists) {
  if (indexText !== PLACEHOLDER_INDEX_CONTENT) {
    console.error('verify-generated-api-client failed: packages/api-client/src/index.ts should stay in placeholder mode before OpenAPI generation.');
    process.exit(1);
  }

  console.log('verify-generated-api-client skipped: no OpenAPI spec and no generated client detected. Placeholder mode is intact.');
  process.exit(0);
}

if (specPath && !generatedClientExists) {
  console.error(
    `verify-generated-api-client failed: ${path.relative(process.cwd(), specPath)} exists, but packages/api-client/src/generated/client/index.ts does not. Run pnpm generate:api-client.`
  );
  process.exit(1);
}

if (!specPath && generatedClientExists) {
  console.error('verify-generated-api-client failed: generated client exists but no source OpenAPI file was found in packages/api-client/openapi.');
  process.exit(1);
}

if (indexText.includes('export *') || !indexText.includes('export {};')) {
  console.error('verify-generated-api-client failed: packages/api-client/src/index.ts must not have exports. Re-run pnpm generate:api-client.');
  process.exit(1);
}

const manualTopLevelFiles = fs
  .readdirSync(paths.srcRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name !== 'index.ts')
  .map((entry) => entry.name);

if (manualTopLevelFiles.length > 0) {
  console.error(
    `verify-generated-api-client failed: unexpected top-level manual files exist in packages/api-client/src: ${manualTopLevelFiles.join(', ')}`
  );
  process.exit(1);
}

console.log('verify-generated-api-client passed. Generated SDK and barrel export are aligned.');
