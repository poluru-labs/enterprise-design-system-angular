import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsPopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'eds-popover',
  standalone: true,
  template: `
    <div class="trigger" (click)="toggle($event)">
      <ng-content select="[trigger]" />
    </div>
    <div
      [id]="panelId"
      [class]="panelClasses"
      role="dialog"
      [attr.aria-labelledby]="heading ? headingId : null"
      [attr.data-open]="open ? 'true' : 'false'"
      [hidden]="!open"
    >
      @if (heading) {
        <h3 class="heading" [id]="headingId">{{ heading }}</h3>
      }
      <div class="body"><ng-content /></div>
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

      .panel {
        position: absolute;
        z-index: 1050;
        min-width: 12rem;
        max-width: 20rem;
        padding: var(--eds-space-4);
        border: 1px solid var(--eds-color-border);
        border-radius: var(--eds-radius-lg);
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

      .panel[data-open='true'] {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
      }

      .panel.placement-top {
        bottom: calc(100% + var(--eds-space-2));
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
      }

      .panel.placement-top[data-open='true'] {
        transform: translateX(-50%) translateY(0);
      }

      .panel.placement-bottom {
        top: calc(100% + var(--eds-space-2));
        left: 0;
      }

      .panel.placement-left {
        right: calc(100% + var(--eds-space-2));
        top: 0;
        transform: translateX(-4px);
      }

      .panel.placement-left[data-open='true'] {
        transform: translateX(0);
      }

      .panel.placement-right {
        left: calc(100% + var(--eds-space-2));
        top: 0;
        transform: translateX(4px);
      }

      .panel.placement-right[data-open='true'] {
        transform: translateX(0);
      }

      .heading {
        margin: 0 0 var(--eds-space-3);
        font-family: var(--eds-font-display);
        font-size: var(--eds-font-size-md);
        font-weight: var(--eds-font-weight-semibold);
        color: var(--eds-color-ink-950);
        line-height: var(--eds-line-height-snug);
      }

      .body {
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-sm);
        line-height: var(--eds-line-height-relaxed);
      }
    `,
  ],
})
export class EdsPopoverComponent implements AfterContentInit {
  @Input() open = false;
  @Input() placement: EdsPopoverPlacement = 'bottom';
  @Input() heading = '';

  @Output() openChange = new EventEmitter<boolean>();

  @ContentChild('[trigger]', { read: ElementRef }) triggerRef?: ElementRef<HTMLElement>;

  readonly panelId = `eds-popover-panel-${Math.random().toString(36).slice(2, 9)}`;
  readonly headingId = `${this.panelId}-heading`;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get panelClasses(): string {
    return cx('panel', `placement-${this.placement}`);
  }

  ngAfterContentInit(): void {
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
    if (!this.open || event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
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
  }

  private syncTriggerAria(): void {
    const trigger = this.triggerRef?.nativeElement;
    if (!trigger) return;
    trigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    trigger.setAttribute('aria-controls', this.panelId);
  }
}
