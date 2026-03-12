  export const EVENT_NAMES = [
    "queue.entry.created",
"queue.entry.frozen",
"queue.entry.restored",
"queue.entry.removed",
"queue.entry.boosted",
"settlement.slot.settled",
"wallet.pending.created",
"wallet.cashback.released",
"wallet.clawback.created",
"withdrawal.applied",
"withdrawal.approved",
"withdrawal.rejected",
"risk.case.created",
"account.delete.requested"
  ] as const;

  export type EventName = (typeof EVENT_NAMES)[number];
