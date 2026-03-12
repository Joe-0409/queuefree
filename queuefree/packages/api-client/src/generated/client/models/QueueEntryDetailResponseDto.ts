/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QueueEntryTimelineItemDto } from './QueueEntryTimelineItemDto';
export type QueueEntryDetailResponseDto = {
    queueEntryId: string;
    orderId: string;
    productId: string;
    productTitle: string;
    productCoverImageUrl: string;
    productSkuLabel: string;
    quantity: number;
    paidAmountMinor: number;
    currency: string;
    status: string;
    activeRank: Record<string, any> | null;
    boostUsedCount: number;
    canBoost: boolean;
    isInProtectZone: boolean;
    queueGuardStatus: string;
    createdAt: string;
    wonSettlementSlotAt: Record<string, any> | null;
    cashbackAvailableAt: Record<string, any> | null;
    finalCashbackMinor: Record<string, any> | null;
    timeline: Array<QueueEntryTimelineItemDto>;
};

