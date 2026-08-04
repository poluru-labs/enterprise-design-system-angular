import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';
import { EdsIconComponent } from '../icon/icon.component';

export type EdsNumberInputSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-number-input',
  standalone: true,
  imports: [EdsIconComponent],
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [for]="inputId">{{ label }}</label>
      }
      <div [class]="wrapperClass">
        <button
          class="eds-number-input__stepper"
          type="button"
          aria-label="Decrease value"
          [disabled]="!canDecrement"
          (click)="decrement($event)"
        >
          <eds-icon name="minus" [size]="iconSize"></eds-icon>
        </button>
        <span class="eds-number-input__divider" aria-hidden="true"></span>
        <input
          class="eds-number-input__control"
          [id]="inputId"
          type="number"
          [value]="value"
          [min]="finiteMin ? min : null"
          [max]="finiteMax ? max : null"
          [step]="step"
          [disabled]="disabled"
          [attr.aria-invalid]="invalid ? 'true' : 'false'"
          [attr.aria-describedby]="describedBy || null"
          (input)="onInput($event)"
          (change)="onChange($event)"
        />
        <span class="eds-number-input__divider" aria-hidden="true"></span>
        <button
          class="eds-number-input__stepper"
          type="button"
          aria-label="Increase value"
          [disabled]="!canIncrement"
          (click)="increment($event)"
        >
          <eds-icon name="plus" [size]="iconSize"></eds-icon>
        </button>
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
      .eds-number-input__wrapper {
        display: flex;
        align-items: stretch;
        width: 100%;
        padding: 0;
        overflow: hidden;
      }

      .eds-number-input__stepper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 2.5rem;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
        transition:
          background-color var(--eds-duration-fast) var(--eds-easing-standard),
          color var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-number-input__stepper:hover:not(:disabled) {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .eds-number-input__stepper:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-number-input__stepper:disabled {
        cursor: not-allowed;
        opacity: 0.45;
      }

      .eds-number-input__wrapper.eds-control--sm .eds-number-input__stepper {
        width: 2rem;
      }

      .eds-number-input__wrapper.eds-control--lg .eds-number-input__stepper {
        width: 3rem;
      }

      .eds-number-input__divider {
        width: 1px;
        align-self: stretch;
        background: var(--eds-color-border);
        flex-shrink: 0;
      }

      .eds-number-input__control {
        flex: 1;
        min-width: 0;
        width: 100%;
        border: 0;
        background: transparent;
        padding: 0 var(--eds-space-2);
        margin: 0;
        min-height: unset;
        color: inherit;
        font: inherit;
        text-align: center;
        font-variant-numeric: tabular-nums;
        -moz-appearance: textfield;
      }

      .eds-number-input__control::-webkit-outer-spin-button,
      .eds-number-input__control::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      .eds-number-input__control:focus,
      .eds-number-input__control:focus-visible {
        box-shadow: none;
        outline: none;
      }
    `,
  ],
})
export class EdsNumberInputComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() value = 0;
  @Input() min = Number.NEGATIVE_INFINITY;
  @Input() max = Number.POSITIVE_INFINITY;
  @Input() step = 1;
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() errorMessage = '';
  @Input() hint = '';
  @Input() size: EdsNumberInputSize = 'md';

  @Output() valueChange = new EventEmitter<number>();
  @Output() changed = new EventEmitter<number>();

  readonly inputId = `eds-number-input-${EdsNumberInputComponent.nextId++}`;

  get iconSize(): 'sm' | 'md' {
    return this.size === 'sm' ? 'sm' : 'md';
  }

  get finiteMin(): boolean {
    return Number.isFinite(this.min);
  }

  get finiteMax(): boolean {
    return Number.isFinite(this.max);
  }

  get wrapperClass(): string {
    return cx(
      'eds-control',
      'eds-number-input__wrapper',
      `eds-control--${this.size}`,
      this.invalid && 'eds-control--invalid',
      this.disabled && 'eds-control--disabled',
    );
  }

  get canDecrement(): boolean {
    return !this.disabled && this.value - this.step >= this.min;
  }

  get canIncrement(): boolean {
    return !this.disabled && this.value + this.step <= this.max;
  }

  get describedBy(): string | undefined {
    if (this.invalid && this.errorMessage) return `${this.inputId}-error`;
    if (this.hint) return `${this.inputId}-hint`;
    return undefined;
  }

  private clamp(value: number): number {
    return Math.min(this.max, Math.max(this.min, value));
  }

  private roundToStep(value: number): number {
    if (this.step <= 0) return value;
    const precision = (String(this.step).split('.')[1] ?? '').length;
    const rounded = Math.round((value - this.min) / this.step) * this.step + this.min;
    return Number(rounded.toFixed(precision));
  }

  private setValue(next: number, event: Event, emitInput = true): void {
    const normalized = this.clamp(this.roundToStep(next));
    if (normalized === this.value) return;
    this.value = normalized;
    if (emitInput) this.valueChange.emit(this.value);
    this.changed.emit(this.value);
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const parsed = target.value === '' ? 0 : Number(target.value);
    if (Number.isNaN(parsed)) return;
    this.value = this.clamp(parsed);
    this.valueChange.emit(this.value);
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const parsed = target.value === '' ? 0 : Number(target.value);
    if (!Number.isNaN(parsed)) {
      this.value = this.clamp(this.roundToStep(parsed));
    }
    this.changed.emit(this.value);
  }

  decrement(event: Event): void {
    this.setValue(this.value - this.step, event);
  }

  increment(event: Event): void {
    this.setValue(this.value + this.step, event);
  }
}
