import { ACCOUNT_DELETE_STATUSES } from '@queuefree/shared';
import type {
 GuardModel,
 InviteRecordModel,
 ProductCardModel,
 ProfileModel,
 QueueEntryCardModel,
 TaskCardModel,
 WalletLedgerModel,
 WalletSummaryModel,
 WithdrawalRecordModel
} from '../models/mobile-screen-models';

export type HomeScreenData = {
 products: ProductCardModel[];
 nextSlotAt: string | null;
};

export type QueueScreenData = {
 guard: GuardModel;
 entries: QueueEntryCardModel[];
};

export type TasksScreenData = {
 tasks: TaskCardModel[];
};

export type InvitesScreenData = {
 inviteCode: string;
 records: InviteRecordModel[];
};

export type WalletScreenData = {
 wallet: WalletSummaryModel;
 ledgers: WalletLedgerModel[];
 withdrawals: WithdrawalRecordModel[];
};

export type ProfileScreenData = {
 profile: ProfileModel;
};

export type RulesCenterData = {
 faq: string[];
};

export type OrderSuccessData = {
 orderId: string;
 state: 'QUEUE_CREATED' | 'AWAITING_QUEUE_ENTRY';
 entryId: string | null;
 summary: {
 title: string;
 rankLabel: string;
 nextSlotLabel: string;
 cashbackLabel: string;
 };
 helperText: string;
};

export type DeleteAccountPreviewData = {
 statuses: typeof ACCOUNT_DELETE_STATUSES;
 blockers: string[];
 impactNotes: string[];
};

export type MobileReadAdapter = {
 fetchHomeScreenData(): Promise<HomeScreenData>;
 fetchQueueScreenData(): Promise<QueueScreenData>;
 fetchTasksScreenData(): Promise<TasksScreenData>;
 fetchInvitesScreenData(): Promise<InvitesScreenData>;
 fetchWalletScreenData(): Promise<WalletScreenData>;
 fetchProfileScreenData(): Promise<ProfileScreenData>;
 fetchProductDetail(productId: string): Promise<ProductCardModel>;
 fetchQueueEntryDetail(entryId: string): Promise<QueueEntryCardModel>;
 fetchRulesCenterData(): Promise<RulesCenterData>;
 fetchOrderSuccessData(orderId: string): Promise<OrderSuccessData>;
 fetchDeleteAccountPreview(): Promise<DeleteAccountPreviewData>;
};