import type { AdminReadAdapter } from '@/adapters/admin-read-adapter';

export type AdminGeneratedBridgeManifestEntry = {
  method: keyof AdminReadAdapter;
  bridge: string;
  wired: boolean;
  note: string;
};

export const adminGeneratedBridgeManifest = [
  {
    method: 'fetchAdminDashboardData',
    bridge: 'fetchAdminDashboardDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for admin dashboard summary tables.'
  },
  {
    method: 'fetchAdminListPageConfig',
    bridge: 'fetchAdminListPageConfigFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for admin list modules.'
  },
  {
    method: 'fetchAdminDetailPageConfig',
    bridge: 'fetchAdminDetailPageConfigFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for admin detail modules.'
  }
] satisfies ReadonlyArray<AdminGeneratedBridgeManifestEntry>;

export function getAdminGeneratedBridgeCoverageSummary() {
  const total = adminGeneratedBridgeManifest.length;
  const wired = adminGeneratedBridgeManifest.filter((entry) => entry.wired).length;

  return {
    total,
    wired,
    pending: total - wired
  };
}
