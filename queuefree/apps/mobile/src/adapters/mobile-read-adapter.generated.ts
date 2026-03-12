import type {
  DeleteAccountPreviewData,
  HomeScreenData,
  InvitesScreenData,
  MobileReadAdapter,
  OrderSuccessData,
  ProfileScreenData,
  QueueScreenData,
  RulesCenterData,
  TasksScreenData,
  WalletScreenData
} from './mobile-read-adapter';
import type {
  ProductCardModel,
  QueueEntryCardModel
} from '../models/mobile-screen-models';
import {
  fetchDeleteAccountPreviewFromGeneratedBridge,
  fetchHomeScreenDataFromGeneratedBridge,
  fetchInvitesScreenDataFromGeneratedBridge,
  fetchOrderSuccessDataFromGeneratedBridge,
  fetchProductDetailFromGeneratedBridge,
  fetchProfileScreenDataFromGeneratedBridge,
  fetchQueueEntryDetailFromGeneratedBridge,
  fetchQueueScreenDataFromGeneratedBridge,
  fetchRulesCenterDataFromGeneratedBridge,
  fetchTasksScreenDataFromGeneratedBridge,
  fetchWalletScreenDataFromGeneratedBridge
} from '../generated-bridge/mobile-generated-screen-bridge';

export const generatedMobileReadAdapter: MobileReadAdapter = {
  fetchHomeScreenData: () => fetchHomeScreenDataFromGeneratedBridge(),
  fetchQueueScreenData: () => fetchQueueScreenDataFromGeneratedBridge(),
  fetchTasksScreenData: () => fetchTasksScreenDataFromGeneratedBridge(),
  fetchInvitesScreenData: () => fetchInvitesScreenDataFromGeneratedBridge(),
  fetchWalletScreenData: () => fetchWalletScreenDataFromGeneratedBridge(),
  fetchProfileScreenData: () => fetchProfileScreenDataFromGeneratedBridge(),
  fetchProductDetail: (productId: string) => fetchProductDetailFromGeneratedBridge(productId),
  fetchQueueEntryDetail: (entryId: string) => fetchQueueEntryDetailFromGeneratedBridge(entryId),
  fetchRulesCenterData: () => fetchRulesCenterDataFromGeneratedBridge(),
  fetchOrderSuccessData: (orderId: string) => fetchOrderSuccessDataFromGeneratedBridge(orderId),
  fetchDeleteAccountPreview: () => fetchDeleteAccountPreviewFromGeneratedBridge()
};

export type {
  DeleteAccountPreviewData,
  HomeScreenData,
  InvitesScreenData,
  OrderSuccessData,
  ProfileScreenData,
  QueueScreenData,
  RulesCenterData,
  TasksScreenData,
  WalletScreenData,
  ProductCardModel,
  QueueEntryCardModel
};
