import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductCard } from "./product-card";

const sample = {
  id: "prod-earbuds",
  title: "Wireless Earbuds",
  subtitle: "Real product · Queue eligible",
  priceMinor: 149900,
  cashbackCapMinor: 200000,
  stockLabel: "Queue eligible · Max 2 per order"
};

const meta = {
  title: "Mobile/ProductCard",
  component: ProductCard,
  args: {
    product: sample
  }
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Promoted: Story = {
  args: {
    variant: "promoted"
  }
};
export const Loading: Story = {
  args: {
    product: {
      ...sample,
      title: "Loading product card",
      subtitle: "Waiting for readonly product detail"
    }
  }
};
