# Release Notes

All notable changes to `@poluru-labs/enterprise-design-system-angular` are documented in this file.

---

## [1.0.0] — 2026-07-22

Initial public release of **Enterprise Design Systems** (Angular).

**Author:** Subrahmanyam Poluru · Poluru Labs  
**Brand:** Enterprise Design Systems

### Highlights

- Angular 19+ standalone component library (TypeScript)
- Token-driven theming with **light** and **dark** modes
- Storybook 8 living style guide (sidebar brand: **Enterprise Design Systems**)
- Jest unit tests for components
- Feature parity with the Lit WC design system package

### Added

#### Foundations

- Design tokens: color, typography, spacing, radius, elevation, motion
- Dark theme via `eds-theme-dark` + `EdsThemeService`
- Built-in icon set (`eds-icon`)
- Date utilities for calendar pickers

#### Components

Accordion, Alert, Autocomplete, Avatar, Badge, Breadcrumb, Button, Button Group, Card, Checkbox, Circular Progress, Code Snippet, Combobox, Data Table, Date Picker, Date Range Picker, Description List, Divider, Drawer, Dropdown Menu, Empty State, File Upload, Icon, Input, Kbd, Link, List, Meter, Modal, Number Input, Pagination, Pin Input, Popover, Progress Bar, Radio / Radio Group, Rating, Search, Segmented Control, Select, Side Nav, Skeleton, Slider, Spinner, Split Button, Stat, Status, Stepper, Switch, Tabs, Tag, Textarea, Time Picker, Timeline, Toast (+ `ToastService`), Toolbar, Tooltip, Tree View, Visually Hidden

#### Tooling

- Storybook addons: essentials, links, a11y, themes, interactions
- Jest + jest-preset-angular
- ng-packagr library build

### Scripts

| Command | Description |
| --- | --- |
| `npm run storybook` | Develop in Storybook |
| `npm run build` | Build library |
| `npm test` | Run Jest |
| `npm run typecheck` | TypeScript check |

---

## Unreleased

Changes after `1.0.0` will be listed here.
