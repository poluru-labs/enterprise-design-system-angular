import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { EDS_FIELD_STYLES } from '../_field-styles';

export type EdsPinInputType = 'text' | 'number' | 'password';

@Component({
  selector: 'eds-pin-input',
  standalone: true,
  template: `
    <div class="eds-field">
      @if (label) {
        <label class="eds-label" [id]="groupId + '-label'">{{ label }}</label>
      }
      <div
        class="eds-pin-input__inputs"
        role="group"
        [attr.aria-labelledby]="label ? groupId + '-label' : null"
        [attr.aria-invalid]="invalid ? 'true' : 'false'"
        [attr.aria-describedby]="invalid && errorMessage ? groupId + '-error' : null"
        (paste)="onPaste($event)"
      >
        @for (index of cellIndices; track index) {
          <input
            #cell
            class="eds-pin-input__cell"
            [type]="inputType"
            [attr.inputmode]="inputMode"
            maxlength="1"
            [autocomplete]="index === 0 ? 'one-time-code' : 'off'"
            [value]="cellValue(index)"
            [disabled]="disabled"
            [class.eds-pin-input__cell--invalid]="invalid"
            [attr.aria-label]="'Digit ' + (index + 1) + ' of ' + length"
            (input)="onCellInput(index, $event)"
            (keydown)="onCellKeyDown(index, $event)"
          />
        }
      </div>
      @if (invalid && errorMessage) {
        <span class="eds-error" [id]="groupId + '-error'">{{ errorMessage }}</span>
      }
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-pin-input__inputs {
        display: flex;
        align-items: center;
        gap: var(--eds-space-2);
      }

      .eds-pin-input__cell {
        width: 2.75rem;
        height: 2.75rem;
        padding: 0;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        color: var(--eds-color-text);
        font: inherit;
        font-size: var(--eds-font-size-lg);
        font-weight: var(--eds-font-weight-semibold);
        text-align: center;
        transition:
          border-color var(--eds-duration-fast) var(--eds-easing-standard),
          box-shadow var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .eds-pin-input__cell:hover:not(:disabled) {
        border-color: var(--eds-color-ink-400);
      }

      .eds-pin-input__cell:focus {
        outline: none;
        border-color: var(--eds-color-primary);
        box-shadow: var(--eds-shadow-focus);
      }

      .eds-pin-input__cell:disabled {
        opacity: 0.55;
        cursor: not-allowed;
        background: var(--eds-color-ink-50);
      }

      .eds-pin-input__cell--invalid {
        border-color: var(--eds-color-danger-600);
      }
    `,
  ],
})
export class EdsPinInputComponent implements AfterViewInit {
  private static nextGroupId = 0;

  @Input() length = 6;
  @Input() value = '';
  @Input() disabled = false;
  @Input() type: EdsPinInputType = 'text';
  @Input() label = '';
  @Input() invalid = false;
  @Input() errorMessage = '';

  @Output() valueChange = new EventEmitter<string>();
  @Output() completed = new EventEmitter<string>();

  @ViewChildren('cell') cellRefs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly groupId = `eds-pin-input-${EdsPinInputComponent.nextGroupId++}`;

  get cellIndices(): number[] {
    return Array.from({ length: this.length }, (_, i) => i);
  }

  get inputType(): string {
    return this.type === 'number' ? 'text' : this.type;
  }

  get inputMode(): string | null {
    return this.type === 'number' ? 'numeric' : null;
  }

  ngAfterViewInit(): void {
    this.syncCellsFromValue();
  }

  cellValue(index: number): string {
    return this.value[index] ?? '';
  }

  onCellInput(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const char = target.value.slice(-1);

    if (this.type === 'number' && char && !/^\d$/.test(char)) {
      target.value = '';
      return;
    }

    target.value = char;
    this.syncValueFromCells();

    if (char && index < this.length - 1) {
      this.focusCell(index + 1);
    }
  }

  onCellKeyDown(index: number, event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Backspace' && !target.value && index > 0) {
      event.preventDefault();
      this.focusCell(index - 1);
      return;
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault();
      this.focusCell(index - 1);
      return;
    }

    if (event.key === 'ArrowRight' && index < this.length - 1) {
      event.preventDefault();
      this.focusCell(index + 1);
    }
  }

  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text') ?? '';
    const chars = pasted.slice(0, this.length).split('');

    if (this.type === 'number' && chars.some((char) => !/^\d$/.test(char))) {
      return;
    }

    const cells = this.cellRefs.toArray();
    chars.forEach((char, index) => {
      if (cells[index]) {
        cells[index].nativeElement.value = char;
      }
    });

    this.syncValueFromCells();
    this.focusCell(Math.min(chars.length, this.length - 1));
  }

  private syncValueFromCells(): void {
    const cells = this.cellRefs?.toArray() ?? [];
    this.value = cells.map((cell) => cell.nativeElement.value).join('');
    this.valueChange.emit(this.value);
    if (this.value.length === this.length) {
      this.completed.emit(this.value);
    }
  }

  private syncCellsFromValue(): void {
    const cells = this.cellRefs?.toArray() ?? [];
    cells.forEach((cell, index) => {
      cell.nativeElement.value = this.value[index] ?? '';
    });
  }

  private focusCell(index: number): void {
    const cell = this.cellRefs?.toArray()[index]?.nativeElement;
    cell?.focus();
    cell?.select();
  }
}
