# Batch 9 Registry Consistency Check

- [x] **No New Enums**: Reusing `InviteRelationStatus`, `WithdrawalStatus`, etc.
- [x] **ReadOnly Scope**: No `POST`/`PUT`/`DELETE` fields included.
- [x] **List Convention**: Standardized `cursor`/`limit` and `items`/`nextCursor`.
- [x] **Path Alignment**: Matches PRD 14.2/14.3 and Front-end Batch 8 requirements.
- [x] **No Auth Session Paths**: Auth remains blocked as per security constraints.
- [x] **No Env/Route Changes**: Adheres to Server Batch 8 guardrails.
