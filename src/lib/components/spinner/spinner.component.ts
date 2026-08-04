import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsSpinnerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-spinner',
  standalone: true,
  template: `
    <div [class]="rootClass" role="status" aria-live="polite" aria-busy="true">
      <span [class]="ringClass" aria-hidden="true"></span>
      @if (showLabel) {
        <span class="eds-spinner__label">{{ label }}</span>
      } @else {
        <span class="eds-spinner__sr-only">{{ label }}</span>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: inline-block;
        font-family: var(--eds-font-sans);
      }

      .eds-spinner {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-2);
      }

      .eds-spinner__ring {
        border-radius: 50%;
        border: 2px solid var(--eds-color-ink-200);
        border-top-color: var(--eds-color-primary);
        animation: eds-spinner-spin 0.8s linear infinite;
      }

      .eds-spinner__ring--sm {
        width: 1rem;
        height: 1rem;
      }

      .eds-spinner__ring--md {
        width: 1.5rem;
        height: 1.5rem;
      }

      .eds-spinner__ring--lg {
        width: 2rem;
        height: 2rem;
      }

      .eds-spinner__label {
        font-size: var(--eds-font-size-sm);
        color: var(--eds-color-text-muted);
      }

      .eds-spinner__sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      @keyframes eds-spinner-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class EdsSpinnerComponent {
  @Input() size: EdsSpinnerSize = 'md';
  @Input() label = 'Loading';
  @Input() showLabel = false;
  @Input() className = '';

  get rootClass(): string {
    return cx('eds-spinner', this.className);
  }

  get ringClass(): string {
    return cx('eds-spinner__ring', `eds-spinner__ring--${this.size}`);
  }
}
