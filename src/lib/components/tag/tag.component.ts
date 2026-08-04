import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsTagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'eds-tag',
  standalone: true,
  template: `
    <span [class]="classes">
      <span class="label">
        @if (label) {
          {{ label }}
        } @else {
          <ng-content />
        }
      </span>
      @if (dismissible) {
        <button
          class="dismiss"
          type="button"
          aria-label="Remove tag"
          (click)="handleDismiss($event)"
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4L12 12M12 4L4 12"
              stroke="currentColor"
              stroke-width="1.75"
              stroke-linecap="round"
            />
          </svg>
        </button>
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .tag {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-1);
        padding: 0.25rem 0.5rem;
        border: 1px solid transparent;
        border-radius: var(--eds-radius-sm);
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        line-height: 1;
        white-space: nowrap;
        user-select: none;
      }

      .label {
        display: inline-flex;
        align-items: center;
      }

      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.25rem;
        height: 1.25rem;
        margin: 0 -0.125rem 0 0;
        padding: 0;
        border: none;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        opacity: 0.75;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .neutral {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-ink-700);
        border-color: var(--eds-color-ink-200);
      }

      .brand {
        background: var(--eds-color-brand-100);
        color: var(--eds-color-brand-800);
        border-color: rgb(15 110 106 / 0.15);
      }

      .success {
        background: var(--eds-color-success-100);
        color: var(--eds-color-success-600);
        border-color: rgb(31 122 77 / 0.15);
      }

      .warning {
        background: var(--eds-color-warning-100);
        color: var(--eds-color-warning-600);
        border-color: rgb(154 103 0 / 0.15);
      }

      .danger {
        background: var(--eds-color-danger-100);
        color: var(--eds-color-danger-600);
        border-color: rgb(180 35 24 / 0.15);
      }

      .info {
        background: var(--eds-color-info-100);
        color: var(--eds-color-info-600);
        border-color: rgb(23 92 211 / 0.15);
      }
    `,
  ],
})
export class EdsTagComponent {
  @Input() label = '';
  @Input() variant: EdsTagVariant = 'neutral';
  @Input() dismissible = false;

  @Output() tagDismiss = new EventEmitter<void>();

  get classes(): string {
    return cx('tag', this.variant);
  }

  handleDismiss(event: Event): void {
    event.stopPropagation();
    this.tagDismiss.emit();
  }
}
