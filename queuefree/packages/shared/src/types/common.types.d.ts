import type { AppEnv } from '../enums/common.enums';
import type { RuntimeConfig } from '../types/runtime-config';
export type Uuid = string;
export type MinorUnit = number;
export type UtcDateTimeString = string;
export interface PaginationQuery {
    page?: number;
    pageSize?: number;
}
export interface ApiErrorBody {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
}
export interface HealthResponseBody {
    status: 'ok';
    service: string;
    version: string;
    environment: AppEnv;
    timestamp: UtcDateTimeString;
}
export type RuntimeConfigResponseBody = RuntimeConfig;
//# sourceMappingURL=common.types.d.ts.map