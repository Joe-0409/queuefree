  export const QUEUE_NAMES = [
    "payments-events",
"queue-guard",
"settlement-slots",
"wallet-events",
"invites",
"withdrawals",
"risk-cases"
  ] as const;

  export type QueueName = (typeof QUEUE_NAMES)[number];
