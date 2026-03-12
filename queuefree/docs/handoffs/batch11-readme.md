# Batch 11: Screen Model Validation & Repository Layer

This batch introduces a robust validation layer for front-end screen models and prepares the repository layer for the upcoming OpenAPI integration.

## Key Changes
1. **Screen Model Validation**: Added Zod schemas in `apps/mobile/src/schemas` and `apps/admin/src/schemas` to validate data entering the UI layer.
2. **Repository Pattern**: Implemented repository classes to encapsulate data fetching and transformation, ensuring UI components are decoupled from the raw API structure.
3. **Guardrail Check**: New script `scripts/verify-screen-model-validation-boundary.mjs` to ensure the new layer is used correctly.
4. **Visibility Banner**: Updated banners to reflect the progress towards full API integration.

## Implementation Details
- The flow is now: `Page -> Query Hook -> Repository -> Screen-Model Validation -> Read Adapter`.
- Adapters currently remain in Mock mode but are now being piped through the validation layer.
- Once the typed SDK is fully utilized in the next batch, we only need to switch the adapter implementation.

## Verification
- Run `pnpm verify:frontend-guardrails` to confirm all boundaries are respected.
- Full typecheck passed.
