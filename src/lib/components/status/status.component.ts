import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsStatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

@Component({
  selector: 'eds-status',
  standalone: true,
  template: `
    <span [class]="rootClass" role="status">
      <span [class]="dotClass" aria-hidden="true"></span>
      <span class="eds-status__label">{{ label }}</span>
    </span>
  `,
  styles: [`
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
  `],
})
export class EdsStatusComponent {
  @Input() label = 'Status';
  @Input() variant: EdsStatusVariant = 'neutral';
  @Input() pulse = false;
  @Input() className = '';
  get rootClass(): string { return cx('eds-status', `eds-status--${this.variant}`, this.className); }
  get dotClass(): string { return cx('eds-status__dot', this.pulse && 'eds-status__dot--pulse'); }
}
