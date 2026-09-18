import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  EdsButtonComponent,
  EdsCardComponent,
  EdsMeterComponent,
  EdsProgressBarComponent,
  EdsSpinnerComponent,
  EdsStatusComponent,
  EdsStepperComponent,
  type EdsStepperStep
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-approvals-page',
  standalone: true,
  imports: [
    EdsButtonComponent,
    EdsCardComponent,
    EdsMeterComponent,
    EdsProgressBarComponent,
    EdsSpinnerComponent,
    EdsStatusComponent,
    EdsStepperComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">Review queue</p>
        <h1>Approvals</h1>
        <p class="summary">Approve, request changes, or block drafts before they reach the calendar. Alex Poluru is on brand council this week.</p>
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

    <eds-card class="card-pad" [elevated]="false">
      <h2>Open requests</h2>
      @for (item of queue(); track item.id) {
        <div class="job-row">
          <div class="job-head">
            <div>
              <strong>{{ item.id }} · {{ item.title }}</strong>
              <p class="meta">{{ item.reviewer }} · {{ item.project }} · {{ item.channel }} · {{ item.risk }} risk · due {{ item.due }}</p>
            </div>
            <eds-status [label]="item.status" [variant]="statusVariant(item.status)"></eds-status>
          </div>
          @if (item.status === 'Waiting' && item.risk === 'High') {
            <eds-progress-bar [value]="82" [max]="100" [label]="item.id" [showValue]="true"></eds-progress-bar>
          } @else if (item.status === 'Waiting') {
            <eds-meter [value]="54" [max]="100" [label]="item.id" [showValue]="true"></eds-meter>
          }
          @if (item.status === 'Waiting') {
            <div class="handoff-actions">
              <eds-button variant="primary" size="sm" (clicked)="resolve(item.id, 'Approved')">Approve</eds-button>
              <eds-button variant="secondary" size="sm" (clicked)="resolve(item.id, 'Changes')">Request changes</eds-button>
              <eds-button variant="tertiary" size="sm" (clicked)="resolve(item.id, 'Blocked')">Block</eds-button>
            </div>
          }
        </div>
      }
    </eds-card>
  `
})
export class ApprovalsPageComponent {
  private readonly items = signal(templateConfig.approvals.map((item) => ({ ...item })));
  protected readonly queue = computed(() => this.items());

  protected readonly steps: EdsStepperStep[] = [
    { label: 'Drafted', description: 'Writer submitted' },
    { label: 'Queued', description: 'Reviewer assigned' },
    { label: 'Decide', description: 'Approve or change' },
    { label: 'Schedule', description: 'Calendar slot' },
    { label: 'Audit', description: 'History stored' }
  ];

  protected resolve(id: string, status: 'Approved' | 'Changes' | 'Blocked'): void {
    this.items.update((items) => items.map((item) => item.id === id
      ? { ...item, status, waiting: 'Resolved' }
      : item));
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Approved') {
      return 'success';
    }
    if (status === 'Waiting' || status === 'Changes') {
      return 'warning';
    }
    if (status === 'Blocked') {
      return 'danger';
    }
    return 'neutral';
  }
}
