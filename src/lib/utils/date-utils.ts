/** Parse a YYYY-MM-DD string into a local Date, or null if invalid. */
export function parseISODate(iso: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

/** Format a Date as a YYYY-MM-DD string. */
export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Format an ISO date string for display using the locale short date style. */
export function formatDisplayDate(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return '';
  return date.toLocaleDateString(undefined, { dateStyle: 'short' });
}

/** Compare two ISO date strings. Returns negative if a < b, 0 if equal, positive if a > b. */
export function compareISODates(a: string, b: string): number {
  return a.localeCompare(b);
}

/** Check whether an ISO date falls within optional min/max bounds (inclusive). */
export function isISODateInRange(iso: string, min?: string, max?: string): boolean {
  if (min && compareISODates(iso, min) < 0) return false;
  if (max && compareISODates(iso, max) > 0) return false;
  return true;
}

export interface CalendarDay {
  iso: string;
  day: number;
  inMonth: boolean;
}

/** Build a 6-row calendar grid for the given month. */
export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const firstOfMonth = new Date(year, month, 1);
  const leading = firstOfMonth.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells: CalendarDay[] = [];

  for (let index = leading - 1; index >= 0; index--) {
    const day = daysInPrevMonth - index;
    const date = new Date(year, month - 1, day);
    cells.push({ iso: toISODate(date), day, inMonth: false });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push({ iso: toISODate(date), day, inMonth: true });
  }

  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    const date = new Date(year, month + 1, nextDay);
    cells.push({ iso: toISODate(date), day: nextDay, inMonth: false });
    nextDay += 1;
  }

  return cells;
}

/** Localized narrow weekday labels starting on Sunday. */
export function getWeekdayLabels(): string[] {
  const labels: string[] = [];
  const base = new Date(2025, 0, 5);

  for (let index = 0; index < 7; index++) {
    const date = new Date(base);
    date.setDate(base.getDate() + index);
    labels.push(date.toLocaleDateString(undefined, { weekday: 'narrow' }));
  }

  return labels;
}

/** Month and year label for calendar header. */
export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });
}

/** ISO string for today in local time. */
export function todayISO(): string {
  return toISODate(new Date());
}
