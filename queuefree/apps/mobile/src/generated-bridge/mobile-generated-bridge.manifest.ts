/**
 * AUTO-GENERATED — DO NOT EDIT
 * Mobile generated-bridge manifest v14.0.0-readonly
 * Tracks which ops are wired to real generated fetchers
 */

export const mobileBridgeManifest = {
  version: '14.0.0-readonly',
  wired: true,
  methods: [
    { method: 'fetchHomeScreenData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchQueueScreenData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchTasksScreenData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchInvitesScreenData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchWalletScreenData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchProfileScreenData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchProductDetail', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchQueueEntryDetail', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchRulesCenterData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchOrderSuccessData', wired: true, source: './mobile-generated-screen-bridge' },
    { method: 'fetchDeleteAccountPreview', wired: true, source: './mobile-generated-screen-bridge' },
  ],
};

export function getMobileGeneratedBridgeCoverageSummary() {
  const total = mobileBridgeManifest.methods.length;
  const wired = mobileBridgeManifest.methods.filter((m) => m.wired).length;
  const pending = total - wired;
  return { total, wired, pending };
}
