import type { DataTableConfig } from '@/components/ui/data-table';
import type { DetailPageConfig, ListPageConfig, Metric } from '@/models/admin-screen-models';

export type AdminDashboardData = {
  metrics: Metric[];
  queueTable: DataTableConfig;
  walletTable: DataTableConfig;
  backlogTable: DataTableConfig;
  riskNotes: string[];
};

export type AdminListPageKind =
  | 'products'
  | 'orders'
  | 'queues'
  | 'slots'
  | 'campaigns'
  | 'tasks'
  | 'invites'
  | 'wallet'
  | 'withdrawals'
  | 'risk'
  | 'governance'
  | 'audit';

export type AdminDetailPageKind = 'product' | 'order' | 'queue' | 'slot' | 'campaign' | 'task' | 'invite' | 'risk';

export type AdminReadAdapter = {
  fetchAdminDashboardData(): Promise<AdminDashboardData>;
  fetchAdminListPageConfig(kind: AdminListPageKind): Promise<ListPageConfig>;
  fetchAdminDetailPageConfig(kind: AdminDetailPageKind, id: string): Promise<DetailPageConfig>;
};
