import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsBadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type EdsBadgeSize = 'sm' | 'md';

@Component({
  selector: 'eds-badge',
  standalone: true,
  template: `
    <span [class]="classes">
      @if (label) {
        {{ label }}
      } @else {
        <ng-content />
      }
    </span>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-1);
        border: 1px solid transparent;
        font-weight: var(--eds-font-weight-semibold);
        line-height: 1;
        white-space: nowrap;
        user-select: none;
      }

      .sm {
        padding: 0.125rem 0.5rem;
        font-size: var(--eds-font-size-xs);
      }

      .md {
        padding: 0.25rem 0.625rem;
        font-size: var(--eds-font-size-sm);
      }

      .pill {
        border-radius: var(--eds-radius-full);
      }

      .rounded {
        border-radius: var(--eds-radius-sm);
      }

      .soft.neutral {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-ink-700);
        border-color: var(--eds-color-ink-200);
      }

      .soft.brand {
        background: var(--eds-color-brand-100);
        color: var(--eds-color-brand-800);
        border-color: rgb(15 110 106 / 0.15);
      }

      .soft.success {
        background: var(--eds-color-success-100);
        color: var(--eds-color-success-600);
        border-color: rgb(31 122 77 / 0.15);
      }

      .soft.warning {
        background: var(--eds-color-warning-100);
        color: var(--eds-color-warning-600);
        border-color: rgb(154 103 0 / 0.15);
      }

      .soft.danger {
        background: var(--eds-color-danger-100);
        color: var(--eds-color-danger-600);
        border-color: rgb(180 35 24 / 0.15);
      }

      .soft.info {
        background: var(--eds-color-info-100);
        color: var(--eds-color-info-600);
        border-color: rgb(23 92 211 / 0.15);
      }

      .solid.neutral {
        background: var(--eds-color-ink-700);
        color: var(--eds-color-text-inverse);
      }

      .solid.brand {
        background: var(--eds-color-brand-700);
        color: var(--eds-color-text-inverse);
      }

      .solid.success {
        background: var(--eds-color-success-600);
        color: var(--eds-color-text-inverse);
      }

      .solid.warning {
        background: var(--eds-color-warning-600);
        color: var(--eds-color-text-inverse);
      }

      .solid.danger {
        background: var(--eds-color-danger-600);
        color: var(--eds-color-text-inverse);
      }

      .solid.info {
        background: var(--eds-color-info-600);
        color: var(--eds-color-text-inverse);
      }
    `,
  ],
})
export class EdsBadgeComponent {
  @Input() label = '';
  @Input() variant: EdsBadgeVariant = 'neutral';
  @Input() size: EdsBadgeSize = 'md';
  @Input() pill = false;
  @Input() soft = true;

  get classes(): string {
    return cx(
      'badge',
      this.variant,
      this.size,
      this.pill ? 'pill' : 'rounded',
      this.soft ? 'soft' : 'solid',
    );
  }
}
