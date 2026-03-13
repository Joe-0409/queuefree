import { ORDER_STATUSES, USER_QUEUE_GUARD_STATUSES } from '@queuefree/shared';
import { z } from 'zod';

const nonEmptyStringSchema = z.string().min(1);

export const checkoutSessionSchema = z.object({
  orderId: nonEmptyStringSchema,
  orderStatus: z.enum(ORDER_STATUSES),
  productId: nonEmptyStringSchema,
  skuId: nonEmptyStringSchema,
  quantity: z.number().int().min(1),
  paymentIntentId: nonEmptyStringSchema,
  provider: nonEmptyStringSchema,
  amountMinor: z.number().int().nonnegative(),
  currencyCode: nonEmptyStringSchema,
  checkoutUrl: z.string().url()
});

export const queueGuardCheckInSchema = z.object({
  status: z.enum(USER_QUEUE_GUARD_STATUSES),
  lastCheckinAt: z.string().min(1).nullable(),
  validUntil: nonEmptyStringSchema,
  graceUntil: z.string().min(1).nullable()
});
