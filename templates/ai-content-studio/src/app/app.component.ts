import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {
  EdsAvatarComponent,
  EdsBadgeComponent,
  EdsButtonComponent,
  EdsCardComponent,
  EdsDrawerComponent,
  EdsInputComponent,
  EdsListComponent,
  EdsModalComponent,
  EdsSearchComponent,
  EdsSelectComponent,
  EdsStepperComponent,
  EdsTextareaComponent,
  EdsToastComponent,
  EdsTooltipComponent,
  EdsVisuallyHiddenComponent,
  type EdsListItem,
  type EdsSelectOption,
  type EdsStepperStep
} from '@poluru-labs/enterprise-design-system-angular';
import { filter, fromEvent } from 'rxjs';
import { templateConfig } from './core/config/template.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    EdsAvatarComponent,
    EdsBadgeComponent,
    EdsButtonComponent,
    EdsCardComponent,
    EdsDrawerComponent,
    EdsInputComponent,
    EdsListComponent,
    EdsModalComponent,
    EdsSearchComponent,
    EdsSelectComponent,
    EdsStepperComponent,
    EdsTextareaComponent,
    EdsToastComponent,
    EdsTooltipComponent,
    EdsVisuallyHiddenComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="shell" [class.nav-open]="navOpen()">
      <eds-card class="sidebar" [elevated]="false" [padded]="false">
        <div class="sidebar-inner">
          <a class="logo" routerLink="/">
            <span class="logo-mark">{{ config.brand.mark }}</span>
            <div class="logo-copy">
              <strong>{{ config.brand.name }} {{ config.brand.accent }}</strong>
              <small>Poluru Labs</small>
            </div>
          </a>

          @for (group of config.navGroups; track group.label) {
            <p class="nav-label">{{ group.label }}</p>
            <nav class="nav">
              @for (item of group.items; track item.path) {
                <a [routerLink]="item.path" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: item.exact === true }">
                  <span class="material-symbols-outlined">{{ item.icon }}</span>
                  <span class="nav-copy">{{ item.label }}</span>
                  @if (item.badge) {
                    <em class="nav-badge">{{ item.badge }}</em>
                  }
                </a>
              }
            </nav>
            @if (group.label === 'Publish') {
              <eds-button
                class="sidebar-create"
                variant="primary"
                size="sm"
                icon="edit"
                (clicked)="openCreateModal()"
              >
                Create content
              </eds-button>
            }
          }

          <div class="sidebar-bottom">
            <a routerLink="/settings" routerLinkActive="active">
              <span class="material-symbols-outlined">tune</span>
              Settings
            </a>
            <div class="helper">
              <eds-badge label="Must-have enabled" variant="brand" [soft]="true" [pill]="true"></eds-badge>
              <p>Keep brand voice and approvals in one place with clear handoffs across your content team.</p>
            </div>
            <div class="profile">
              <eds-avatar [name]="config.user.name" size="sm"></eds-avatar>
              <div>
                <strong>{{ config.user.name }}</strong>
                <small>{{ config.user.role }}</small>
              </div>
            </div>
          </div>
        </div>
      </eds-card>

      <button class="backdrop" type="button" aria-label="Close navigation" (click)="closeNav()"></button>

      <eds-card class="content" [elevated]="false" [padded]="false">
        <div class="content-inner">
          <header class="topbar">
            <eds-button
              class="menu-button"
              variant="tertiary"
              size="sm"
              icon="menu"
              [iconOnly]="true"
              accessibleLabel="Open navigation"
              (clicked)="toggleNav()"
            ></eds-button>
            <div class="workspace">{{ config.workspace }}</div>
            <div class="actions">
              <eds-search
                class="search"
                size="sm"
                placeholder="Search projects or campaigns"
                [clearable]="true"
                [value]="query()"
                (valueChange)="onSearch($event)"
              ></eds-search>
              <eds-tooltip class="header-search-icon" content="Search workspace" placement="bottom">
                <eds-button
                  variant="tertiary"
                  size="sm"
                  icon="search"
                  [iconOnly]="true"
                  accessibleLabel="Open search"
                  (clicked)="goSearch()"
                ></eds-button>
              </eds-tooltip>
              <eds-tooltip content="Approvals" placement="bottom">
                <eds-button
                  class="notification"
                  variant="tertiary"
                  size="sm"
                  icon="bell"
                  [iconOnly]="true"
                  accessibleLabel="Open approvals inbox"
                  (clicked)="inboxOpen.set(true)"
                ></eds-button>
              </eds-tooltip>
            </div>
          </header>

          <eds-visually-hidden>Content Studio editorial workspace</eds-visually-hidden>
          <div class="page-slot">
            <router-outlet></router-outlet>
          </div>
        </div>
      </eds-card>
    </div>

    <eds-modal [open]="isCreateModalOpen()" heading="Create content" (openChange)="isCreateModalOpen.set($event)">
      <div class="modal-grid">
        <eds-stepper [steps]="createSteps" [current]="createStep()" (stepClick)="createStep.set($event)"></eds-stepper>
        @if (createStep() === 0) {
          <eds-input
            label="Content title"
            placeholder="Q4 launch blog brief"
            [value]="draftTitle()"
            (valueChange)="draftTitle.set($event)"
          ></eds-input>
          <eds-select
            label="Content type"
            placeholder="Choose type"
            [options]="contentTypeOptions"
            [value]="draftType()"
            (valueChange)="draftType.set($event)"
          ></eds-select>
        } @else if (createStep() === 1) {
          <eds-select
            label="Channel"
            placeholder="Choose channel"
            [options]="channelOptions"
            [value]="draftChannel()"
            (valueChange)="draftChannel.set($event)"
          ></eds-select>
          <eds-select
            label="Owner"
            placeholder="Choose owner"
            [options]="ownerOptions"
            [value]="draftOwner()"
            (valueChange)="draftOwner.set($event)"
          ></eds-select>
        } @else {
          <eds-textarea
            label="Creative brief"
            placeholder="Describe audience, goal, and call to action"
            [rows]="5"
            [value]="draftBrief()"
            (valueChange)="draftBrief.set($event)"
          ></eds-textarea>
        }
      </div>
      <div footer class="modal-footer">
        <eds-button variant="secondary" (clicked)="closeCreateModal()">Cancel</eds-button>
        @if (createStep() > 0) {
          <eds-button variant="tertiary" (clicked)="createStep.set(createStep() - 1)">Back</eds-button>
        }
        <eds-button variant="primary" [disabled]="!canAdvanceCreate()" (clicked)="advanceCreate()">
          {{ createStep() === 2 ? 'Create draft' : 'Continue' }}
        </eds-button>
      </div>
    </eds-modal>

    <eds-drawer [open]="inboxOpen()" heading="Approvals inbox" side="right" size="md" (openChange)="inboxOpen.set($event)">
      <div class="drawer-stack">
        <eds-list [items]="inboxItems" [divided]="true"></eds-list>
      </div>
      <div footer class="drawer-footer">
        <eds-button variant="secondary" (clicked)="inboxOpen.set(false)">Close</eds-button>
        <eds-button variant="primary" (clicked)="goApprovals()">Open approvals</eds-button>
      </div>
    </eds-drawer>

    <div class="toast-slot">
      <eds-toast
        title="Draft created"
        [description]="createdMessage()"
        variant="success"
        [open]="toastOpen()"
        (openChange)="toastOpen.set($event)"
      ></eds-toast>
    </div>
  `
})
export class AppComponent {
  private readonly router = inject(Router);
  protected readonly config = templateConfig;
  protected readonly navOpen = signal(false);
  protected readonly query = signal('');
  protected readonly isCreateModalOpen = signal(false);
  protected readonly inboxOpen = signal(false);
  protected readonly toastOpen = signal(false);
  protected readonly createdMessage = signal('');
  protected readonly createStep = signal(0);
  protected readonly draftTitle = signal('');
  protected readonly draftType = signal('');
  protected readonly draftChannel = signal('');
  protected readonly draftOwner = signal(templateConfig.user.name);
  protected readonly draftBrief = signal('');

  protected readonly createSteps: EdsStepperStep[] = [
    { label: 'Asset', description: 'Title and type' },
    { label: 'Owner', description: 'Channel and owner' },
    { label: 'Brief', description: 'Audience and goal' }
  ];

  protected readonly contentTypeOptions: EdsSelectOption[] = this.config.contentTypes;
  protected readonly channelOptions: EdsSelectOption[] = this.config.channelOptions.map((label) => ({
    label,
    value: label
  }));
  protected readonly ownerOptions: EdsSelectOption[] = this.config.ownerOptions.map((label) => ({
    label,
    value: label
  }));
  protected readonly inboxItems: EdsListItem[] = this.config.inbox.map((entry) => ({
    label: entry.title,
    description: entry.detail
  }));

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed()
    ).subscribe(() => this.closeNav());

    fromEvent(window, 'contentstudio:create')
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.openCreateModal());
  }

  @HostListener('document:keydown', ['$event'])
  protected onKeydown(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      void this.router.navigateByUrl('/search');
    }
  }

  protected toggleNav(): void {
    this.navOpen.update((open) => !open);
  }

  protected closeNav(): void {
    this.navOpen.set(false);
  }

  protected onSearch(value: string): void {
    this.query.set(value);
  }

  protected goSearch(): void {
    void this.router.navigateByUrl('/search');
  }

  protected goApprovals(): void {
    this.inboxOpen.set(false);
    void this.router.navigateByUrl('/approvals');
  }

  protected openCreateModal(): void {
    this.createStep.set(0);
    this.isCreateModalOpen.set(true);
    this.createdMessage.set('');
  }

  protected closeCreateModal(): void {
    this.isCreateModalOpen.set(false);
  }

  protected canAdvanceCreate(): boolean {
    if (this.createStep() === 0) {
      return this.draftTitle().trim().length > 2 && this.draftType().trim().length > 0;
    }
    if (this.createStep() === 1) {
      return this.draftChannel().length > 0 && this.draftOwner().length > 0;
    }
    return true;
  }

  protected advanceCreate(): void {
    if (!this.canAdvanceCreate()) {
      return;
    }
    if (this.createStep() < 2) {
      this.createStep.update((step) => step + 1);
      return;
    }
    this.createContent();
  }

  protected createContent(): void {
    if (!this.canAdvanceCreate()) {
      return;
    }

    const typeLabel = this.contentTypeOptions.find((item) => item.value === this.draftType())?.label ?? 'Content';
    this.createdMessage.set(`${typeLabel} draft "${this.draftTitle().trim()}" created successfully.`);
    this.draftTitle.set('');
    this.draftType.set('');
    this.draftChannel.set('');
    this.draftBrief.set('');
    this.createStep.set(0);
    this.isCreateModalOpen.set(false);
    this.toastOpen.set(true);
  }
}
