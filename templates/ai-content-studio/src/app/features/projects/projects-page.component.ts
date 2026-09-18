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
  EdsStatusComponent,
  EdsTagComponent
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    EdsAutocompleteComponent,
    EdsBadgeComponent,
    EdsButtonComponent,
    EdsCardComponent,
    EdsDataTableComponent,
    EdsEmptyStateComponent,
    EdsPaginationComponent,
    EdsStatusComponent,
    EdsTagComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Campaign work</p>
        <h1>Projects</h1>
        <p class="summary">Owners, progress, and due dates for every campaign in the Content Studio workspace.</p>
      </div>
      <eds-badge [label]="filtered().length + ' campaigns'" variant="brand" [soft]="true" [pill]="true"></eds-badge>
    </section>

    <eds-card class="card-pad" [elevated]="false">
      <div class="filter-bar">
        <eds-autocomplete
          label="Find a project"
          placeholder="Q3 Enterprise Launch"
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
        <eds-empty-state heading="No projects match" description="Clear the search or dismiss fewer tags." [icon]="true">
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

    <section class="grid-3">
      @for (project of config.projects.slice(0, 3); track project.id) {
        <eds-card class="card-pad" [elevated]="false">
          <div class="section-head">
            <h3>{{ project.name }}</h3>
            <eds-status [label]="project.status" [variant]="statusVariant(project.status)"></eds-status>
          </div>
          <p class="meta">{{ project.owner }} · {{ project.team }} · {{ project.channel }}</p>
          <p class="meta">{{ project.assets }} assets · {{ project.progress }}% · due {{ project.due }}</p>
        </eds-card>
      }
    </section>
  `
})
export class ProjectsPageComponent {
  protected readonly config = templateConfig;
  protected readonly search = signal('');
  protected readonly page = signal(1);
  protected readonly pageSize = 6;
  protected readonly tags = signal(['Review']);
  protected readonly suggestions = this.config.projects.map((item) => item.name);

  protected readonly columns: EdsDataTableColumn[] = [
    { key: 'project', label: 'Project', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'channel', label: 'Channel', sortable: true },
    { key: 'progress', label: 'Progress', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'due', label: 'Due', sortable: true }
  ];

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const tags = this.tags();
    return this.config.projects.filter((item) => {
      const haystack = `${item.name} ${item.owner} ${item.team} ${item.channel} ${item.status}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesTags = tags.every((tag) => haystack.includes(tag.toLowerCase()));
      return matchesQuery && matchesTags;
    });
  });

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize).map((project) => ({
      project: project.name,
      owner: project.owner,
      channel: project.channel,
      progress: `${project.progress}%`,
      status: project.status,
      due: project.due
    }));
  });

  protected dismissTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
    this.page.set(1);
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Approved') {
      return 'success';
    }
    if (status === 'Review' || status === 'Draft') {
      return 'warning';
    }
    if (status === 'Blocked') {
      return 'danger';
    }
    if (status === 'Scheduled') {
      return 'info';
    }
    return 'neutral';
  }
}
