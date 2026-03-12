import { resolveMobileReadAdapter } from '../adapters/mobile-read-adapter.resolve';
import {
  validateDeleteAccountPreviewData,
  validateHomeScreenData,
  validateInvitesScreenData,
  validateOrderSuccessData,
  validateProductCard,
  validateProfileScreenData,
  validateQueueEntryCard,
  validateQueueScreenData,
  validateRulesCenterData,
  validateTasksScreenData,
  validateWalletScreenData
} from './mobile-screen-validators';

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

export async function fetchHomeScreenData() {
  const data = await getAdapter().fetchHomeScreenData();
  return validateHomeScreenData(data);
}

export async function fetchQueueScreenData() {
  const data = await getAdapter().fetchQueueScreenData();
  return validateQueueScreenData(data);
}

export async function fetchTasksScreenData() {
  const data = await getAdapter().fetchTasksScreenData();
  return validateTasksScreenData(data);
}

export async function fetchInvitesScreenData() {
  const data = await getAdapter().fetchInvitesScreenData();
  return validateInvitesScreenData(data);
}

export async function fetchWalletScreenData() {
  const data = await getAdapter().fetchWalletScreenData();
  return validateWalletScreenData(data);
}

export async function fetchProfileScreenData() {
  const data = await getAdapter().fetchProfileScreenData();
  return validateProfileScreenData(data);
}

export async function fetchProductDetail(productId: string) {
  const data = await getAdapter().fetchProductDetail(productId);
  return validateProductCard(data);
}

export async function fetchQueueEntryDetail(entryId: string) {
  const data = await getAdapter().fetchQueueEntryDetail(entryId);
  return validateQueueEntryCard(data);
}

export async function fetchRulesCenterData() {
  const data = await getAdapter().fetchRulesCenterData();
  return validateRulesCenterData(data);
}

export async function fetchOrderSuccessData(orderId: string) {
  const data = await getAdapter().fetchOrderSuccessData(orderId);
  return validateOrderSuccessData(data);
}

export async function fetchDeleteAccountPreview() {
  const data = await getAdapter().fetchDeleteAccountPreview();
  return validateDeleteAccountPreviewData(data);
}
