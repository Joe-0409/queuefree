# Backend next steps from frontend batch17

Frontend batch17 completed a session-scoped mobile payment continuation loop without introducing any new contract.

## What frontend still needs from backend to remove manual inputs and improve closure

1. Readonly SKU source for a product
   - so checkout no longer asks users to paste `skuId`

2. Readonly address-book source for current user
   - so checkout no longer asks users to paste `addressId`

3. Readonly order-status endpoint
   - so order-success no longer infers payment conversion only from queue entries

4. Provider return / callback strategy
   - so mobile can recover directly after provider checkout without manual user action

## Important

Frontend batch17 did not add any route, env var, or hand-written API path.
All waiting logic stays app-local until backend provides the readonly source of truth.