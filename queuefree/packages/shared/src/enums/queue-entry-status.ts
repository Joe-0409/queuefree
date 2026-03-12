  export const QUEUE_ENTRY_STATUSES = [
    "PENDING_RISK",
"ACTIVE",
"FROZEN",
"SUSPENDED_REVIEW",
"REMOVED",
"WON_PENDING_RELEASE",
"CASHBACK_RELEASED",
"CLAWBACK_DONE"
  ] as const;

  export type QueueEntryStatus = (typeof QUEUE_ENTRY_STATUSES)[number];
