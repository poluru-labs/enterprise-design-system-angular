import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
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
  selector: 'app-runs-page',
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
        <p class="eyebrow">Execution history</p>
        <h1>Runs</h1>
      </div>
      <div edsToolbarEnd>
        <eds-split-button label="Open handoffs" variant="primary" size="sm" (primaryClick)="openHandoffs()">
          <eds-menu-item label="Waiting" value="waiting"></eds-menu-item>
          <eds-menu-item label="Approved" value="approved"></eds-menu-item>
          <eds-menu-item label="Rejected" value="rejected"></eds-menu-item>
        </eds-split-button>
      </div>
    </eds-toolbar>

    <eds-card class="card-pad" [elevated]="false" style="margin-top: 0.85rem">
      <div class="filter-bar">
        <eds-autocomplete
          label="Find a run"
          placeholder="RUN-1842"
          [suggestions]="suggestions"
          [value]="search()"
          (valueChange)="search.set($event)"
        ></eds-autocomplete>
        <eds-date-range-picker
          label="Window"
          [startValue]="rangeStart()"
          [endValue]="rangeEnd()"
          (rangeChange)="onRange($event)"
        ></eds-date-range-picker>
        <eds-popover heading="Outcome legend" placement="bottom">
          <eds-button trigger variant="secondary" size="sm" icon="info">Legend</eds-button>
          <p class="muted">Complete finished cleanly. Review is waiting on a human. Failed runs pause the agent after three consecutive errors.</p>
        </eds-popover>
      </div>

      <div class="chips" style="margin-bottom: 0.85rem">
        @for (tag of tags(); track tag) {
          <eds-tag [label]="tag" variant="brand" [dismissible]="true" (tagDismiss)="dismissTag(tag)"></eds-tag>
        }
        <eds-badge [label]="filtered().length + ' rows'" variant="neutral" [soft]="true" [pill]="true"></eds-badge>
      </div>

      @if (pageRows().length === 0) {
        <eds-empty-state heading="No runs match" description="Clear filters or pick another window." [icon]="true">
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
      @for (run of config.runs.slice(0, 3); track run.id) {
        <eds-card class="card-pad" [elevated]="false">
          <div class="section-head">
            <h3>{{ run.id }}</h3>
            <eds-status [label]="run.status" [variant]="statusVariant(run.status)"></eds-status>
          </div>
          <p class="meta">{{ run.agent }} · {{ run.owner }} · {{ run.duration }}</p>
          <p class="meta">{{ run.detail }}</p>
          <eds-tag [label]="run.tools" variant="info"></eds-tag>
        </eds-card>
      }
    </section>
  `
})
export class RunsPageComponent {
  private readonly router = inject(Router);
  protected readonly config = templateConfig;
  protected readonly search = signal('');
  protected readonly page = signal(1);
  protected readonly pageSize = 6;
  protected readonly rangeStart = signal('2026-08-24');
  protected readonly rangeEnd = signal('2026-08-31');
  protected readonly tags = signal(['Complete']);

  protected readonly suggestions = this.config.runs.map((item) => item.id);

  protected readonly columns: EdsDataTableColumn[] = [
    { key: 'id', label: 'Run', sortable: true },
    { key: 'agent', label: 'Agent', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'started', label: 'Started', sortable: true },
    { key: 'duration', label: 'Duration', sortable: true },
    { key: 'tools', label: 'Tool', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const tags = this.tags();
    return this.config.runs.filter((item) => {
      const haystack = `${item.id} ${item.agent} ${item.owner} ${item.status} ${item.detail}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesTags = tags.every((tag) => haystack.includes(tag.toLowerCase()));
      return matchesQuery && matchesTags;
    });
  });

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  protected openHandoffs(): void {
    void this.router.navigateByUrl('/handoffs');
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
    if (status === 'Complete') {
      return 'success';
    }
    if (status === 'Review' || status === 'Running') {
      return 'warning';
    }
    if (status === 'Failed') {
      return 'danger';
    }
    return 'neutral';
  }
}
