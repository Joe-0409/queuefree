import type { Meta, StoryObj } from "@storybook/react-vite";
import { QueueEntryCard } from "./queue-entry-card";

const sample = {
  id: "entry-1001",
  orderId: "order-9001",
  productTitle: "Wireless Earbuds",
  status: "ACTIVE",
  currentRank: 41,
  boostUsed: 1,
  nextSlotAt: "2026-03-11T13:00:00.000Z",
  eligibleCashbackMinor: 149900
};

const meta = {
  title: "Mobile/QueueEntryCard",
  component: QueueEntryCard,
  args: {
    entry: sample,
    statusTone: "brand",
    nextSlotLabel: "Mar 11, 1:00 PM"
  }
} satisfies Meta<typeof QueueEntryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Compact: Story = {
  args: {
    variant: "compact"
  }
};
export const EmptyRank: Story = {
  args: {
    entry: {
      ...sample,
      currentRank: null,
      status: "FROZEN"
    },
    statusTone: "warning"
  }
};
