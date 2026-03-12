  export const WORKER_JOB_NAMES = [
    "create-queue-entry-after-payment",
"restore-frozen-entries-after-checkin",
"freeze-expired-entries",
"remove-expired-frozen-entries",
"run-slot-settlement",
"release-cashback-after-observation",
"clawback-after-refund",
"check-invite-cooling-off",
"payout-after-withdrawal-approval",
"score-risk-case"
  ] as const;

  export type WorkerJobName = (typeof WORKER_JOB_NAMES)[number];
