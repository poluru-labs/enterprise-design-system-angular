import type { Preview, Decorator } from '@storybook/angular';
import { applicationConfig, componentWrapperDecorator } from '@storybook/angular';
import { provideAnimations } from '@angular/platform-browser/animations';
import { themes } from '@storybook/theming';
import { DecoratorHelpers } from '@storybook/addon-themes';

const { initializeThemeState, pluckThemeFromContext } = DecoratorHelpers;
initializeThemeState(['light', 'dark'], 'light');

const withEdsTheme: Decorator = (storyFn, context) => {
  const selected = pluckThemeFromContext(context as never);
  const override = (context.parameters['themes'] as { themeOverride?: string } | undefined)
    ?.themeOverride;
  const themeName = override || selected || 'light';
  const isDark = themeName === 'dark';

  if (typeof document !== 'undefined') {
    for (const el of [
      document.documentElement,
      document.body,
      document.getElementById('storybook-root'),
      document.getElementById('root'),
    ]) {
      el?.classList.toggle('eds-theme-dark', isDark);
    }
  }

  return storyFn();
};

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    withEdsTheme,
    componentWrapperDecorator(
      (story) =>
        `<div class="eds-story-frame" style="color: var(--eds-color-text); background: var(--eds-color-bg); min-height: 100%; padding: 1rem; box-sizing: border-box; border-radius: var(--eds-radius-md);">${story}</div>`,
    ),
  ],
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*|.*Change' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      theme: themes.light,
      toc: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Introduction',
          ['Author'],
          'Foundations',
          ['Icons', 'Themes', 'Tokens', 'Typography'],
          'Components',
        ],
      },
    },
    layout: 'centered',
    backgrounds: {
      disable: true,
    },
  },
  tags: ['autodocs'],
};

export default preview;
