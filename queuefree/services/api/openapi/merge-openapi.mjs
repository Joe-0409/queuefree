import { readFileSync, writeFileSync } from 'fs';

const ro = JSON.parse(readFileSync('queuefree.readonly.v1.temp.json', 'utf8'));
const w = JSON.parse(readFileSync('queuefree.write.v1.temp.json', 'utf8'));

for (const [path, methods] of Object.entries(w.paths)) {
  ro.paths[path] = methods;
}

for (const [key, val] of Object.entries(w.components)) {
  if (!ro.components[key]) ro.components[key] = {};
  for (const [k, v] of Object.entries(val)) {
    ro.components[key][k] = v;
  }
}

writeFileSync('openapi.merged.json', JSON.stringify(ro, null, 2));
console.log('Merged paths:', Object.keys(ro.paths).length);
console.log('Schemas:', Object.keys(ro.components.schemas).filter(k => k.startsWith('Create')).join(', '));
