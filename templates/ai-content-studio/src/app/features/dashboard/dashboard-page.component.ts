import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EdsAlertComponent,
  EdsBadgeComponent,
  EdsCardComponent,
  EdsMeterComponent,
  EdsProgressBarComponent,
  EdsSegmentedControlComponent,
  EdsStatComponent,
  EdsStatusComponent,
  type EdsSegmentOption
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    RouterLink,
    EdsAlertComponent,
    EdsBadgeComponent,
    EdsCardComponent,
    EdsMeterComponent,
    EdsProgressBarComponent,
    EdsSegmentedControlComponent,
    EdsStatComponent,
    EdsStatusComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <p class="eyebrow">{{ config.eyebrow }}</p>
        <h1>{{ config.title }}</h1>
        <p class="summary">{{ config.summary }} Three approvals are waiting for Alex Poluru.</p>
      </div>
      <div class="head-actions">
        <eds-segmented-control
          size="sm"
          [options]="periods"
          [value]="period()"
          (valueChange)="period.set($event)"
        ></eds-segmented-control>
      </div>
    </section>

    <eds-alert
      variant="info"
      title="Brand council is Thursday"
      message="Priya Subbu needs the Q3 launch hero copy in the approvals queue before 4pm."
    ></eds-alert>

    <section class="grid-4">
      @for (metric of config.metrics; track metric.label) {
        <a [routerLink]="metric.path">
          <eds-card class="card-pad" [elevated]="false">
            <eds-stat
              [label]="metric.label"
              [value]="metric.value"
              [trend]="metric.trendDir"
              [trendValue]="metric.trend"
              [hint]="metric.hint"
            ></eds-stat>
          </eds-card>
        </a>
      }
    </section>

    <eds-card class="card-pad" [elevated]="false">
      <div class="section-head">
        <h2>Must-have features</h2>
        <eds-badge label="Core stack" variant="brand" [pill]="true" [soft]="true"></eds-badge>
      </div>
      <div class="grid-2">
        @for (feature of config.mustHaveFeatures; track feature.title) {
          <eds-card class="card-pad" [elevated]="false">
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-detail">{{ feature.detail }}</p>
            <eds-status [label]="feature.status" variant="info"></eds-status>
          </eds-card>
        }
      </div>
    </eds-card>

    <section class="split">
      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <h2>Live activity</h2>
        </div>
        @for (entry of config.activity; track entry.title) {
          <a class="activity-row" [routerLink]="entry.path">
            <div>
              <strong>{{ entry.title }}</strong>
              <p class="meta">{{ entry.detail }} · {{ entry.time }}</p>
            </div>
            <eds-status [label]="entry.status" [variant]="statusVariant(entry.status)"></eds-status>
          </a>
        }
      </eds-card>

      <div class="stack">
        <eds-card class="card-pad" [elevated]="false">
          <h2>Channel mix</h2>
          @for (channel of config.channels; track channel.name) {
            <div class="meter-row">
              <span><b>{{ channel.name }}</b><span>{{ channel.share }}% · {{ channel.lift }}</span></span>
              <eds-progress-bar [value]="channel.share" [max]="100" [label]="channel.name"></eds-progress-bar>
            </div>
          }
        </eds-card>
        <eds-card class="card-pad" [elevated]="false">
          <h2>Editorial load</h2>
          @for (owner of config.owners; track owner.name) {
            <div class="owner-row">
              <span><b>{{ owner.name }}</b><span>{{ owner.load }}%</span></span>
              <eds-meter [value]="owner.load" [max]="100" [label]="owner.name"></eds-meter>
              <p class="meta">{{ owner.focus }}</p>
            </div>
          }
        </eds-card>
      </div>
    </section>
  `
})
export class DashboardPageComponent {
  protected readonly config = templateConfig;
  protected readonly period = signal('week');
  protected readonly periods: EdsSegmentOption[] = [
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Quarter', value: 'quarter' }
  ];

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Approved' || status === 'Published') {
      return 'success';
    }
    if (status === 'Review') {
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
