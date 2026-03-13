/**
 * AUTO-GENERATED — DO NOT EDIT
 * Batch 14 readonly — admin bridge manifest
 * Tracks which ops are wired to real generated fetchers
 */

export const adminBridgeManifest = {
  version: '14.0.0-readonly',
  wired: true,
  methods: [
    { method: 'fetchAdminDashboardData', wired: true, source: './admin-generated-screen-bridge' },
    { method: 'fetchAdminListPageConfig', wired: true, source: './admin-generated-screen-bridge' },
    { method: 'fetchAdminDetailPageConfig', wired: true, source: './admin-generated-screen-bridge' },
  ],
};

export function getAdminGeneratedBridgeCoverageSummary() {
  const total = adminBridgeManifest.methods.length;
  const wired = adminBridgeManifest.methods.filter((m) => m.wired).length;
  const pending = total - wired;
  return { total, wired, pending };
}
