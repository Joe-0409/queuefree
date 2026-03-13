# Server next steps from frontend batch17

Frontend batch17 does not require any new env var or domain change.

## Keep unchanged

- Web public `/contact`
- existing mobile/admin/web routes
- existing public runtime config injection

## Future server work once backend exposes more readonly APIs

- support mobile deep-link return scheme for payment provider handoff
- coordinate provider callback domains only after backend freezes the write/payment return design
- keep generated SDK pipeline and CI guardrails unchanged