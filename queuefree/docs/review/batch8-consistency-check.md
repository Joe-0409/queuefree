# QueueFree Batch 8 Consistency Check

## Scope checked

- `queuefree_prd_v1_2.docx`
- `queuefree-collaboration-contract-v1.2.md`
- `registry-baseline-v1.2.md`
- `第8批-发给后端和服务器的话术.md`
- `backend-next-steps-from-frontend-batch8.md`
- `server-next-steps-from-frontend-batch8.md`
- `queuefree_backend_prompt.txt`
- `queuefree_prompts_bundle.txt`

## Confirmed safe direction

- Frontend Batch 8 wants **minimal read-only OpenAPI** first.
- Server side should **not** add new frontend env vars.
- Public domains and public routes remain fixed.
- `packages/api-client` must still be generated from OpenAPI, not hand-written.

## Errors / mismatches found

### 1. Batch 8 handoff priority order conflicts with the locked collaboration contract

The Batch 8 handoff text currently says:

1. `queuefree_prd_v1_2`
2. `queuefree-collaboration-contract-v1.2.md`
3. `registry-baseline-v1.2.md`
4. `packages/shared`
5. `packages/api-client`

But the locked collaboration contract says the resolution order is:

1. `queuefree_prd_v1_2`
2. `packages/shared`
3. `packages/api-client`
4. `docs/registry/registry-baseline-v1.2.md`
5. thread drafts

**Action:** continue to follow the locked collaboration contract order. Treat the Batch 8 handoff order as stale shorthand, not the authoritative source order.

### 2. Registry file is stale relative to already-approved server patch direction

The current `registry-baseline-v1.2.md` still exposes only the original sections and does not yet reflect:

- approved reuse of existing `GET /v1/health`
- the separate `CI/CD Secret Registry`

**Action:** do not assume these are merged into registry yet. Keep them as pending governance deltas until the registry file itself is updated.

### 3. “Auth session restore related ability” is requested, but the currently listed PRD endpoint is not read-only

Batch 8 asks for auth session restore related capability in the minimal read-only OpenAPI.

But the PRD core auth endpoints are:

- `POST /v1/auth/otp/send`
- `POST /v1/auth/otp/verify`
- `POST /v1/auth/refresh`
- `POST /v1/auth/logout`

There is no frozen `GET /v1/auth/session`-style read endpoint in the current PRD excerpt.

**Action:** keep the first generated artifact GET-only for product / queue / wallet / rules / admin reads. Treat auth refresh as blocked until request / response fields are explicitly registered and a write-capable auth contract phase is approved.

### 4. Old backend prompt artifacts still reference `QueueFree_PRD_v1.0`

At least one older backend prompt artifact still says the uploaded source is `QueueFree_PRD_v1.0`, which is stale and can cause drift away from the locked current source `queuefree_prd_v1_2`.

**Action:** ignore that prompt wording and continue to treat `queuefree_prd_v1_2` as the only current product truth source.

## What is safe to generate now

A **path-only minimal read-only OpenAPI skeleton** is safe, because it does not invent request/response fields.

## What is still blocked

The following are still blocked until request / response field registration exists:

- typed response schemas
- typed query parameter shapes
- typed filter / pagination contracts
- generated `packages/api-client` that front-end can consume with useful models
