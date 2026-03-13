import type { Meta, StoryObj } from "@storybook/react-vite";
import { LightweightRuleEntryRow } from "./lightweight-rule-entry-row";

const meta = {
  title: "Mobile/LightweightRuleEntryRow",
  component: LightweightRuleEntryRow,
  args: {
    title: "Rule center",
    description: "Open queue, wallet, and activity rules without leaving the app."
  }
} satisfies Meta<typeof LightweightRuleEntryRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = {
  args: {
    description: "No additional rule summary is available yet."
  }
};
