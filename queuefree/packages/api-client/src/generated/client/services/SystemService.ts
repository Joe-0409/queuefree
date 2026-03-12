/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HealthResponseDto } from '../models/HealthResponseDto';
import type { RuntimeConfigResponseDto } from '../models/RuntimeConfigResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SystemService {
    /**
     * Health probe for the API service
     * @returns HealthResponseDto
     * @throws ApiError
     */
    public static getHealth(): CancelablePromise<HealthResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/health',
        });
    }
    /**
     * Get public runtime configuration needed by mobile/web/admin clients
     * @returns RuntimeConfigResponseDto
     * @throws ApiError
     */
    public static getRuntimeConfig(): CancelablePromise<RuntimeConfigResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/system/runtime-config',
        });
    }
}
