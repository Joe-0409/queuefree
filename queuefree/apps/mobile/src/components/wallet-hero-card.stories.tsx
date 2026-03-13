import type { Meta, StoryObj } from "@storybook/react-vite";
import { WalletHeroCard } from "./wallet-hero-card";

const meta = {
  title: "Mobile/WalletHeroCard",
  component: WalletHeroCard,
  args: {
    availableMinor: 188000,
    pendingMinor: 79900,
    frozenMinor: 50000,
    activationLabel: "Invite or trust task required"
  }
} satisfies Meta<typeof WalletHeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = {
  args: {
    availableMinor: 0,
    pendingMinor: 0,
    frozenMinor: 0,
    activationLabel: "Loading wallet activation path"
  }
};
export const Error: Story = {
  args: {
    activationLabel: "Wallet summary unavailable. Retry when readonly API is reachable."
  }
};
