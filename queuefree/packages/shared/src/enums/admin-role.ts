  export const ADMIN_ROLES = [
    "SUPER_ADMIN",
"OPS_ADMIN",
"CS_ADMIN",
"FINANCE_ADMIN",
"RISK_ADMIN"
  ] as const;

  export type AdminRole = (typeof ADMIN_ROLES)[number];
