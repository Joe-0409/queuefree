import type { MobileReadAdapter } from '../adapters/mobile-read-adapter';

export type MobileGeneratedBridgeManifestEntry = {
  method: keyof MobileReadAdapter;
  bridge: string;
  wired: boolean;
  note: string;
};

export const mobileGeneratedBridgeManifest = [
  {
    method: 'fetchHomeScreenData',
    bridge: 'fetchHomeScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for products feed + next slot summary.'
  },
  {
    method: 'fetchQueueScreenData',
    bridge: 'fetchQueueScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for queue guard + queue entries list.'
  },
  {
    method: 'fetchTasksScreenData',
    bridge: 'fetchTasksScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for tasks list.'
  },
  {
    method: 'fetchInvitesScreenData',
    bridge: 'fetchInvitesScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for invite code + records.'
  },
  {
    method: 'fetchWalletScreenData',
    bridge: 'fetchWalletScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for wallet summary + ledgers + withdrawals.'
  },
  {
    method: 'fetchProfileScreenData',
    bridge: 'fetchProfileScreenDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for me/profile overview.'
  },
  {
    method: 'fetchProductDetail',
    bridge: 'fetchProductDetailFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for product detail.'
  },
  {
    method: 'fetchQueueEntryDetail',
    bridge: 'fetchQueueEntryDetailFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for queue entry detail.'
  },
  {
    method: 'fetchRulesCenterData',
    bridge: 'fetchRulesCenterDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for rules/FAQ payload.'
  },
  {
    method: 'fetchOrderSuccessData',
    bridge: 'fetchOrderSuccessDataFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for order success / queue summary.'
  },
  {
    method: 'fetchDeleteAccountPreview',
    bridge: 'fetchDeleteAccountPreviewFromGeneratedBridge',
    wired: false,
    note: 'Wait for generated read SDK coverage for delete-account preview and blockers.'
  }
] satisfies ReadonlyArray<MobileGeneratedBridgeManifestEntry>;

export function getMobileGeneratedBridgeCoverageSummary() {
  const total = mobileGeneratedBridgeManifest.length;
  const wired = mobileGeneratedBridgeManifest.filter((entry) => entry.wired).length;

  return {
    total,
    wired,
    pending: total - wired
  };
}
