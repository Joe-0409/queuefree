# Batch 15B — Minimal persistence design

This batch does **not** replace the in-memory stub implementation yet.
It freezes the persistence shape so the next batch can swap the write flow
from demo data to Prisma-backed repositories without changing the public API.

## Scope

Only these write operations are in scope:

- `POST /v1/orders`
- `POST /v1/orders/:orderId/payment-intents`
- `POST /v1/queue-guard/check-in`

## Source of truth

The persistence surface in this batch mirrors the registry entries already
merged in Batch 15A:

- `orders`
- `payments`
- `user_queue_guards`
- `idempotency_keys`

## Write flow shape

### 1. `POST /v1/orders`

1. Validate `Idempotency-Key` and request body.
2. Compute a deterministic request signature from:
   - `productId`
   - `skuId`
   - `quantity`
   - `addressId`
3. Look up `idempotency_keys` by `(scope, userId, idempotencyKey)`.
4. If a matching signature exists, return the cached response.
5. Create a new row in `orders`.
6. Persist the serialized response to `idempotency_keys`.

Recommended scope: `orders.create`

### 2. `POST /v1/orders/:orderId/payment-intents`

1. Validate `Idempotency-Key` and `orderId`.
2. Load `orders.orderId`.
3. Enforce the current business rule: only `WAIT_PAY` can create a payment intent.
4. Look up `idempotency_keys` by `(scope, userId, idempotencyKey)`.
5. If a matching signature exists, return the cached response.
6. Create a new row in `payments`.
7. Persist the serialized response to `idempotency_keys`.

Recommended scope: `payments.create`

### 3. `POST /v1/queue-guard/check-in`

1. Validate `Idempotency-Key`.
2. Build the new guard timestamps.
3. Look up `idempotency_keys` by `(scope, userId, idempotencyKey)`.
4. If a matching signature exists, return the cached response.
5. Upsert `user_queue_guards` by `userId`.
6. Persist the serialized response to `idempotency_keys`.

Recommended scope: `queue-guard.check-in`

## Why repository ports first

The project already has service-layer stubs. Replacing them directly with
Prisma calls would couple the API layer to the storage layer before the
schema and constraints are stabilized.

The repository ports in this batch keep the next step narrow:

- Prisma becomes an implementation detail.
- Controller and DTO contracts do not move.
- The in-memory implementation can coexist until the Prisma adapters land.

## Next batch

The next batch should add:

- Prisma module bootstrap
- Prisma repository adapters implementing the ports
- Service wiring from in-memory stubs to Prisma-backed repositories
- OpenAPI / SDK regeneration check to ensure no contract drift
