import { z } from 'zod';

export const MobileMeScreenSchema = z.object({
  userId: z.string().uuid(),
  phoneMasked: z.string(),
  inviteCode: z.string(),
  walletActivated: z.boolean(),
  accountDeleteStatus: z.string(),
});

export type MobileMeScreenModel = z.infer<typeof MobileMeScreenSchema>;

export const MobileProductListItemSchema = z.object({
  productId: z.string().uuid(),
  title: z.string(),
  coverImageUrl: z.string(),
  priceDisplay: z.string(),
  isQueueEligible: z.boolean(),
});

export type MobileProductListItemModel = z.infer<typeof MobileProductListItemSchema>;
