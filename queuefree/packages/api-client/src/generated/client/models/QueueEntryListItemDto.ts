/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type QueueEntryListItemDto = {
    queueEntryId: string;
    orderId: string;
    productId: string;
    productTitle: string;
    productCoverImageUrl: string;
    quantity: number;
    status: string;
    activeRank: Record<string, any> | null;
    boostUsedCount: number;
    canBoost: boolean;
    isInProtectZone: boolean;
    nextSettlementSlotAt: Record<string, any> | null;
    finalCashbackMinor: Record<string, any> | null;
    currency: string;
};

