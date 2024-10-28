import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../app/components/**/*.mdx",
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/**/**/*.mdx",
    "../app/components/**/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/stories/**/*.mdx",
    "../app/components/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../app/components/stories/*.mdx",
    "../app/components/stories/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-styling-webpack"
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};
export default config;
