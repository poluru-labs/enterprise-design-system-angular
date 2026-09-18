import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  EdsAccordionComponent,
  EdsAlertComponent,
  EdsBadgeComponent,
  EdsBreadcrumbComponent,
  EdsButtonComponent,
  EdsButtonGroupComponent,
  EdsCardComponent,
  EdsCircularProgressComponent,
  EdsDataTableColumn,
  EdsDataTableComponent,
  EdsDescriptionListComponent,
  EdsDividerComponent,
  EdsListComponent,
  EdsMeterComponent,
  EdsProgressBarComponent,
  EdsRatingComponent,
  EdsSegmentedControlComponent,
  EdsStatComponent,
  EdsStatusComponent,
  EdsTabsComponent,
  EdsTagComponent,
  EdsTimelineComponent,
  type EdsAccordionItem,
  type EdsBreadcrumbItem,
  type EdsDescriptionListItem,
  type EdsListItem,
  type EdsSegmentOption,
  type EdsTabItem,
  type EdsTimelineItem
} from '@poluru-labs/enterprise-design-system-angular';
import { templateConfig } from '../../core/config/template.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    EdsAccordionComponent,
    EdsAlertComponent,
    EdsBadgeComponent,
    EdsBreadcrumbComponent,
    EdsButtonComponent,
    EdsButtonGroupComponent,
    EdsCardComponent,
    EdsCircularProgressComponent,
    EdsDataTableComponent,
    EdsDescriptionListComponent,
    EdsDividerComponent,
    EdsListComponent,
    EdsMeterComponent,
    EdsProgressBarComponent,
    EdsRatingComponent,
    EdsSegmentedControlComponent,
    EdsStatComponent,
    EdsStatusComponent,
    EdsTabsComponent,
    EdsTagComponent,
    EdsTimelineComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-head">
      <div>
        <eds-breadcrumb [items]="crumbs"></eds-breadcrumb>
        <p class="eyebrow">{{ config.eyebrow }}</p>
        <h1>{{ config.title }}</h1>
        <p class="summary">{{ config.summary }}</p>
      </div>
      <div class="head-actions">
        <eds-segmented-control
          size="sm"
          [options]="periods"
          [value]="period()"
          (valueChange)="period.set($event)"
        ></eds-segmented-control>
        <eds-button-group size="sm">
          <eds-button variant="secondary" icon="refresh">Refresh</eds-button>
          <eds-button variant="primary" icon="upload" (clicked)="openDeploy()">{{ config.action }}</eds-button>
        </eds-button-group>
      </div>
    </section>

    <eds-alert
      variant="warning"
      title="2 handoffs are waiting for Alex Poluru"
      message="Research agent needs approval before it can call web search. Contract reviewer is still paused on a degraded parser."
      [dismissible]="true"
    ></eds-alert>

    <section class="grid-4" style="margin-top: 1rem">
      @for (metric of config.metrics; track metric.label) {
        <a [routerLink]="metric.path">
          <eds-card class="card-pad" [elevated]="false">
            <eds-stat
              [label]="metric.label"
              [value]="metric.value"
              [trend]="metric.trendDir"
              [trendValue]="metric.trend"
              [hint]="metric.hint + ' · ' + period()"
            ></eds-stat>
          </eds-card>
        </a>
      }
    </section>

    <section class="split" style="margin-top: 0.9rem">
      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <div>
            <p class="eyebrow">Volume</p>
            <h2>Run throughput</h2>
          </div>
          <eds-badge label="Today" variant="brand" [soft]="true" [pill]="true"></eds-badge>
        </div>
        <div class="hours">
          @for (item of config.hourly; track item.hour) {
            <div class="hour">
              <div class="hour-bar"><i [style.height.%]="item.value"></i></div>
              <small>{{ item.hour }}</small>
            </div>
          }
        </div>
        <eds-divider spacing="md"></eds-divider>
        <div class="meter-row">
          <span><span>Successful runs</span><strong>98.4%</strong></span>
          <eds-progress-bar [value]="98.4" [max]="100" label="Successful runs" [showValue]="true"></eds-progress-bar>
        </div>
        <div class="meter-row">
          <span><span>Available capacity</span><strong>{{ config.coverage.capacity }}%</strong></span>
          <eds-meter [value]="config.coverage.capacity" [max]="100" label="Capacity" [showValue]="true"></eds-meter>
        </div>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <div>
            <p class="eyebrow">Oversight</p>
            <h2>Fleet health</h2>
          </div>
          <eds-circular-progress [value]="config.coverage.score" [max]="100" [size]="64" [showValue]="true"></eds-circular-progress>
        </div>
        <eds-tabs [tabs]="coachTabs" [selectedIndex]="coachTab()" (selectedIndexChange)="coachTab.set($event)"></eds-tabs>
        @if (coachTab() === 0) {
          <eds-accordion [items]="alertItems" [single]="true"></eds-accordion>
        } @else if (coachTab() === 1) {
          <eds-timeline [items]="motionItems"></eds-timeline>
        } @else {
          <eds-list [items]="inboxList" [divided]="true"></eds-list>
        }
      </eds-card>
    </section>

    <section class="split" style="margin-top: 0.9rem">
      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <div>
            <p class="eyebrow">Directory</p>
            <h2>Live agents</h2>
          </div>
          <eds-tag [label]="config.agents.length + ' agents'" variant="brand"></eds-tag>
        </div>
        <div class="table-wrap">
          <eds-data-table [columns]="agentColumns" [rows]="agentRows" [striped]="true" [compact]="true"></eds-data-table>
        </div>
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <div class="section-head">
          <div>
            <p class="eyebrow">Quality</p>
            <h2>Operator rating</h2>
          </div>
          <eds-status label="Healthy" variant="success" [pulse]="true"></eds-status>
        </div>
        <eds-rating [value]="5" [readonly]="true" size="lg"></eds-rating>
        <p class="meta">Scored on Alex Poluru’s production eval set.</p>
        <eds-divider spacing="md" label="Workspace"></eds-divider>
        <eds-description-list [items]="facts" [columns]="1" [compact]="true"></eds-description-list>
      </eds-card>
    </section>

    <section class="grid-3" style="margin-top: 0.9rem">
      <eds-card class="card-pad" [elevated]="false">
        <p class="eyebrow">Owners</p>
        <h2>Operator load</h2>
        @for (person of config.owners; track person.name) {
          <div class="owner-row">
            <span><span>{{ person.name }}</span><strong>{{ person.load }}%</strong></span>
            <eds-progress-bar [value]="person.load" [max]="100" [label]="person.focus"></eds-progress-bar>
          </div>
        }
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <p class="eyebrow">SLA</p>
        <h2>Fleet freshness</h2>
        @for (item of config.sla; track item.label) {
          <div class="meter-row">
            <span><span>{{ item.label }}</span><strong>{{ item.value }}</strong></span>
            <eds-meter [value]="item.value" [max]="100" [label]="item.label" [showValue]="true"></eds-meter>
          </div>
        }
      </eds-card>

      <eds-card class="card-pad" [elevated]="false">
        <p class="eyebrow">Live</p>
        <h2>{{ config.activityTitle }}</h2>
        @for (entry of config.activity; track entry.title) {
          <a class="query-hit" [routerLink]="entry.path">
            <div>
              <strong>{{ entry.title }}</strong>
              <p class="meta">{{ entry.detail }}</p>
            </div>
            <eds-status [label]="entry.status" [variant]="statusVariant(entry.status)"></eds-status>
          </a>
        }
      </eds-card>
    </section>
  `
})
export class DashboardComponent {
  protected readonly config = templateConfig;
  protected readonly period = signal('week');
  protected readonly coachTab = signal(0);

  protected readonly crumbs: EdsBreadcrumbItem[] = [
    { label: 'AgentOps Kit', href: '/' },
    { label: 'Operations' }
  ];

  protected readonly periods: EdsSegmentOption[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' }
  ];

  protected readonly coachTabs: EdsTabItem[] = [
    { label: 'Handoffs', content: 'Items waiting on a human.' },
    { label: 'Motion', content: 'Recent runs and deploys.' },
    { label: 'Inbox', content: 'Mentions for Alex Poluru.' }
  ];

  protected readonly alertItems: EdsAccordionItem[] = this.config.alertsFeed.map((item, index) => ({
    heading: item.heading,
    content: item.content,
    open: index === 0
  }));

  protected readonly motionItems: EdsTimelineItem[] = this.config.activity.map((entry, index) => ({
    title: entry.title,
    description: entry.detail,
    timestamp: entry.time,
    status: index === 0 ? 'current' : index < 3 ? 'complete' : 'upcoming'
  }));

  protected readonly inboxList: EdsListItem[] = this.config.activity.map((entry) => ({
    label: entry.title,
    description: entry.detail
  }));

  protected readonly agentColumns: EdsDataTableColumn[] = [
    { key: 'name', label: 'Agent', sortable: true },
    { key: 'owner', label: 'Owner', sortable: true },
    { key: 'runs', label: 'Runs', sortable: true },
    { key: 'success', label: 'Success', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  protected readonly agentRows = this.config.agents.slice(0, 6).map((agent) => ({
    name: agent.name,
    owner: agent.owner,
    runs: agent.runs,
    success: agent.success,
    status: agent.status
  }));

  protected readonly facts: EdsDescriptionListItem[] = [
    { term: 'Workspace', description: this.config.workspace },
    { term: 'Admin', description: this.config.user.name },
    { term: 'Tool reliability', description: this.config.coverage.reliability + '%' },
    { term: 'Primary model', description: 'Polaris 4.1' }
  ];

  protected openDeploy(): void {
    window.dispatchEvent(new CustomEvent('agentops:deploy'));
  }

  protected statusVariant(status: string): 'success' | 'warning' | 'danger' | 'info' | 'neutral' {
    if (status === 'Complete' || status === 'Live' || status === 'Healthy') {
      return 'success';
    }
    if (status === 'Review' || status === 'Running') {
      return 'warning';
    }
    if (status === 'Failed' || status === 'Paused') {
      return 'danger';
    }
    return 'info';
  }
}
