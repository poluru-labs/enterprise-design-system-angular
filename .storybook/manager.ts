import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Enterprise Design Systems',
    brandUrl: './',
    brandTarget: '_self',
    brandImage: undefined,

    colorPrimary: '#0f6e6a',
    colorSecondary: '#0f6e6a',

    appBg: '#f4f6f8',
    appContentBg: '#ffffff',
    appPreviewBg: '#ffffff',
    appBorderColor: '#d7dee7',
    appBorderRadius: 8,

    fontBase: '"Source Sans 3", "Segoe UI", sans-serif',
    fontCode: '"IBM Plex Mono", ui-monospace, monospace',

    textColor: '#0f1720',
    textInverseColor: '#ffffff',
    textMutedColor: '#5b6b7c',

    barTextColor: '#5b6b7c',
    barSelectedColor: '#0f6e6a',
    barHoverColor: '#0f6e6a',
    barBg: '#ffffff',

    inputBg: '#ffffff',
    inputBorder: '#d7dee7',
    inputTextColor: '#0f1720',
    inputBorderRadius: 6,
  }),
  panelPosition: 'right',
  enableShortcuts: true,
});
