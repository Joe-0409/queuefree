import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind
} from '@/adapters/admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';

async function unsupported<T>(bridgeMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree admin skeleton] ${bridgeMethod} is not wired yet. ` +
      'Backend must export registered OpenAPI first, then frontend can replace this generated bridge with DTO-to-screen-model mapping.'
  );
}

export async function fetchAdminDashboardDataFromGeneratedBridge(): Promise<AdminDashboardData> {
  return unsupported<AdminDashboardData>('fetchAdminDashboardDataFromGeneratedBridge');
}

export async function fetchAdminListPageConfigFromGeneratedBridge(
  _kind: AdminListPageKind
): Promise<ListPageConfig> {
  return unsupported<ListPageConfig>('fetchAdminListPageConfigFromGeneratedBridge');
}

export async function fetchAdminDetailPageConfigFromGeneratedBridge(
  _kind: AdminDetailPageKind,
  _id: string
): Promise<DetailPageConfig> {
  return unsupported<DetailPageConfig>('fetchAdminDetailPageConfigFromGeneratedBridge');
}
