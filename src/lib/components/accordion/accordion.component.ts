import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsAccordionItem {
  heading: string;
  content: string;
  open?: boolean;
  disabled?: boolean;
}

@Component({
  selector: 'eds-accordion',
  standalone: true,
  template: `
    <div [class]="rootClass">
      @for (item of items; track item.heading; let i = $index) {
        <div class="eds-accordion__item">
          <button type="button" class="eds-accordion__trigger" [attr.aria-expanded]="isOpen(i)"
            [disabled]="item.disabled" (click)="toggle(i)">
            <span class="eds-accordion__title">{{ item.heading }}</span>
            <span [class]="iconClass(i)" aria-hidden="true">▼</span>
          </button>
          <div [class]="panelClass(i)" [attr.aria-hidden]="!isOpen(i)">
            <div class="eds-accordion__inner">{{ item.content }}</div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-accordion { border: 1px solid var(--eds-color-border); border-radius: var(--eds-radius-lg); overflow: hidden; }
    .eds-accordion__item + .eds-accordion__item { border-top: 1px solid var(--eds-color-border); }
    .eds-accordion__trigger {
      display: flex; align-items: center; justify-content: space-between; width: 100%; padding: var(--eds-space-3) var(--eds-space-4);
      border: 0; background: var(--eds-color-surface); color: var(--eds-color-text); font: inherit; font-weight: var(--eds-font-weight-semibold);
      cursor: pointer; text-align: left;
    }
    .eds-accordion__trigger:hover:not(:disabled) { background: var(--eds-color-brand-50); }
    .eds-accordion__trigger:focus-visible { outline: none; box-shadow: inset var(--eds-shadow-focus); }
    .eds-accordion__trigger:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-accordion__icon { font-size: 0.65rem; transition: transform var(--eds-duration-fast) var(--eds-easing-standard); }
    .eds-accordion__icon--open { transform: rotate(180deg); }
    .eds-accordion__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows var(--eds-duration-normal) var(--eds-easing-standard); }
    .eds-accordion__panel--open { grid-template-rows: 1fr; }
    .eds-accordion__inner { overflow: hidden; padding: 0 var(--eds-space-4); color: var(--eds-color-text-muted); font-size: var(--eds-font-size-sm); }
    .eds-accordion__panel--open .eds-accordion__inner { padding-bottom: var(--eds-space-4); }
  `],
})
export class EdsAccordionComponent implements OnInit {
  @Input() items: EdsAccordionItem[] = [
    { heading: 'Section 1', content: 'Content for section 1.' },
    { heading: 'Section 2', content: 'Content for section 2.' },
  ];
  @Input() single = false;
  @Input() className = '';
  @Output() openChange = new EventEmitter<string[]>();

  openSet = new Set<number>();

  ngOnInit(): void {
    this.items.forEach((item, i) => { if (item.open) this.openSet.add(i); });
  }

  get rootClass(): string { return cx('eds-accordion', this.className); }
  isOpen(index: number): boolean { return this.openSet.has(index); }
  iconClass(index: number): string { return cx('eds-accordion__icon', this.isOpen(index) && 'eds-accordion__icon--open'); }
  panelClass(index: number): string { return cx('eds-accordion__panel', this.isOpen(index) && 'eds-accordion__panel--open'); }

  toggle(index: number): void {
    if (this.items[index]?.disabled) return;
    if (this.single) this.openSet.clear();
    if (this.openSet.has(index)) this.openSet.delete(index);
    else this.openSet.add(index);
    this.openChange.emit(this.items.filter((_, i) => this.openSet.has(i)).map((item) => item.heading));
  }
}
