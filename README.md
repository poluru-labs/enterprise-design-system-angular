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

Include the library styles in your Angular app (for example in `angular.json`):

```json
"styles": [
  "@poluru-labs/enterprise-design-system-angular/tokens.css",
  "@poluru-labs/enterprise-design-system-angular/styles.css",
  "src/styles.css"
]
```

Optional dark theme on the document root:

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
| `npm run build` | Build the library with ng-packagr into `dist/` |
| `npm test` | Run Jest unit tests |
| `npm run test:coverage` | Generate a coverage report |
| `npm run test:watch` | Run Jest in watch mode |
| `npm run typecheck` | Type-check the project |
| `npm run clean` | Remove build, coverage, and Storybook artifacts |
| `npm run pack:lib` | Build and create an npm tarball from `dist/` |
| `npm run publish:lib` | Build and publish the package from `dist/` |

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

## Publishing

This library must be published from the built `dist/` folder (not the repo root):

```bash
npm run pack:lib      # verify tarball contents
npm run publish:lib   # requires npm login with @poluru-labs publish rights
```

After publishing, tag the release in git (for example `v1.0.0`) and update [RELEASE_NOTES.md](./RELEASE_NOTES.md).

## Documentation and release notes

- See [RELEASE_NOTES.md](./RELEASE_NOTES.md) for version history and notable updates.
- Use Storybook for interactive examples and component documentation.
- See [CONTRIBUTING.md](./CONTRIBUTING.md) for local development and PR guidelines.
- See [SECURITY.md](./SECURITY.md) for private vulnerability reporting.

## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) and [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## Maintainer

- Author: Subrahmanyam Poluru
- Package: `@poluru-labs/enterprise-design-system-angular`
- Brand: Enterprise Design Systems / Poluru Labs
