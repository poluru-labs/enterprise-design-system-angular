#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src/lib/components');

function w(rel, content) {
  const path = join(ROOT, rel);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function idx(folder) {
  const base = folder.split('/').pop();
  w(`${folder}/index.ts`, `export * from './${base}.component';\n`);
}

function spec(folder, cls, selector, extraTests = '') {
  const base = folder.split('/').pop();
  w(`${folder}/${base}.component.spec.ts`, `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ${cls} } from './${base}.component';

describe('${cls}', () => {
  let fixture: ComponentFixture<${cls}>;
  let component: ${cls};

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [${cls}] }).compileComponents();
    fixture = TestBed.createComponent(${cls});
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render host', () => {
    expect(fixture.nativeElement).toBeTruthy();
  });
${extraTests}
});
`);
}

function stories(folder, title, cls, template, argsBlock = '') {
  const base = folder.split('/').pop();
  w(`${folder}/${base}.stories.ts`, `import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { ${cls} } from './${base}.component';

const meta: Meta<${cls}> = {
  title: 'Components/${title}',
  component: ${cls},
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [${cls}] })],
${argsBlock}  render: (args) => ({ props: args, template: \`${template}\` }),
};

export default meta;
type Story = StoryObj<${cls}>;

export const Default: Story = {};
`);
}

// --- Calendar Popover ---
w('_shared/calendar-popover.component.ts', `import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  compareISODates,
  formatDisplayDate,
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  isISODateInRange,
  todayISO,
  toISODate,
} from '../../utils/date-utils';
import { cx } from '../../utils/cx';

function canNavigateToMonth(year: number, month: number, min?: string, max?: string): boolean {
  const first = toISODate(new Date(year, month, 1));
  const last = toISODate(new Date(year, month + 1, 0));
  if (min && compareISODates(last, min) < 0) return false;
  if (max && compareISODates(first, max) > 0) return false;
  return true;
}

function isInPreviewRange(iso: string, start?: string, end?: string): boolean {
  if (!start || !end) return false;
  const [a, b] = compareISODates(start, end) <= 0 ? [start, end] : [end, start];
  return compareISODates(iso, a) >= 0 && compareISODates(iso, b) <= 0;
}

@Component({
  selector: 'eds-calendar-popover',
  standalone: true,
  template: \`
    <div class="eds-calendar" role="dialog" [attr.aria-label]="ariaLabel">
      <div class="eds-calendar__header">
        <button type="button" class="eds-calendar__nav" aria-label="Previous month"
          [disabled]="prevDisabled" (click)="onPrevMonth.emit()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
          </svg>
        </button>
        <div class="eds-calendar__month">{{ monthLabel }}</div>
        <button type="button" class="eds-calendar__nav" aria-label="Next month"
          [disabled]="nextDisabled" (click)="onNextMonth.emit()">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
          </svg>
        </button>
      </div>
      <div class="eds-calendar__weekdays" aria-hidden="true">
        @for (wd of weekdays; track wd) {
          <span class="eds-calendar__weekday">{{ wd }}</span>
        }
      </div>
      <div class="eds-calendar__days" role="grid" [attr.aria-label]="monthLabel">
        @for (cell of days; track cell.iso) {
          <button type="button" [class]="dayClass(cell)" role="gridcell"
            [attr.aria-selected]="isDaySelected(cell.iso) ? true : null"
            [attr.aria-label]="formatDisplayDate(cell.iso)"
            [disabled]="!isISODateInRange(cell.iso, min, max)"
            (click)="onSelect.emit(cell.iso)"
            (mouseenter)="onDayHover.emit(cell.iso)">
            {{ cell.day }}
          </button>
        }
      </div>
    </div>
  \`,
  styles: [\`
    :host { display: block; }
    .eds-calendar {
      position: absolute; top: calc(100% + var(--eds-space-1)); left: 0; z-index: 200;
      min-width: 17.5rem; padding: var(--eds-space-3);
      background: var(--eds-color-surface); border: 1px solid var(--eds-color-border);
      border-radius: var(--eds-radius-lg); box-shadow: var(--eds-shadow-md);
    }
    .eds-calendar__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--eds-space-3); }
    .eds-calendar__month { flex: 1; text-align: center; font-size: var(--eds-font-size-sm); font-weight: var(--eds-font-weight-semibold); }
    .eds-calendar__nav {
      display: inline-flex; align-items: center; justify-content: center;
      width: 2rem; height: 2rem; border: 0; border-radius: var(--eds-radius-md);
      background: transparent; color: var(--eds-color-text-muted); cursor: pointer;
    }
    .eds-calendar__nav:hover:not(:disabled) { background: var(--eds-color-ink-100); color: var(--eds-color-text); }
    .eds-calendar__nav:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-calendar__nav:disabled { opacity: 0.35; cursor: not-allowed; }
    .eds-calendar__weekdays, .eds-calendar__days { display: grid; grid-template-columns: repeat(7, 1fr); gap: var(--eds-space-1); }
    .eds-calendar__weekday { display: grid; place-items: center; height: 1.75rem; font-size: var(--eds-font-size-xs); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text-subtle); }
    .eds-calendar__day {
      display: grid; place-items: center; aspect-ratio: 1; border: 0; border-radius: var(--eds-radius-md);
      background: transparent; font-size: var(--eds-font-size-sm); cursor: pointer; color: var(--eds-color-text);
    }
    .eds-calendar__day:hover:not(:disabled) { background: var(--eds-color-brand-50); }
    .eds-calendar__day:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-calendar__day--outside { color: var(--eds-color-text-subtle); }
    .eds-calendar__day--today:not(.eds-calendar__day--selected) { box-shadow: inset 0 0 0 1px var(--eds-color-primary); }
    .eds-calendar__day--selected, .eds-calendar__day--range-start, .eds-calendar__day--range-end {
      background: var(--eds-color-primary); color: var(--eds-color-text-inverse);
    }
    .eds-calendar__day--in-range:not(.eds-calendar__day--selected) { background: var(--eds-color-brand-50); }
    .eds-calendar__day:disabled { opacity: 0.35; cursor: not-allowed; }
  \`],
})
export class EdsCalendarPopoverComponent {
  @Input() viewYear = new Date().getFullYear();
  @Input() viewMonth = new Date().getMonth();
  @Input() min?: string;
  @Input() max?: string;
  @Input() selected = '';
  @Input() startValue = '';
  @Input() endValue = '';
  @Input() hoverEnd = '';
  @Input() ariaLabel = 'Choose date';

  @Output() onPrevMonth = new EventEmitter<void>();
  @Output() onNextMonth = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();
  @Output() onDayHover = new EventEmitter<string>();

  readonly weekdays = getWeekdayLabels();
  readonly today = todayISO();
  readonly formatDisplayDate = formatDisplayDate;

  get days() { return getCalendarDays(this.viewYear, this.viewMonth); }
  get monthLabel() { return formatMonthYear(this.viewYear, this.viewMonth); }

  get prevDisabled(): boolean {
    const y = this.viewMonth === 0 ? this.viewYear - 1 : this.viewYear;
    const m = this.viewMonth === 0 ? 11 : this.viewMonth - 1;
    return !canNavigateToMonth(y, m, this.min, this.max);
  }

  get nextDisabled(): boolean {
    const y = this.viewMonth === 11 ? this.viewYear + 1 : this.viewYear;
    const m = this.viewMonth === 11 ? 0 : this.viewMonth + 1;
    return !canNavigateToMonth(y, m, this.min, this.max);
  }

  get previewEnd(): string {
    return this.hoverEnd && this.startValue && !this.endValue ? this.hoverEnd : this.endValue;
  }

  isDaySelected(iso: string): boolean {
    return this.selected === iso || this.startValue === iso || this.endValue === iso || this.hoverEnd === iso;
  }

  dayClass(cell: { iso: string; inMonth: boolean }): string {
    const previewEnd = this.previewEnd;
    const inRange = this.startValue && previewEnd ? isInPreviewRange(cell.iso, this.startValue, previewEnd) : false;
    return cx(
      'eds-calendar__day',
      !cell.inMonth && 'eds-calendar__day--outside',
      cell.iso === this.today && 'eds-calendar__day--today',
      this.selected === cell.iso && 'eds-calendar__day--selected',
      inRange && 'eds-calendar__day--in-range',
      this.startValue === cell.iso && 'eds-calendar__day--range-start',
      (this.endValue === cell.iso || this.hoverEnd === cell.iso) && 'eds-calendar__day--range-end',
    );
  }
}
`);

console.log('Calendar popover created');
