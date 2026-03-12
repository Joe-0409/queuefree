  export const WALLET_ACTIVATION_METHODS = [
    "INVITE",
"TASK",
"ADMIN_OVERRIDE"
  ] as const;

  export type WalletActivationMethod = (typeof WALLET_ACTIVATION_METHODS)[number];
