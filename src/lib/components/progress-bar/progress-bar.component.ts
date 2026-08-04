import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-progress-bar',
  standalone: true,
  template: `
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
  `,
  styles: [`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-progress-bar { display: flex; flex-direction: column; gap: var(--eds-space-2); }
    .eds-progress-bar__header { display: flex; justify-content: space-between; font-size: var(--eds-font-size-sm); color: var(--eds-color-text-muted); }
    .eds-progress-bar__track { height: 0.5rem; background: var(--eds-color-ink-100); border-radius: var(--eds-radius-full); overflow: hidden; }
    .eds-progress-bar__fill { height: 100%; background: var(--eds-color-primary); border-radius: inherit; transition: width var(--eds-duration-normal) var(--eds-easing-standard); }
    .eds-progress-bar__fill--indeterminate { width: 40% !important; animation: eds-progress-indeterminate 1.2s ease-in-out infinite; }
    @keyframes eds-progress-indeterminate { 0% { transform: translateX(-100%); } 100% { transform: translateX(250%); } }
  `],
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
