import {
  AccountDeleteStatus,
  WalletActivationMethod
} from '@queuefree/shared';

export const CURRENT_USER_SOURCE_PORT = Symbol('CURRENT_USER_SOURCE_PORT');

export interface CurrentUserOverviewRecord {
  userId: string;
  phoneMasked: string;
  accountDeleteStatus: AccountDeleteStatus;
  walletActivationMethod: WalletActivationMethod | null;
}

export interface CurrentUserSourcePort {
  getCurrentUserId(): Promise<string>;
  getCurrentUserOverview(): Promise<CurrentUserOverviewRecord>;
}
