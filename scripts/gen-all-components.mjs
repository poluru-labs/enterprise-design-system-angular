#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/components');

function w(rel, content) {
  const path = join(ROOT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function pkg(folder, cls, title, componentTs, storyTpl, storyArgs = '', extraSpec = '') {
  const base = folder.split('/').pop();
  w(`${folder}/${base}.component.ts`, componentTs);
  w(`${folder}/${base}.component.spec.ts`, `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${cls} } from './${base}.component';

describe('${cls}', () => {
  let fixture: ComponentFixture<${cls}>;
  let component: ${cls};

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [${cls}] }).compileComponents();
    fixture = TestBed.createComponent(${cls});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });
${extraSpec}
});
`);
  w(`${folder}/${base}.stories.ts`, `import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ${cls} } from './${base}.component';

const meta: Meta<${cls}> = {
  title: 'Components/${title}',
  component: ${cls},
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [${cls}] })],
${storyArgs}  render: (args) => ({ props: args, template: \`${storyTpl}\` }),
};
export default meta;
type Story = StoryObj<${cls}>;
export const Default: Story = {};
`);
  w(`${folder}/index.ts`, `export * from './${base}.component';\n`);
}

// Kbd
pkg('kbd', 'EdsKbdComponent', 'Kbd',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-kbd',
  standalone: true,
  template: \`<kbd [class]="rootClass"><ng-content></ng-content>{{ keys }}</kbd>\`,
  styles: [\`
    :host { display: inline; }
    .eds-kbd {
      display: inline-block; padding: 0.1em 0.45em;
      font-family: var(--eds-font-mono); font-size: 0.85em;
      color: var(--eds-color-text); background: var(--eds-color-surface);
      border: 1px solid var(--eds-color-border-strong);
      border-radius: var(--eds-radius-sm);
      box-shadow: 0 1px 0 var(--eds-color-border);
      line-height: 1.4;
    }
  \`],
})
export class EdsKbdComponent {
  @Input() keys = '';
  @Input() className = '';
  get rootClass(): string { return cx('eds-kbd', this.className); }
}
`, `<eds-kbd [keys]="keys"></eds-kbd>`, `  args: { keys: '⌘ K' },\n`);

// VisuallyHidden
pkg('visually-hidden', 'EdsVisuallyHiddenComponent', 'VisuallyHidden',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-visually-hidden',
  standalone: true,
  template: \`<span [class]="rootClass"><ng-content></ng-content></span>\`,
  styles: [\`
    :host { display: contents; }
    .eds-visually-hidden {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }
  \`],
})
export class EdsVisuallyHiddenComponent {
  @Input() className = '';
  get rootClass(): string { return cx('eds-visually-hidden', this.className); }
}
`, `<eds-visually-hidden>Hidden text for screen readers</eds-visually-hidden>`);

// Link
pkg('link', 'EdsLinkComponent', 'Link',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsLinkVariant = 'default' | 'subtle' | 'danger';

@Component({
  selector: 'eds-link',
  standalone: true,
  template: \`
    <a [class]="linkClass" [href]="disabled ? null : href"
      [attr.target]="external && !disabled ? '_blank' : null"
      [attr.rel]="external && !disabled ? 'noopener noreferrer' : null"
      [attr.aria-disabled]="disabled ? 'true' : null"
      [attr.tabindex]="disabled ? -1 : null"
      (click)="onClick($event)">
      <ng-content></ng-content>
      @if (external && !disabled) {
        <svg class="eds-link__external" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3.5 8.5 8.5 3.5M8.5 3.5H5M8.5 3.5V7" stroke="currentColor" stroke-width="1.25" fill="none"/>
        </svg>
      }
    </a>
  \`,
  styles: [\`
    :host { display: inline; }
    .eds-link { display: inline-flex; align-items: center; gap: var(--eds-space-1); font-weight: var(--eds-font-weight-medium); text-decoration: underline; text-underline-offset: 2px; cursor: pointer; transition: color var(--eds-duration-fast) var(--eds-easing-standard); }
    .eds-link:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); border-radius: var(--eds-radius-sm); }
    .eds-link--default { color: var(--eds-color-primary); }
    .eds-link--subtle { color: var(--eds-color-text-muted); text-decoration: none; }
    .eds-link--danger { color: var(--eds-color-danger-600); }
    .eds-link--disabled { opacity: 0.5; pointer-events: none; cursor: not-allowed; }
    .eds-link__external { flex-shrink: 0; }
  \`],
})
export class EdsLinkComponent {
  @Input() href = '#';
  @Input() external = false;
  @Input() disabled = false;
  @Input() variant: EdsLinkVariant = 'default';
  @Input() className = '';
  @Output() clicked = new EventEmitter<MouseEvent>();

  get linkClass(): string {
    return cx('eds-link', \`eds-link--\${this.variant}\`, this.disabled && 'eds-link--disabled', this.className);
  }

  onClick(event: MouseEvent): void {
    if (this.disabled) { event.preventDefault(); return; }
    this.clicked.emit(event);
  }
}
`, `<eds-link [href]="href" [external]="external" [variant]="variant">Documentation</eds-link>`,
`  args: { href: 'https://example.com', external: true, variant: 'default' },\n`);

// Meter
pkg('meter', 'EdsMeterComponent', 'Meter',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-meter',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      @if (label || showValue) {
        <div class="eds-meter__header">
          @if (label) { <span class="eds-meter__label">{{ label }}</span> }
          @if (showValue) { <span class="eds-meter__value">{{ value }} of {{ max }}</span> }
        </div>
      }
      <meter class="eds-meter__bar" [min]="min" [max]="max" [low]="low" [high]="high"
        [optimum]="optimum" [value]="value"></meter>
    </div>
  \`,
  styles: [\`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-meter { display: flex; flex-direction: column; gap: var(--eds-space-2); }
    .eds-meter__header { display: flex; justify-content: space-between; font-size: var(--eds-font-size-sm); }
    .eds-meter__label { font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text); }
    .eds-meter__value { color: var(--eds-color-text-muted); }
    .eds-meter__bar { width: 100%; height: 0.5rem; border-radius: var(--eds-radius-full); }
  \`],
})
export class EdsMeterComponent {
  @Input() value = 0;
  @Input() min = 0;
  @Input() max = 100;
  @Input() low?: number;
  @Input() high?: number;
  @Input() optimum?: number;
  @Input() label = '';
  @Input() showValue = false;
  @Input() className = '';
  get rootClass(): string { return cx('eds-meter', this.className); }
}
`, `<eds-meter [value]="value" [label]="label" [showValue]="showValue"></eds-meter>`,
`  args: { value: 65, label: 'Storage used', showValue: true },\n`);

// ProgressBar
pkg('progress-bar', 'EdsProgressBarComponent', 'ProgressBar',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-progress-bar',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      @if (label || showValue) {
        <div class="eds-progress-bar__header">
          @if (label) { <span>{{ label }}</span> }
          @if (showValue && !indeterminate) { <span>{{ percent }}%</span> }
        </div>
      }
      <div class="eds-progress-bar__track" role="progressbar"
        [attr.aria-valuenow]="indeterminate ? null : value"
        [attr.aria-valuemin]="0" [attr.aria-valuemax]="max"
        [attr.aria-label]="label || 'Progress'">
        <div [class]="fillClass" [style.width.%]="indeterminate ? 100 : percent"></div>
      </div>
    </div>
  \`,
  styles: [\`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-progress-bar { display: flex; flex-direction: column; gap: var(--eds-space-2); }
    .eds-progress-bar__header { display: flex; justify-content: space-between; font-size: var(--eds-font-size-sm); color: var(--eds-color-text-muted); }
    .eds-progress-bar__track { height: 0.5rem; background: var(--eds-color-ink-100); border-radius: var(--eds-radius-full); overflow: hidden; }
    .eds-progress-bar__fill { height: 100%; background: var(--eds-color-primary); border-radius: inherit; transition: width var(--eds-duration-normal) var(--eds-easing-standard); }
    .eds-progress-bar__fill--indeterminate { width: 40% !important; animation: eds-progress-indeterminate 1.2s ease-in-out infinite; }
    @keyframes eds-progress-indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }
  \`],
})
export class EdsProgressBarComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() indeterminate = false;
  @Input() label = '';
  @Input() showValue = false;
  @Input() className = '';

  get percent(): number { return Math.min(100, Math.round((this.value / this.max) * 100)); }
  get rootClass(): string { return cx('eds-progress-bar', this.className); }
  get fillClass(): string { return cx('eds-progress-bar__fill', this.indeterminate && 'eds-progress-bar__fill--indeterminate'); }
}
`, `<eds-progress-bar [value]="value" [label]="label" [showValue]="showValue"></eds-progress-bar>`,
`  args: { value: 72, label: 'Uploading', showValue: true },\n`);

// CircularProgress
pkg('circular-progress', 'EdsCircularProgressComponent', 'CircularProgress',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-circular-progress',
  standalone: true,
  template: \`
    <div [class]="rootClass" role="progressbar"
      [attr.aria-valuenow]="indeterminate ? null : value"
      [attr.aria-valuemin]="0" [attr.aria-valuemax]="max">
      <svg [class]="svgClass" [attr.width]="size" [attr.height]="size" viewBox="0 0 36 36">
        <circle class="eds-circular-progress__track" cx="18" cy="18" [attr.r]="radius" fill="none" [attr.stroke-width]="strokeWidth"/>
        @if (!indeterminate) {
          <circle class="eds-circular-progress__fill" cx="18" cy="18" [attr.r]="radius" fill="none"
            [attr.stroke-width]="strokeWidth" [attr.stroke-dasharray]="circumference"
            [attr.stroke-dashoffset]="dashOffset"/>
        }
      </svg>
      @if (showValue && !indeterminate) {
        <span class="eds-circular-progress__value">{{ percent }}%</span>
      }
    </div>
  \`,
  styles: [\`
    :host { display: inline-block; }
    .eds-circular-progress { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .eds-circular-progress__svg--indeterminate { animation: eds-circular-spin 1s linear infinite; }
    .eds-circular-progress__track { stroke: var(--eds-color-ink-200); }
    .eds-circular-progress__fill { stroke: var(--eds-color-primary); stroke-linecap: round; transform: rotate(-90deg); transform-origin: center; transition: stroke-dashoffset var(--eds-duration-normal) var(--eds-easing-standard); }
    .eds-circular-progress__value { position: absolute; font-size: var(--eds-font-size-xs); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text); }
    @keyframes eds-circular-spin { to { transform: rotate(360deg); } }
  \`],
})
export class EdsCircularProgressComponent {
  @Input() value = 0;
  @Input() max = 100;
  @Input() size = 48;
  @Input() strokeWidth = 3;
  @Input() showValue = false;
  @Input() indeterminate = false;
  @Input() className = '';

  get radius(): number { return 18 - this.strokeWidth / 2; }
  get circumference(): number { return 2 * Math.PI * this.radius; }
  get percent(): number { return Math.min(100, Math.round((this.value / this.max) * 100)); }
  get dashOffset(): number { return this.circumference * (1 - this.percent / 100); }
  get rootClass(): string { return cx('eds-circular-progress', this.className); }
  get svgClass(): string { return cx('eds-circular-progress__svg', this.indeterminate && 'eds-circular-progress__svg--indeterminate'); }
}
`, `<eds-circular-progress [value]="value" [showValue]="showValue"></eds-circular-progress>`,
`  args: { value: 75, showValue: true },\n`);

// Skeleton
pkg('skeleton', 'EdsSkeletonComponent', 'Skeleton',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsSkeletonVariant = 'text' | 'circular' | 'rectangular';

@Component({
  selector: 'eds-skeleton',
  standalone: true,
  template: \`
    @if (lines > 1 && variant === 'text') {
      <div [class]="rootClass" aria-hidden="true">
        @for (line of lineArray; track $index) {
          <span [class]="lineClass($index)" [style.width]="lineWidth($index)"></span>
        }
      </div>
    } @else {
      <span [class]="singleClass" [style.width]="width" [style.height]="height" aria-hidden="true"></span>
    }
  \`,
  styles: [\`
    :host { display: block; }
    .eds-skeleton { display: flex; flex-direction: column; gap: var(--eds-space-2); }
    .eds-skeleton__item {
      display: block; background: linear-gradient(90deg, var(--eds-color-ink-100) 25%, var(--eds-color-ink-50) 50%, var(--eds-color-ink-100) 75%);
      background-size: 200% 100%; animation: eds-skeleton-shimmer 1.5s ease-in-out infinite; border-radius: var(--eds-radius-sm);
    }
    .eds-skeleton__item--text { height: 1em; width: 100%; }
    .eds-skeleton__item--circular { border-radius: 50%; width: 2.5rem; height: 2.5rem; }
    .eds-skeleton__item--rectangular { height: 4rem; width: 100%; border-radius: var(--eds-radius-md); }
    .eds-skeleton__item--last { width: 70%; }
    @keyframes eds-skeleton-shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
  \`],
})
export class EdsSkeletonComponent {
  @Input() variant: EdsSkeletonVariant = 'text';
  @Input() width = '100%';
  @Input() height = '1em';
  @Input() lines = 1;
  @Input() className = '';

  get lineArray(): number[] { return Array.from({ length: this.lines }, (_, i) => i); }
  get rootClass(): string { return cx('eds-skeleton', this.className); }
  get singleClass(): string { return cx('eds-skeleton__item', \`eds-skeleton__item--\${this.variant}\`, this.className); }

  lineClass(index: number): string {
    return cx('eds-skeleton__item', 'eds-skeleton__item--text', index === this.lines - 1 && 'eds-skeleton__item--last');
  }

  lineWidth(index: number): string {
    return index === this.lines - 1 ? '70%' : '100%';
  }
}
`, `<eds-skeleton [variant]="variant" [lines]="lines"></eds-skeleton>`,
`  args: { variant: 'text', lines: 3 },\n`);

// Status
pkg('status', 'EdsStatusComponent', 'Status',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsStatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

@Component({
  selector: 'eds-status',
  standalone: true,
  template: \`
    <span [class]="rootClass" role="status">
      <span [class]="dotClass" aria-hidden="true"></span>
      <span class="eds-status__label">{{ label }}</span>
    </span>
  \`,
  styles: [\`
    :host { display: inline-block; }
    .eds-status { display: inline-flex; align-items: center; gap: var(--eds-space-2); font-size: var(--eds-font-size-sm); color: var(--eds-color-text); }
    .eds-status__dot { width: 0.5rem; height: 0.5rem; border-radius: 50%; flex-shrink: 0; }
    .eds-status--success .eds-status__dot { background: var(--eds-color-success-600); }
    .eds-status--warning .eds-status__dot { background: var(--eds-color-warning-600); }
    .eds-status--danger .eds-status__dot { background: var(--eds-color-danger-600); }
    .eds-status--info .eds-status__dot { background: var(--eds-color-info-600); }
    .eds-status--neutral .eds-status__dot { background: var(--eds-color-ink-400); }
    .eds-status__dot--pulse { animation: eds-status-pulse 1.5s ease-in-out infinite; }
    @keyframes eds-status-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  \`],
})
export class EdsStatusComponent {
  @Input() label = 'Status';
  @Input() variant: EdsStatusVariant = 'neutral';
  @Input() pulse = false;
  @Input() className = '';
  get rootClass(): string { return cx('eds-status', \`eds-status--\${this.variant}\`, this.className); }
  get dotClass(): string { return cx('eds-status__dot', this.pulse && 'eds-status__dot--pulse'); }
}
`, `<eds-status [label]="label" [variant]="variant" [pulse]="pulse"></eds-status>`,
`  args: { label: 'Active', variant: 'success', pulse: false },\n`);

// Stat
pkg('stat', 'EdsStatComponent', 'Stat',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsStatTrend = 'up' | 'down' | 'flat';

@Component({
  selector: 'eds-stat',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      @if (label) { <div class="eds-stat__label">{{ label }}</div> }
      <div class="eds-stat__value-row">
        <span class="eds-stat__value">{{ value }}</span>
        @if (trend) {
          <span [class]="trendClass">
            @if (trend === 'up') { ↑ }
            @else if (trend === 'down') { ↓ }
            @else { → }
            {{ trendValue }}
          </span>
        }
      </div>
      @if (hint) { <div class="eds-stat__hint">{{ hint }}</div> }
    </div>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-stat { padding: var(--eds-space-4); border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-lg); background: var(--eds-color-surface); }
    .eds-stat__label { font-size: var(--eds-font-size-sm); color: var(--eds-color-text-muted); margin-bottom: var(--eds-space-1); }
    .eds-stat__value-row { display: flex; align-items: baseline; gap: var(--eds-space-2); }
    .eds-stat__value { font-size: var(--eds-font-size-2xl); font-weight: var(--eds-font-weight-bold); color: var(--eds-color-text); }
    .eds-stat__trend { font-size: var(--eds-font-size-sm); font-weight: var(--eds-font-weight-semibold); }
    .eds-stat__trend--up { color: var(--eds-color-success-600); }
    .eds-stat__trend--down { color: var(--eds-color-danger-600); }
    .eds-stat__trend--flat { color: var(--eds-color-text-muted); }
    .eds-stat__hint { margin-top: var(--eds-space-1); font-size: var(--eds-font-size-xs); color: var(--eds-color-text-subtle); }
  \`],
})
export class EdsStatComponent {
  @Input() value = '';
  @Input() label = '';
  @Input() hint = '';
  @Input() trend?: EdsStatTrend;
  @Input() trendValue = '';
  @Input() className = '';
  get rootClass(): string { return cx('eds-stat', this.className); }
  get trendClass(): string { return cx('eds-stat__trend', this.trend && \`eds-stat__trend--\${this.trend}\`); }
}
`, `<eds-stat [value]="value" [label]="label" [trend]="trend" [trendValue]="trendValue" [hint]="hint"></eds-stat>`,
`  args: { value: '2,847', label: 'Total users', trend: 'up', trendValue: '12%', hint: 'vs last month' },\n`);

// DescriptionList
pkg('description-list', 'EdsDescriptionListComponent', 'DescriptionList',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsDescriptionListItem {
  term: string;
  description: string;
}

@Component({
  selector: 'eds-description-list',
  standalone: true,
  template: \`
    <dl [class]="rootClass" [style.--eds-dl-columns]="columns">
      @if (items.length) {
        @for (item of items; track item.term) {
          <dt class="eds-dl__term" [class.eds-dl__term--compact]="compact">{{ item.term }}</dt>
          <dd class="eds-dl__desc" [class.eds-dl__desc--compact]="compact">{{ item.description }}</dd>
        }
      } @else {
        <div class="eds-dl__slotted"><ng-content></ng-content></div>
      }
    </dl>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-dl { display: grid; grid-template-columns: repeat(var(--eds-dl-columns, 1), 1fr); gap: var(--eds-space-3) var(--eds-space-4); margin: 0; }
    .eds-dl__term { margin: 0; font-size: var(--eds-font-size-sm); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text-muted); }
    .eds-dl__desc { margin: 0; font-size: var(--eds-font-size-sm); color: var(--eds-color-text); }
    .eds-dl__term--compact, .eds-dl__desc--compact { font-size: var(--eds-font-size-xs); }
    .eds-dl__slotted { display: contents; }
  \`],
})
export class EdsDescriptionListComponent {
  @Input() items: EdsDescriptionListItem[] = [];
  @Input() columns: 1 | 2 | 3 = 1;
  @Input() compact = false;
  @Input() className = '';
  get rootClass(): string { return cx('eds-dl', this.className); }
}
`, `<eds-description-list [items]="items" [columns]="columns"></eds-description-list>`,
`  args: { items: [{ term: 'Name', description: 'Jane Doe' }, { term: 'Email', description: 'jane@example.com' }], columns: 1 },\n`);

// Breadcrumb
pkg('breadcrumb', 'EdsBreadcrumbComponent', 'Breadcrumb',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'eds-breadcrumb',
  standalone: true,
  template: \`
    <nav [class]="rootClass" aria-label="Breadcrumb">
      <ol class="eds-breadcrumb__list">
        @for (item of resolvedItems; track item.label; let last = $last) {
          <li class="eds-breadcrumb__item">
            @if (!last && item.href) {
              <a class="eds-breadcrumb__link" [href]="item.href">{{ item.label }}</a>
            } @else {
              <span [class]="last ? 'eds-breadcrumb__current' : 'eds-breadcrumb__link'" [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span>
            }
            @if (!last) { <span class="eds-breadcrumb__sep" aria-hidden="true">/</span> }
          </li>
        }
      </ol>
    </nav>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-breadcrumb__list { display: flex; flex-wrap: wrap; align-items: center; gap: var(--eds-space-1); margin: 0; padding: 0; list-style: none; font-size: var(--eds-font-size-sm); }
    .eds-breadcrumb__item { display: inline-flex; align-items: center; gap: var(--eds-space-1); }
    .eds-breadcrumb__link { color: var(--eds-color-text-muted); text-decoration: none; }
    .eds-breadcrumb__link:hover { color: var(--eds-color-primary); }
    .eds-breadcrumb__current { color: var(--eds-color-text); font-weight: var(--eds-font-weight-semibold); }
    .eds-breadcrumb__sep { color: var(--eds-color-text-subtle); }
  \`],
})
export class EdsBreadcrumbComponent {
  @Input() items: EdsBreadcrumbItem[] = [];
  @Input() className = '';
  get rootClass(): string { return cx('eds-breadcrumb', this.className); }
  get resolvedItems(): EdsBreadcrumbItem[] { return this.items; }
}
`, `<eds-breadcrumb [items]="items"></eds-breadcrumb>`,
`  args: { items: [{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Details' }] },\n`);

// Pagination
pkg('pagination', 'EdsPaginationComponent', 'Pagination',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { buildPaginationItems, PaginationItem } from '../_shared/pagination-utils';

@Component({
  selector: 'eds-pagination',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      <nav class="eds-pagination__nav" aria-label="Pagination">
        <button type="button" class="eds-pagination__btn" aria-label="Previous page"
          [disabled]="page <= 1 || totalPages === 0" (click)="changePage(page - 1)">Prev</button>
        @if (totalPages > 0) {
          @for (item of paginationItems; track trackItem(item, $index)) {
            @if (item === 'ellipsis') {
              <span class="eds-pagination__ellipsis" aria-hidden="true">…</span>
            } @else {
              <button type="button" [class]="btnClass(item)" [attr.aria-label]="'Page ' + item"
                [attr.aria-current]="page === item ? 'page' : null" (click)="changePage(item)">{{ item }}</button>
            }
          }
        }
        <button type="button" class="eds-pagination__btn" aria-label="Next page"
          [disabled]="page >= totalPages || totalPages === 0" (click)="changePage(page + 1)">Next</button>
      </nav>
    </div>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-pagination__nav { display: flex; align-items: center; gap: var(--eds-space-1); }
    .eds-pagination__btn {
      min-width: 2.25rem; height: 2.25rem; padding: 0 var(--eds-space-2); border: 1px solid var(--eds-color-border);
      border-radius: var(--eds-radius-md); background: var(--eds-color-surface); color: var(--eds-color-text);
      font-size: var(--eds-font-size-sm); cursor: pointer;
    }
    .eds-pagination__btn:hover:not(:disabled) { background: var(--eds-color-brand-50); border-color: var(--eds-color-primary); }
    .eds-pagination__btn:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-pagination__btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-pagination__btn--active { background: var(--eds-color-primary); color: var(--eds-color-text-inverse); border-color: var(--eds-color-primary); }
    .eds-pagination__ellipsis { padding: 0 var(--eds-space-1); color: var(--eds-color-text-subtle); }
  \`],
})
export class EdsPaginationComponent {
  @Input() page = 1;
  @Input() pageSize = 10;
  @Input() total = 0;
  @Input() siblingCount = 1;
  @Input() className = '';
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number { return Math.max(Math.ceil(this.total / this.pageSize), 0); }
  get paginationItems(): PaginationItem[] { return buildPaginationItems(this.page, this.totalPages, this.siblingCount); }
  get rootClass(): string { return cx('eds-pagination', this.className); }

  btnClass(item: number): string {
    return cx('eds-pagination__btn', this.page === item && 'eds-pagination__btn--active');
  }

  trackItem(item: PaginationItem, index: number): string {
    return item === 'ellipsis' ? \`e-\${index}\` : String(item);
  }

  changePage(next: number): void {
    const clamped = Math.min(Math.max(next, 1), Math.max(this.totalPages, 1));
    if (clamped !== this.page) this.pageChange.emit(clamped);
  }
}
`, `<eds-pagination [page]="page" [total]="total" [pageSize]="pageSize" (pageChange)="page = $event"></eds-pagination>`,
`  args: { page: 3, total: 120, pageSize: 10 },\n`,
`
  it('should compute total pages', () => {
    component.total = 100;
    component.pageSize = 10;
    expect(component.totalPages).toBe(10);
  });
`);

// Tabs
pkg('tabs', 'EdsTabsComponent', 'Tabs',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsTabItem {
  label: string;
  disabled?: boolean;
  content?: string;
}

@Component({
  selector: 'eds-tabs',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      <div class="eds-tabs__list" role="tablist" (keydown)="onKeyDown($event)">
        @for (tab of tabs; track tab.label; let i = $index) {
          <button type="button" [class]="tabClass(i)" role="tab"
            [id]="'eds-tab-' + i" [attr.aria-selected]="selectedIndex === i"
            [attr.aria-controls]="'eds-panel-' + i" [tabIndex]="selectedIndex === i ? 0 : -1"
            [disabled]="tab.disabled" (click)="selectTab(i)">{{ tab.label }}</button>
        }
      </div>
      @for (tab of tabs; track tab.label; let i = $index) {
        <div [class]="panelClass(i)" role="tabpanel" [id]="'eds-panel-' + i" [attr.aria-labelledby]="'eds-tab-' + i"
          [hidden]="selectedIndex !== i">
          @if (tab.content) { {{ tab.content }} }
          @else { <ng-content [select]="'[edsTabPanel=' + i + ']'"></ng-content> }
        </div>
      }
    </div>
  \`,
  styles: [\`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-tabs__list { display: flex; gap: var(--eds-space-1); border-bottom: 1px solid var(--eds-color-border); }
    .eds-tabs__tab {
      padding: var(--eds-space-2) var(--eds-space-4); border: 0; border-bottom: 2px solid transparent;
      background: transparent; color: var(--eds-color-text-muted); font: inherit; font-size: var(--eds-font-size-sm);
      font-weight: var(--eds-font-weight-medium); cursor: pointer; margin-bottom: -1px;
    }
    .eds-tabs__tab:hover:not(:disabled) { color: var(--eds-color-text); background: var(--eds-color-brand-50); }
    .eds-tabs__tab:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-tabs__tab--selected { color: var(--eds-color-primary); border-bottom-color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-tabs__tab:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-tabs__panel { padding: var(--eds-space-4) 0; display: none; }
    .eds-tabs__panel--active { display: block; }
  \`],
})
export class EdsTabsComponent {
  @Input() tabs: EdsTabItem[] = [
    { label: 'Overview', content: 'Overview content' },
    { label: 'Details', content: 'Details content' },
  ];
  @Input() selectedIndex = 0;
  @Input() className = '';
  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() tabChange = new EventEmitter<{ index: number; label?: string }>();

  get rootClass(): string { return cx('eds-tabs', this.className); }

  tabClass(index: number): string {
    return cx('eds-tabs__tab', this.selectedIndex === index && 'eds-tabs__tab--selected');
  }

  panelClass(index: number): string {
    return cx('eds-tabs__panel', this.selectedIndex === index && 'eds-tabs__panel--active');
  }

  get enabledIndexes(): number[] {
    return this.tabs.map((t, i) => ({ t, i })).filter(({ t }) => !t.disabled).map(({ i }) => i);
  }

  selectTab(index: number): void {
    const fallback = this.enabledIndexes[0] ?? 0;
    const next = this.tabs[index]?.disabled ? fallback : index;
    this.selectedIndex = next;
    this.selectedIndexChange.emit(next);
    this.tabChange.emit({ index: next, label: this.tabs[next]?.label });
  }

  onKeyDown(event: KeyboardEvent): void {
    const enabled = this.enabledIndexes;
    if (!enabled.length) return;
    const pos = enabled.indexOf(this.selectedIndex);
    let nextPos = pos;
    switch (event.key) {
      case 'ArrowRight': nextPos = (pos + 1) % enabled.length; break;
      case 'ArrowLeft': nextPos = (pos - 1 + enabled.length) % enabled.length; break;
      case 'Home': nextPos = 0; break;
      case 'End': nextPos = enabled.length - 1; break;
      default: return;
    }
    event.preventDefault();
    this.selectTab(enabled[nextPos]);
  }
}
`, `<eds-tabs [tabs]="tabs" [(selectedIndex)]="selectedIndex"></eds-tabs>`,
`  args: { tabs: [{ label: 'Overview', content: 'Overview panel' }, { label: 'Settings', content: 'Settings panel' }], selectedIndex: 0 },\n`);

// Accordion
pkg('accordion', 'EdsAccordionComponent', 'Accordion',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsAccordionItem {
  heading: string;
  content: string;
  open?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'eds-accordion',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      @for (item of items; track item.heading; let i = $index) {
        <div class="eds-accordion__item">
          <button type="button" class="eds-accordion__trigger" [attr.aria-expanded]="isOpen(i)"
            [disabled]="item.disabled" (click)="toggle(i)">
            <span class="eds-accordion__title">{{ item.heading }}</span>
            <span [class]="iconClass(i)" aria-hidden="true">▼</span>
          </button>
          <div [class]="panelClass(i)" [attr.aria-hidden]="!isOpen(i)">
            <div class="eds-accordion__inner">{{ item.content }}</div>
          </div>
        </div>
      }
    </div>
  \`,
  styles: [\`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-accordion { border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-lg); overflow: hidden; }
    .eds-accordion__item + .eds-accordion__item { border-top: 1px solid var(--eds-color-border); }
    .eds-accordion__trigger {
      display: flex; align-items: center; justify-content: space-between; width: 100%; padding: var(--eds-space-3) var(--eds-space-4);
      border: 0; background: var(--eds-color-surface); color: var(--eds-color-text); font: inherit; font-weight: var(--eds-font-weight-semibold);
      cursor: pointer; text-align: left;
    }
    .eds-accordion__trigger:hover:not(:disabled) { background: var(--eds-color-brand-50); }
    .eds-accordion__trigger:focus-visible { outline: none; box-shadow: inset var(--eds-shadow-focus); }
    .eds-accordion__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-accordion__icon { font-size: 0.65rem; transition: transform var(--eds-duration-fast) var(--eds-easing-standard); }
    .eds-accordion__icon--open { transform: rotate(180deg); }
    .eds-accordion__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--eds-duration-normal) var(--eds-easing-standard); }
    .eds-accordion__panel--open { grid-template-rows: 1fr; }
    .eds-accordion__inner { overflow: hidden; padding: 0 var(--eds-space-4); color: var(--eds-color-text-muted); font-size: var(--eds-font-size-sm); }
    .eds-accordion__panel--open .eds-accordion__inner { padding-bottom: var(--eds-space-4); }
  \`],
})
export class EdsAccordionComponent {
  @Input() items: EdsAccordionItem[] = [
    { heading: 'Section 1', content: 'Content for section 1.' },
    { heading: 'Section 2', content: 'Content for section 2.' },
  ];
  @Input() single = false;
  @Input() className = '';
  @Output() openChange = new EventEmitter<string[]>();

  openSet = new Set<number>();

  ngOnInit(): void {
    this.items.forEach((item, i) => { if (item.open) this.openSet.add(i); });
  }

  get rootClass(): string { return cx('eds-accordion', this.className); }
  isOpen(index: number): boolean { return this.openSet.has(index); }
  iconClass(index: number): string { return cx('eds-accordion__icon', this.isOpen(index) && 'eds-accordion__icon--open'); }
  panelClass(index: number): string { return cx('eds-accordion__panel', this.isOpen(index) && 'eds-accordion__panel--open'); }

  toggle(index: number): void {
    if (this.items[index]?.disabled) return;
    if (this.single) this.openSet.clear();
    if (this.openSet.has(index)) this.openSet.delete(index);
    else this.openSet.add(index);
    this.openChange.emit(this.items.filter((_, i) => this.openSet.has(i)).map((item) => item.heading));
  }
}
`, `<eds-accordion [items]="items" [single]="single"></eds-accordion>`,
`  args: { items: [{ heading: 'General', content: 'General settings content.' }, { heading: 'Security', content: 'Security settings content.' }], single: true },\n`);

// SegmentedControl
pkg('segmented-control', 'EdsSegmentedControlComponent', 'SegmentedControl',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsSegmentOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'eds-segmented-control',
  standalone: true,
  template: \`
    <div [class]="rootClass" role="group">
      @for (opt of options; track opt.value) {
        <button type="button" [class]="segmentClass(opt)" [attr.aria-pressed]="value === opt.value"
          [disabled]="opt.disabled" (click)="select(opt)">
          <span class="eds-segment__inner">{{ opt.label }}</span>
        </button>
      }
    </div>
  \`,
  styles: [\`
    :host { display: inline-block; }
    .eds-segmented { display: inline-flex; padding: var(--eds-space-1); background: var(--eds-color-ink-100); border-radius: var(--eds-radius-md); gap: var(--eds-space-1); }
    .eds-segmented--full { width: 100%; }
    .eds-segmented--full .eds-segment { flex: 1; }
    .eds-segment { border: 0; border-radius: var(--eds-radius-sm); background: transparent; color: var(--eds-color-text-muted); font: inherit; cursor: pointer; padding: var(--eds-space-1) var(--eds-space-3); }
    .eds-segmented--sm .eds-segment { font-size: var(--eds-font-size-xs); padding: var(--eds-space-1) var(--eds-space-2); }
    .eds-segment--selected { background: var(--eds-color-surface); color: var(--eds-color-text); box-shadow: var(--eds-shadow-xs); font-weight: var(--eds-font-weight-semibold); }
    .eds-segment:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-segment:disabled { opacity: 0.45; cursor: not-allowed; }
  \`],
})
export class EdsSegmentedControlComponent {
  @Input() options: EdsSegmentOption[] = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];
  @Input() value = 'day';
  @Input() size: 'sm' | 'md' = 'md';
  @Input() fullWidth = false;
  @Input() className = '';
  @Output() valueChange = new EventEmitter<string>();

  get rootClass(): string {
    return cx('eds-segmented', this.size === 'sm' && 'eds-segmented--sm', this.fullWidth && 'eds-segmented--full', this.className);
  }

  segmentClass(opt: EdsSegmentOption): string {
    return cx('eds-segment', this.value === opt.value && 'eds-segment--selected');
  }

  select(opt: EdsSegmentOption): void {
    if (opt.disabled || opt.value === this.value) return;
    this.value = opt.value;
    this.valueChange.emit(opt.value);
  }
}
`, `<eds-segmented-control [options]="options" [(value)]="value"></eds-segmented-control>`,
`  args: { options: [{ label: 'List', value: 'list' }, { label: 'Grid', value: 'grid' }], value: 'list' },\n`);

// Rating
pkg('rating', 'EdsRatingComponent', 'Rating',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-rating',
  standalone: true,
  template: \`
    <div [class]="rootClass" role="slider" [attr.aria-valuenow]="value" [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="max" [attr.aria-label]="'Rating'">
      @for (star of stars; track star) {
        <button type="button" [class]="starClass(star)" [disabled]="readonly || disabled"
          [attr.aria-label]="'Rate ' + star" (click)="rate(star)">
          ★
          @if (allowHalf && isHalf(star)) { <span class="eds-rating__half" aria-hidden="true">★</span> }
        </button>
      }
    </div>
  \`,
  styles: [\`
    :host { display: inline-block; }
    .eds-rating { display: inline-flex; gap: var(--eds-space-1); }
    .eds-rating__star { position: relative; border: 0; background: transparent; color: var(--eds-color-ink-300); font-size: 1.25rem; cursor: pointer; padding: 0; line-height: 1; }
    .eds-rating--md .eds-rating__star { font-size: 1.5rem; }
    .eds-rating--lg .eds-rating__star { font-size: 2rem; }
    .eds-rating__star--filled { color: var(--eds-color-warning-500, #f59e0b); }
    .eds-rating__star--readonly, .eds-rating__star:disabled { cursor: default; }
    .eds-rating__half { position: absolute; left: 0; top: 0; width: 50%; overflow: hidden; color: var(--eds-color-warning-500, #f59e0b); }
    .eds-rating__star:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); border-radius: var(--eds-radius-sm); }
  \`],
})
export class EdsRatingComponent {
  @Input() value = 0;
  @Input() max = 5;
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() allowHalf = false;
  @Input() className = '';
  @Output() valueChange = new EventEmitter<number>();

  get stars(): number[] { return Array.from({ length: this.max }, (_, i) => i + 1); }
  get rootClass(): string { return cx('eds-rating', \`eds-rating--\${this.size}\`, this.className); }

  isFilled(star: number): boolean { return this.value >= star; }
  isHalf(star: number): boolean { return this.allowHalf && this.value >= star - 0.5 && this.value < star; }

  starClass(star: number): string {
    return cx('eds-rating__star', (this.isFilled(star) || this.isHalf(star)) && 'eds-rating__star--filled', (this.readonly || this.disabled) && 'eds-rating__star--readonly');
  }

  rate(star: number): void {
    if (this.readonly || this.disabled) return;
    const next = this.value === star ? 0 : star;
    this.value = next;
    this.valueChange.emit(next);
  }
}
`, `<eds-rating [(value)]="value" [max]="max"></eds-rating>`,
`  args: { value: 3, max: 5 },\n`);

// Toolbar
pkg('toolbar', 'EdsToolbarComponent', 'Toolbar',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-toolbar',
  standalone: true,
  template: \`
    <div [class]="rootClass" role="toolbar">
      <div class="eds-toolbar__start"><ng-content select="[edsToolbarStart]"></ng-content>{{ start }}</div>
      <div class="eds-toolbar__center"><ng-content select="[edsToolbarCenter]"></ng-content>{{ center }}<ng-content></ng-content></div>
      <div class="eds-toolbar__end"><ng-content select="[edsToolbarEnd]"></ng-content>{{ end }}</div>
    </div>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-toolbar { display: flex; align-items: center; gap: var(--eds-space-3); padding: var(--eds-space-2) var(--eds-space-4); background: var(--eds-color-surface); }
    .eds-toolbar--bordered { border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-md); }
    .eds-toolbar--sticky { position: sticky; top: 0; z-index: 10; }
    .eds-toolbar__start, .eds-toolbar__center, .eds-toolbar__end { display: flex; align-items: center; gap: var(--eds-space-2); }
    .eds-toolbar__start { flex: 1; justify-content: flex-start; }
    .eds-toolbar__center { flex: 1; justify-content: center; }
    .eds-toolbar__end { flex: 1; justify-content: flex-end; }
  \`],
})
export class EdsToolbarComponent {
  @Input() bordered = false;
  @Input() sticky = false;
  @Input() start = '';
  @Input() center = '';
  @Input() end = '';
  @Input() className = '';
  get rootClass(): string { return cx('eds-toolbar', this.bordered && 'eds-toolbar--bordered', this.sticky && 'eds-toolbar--sticky', this.className); }
}
`, `<eds-toolbar [bordered]="bordered" start="Filter" center="Results" end="Export"></eds-toolbar>`,
`  args: { bordered: true },\n`);

// Timeline
pkg('timeline', 'EdsTimelineComponent', 'Timeline',
`import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsTimelineStatus = 'complete' | 'current' | 'upcoming';

export interface EdsTimelineItem {
  title: string;
  description?: string;
  timestamp?: string;
  status?: EdsTimelineStatus;
}

@Component({
  selector: 'eds-timeline',
  standalone: true,
  template: \`
    <ol [class]="rootClass">
      @for (item of resolvedItems; track item.title; let last = $last) {
        <li [class]="itemClass(item, last)">
          <div class="eds-timeline__track">
            <span class="eds-timeline__dot" aria-hidden="true"></span>
            @if (!last) { <span class="eds-timeline__connector" aria-hidden="true"></span> }
          </div>
          <div class="eds-timeline__content">
            <div class="eds-timeline__title">{{ item.title }}</div>
            @if (item.description) { <div class="eds-timeline__desc">{{ item.description }}</div> }
            @if (item.timestamp) { <div class="eds-timeline__time">{{ item.timestamp }}</div> }
          </div>
        </li>
      }
    </ol>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-timeline { list-style: none; margin: 0; padding: 0; }
    .eds-timeline__item { display: flex; gap: var(--eds-space-3); padding-bottom: var(--eds-space-4); }
    .eds-timeline__track { display: flex; flex-direction: column; align-items: center; width: 1rem; }
    .eds-timeline__dot { width: 0.625rem; height: 0.625rem; border-radius: 50%; background: var(--eds-color-ink-300); flex-shrink: 0; margin-top: 0.35rem; }
    .eds-timeline__item--complete .eds-timeline__dot { background: var(--eds-color-success-600); }
    .eds-timeline__item--current .eds-timeline__dot { background: var(--eds-color-primary); box-shadow: 0 0 0 3px var(--eds-color-brand-50); }
    .eds-timeline__connector { flex: 1; width: 2px; background: var(--eds-color-border); margin-top: var(--eds-space-1); }
    .eds-timeline__title { font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text); }
    .eds-timeline__desc { font-size: var(--eds-font-size-sm); color: var(--eds-color-text-muted); margin-top: var(--eds-space-1); }
    .eds-timeline__time { font-size: var(--eds-font-size-xs); color: var(--eds-color-text-subtle); margin-top: var(--eds-space-1); }
  \`],
})
export class EdsTimelineComponent {
  @Input() items: EdsTimelineItem[] = [];
  @Input() className = '';

  get rootClass(): string { return cx('eds-timeline', this.className); }

  get resolvedItems(): EdsTimelineItem[] {
    return this.items.map((item, index) => ({
      ...item,
      status: item.status ?? (index === 0 ? 'current' : 'upcoming'),
    }));
  }

  itemClass(item: EdsTimelineItem, last: boolean): string {
    return cx('eds-timeline__item', item.status && \`eds-timeline__item--\${item.status}\`, last && 'eds-timeline__item--last');
  }
}
`, `<eds-timeline [items]="items"></eds-timeline>`,
`  args: { items: [{ title: 'Order placed', timestamp: 'Jan 1', status: 'complete' }, { title: 'Processing', status: 'current' }, { title: 'Shipped', status: 'upcoming' }] },\n`);

// List
pkg('list', 'EdsListComponent', 'List',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsListItem {
  label: string;
  description?: string;
  href?: string;
  selected?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'eds-list',
  standalone: true,
  template: \`
    <ul [class]="rootClass" role="list">
      @for (item of items; track item.label; let i = $index) {
        <li class="eds-list__item">
          @if (item.href && !item.disabled) {
            <a [class]="itemClass(item, i)" [href]="item.href" [attr.aria-current]="item.selected ? 'page' : null"
              (click)="selectItem(item, i)">
              <span class="eds-list__content">
                <span class="eds-list__label">{{ item.label }}</span>
                @if (item.description) { <span class="eds-list__desc">{{ item.description }}</span> }
              </span>
            </a>
          } @else {
            <button type="button" [class]="itemClass(item, i)" [disabled]="item.disabled"
              [attr.aria-pressed]="item.selected" (click)="selectItem(item, i)">
              <span class="eds-list__content">
                <span class="eds-list__label">{{ item.label }}</span>
                @if (item.description) { <span class="eds-list__desc">{{ item.description }}</span> }
              </span>
            </button>
          }
        </li>
      }
    </ul>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-list { list-style: none; margin: 0; padding: 0; border-radius: var(--eds-radius-md); overflow: hidden; }
    .eds-list--divided .eds-list__item + .eds-list__item { border-top: 1px solid var(--eds-color-border); }
    .eds-list__btn { display: flex; width: 100%; padding: var(--eds-space-3) var(--eds-space-4); border: 0; background: transparent; text-align: left; font: inherit; color: var(--eds-color-text); cursor: pointer; text-decoration: none; }
    .eds-list__btn:hover:not(:disabled) { background: var(--eds-color-brand-50); }
    .eds-list__btn--selected { background: var(--eds-color-brand-50); color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-list__btn:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-list__btn:focus-visible { outline: none; box-shadow: inset var(--eds-shadow-focus); }
    .eds-list__content { display: flex; flex-direction: column; gap: var(--eds-space-1); }
    .eds-list__desc { font-size: var(--eds-font-size-xs); color: var(--eds-color-text-muted); }
  \`],
})
export class EdsListComponent {
  @Input() items: EdsListItem[] = [];
  @Input() divided = false;
  @Input() selectedIndex = -1;
  @Input() className = '';
  @Output() itemSelect = new EventEmitter<{ label: string; index: number }>();

  get rootClass(): string { return cx('eds-list', this.divided && 'eds-list--divided', this.className); }

  itemClass(item: EdsListItem, index: number): string {
    const selected = item.selected ?? index === this.selectedIndex;
    return cx('eds-list__btn', selected && 'eds-list__btn--selected');
  }

  selectItem(item: EdsListItem, index: number): void {
    if (item.disabled) return;
    this.selectedIndex = index;
    this.itemSelect.emit({ label: item.label, index });
  }
}
`, `<eds-list [items]="items" [divided]="divided"></eds-list>`,
`  args: { items: [{ label: 'Inbox', description: '12 unread' }, { label: 'Sent', selected: true }], divided: true },\n`);

// SideNav
pkg('side-nav', 'EdsSideNavComponent', 'SideNav',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsSideNavItem {
  label: string;
  href?: string;
  active?: boolean;
  children?: EdsSideNavItem[];
}

@Component({
  selector: 'eds-side-nav',
  standalone: true,
  template: \`
    <nav [class]="rootClass" aria-label="Side navigation">
      <ul class="eds-side-nav__list">
        @for (item of items; track item.label) {
          <li class="eds-side-nav__item">
            @if (item.children?.length) {
              <button type="button" class="eds-side-nav__btn" (click)="toggleSection(item.label)">
                <span class="eds-side-nav__label">{{ item.label }}</span>
                @if (!collapsed) { <span aria-hidden="true">{{ isExpanded(item.label) ? '▾' : '▸' }}</span> }
              </button>
              @if (!collapsed && isExpanded(item.label)) {
                <ul class="eds-side-nav__children">
                  @for (child of item.children; track child.label) {
                    <li><a [class]="linkClass(child)" [href]="child.href || '#'" (click)="navigate(child, $event)">{{ child.label }}</a></li>
                  }
                </ul>
              }
            } @else {
              <a [class]="linkClass(item)" [href]="item.href || '#'" (click)="navigate(item, $event)">
                <span class="eds-side-nav__label">{{ item.label }}</span>
              </a>
            }
          </li>
        }
      </ul>
    </nav>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-side-nav { width: 14rem; padding: var(--eds-space-2); background: var(--eds-color-surface); border-right: 1px solid var(--eds-color-border); font-family: var(--eds-font-sans); }
    .eds-side-nav--collapsed { width: 3.5rem; }
    .eds-side-nav--collapsed .eds-side-nav__label { display: none; }
    .eds-side-nav__list { list-style: none; margin: 0; padding: 0; }
    .eds-side-nav__btn, .eds-side-nav__link { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: var(--eds-space-2) var(--eds-space-3); border-radius: var(--eds-radius-md); border: 0; background: transparent; color: var(--eds-color-text-muted); font: inherit; font-size: var(--eds-font-size-sm); text-decoration: none; cursor: pointer; }
    .eds-side-nav__link:hover, .eds-side-nav__btn:hover { background: var(--eds-color-brand-50); color: var(--eds-color-text); }
    .eds-side-nav__link--active { background: var(--eds-color-brand-50); color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-side-nav__children { list-style: none; margin: 0; padding-left: var(--eds-space-4); }
  \`],
})
export class EdsSideNavComponent {
  @Input() items: EdsSideNavItem[] = [];
  @Input() collapsed = false;
  @Input() className = '';
  @Output() navigateEvent = new EventEmitter<{ label: string; href?: string }>();

  expanded = new Set<string>();

  get rootClass(): string { return cx('eds-side-nav', this.collapsed && 'eds-side-nav--collapsed', this.className); }

  linkClass(item: EdsSideNavItem): string {
    return cx('eds-side-nav__link', item.active && 'eds-side-nav__link--active');
  }

  isExpanded(label: string): boolean { return this.expanded.has(label); }

  toggleSection(label: string): void {
    if (this.expanded.has(label)) this.expanded.delete(label);
    else this.expanded.add(label);
  }

  navigate(item: EdsSideNavItem, event: Event): void {
    event.preventDefault();
    this.navigateEvent.emit({ label: item.label, href: item.href });
  }
}
`, `<eds-side-nav [items]="items"></eds-side-nav>`,
`  args: { items: [{ label: 'Dashboard', href: '/', active: true }, { label: 'Settings', children: [{ label: 'Profile', href: '/profile' }] }] },\n`);

// Stepper
pkg('stepper', 'EdsStepperComponent', 'Stepper',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsStepperStep {
  label: string;
  description?: string;
}

@Component({
  selector: 'eds-stepper',
  standalone: true,
  template: \`
    <ol [class]="rootClass">
      @for (step of steps; track step.label; let i = $index; let last = $last) {
        <li [class]="stepClass(i)">
          <div class="eds-stepper__indicator-wrap">
            <button type="button" [class]="indicatorClass(i)" [disabled]="i > current"
              [attr.aria-label]="step.label" (click)="onStepClick(i)">
              @if (i < current) { ✓ } @else { {{ i + 1 }} }
            </button>
            @if (!last) { <span class="eds-stepper__connector" aria-hidden="true"></span> }
          </div>
          @if (orientation === 'vertical') {
            <div class="eds-stepper__content">
              <span class="eds-stepper__label">{{ step.label }}</span>
              @if (step.description) { <span class="eds-stepper__desc">{{ step.description }}</span> }
            </div>
          }
        </li>
      }
    </ol>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-stepper { display: flex; list-style: none; margin: 0; padding: 0; gap: var(--eds-space-2); }
    .eds-stepper--vertical { flex-direction: column; }
    .eds-stepper__step { display: flex; align-items: flex-start; gap: var(--eds-space-3); flex: 1; }
    .eds-stepper--horizontal .eds-stepper__step { flex-direction: column; align-items: center; text-align: center; }
    .eds-stepper__indicator-wrap { display: flex; align-items: center; }
    .eds-stepper--horizontal .eds-stepper__indicator-wrap { width: 100%; }
    .eds-stepper__indicator {
      width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid var(--eds-color-border);
      background: var(--eds-color-surface); color: var(--eds-color-text-muted); font-size: var(--eds-font-size-sm);
      font-weight: var(--eds-font-weight-semibold); cursor: default; flex-shrink: 0;
    }
    .eds-stepper__step--current .eds-stepper__indicator { border-color: var(--eds-color-primary); color: var(--eds-color-primary); }
    .eds-stepper__step--completed .eds-stepper__indicator { background: var(--eds-color-primary); border-color: var(--eds-color-primary); color: var(--eds-color-text-inverse); }
    .eds-stepper__indicator--clickable:not(:disabled) { cursor: pointer; }
    .eds-stepper__connector { flex: 1; height: 2px; background: var(--eds-color-border); margin: 0 var(--eds-space-2); min-width: 1rem; }
    .eds-stepper__label { font-weight: var(--eds-font-weight-semibold); font-size: var(--eds-font-size-sm); }
    .eds-stepper__desc { display: block; font-size: var(--eds-font-size-xs); color: var(--eds-color-text-muted); }
  \`],
})
export class EdsStepperComponent {
  @Input() steps: EdsStepperStep[] = [];
  @Input() current = 0;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';
  @Output() stepClick = new EventEmitter<number>();

  get rootClass(): string { return cx('eds-stepper', \`eds-stepper--\${this.orientation}\`, this.className); }

  stepClass(index: number): string {
    return cx('eds-stepper__step', index < this.current && 'eds-stepper__step--completed', index === this.current && 'eds-stepper__step--current');
  }

  indicatorClass(index: number): string {
    return cx('eds-stepper__indicator', index <= this.current && 'eds-stepper__indicator--clickable');
  }

  onStepClick(index: number): void {
    if (index <= this.current) this.stepClick.emit(index);
  }
}
`, `<eds-stepper [steps]="steps" [current]="current"></eds-stepper>`,
`  args: { steps: [{ label: 'Account', description: 'Create account' }, { label: 'Profile', description: 'Add details' }, { label: 'Review' }], current: 1 },\n`);

// ButtonGroup
pkg('button-group', 'EdsButtonGroupComponent', 'ButtonGroup',
`import { Component, ContentChildren, Input, QueryList, AfterContentInit } from '@angular/core';
import { cx } from '../../utils/cx';
import { EdsButtonComponent, EdsButtonSize } from '../button/button.component';

@Component({
  selector: 'eds-button-group',
  standalone: true,
  imports: [EdsButtonComponent],
  template: \`<div [class]="rootClass" role="group"><ng-content></ng-content></div>\`,
  styles: [\`
    :host { display: inline-block; }
    .eds-button-group { display: inline-flex; }
    .eds-button-group--horizontal ::ng-deep eds-button + eds-button .eds-button { border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -1px; }
    .eds-button-group--vertical { flex-direction: column; }
    .eds-button-group--vertical ::ng-deep eds-button + eds-button .eds-button { border-top-left-radius: 0; border-top-right-radius: 0; margin-top: -1px; }
  \`],
})
export class EdsButtonGroupComponent implements AfterContentInit {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() size: EdsButtonSize = 'md';
  @Input() className = '';

  @ContentChildren(EdsButtonComponent) buttons!: QueryList<EdsButtonComponent>;

  get rootClass(): string { return cx('eds-button-group', \`eds-button-group--\${this.orientation}\`, this.className); }

  ngAfterContentInit(): void {
    this.applySize();
    this.buttons.changes.subscribe(() => this.applySize());
  }

  private applySize(): void {
    this.buttons?.forEach((btn) => { btn.size = this.size; });
  }
}
`, `<eds-button-group [size]="size"><eds-button variant="secondary">Left</eds-button><eds-button variant="secondary">Center</eds-button><eds-button variant="secondary">Right</eds-button></eds-button-group>`,
`  args: { size: 'md' },\n`);

// DataTable
pkg('data-table', 'EdsDataTableComponent', 'DataTable',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsDataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export type EdsSortDirection = 'asc' | 'desc';

@Component({
  selector: 'eds-data-table',
  standalone: true,
  template: \`
    <div [class]="rootClass">
      <div class="eds-data-table__wrapper">
        <table>
          <thead>
            <tr>
              @for (col of columns; track col.key) {
                <th scope="col">
                  @if (isSortable(col)) {
                    <button type="button" class="eds-data-table__sort-btn" [attr.aria-label]="'Sort by ' + col.label"
                      [attr.aria-sort]="sortKey === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'"
                      (click)="handleSort(col.key)">{{ col.label }} <span class="eds-data-table__sort-icon" aria-hidden="true">↕</span></button>
                  } @else { {{ col.label }} }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @if (rows.length) {
              @for (row of rows; track $index) {
                <tr>@for (col of columns; track col.key) { <td>{{ row[col.key] ?? '' }}</td> }</tr>
              }
            } @else {
              <tr><td class="eds-data-table__empty" [attr.colspan]="columns.length || 1">No data</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  \`,
  styles: [\`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-data-table__wrapper { overflow-x: auto; border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-lg); }
    table { width: 100%; border-collapse: collapse; font-size: var(--eds-font-size-sm); }
    th, td { padding: var(--eds-space-3) var(--eds-space-4); text-align: left; border-bottom: 1px solid var(--eds-color-border); }
    th { background: var(--eds-color-ink-50); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text-muted); }
    tbody tr:hover { background: var(--eds-color-brand-50); }
    .eds-data-table--striped tbody tr:nth-child(even) { background: var(--eds-color-ink-50); }
    .eds-data-table--compact th, .eds-data-table--compact td { padding: var(--eds-space-2) var(--eds-space-3); }
    .eds-data-table__sort-btn { display: inline-flex; align-items: center; gap: var(--eds-space-1); border: 0; background: transparent; font: inherit; cursor: pointer; color: inherit; }
    .eds-data-table__empty { text-align: center; color: var(--eds-color-text-muted); padding: var(--eds-space-6); }
  \`],
})
export class EdsDataTableComponent {
  @Input() columns: EdsDataTableColumn[] = [];
  @Input() rows: Record<string, string | number>[] = [];
  @Input() sortable = false;
  @Input() striped = false;
  @Input() compact = false;
  @Input() className = '';
  @Output() sortChange = new EventEmitter<{ key: string; direction: EdsSortDirection }>();

  sortKey = '';
  sortDirection: EdsSortDirection = 'asc';

  get rootClass(): string {
    return cx('eds-data-table', this.striped && 'eds-data-table--striped', this.compact && 'eds-data-table--compact', this.className);
  }

  isSortable(col: EdsDataTableColumn): boolean { return this.sortable && col.sortable !== false; }

  handleSort(key: string): void {
    const next: EdsSortDirection = this.sortKey === key && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortKey = key;
    this.sortDirection = next;
    this.sortChange.emit({ key, direction: next });
  }
}
`, `<eds-data-table [columns]="columns" [rows]="rows" [sortable]="sortable" [striped]="striped"></eds-data-table>`,
`  args: { columns: [{ key: 'name', label: 'Name', sortable: true }, { key: 'role', label: 'Role' }], rows: [{ name: 'Jane', role: 'Admin' }, { name: 'John', role: 'User' }], sortable: true, striped: true },\n`);

// TreeView
pkg('tree-view', 'EdsTreeViewComponent', 'TreeView',
`import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsTreeNode {
  id: string;
  label: string;
  children?: EdsTreeNode[];
}

@Component({
  selector: 'eds-tree-view',
  standalone: true,
  template: \`
    @if (!items.length) {
      <div [class]="rootClass"><div class="eds-tree-view__empty">No items</div></div>
    } @else {
      <div [class]="rootClass">
        <ul class="eds-tree-view__tree" role="tree" aria-label="Tree navigation">
          @for (node of items; track node.id) {
            <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: node }"></ng-container>
          }
        </ul>
      </div>
    }

    <ng-template #nodeTpl let-node>
      <li role="none">
        <div [class]="rowClass(node)" role="treeitem" tabindex="0"
          [attr.aria-selected]="selectedId === node.id"
          [attr.aria-expanded]="node.children?.length ? isExpanded(node.id) : null"
          (click)="selectNode(node.id)" (keydown)="onKeyDown($event, node)">
          @if (node.children?.length) {
            <button type="button" [class]="toggleClass(node.id)" aria-label="Toggle"
              (click)="toggleNode(node.id, $event)">▸</button>
          } @else {
            <span class="eds-tree-view__spacer" aria-hidden="true"></span>
          }
          <span class="eds-tree-view__label">{{ node.label }}</span>
        </div>
        @if (node.children?.length && isExpanded(node.id)) {
          <ul class="eds-tree-view__tree" role="group">
            @for (child of node.children; track child.id) {
              <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: child }"></ng-container>
            }
          </ul>
        }
      </li>
    </ng-template>
  \`,
  styles: [\`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-tree-view__tree { list-style: none; margin: 0; padding: 0; }
    .eds-tree-view__row { display: flex; align-items: center; gap: var(--eds-space-1); padding: var(--eds-space-1) var(--eds-space-2); border-radius: var(--eds-radius-sm); cursor: pointer; font-size: var(--eds-font-size-sm); }
    .eds-tree-view__row:hover { background: var(--eds-color-brand-50); }
    .eds-tree-view__row--selected { background: var(--eds-color-brand-50); color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-tree-view__toggle { border: 0; background: transparent; cursor: pointer; padding: 0; width: 1rem; font-size: 0.65rem; transition: transform var(--eds-duration-fast) var(--eds-easing-standard); }
    .eds-tree-view__toggle--expanded { transform: rotate(90deg); }
    .eds-tree-view__spacer { width: 1rem; }
    .eds-tree-view__empty { padding: var(--eds-space-4); color: var(--eds-color-text-muted); font-size: var(--eds-font-size-sm); }
  \`],
})
export class EdsTreeViewComponent {
  @Input() items: EdsTreeNode[] = [];
  @Input() selectedId = '';
  @Input() expandedIds: Record<string, boolean> = {};
  @Input() className = '';
  @Output() nodeSelect = new EventEmitter<string>();
  @Output() nodeToggle = new EventEmitter<{ id: string; expanded: boolean }>();

  internalExpanded: Record<string, boolean> = {};

  get rootClass(): string { return cx('eds-tree-view', this.className); }

  isExpanded(id: string): boolean { return this.expandedIds[id] ?? this.internalExpanded[id] ?? false; }

  rowClass(node: EdsTreeNode): string {
    return cx('eds-tree-view__row', this.selectedId === node.id && 'eds-tree-view__row--selected');
  }

  toggleClass(id: string): string {
    return cx('eds-tree-view__toggle', this.isExpanded(id) && 'eds-tree-view__toggle--expanded');
  }

  selectNode(id: string): void { this.selectedId = id; this.nodeSelect.emit(id); }

  toggleNode(id: string, event: Event): void {
    event.stopPropagation();
    const expanded = !this.isExpanded(id);
    this.internalExpanded[id] = expanded;
    this.nodeToggle.emit({ id, expanded });
  }

  onKeyDown(event: KeyboardEvent, node: EdsTreeNode): void {
    switch (event.key) {
      case 'Enter':
      case ' ': event.preventDefault(); this.selectNode(node.id); break;
      case 'ArrowRight':
        if (node.children?.length && !this.isExpanded(node.id)) { event.preventDefault(); this.toggleNode(node.id, event); }
        break;
      case 'ArrowLeft':
        if (node.children?.length && this.isExpanded(node.id)) { event.preventDefault(); this.toggleNode(node.id, event); }
        break;
    }
  }
}
`, `<eds-tree-view [items]="items" [selectedId]="selectedId"></eds-tree-view>`,
`  args: { items: [{ id: '1', label: 'Documents', children: [{ id: '1a', label: 'Reports' }] }, { id: '2', label: 'Images' }], selectedId: '1a' },\n`);

console.log('All components generated');
