import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';

@Component({
  selector: 'eds-time-picker',
  standalone: true,
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="inputId">{{ label }}</label>
      }
      <div [class]="controlClass">
        <input
          class="eds-time-picker__control"
          [id]="inputId"
          type="time"
          [value]="value"
          [disabled]="disabled"
          [attr.aria-invalid]="invalid ? 'true' : 'false'"
          [attr.aria-describedby]="describedBy || null"
          (change)="onChange($event)"
        />
      </div>
      @if (invalid && errorMessage) {
        <span class="eds-error" [id]="inputId + '-error'">{{ errorMessage }}</span>
      } @else if (hint) {
        <span class="eds-hint" [id]="inputId + '-hint'">{{ hint }}</span>
      }
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-control {
        padding: 0 var(--eds-space-3);
      }

      .eds-time-picker__control {
        flex: 1;
        min-width: 0;
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0;
        margin: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
        font-variant-numeric: tabular-nums;
      }

      .eds-time-picker__control:focus,
      .eds-time-picker__control:focus-visible {
        box-shadow: none;
        outline: none;
      }

      .eds-time-picker__control::-webkit-calendar-picker-indicator {
        cursor: pointer;
        opacity: 0.65;
      }

      .eds-time-picker__control:hover:not(:disabled)::-webkit-calendar-picker-indicator {
        opacity: 1;
      }

      .eds-time-picker__control:disabled::-webkit-calendar-picker-indicator {
        cursor: not-allowed;
        opacity: 0.35;
      }
    `,
  ],
})
export class EdsTimePickerComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Input() hint = '';

  @Output() valueChange = new EventEmitter<string>();

  readonly inputId = `eds-time-picker-${EdsTimePickerComponent.nextId++}`;

  get controlClass(): string {
    return cx(
      'eds-control',
      this.invalid && 'eds-control--invalid',
      this.disabled && 'eds-control--disabled',
    );
  }

  get describedBy(): string | undefined {
    if (this.invalid && this.errorMessage) return `${this.inputId}-error`;
    if (this.hint) return `${this.inputId}-hint`;
    return undefined;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}
