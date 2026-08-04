import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { cx } from '../../utils/cx';

export interface EdsTreeNode {
  id: string;
  label: string;
  children?: EdsTreeNode[];
}

@Component({
  selector: 'eds-tree-view',
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    @if (!items.length) {
      <div [class]="rootClass"><div class="eds-tree-view__empty">No items</div></div>
    } @else {
      <div [class]="rootClass">
        <ul class="eds-tree-view__tree" role="tree" aria-label="Tree navigation">
          @for (node of items; track node.id) {
            <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: node }"></ng-container>
          }
        </ul>
      </div>
    }

    <ng-template #nodeTpl let-node>
      <li role="none">
        <div [class]="rowClass(node)" role="treeitem" tabindex="0"
          [attr.aria-selected]="selectedId === node.id"
          [attr.aria-expanded]="node.children?.length ? isExpanded(node.id) : null"
          (click)="selectNode(node.id)" (keydown)="onKeyDown($event, node)">
          @if (node.children?.length) {
            <button type="button" [class]="toggleClass(node.id)" aria-label="Toggle"
              (click)="toggleNode(node.id, $event)">▸</button>
          } @else {
            <span class="eds-tree-view__spacer" aria-hidden="true"></span>
          }
          <span class="eds-tree-view__label">{{ node.label }}</span>
        </div>
        @if (node.children?.length && isExpanded(node.id)) {
          <ul class="eds-tree-view__tree" role="group">
            @for (child of node.children; track child.id) {
              <ng-container *ngTemplateOutlet="nodeTpl; context: { $implicit: child }"></ng-container>
            }
          </ul>
        }
      </li>
    </ng-template>
  `,
  styles: [`
    :host { display: block; font-family: var(--eds-font-sans); }
    .eds-tree-view__tree { list-style: none; margin: 0; padding: 0; }
    .eds-tree-view__row { display: flex; align-items: center; gap: var(--eds-space-1); padding: var(--eds-space-1) var(--eds-space-2); border-radius: var(--eds-radius-sm); cursor: pointer; font-size: var(--eds-font-size-sm); }
    .eds-tree-view__row:hover { background: var(--eds-color-brand-50); }
    .eds-tree-view__row--selected { background: var(--eds-color-brand-50); color: var(--eds-color-primary); font-weight: var(--eds-font-weight-semibold); }
    .eds-tree-view__toggle { border: 0; background: transparent; cursor: pointer; padding: 0; width: 1rem; font-size: 0.65rem; transition: transform var(--eds-duration-fast) var(--eds-easing-standard); }
    .eds-tree-view__toggle--expanded { transform: rotate(90deg); }
    .eds-tree-view__spacer { width: 1rem; }
    .eds-tree-view__empty { padding: var(--eds-space-4); color: var(--eds-color-text-muted); font-size: var(--eds-font-size-sm); }
  `],
})
export class EdsTreeViewComponent {
  @Input() items: EdsTreeNode[] = [];
  @Input() selectedId = '';
  @Input() expandedIds: Record<string, boolean> = {};
  @Input() className = '';
  @Output() nodeSelect = new EventEmitter<string>();
  @Output() nodeToggle = new EventEmitter<{ id: string; expanded: boolean }>();

  internalExpanded: Record<string, boolean> = {};

  get rootClass(): string { return cx('eds-tree-view', this.className); }

  isExpanded(id: string): boolean { return this.expandedIds[id] ?? this.internalExpanded[id] ?? false; }

  rowClass(node: EdsTreeNode): string {
    return cx('eds-tree-view__row', this.selectedId === node.id && 'eds-tree-view__row--selected');
  }

  toggleClass(id: string): string {
    return cx('eds-tree-view__toggle', this.isExpanded(id) && 'eds-tree-view__toggle--expanded');
  }

  selectNode(id: string): void { this.selectedId = id; this.nodeSelect.emit(id); }

  toggleNode(id: string, event: Event): void {
    event.stopPropagation();
    const expanded = !this.isExpanded(id);
    this.internalExpanded[id] = expanded;
    this.nodeToggle.emit({ id, expanded });
  }

  onKeyDown(event: KeyboardEvent, node: EdsTreeNode): void {
    switch (event.key) {
      case 'Enter':
      case ' ': event.preventDefault(); this.selectNode(node.id); break;
      case 'ArrowRight':
        if (node.children?.length && !this.isExpanded(node.id)) { event.preventDefault(); this.toggleNode(node.id, event); }
        break;
      case 'ArrowLeft':
        if (node.children?.length && this.isExpanded(node.id)) { event.preventDefault(); this.toggleNode(node.id, event); }
        break;
    }
  }
}
