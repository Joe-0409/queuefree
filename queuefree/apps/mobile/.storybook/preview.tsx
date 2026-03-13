import type { Preview } from "@storybook/react-vite";
import React from "react";
import { View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true }
  },
  decorators: [
    (Story) => (
      <View
        style={{
          width: 390,
          minHeight: 844,
          padding: mobileTheme.spacing.md,
          backgroundColor: mobileTheme.colors.background
        }}
      >
        <Story />
      </View>
    )
  ]
};

export default preview;
