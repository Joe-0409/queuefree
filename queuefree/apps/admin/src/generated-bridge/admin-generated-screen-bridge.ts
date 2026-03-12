import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind
} from '@/adapters/admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';

async function unsupported<T>(bridgeMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree admin generated bridge] ${bridgeMethod} is not wired yet. ` +
      'Backend must finalize OpenAPI DTOs, then frontend can map DTOs to screen models.'
  );
}

export async function fetchAdminDashboardDataFromGeneratedBridge(): Promise<AdminDashboardData> {
  return unsupported('fetchAdminDashboardDataFromGeneratedBridge');
}

export async function fetchAdminListPageConfigFromGeneratedBridge(
  _kind: AdminListPageKind
): Promise<ListPageConfig> {
  return unsupported('fetchAdminListPageConfigFromGeneratedBridge');
}

export async function fetchAdminDetailPageConfigFromGeneratedBridge(
  _kind: AdminDetailPageKind,
  _id: string
): Promise<DetailPageConfig> {
  return unsupported('fetchAdminDetailPageConfigFromGeneratedBridge');
}
