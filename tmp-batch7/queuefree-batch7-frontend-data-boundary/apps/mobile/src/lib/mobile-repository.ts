import { ACCOUNT_DELETE_STATUSES } from '@queuefree/shared';
import {
  demoGuard,
  demoInviteRecords,
  demoLedgers,
  demoProducts,
  demoProfile,
  demoQueueEntries,
  demoRuleFaq,
  demoTasks,
  demoWallet,
  demoWithdrawals,
  formatQueueEntrySummary,
  getProductById,
  getQueueEntryById,
  type InviteRecordModel,
  type ProductCardModel,
  type QueueEntryCardModel,
  type TaskCardModel,
  type WalletLedgerModel,
  type WithdrawalRecordModel
} from './demo-data';
import { waitForMock } from './mock-delay';

export type HomeScreenData = {
  products: ProductCardModel[];
  nextSlotAt: string | null;
};

export type QueueScreenData = {
  guard: typeof demoGuard;
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
  wallet: typeof demoWallet;
  ledgers: WalletLedgerModel[];
  withdrawals: WithdrawalRecordModel[];
};

export type ProfileScreenData = {
  profile: typeof demoProfile;
};

export type RulesCenterData = {
  faq: string[];
};

export type OrderSuccessData = {
  entryId: string;
  summary: ReturnType<typeof formatQueueEntrySummary>;
};

export type DeleteAccountPreviewData = {
  statuses: typeof ACCOUNT_DELETE_STATUSES;
  blockers: string[];
  impactNotes: string[];
};

export async function fetchHomeScreenData(): Promise<HomeScreenData> {
  await waitForMock();
  return {
    products: demoProducts,
    nextSlotAt: demoQueueEntries[0]?.nextSlotAt ?? null
  };
}

export async function fetchQueueScreenData(): Promise<QueueScreenData> {
  await waitForMock();
  return {
    guard: demoGuard,
    entries: demoQueueEntries
  };
}

export async function fetchTasksScreenData(): Promise<TasksScreenData> {
  await waitForMock();
  return {
    tasks: demoTasks
  };
}

export async function fetchInvitesScreenData(): Promise<InvitesScreenData> {
  await waitForMock();
  return {
    inviteCode: 'QUEUEFREE2026',
    records: demoInviteRecords
  };
}

export async function fetchWalletScreenData(): Promise<WalletScreenData> {
  await waitForMock();
  return {
    wallet: demoWallet,
    ledgers: demoLedgers,
    withdrawals: demoWithdrawals
  };
}

export async function fetchProfileScreenData(): Promise<ProfileScreenData> {
  await waitForMock();
  return {
    profile: demoProfile
  };
}

export async function fetchProductDetail(productId: string): Promise<ProductCardModel> {
  await waitForMock();
  return getProductById(productId);
}

export async function fetchQueueEntryDetail(entryId: string): Promise<QueueEntryCardModel> {
  await waitForMock();
  return getQueueEntryById(entryId);
}

export async function fetchRulesCenterData(): Promise<RulesCenterData> {
  await waitForMock();
  return {
    faq: demoRuleFaq
  };
}

export async function fetchOrderSuccessData(_orderId: string): Promise<OrderSuccessData> {
  await waitForMock();
  const entryId = demoQueueEntries[0]?.id ?? 'entry-1001';

  return {
    entryId,
    summary: formatQueueEntrySummary(entryId)
  };
}

export async function fetchDeleteAccountPreview(): Promise<DeleteAccountPreviewData> {
  await waitForMock();
  return {
    statuses: ACCOUNT_DELETE_STATUSES,
    blockers: [
      'Active or frozen queue entries may block immediate anonymization.',
      'Pending, available, or frozen wallet balances must settle first.',
      'Withdrawal processing and after-sales review may delay final anonymization.'
    ],
    impactNotes: [
      'Queue entries may be removed or settled according to the locked rules.',
      'Financial, order, risk, and audit records may retain irreversible reference IDs.',
      'MVP deletion is request + settlement + anonymization, not a simple disable switch.'
    ]
  };
}
