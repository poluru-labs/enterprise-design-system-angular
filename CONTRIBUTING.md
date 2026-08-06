# Contributing

Thanks for helping improve Enterprise Design Systems for Angular.

## Development setup

```bash
npm ci
npm run storybook
```

Storybook runs at http://localhost:6008.

## Useful commands

| Command | Description |
| --- | --- |
| `npm test` | Run unit tests |
| `npm run typecheck` | Type-check the project |
| `npm run build` | Build the publishable library into `dist/` |
| `npm run pack:lib` | Build and create an npm tarball from `dist/` |

## Pull requests

1. Keep changes focused and consistent with existing component patterns (`eds-*` selectors, standalone components, token-driven styles).
2. Add or update Jest specs for behavior changes.
3. Add or update Storybook stories when public APIs or visuals change.
4. Run `npm test`, `npm run typecheck`, and `npm run build` before opening a PR.

## Coding guidelines

- Prefer standalone Angular components and TypeScript-first public APIs.
- Use design tokens (`var(--eds-*)`) instead of hard-coded visual values.
- Keep accessibility attributes and keyboard behavior intact for interactive components.
- Export new public symbols from the existing library entry points.

## Reporting issues

Use GitHub Issues with steps to reproduce, expected vs actual behavior, and Angular / package versions when relevant.

Security vulnerabilities should not be filed as public issues — see [SECURITY.md](./SECURITY.md).
