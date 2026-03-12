import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable,
  getDetailPageConfig,
  getListPageConfig,
  type DetailPageConfig,
  type ListPageConfig,
  type Metric
} from '@/lib/admin-content';
import type { DataTableConfig } from '@/components/ui/data-table';
import { waitForMock } from '@/lib/mock-delay';

export type AdminDashboardData = {
  metrics: Metric[];
  queueTable: DataTableConfig;
  walletTable: DataTableConfig;
  backlogTable: DataTableConfig;
  riskNotes: string[];
};

export type AdminListPageKind = Parameters<typeof getListPageConfig>[0];
export type AdminDetailPageKind = Parameters<typeof getDetailPageConfig>[0];

export async function fetchAdminDashboardData(): Promise<AdminDashboardData> {
  await waitForMock();
  return {
    metrics: dashboardMetrics,
    queueTable: dashboardQueueTable,
    walletTable: dashboardWalletTable,
    backlogTable: dashboardBacklogTable,
    riskNotes: dashboardRiskNotes
  };
}

export async function fetchAdminListPageConfig(kind: AdminListPageKind): Promise<ListPageConfig> {
  await waitForMock();
  return getListPageConfig(kind);
}

export async function fetchAdminDetailPageConfig(kind: AdminDetailPageKind, id: string): Promise<DetailPageConfig> {
  await waitForMock();
  return getDetailPageConfig(kind, id);
}
