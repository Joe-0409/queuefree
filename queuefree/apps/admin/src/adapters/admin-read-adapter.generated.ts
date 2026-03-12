import type {
  AdminDashboardData,
  AdminDetailPageKind,
  AdminListPageKind,
  AdminReadAdapter
} from './admin-read-adapter';
import type { DetailPageConfig, ListPageConfig } from '@/models/admin-screen-models';
import {
  fetchAdminDashboardDataFromGeneratedBridge,
  fetchAdminDetailPageConfigFromGeneratedBridge,
  fetchAdminListPageConfigFromGeneratedBridge
} from '@/generated-bridge/admin-generated-screen-bridge';

export const generatedAdminReadAdapter: AdminReadAdapter = {
  fetchAdminDashboardData: () => fetchAdminDashboardDataFromGeneratedBridge(),
  fetchAdminListPageConfig: (kind: AdminListPageKind) => fetchAdminListPageConfigFromGeneratedBridge(kind),
  fetchAdminDetailPageConfig: (kind: AdminDetailPageKind, id: string) => fetchAdminDetailPageConfigFromGeneratedBridge(kind, id)
};

export type { AdminDashboardData, AdminDetailPageKind, AdminListPageKind, DetailPageConfig, ListPageConfig };
