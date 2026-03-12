# Backend Handoff: Batch 11 Consistency & Read-Only Priority

**Goal**: Align backend implementation with the new frontend repository/validation architecture.

**Key Technical Requirements**:
1. **Schema Alignment**: Backend DTOs must strictly match the field names registered in `docs/registry/registry-baseline-v1.2.md`.
2. **Read-Only Core**: Focus exclusively on the `GET` endpoints for Me, Products, Queue, Tasks, Invites, Wallet, and Withdrawals.
3. **No Implementation Leaks**: Do not assume frontend will handle non-registered fields. Frontend's new validation layer will reject any data that doesn't match the Registry.

**Action Item**:
- Deliver the Typed OpenAPI spec for the core read-only endpoints.
- Once the spec is delivered, the operator will regenerate the SDK to allow frontend to switch from Mock to Real data.
