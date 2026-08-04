import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-circular-progress',
  standalone: true,
  template: `
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
  `,
  styles: [`
    :host { display: inline-block; }
    .eds-circular-progress { position: relative; display: inline-flex; align-items: center; justify-content: center; }
    .eds-circular-progress__svg--indeterminate { animation: eds-circular-spin 1s linear infinite; }
    .eds-circular-progress__track { stroke: var(--eds-color-ink-200); }
    .eds-circular-progress__fill { stroke: var(--eds-color-primary); stroke-linecap: round; transform: rotate(-90deg); transform-origin: center; transition: stroke-dashoffset var(--eds-duration-normal) var(--eds-easing-standard); }
    .eds-circular-progress__value { position: absolute; font-size: var(--eds-font-size-xs); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text); }
    @keyframes eds-circular-spin { to { transform: rotate(360deg); } }
  `],
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
