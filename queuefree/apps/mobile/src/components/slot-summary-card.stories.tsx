import type { Meta, StoryObj } from "@storybook/react-vite";
import { SlotSummaryCard } from "./slot-summary-card";

const meta = {
  title: "Mobile/SlotSummaryCard",
  component: SlotSummaryCard,
  args: {
    nextSlotLabel: "Mar 12, 9:00 AM",
    helper: "Fixed settlement slots stay visible. Queue pages keep the current effective rank, not a historical absolute number.",
    actionLabel: "Open queue"
  }
} satisfies Meta<typeof SlotSummaryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Fallback: Story = {
  args: {
    nextSlotLabel: null,
    helper: "No slot is currently visible. Use the queue page for the latest effective status."
  }
};
