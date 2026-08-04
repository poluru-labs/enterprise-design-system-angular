import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsAlertVariant = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'eds-alert',
  standalone: true,
  template: `
    @if (!isDismissed) {
      <div [class]="classes" role="alert" aria-live="polite">
        @if (!hideIcon) {
          <span class="icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.25" />
              <path d="M8 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              <circle cx="8" cy="5" r="0.75" fill="currentColor" />
            </svg>
          </span>
        }
        <div class="content">
          @if (title) {
            <p class="title">{{ title }}</p>
          }
          @if (message) {
            <p class="message">{{ message }}</p>
          } @else {
            <div class="message"><ng-content /></div>
          }
        </div>
        @if (dismissible) {
          <button
            class="close"
            type="button"
            aria-label="Dismiss alert"
            (click)="handleDismiss()"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
              <path
                d="M4 4L12 12M12 4L4 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        }
      </div>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--eds-space-3);
        padding: var(--eds-space-3) var(--eds-space-4);
        border: 1px solid transparent;
        border-radius: var(--eds-radius-md);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-normal);
      }

      .icon {
        display: inline-flex;
        flex-shrink: 0;
        margin-top: 0.0625rem;
        line-height: 0;
      }

      .content {
        flex: 1;
        min-width: 0;
      }

      .title {
        margin: 0 0 var(--eds-space-1);
        font-weight: var(--eds-font-weight-semibold);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-snug);
      }

      .message {
        margin: 0;
        color: inherit;
      }

      .close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        margin: -0.25rem -0.25rem -0.25rem 0;
        padding: 0;
        border: none;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        opacity: 0.75;
      }

      .close:hover {
        opacity: 1;
      }

      .success {
        background: var(--eds-color-success-100);
        border-color: rgb(31 122 77 / 0.2);
        color: var(--eds-color-success-600);
      }

      .info {
        background: var(--eds-color-info-100);
        border-color: rgb(23 92 211 / 0.2);
        color: var(--eds-color-info-600);
      }

      .warning {
        background: var(--eds-color-warning-100);
        border-color: rgb(154 103 0 / 0.2);
        color: var(--eds-color-warning-600);
      }

      .danger {
        background: var(--eds-color-danger-100);
        border-color: rgb(180 35 24 / 0.2);
        color: var(--eds-color-danger-600);
      }
    `,
  ],
})
export class EdsAlertComponent {
  @Input() variant: EdsAlertVariant = 'info';
  @Input() title = '';
  @Input() message = '';
  @Input() dismissible = false;
  @Input() hideIcon = false;

  @Output() alertDismiss = new EventEmitter<void>();

  isDismissed = false;

  get classes(): string {
    return cx('alert', this.variant);
  }

  handleDismiss(): void {
    this.isDismissed = true;
    this.alertDismiss.emit();
  }
}
