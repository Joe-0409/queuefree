import type {
  CheckoutSessionModel,
  QueueGuardCheckInModel
} from '../models/mobile-write-models';

export type CreateCheckoutSessionInput = {
  productId: string;
  skuId: string;
  quantity: number;
  addressId: string;
};

export type CheckoutSessionData = CheckoutSessionModel;
export type QueueGuardCheckInData = QueueGuardCheckInModel;

export type MobileWriteAdapter = {
  createCheckoutSession(input: CreateCheckoutSessionInput): Promise<CheckoutSessionData>;
  checkInQueueGuard(): Promise<QueueGuardCheckInData>;
};
