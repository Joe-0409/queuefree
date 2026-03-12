import { resolveMobileReadAdapter } from '../adapters/mobile-read-adapter.resolve';

export type {
  DeleteAccountPreviewData,
  HomeScreenData,
  InvitesScreenData,
  OrderSuccessData,
  ProfileScreenData,
  QueueScreenData,
  RulesCenterData,
  TasksScreenData,
  WalletScreenData
} from '../adapters/mobile-read-adapter';

function getAdapter() {
  return resolveMobileReadAdapter();
}

export function fetchHomeScreenData() {
  return getAdapter().fetchHomeScreenData();
}

export function fetchQueueScreenData() {
  return getAdapter().fetchQueueScreenData();
}

export function fetchTasksScreenData() {
  return getAdapter().fetchTasksScreenData();
}

export function fetchInvitesScreenData() {
  return getAdapter().fetchInvitesScreenData();
}

export function fetchWalletScreenData() {
  return getAdapter().fetchWalletScreenData();
}

export function fetchProfileScreenData() {
  return getAdapter().fetchProfileScreenData();
}

export function fetchProductDetail(productId: string) {
  return getAdapter().fetchProductDetail(productId);
}

export function fetchQueueEntryDetail(entryId: string) {
  return getAdapter().fetchQueueEntryDetail(entryId);
}

export function fetchRulesCenterData() {
  return getAdapter().fetchRulesCenterData();
}

export function fetchOrderSuccessData(orderId: string) {
  return getAdapter().fetchOrderSuccessData(orderId);
}

export function fetchDeleteAccountPreview() {
  return getAdapter().fetchDeleteAccountPreview();
}
