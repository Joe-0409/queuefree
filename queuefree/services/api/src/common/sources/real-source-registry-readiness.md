# Batch 16A — Registry-first readiness for real sources

This batch intentionally does **not** change any public API contract.
It only removes hard-coded demo identifiers from service internals and
introduces source ports that can later be backed by real persistence.

## Why this batch exists

The current write flow works end-to-end, but it still assumes:

- one hard-coded current user
- one hard-coded product + SKU
- one hard-coded address

That is fine for smoke tests, but it is the wrong place to wire in
real data. The next step should be a **registry-first** swap:

1. freeze the real persistence tables / fields
2. implement source adapters
3. keep controller and OpenAPI contracts unchanged

## Source ports introduced in Batch 16A

### CurrentUserSourcePort
Used by:
- `OrdersService`
- `PaymentsService`
- `QueueGuardService`

Current adapter:
- `DemoCurrentUserSourceAdapter`

Future adapter candidates:
- JWT/session-backed request user resolver
- auth module context provider

### CatalogReadSourcePort
Used by:
- `OrdersService`

Current adapter:
- `DemoCatalogReadSourceAdapter`

Future adapter candidates:
- Prisma-backed `products` + `product_skus` reader
- product availability / queue eligibility reader

### AddressBookSourcePort
Used by:
- `OrdersService`

Current adapter:
- `DemoAddressBookSourceAdapter`

Future adapter candidates:
- Prisma-backed `user_addresses` reader
- default address resolver

## Registry-first work needed before swapping to real sources

No public API fields need to move for the initial swap. However, the
following persistence / internal-source surface should be frozen before
removing the demo adapters:

### Table fields to freeze next
- `users.userId`
- `users.phoneMasked` (or the canonical auth/user lookup equivalent)
- `user_addresses.addressId`
- `user_addresses.userId`
- `products.productId`
- `products.isQueueEligible`
- `product_skus.skuId`
- `product_skus.productId`
- `product_skus.priceMinor`
- `product_skus.currencyCode`
- `product_skus.maxQty`

### Internal decisions to freeze next
- how the current authenticated user is resolved in API requests
- whether non-owned addresses return `404` or `403`
- whether non-queue-eligible products are filtered or rejected
- whether unavailable SKU states are represented as `404` or `409`

## Goal of the next batch

Replace demo adapters with Prisma-backed adapters without changing:

- request DTOs
- response DTOs
- OpenAPI path / field names
- generated SDK shape
