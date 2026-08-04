import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eds-switch',
  standalone: true,
  template: `
    <label class="eds-switch" [class.eds-switch--disabled]="disabled">
      <input
        class="eds-switch__input"
        type="checkbox"
        role="switch"
        [id]="inputId"
        [name]="name || null"
        [checked]="checked"
        [disabled]="disabled"
        [attr.aria-checked]="checked ? 'true' : 'false'"
        (change)="onChange($event)"
      />
      <span class="eds-switch__track" aria-hidden="true">
        <span class="eds-switch__thumb"></span>
      </span>
      @if (label) {
        <span class="eds-switch__label">{{ label }}</span>
      } @else {
        <span class="eds-switch__label"><ng-content></ng-content></span>
      }
    </label>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
        font-family: var(--eds-font-sans);
        color: var(--eds-color-text);
      }

      .eds-switch {
        display: inline-flex;
        align-items: center;
        gap: var(--eds-space-3);
        cursor: pointer;
        user-select: none;
      }

      .eds-switch--disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .eds-switch__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .eds-switch__track {
        position: relative;
        width: 2.75rem;
        height: 1.5rem;
        border-radius: var(--eds-radius-full, 999px);
        background: var(--eds-color-ink-300);
        transition: background-color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-switch__input:focus-visible + .eds-switch__track {
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-switch__input:checked + .eds-switch__track {
        background: var(--eds-color-primary);
      }

      .eds-switch__thumb {
        position: absolute;
        top: 0.125rem;
        left: 0.125rem;
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-xs);
        transition: transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-switch__input:checked + .eds-switch__track .eds-switch__thumb {
        transform: translateX(1.25rem);
      }

      .eds-switch__label {
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
      }
    `,
  ],
})
export class EdsSwitchComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() name = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  readonly inputId = `eds-switch-${EdsSwitchComponent.nextId++}`;

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
