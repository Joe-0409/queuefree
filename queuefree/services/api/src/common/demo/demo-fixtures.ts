import type {
  AccountDeleteStatus,
  UserQueueGuardStatus,
  WalletActivationMethod
} from '@queuefree/shared';

export const DEMO_USER_ID = 'user_demo_01';
export const DEMO_PHONE_MASKED = '+63 *** *** 1234';
export const DEMO_ACCOUNT_DELETE_STATUS: AccountDeleteStatus = 'NOT_REQUESTED';
export const DEMO_WALLET_ACTIVATION_METHOD: WalletActivationMethod = 'INVITE';

export const DEMO_PRODUCT_ID = 'prod_demo_01';
export const DEMO_SKU_ID = 'sku_demo_01';
export const DEMO_PRODUCT_TITLE = 'Wireless Earbuds';
export const DEMO_PRODUCT_DESCRIPTION =
  'Compact wireless earbuds with charging case and queue-eligible cashback participation.';
export const DEMO_PRODUCT_COVER_IMAGE_URL =
  'https://assets.queuefree.com/products/prod_demo_01/cover.jpg';
export const DEMO_PRODUCT_IMAGE_URLS = [
  'https://assets.queuefree.com/products/prod_demo_01/cover.jpg',
  'https://assets.queuefree.com/products/prod_demo_01/detail-1.jpg'
] as const;

export const DEMO_SECOND_PRODUCT_ID = 'prod_demo_02';
export const DEMO_SECOND_SKU_ID = 'sku_demo_02';
export const DEMO_SECOND_PRODUCT_TITLE = 'Portable Blender';
export const DEMO_SECOND_PRODUCT_DESCRIPTION =
  'Rechargeable portable blender suitable for single-item MVP checkout and queue participation.';
export const DEMO_SECOND_PRODUCT_COVER_IMAGE_URL =
  'https://assets.queuefree.com/products/prod_demo_02/cover.jpg';
export const DEMO_SECOND_PRODUCT_IMAGE_URLS = [
  'https://assets.queuefree.com/products/prod_demo_02/cover.jpg',
  'https://assets.queuefree.com/products/prod_demo_02/detail-1.jpg'
] as const;

export const DEMO_ADDRESS_ID = 'addr_demo_01';

export const DEMO_CURRENCY_CODE = 'PHP';
export const DEMO_PRICE_MINOR = 129900;
export const DEMO_MAX_QTY = 5;
export const DEMO_IS_QUEUE_ELIGIBLE = true;

export const DEMO_SECOND_PRICE_MINOR = 189900;
export const DEMO_SECOND_MAX_QTY = 3;
export const DEMO_SECOND_IS_QUEUE_ELIGIBLE = true;

export const DEMO_PAYMENT_PROVIDER = 'mockpay';

export const DEMO_ORDER_WAIT_PAY_ID = 'order_wait_pay_01';
export const DEMO_ORDER_PAID_ID = 'order_paid_01';

export const DEMO_QUEUE_GUARD_STATUS: UserQueueGuardStatus = 'VALID';
export const DEMO_QUEUE_GUARD_VALIDITY_MS = 24 * 60 * 60 * 1000;

export function buildDemoCheckoutUrl(paymentIntentId: string): string {
  return `https://checkout.queuefree.com/payment-intents/${paymentIntentId}`;
}

export function buildDemoQueueGuardWindow(now: Date = new Date()): {
  status: UserQueueGuardStatus;
  lastCheckinAt: Date | null;
  validUntil: Date;
  graceUntil: Date | null;
} {
  return {
    status: DEMO_QUEUE_GUARD_STATUS,
    lastCheckinAt: null,
    validUntil: new Date(now.getTime() + DEMO_QUEUE_GUARD_VALIDITY_MS),
    graceUntil: null
  };
}