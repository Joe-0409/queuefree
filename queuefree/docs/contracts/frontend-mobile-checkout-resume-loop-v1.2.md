# QueueFree Frontend Contract — Batch 17 Mobile Checkout Resume Loop

## Scope

This batch stays inside existing Mobile routes and existing generated SDK operations.

No new registry item is introduced.

## Allowed sources used in this batch

- Existing readonly + write generated SDK operations
- Existing mobile routes
- Existing app-local screen models and write models
- Existing generated write bridges

## What changed

### 1. Session-scoped pending checkout state

Frontend now keeps a runtime-only pending checkout store for:

- checkout draft per productId
- active pending sessions
- last provider reopen timestamp
- last queue status check timestamp
- local queue-entry-visible reconciliation

### 2. Checkout flow

After `createOrder` + `createPaymentIntent` succeed:

- frontend stores a pending session locally
- checkout can reopen provider URL
- checkout can jump to order-success status check
- checkout preserves current skuId/addressId input for the same product

### 3. Order success flow

`OrderSuccessData` is now an app-local screen model with two states:

- `QUEUE_CREATED`
- `AWAITING_QUEUE_ENTRY`

This is not a shared backend contract.
It only describes how the frontend renders the order-success page while backend still lacks a direct order-status readonly endpoint.

### 4. Queue reconciliation

When queue entries are fetched, frontend matches `entry.orderId` against local pending sessions.
If a match is found, the session is marked `QUEUE_ENTRY_VISIBLE` with the resolved `queueEntryId`.

## Non-goals

- No new API path
- No new env var
- No new route
- No manual DTO inside packages/api-client
- No persistence across app restarts in this batch