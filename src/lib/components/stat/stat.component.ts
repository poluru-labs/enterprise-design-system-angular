import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsStatTrend = 'up' | 'down' | 'flat';

@Component({
  selector: 'eds-stat',
  standalone: true,
  template: `
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
  `,
  styles: [`
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
  `],
})
export class EdsStatComponent {
  @Input() value = '';
  @Input() label = '';
  @Input() hint = '';
  @Input() trend?: EdsStatTrend;
  @Input() trendValue = '';
  @Input() className = '';
  get rootClass(): string { return cx('eds-stat', this.className); }
  get trendClass(): string { return cx('eds-stat__trend', this.trend && `eds-stat__trend--${this.trend}`); }
}
