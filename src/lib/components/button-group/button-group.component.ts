import { Component, ContentChildren, Input, QueryList, AfterContentInit } from '@angular/core';
import { cx } from '../../utils/cx';
import { EdsButtonComponent, EdsButtonSize } from '../button/button.component';

@Component({
  selector: 'eds-button-group',
  standalone: true,
  imports: [EdsButtonComponent],
  template: `<div [class]="rootClass" role="group"><ng-content></ng-content></div>`,
  styles: [`
    :host { display: inline-block; }
    .eds-button-group { display: inline-flex; }
    .eds-button-group--horizontal ::ng-deep eds-button + eds-button .eds-button { border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -1px; }
    .eds-button-group--vertical { flex-direction: column; }
    .eds-button-group--vertical ::ng-deep eds-button + eds-button .eds-button { border-top-left-radius: 0; border-top-right-radius: 0; margin-top: -1px; }
  `],
})
export class EdsButtonGroupComponent implements AfterContentInit {
  @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';
  @Input() size: EdsButtonSize = 'md';
  @Input() className = '';

  @ContentChildren(EdsButtonComponent) buttons!: QueryList<EdsButtonComponent>;

  get rootClass(): string { return cx('eds-button-group', `eds-button-group--${this.orientation}`, this.className); }

  ngAfterContentInit(): void {
    this.applySize();
    this.buttons.changes.subscribe(() => this.applySize());
  }

  private applySize(): void {
    this.buttons?.forEach((btn) => { btn.size = this.size; });
  }
}
