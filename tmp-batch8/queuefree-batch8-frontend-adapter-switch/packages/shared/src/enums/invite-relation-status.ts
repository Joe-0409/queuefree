  export const INVITE_RELATION_STATUSES = [
    "BOUND",
"PENDING_EFFECTIVE",
"EFFECTIVE",
"INVALID"
  ] as const;

  export type InviteRelationStatus = (typeof INVITE_RELATION_STATUSES)[number];
