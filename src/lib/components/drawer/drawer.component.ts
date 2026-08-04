import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsDrawerSide = 'left' | 'right';
export type EdsDrawerSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'eds-drawer',
  standalone: true,
  template: `
    <div
      class="backdrop"
      [attr.data-open]="open ? 'true' : 'false'"
      [hidden]="!open"
      (click)="onBackdropClick($event)"
    >
      @if (open) {
        <aside
          #panel
          [class]="panelClasses"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="titleId"
          tabindex="-1"
          (click)="$event.stopPropagation()"
        >
          <div class="header">
            <h2 class="title" [id]="titleId">{{ heading }}</h2>
            <button class="close" type="button" aria-label="Close panel" (click)="close()">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4 4L12 12M12 4L4 12"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <div class="body"><ng-content /></div>
          <div class="footer"><ng-content select="[footer]" /></div>
        </aside>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        z-index: 1000;
        background: linear-gradient(180deg, rgb(15 23 32 / 0.35), rgb(15 23 32 / 0.5));
        backdrop-filter: blur(2px);
        opacity: 0;
        pointer-events: none;
        transition: opacity var(--eds-duration-normal) var(--eds-easing-standard);
      }

      .backdrop[data-open='true'] {
        opacity: 1;
        pointer-events: auto;
      }

      .panel {
        position: fixed;
        top: 0;
        bottom: 0;
        z-index: 1001;
        display: flex;
        flex-direction: column;
        background: var(--eds-color-surface);
        border: 1px solid var(--eds-color-border);
        box-shadow: var(--eds-shadow-lg);
        transition: transform var(--eds-duration-normal) var(--eds-easing-emphasized);
      }

      .panel.side-right {
        right: 0;
        border-left-width: 1px;
        border-right-width: 0;
        transform: translateX(100%);
      }

      .panel.side-left {
        left: 0;
        border-right-width: 1px;
        border-left-width: 0;
        transform: translateX(-100%);
      }

      .backdrop[data-open='true'] .panel {
        transform: translateX(0);
      }

      .panel.sm {
        width: min(100%, 20rem);
      }

      .panel.md {
        width: min(100%, 28rem);
      }

      .panel.lg {
        width: min(100%, 36rem);
      }

      .header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: var(--eds-space-4);
        padding: var(--eds-space-5) var(--eds-space-5) var(--eds-space-3);
        border-bottom: 1px solid var(--eds-color-border);
      }

      .title {
        margin: 0;
        font-family: var(--eds-font-display);
        font-size: var(--eds-font-size-xl);
        font-weight: var(--eds-font-weight-semibold);
        letter-spacing: var(--eds-letter-spacing-tight);
        color: var(--eds-color-ink-950);
        line-height: var(--eds-line-height-snug);
      }

      .close {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin: 0;
        padding: 0;
        border: 0;
        border-radius: var(--eds-radius-md);
        background: transparent;
        color: var(--eds-color-text-muted);
        cursor: pointer;
      }

      .close:hover {
        background: var(--eds-color-ink-100);
        color: var(--eds-color-text);
      }

      .body {
        flex: 1;
        overflow: auto;
        padding: var(--eds-space-5);
        color: var(--eds-color-text-muted);
        font-size: var(--eds-font-size-md);
        line-height: var(--eds-line-height-relaxed);
      }

      .footer {
        display: flex;
        justify-content: flex-end;
        gap: var(--eds-space-2);
        padding: var(--eds-space-4) var(--eds-space-5);
        border-top: 1px solid var(--eds-color-border);
      }
    `,
  ],
})
export class EdsDrawerComponent implements OnChanges, OnDestroy {
  @Input() open = false;
  @Input() side: EdsDrawerSide = 'right';
  @Input() heading = 'Panel';
  @Input() size: EdsDrawerSize = 'md';

  @Output() openChange = new EventEmitter<boolean>();

  @ViewChild('panel') panelRef?: ElementRef<HTMLElement>;

  readonly titleId = `eds-drawer-title-${Math.random().toString(36).slice(2, 9)}`;

  private previouslyFocused: HTMLElement | null = null;

  get panelClasses(): string {
    return cx('panel', `side-${this.side}`, this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['open']) return;

    if (this.open) {
      this.previouslyFocused = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';
      queueMicrotask(() => this.panelRef?.nativeElement?.focus());
    } else if (changes['open'].previousValue === true) {
      document.body.style.overflow = '';
      this.previouslyFocused?.focus?.();
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.open || event.key !== 'Escape') return;
    event.preventDefault();
    this.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    if (!this.open) return;
    this.open = false;
    this.openChange.emit(false);
  }
}
