import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  compareISODates,
  formatDisplayDate,
  parseISODate,
  toISODate,
} from '../../utils/date-utils';
import { cx } from '../../utils/cx';
import { EDS_FIELD_STYLES } from '../_field-styles';
import { EdsCalendarPopoverComponent } from '../_shared/calendar-popover.component';

function canNavigateToMonth(year: number, month: number, min?: string, max?: string): boolean {
  const first = toISODate(new Date(year, month, 1));
  const last = toISODate(new Date(year, month + 1, 0));
  if (min && compareISODates(last, min) < 0) return false;
  if (max && compareISODates(first, max) > 0) return false;
  return true;
}

function formatRangeDisplay(start: string, end: string): string {
  if (start && end) return `${formatDisplayDate(start)} – ${formatDisplayDate(end)}`;
  if (start) return `${formatDisplayDate(start)} –`;
  return '';
}

@Component({
  selector: 'eds-date-range-picker',
  standalone: true,
  imports: [EdsCalendarPopoverComponent],
  template: `
    <div [class]="rootClass">
      @if (label) {
        <label class="eds-label" [attr.for]="fieldId">{{ label }}</label>
      }
      <div
        [class]="triggerClass"
        [attr.aria-disabled]="disabled ? 'true' : 'false'"
      >
        <input
          #inputRef
          class="eds-date-range-picker__input"
          [id]="fieldId"
          type="text"
          [value]="displayValue"
          placeholder="Select date range"
          readonly
          [disabled]="disabled"
          [attr.aria-haspopup]="'dialog'"
          [attr.aria-expanded]="open"
          (click)="openPopover()"
          (keydown)="onInputKeyDown($event)"
        />
        <button
          type="button"
          class="eds-date-range-picker__icon-btn"
          aria-label="Open calendar"
          [disabled]="disabled"
          (click)="togglePopover($event)"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.5 2.5V4M11.5 2.5V4M3 6.5H13M4 3.5H12C12.5523 3.5 13 3.94772 13 4.5V12.5C13 13.0523 12.5523 13.5 12 13.5H4C3.44772 13.5 3 13.0523 3 12.5V4.5C3 3.94772 3.44772 3.5 4 3.5Z"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      @if (open) {
        <eds-calendar-popover
          ariaLabel="Choose date range"
          [viewYear]="viewYear"
          [viewMonth]="viewMonth"
          [min]="min"
          [max]="max"
          [startValue]="displayStart"
          [endValue]="endValue"
          [hoverEnd]="selectingEnd ? hoverEnd : ''"
          (onPrevMonth)="goToPreviousMonth()"
          (onNextMonth)="goToNextMonth()"
          (onSelect)="selectDate($event)"
          (onDayHover)="onDayHover($event)"
        />
      }
    </div>
  `,
  styles: [
    EDS_FIELD_STYLES,
    `
      .eds-date-range-picker {
        position: relative;
      }

      .eds-date-range-picker__trigger {
        position: relative;
        cursor: pointer;
      }

      .eds-date-range-picker__input {
        flex: 1;
        min-width: 0;
        border: 0;
        padding: 0;
        margin: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        outline: none;
        cursor: inherit;
      }

      .eds-date-range-picker__icon-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 1.75rem;
        height: 1.75rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-sm);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
      }

      .eds-date-range-picker__icon-btn:hover:not(:disabled) {
        background: var(--eds-color-ink-100);
      }

      .eds-date-range-picker__icon-btn:focus-visible {
        outline: none;
        box-shadow: var(--eds-shadow-focus);
      }
    `,
  ],
})
export class EdsDateRangePickerComponent implements OnChanges {
  private static nextId = 0;

  @Input() label = '';
  @Input() startValue = '';
  @Input() endValue = '';
  @Input() min?: string;
  @Input() max?: string;
  @Input() disabled = false;
  @Input() className = '';

  @Output() rangeChange = new EventEmitter<{ start: string; end: string }>();

  @ViewChild('inputRef') inputRef?: ElementRef<HTMLInputElement>;

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  open = false;
  viewYear = new Date().getFullYear();
  viewMonth = new Date().getMonth();
  selectingEnd = false;
  pendingStart = '';
  hoverEnd = '';

  readonly fieldId = `eds-date-range-picker-${EdsDateRangePickerComponent.nextId++}`;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['startValue'] || changes['endValue']) {
      this.syncView();
    }
  }

  get displayStart(): string {
    return this.pendingStart || this.startValue;
  }

  get displayValue(): string {
    return formatRangeDisplay(this.displayStart, this.endValue);
  }

  get rootClass(): string {
    return cx('eds-field', 'eds-date-range-picker', this.className);
  }

  get triggerClass(): string {
    return cx(
      'eds-control',
      'eds-date-range-picker__trigger',
      this.disabled && 'eds-control--disabled',
    );
  }

  syncView(): void {
    const iso = this.startValue || this.endValue;
    const parsed = parseISODate(iso);
    if (parsed) {
      this.viewYear = parsed.getFullYear();
      this.viewMonth = parsed.getMonth();
    }
  }

  openPopover(): void {
    if (this.disabled) return;
    this.selectingEnd = false;
    this.pendingStart = '';
    this.hoverEnd = '';
    this.syncView();
    this.open = true;
  }

  togglePopover(event: Event): void {
    event.stopPropagation();
    this.open ? (this.open = false) : this.openPopover();
  }

  goToPreviousMonth(): void {
    const date = new Date(this.viewYear, this.viewMonth - 1, 1);
    if (!canNavigateToMonth(date.getFullYear(), date.getMonth(), this.min, this.max)) return;
    this.viewYear = date.getFullYear();
    this.viewMonth = date.getMonth();
  }

  goToNextMonth(): void {
    const date = new Date(this.viewYear, this.viewMonth + 1, 1);
    if (!canNavigateToMonth(date.getFullYear(), date.getMonth(), this.min, this.max)) return;
    this.viewYear = date.getFullYear();
    this.viewMonth = date.getMonth();
  }

  selectDate(iso: string): void {
    if (!this.selectingEnd && !this.pendingStart) {
      this.pendingStart = iso;
      this.selectingEnd = true;
      return;
    }

    const start = this.pendingStart || this.startValue;
    let end = iso;
    let finalStart = start;
    if (compareISODates(start, end) > 0) {
      finalStart = end;
      end = start;
    }

    this.startValue = finalStart;
    this.endValue = end;
    this.rangeChange.emit({ start: finalStart, end });
    this.open = false;
    this.selectingEnd = false;
    this.pendingStart = '';
    this.hoverEnd = '';
    this.inputRef?.nativeElement.focus();
  }

  onDayHover(iso: string): void {
    if (this.selectingEnd) this.hoverEnd = iso;
  }

  onInputKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.openPopover();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.open || event.key !== 'Escape') return;
    event.preventDefault();
    this.open = false;
    this.inputRef?.nativeElement.focus();
  }

  @HostListener('document:pointerdown', ['$event'])
  onDocumentPointerDown(event: PointerEvent): void {
    if (!this.open) return;
    if (!this.hostRef.nativeElement.contains(event.target as Node)) {
      this.open = false;
    }
  }
}
