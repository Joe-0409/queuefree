import type { Meta, StoryObj } from "@storybook/react-vite";
import { PromoHeroCard } from "./promo-hero-card";

const meta = {
  title: "Mobile/PromoHeroCard",
  component: PromoHeroCard,
  args: {
    eyebrow: "QueueFree",
    title: "Buy a real product, then follow one visible queue",
    description: "Use the promo layer only to guide attention. Rules and transaction truth still stay in the real product and queue flow.",
    chips: [
      { label: "Market", value: "PH" },
      { label: "Currency", value: "PHP" }
    ],
    primaryCtaLabel: "View first product",
    secondaryCtaLabel: "Open queue"
  }
} satisfies Meta<typeof PromoHeroCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Loading: Story = {
  args: {
    description: "Loading visual shell for the promo hero while screen data resolves."
  }
};
export const Disabled: Story = {
  args: {
    primaryCtaLabel: undefined,
    secondaryCtaLabel: undefined
  }
};
