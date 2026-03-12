import type {
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
import type { ProductCardModel, QueueEntryCardModel } from '../models/mobile-screen-models';

async function unsupported<T>(bridgeMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree mobile generated bridge] ${bridgeMethod} is not wired yet. ` +
      'Backend must finalize OpenAPI DTOs, then frontend can map DTOs to screen models.'
  );
}

export async function fetchHomeScreenDataFromGeneratedBridge(): Promise<HomeScreenData> {
  return unsupported('fetchHomeScreenDataFromGeneratedBridge');
}

export async function fetchQueueScreenDataFromGeneratedBridge(): Promise<QueueScreenData> {
  return unsupported('fetchQueueScreenDataFromGeneratedBridge');
}

export async function fetchTasksScreenDataFromGeneratedBridge(): Promise<TasksScreenData> {
  return unsupported('fetchTasksScreenDataFromGeneratedBridge');
}

export async function fetchInvitesScreenDataFromGeneratedBridge(): Promise<InvitesScreenData> {
  return unsupported('fetchInvitesScreenDataFromGeneratedBridge');
}

export async function fetchWalletScreenDataFromGeneratedBridge(): Promise<WalletScreenData> {
  return unsupported('fetchWalletScreenDataFromGeneratedBridge');
}

export async function fetchProfileScreenDataFromGeneratedBridge(): Promise<ProfileScreenData> {
  return unsupported('fetchProfileScreenDataFromGeneratedBridge');
}

export async function fetchProductDetailFromGeneratedBridge(_productId: string): Promise<ProductCardModel> {
  return unsupported('fetchProductDetailFromGeneratedBridge');
}

export async function fetchQueueEntryDetailFromGeneratedBridge(_entryId: string): Promise<QueueEntryCardModel> {
  return unsupported('fetchQueueEntryDetailFromGeneratedBridge');
}

export async function fetchRulesCenterDataFromGeneratedBridge(): Promise<RulesCenterData> {
  return unsupported('fetchRulesCenterDataFromGeneratedBridge');
}

export async function fetchOrderSuccessDataFromGeneratedBridge(_orderId: string): Promise<OrderSuccessData> {
  return unsupported('fetchOrderSuccessDataFromGeneratedBridge');
}

export async function fetchDeleteAccountPreviewFromGeneratedBridge(): Promise<DeleteAccountPreviewData> {
  return unsupported('fetchDeleteAccountPreviewFromGeneratedBridge');
}
