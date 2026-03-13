import type { Meta, StoryObj } from "@storybook/react-vite";
import { MechanismStepStrip } from "./mechanism-step-strip";

const meta = {
  title: "Mobile/MechanismStepStrip",
  component: MechanismStepStrip
} satisfies Meta<typeof MechanismStepStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomLabels: Story = {
  args: {
    steps: ["Buy item", "Queue entry", "Wait slot", "Release path"]
  }
};
