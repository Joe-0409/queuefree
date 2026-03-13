import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { TextField } from "./text-field";

function FieldStory(args: { label: string; placeholder: string; errorText?: string }) {
  const [value, setValue] = useState("");
  return <TextField {...args} value={value} onChangeText={setValue} />;
}

const meta = {
  title: "Mobile/TextField",
  component: TextField,
  render: (args) => <FieldStory {...args} />,
  args: {
    label: "Phone number",
    placeholder: "+63 9xx xxx xxxx"
  }
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    errorText: "Please enter a valid phone number."
  }
};
