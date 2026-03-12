  export const SETTLEMENT_SLOT_STATUSES = [
    "SCHEDULED",
"RUNNING",
"SUCCEEDED",
"FAILED",
"REPLAYED"
  ] as const;

  export type SettlementSlotStatus = (typeof SETTLEMENT_SLOT_STATUSES)[number];
