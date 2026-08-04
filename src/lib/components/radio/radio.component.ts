import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Host,
  Output,
} from '@angular/core';
import { EdsRadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'eds-radio',
  standalone: true,
  template: `
    <label class="eds-radio" [class.eds-radio--disabled]="effectiveDisabled">
      <input
        class="eds-radio__input"
        type="radio"
        [id]="inputId"
        [name]="effectiveName || null"
        [value]="value"
        [checked]="effectiveChecked"
        [disabled]="effectiveDisabled"
        (change)="onChange($event)"
      />
      <span class="eds-radio__dot-wrap" aria-hidden="true">
        <span class="eds-radio__dot"></span>
      </span>
      @if (label) {
        <span class="eds-radio__label">{{ label }}</span>
      } @else {
        <span class="eds-radio__label"><ng-content></ng-content></span>
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

      .eds-radio {
        display: inline-flex;
        align-items: flex-start;
        gap: var(--eds-space-2);
        cursor: pointer;
        user-select: none;
      }

      .eds-radio--disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .eds-radio__input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
        margin: 0;
      }

      .eds-radio__dot-wrap {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.125rem;
        height: 1.125rem;
        margin-top: 0.125rem;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: 50%;
        background: var(--eds-color-surface);
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-radio__input:focus-visible + .eds-radio__dot-wrap {
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-radio__input:checked + .eds-radio__dot-wrap {
        border-color: var(--eds-color-primary);
      }

      .eds-radio__dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: var(--eds-color-primary);
        opacity: 0;
        transform: scale(0.5);
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-radio__input:checked + .eds-radio__dot-wrap .eds-radio__dot {
        opacity: 1;
        transform: scale(1);
      }

      .eds-radio__label {
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-normal);
      }
    `,
  ],
})
export class EdsRadioComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() checked = false;
  @Input() name = '';

  @Output() checkedChange = new EventEmitter<boolean>();

  readonly inputId = `eds-radio-${EdsRadioComponent.nextId++}`;

  constructor(@Optional() @Host() private readonly group?: EdsRadioGroupComponent) {}

  get effectiveName(): string {
    return this.group?.name ?? this.name;
  }

  get effectiveChecked(): boolean {
    if (this.group) {
      return this.group.value === this.value;
    }
    return this.checked;
  }

  get effectiveDisabled(): boolean {
    return this.group?.disabled || this.disabled;
  }

  onChange(event: Event): void {
    if (this.group) {
      this.group.select(this.value, event);
      return;
    }
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.checkedChange.emit(this.checked);
  }
}
