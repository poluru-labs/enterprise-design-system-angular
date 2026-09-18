import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  EdsButtonComponent,
  EdsCardComponent,
  EdsMeterComponent,
  EdsProgressBarComponent,
  EdsSkeletonComponent,
  EdsSpinnerComponent,
  EdsStatusComponent,
  EdsStepperComponent,
  EdsTimelineComponent,
  type EdsStepperStep,
  type EdsTimelineItem
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-handoffs-page',
  standalone: true,
  imports: [
    EdsButtonComponent,
    EdsCardComponent,
    EdsMeterComponent,
    EdsProgressBarComponent,
    EdsSkeletonComponent,
    EdsSpinnerComponent,
    EdsStatusComponent,
    EdsStepperComponent,
    EdsTimelineComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Human oversight</p>
        <h1>Handoffs</h1>
        <p class="summary">Approve, reject, or reassign agent actions that need a human decision. Alex Poluru is on the review rotation this week.</p>
      </div>
      <eds-spinner size="sm" label="Live queue" [showLabel]="true"></eds-spinner>
    </section>

    <eds-card class="card-pad" [elevated]="false">
      <div class="section-head">
        <h2>Review cycle</h2>
        <eds-status label="Waiting" variant="warning" [pulse]="true"></eds-status>
      </div>
      <eds-stepper [steps]="steps" [current]="1"></eds-stepper>
    </eds-card>

    <section class="split" style="margin-top: 0.9rem">
      <eds-card class="card-pad" [elevated]="false">
        <h2>Open requests</h2>
        @for (item of waiting(); track item.id) {
          <div class="job-row">
            <div class="job-head">
              <div>
                <strong>{{ item.id }} · {{ item.agent }}</strong>
                <p class="meta">{{ item.reviewer }} · {{ item.risk }} risk · {{ item.run }} · {{ item.waiting }}</p>
              </div>
              <eds-status [label]="item.status" [variant]="statusVariant(item.status)"></eds-status>
            </div>
            <p class="meta">{{ item.reason }}</p>
            @if (item.status === 'Waiting' && item.risk === 'High') {
              <eds-progress-bar [value]="82" [max]="100" [label]="item.id" [showValue]="true"></eds-progress-bar>
            } @else if (item.status === 'Waiting') {
              <eds-meter [value]="54" [max]="100" [label]="item.id" [showValue]="true"></eds-meter>
            } @else {
              <eds-skeleton variant="text" [lines]="1"></eds-skeleton>
            }
            @if (item.status === 'Waiting') {
              <div class="handoff-actions">
                <eds-button variant="primary" size="sm" (clicked)="resolve(item.id, 'Approved')">Approve</eds-button>
                <eds-button variant="secondary" size="sm" (clicked)="resolve(item.id, 'Rejected')">Reject</eds-button>
              </div>
            }
          </div>
        }
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <h2>This week</h2>
        <eds-timeline [items]="timeline"></eds-timeline>
      </eds-card>
    </section>
  `
})
export class HandoffsPageComponent {
  protected readonly config = templateConfig;
  private readonly items = signal(templateConfig.handoffs.map((item) => ({ ...item })));
  protected readonly waiting = computed(() => this.items());

  protected readonly steps: EdsStepperStep[] = [
    { label: 'Flagged', description: 'Agent paused' },
    { label: 'Assigned', description: 'Reviewer queued' },
    { label: 'Decide', description: 'Approve or reject' },
    { label: 'Resume', description: 'Agent continues' },
    { label: 'Audit', description: 'Trace stored' }
  ];

  protected readonly timeline: EdsTimelineItem[] = this.config.releases.map((entry, index) => ({
    title: entry.item,
    description: entry.day + ' · ' + entry.coverage + '% coverage',
    timestamp: entry.day,
    status: index === 0 ? 'current' : index < 3 ? 'complete' : 'upcoming'
  }));

  protected resolve(id: string, status: 'Approved' | 'Rejected'): void {
    this.items.update((items) => items.map((item) => item.id === id
      ? { ...item, status, waiting: 'Resolved' }
      : item));
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Approved') {
      return 'success';
    }
    if (status === 'Waiting') {
      return 'warning';
    }
    if (status === 'Rejected') {
      return 'danger';
    }
    return 'neutral';
  }
}
