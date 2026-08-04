import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EdsIconName } from '../../icons/names';
import { cx } from '../../utils/cx';
import { EdsIconComponent } from '../icon/icon.component';

export type EdsButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'danger';
export type EdsButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-button',
  standalone: true,
  imports: [EdsIconComponent],
  template: `
    @if (href && !disabled) {
      <a
        [class]="buttonClass"
        [href]="href"
        [attr.target]="target || null"
        [attr.rel]="rel || (target === '_blank' ? 'noopener noreferrer' : null)"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-busy]="loading ? 'true' : 'false'"
        (click)="handleClick($event)"
      >
        @if (loading) {
          <span class="eds-button__spinner" aria-hidden="true"></span>
        } @else {
          <span class="eds-button__leading">
            @if (icon) {
              <eds-icon [name]="icon" [size]="iconSize"></eds-icon>
            }
          </span>
        }
        @if (!iconOnly) {
          <span class="eds-button__label"><ng-content></ng-content></span>
        }
        @if (!loading && !iconOnly && iconTrailing) {
          <span class="eds-button__trailing">
            <eds-icon [name]="iconTrailing" [size]="iconSize"></eds-icon>
          </span>
        }
      </a>
    } @else {
      <button
        [class]="buttonClass"
        [type]="type"
        [disabled]="disabled || loading"
        [attr.aria-label]="ariaLabel || null"
        [attr.aria-busy]="loading ? 'true' : 'false'"
        (click)="handleClick($event)"
      >
        @if (loading) {
          <span class="eds-button__spinner" aria-hidden="true"></span>
        } @else {
          <span class="eds-button__leading">
            @if (icon) {
              <eds-icon [name]="icon" [size]="iconSize"></eds-icon>
            }
          </span>
        }
        @if (!iconOnly) {
          <span class="eds-button__label"><ng-content></ng-content></span>
        }
        @if (!loading && !iconOnly && iconTrailing) {
          <span class="eds-button__trailing">
            <eds-icon [name]="iconTrailing" [size]="iconSize"></eds-icon>
          </span>
        }
      </button>
    }
  `,
  styles: [
    `
      :host {
        display: inline-block;
        vertical-align: middle;
        font-family: var(--eds-font-sans);
        color: var(--eds-color-text);
      }

      .eds-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--eds-space-2);
        margin: 0;
        border: 1px solid transparent;
        border-radius: var(--eds-button-radius, var(--eds-radius-md));
        font-family: inherit;
        font-weight: var(--eds-font-weight-semibold);
        line-height: 1;
        letter-spacing: 0.01em;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
        white-space: nowrap;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-button:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-button:active:not(:disabled) {
        transform: translateY(1px);
      }

      .eds-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .eds-button--sm {
        min-height: 2rem;
        padding: 0 var(--eds-space-3);
        font-size: var(--eds-font-size-sm);
      }

      .eds-button--md {
        min-height: 2.5rem;
        padding: 0 var(--eds-space-4);
        font-size: var(--eds-font-size-md);
      }

      .eds-button--lg {
        min-height: 3rem;
        padding: 0 var(--eds-space-5);
        font-size: var(--eds-font-size-lg);
      }

      .eds-button--icon-only.eds-button--sm {
        width: 2rem;
        padding: 0;
      }

      .eds-button--icon-only.eds-button--md {
        width: 2.5rem;
        padding: 0;
      }

      .eds-button--icon-only.eds-button--lg {
        width: 3rem;
        padding: 0;
      }

      .eds-button--primary {
        background: var(--eds-color-primary);
        color: var(--eds-color-text-inverse);
      }

      .eds-button--primary:hover:not(:disabled) {
        background: var(--eds-color-primary-hover);
      }

      .eds-button--secondary {
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        border-color: var(--eds-color-border-strong);
        box-shadow: var(--eds-shadow-xs);
      }

      .eds-button--secondary:hover:not(:disabled) {
        background: var(--eds-color-ink-50);
        border-color: var(--eds-color-ink-400);
      }

      .eds-button--tertiary {
        background: transparent;
        color: var(--eds-color-primary);
      }

      .eds-button--tertiary:hover:not(:disabled) {
        background: var(--eds-color-brand-50);
      }

      .eds-button--danger {
        background: var(--eds-color-danger-600);
        color: var(--eds-color-text-inverse);
      }

      .eds-button--full-width {
        width: 100%;
      }

      .eds-button__leading,
      .eds-button__trailing {
        display: inline-flex;
        align-items: center;
        line-height: 0;
      }

      .eds-button__label:empty {
        display: none;
      }

      .eds-button__spinner {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: eds-button-spin var(--eds-duration-slow) linear infinite;
      }

      @keyframes eds-button-spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class EdsButtonComponent {
  private static nextId = 0;

  @Input() variant: EdsButtonVariant = 'primary';
  @Input() size: EdsButtonSize = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;
  @Input() icon: EdsIconName | '' = '';
  @Input() iconTrailing: EdsIconName | '' = '';
  @Input() iconOnly = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() href?: string;
  @Input() target?: string;
  @Input() rel?: string;
  @Input() accessibleLabel = '';

  @Output() clicked = new EventEmitter<MouseEvent>();

  readonly buttonId = `eds-button-${EdsButtonComponent.nextId++}`;

  get iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  get ariaLabel(): string | undefined {
    if (this.iconOnly) {
      return this.accessibleLabel || this.icon || 'Button';
    }
    return this.accessibleLabel || undefined;
  }

  get buttonClass(): string {
    return cx(
      'eds-button',
      `eds-button--${this.variant}`,
      `eds-button--${this.size}`,
      this.fullWidth && 'eds-button--full-width',
      this.iconOnly && 'eds-button--icon-only',
    );
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    this.clicked.emit(event);
  }
}
