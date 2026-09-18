import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  EdsAutocompleteComponent,
  EdsBadgeComponent,
  EdsButtonComponent,
  EdsCardComponent,
  EdsDataTableColumn,
  EdsDataTableComponent,
  EdsEmptyStateComponent,
  EdsPaginationComponent,
  EdsTagComponent
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-library-page',
  standalone: true,
  imports: [
    EdsAutocompleteComponent,
    EdsBadgeComponent,
    EdsButtonComponent,
    EdsCardComponent,
    EdsDataTableComponent,
    EdsEmptyStateComponent,
    EdsPaginationComponent,
    EdsTagComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Published assets</p>
        <h1>Library</h1>
        <p class="summary">Reuse approved copy, briefs, and channel variants. Brand-match scores come from the guardrail run.</p>
      </div>
      <eds-badge [label]="filtered().length + ' assets'" variant="brand" [soft]="true" [pill]="true"></eds-badge>
    </section>

    <eds-card class="card-pad" [elevated]="false">
      <div class="filter-bar">
        <eds-autocomplete
          label="Find an asset"
          placeholder="AI governance explainer"
          [suggestions]="suggestions"
          [value]="search()"
          (valueChange)="search.set($event); page.set(1)"
        ></eds-autocomplete>
      </div>

      <div class="chips">
        @for (tag of tags(); track tag) {
          <eds-tag [label]="tag" variant="brand" [dismissible]="true" (tagDismiss)="dismissTag(tag)"></eds-tag>
        }
      </div>

      @if (pageRows().length === 0) {
        <eds-empty-state heading="No assets match" description="Clear the search or dismiss fewer tags." [icon]="true">
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
  `
})
export class LibraryPageComponent {
  protected readonly config = templateConfig;
  protected readonly search = signal('');
  protected readonly page = signal(1);
  protected readonly pageSize = 6;
  protected readonly tags = signal(['Published']);
  protected readonly suggestions = this.config.library.map((item) => item.title);

  protected readonly columns: EdsDataTableColumn[] = [
    { key: 'title', label: 'Asset', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'brandMatch', label: 'Brand match', sortable: true },
    { key: 'published', label: 'Published', sortable: true }
  ];

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const tags = this.tags();
    return this.config.library.filter((item) => {
      const haystack = `${item.title} ${item.type} ${item.owner} ${item.channel} ${item.status}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesTags = tags.every((tag) => haystack.includes(tag.toLowerCase()));
      return matchesQuery && matchesTags;
    });
  });

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  protected dismissTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
    this.page.set(1);
  }
}
