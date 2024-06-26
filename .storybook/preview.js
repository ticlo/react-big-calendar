export const parameters = {
  controls: {
    // TODO: refactor jsDocs in Calendar control
    //expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  storySort: {
    order: [
      'About Big Calendar',
      'About Our Examples',
      'props',
      'Examples',
      'Guides',
      'Addons',
      ['Introduction', 'props'],
    ],
  },
  viewMode: 'docs',
}
export const tags = ["autodocs"];
