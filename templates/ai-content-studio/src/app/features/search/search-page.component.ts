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
        <p class="summary">Find projects, assets, approvals, and calendar slots. Try ⌘K from any page.</p>
      </div>
    </section>

    <eds-search
      size="lg"
      placeholder="Search projects, assets, or reviewers..."
      [clearable]="true"
      [value]="query()"
      (valueChange)="query.set($event)"
    ></eds-search>

    <eds-card class="card-pad" [elevated]="false">
      @if (results().length === 0) {
        <eds-empty-state heading="No matches" description="Try a project name, asset ID, or reviewer such as “Maya Subbu”." [icon]="true">
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
      ...templateConfig.projects.map((item) => ({ title: item.name, detail: `${item.owner} · ${item.channel} · ${item.status}`, path: '/projects', kind: 'Project' })),
      ...templateConfig.library.map((item) => ({ title: item.title, detail: `${item.id} · ${item.owner} · ${item.channel} · ${item.status}`, path: '/library', kind: 'Asset' })),
      ...templateConfig.approvals.map((item) => ({ title: item.id, detail: `${item.title} · ${item.reviewer}`, path: '/approvals', kind: 'Approval' })),
      ...templateConfig.calendar.map((item) => ({ title: item.item, detail: `${item.day} · ${item.owner} · ${item.channel}`, path: '/calendar', kind: 'Calendar' })),
      ...templateConfig.restrictedClaims.map((item) => ({ title: item.term, detail: `${item.reason} · ${item.owner}`, path: '/brand-voice', kind: 'Guardrail' }))
    ];
    return term ? catalog.filter((item) => `${item.title} ${item.detail}`.toLowerCase().includes(term)) : catalog.slice(0, 10);
  });
}
