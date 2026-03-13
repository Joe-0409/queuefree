import type { OrderStatus, UserQueueGuardStatus } from '@queuefree/shared';

export type CheckoutSessionModel = {
  orderId: string;
  orderStatus: OrderStatus;
  productId: string;
  skuId: string;
  quantity: number;
  paymentIntentId: string;
  provider: string;
  amountMinor: number;
  currencyCode: string;
  checkoutUrl: string;
};

export type QueueGuardCheckInModel = {
  status: UserQueueGuardStatus;
  lastCheckinAt: string | null;
  validUntil: string;
  graceUntil: string | null;
};
