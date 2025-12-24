const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',

    //'@storybook/addon-jest', // TODO: try this out
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /(?<!\.module).s[ca]ss$/,
        },
      },
    },
    // module
    {
      name: `@storybook/preset-scss`,
      options: {
        rule: {
          test: /\.module\.s[ca]ss$/,
        },
        cssLoaderOptions: {
          modules: {
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],
  builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  framework: '@storybook/react-vite', // 👈 Add this



  docs: {},

  typescript: {

  }
}
