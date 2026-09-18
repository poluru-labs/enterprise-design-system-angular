# AgentOps Kit — agent operations console

Fleet health, runs, tools, human handoffs, and deploys for AI agents. AgentOps Kit uses a **full-height sidebar** grouped into Operations and Oversight.

**Brand:** `#08766C`  
**Folder:** `ai-agent-ops-console`

## Demo

<img width="3360" height="4232" alt="image" src="https://github.com/user-attachments/assets/96244f34-15ed-4c98-9cdd-2ae2a91b1ed8" />


| | |
| --- | --- |
| Local demo | [http://localhost:4200](http://localhost:4200) |
| Source | [github.com/poluru-labs/…/ai-agent-ops-console](https://github.com/poluru-labs/enterprise-angular-free-ai-web-templates/tree/main/ai-agent-ops-console) |

After `npm start`, open Agents and Runs, then walk a handoff on Handoffs and a publish on Deploy.

If another template is already on port 4200, start with `npx ng serve --port 4211`.

## What you get

- Operations KPIs, run activity, and coverage
- Agent directory with status filters
- Run ledger with traces and outcomes
- Tool catalog and approval state
- Human handoff approve / reject / reassign
- Deploy flow for model, tools, and publish

## Run

Requires Node.js 20+.

```bash
cd ai-agent-ops-console
npm install
npm start
```

| Route | Page |
| --- | --- |
| `/` | Operations — KPIs, run activity, coverage |
| `/agents` | Agent directory — status filters, deploy |
| `/runs` | Run ledger — traces, duration, outcomes |
| `/tools` | Tool catalog — reliability, approval state |
| `/handoffs` | Human review — approve / reject / reassign |
| `/alerts` | Alert queue — policy blocks, reliability |
| `/deploy` | Deploy agent — model, tools, publish |
| `/search` | Workspace search — agents, runs, tools |
| `/settings` | Policies, alerts, and access toggles |

```bash
npm run build
```

Production output: `dist/ai-agent-ops-console`.

## Stack

Angular 21 (standalone components, router), Bootstrap 5, Material Symbols, DM Sans, [`@poluru-labs/enterprise-design-system-angular`](https://www.npmjs.com/package/@poluru-labs/enterprise-design-system-angular). Demo operators include **Alex Poluru**, Maya Subbu, Priya Subbu, and Sam Poluru.

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
