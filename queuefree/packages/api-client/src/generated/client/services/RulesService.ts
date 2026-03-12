/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RuleDetailResponseDto } from '../models/RuleDetailResponseDto';
import type { RuleListItemDto } from '../models/RuleListItemDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RulesService {
    /**
     * List public rule documents for the Web/App rules center
     * @returns RuleListItemDto
     * @throws ApiError
     */
    public static listRules(): CancelablePromise<Array<RuleListItemDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rules',
        });
    }
    /**
     * Get a public rule document by slug
     * @returns RuleDetailResponseDto
     * @throws ApiError
     */
    public static getRuleBySlug({
        slug,
    }: {
        slug: string,
    }): CancelablePromise<RuleDetailResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rules/{slug}',
            path: {
                'slug': slug,
            },
        });
    }
}
