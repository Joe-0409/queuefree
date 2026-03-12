/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type WalletOverviewResponseDto = {
    walletActivated: boolean;
    activationMethod: Record<string, any> | null;
    pendingBalanceMinor: number;
    availableBalanceMinor: number;
    frozenBalanceMinor: number;
    currency: string;
    canWithdraw: boolean;
    hasSettlementException: boolean;
};

