import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsTabItem {
  label: string;
  disabled?: boolean;
  content?: string;
}

@Component({
  selector: 'eds-tabs',
  standalone: true,
  template: `
    <div [class]="rootClass">
      <div class="eds-tabs__list" role="tablist" (keydown)="onKeyDown($event)">
        @for (tab of tabs; track tab.label; let i = $index) {
          <button type="button" [class]="tabClass(i)" role="tab"
            [id]="'eds-tab-' + i" [attr.aria-selected]="selectedIndex === i"
            [attr.aria-controls]="'eds-panel-' + i" [tabIndex]="selectedIndex === i ? 0 : -1"
            [disabled]="tab.disabled" (click)="selectTab(i)">{{ tab.label }}</button>
        }
      </div>
      @for (tab of tabs; track tab.label; let i = $index) {
        <div [class]="panelClass(i)" role="tabpanel" [id]="'eds-panel-' + i" [attr.aria-labelledby]="'eds-tab-' + i"
          [hidden]="selectedIndex !== i">
          @if (tab.content) {
            <span>{{ tab.content }}</span>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-tabs__list { display: flex; gap: var(--eds-space-1); border-bottom: 1px solid var(--eds-color-border); }
    .eds-tabs__tab {
      padding: var(--eds-space-2) var(--eds-space-4); border: 0; border-bottom: 2px solid transparent;
      background: transparent; color: var(--eds-color-text-muted); font: inherit; font-size: var(--eds-font-size-sm);
      font-weight: var(--eds-font-weight-medium); cursor: pointer; margin-bottom: -1px;
    }
    .eds-tabs__tab:hover:not(:disabled) { color: var(--eds-color-text); background: var(--eds-color-brand-50); }
    .eds-tabs__tab:focus-visible { outline: none; box-shadow: var(--eds-shadow-focus); }
    .eds-tabs__tab--selected { color: var(--eds-color-primary); border-bottom-color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-tabs__tab:disabled { opacity: 0.45; cursor: not-allowed; }
    .eds-tabs__panel { padding: var(--eds-space-4) 0; display: none; }
    .eds-tabs__panel--active { display: block; }
  `],
})
export class EdsTabsComponent {
  @Input() tabs: EdsTabItem[] = [
    { label: 'Overview', content: 'Overview content' },
    { label: 'Details', content: 'Details content' },
  ];
  @Input() selectedIndex = 0;
  @Input() className = '';
  @Output() selectedIndexChange = new EventEmitter<number>();
  @Output() tabChange = new EventEmitter<{ index: number; label?: string }>();

  get rootClass(): string { return cx('eds-tabs', this.className); }

  tabClass(index: number): string {
    return cx('eds-tabs__tab', this.selectedIndex === index && 'eds-tabs__tab--selected');
  }

  panelClass(index: number): string {
    return cx('eds-tabs__panel', this.selectedIndex === index && 'eds-tabs__panel--active');
  }

  get enabledIndexes(): number[] {
    return this.tabs.map((t, i) => ({ t, i })).filter(({ t }) => !t.disabled).map(({ i }) => i);
  }

  selectTab(index: number): void {
    const fallback = this.enabledIndexes[0] ?? 0;
    const next = this.tabs[index]?.disabled ? fallback : index;
    this.selectedIndex = next;
    this.selectedIndexChange.emit(next);
    this.tabChange.emit({ index: next, label: this.tabs[next]?.label });
  }

  onKeyDown(event: KeyboardEvent): void {
    const enabled = this.enabledIndexes;
    if (!enabled.length) return;
    const pos = enabled.indexOf(this.selectedIndex);
    let nextPos = pos;
    switch (event.key) {
      case 'ArrowRight': nextPos = (pos + 1) % enabled.length; break;
      case 'ArrowLeft': nextPos = (pos - 1 + enabled.length) % enabled.length; break;
      case 'Home': nextPos = 0; break;
      case 'End': nextPos = enabled.length - 1; break;
      default: return;
    }
    event.preventDefault();
    this.selectTab(enabled[nextPos]);
  }
}
