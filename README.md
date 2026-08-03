# Enterprise Design Systems (Angular)

Token-driven enterprise UI library built with **Angular**, **TypeScript**, **Jest**, and **Storybook**.

Feature parity with [`@poluru-labs/enterprise-design-system-wc`](../enterprise-design-system-wc), adapted for Angular standalone components.

See [RELEASE_NOTES.md](./RELEASE_NOTES.md) for version history.

## Features

- Angular 19+ standalone components (`eds-*` selectors)
- Shared design tokens (color, typography, spacing, radius, elevation, motion)
- **Light / dark themes** via `eds-theme-dark` + `EdsThemeService`
- Storybook 8 with Controls, Docs, a11y, themes, interactions
- Jest unit tests (`*.component.spec.ts`)
- TypeScript-first public API

## Quick start

```bash
cd enterprise-design-system-angular
npm install
npm run storybook
```

Storybook: [http://localhost:6008](http://localhost:6008)

```ts
import {
  EdsButtonComponent,
  EdsThemeService,
  ToastService,
} from '@poluru-labs/enterprise-design-system-angular';

// In app styles / angular.json styles:
// node_modules/@poluru-labs/enterprise-design-system-angular/.../tokens/index.css

constructor(private theme: EdsThemeService, private toast: ToastService) {}

toggleDark() {
  this.theme.toggleTheme();
}

notify() {
  this.toast.show({ title: 'Saved', variant: 'success' });
}
```

```html
<html class="eds-theme-dark">
  <!-- or EdsThemeService.setTheme('dark') -->
</html>
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Storybook on port 6008 |
| `npm run build` | Build library (ng-packagr) |
| `npm test` | Jest unit tests |
| `npm run test:coverage` | Coverage report |
| `npm run typecheck` | TypeScript check |

## Folder structure

```text
enterprise-design-system-angular/
├── .storybook/              # Storybook + brand "Enterprise Design Systems"
├── src/
│   ├── lib/
│   │   ├── components/      # eds-* Angular components
│   │   ├── tokens/          # CSS + TS design tokens (+ dark theme)
│   │   ├── icons/
│   │   ├── theme/           # EdsThemeService
│   │   ├── utils/
│   │   └── styles/
│   ├── docs/
│   └── public-api.ts
├── package.json
└── ng-package.json
```

## Author

**Author:** Subrahmanyam Poluru  
**Package:** `@poluru-labs/enterprise-design-system-angular`  
**Brand:** Enterprise Design Systems
