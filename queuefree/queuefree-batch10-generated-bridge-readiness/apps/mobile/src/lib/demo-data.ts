import {
  DEFAULT_RUNTIME_CONFIG,
  formatDateTime,
  formatMinorMoney
} from '@queuefree/shared';
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

export type {
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

export const demoProducts: ProductCardModel[] = [
  {
    id: 'prod-iphone-case',
    title: 'Premium Phone Case',
    subtitle: 'Real product · Queue eligible',
    priceMinor: 59900,
    cashbackCapMinor: 120000,
    stockLabel: 'Soft reserved stock available'
  },
  {
    id: 'prod-earbuds',
    title: 'Wireless Earbuds',
    subtitle: 'Popular item · Fast checkout flow',
    priceMinor: 149900,
    cashbackCapMinor: 200000,
    stockLabel: '12 units left today'
  },
  {
    id: 'prod-bottle',
    title: 'Insulated Bottle',
    subtitle: 'Daily essentials · Queue eligible',
    priceMinor: 79900,
    cashbackCapMinor: 100000,
    stockLabel: 'Open for queue entry'
  }
];

export const demoQueueEntries: QueueEntryCardModel[] = [
  {
    id: 'entry-1001',
    orderId: 'order-9001',
    productTitle: 'Wireless Earbuds',
    status: 'ACTIVE',
    currentRank: 41,
    boostUsed: 1,
    nextSlotAt: '2026-03-11T13:00:00.000Z',
    eligibleCashbackMinor: 149900
  },
  {
    id: 'entry-1002',
    orderId: 'order-9002',
    productTitle: 'Premium Phone Case',
    status: 'FROZEN',
    currentRank: null,
    boostUsed: 0,
    nextSlotAt: '2026-03-11T17:00:00.000Z',
    eligibleCashbackMinor: 59900
  },
  {
    id: 'entry-1003',
    orderId: 'order-9003',
    productTitle: 'Insulated Bottle',
    status: 'WON_PENDING_RELEASE',
    currentRank: 1,
    boostUsed: 2,
    nextSlotAt: '2026-03-11T09:00:00.000Z',
    eligibleCashbackMinor: 79900
  }
];

export const demoTasks: TaskCardModel[] = [
  {
    id: 'task-welcome',
    title: 'Complete your first sign-in',
    rewardLabel: 'Queue guard extension',
    progressLabel: '1 / 1',
    claimable: true
  },
  {
    id: 'task-profile',
    title: 'Add your first address',
    rewardLabel: 'Trust progress +1',
    progressLabel: '0 / 1',
    claimable: false
  },
  {
    id: 'task-repeat',
    title: 'Place a second order',
    rewardLabel: 'Activity fragments',
    progressLabel: '1 / 2',
    claimable: false
  }
];

export const demoInviteRecords: InviteRecordModel[] = [
  {
    id: 'invite-1',
    maskedPhone: '+63 9*** *** 204',
    status: 'EFFECTIVE',
    reason: 'Wallet activation path completed'
  },
  {
    id: 'invite-2',
    maskedPhone: '+63 9*** *** 883',
    status: 'PENDING_EFFECTIVE',
    reason: 'Cooling-off window still running'
  },
  {
    id: 'invite-3',
    maskedPhone: '+63 9*** *** 771',
    status: 'INVALID',
    reason: 'Expired bind window'
  }
];

export const demoWallet: WalletSummaryModel = {
  activationLabel: 'Invite or trust task required',
  pendingBalanceMinor: 79900,
  availableBalanceMinor: 188000,
  frozenBalanceMinor: 50000,
  showRecoverableDebtHint: false
};

export const demoLedgers: WalletLedgerModel[] = [
  {
    id: 'ledger-1',
    title: 'Cashback pending created',
    amountMinor: 79900,
    createdAt: '2026-03-11T09:01:00.000Z'
  },
  {
    id: 'ledger-2',
    title: 'Withdrawal submitted',
    amountMinor: -50000,
    createdAt: '2026-03-10T07:10:00.000Z'
  },
  {
    id: 'ledger-3',
    title: 'Cashback released',
    amountMinor: 188000,
    createdAt: '2026-03-08T15:00:00.000Z'
  }
];

export const demoWithdrawals: WithdrawalRecordModel[] = [
  {
    id: 'wd-1',
    amountMinor: 50000,
    status: 'PROCESSING',
    createdAt: '2026-03-10T07:10:00.000Z'
  },
  {
    id: 'wd-2',
    amountMinor: 120000,
    status: 'SUCCESS',
    createdAt: '2026-03-08T08:10:00.000Z'
  }
];

export const demoProfile: ProfileModel = {
  displayName: 'QueueFree Demo User',
  phoneNumber: '+63 912 345 6789',
  marketLabel: `${DEFAULT_RUNTIME_CONFIG.marketCode} · ${DEFAULT_RUNTIME_CONFIG.currencyCode}`,
  timezoneLabel: DEFAULT_RUNTIME_CONFIG.timezone
};

export const demoGuard: GuardModel = {
  status: 'VALID',
  validUntil: '2026-03-12T11:00:00.000Z',
  graceUntil: '2026-03-15T11:00:00.000Z'
};

export const demoRuleFaq = [
  'Buy a real product, then the paid order may join the public queue.',
  'Queue rank is the current effective rank, not a historical absolute number.',
  'Each order gets one queue seat. Quantity changes money, not seat count.',
  'Boost works at order level and cannot cross the Top30 protection zone.'
];

export function getProductById(productId: string) {
  return demoProducts.find((item) => item.id === productId) ?? demoProducts[0];
}

export function getQueueEntryById(entryId: string) {
  return demoQueueEntries.find((item) => item.id === entryId) ?? demoQueueEntries[0];
}

export function formatQueueEntrySummary(entryId: string) {
  const entry = getQueueEntryById(entryId);

  return {
    title: entry.productTitle,
    rankLabel: entry.currentRank ? `#${entry.currentRank}` : 'Frozen',
    nextSlotLabel: formatDateTime(entry.nextSlotAt),
    cashbackLabel: formatMinorMoney(entry.eligibleCashbackMinor)
  };
}
