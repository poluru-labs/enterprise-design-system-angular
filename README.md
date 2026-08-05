# Enterprise Design Systems for Angular

Enterprise Design Systems for Angular is a token-driven component library for building modern, accessible, and visually consistent enterprise web applications with Angular. It combines reusable UI primitives, shared design tokens, theming support, and Storybook-powered documentation in one package.

This library is designed to align with the web-component version of the design system while providing a native Angular experience with standalone components and TypeScript-first APIs.

## Why this library?

- Build consistent enterprise UIs faster with reusable components
- Keep styling and behavior aligned through shared design tokens
- Support light and dark themes without duplicating component logic
- Deliver accessible components with Storybook-driven examples and testing
- Use a package structure that fits Angular library and application workflows

## Features

- Angular 19+ standalone components with `eds-*` style integration
- Shared design tokens for color, typography, spacing, radius, elevation, and motion
- Theme support with light/dark modes via `EdsThemeService`
- Storybook 8 documentation with controls, docs, accessibility, themes, and interactions
- Jest-based unit testing for component behavior
- Clean public API exported from the library entry point

## Installation

For consumers of the published package:

```bash
npm install @poluru-labs/enterprise-design-system-angular
```

For local development in this repository:

```bash
cd enterprise-design-system-angular
npm install
```

## Quick start

Start Storybook locally to explore components and examples:

```bash
npm run storybook
```

Open the local Storybook instance at:

- http://localhost:6008

Example usage in an Angular application:

```ts
import { Component } from '@angular/core';
import {
  EdsButtonComponent,
  EdsThemeService,
  ToastService,
} from '@poluru-labs/enterprise-design-system-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EdsButtonComponent],
  template: `
    <eds-button (click)="notify()">Save</eds-button>
  `,
})
export class AppComponent {
  constructor(private theme: EdsThemeService, private toast: ToastService) {}

  toggleTheme() {
    this.theme.toggleTheme();
  }

  notify() {
    this.toast.show({ title: 'Saved', variant: 'success' });
  }
}
```

Make sure your application styles include the library’s token stylesheet, for example from the package distribution or your build pipeline.

```html
<html class="eds-theme-dark">
  <!-- or use EdsThemeService.setTheme('dark') -->
</html>
```

## Theming

The library includes theme-aware design tokens and a lightweight service for switching between themes:

```ts
import { EdsThemeService } from '@poluru-labs/enterprise-design-system-angular';

constructor(private theme: EdsThemeService) {}

switchTheme() {
  this.theme.toggleTheme();
}
```

## Development

### Available scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Start Storybook on port 6008 |
| `npm run build` | Build the library with ng-packagr |
| `npm test` | Run Jest unit tests |
| `npm run test:coverage` | Generate a coverage report |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run typecheck` | Type-check the project |
| `npm run clean` | Remove build, coverage, and Storybook artifacts |

### Project structure

```text
enterprise-design-system-angular/
├── .storybook/              # Storybook configuration and branding
├── src/
│   ├── lib/
│   │   ├── components/      # Angular components
│   │   ├── tokens/          # CSS and token definitions
│   │   ├── icons/           # Icon assets and metadata
│   │   ├── theme/           # Theme service and related logic
│   │   ├── utils/           # Shared utility helpers
│   │   └── styles/          # Global styles
│   ├── docs/                # Documentation content
│   └── public-api.ts        # Library entry point
├── package.json
├── ng-package.json
└── RELEASE_NOTES.md
```

## Documentation and release notes

- See [RELEASE_NOTES.md](./RELEASE_NOTES.md) for version history and notable updates.
- Use Storybook for interactive examples and component documentation.

## License

This project is licensed under the MIT License.

## Maintainer

- Author: Subrahmanyam Poluru
- Package: `@poluru-labs/enterprise-design-system-angular`
- Brand: Enterprise Design Systems
