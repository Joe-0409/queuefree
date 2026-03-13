import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "react-native";
import { SectionCard } from "./section-card";

const meta = {
  title: "Mobile/SectionCard",
  component: SectionCard,
  args: {
    title: "Section title",
    description: "Short supportive description."
  },
  render: (args) => (
    <SectionCard {...args}>
      <Text>Card body content</Text>
    </SectionCard>
  )
} satisfies Meta<typeof SectionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = {
  args: {
    variant: "muted"
  }
};
