import { resolveAdminReadAdapter } from '@/adapters/admin-read-adapter.resolve';
import { validateAdminDashboardData, validateAdminDetailPageConfig, validateAdminListPageConfig } from '@/lib/admin-screen-validators';

export type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind
} from '@/adapters/admin-read-adapter';

function getAdapter() {
  return resolveAdminReadAdapter();
}

export async function fetchAdminDashboardData() {
  const data = await getAdapter().fetchAdminDashboardData();
  return validateAdminDashboardData(data);
}

export async function fetchAdminListPageConfig(kind: import('@/adapters/admin-read-adapter').AdminListPageKind) {
  const data = await getAdapter().fetchAdminListPageConfig(kind);
  return validateAdminListPageConfig(data);
}

export async function fetchAdminDetailPageConfig(
  kind: import('@/adapters/admin-read-adapter').AdminDetailPageKind,
  id: string
) {
  const data = await getAdapter().fetchAdminDetailPageConfig(kind, id);
  return validateAdminDetailPageConfig(data);
}
