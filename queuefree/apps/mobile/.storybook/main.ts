import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {}
  },
  async viteFinal(config) {
    config.resolve = config.resolve ?? {};
    const alias = config.resolve.alias ?? {};
    config.resolve.alias = Array.isArray(alias)
      ? alias
      : {
          ...alias,
          "react-native$": "react-native-web",
          "@queuefree/ui-tokens": path.resolve(__dirname, "../../../packages/ui-tokens/src"),
          "@queuefree/shared": path.resolve(__dirname, "../../../packages/shared/src")
        };

    return config;
  }
};

export default config;
