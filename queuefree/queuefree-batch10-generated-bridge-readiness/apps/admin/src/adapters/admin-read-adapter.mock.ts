import {
  dashboardBacklogTable,
  dashboardMetrics,
  dashboardQueueTable,
  dashboardRiskNotes,
  dashboardWalletTable,
  getDetailPageConfig,
  getListPageConfig
} from '@/lib/admin-content';
import { waitForMock } from '@/lib/mock-delay';
import type { AdminReadAdapter } from './admin-read-adapter';

export const mockAdminReadAdapter: AdminReadAdapter = {
  async fetchAdminDashboardData() {
    await waitForMock();
    return {
      metrics: dashboardMetrics,
      queueTable: dashboardQueueTable,
      walletTable: dashboardWalletTable,
      backlogTable: dashboardBacklogTable,
      riskNotes: dashboardRiskNotes
    };
  },

  async fetchAdminListPageConfig(kind) {
    await waitForMock();
    return getListPageConfig(kind);
  },

  async fetchAdminDetailPageConfig(kind, id) {
    await waitForMock();
    return getDetailPageConfig(kind, id);
  }
};
