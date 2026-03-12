  export const USER_QUEUE_GUARD_STATUSES = [
    "VALID",
"EXPIRED_GRACE"
  ] as const;

  export type UserQueueGuardStatus = (typeof USER_QUEUE_GUARD_STATUSES)[number];
