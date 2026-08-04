import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { cx } from '../../utils/cx';
import { EdsMenuItemComponent } from './menu-item.component';

export type EdsDropdownMenuPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'eds-dropdown-menu',
  standalone: true,
  imports: [EdsMenuItemComponent],
  template: `
    <div class="trigger" (click)="toggle($event)">
      <ng-content select="[trigger]" />
    </div>
    <div
      [id]="menuId"
      [class]="menuClasses"
      role="menu"
      [attr.data-open]="open ? 'true' : 'false'"
      [hidden]="!open"
    >
      <ng-content />
    </div>
  `,
  styles: [
    `
      :host {
        position: relative;
        display: inline-block;
      }

      .trigger {
        display: inline-flex;
      }

      .menu {
        position: absolute;
        z-index: 1050;
        min-width: 11rem;
        margin: 0;
        padding: var(--eds-space-1);
        list-style: none;
        border: 1px solid var(--eds-color-border-strong);
        border-radius: var(--eds-radius-md);
        background: var(--eds-color-surface);
        box-shadow: var(--eds-shadow-md);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(4px);
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          visibility var(--eds-duration-fast) var(--eds-easing-standard),
          transform var(--eds-duration-fast) var(--eds-easing-emphasized);
      }

      .menu[data-open='true'] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }

      .menu.placement-bottom {
        top: calc(100% + var(--eds-space-1));
        left: 0;
      }

      .menu.placement-top {
        bottom: calc(100% + var(--eds-space-1));
        left: 0;
        transform: translateY(-4px);
      }

      .menu.placement-top[data-open='true'] {
        transform: translateY(0);
      }

      .menu.placement-left {
        right: calc(100% + var(--eds-space-1));
        top: 0;
        transform: translateX(-4px);
      }

      .menu.placement-left[data-open='true'] {
        transform: translateX(0);
      }

      .menu.placement-right {
        left: calc(100% + var(--eds-space-1));
        top: 0;
        transform: translateX(4px);
      }

      .menu.placement-right[data-open='true'] {
        transform: translateX(0);
      }
    `,
  ],
})
export class EdsDropdownMenuComponent implements AfterContentInit {
  @Input() open = false;
  @Input() placement: EdsDropdownMenuPlacement = 'bottom';

  @Output() openChange = new EventEmitter<boolean>();
  @Output() itemSelect = new EventEmitter<{ value: string; label: string }>();

  @ContentChild('[trigger]', { read: ElementRef }) triggerRef?: ElementRef<HTMLElement>;
  @ContentChildren(EdsMenuItemComponent) menuItems!: QueryList<EdsMenuItemComponent>;

  readonly menuId = `eds-dropdown-menu-${Math.random().toString(36).slice(2, 9)}`;

  private activeIndex = -1;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get menuClasses(): string {
    return cx('menu', `placement-${this.placement}`);
  }

  ngAfterContentInit(): void {
    this.menuItems.forEach((item) => {
      item.itemSelect.subscribe((detail) => {
        this.itemSelect.emit(detail);
        this.close();
      });
    });
    this.syncTriggerAria();
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (!this.open) return;
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    const enabled = this.getEnabledItems();
    if (!enabled.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = this.activeIndex < enabled.length - 1 ? this.activeIndex + 1 : 0;
      this.setActiveIndex(next);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = this.activeIndex > 0 ? this.activeIndex - 1 : enabled.length - 1;
      this.setActiveIndex(prev);
    }
  }

  toggle(event: Event): void {
    event.stopPropagation();
    this.setOpen(!this.open);
  }

  close(): void {
    this.setOpen(false);
  }

  private setOpen(next: boolean): void {
    this.open = next;
    this.openChange.emit(next);
    this.syncTriggerAria();

    if (next) {
      const enabled = this.getEnabledItems();
      this.setActiveIndex(enabled.length ? 0 : -1);
    } else {
      this.setActiveIndex(-1);
    }
  }

  private getEnabledItems(): EdsMenuItemComponent[] {
    return this.menuItems?.filter((item) => !item.disabled) ?? [];
  }

  private setActiveIndex(index: number): void {
    const enabled = this.getEnabledItems();
    this.activeIndex = index;
    this.menuItems?.forEach((item) => {
      item.active = enabled[index] === item;
    });
  }

  private syncTriggerAria(): void {
    const trigger = this.triggerRef?.nativeElement;
    if (!trigger) return;
    trigger.setAttribute('aria-haspopup', 'menu');
    trigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    trigger.setAttribute('aria-controls', this.menuId);
  }
}
