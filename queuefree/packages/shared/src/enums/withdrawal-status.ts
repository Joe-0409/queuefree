  export const WITHDRAWAL_STATUSES = [
    "APPLIED",
"RISK_REVIEW",
"PROCESSING",
"SUCCESS",
"REJECTED",
"FAILED",
"REVERSED"
  ] as const;

  export type WithdrawalStatus = (typeof WITHDRAWAL_STATUSES)[number];
