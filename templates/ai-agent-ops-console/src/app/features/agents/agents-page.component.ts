import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  EdsAutocompleteComponent,
  EdsBadgeComponent,
  EdsButtonComponent,
  EdsCardComponent,
  EdsDataTableColumn,
  EdsDataTableComponent,
  EdsDateRangePickerComponent,
  EdsEmptyStateComponent,
  EdsMenuItemComponent,
  EdsPaginationComponent,
  EdsPopoverComponent,
  EdsSplitButtonComponent,
  EdsStatusComponent,
  EdsTagComponent,
  EdsToolbarComponent
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-agents-page',
  standalone: true,
  imports: [
    EdsAutocompleteComponent,
    EdsBadgeComponent,
    EdsButtonComponent,
    EdsCardComponent,
    EdsDataTableComponent,
    EdsDateRangePickerComponent,
    EdsEmptyStateComponent,
    EdsMenuItemComponent,
    EdsPaginationComponent,
    EdsPopoverComponent,
    EdsSplitButtonComponent,
    EdsStatusComponent,
    EdsTagComponent,
    EdsToolbarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <eds-toolbar [bordered]="false">
      <div edsToolbarStart>
        <p class="eyebrow">Agent directory</p>
        <h1>Agents</h1>
      </div>
      <div edsToolbarEnd>
        <eds-split-button label="Deploy agent" variant="primary" size="sm" (primaryClick)="openDeploy()">
          <eds-menu-item label="Finance" value="finance"></eds-menu-item>
          <eds-menu-item label="Support" value="support"></eds-menu-item>
          <eds-menu-item label="People" value="people"></eds-menu-item>
        </eds-split-button>
      </div>
    </eds-toolbar>

    <eds-card class="card-pad" [elevated]="false" style="margin-top: 0.85rem">
      <div class="filter-bar">
        <eds-autocomplete
          label="Find an agent"
          placeholder="Invoice triage"
          [suggestions]="suggestions"
          [value]="search()"
          (valueChange)="search.set($event)"
        ></eds-autocomplete>
        <eds-date-range-picker
          label="Updated"
          [startValue]="rangeStart()"
          [endValue]="rangeEnd()"
          (rangeChange)="onRange($event)"
        ></eds-date-range-picker>
        <eds-popover heading="Status legend" placement="bottom">
          <eds-button trigger variant="secondary" size="sm" icon="info">Legend</eds-button>
          <p class="muted">Live is serving production. Review needs Alex Poluru. Paused agents stay out of the fleet until an owner restarts them.</p>
        </eds-popover>
      </div>

      <div class="chips" style="margin-bottom: 0.85rem">
        @for (tag of tags(); track tag) {
          <eds-tag [label]="tag" variant="brand" [dismissible]="true" (tagDismiss)="dismissTag(tag)"></eds-tag>
        }
        <eds-badge [label]="filtered().length + ' rows'" variant="neutral" [soft]="true" [pill]="true"></eds-badge>
      </div>

      @if (pageRows().length === 0) {
        <eds-empty-state heading="No agents match" description="Clear filters or pick another window." [icon]="true">
          <div actions>
            <eds-button variant="primary" size="sm" (clicked)="search.set('')">Clear search</eds-button>
          </div>
        </eds-empty-state>
      } @else {
        <div class="table-wrap">
          <eds-data-table [columns]="columns" [rows]="pageRows()" [striped]="true" [sortable]="true"></eds-data-table>
        </div>
        <div class="pager">
          <eds-pagination
            [page]="page()"
            [pageSize]="pageSize"
            [total]="filtered().length"
            (pageChange)="page.set($event)"
          ></eds-pagination>
        </div>
      }
    </eds-card>

    <section class="grid-3" style="margin-top: 0.9rem">
      @for (agent of config.agents.slice(0, 3); track agent.id) {
        <eds-card class="card-pad" [elevated]="false">
          <div class="section-head">
            <h3>{{ agent.name }}</h3>
            <eds-status [label]="agent.status" [variant]="statusVariant(agent.status)"></eds-status>
          </div>
          <p class="meta">{{ agent.team }} · {{ agent.owner }} · {{ agent.model }}</p>
          <p class="meta">{{ agent.runs }} runs · {{ agent.success }} success · {{ agent.updated }}</p>
          <eds-tag [label]="agent.version" variant="info"></eds-tag>
        </eds-card>
      }
    </section>
  `
})
export class AgentsPageComponent {
  protected readonly config = templateConfig;
  protected readonly search = signal('');
  protected readonly page = signal(1);
  protected readonly pageSize = 6;
  protected readonly rangeStart = signal('2026-08-01');
  protected readonly rangeEnd = signal('2026-08-31');
  protected readonly tags = signal(['Live']);

  protected readonly suggestions = this.config.agents.map((item) => item.name);

  protected readonly columns: EdsDataTableColumn[] = [
    { key: 'name', label: 'Agent', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'team', label: 'Team', sortable: true },
    { key: 'version', label: 'Version', sortable: true },
    { key: 'runs', label: 'Runs', sortable: true },
    { key: 'success', label: 'Success', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const tags = this.tags();
    return this.config.agents.filter((item) => {
      const haystack = `${item.name} ${item.owner} ${item.team} ${item.status}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesTags = tags.every((tag) => haystack.includes(tag.toLowerCase()));
      return matchesQuery && matchesTags;
    });
  });

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  protected openDeploy(): void {
    window.dispatchEvent(new CustomEvent('agentops:deploy'));
  }

  protected onRange(range: { start: string; end: string }): void {
    this.rangeStart.set(range.start);
    this.rangeEnd.set(range.end);
  }

  protected dismissTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
    this.page.set(1);
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Live') {
      return 'success';
    }
    if (status === 'Review') {
      return 'warning';
    }
    if (status === 'Paused') {
      return 'danger';
    }
    return 'neutral';
  }
}
