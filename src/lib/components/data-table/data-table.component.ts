import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsDataTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
}

export type EdsSortDirection = 'asc' | 'desc';

@Component({
  selector: 'eds-data-table',
  standalone: true,
  template: `
    <div [class]="rootClass">
      <div class="eds-data-table__wrapper">
        <table>
          <thead>
            <tr>
              @for (col of columns; track col.key) {
                <th scope="col">
                  @if (isSortable(col)) {
                    <button type="button" class="eds-data-table__sort-btn" [attr.aria-label]="'Sort by ' + col.label"
                      [attr.aria-sort]="sortKey === col.key ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'"
                      (click)="handleSort(col.key)">{{ col.label }} <span class="eds-data-table__sort-icon" aria-hidden="true">↕</span></button>
                  } @else { {{ col.label }} }
                </th>
              }
            </tr>
          </thead>
          <tbody>
            @if (rows.length) {
              @for (row of rows; track $index) {
                <tr>@for (col of columns; track col.key) { <td>{{ row[col.key] ?? '' }}</td> }</tr>
              }
            } @else {
              <tr><td class="eds-data-table__empty" [attr.colspan]="columns.length || 1">No data</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-data-table__wrapper { overflow-x: auto; border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-lg); }
    table { width: 100%; border-collapse: collapse; font-size: var(--eds-font-size-sm); }
    th, td { padding: var(--eds-space-3) var(--eds-space-4); text-align: left; border-bottom: 1px solid var(--eds-color-border); }
    th { background: var(--eds-color-ink-50); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text-muted); }
    tbody tr:hover { background: var(--eds-color-brand-50); }
    .eds-data-table--striped tbody tr:nth-child(even) { background: var(--eds-color-ink-50); }
    .eds-data-table--compact th, .eds-data-table--compact td { padding: var(--eds-space-2) var(--eds-space-3); }
    .eds-data-table__sort-btn { display: inline-flex; align-items: center; gap: var(--eds-space-1); border: 0; background: transparent; font: inherit; cursor: pointer; color: inherit; }
    .eds-data-table__empty { text-align: center; color: var(--eds-color-text-muted); padding: var(--eds-space-6); }
  `],
})
export class EdsDataTableComponent {
  @Input() columns: EdsDataTableColumn[] = [];
  @Input() rows: Record<string, string | number>[] = [];
  @Input() sortable = false;
  @Input() striped = false;
  @Input() compact = false;
  @Input() className = '';
  @Output() sortChange = new EventEmitter<{ key: string; direction: EdsSortDirection }>();

  sortKey = '';
  sortDirection: EdsSortDirection = 'asc';

  get rootClass(): string {
    return cx('eds-data-table', this.striped && 'eds-data-table--striped', this.compact && 'eds-data-table--compact', this.className);
  }

  isSortable(col: EdsDataTableColumn): boolean { return this.sortable && col.sortable !== false; }

  handleSort(key: string): void {
    const next: EdsSortDirection = this.sortKey === key && this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortKey = key;
    this.sortDirection = next;
    this.sortChange.emit({ key, direction: next });
  }
}
