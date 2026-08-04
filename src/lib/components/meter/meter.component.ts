import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-meter',
  standalone: true,
  template: `
    <div [class]="rootClass">
      @if (label || showValue) {
        <div class="eds-meter__header">
          @if (label) { <span class="eds-meter__label">{{ label }}</span> }
          @if (showValue) { <span class="eds-meter__value">{{ value }} of {{ max }}</span> }
        </div>
      }
      <meter
        class="eds-meter__bar"
        [min]="min"
        [max]="max"
        [attr.low]="low ?? null"
        [attr.high]="high ?? null"
        [attr.optimum]="optimum ?? null"
        [value]="value"
      ></meter>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-meter { display: flex; flex-direction: column; gap: var(--eds-space-2); }
    .eds-meter__header { display: flex; justify-content: space-between; font-size: var(--eds-font-size-sm); }
    .eds-meter__label { font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text); }
    .eds-meter__value { color: var(--eds-color-text-muted); }
    .eds-meter__bar { width: 100%; height: 0.5rem; border-radius: var(--eds-radius-full); }
  `],
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
