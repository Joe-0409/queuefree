import { resolveAdminReadAdapter } from '@/adapters/admin-read-adapter.resolve';

export type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind
} from '@/adapters/admin-read-adapter';

function getAdapter() {
  return resolveAdminReadAdapter();
}

export function fetchAdminDashboardData() {
  return getAdapter().fetchAdminDashboardData();
}

export function fetchAdminListPageConfig(kind: import('@/adapters/admin-read-adapter').AdminListPageKind) {
  return getAdapter().fetchAdminListPageConfig(kind);
}

export function fetchAdminDetailPageConfig(
  kind: import('@/adapters/admin-read-adapter').AdminDetailPageKind,
  id: string
) {
  return getAdapter().fetchAdminDetailPageConfig(kind, id);
}
