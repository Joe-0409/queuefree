  export const CRON_NAMES = [
    "queue-guard-freeze-scan",
"queue-guard-remove-scan",
"settlement-slot-dispatch",
"cashback-release-scan",
"invite-effective-scan"
  ] as const;

  export type CronName = (typeof CRON_NAMES)[number];
