import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsSegmentOption {
  label: string;
  value: string;
  disabled?: boolean;
}

@Component({
  selector: 'eds-segmented-control',
  standalone: true,
  template: `
    <div [class]="rootClass" role="group">
      @for (opt of options; track opt.value) {
        <button type="button" [class]="segmentClass(opt)" [attr.aria-pressed]="value === opt.value"
          [disabled]="opt.disabled" (click)="select(opt)">
          <span class="eds-segment__inner">{{ opt.label }}</span>
        </button>
      }
    </div>
  `,
  styles: [`
    :host { display: inline-block; }
    .eds-segmented { display: inline-flex; padding: var(--eds-space-1); background: var(--eds-color-ink-100); border-radius: var(--eds-radius-md); gap: var(--eds-space-1); }
    .eds-segmented--full { width: 100%; }
    .eds-segmented--full .eds-segment { flex: 1; }
    .eds-segment { border: 0; border-radius: var(--eds-radius-sm); background: transparent; color: var(--eds-color-text-muted); font: inherit; cursor: pointer; padding: var(--eds-space-1) var(--eds-space-3); }
    .eds-segmented--sm .eds-segment { font-size: var(--eds-font-size-xs); padding: var(--eds-space-1) var(--eds-space-2); }
    .eds-segment--selected { background: var(--eds-color-surface); color: var(--eds-color-text); box-shadow: var(--eds-shadow-xs); font-weight: var(--eds-font-weight-semibold); }
    .eds-segment:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-segment:disabled { opacity: 0.45; cursor: not-allowed; }
  `],
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
