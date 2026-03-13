import { addHours } from '@queuefree/shared';
import type {
  CreateCheckoutSessionInput,
  MobileWriteAdapter
} from './mobile-write-adapter';
import { waitForMock } from '../lib/mock-delay';

function buildMockOrderId(productId: string) {
  return `order-${productId}-${Date.now().toString(36)}`;
}

export const mockMobileWriteAdapter: MobileWriteAdapter = {
  async createCheckoutSession(input: CreateCheckoutSessionInput) {
    await waitForMock();

    const orderId = buildMockOrderId(input.productId);

    return {
      orderId,
      orderStatus: 'WAIT_PAY',
      productId: input.productId,
      skuId: input.skuId,
      quantity: input.quantity,
      paymentIntentId: `pi-${orderId}`,
      provider: 'mock-provider',
      amountMinor: 0,
      currencyCode: 'PHP',
      checkoutUrl: 'https://example.com/mock-checkout'
    };
  },
  async checkInQueueGuard() {
    await waitForMock();

    const now = new Date().toISOString();

    return {
      status: 'VALID',
      lastCheckinAt: now,
      validUntil: addHours(now, 24),
      graceUntil: addHours(now, 48)
    };
  }
};
