import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind,
  AdminReadAdapter
} from './admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';

async function unsupported<T>(adapterMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree admin skeleton] ${adapterMethod} is not wired yet. ` +
      'Wait for backend OpenAPI export and generated packages/api-client, then replace the generated adapter implementation.'
  );
}

export const generatedAdminReadAdapter: AdminReadAdapter = {
  fetchAdminDashboardData: () => unsupported<AdminDashboardData>('fetchAdminDashboardData'),
  fetchAdminListPageConfig: (_kind: AdminListPageKind) => unsupported<ListPageConfig>('fetchAdminListPageConfig'),
  fetchAdminDetailPageConfig: (_kind: AdminDetailPageKind, _id: string) => unsupported<DetailPageConfig>('fetchAdminDetailPageConfig')
};
