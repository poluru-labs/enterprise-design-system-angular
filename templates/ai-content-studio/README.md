# Content Studio — AI content workspace

Draft, approve, and schedule campaign content with brand guardrails. Content Studio uses a brand bar in **`#0046FF`** and a compact sidebar.

**Brand:** `#0046FF`  
**Folder:** `ai-content-studio`

## Demo

<img width="3360" height="4230" alt="image" src="https://github.com/user-attachments/assets/c5bc0eff-0035-4fd9-9a65-973754fdb12a" />


| | |
| --- | --- |
| Local demo | [http://localhost:4200](http://localhost:4200) |
| Source | [github.com/poluru-labs/…/ai-content-studio](https://github.com/poluru-labs/enterprise-angular-free-ai-web-templates/tree/main/ai-content-studio) |

After `npm start`, open Projects and Calendar, then walk an approval and check Brand voice. If another template is already on port 4200, start with `npx ng serve --port 4213`.

## What you get

- Production, approval, and brand-match KPIs
- Project list with owners, channels, and due dates
- Asset library with brand-match scores
- Editorial calendar
- Approval queue (approve / request changes / block)
- Brand-voice guardrails and restricted claims
- Workspace search (⌘K)
- Draft / approve workflow modal

## Run

Requires Node.js 20+.

```bash
cd ai-content-studio
npm install
npm start
```

| Route | Page |
| --- | --- |
| `/` | Dashboard — KPIs, features, channel mix, and activity |
| `/projects` | Projects — owners, progress, due dates |
| `/library` | Library — published and in-flight assets |
| `/calendar` | Calendar — weekly publishing plan |
| `/approvals` | Approvals — review queue and decisions |
| `/brand-voice` | Brand voice — naming and claim rules |
| `/search` | Search — projects, assets, approvals |
| `/settings` | Workspace toggles and guardrail floor |

```bash
npm run build
```

Production output: `dist/ai-content-studio`.

## Stack

Angular 21 (standalone components, router), Bootstrap 5, Material Symbols, DM Sans, [`@poluru-labs/enterprise-design-system-angular`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-angular). Demo editors include **Alex Poluru**, Maya Subbu, Priya Subbu, and Sam Poluru.

Copy lives in `src/app/core/config/template.config.ts`. Layout and brand color live in `src/styles.scss`.

```
src/
  app/
    core/config/          shared template copy
    features/             one folder per route
    shared/testing/       spec helpers
    app.component.ts
    app.config.ts
    app.routes.ts
  environments/
  assets/
```

```bash
npm test
npm run lint
npm run lint:fix
```

## License

[MIT](../LICENSE) © 2026 [Subrahmanyam Poluru](https://polurus.com) / Poluru Labs
