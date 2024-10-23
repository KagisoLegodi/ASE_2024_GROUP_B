/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: [
    "../app/components/**/*.mdx", // Match all .mdx files in app/components and all subdirectories
    "../app/components/**/*.stories.@(js|jsx|mjs|ts|tsx)", // Match all story files with the listed extensions in app/components and subdirectories
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};
export default config;
