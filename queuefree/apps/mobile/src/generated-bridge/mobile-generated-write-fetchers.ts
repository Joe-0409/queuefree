import { checkInQueueGuard, createOrder, createPaymentIntent } from '@queuefree/api-client/sdk';
import type {
  CreateOrderResponse,
  CreatePaymentIntentResponse,
  UserQueueGuardResponse
} from '@queuefree/api-client/types';
import type { CreateCheckoutSessionInput } from '../adapters/mobile-write-adapter';
import { getMobileApiClient } from '../lib/generated-api-client';
import { createIdempotencyKey } from '../lib/idempotency-key';

export type CheckoutSessionGeneratedSource = {
  order: CreateOrderResponse;
  paymentIntent: CreatePaymentIntentResponse;
};

export type QueueGuardCheckInGeneratedSource = {
  guard: UserQueueGuardResponse;
};

function sdkOptions(): { client: ReturnType<typeof getMobileApiClient>; throwOnError: true } {
  return {
    client: getMobileApiClient(),
    throwOnError: true
  };
}

export async function createCheckoutSessionRawFromGeneratedSource(
  input: CreateCheckoutSessionInput
): Promise<CheckoutSessionGeneratedSource> {
  const orderResponse = await createOrder({
    ...sdkOptions(),
    headers: {
      'Idempotency-Key': createIdempotencyKey('order')
    },
    body: {
      productId: input.productId,
      skuId: input.skuId,
      quantity: input.quantity,
      addressId: input.addressId
    }
  });

  const paymentIntentResponse = await createPaymentIntent({
    ...sdkOptions(),
    headers: {
      'Idempotency-Key': createIdempotencyKey('payment')
    },
    path: {
      orderId: orderResponse.data.orderId
    }
  });

  return {
    order: orderResponse.data,
    paymentIntent: paymentIntentResponse.data
  };
}

export async function checkInQueueGuardRawFromGeneratedSource(): Promise<QueueGuardCheckInGeneratedSource> {
  const response = await checkInQueueGuard({
    ...sdkOptions(),
    headers: {
      'Idempotency-Key': createIdempotencyKey('guard-checkin')
    }
  });

  return {
    guard: response.data
  };
}
