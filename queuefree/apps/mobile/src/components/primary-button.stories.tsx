import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";
import { PrimaryButton } from "./primary-button";

const meta = {
  title: "Mobile/PrimaryButton",
  component: PrimaryButton,
  render: (args) => (
    <View style={{ gap: 12 }}>
      <PrimaryButton {...args} />
    </View>
  ),
  args: {
    label: "Continue"
  }
} satisfies Meta<typeof PrimaryButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Promo: Story = {
  args: {
    variant: "promo",
    label: "Continue with OTP"
  }
};
export const Disabled: Story = {
  args: {
    disabled: true
  }
};
export const Loading: Story = {
  args: {
    loading: true
  }
};
