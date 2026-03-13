# QueueFree Batch 14A Write Validation and Idempotency Patch

## What changed

- Added `IdempotencyModule` + `InMemoryIdempotencyService` for request deduplication
- Added `request-validation.util.ts` for DRY validation helpers
- Replaced inline validation in OrdersService, PaymentsService, QueueGuardService
- Each service now uses the shared validation utilities and idempotency service

## Files to add

```
services/api/src/common/idempotency/
  idempotency.module.ts
  in-memory-idempotency.service.ts

services/api/src/common/validation/
  request-validation.util.ts
```

## Files to change

- `services/api/src/app.module.ts` — import `IdempotencyModule`
- `services/api/src/orders/orders.service.ts` — use validation helpers + idempotency
- `services/api/src/payments/payments.service.ts` — use validation helpers + idempotency
- `services/api/src/queue-guard/queue-guard.service.ts` — use validation helpers + idempotency

## Not changed

- DTOs (no schema change)
- OpenAPI spec (no contract change)
- Routes (no path/method change)
