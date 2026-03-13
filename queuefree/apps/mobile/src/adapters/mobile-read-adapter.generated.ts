import type { MobileReadAdapter } from './mobile-read-adapter';
import {
  fetchHomeScreenDataFromGeneratedBridge,
  fetchQueueScreenDataFromGeneratedBridge,
  fetchTasksScreenDataFromGeneratedBridge,
  fetchInvitesScreenDataFromGeneratedBridge,
  fetchWalletScreenDataFromGeneratedBridge,
  fetchProfileScreenDataFromGeneratedBridge,
  fetchProductDetailFromGeneratedBridge,
  fetchQueueEntryDetailFromGeneratedBridge,
  fetchRulesCenterDataFromGeneratedBridge,
  fetchOrderSuccessDataFromGeneratedBridge,
  fetchDeleteAccountPreviewFromGeneratedBridge,
} from '../generated-bridge/mobile-generated-screen-bridge';

export const generatedMobileReadAdapter: MobileReadAdapter = {
  fetchHomeScreenData: () => fetchHomeScreenDataFromGeneratedBridge(),
  fetchQueueScreenData: () => fetchQueueScreenDataFromGeneratedBridge(),
  fetchTasksScreenData: () => fetchTasksScreenDataFromGeneratedBridge(),
  fetchInvitesScreenData: () => fetchInvitesScreenDataFromGeneratedBridge(),
  fetchWalletScreenData: () => fetchWalletScreenDataFromGeneratedBridge(),
  fetchProfileScreenData: () => fetchProfileScreenDataFromGeneratedBridge(),
  fetchProductDetail: () => fetchProductDetailFromGeneratedBridge(),
  fetchQueueEntryDetail: () => fetchQueueEntryDetailFromGeneratedBridge(),
  fetchRulesCenterData: () => fetchRulesCenterDataFromGeneratedBridge(),
  fetchOrderSuccessData: () => fetchOrderSuccessDataFromGeneratedBridge(),
  fetchDeleteAccountPreview: () => fetchDeleteAccountPreviewFromGeneratedBridge(),
};
