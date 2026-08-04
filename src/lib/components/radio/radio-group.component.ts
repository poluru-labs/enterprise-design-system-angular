import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsRadioGroupOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'eds-radio-group',
  standalone: true,
  template: `
    <fieldset [class]="groupClass">
      @if (label) {
        <legend class="eds-radio-group__label">{{ label }}</legend>
      }
      <div class="eds-radio-group__options">
        <ng-content></ng-content>
      </div>
    </fieldset>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: var(--eds-font-sans);
        color: var(--eds-color-text);
      }

      .eds-radio-group {
        display: flex;
        flex-direction: column;
        gap: var(--eds-space-3);
        border: 0;
        margin: 0;
        padding: 0;
      }

      .eds-radio-group--horizontal {
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--eds-space-4);
      }

      .eds-radio-group__label {
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-semibold);
        margin-bottom: var(--eds-space-1);
        padding: 0;
      }

      .eds-radio-group__options {
        display: flex;
        flex-direction: inherit;
        gap: inherit;
      }
    `,
  ],
})
export class EdsRadioGroupComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() value = '';
  @Input() disabled = false;
  @Input() orientation: EdsRadioGroupOrientation = 'vertical';

  @Output() valueChange = new EventEmitter<string>();

  get groupClass(): string {
    return cx(
      'eds-radio-group',
      this.orientation === 'horizontal' && 'eds-radio-group--horizontal',
    );
  }

  select(value: string, event: Event): void {
    this.value = value;
    this.valueChange.emit(this.value);
  }
}
