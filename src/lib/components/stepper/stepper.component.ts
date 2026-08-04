import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsStepperStep {
  label: string;
  description?: string;
}

@Component({
  selector: 'eds-stepper',
  standalone: true,
  template: `
    <ol [class]="rootClass">
      @for (step of steps; track step.label; let i = $index; let last = $last) {
        <li [class]="stepClass(i)">
          <div class="eds-stepper__indicator-wrap">
            <button type="button" [class]="indicatorClass(i)" [disabled]="i > current"
              [attr.aria-label]="step.label" (click)="onStepClick(i)">
              @if (i < current) { ✓ } @else { {{ i + 1 }} }
            </button>
            @if (!last) { <span class="eds-stepper__connector" aria-hidden="true"></span> }
          </div>
          @if (orientation === 'vertical') {
            <div class="eds-stepper__content">
              <span class="eds-stepper__label">{{ step.label }}</span>
              @if (step.description) { <span class="eds-stepper__desc">{{ step.description }}</span> }
            </div>
          }
        </li>
      }
    </ol>
  `,
  styles: [`
    :host { display: block; }
    .eds-stepper { display: flex; list-style: none; margin: 0; padding: 0; gap: var(--eds-space-2); }
    .eds-stepper--vertical { flex-direction: column; }
    .eds-stepper__step { display: flex; align-items: flex-start; gap: var(--eds-space-3); flex: 1; }
    .eds-stepper--horizontal .eds-stepper__step { flex-direction: column; align-items: center; text-align: center; }
    .eds-stepper__indicator-wrap { display: flex; align-items: center; }
    .eds-stepper--horizontal .eds-stepper__indicator-wrap { width: 100%; }
    .eds-stepper__indicator {
      width: 2rem; height: 2rem; border-radius: 50%; border: 2px solid var(--eds-color-border);
      background: var(--eds-color-surface); color: var(--eds-color-text-muted); font-size: var(--eds-font-size-sm);
      font-weight: var(--eds-font-weight-semibold); cursor: default; flex-shrink: 0;
    }
    .eds-stepper__step--current .eds-stepper__indicator { border-color: var(--eds-color-primary); color: var(--eds-color-primary); }
    .eds-stepper__step--completed .eds-stepper__indicator { background: var(--eds-color-primary); border-color: var(--eds-color-primary); color: var(--eds-color-text-inverse); }
    .eds-stepper__indicator--clickable:not(:disabled) { cursor: pointer; }
    .eds-stepper__connector { flex: 1; height: 2px; background: var(--eds-color-border); margin: 0 var(--eds-space-2); min-width: 1rem; }
    .eds-stepper__label { font-weight: var(--eds-font-weight-semibold); font-size: var(--eds-font-size-sm); }
    .eds-stepper__desc { display: block; font-size: var(--eds-font-size-xs); color: var(--eds-color-text-muted); }
  `],
})
export class EdsStepperComponent {
  @Input() steps: EdsStepperStep[] = [];
  @Input() current = 0;
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() className = '';
  @Output() stepClick = new EventEmitter<number>();

  get rootClass(): string { return cx('eds-stepper', `eds-stepper--${this.orientation}`, this.className); }

  stepClass(index: number): string {
    return cx('eds-stepper__step', index < this.current && 'eds-stepper__step--completed', index === this.current && 'eds-stepper__step--current');
  }

  indicatorClass(index: number): string {
    return cx('eds-stepper__indicator', index <= this.current && 'eds-stepper__indicator--clickable');
  }

  onStepClick(index: number): void {
    if (index <= this.current) this.stepClick.emit(index);
  }
}
