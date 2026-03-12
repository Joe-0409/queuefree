import { createClient } from '@hey-api/openapi-ts';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const openapiFile = process.argv.includes('--input') 
  ? process.argv[process.argv.indexOf('--input') + 1] 
  : path.join(rootDir, 'packages', 'api-client', 'openapi', 'openapi.json');

const outDir = path.join(rootDir, 'packages', 'api-client', 'src', 'generated', 'client');

// Strip servers from openapi.json to avoid hardcoded domains in generated client
const openapiContent = JSON.parse(fs.readFileSync(openapiFile, 'utf8'));
if (openapiContent.servers) {
    delete openapiContent.servers;
}
const tempOpenapiFile = path.join(rootDir, 'packages', 'api-client', 'openapi', 'openapi.temp.json');
fs.writeFileSync(tempOpenapiFile, JSON.stringify(openapiContent));

async function generate() {
  console.log(`Generating API client from ${openapiFile}...`);
  await createClient({
    client: '@hey-api/client-fetch',
    input: tempOpenapiFile,
    output: {
      path: outDir,
      format: 'prettier',
      lint: 'eslint'
    },
    plugins: [
      '@hey-api/client-fetch',
      {
        name: '@hey-api/sdk',
        asClass: false
      }
    ]
  });
  
  fs.unlinkSync(tempOpenapiFile);
  console.log(`Generation complete. SDK exported to ${outDir}`);
}

generate().catch((err) => {
  console.error('\ngenerate-api-client failed during codegen.', err);
  process.exit(1);
});
