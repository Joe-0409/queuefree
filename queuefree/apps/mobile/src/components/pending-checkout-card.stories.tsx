import type { Meta, StoryObj } from "@storybook/react-vite";
import { PendingCheckoutCard } from "./pending-checkout-card";

const meta = {
 title: "Mobile/PendingCheckoutCard",
 component: PendingCheckoutCard,
 args: {
 session: {
 sessionId: "pending-order-prod-earbuds",
 orderId: "order-prod-earbuds",
 paymentIntentId: "pi-order-prod-earbuds",
 productId: "prod-earbuds",
 productTitle: "Wireless Earbuds",
 skuId: "sku-default",
 addressId: "addr-home",
 quantity: 1,
 provider: "xendit",
 amountMinor: 359000,
 currencyCode: "PHP",
 checkoutUrl: "https://pay.example.test/intent/pi-order-prod-earbuds",
 createdAt: new Date("2026-03-13T08:00:00.000Z").toISOString(),
 lastOpenedAt: new Date("2026-03-13T08:05:00.000Z").toISOString(),
 lastCheckedAt: new Date("2026-03-13T08:15:00.000Z").toISOString(),
 lifecycle: "AWAITING_QUEUE_ENTRY",
 queueEntryId: null
 },
 primaryActionLabel: "Open provider checkout",
 secondaryActionLabel: "Open status check"
 }
} satisfies Meta<typeof PendingCheckoutCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};