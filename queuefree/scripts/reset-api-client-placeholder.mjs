import { getApiClientPaths, resetGeneratedArtifacts, writePlaceholderIndex } from './_openapi-helpers.mjs';

try {
  const paths = getApiClientPaths();
  resetGeneratedArtifacts(paths);
  writePlaceholderIndex(paths);
  console.log('reset-api-client-placeholder passed. packages/api-client returned to pre-OpenAPI placeholder mode.');
} catch (error) {
  console.error('reset-api-client-placeholder crashed:');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
