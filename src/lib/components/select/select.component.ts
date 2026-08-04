import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';

export type EdsSelectOption = { label: string; value: string; disabled?: boolean };
export type EdsSelectSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-select',
  standalone: true,
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="selectId">{{ label }}</label>
      }
      <div [class]="controlClass">
        <select
          class="eds-select__control"
          [id]="selectId"
          [value]="value"
          [disabled]="disabled"
          [required]="required"
          [attr.aria-invalid]="invalid ? 'true' : 'false'"
          [attr.aria-describedby]="describedBy || null"
          (change)="onChange($event)"
        >
          @if (placeholder) {
            <option value="" [disabled]="true" [selected]="!value">{{ placeholder }}</option>
          }
          @for (option of options; track option.value) {
            <option [value]="option.value" [disabled]="option.disabled ?? false">
              {{ option.label }}
            </option>
          }
        </select>
      </div>
      @if (invalid && errorMessage) {
        <span class="eds-error" [id]="selectId + '-error'">{{ errorMessage }}</span>
      } @else if (hint) {
        <span class="eds-hint" [id]="selectId + '-hint'">{{ hint }}</span>
      }
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-select__control {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        min-height: unset;
        cursor: pointer;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23525252' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 0 center;
        padding-right: 1.5rem;
      }

      .eds-select__control:focus,
      .eds-select__control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      .eds-select__control:disabled {
        cursor: not-allowed;
      }
    `,
  ],
})
export class EdsSelectComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = '';
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Input() hint = '';
  @Input() size: EdsSelectSize = 'md';
  @Input() options: EdsSelectOption[] = [];

  @Output() valueChange = new EventEmitter<string>();

  readonly selectId = `eds-select-${EdsSelectComponent.nextId++}`;

  get controlClass(): string {
    return cx(
      'eds-control',
      `eds-control--${this.size}`,
      this.invalid && 'eds-control--invalid',
      this.disabled && 'eds-control--disabled',
    );
  }

  get describedBy(): string | undefined {
    if (this.invalid && this.errorMessage) return `${this.selectId}-error`;
    if (this.hint) return `${this.selectId}-hint`;
    return undefined;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
