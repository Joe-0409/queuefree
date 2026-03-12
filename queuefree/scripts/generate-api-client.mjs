import path from 'node:path';
import {
  findOpenApiSpec,
  getApiClientPaths,
  hasGeneratedClient,
  loadOpenApiDocument,
  resetGeneratedArtifacts,
  validateOpenApiDocument,
  writeGeneratedIndex,
  writeGenerationStamp
} from './_openapi-helpers.mjs';

const paths = getApiClientPaths();
const specPath = findOpenApiSpec(paths);

if (!specPath) {
  console.error(
    `generate-api-client failed: no OpenAPI file found under ${path.relative(process.cwd(), paths.openapiRoot)}. ` +
    'Ask backend to export openapi.json / openapi.yaml first.'
  );
  process.exit(1);
}

try {
  const spec = await loadOpenApiDocument(specPath);
  const result = validateOpenApiDocument(spec);

  if (result.violations.length > 0) {
    console.error(`OpenAPI intake verification failed for ${path.relative(process.cwd(), specPath)}:\n`);
    for (const violation of result.violations) {
      console.error(`- ${violation}`);
    }
    process.exit(1);
  }

  const { generate } = await import('openapi-typescript-codegen');

  resetGeneratedArtifacts(paths);

  await generate({
    input: specPath,
    output: paths.generatedClientRoot,
    httpClient: 'fetch',
    useOptions: true,
    useUnionTypes: false,
    exportCore: true,
    exportServices: true,
    exportModels: true,
    exportSchemas: false
  });

  if (!hasGeneratedClient(paths)) {
    console.error('generate-api-client failed: generator finished but packages/api-client/src/generated/client/index.ts was not created.');
    process.exit(1);
  }

  writeGeneratedIndex(paths);
  writeGenerationStamp(paths, specPath, result.operations.length);

  console.log(
    `generate-api-client passed. Generated SDK from ${path.relative(process.cwd(), specPath)} into ${path.relative(process.cwd(), paths.generatedClientRoot)}.`
  );

  if (result.warnings.length > 0) {
    console.warn('\nOpenAPI generation warnings:');
    for (const warning of result.warnings) {
      console.warn(`- ${warning}`);
    }
  }
} catch (error) {
  console.error('generate-api-client crashed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
