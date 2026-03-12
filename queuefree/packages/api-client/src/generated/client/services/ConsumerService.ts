/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { InviteRecordListResponseDto } from '../models/InviteRecordListResponseDto';
import type { MeOverviewResponseDto } from '../models/MeOverviewResponseDto';
import type { ProductDetailResponseDto } from '../models/ProductDetailResponseDto';
import type { ProductListResponseDto } from '../models/ProductListResponseDto';
import type { QueueEntryDetailResponseDto } from '../models/QueueEntryDetailResponseDto';
import type { QueueEntryListResponseDto } from '../models/QueueEntryListResponseDto';
import type { TaskListResponseDto } from '../models/TaskListResponseDto';
import type { UserInviteOverviewResponseDto } from '../models/UserInviteOverviewResponseDto';
import type { UserQueueGuardResponseDto } from '../models/UserQueueGuardResponseDto';
import type { WalletLedgerListResponseDto } from '../models/WalletLedgerListResponseDto';
import type { WalletOverviewResponseDto } from '../models/WalletOverviewResponseDto';
import type { WithdrawalListResponseDto } from '../models/WithdrawalListResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConsumerService {
    /**
     * Get User Overview
     * @returns MeOverviewResponseDto
     * @throws ApiError
     */
    public static getMe(): CancelablePromise<MeOverviewResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/me',
        });
    }
    /**
     * List Products
     * @returns ProductListResponseDto
     * @throws ApiError
     */
    public static listProducts(): CancelablePromise<ProductListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/products',
        });
    }
    /**
     * Get Product Detail
     * @returns ProductDetailResponseDto
     * @throws ApiError
     */
    public static getProductDetail(): CancelablePromise<ProductDetailResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/products/{productId}',
        });
    }
    /**
     * Get Queue Guard Status
     * @returns UserQueueGuardResponseDto
     * @throws ApiError
     */
    public static getQueueGuard(): CancelablePromise<UserQueueGuardResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/queue-guard',
        });
    }
    /**
     * List My Queue Entries
     * @returns QueueEntryListResponseDto
     * @throws ApiError
     */
    public static listQueueEntries({
        cursor,
        limit,
    }: {
        cursor: string,
        limit: number,
    }): CancelablePromise<QueueEntryListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/queue-entries',
            query: {
                'cursor': cursor,
                'limit': limit,
            },
        });
    }
    /**
     * Get Queue Entry Detail
     * @returns QueueEntryDetailResponseDto
     * @throws ApiError
     */
    public static getQueueEntryDetail(): CancelablePromise<QueueEntryDetailResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/queue-entries/{queueEntryId}',
        });
    }
    /**
     * List Available Tasks
     * @returns TaskListResponseDto
     * @throws ApiError
     */
    public static listTasks(): CancelablePromise<TaskListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/tasks',
        });
    }
    /**
     * Get My Invite Overview
     * @returns UserInviteOverviewResponseDto
     * @throws ApiError
     */
    public static getInviteOverview(): CancelablePromise<UserInviteOverviewResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/invites/me',
        });
    }
    /**
     * List My Invite Records
     * @returns InviteRecordListResponseDto
     * @throws ApiError
     */
    public static listInviteRecords({
        cursor,
        limit,
    }: {
        cursor: string,
        limit: number,
    }): CancelablePromise<InviteRecordListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/invites/records',
            query: {
                'cursor': cursor,
                'limit': limit,
            },
        });
    }
    /**
     * Get Wallet Overview
     * @returns WalletOverviewResponseDto
     * @throws ApiError
     */
    public static getWalletOverview(): CancelablePromise<WalletOverviewResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/wallet',
        });
    }
    /**
     * List Wallet Ledgers
     * @returns WalletLedgerListResponseDto
     * @throws ApiError
     */
    public static listWalletLedgers({
        cursor,
        limit,
    }: {
        cursor: string,
        limit: number,
    }): CancelablePromise<WalletLedgerListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/wallet/ledgers',
            query: {
                'cursor': cursor,
                'limit': limit,
            },
        });
    }
    /**
     * List Withdrawals
     * @returns WithdrawalListResponseDto
     * @throws ApiError
     */
    public static listWithdrawals({
        cursor,
        limit,
    }: {
        cursor: string,
        limit: number,
    }): CancelablePromise<WithdrawalListResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/withdrawals',
            query: {
                'cursor': cursor,
                'limit': limit,
            },
        });
    }
}
