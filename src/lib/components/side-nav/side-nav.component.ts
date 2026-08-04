import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsSideNavItem {
  label: string;
  href?: string;
  active?: boolean;
  children?: EdsSideNavItem[];
}

@Component({
  selector: 'eds-side-nav',
  standalone: true,
  template: `
    <nav [class]="rootClass" aria-label="Side navigation">
      <ul class="eds-side-nav__list">
        @for (item of items; track item.label) {
          <li class="eds-side-nav__item">
            @if (item.children?.length) {
              <button type="button" class="eds-side-nav__btn" (click)="toggleSection(item.label)">
                <span class="eds-side-nav__label">{{ item.label }}</span>
                @if (!collapsed) { <span aria-hidden="true">{{ isExpanded(item.label) ? '▾' : '▸' }}</span> }
              </button>
              @if (!collapsed && isExpanded(item.label)) {
                <ul class="eds-side-nav__children">
                  @for (child of item.children; track child.label) {
                    <li><a [class]="linkClass(child)" [href]="child.href || '#'" (click)="navigate(child, $event)">{{ child.label }}</a></li>
                  }
                </ul>
              }
            } @else {
              <a [class]="linkClass(item)" [href]="item.href || '#'" (click)="navigate(item, $event)">
                <span class="eds-side-nav__label">{{ item.label }}</span>
              </a>
            }
          </li>
        }
      </ul>
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .eds-side-nav { width: 14rem; padding: var(--eds-space-2); background: var(--eds-color-surface); border-right: 1px solid var(--eds-color-border); font-family: var(--eds-font-sans); }
    .eds-side-nav--collapsed { width: 3.5rem; }
    .eds-side-nav--collapsed .eds-side-nav__label { display: none; }
    .eds-side-nav__list { list-style: none; margin: 0; padding: 0; }
    .eds-side-nav__btn, .eds-side-nav__link { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: var(--eds-space-2) var(--eds-space-3); border-radius: var(--eds-radius-md); border: 0; background: transparent; color: var(--eds-color-text-muted); font: inherit; font-size: var(--eds-font-size-sm); text-decoration: none; cursor: pointer; }
    .eds-side-nav__link:hover, .eds-side-nav__btn:hover { background: var(--eds-color-brand-50); color: var(--eds-color-text); }
    .eds-side-nav__link--active { background: var(--eds-color-brand-50); color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-side-nav__children { list-style: none; margin: 0; padding-left: var(--eds-space-4); }
  `],
})
export class EdsSideNavComponent {
  @Input() items: EdsSideNavItem[] = [];
  @Input() collapsed = false;
  @Input() className = '';
  @Output() navigateEvent = new EventEmitter<{ label: string; href?: string }>();

  expanded = new Set<string>();

  get rootClass(): string { return cx('eds-side-nav', this.collapsed && 'eds-side-nav--collapsed', this.className); }

  linkClass(item: EdsSideNavItem): string {
    return cx('eds-side-nav__link', item.active && 'eds-side-nav__link--active');
  }

  isExpanded(label: string): boolean { return this.expanded.has(label); }

  toggleSection(label: string): void {
    if (this.expanded.has(label)) this.expanded.delete(label);
    else this.expanded.add(label);
  }

  navigate(item: EdsSideNavItem, event: Event): void {
    event.preventDefault();
    this.navigateEvent.emit({ label: item.label, href: item.href });
  }
}
