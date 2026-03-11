import type { RuntimeConfig } from './runtime-config';
export interface ApiMeta {
    requestId?: string;
    ruleVersion?: string;
    timestamp?: string;
}
export interface ApiEnvelope<TData> {
    data: TData;
    meta?: ApiMeta;
}
export interface ApiErrorDetail {
    field?: string;
    message: string;
    code?: string;
}
export interface ApiErrorEnvelope {
    error: {
        code: string;
        message: string;
        details?: ApiErrorDetail[];
    };
    meta?: ApiMeta;
}
export interface CursorPageMeta {
    nextCursor?: string;
    hasMore: boolean;
}
export interface CursorPageEnvelope<TItem> {
    data: TItem[];
    meta: CursorPageMeta & ApiMeta;
}
export interface RuntimeConfigResponse {
    data: RuntimeConfig;
    meta?: ApiMeta;
}
//# sourceMappingURL=api.d.ts.map