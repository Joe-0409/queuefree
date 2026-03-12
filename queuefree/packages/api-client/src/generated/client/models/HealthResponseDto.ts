/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AppEnv } from './AppEnv';
export type HealthResponseDto = {
    status: HealthResponseDto.status;
    service: string;
    version: string;
    environment: AppEnv;
    timestamp: string;
};
export namespace HealthResponseDto {
    export enum status {
        OK = 'ok',
    }
}

