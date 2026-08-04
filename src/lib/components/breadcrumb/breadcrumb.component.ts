import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsBreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'eds-breadcrumb',
  standalone: true,
  template: `
    <nav [class]="rootClass" aria-label="Breadcrumb">
      <ol class="eds-breadcrumb__list">
        @for (item of resolvedItems; track item.label; let last = $last) {
          <li class="eds-breadcrumb__item">
            @if (!last && item.href) {
              <a class="eds-breadcrumb__link" [href]="item.href">{{ item.label }}</a>
            } @else {
              <span [class]="last ? 'eds-breadcrumb__current' : 'eds-breadcrumb__link'" [attr.aria-current]="last ? 'page' : null">{{ item.label }}</span>
            }
            @if (!last) { <span class="eds-breadcrumb__sep" aria-hidden="true">/</span> }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host { display: block; }
    .eds-breadcrumb__list { display: flex; flex-wrap: wrap; align-items: center; gap: var(--eds-space-1); margin: 0; padding: 0; list-style: none; font-size: var(--eds-font-size-sm); }
    .eds-breadcrumb__item { display: inline-flex; align-items: center; gap: var(--eds-space-1); }
    .eds-breadcrumb__link { color: var(--eds-color-text-muted); text-decoration: none; }
    .eds-breadcrumb__link:hover { color: var(--eds-color-primary); }
    .eds-breadcrumb__current { color: var(--eds-color-text); font-weight: var(--eds-font-weight-semibold); }
    .eds-breadcrumb__sep { color: var(--eds-color-text-subtle); }
  `],
})
export class EdsBreadcrumbComponent {
  @Input() items: EdsBreadcrumbItem[] = [];
  @Input() className = '';
  get rootClass(): string { return cx('eds-breadcrumb', this.className); }
  get resolvedItems(): EdsBreadcrumbItem[] { return this.items; }
}
