/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UserQueueGuardResponseDto = {
    status: string;
    validUntil: string;
    graceUntil: string;
    lastCheckinAt: Record<string, any> | null;
    canCheckInNow: boolean;
    activeEntriesCount: number;
    frozenEntriesCount: number;
};

