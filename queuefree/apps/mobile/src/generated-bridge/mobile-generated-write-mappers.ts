import type {
  CheckoutSessionData,
  QueueGuardCheckInData
} from '../adapters/mobile-write-adapter';
import type {
  CheckoutSessionGeneratedSource,
  QueueGuardCheckInGeneratedSource
} from './mobile-generated-write-fetchers';

export function mapGeneratedCheckoutSessionPayload(source: CheckoutSessionGeneratedSource): CheckoutSessionData {
  return {
    orderId: source.order.orderId,
    orderStatus: source.order.status,
    productId: source.order.productId,
    skuId: source.order.skuId,
    quantity: source.order.quantity,
    paymentIntentId: source.paymentIntent.paymentIntentId,
    provider: source.paymentIntent.provider,
    amountMinor: source.paymentIntent.amountMinor,
    currencyCode: source.paymentIntent.currencyCode,
    checkoutUrl: source.paymentIntent.checkoutUrl
  };
}

export function mapGeneratedQueueGuardCheckInPayload(source: QueueGuardCheckInGeneratedSource): QueueGuardCheckInData {
  return {
    status: source.guard.status,
    lastCheckinAt: source.guard.lastCheckinAt ?? null,
    validUntil: source.guard.validUntil,
    graceUntil: source.guard.graceUntil ?? null
  };
}
