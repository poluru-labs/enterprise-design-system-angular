import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EDS_FIELD_STYLES } from '../_field-styles';

@Component({
  selector: 'eds-slider',
  standalone: true,
  template: `
    <div class="eds-field">
      <div class="eds-slider__header">
        @if (label) {
          <label class="eds-label" [for]="sliderId">{{ label }}</label>
        } @else {
          <span></span>
        }
        @if (showValue) {
          <span class="eds-slider__value">{{ value }}</span>
        }
      </div>
      <input
        class="eds-slider__input"
        type="range"
        [id]="sliderId"
        [min]="min"
        [max]="max"
        [step]="step"
        [value]="value"
        [disabled]="disabled"
        [attr.aria-valuemin]="min"
        [attr.aria-valuemax]="max"
        [attr.aria-valuenow]="value"
        (input)="onInput($event)"
        (change)="onChange($event)"
      />
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-slider__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--eds-space-3);
      }

      .eds-slider__value {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-primary);
        font-variant-numeric: tabular-nums;
      }

      .eds-slider__input {
        width: 100%;
        margin: var(--eds-space-2) 0 0;
        accent-color: var(--eds-color-primary);
        cursor: pointer;
      }

      .eds-slider__input:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .eds-slider__input:focus-visible {
        outline: none;
      }

      .eds-slider__input:focus-visible::-webkit-slider-thumb {
        box-shadow: var(--eds-shadow-focus);
      }
    `,
  ],
})
export class EdsSliderComponent {
  private static nextId = 0;

  @Input() label = '';
  @Input() min = 0;
  @Input() max = 100;
  @Input() step = 1;
  @Input() value = 50;
  @Input() disabled = false;
  @Input() showValue = false;

  @Output() valueChange = new EventEmitter<number>();
  @Output() changed = new EventEmitter<number>();

  readonly sliderId = `eds-slider-${EdsSliderComponent.nextId++}`;

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = Number(target.value);
    this.valueChange.emit(this.value);
  }

  onChange(event: Event): void {
    this.changed.emit(this.value);
  }
}
