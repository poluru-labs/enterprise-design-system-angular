import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  EdsBadgeComponent,
  EdsCardComponent,
  EdsStatusComponent,
  EdsTimelineComponent,
  type EdsTimelineItem
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [EdsBadgeComponent, EdsCardComponent, EdsStatusComponent, EdsTimelineComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Editorial cadence</p>
        <h1>Calendar</h1>
        <p class="summary">This week's publishing plan, from brief alignment through brand council and go-live.</p>
      </div>
      <eds-badge [label]="config.calendar.length + ' planned'" variant="brand" [soft]="true"></eds-badge>
    </section>

    <section class="split">
      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <h2>This week</h2>
        </div>
        <eds-timeline [items]="timelineItems"></eds-timeline>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <h2>Upcoming slots</h2>
        @for (entry of config.calendar; track entry.date + entry.item) {
          <div class="job-row">
            <div class="job-head">
              <div>
                <strong>{{ entry.day }} · {{ entry.date }}</strong>
                <p class="meta">{{ entry.item }} · {{ entry.owner }} · {{ entry.channel }}</p>
              </div>
              <eds-status [label]="entry.status" [variant]="statusVariant(entry.status)"></eds-status>
            </div>
          </div>
        }
      </eds-card>
    </section>
  `
})
export class CalendarPageComponent {
  protected readonly config = templateConfig;
  protected readonly timelineItems: EdsTimelineItem[] = this.config.calendar.slice(0, 5).map((entry) => ({
    title: entry.item,
    description: `${entry.day} · ${entry.owner} · ${entry.channel}`,
    timestamp: entry.date,
    status: entry.status === 'Complete' ? 'complete' : entry.status === 'Current' ? 'current' : 'upcoming'
  }));

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Complete') {
      return 'success';
    }
    if (status === 'Current') {
      return 'warning';
    }
    if (status === 'Upcoming') {
      return 'info';
    }
    return 'neutral';
  }
}
