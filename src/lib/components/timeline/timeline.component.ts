import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsTimelineStatus = 'complete' | 'current' | 'upcoming';

export interface EdsTimelineItem {
  title: string;
  description?: string;
  timestamp?: string;
  status?: EdsTimelineStatus;
}

@Component({
  selector: 'eds-timeline',
  standalone: true,
  template: `
    <ol [class]="rootClass">
      @for (item of resolvedItems; track item.title; let last = $last) {
        <li [class]="itemClass(item, last)">
          <div class="eds-timeline__track">
            <span class="eds-timeline__dot" aria-hidden="true"></span>
            @if (!last) { <span class="eds-timeline__connector" aria-hidden="true"></span> }
          </div>
          <div class="eds-timeline__content">
            <div class="eds-timeline__title">{{ item.title }}</div>
            @if (item.description) { <div class="eds-timeline__desc">{{ item.description }}</div> }
            @if (item.timestamp) { <div class="eds-timeline__time">{{ item.timestamp }}</div> }
          </div>
        </li>
      }
    </ol>
  `,
  styles: [`
    :host { display: block; }
    .eds-timeline { list-style: none; margin: 0; padding: 0; }
    .eds-timeline__item { display: flex; gap: var(--eds-space-3); padding-bottom: var(--eds-space-4); }
    .eds-timeline__track { display: flex; flex-direction: column; align-items: center; width: 1rem; }
    .eds-timeline__dot { width: 0.625rem; height: 0.625rem; border-radius: 50%; background: var(--eds-color-ink-300); flex-shrink: 0; margin-top: 0.35rem; }
    .eds-timeline__item--complete .eds-timeline__dot { background: var(--eds-color-success-600); }
    .eds-timeline__item--current .eds-timeline__dot { background: var(--eds-color-primary); box-shadow: 0 0 0 3px var(--eds-color-brand-50); }
    .eds-timeline__connector { flex: 1; width: 2px; background: var(--eds-color-border); margin-top: var(--eds-space-1); }
    .eds-timeline__title { font-weight: var(--eds-font-weight-semibold); color: var(--eds-color-text); }
    .eds-timeline__desc { font-size: var(--eds-font-size-sm); color: var(--eds-color-text-muted); margin-top: var(--eds-space-1); }
    .eds-timeline__time { font-size: var(--eds-font-size-xs); color: var(--eds-color-text-subtle); margin-top: var(--eds-space-1); }
  `],
})
export class EdsTimelineComponent {
  @Input() items: EdsTimelineItem[] = [];
  @Input() className = '';

  get rootClass(): string { return cx('eds-timeline', this.className); }

  get resolvedItems(): EdsTimelineItem[] {
    return this.items.map((item, index) => ({
      ...item,
      status: item.status ?? (index === 0 ? 'current' : 'upcoming'),
    }));
  }

  itemClass(item: EdsTimelineItem, last: boolean): string {
    return cx('eds-timeline__item', item.status && `eds-timeline__item--${item.status}`, last && 'eds-timeline__item--last');
  }
}
