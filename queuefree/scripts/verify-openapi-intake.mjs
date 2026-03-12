import path from 'node:path';
import {
  findOpenApiSpec,
  getApiClientPaths,
  loadOpenApiDocument,
  validateOpenApiDocument
} from './_openapi-helpers.mjs';

const paths = getApiClientPaths();
const specPath = findOpenApiSpec(paths);

if (!specPath) {
  console.log(
    `verify-openapi-intake skipped: no OpenAPI file found under ${path.relative(process.cwd(), paths.openapiRoot)}.`
  );
  process.exit(0);
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

  console.log(
    `verify-openapi-intake passed for ${path.relative(process.cwd(), specPath)} with ${result.operations.length} operations.`
  );

  if (result.warnings.length > 0) {
    console.warn('\nOpenAPI intake warnings:');
    for (const warning of result.warnings) {
      console.warn(`- ${warning}`);
    }
  }
} catch (error) {
  console.error('OpenAPI intake verification crashed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
