import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

export type EdsTooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Component({
  selector: 'eds-tooltip',
  standalone: true,
  template: `
    @if (content) {
      <div
        class="trigger"
        (mouseenter)="onTriggerEnter()"
        (mouseleave)="onTriggerLeave()"
        (focusin)="onTriggerEnter()"
        (focusout)="onTriggerLeave()"
      >
        <ng-content />
      </div>
      <div
        [id]="tooltipId"
        [class]="tooltipClasses"
        role="tooltip"
        [attr.data-visible]="visible ? 'true' : 'false'"
        [hidden]="!visible"
      >
        {{ content }}
      </div>
    } @else {
      <div class="trigger"><ng-content /></div>
    }
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

      .tooltip {
        position: absolute;
        z-index: 1100;
        max-width: 16rem;
        padding: var(--eds-space-2) var(--eds-space-3);
        border-radius: var(--eds-radius-sm);
        background: var(--eds-color-ink-900);
        color: var(--eds-color-text-inverse);
        font-size: var(--eds-font-size-sm);
        font-weight: var(--eds-font-weight-medium);
        line-height: var(--eds-line-height-normal);
        box-shadow: var(--eds-shadow-md);
        pointer-events: none;
        opacity: 0;
        visibility: hidden;
        transition:
          opacity var(--eds-duration-fast) var(--eds-easing-standard),
          visibility var(--eds-duration-fast) var(--eds-easing-standard);
      }

      .tooltip[data-visible='true'] {
        opacity: 1;
        visibility: visible;
      }

      .tooltip.placement-top {
        bottom: calc(100% + var(--eds-space-2));
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.placement-bottom {
        top: calc(100% + var(--eds-space-2));
        left: 50%;
        transform: translateX(-50%);
      }

      .tooltip.placement-left {
        right: calc(100% + var(--eds-space-2));
        top: 50%;
        transform: translateY(-50%);
      }

      .tooltip.placement-right {
        left: calc(100% + var(--eds-space-2));
        top: 50%;
        transform: translateY(-50%);
      }
    `,
  ],
})
export class EdsTooltipComponent {
  @Input() content = '';
  @Input() placement: EdsTooltipPlacement = 'top';
  @Input() delay = 200;

  readonly tooltipId = `eds-tooltip-${Math.random().toString(36).slice(2, 9)}`;

  visible = false;

  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  get tooltipClasses(): string {
    return cx('tooltip', `placement-${this.placement}`);
  }

  onTriggerEnter(): void {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
    if (this.delay <= 0) {
      this.visible = true;
      return;
    }
    this.showTimer = setTimeout(() => {
      this.visible = true;
    }, this.delay);
  }

  onTriggerLeave(): void {
    if (this.showTimer) {
      clearTimeout(this.showTimer);
      this.showTimer = null;
    }
    this.hideTimer = setTimeout(() => {
      this.visible = false;
    }, 50);
  }
}
