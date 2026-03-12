import type {
 AdminDashboardData
} from '@/adapters/admin-read-adapter';
import type {
 DetailPageConfig,
 ListPageConfig
} from '@/models/admin-screen-models';
import {
 adminDashboardDataSchema,
 detailPageConfigSchema,
 listPageConfigSchema
} from '@/schemas/admin-screen-schemas';

function formatIssues(issues: Array<{ path: (string | number)[]; message: string }>) {
 return issues
 .slice(0, 5)
 .map((issue) => `${issue.path.join('.') || '<root>'}: ${issue.message}`)
 .join('; ');
}

function parseOrThrow<T>(
 label: string,
 parseFn: (value: unknown) => { success: true; data: T } | { success: false; error: { issues: Array<{ path: (string | number)[]; message: string }> } },
 value: unknown
): T {
 const result = parseFn(value);

 if (!result.success) {
 throw new Error(`[QueueFree admin skeleton] ${label} failed screen-model validation. ${formatIssues(result.error.issues)}`);
 }

 return result.data;
}

export function validateAdminDashboardData(value: unknown): AdminDashboardData {
 return parseOrThrow('fetchAdminDashboardData', adminDashboardDataSchema.safeParse.bind(adminDashboardDataSchema), value);
}

export function validateAdminListPageConfig(value: unknown): ListPageConfig {
 return parseOrThrow('fetchAdminListPageConfig', listPageConfigSchema.safeParse.bind(listPageConfigSchema), value);
}

export function validateAdminDetailPageConfig(value: unknown): DetailPageConfig {
 return parseOrThrow('fetchAdminDetailPageConfig', detailPageConfigSchema.safeParse.bind(detailPageConfigSchema), value);
}
