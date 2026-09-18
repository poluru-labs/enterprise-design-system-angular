import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EdsButtonComponent,
  EdsCardComponent,
  EdsEmptyStateComponent,
  EdsSearchComponent,
  EdsStatusComponent
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [RouterLink, EdsButtonComponent, EdsCardComponent, EdsEmptyStateComponent, EdsSearchComponent, EdsStatusComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Workspace search</p>
        <h1>Search</h1>
        <p class="summary">Find agents, runs, tools, and handoffs across the operations console. Try ⌘K from any page.</p>
      </div>
    </section>

    <eds-search
      size="lg"
      placeholder="Search agents, runs, tools..."
      [clearable]="true"
      [value]="query()"
      (valueChange)="query.set($event)"
    ></eds-search>

    <eds-card class="card-pad" [elevated]="false" style="margin-top: 0.9rem">
      @if (results().length === 0) {
        <eds-empty-state heading="No matches" description="Try an agent name, run ID, or tool such as “web search”." [icon]="true">
          <div actions>
            <eds-button variant="primary" size="sm" (clicked)="query.set('')">Clear search</eds-button>
          </div>
        </eds-empty-state>
      } @else {
        @for (result of results(); track result.title + result.path) {
          <a class="query-hit" [routerLink]="result.path">
            <div>
              <strong>{{ result.title }}</strong>
              <p class="meta">{{ result.detail }}</p>
            </div>
            <eds-status [label]="result.kind" variant="info"></eds-status>
          </a>
        }
      }
    </eds-card>
  `
})
export class SearchPageComponent {
  protected readonly query = signal('');
  protected readonly results = computed(() => {
    const term = this.query().trim().toLowerCase();
    const catalog = [
      ...templateConfig.agents.map((item) => ({ title: item.name, detail: `${item.owner} · ${item.team} · ${item.status}`, path: '/agents', kind: 'Agent' })),
      ...templateConfig.runs.map((item) => ({ title: item.id, detail: `${item.agent} · ${item.detail}`, path: '/runs', kind: 'Run' })),
      ...templateConfig.tools.map((item) => ({ title: item.name, detail: `${item.type} · ${item.status}`, path: '/tools', kind: 'Tool' })),
      ...templateConfig.handoffs.map((item) => ({ title: item.id, detail: `${item.agent} · ${item.reason}`, path: '/handoffs', kind: 'Handoff' })),
      ...templateConfig.alerts.map((item) => ({ title: item.title, detail: `${item.owner} · ${item.detail}`, path: item.path, kind: 'Alert' }))
    ];
    return term ? catalog.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(term)) : catalog.slice(0, 10);
  });
}
