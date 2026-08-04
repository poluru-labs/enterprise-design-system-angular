import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsDescriptionListItem {
  term: string;
  description: string;
}

@Component({
  selector: 'eds-description-list',
  standalone: true,
  template: `
    <dl [class]="rootClass" [style.--eds-dl-columns]="columns">
      @if (items.length) {
        @for (item of items; track item.term) {
          <dt class="eds-dl__term" [class.eds-dl__term--compact]="compact">{{ item.term }}</dt>
          <dd class="eds-dl__desc" [class.eds-dl__desc--compact]="compact">{{ item.description }}</dd>
        }
      } @else {
        <div class="eds-dl__slotted"><ng-content></ng-content></div>
      }
    </dl>
  `,
  styles: [`
    :host { display: block; }
    .eds-dl { display: grid; grid-template-columns: repeat(var(--eds-dl-columns, 1), 1fr); gap: var(--eds-space-3) var(--eds-space-4); margin: 0; }
    .eds-dl__term { margin: 0; font-size: var(--eds-font-size-sm); font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text-muted); }
    .eds-dl__desc { margin: 0; font-size: var(--eds-font-size-sm); color: var(--eds-color-text); }
    .eds-dl__term--compact, .eds-dl__desc--compact { font-size: var(--eds-font-size-xs); }
    .eds-dl__slotted { display: contents; }
  `],
})
export class EdsDescriptionListComponent {
  @Input() items: EdsDescriptionListItem[] = [];
  @Input() columns: 1 | 2 | 3 = 1;
  @Input() compact = false;
  @Input() className = '';
  get rootClass(): string { return cx('eds-dl', this.className); }
}
