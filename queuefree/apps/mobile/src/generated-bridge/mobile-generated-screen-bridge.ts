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
    `[QueueFree mobile skeleton] ${bridgeMethod} is not wired yet. ` +
      'Backend must export registered OpenAPI first, then frontend can replace this generated bridge with DTO-to-screen-model mapping.'
  );
}

export async function fetchHomeScreenDataFromGeneratedBridge(): Promise<HomeScreenData> {
  return unsupported<HomeScreenData>('fetchHomeScreenDataFromGeneratedBridge');
}

export async function fetchQueueScreenDataFromGeneratedBridge(): Promise<QueueScreenData> {
  return unsupported<QueueScreenData>('fetchQueueScreenDataFromGeneratedBridge');
}

export async function fetchTasksScreenDataFromGeneratedBridge(): Promise<TasksScreenData> {
  return unsupported<TasksScreenData>('fetchTasksScreenDataFromGeneratedBridge');
}

export async function fetchInvitesScreenDataFromGeneratedBridge(): Promise<InvitesScreenData> {
  return unsupported<InvitesScreenData>('fetchInvitesScreenDataFromGeneratedBridge');
}

export async function fetchWalletScreenDataFromGeneratedBridge(): Promise<WalletScreenData> {
  return unsupported<WalletScreenData>('fetchWalletScreenDataFromGeneratedBridge');
}

export async function fetchProfileScreenDataFromGeneratedBridge(): Promise<ProfileScreenData> {
  return unsupported<ProfileScreenData>('fetchProfileScreenDataFromGeneratedBridge');
}

export async function fetchProductDetailFromGeneratedBridge(_productId: string): Promise<ProductCardModel> {
  return unsupported<ProductCardModel>('fetchProductDetailFromGeneratedBridge');
}

export async function fetchQueueEntryDetailFromGeneratedBridge(_entryId: string): Promise<QueueEntryCardModel> {
  return unsupported<QueueEntryCardModel>('fetchQueueEntryDetailFromGeneratedBridge');
}

export async function fetchRulesCenterDataFromGeneratedBridge(): Promise<RulesCenterData> {
  return unsupported<RulesCenterData>('fetchRulesCenterDataFromGeneratedBridge');
}

export async function fetchOrderSuccessDataFromGeneratedBridge(_orderId: string): Promise<OrderSuccessData> {
  return unsupported<OrderSuccessData>('fetchOrderSuccessDataFromGeneratedBridge');
}

export async function fetchDeleteAccountPreviewFromGeneratedBridge(): Promise<DeleteAccountPreviewData> {
  return unsupported<DeleteAccountPreviewData>('fetchDeleteAccountPreviewFromGeneratedBridge');
}
