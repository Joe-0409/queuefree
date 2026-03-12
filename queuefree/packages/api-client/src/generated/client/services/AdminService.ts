/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdminDashboardSummaryResponseDto } from '../models/AdminDashboardSummaryResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdminService {
    /**
     * Admin Dashboard Summary
     * @returns AdminDashboardSummaryResponseDto
     * @throws ApiError
     */
    public static getDashboardSummary(): CancelablePromise<AdminDashboardSummaryResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/v1/admin/dashboard/summary',
        });
    }
}
