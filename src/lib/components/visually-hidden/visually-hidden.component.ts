import { Component, Input } from '@angular/core';
import { cx } from '../../utils/cx';

@Component({
  selector: 'eds-visually-hidden',
  standalone: true,
  template: `<span [class]="rootClass"><ng-content></ng-content></span>`,
  styles: [`
    :host { display: contents; }
    .eds-visually-hidden {
      position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
      overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }
  `],
})
export class EdsVisuallyHiddenComponent {
  @Input() className = '';
  get rootClass(): string { return cx('eds-visually-hidden', this.className); }
}
