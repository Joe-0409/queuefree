# Batch 12 Root Integration Check

## Scope

This batch only wires the already-created `packages/api-client` scaffold into the monorepo root.

It does **not**:

- add any new environment variables
- change any public domains
- add or modify API paths
- generate deployment or workflow files

## Expected root scripts

- `generate:api-client`
- `verify:generated-adapter-bridge`

## Expected turbo tasks

- `generate:api-client`
- `verify:generated-adapter-bridge`

## Validation order

1. Run `node scripts/apply-api-client-root-integration.mjs`
2. Run `node scripts/verify-api-client-root-integration.mjs`
3. Run `pnpm run generate:api-client`
4. Run `pnpm run verify:generated-adapter-bridge`
