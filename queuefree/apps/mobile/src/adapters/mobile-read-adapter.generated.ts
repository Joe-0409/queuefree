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

async function unsupported<T>(adapterMethod: string): Promise<T> {
  throw new Error(
    `[QueueFree mobile skeleton] ${adapterMethod} is not wired yet. ` +
      'Wait for backend OpenAPI export and generated packages/api-client, then replace the generated adapter implementation.'
  );
}

export const generatedMobileReadAdapter: MobileReadAdapter = {
  fetchHomeScreenData: () => unsupported<HomeScreenData>('fetchHomeScreenData'),
  fetchQueueScreenData: () => unsupported<QueueScreenData>('fetchQueueScreenData'),
  fetchTasksScreenData: () => unsupported<TasksScreenData>('fetchTasksScreenData'),
  fetchInvitesScreenData: () => unsupported<InvitesScreenData>('fetchInvitesScreenData'),
  fetchWalletScreenData: () => unsupported<WalletScreenData>('fetchWalletScreenData'),
  fetchProfileScreenData: () => unsupported<ProfileScreenData>('fetchProfileScreenData'),
  fetchProductDetail: (_productId: string) => unsupported<ProductCardModel>('fetchProductDetail'),
  fetchQueueEntryDetail: (_entryId: string) => unsupported<QueueEntryCardModel>('fetchQueueEntryDetail'),
  fetchRulesCenterData: () => unsupported<RulesCenterData>('fetchRulesCenterData'),
  fetchOrderSuccessData: (_orderId: string) => unsupported<OrderSuccessData>('fetchOrderSuccessData'),
  fetchDeleteAccountPreview: () => unsupported<DeleteAccountPreviewData>('fetchDeleteAccountPreview')
};
