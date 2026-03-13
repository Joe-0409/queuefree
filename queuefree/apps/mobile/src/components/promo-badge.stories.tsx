import type { Meta, StoryObj } from "@storybook/react-vite";
import { PromoBadge } from "./promo-badge";
import { StoryFrame } from "../storybook/story-frame";

const meta = {
  title: "Mobile/PromoBadge",
  component: PromoBadge,
  render: (args) => (
    <StoryFrame>
      <PromoBadge {...args} />
    </StoryFrame>
  ),
  args: {
    label: "Featured today"
  }
} satisfies Meta<typeof PromoBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Neutral: Story = {
  args: {
    tone: "neutral",
    label: "Rule center"
  }
};
