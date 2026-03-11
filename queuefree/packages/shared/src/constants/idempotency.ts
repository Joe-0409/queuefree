export const IDEMPOTENCY_HEADER_NAME = 'Idempotency-Key' as const;
export const IDEMPOTENCY_KEY_TTL_HOURS = 24;

export const IDEMPOTENT_C_ACTION_PATHS = [
  '/v1/orders',
  '/v1/orders/:orderId/payment-intents',
  '/v1/queue-guard/check-in',
  '/v1/queue-entries/:queueEntryId/boost',
  '/v1/tasks/:taskId/claim',
  '/v1/withdrawals',
  '/v1/me/delete-account-requests',
] as const;

export const IDEMPOTENT_SERVER_ACTIONS = [
  'payments.webhook',
  'settlements.run-slot-settlement',
  'wallet.release-cashback',
  'wallet.clawback',
  'withdrawals.callback',
] as const;
