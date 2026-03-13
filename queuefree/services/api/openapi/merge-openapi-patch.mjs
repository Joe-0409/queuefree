import { readFileSync, writeFileSync } from 'fs';
import jsyaml from 'js-yaml';

const ro = JSON.parse(readFileSync('queuefree.readonly.v1.json', 'utf8'));
const patchYaml = readFileSync('/tmp/batch12c/queuefree_batch12c_write_openapi_patch/services/api/openapi/queuefree.write.v1.patch.yaml', 'utf8');
const patch = jsyaml.load(patchYaml);

// Merge paths
for (const [path, methods] of Object.entries(patch.paths)) {
  ro.paths[path] = methods;
}

// Merge components
for (const [key, val] of Object.entries(patch.components)) {
  if (!ro.components[key]) ro.components[key] = {};
  for (const [k, v] of Object.entries(val)) {
    ro.components[key][k] = v;
  }
}

writeFileSync('openapi.json', JSON.stringify(ro, null, 2));
console.log('Merged', Object.keys(patch.paths).length, 'paths');
console.log('Total paths now:', Object.keys(ro.paths).length);
