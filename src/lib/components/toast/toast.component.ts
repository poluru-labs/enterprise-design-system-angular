import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsToastVariant = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'eds-toast',
  standalone: true,
  template: `
    <div
      [class]="classes"
      role="status"
      aria-live="polite"
      [attr.data-open]="open ? 'true' : 'false'"
      [hidden]="!open"
    >
      <div class="content">
        <p class="title">{{ title }}</p>
        @if (description) {
          <p class="description">{{ description }}</p>
        }
      </div>
      <button class="close" type="button" aria-label="Dismiss notification" (click)="close()">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 4L12 12M12 4L4 12"
            stroke="currentColor"
            stroke-width="1.75"
            stroke-linecap="round"
          />
        </svg>
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        width: min(100%, 22rem);
        pointer-events: auto;
      }

      .toast {
        display: flex;
        align-items: flex-start;
        gap: var(--eds-space-3);
        padding: var(--eds-space-4);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        color: var(--eds-color-text);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-relaxed);
        opacity: 0;
        transform: translateY(8px);
        transition:
          opacity var(--eds-duration-normal) var(--eds-easing-emphasized),
          transform var(--eds-duration-normal) var(--eds-easing-emphasized);
      }

      .toast[data-open='true'] {
        opacity: 1;
        transform: translateY(0);
      }

      .toast.success {
        border-color: var(--eds-color-success-600);
        background: linear-gradient(180deg, var(--eds-color-success-100), var(--eds-color-surface));
      }

      .toast.info {
        border-color: var(--eds-color-info-600);
        background: linear-gradient(180deg, var(--eds-color-info-100), var(--eds-color-surface));
      }

      .toast.warning {
        border-color: var(--eds-color-warning-600);
        background: linear-gradient(180deg, var(--eds-color-warning-100), var(--eds-color-surface));
      }

      .toast.danger {
        border-color: var(--eds-color-danger-600);
        background: linear-gradient(180deg, var(--eds-color-danger-100), var(--eds-color-surface));
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        margin: 0;
        font-weight: var(--eds-font-weight-semibold);
      }

      .description {
        margin: var(--eds-space-1) 0 0;
        color: var(--eds-color-text-muted);
      }

      .close {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
      }

      .close:hover {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }
    `,
  ],
})
export class EdsToastComponent implements OnChanges, OnDestroy {
  @Input() title = '';
  @Input() description = '';
  @Input() variant: EdsToastVariant = 'info';
  @Input() open = false;
  @Input() duration = 5000;

  @Output() openChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  private dismissTimer: ReturnType<typeof setTimeout> | null = null;

  get classes(): string {
    return cx('toast', this.variant);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['open']?.currentValue === true || changes['duration']) {
      this.startDismissTimer();
    }

    if (changes['open']?.previousValue === true && changes['open']?.currentValue === false) {
      this.clearDismissTimer();
      this.closed.emit();
    }
  }

  ngOnDestroy(): void {
    this.clearDismissTimer();
  }

  close(): void {
    if (!this.open) return;
    this.open = false;
    this.openChange.emit(false);
  }

  private startDismissTimer(): void {
    this.clearDismissTimer();
    if (!this.open || this.duration <= 0) return;
    this.dismissTimer = setTimeout(() => this.close(), this.duration);
  }

  private clearDismissTimer(): void {
    if (this.dismissTimer) clearTimeout(this.dismissTimer);
    this.dismissTimer = null;
  }
}
