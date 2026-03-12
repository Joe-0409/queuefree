/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserInviteOverviewResponseDto = {
    inviteCode: string;
    inviteLink: string;
    canBindInviteCode: boolean;
    bindWindowEndsAt: Record<string, any> | null;
    totalInviteCount: number;
    pendingEffectiveInviteCount: number;
    effectiveInviteCount: number;
    invalidInviteCount: number;
    walletActivated: boolean;
    walletActivationMethod: Record<string, any> | null;
};

