import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  EdsAutocompleteComponent,
  EdsBadgeComponent,
  EdsButtonComponent,
  EdsCardComponent,
  EdsEmptyStateComponent,
  EdsListComponent,
  EdsStatusComponent,
  EdsTagComponent,
  EdsTimelineComponent,
  type EdsListItem,
  type EdsTimelineItem
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-alerts-page',
  standalone: true,
  imports: [
    RouterLink,
    EdsAutocompleteComponent,
    EdsBadgeComponent,
    EdsButtonComponent,
    EdsCardComponent,
    EdsEmptyStateComponent,
    EdsListComponent,
    EdsStatusComponent,
    EdsTagComponent,
    EdsTimelineComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Incident feed</p>
        <h1>Alerts</h1>
        <p class="summary">Track reliability warnings, policy blocks, and fleet changes as they happen. Action-needed items go to Alex Poluru first.</p>
      </div>
      <eds-button variant="secondary" icon="settings" (clicked)="goSettings()">Alert settings</eds-button>
    </section>

    <eds-card class="card-pad" [elevated]="false">
      <div class="filter-bar">
        <eds-autocomplete
          label="Find an alert"
          placeholder="Research agent"
          [suggestions]="suggestions"
          [value]="search()"
          (valueChange)="search.set($event)"
        ></eds-autocomplete>
        <eds-badge [label]="filtered().length + ' open'" variant="brand" [soft]="true" [pill]="true"></eds-badge>
      </div>

      <div class="chips" style="margin-bottom: 0.85rem">
        @for (tag of tags(); track tag) {
          <eds-tag [label]="tag" variant="brand" [dismissible]="true" (tagDismiss)="dismissTag(tag)"></eds-tag>
        }
      </div>

      @if (filtered().length === 0) {
        <eds-empty-state heading="No alerts match" description="Clear the search or dismiss fewer tags." [icon]="true">
          <div actions>
            <eds-button variant="primary" size="sm" (clicked)="search.set('')">Clear search</eds-button>
          </div>
        </eds-empty-state>
      } @else {
        @for (alert of filtered(); track alert.title) {
          <a class="query-hit" [routerLink]="alert.path">
            <div>
              <strong>{{ alert.title }}</strong>
              <p class="meta">{{ alert.detail }} · {{ alert.owner }} · {{ alert.time }}</p>
            </div>
            <eds-status [label]="alert.severity" [variant]="statusVariant(alert.severity)"></eds-status>
          </a>
        }
      }
    </eds-card>

    <section class="split" style="margin-top: 0.9rem">
      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <h2>Motion</h2>
          <eds-status label="Live" variant="info" [pulse]="true"></eds-status>
        </div>
        <eds-timeline [items]="timeline"></eds-timeline>
      </eds-card>
      <eds-card class="card-pad" [elevated]="false">
        <h2>Owners</h2>
        <eds-list [items]="owners" [divided]="true"></eds-list>
      </eds-card>
    </section>
  `
})
export class AlertsPageComponent {
  private readonly router = inject(Router);
  protected readonly config = templateConfig;
  protected readonly search = signal('');
  protected readonly tags = signal<string[]>([]);

  protected readonly suggestions = this.config.alerts.map((item) => item.title);

  protected readonly filtered = computed(() => {
    const q = this.search().trim().toLowerCase();
    const tags = this.tags();
    return this.config.alerts.filter((item) => {
      const haystack = `${item.title} ${item.detail} ${item.severity} ${item.owner}`.toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesTags = tags.every((tag) => haystack.includes(tag.toLowerCase()));
      return matchesQuery && matchesTags;
    });
  });

  protected readonly timeline: EdsTimelineItem[] = this.config.alerts.map((entry, index) => ({
    title: entry.title,
    description: entry.detail,
    timestamp: entry.time,
    status: index === 0 ? 'current' : index < 3 ? 'complete' : 'upcoming'
  }));

  protected readonly owners: EdsListItem[] = this.config.alerts.map((item) => ({
    label: item.owner,
    description: item.severity + ' · ' + item.time
  }));

  protected goSettings(): void {
    void this.router.navigateByUrl('/settings');
  }

  protected dismissTag(tag: string): void {
    this.tags.update((items) => items.filter((item) => item !== tag));
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Action needed') {
      return 'warning';
    }
    if (status === 'Warning') {
      return 'danger';
    }
    return 'info';
  }
}
