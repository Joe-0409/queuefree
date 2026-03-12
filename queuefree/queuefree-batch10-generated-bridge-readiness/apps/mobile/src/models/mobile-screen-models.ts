import type {
  InviteRelationStatus,
  QueueEntryStatus,
  UserQueueGuardStatus,
  WithdrawalStatus
} from '@queuefree/shared';

export type ProductCardModel = {
  id: string;
  title: string;
  subtitle: string;
  priceMinor: number;
  cashbackCapMinor: number;
  stockLabel: string;
};

export type QueueEntryCardModel = {
  id: string;
  orderId: string;
  productTitle: string;
  status: QueueEntryStatus;
  currentRank: number | null;
  boostUsed: number;
  nextSlotAt: string;
  eligibleCashbackMinor: number;
};

export type TaskCardModel = {
  id: string;
  title: string;
  rewardLabel: string;
  progressLabel: string;
  claimable: boolean;
};

export type InviteRecordModel = {
  id: string;
  maskedPhone: string;
  status: InviteRelationStatus;
  reason: string;
};

export type WalletLedgerModel = {
  id: string;
  title: string;
  amountMinor: number;
  createdAt: string;
};

export type WithdrawalRecordModel = {
  id: string;
  amountMinor: number;
  status: WithdrawalStatus;
  createdAt: string;
};

export type ProfileModel = {
  displayName: string;
  phoneNumber: string;
  marketLabel: string;
  timezoneLabel: string;
};

export type GuardModel = {
  status: UserQueueGuardStatus;
  validUntil: string;
  graceUntil: string;
};

export type WalletSummaryModel = {
  activationLabel: string;
  pendingBalanceMinor: number;
  availableBalanceMinor: number;
  frozenBalanceMinor: number;
  showRecoverableDebtHint: boolean;
};
