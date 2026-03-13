import type { CheckoutSessionData } from "../adapters/mobile-write-adapter";
import type { PendingCheckoutSession } from "../store/pending-checkout-store";

export function buildPendingCheckoutSession(input: {
 checkout: CheckoutSessionData;
 productTitle: string;
 addressId: string;
}): PendingCheckoutSession {
 const now = new Date().toISOString();
 const { checkout, productTitle, addressId } = input;

 return {
 sessionId: `pending-${checkout.orderId}`,
 orderId: checkout.orderId,
 paymentIntentId: checkout.paymentIntentId,
 productId: checkout.productId,
 productTitle,
 skuId: checkout.skuId,
 addressId,
 quantity: checkout.quantity,
 provider: checkout.provider,
 amountMinor: checkout.amountMinor,
 currencyCode: checkout.currencyCode,
 checkoutUrl: checkout.checkoutUrl,
 createdAt: now,
 lastOpenedAt: null,
 lastCheckedAt: null,
 lifecycle: "PENDING_PAYMENT",
 queueEntryId: null
 };
}