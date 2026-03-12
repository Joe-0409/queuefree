# Frontend-Server Handoff: Batch 11 Screen Model Validation

**Current State**: Frontend has entered Batch 11. Infrastructure for data validation is now local to the apps.

**Constraints for Server/Backend**:
1. **Source of Truth**: Still strictly `PRD v1.2` -> `Collaboration Contract` -> `Registry Baseline`.
2. **No New Frozen Items**: This batch did NOT add new paths, enums, or env vars.
3. **App-Local Validation**: The newly added `src/schemas` in Mobile/Admin are for UI consumption only and do NOT define the API contract.

**Next Steps for Backend**:
- Please prioritize providing the **minimal read-only OpenAPI** as defined in the Registry.
- Ensure the OpenAPI schemas align with the field names in the Registry (e.g., `priceMinor`, `phoneMasked`).

**Next Steps for Server**:
- Do NOT add new frontend environment variables.
- Maintain existing frozen public routes and domains.
