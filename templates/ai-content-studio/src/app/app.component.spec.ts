import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { AppComponent } from './app.component';
import { internals } from './shared/testing/internals';
import { templateConfig } from './core/config/template.config';

describe('AppComponent', () => {
  let component: AppComponent;
  let nativeElement: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('creates the editorial shell', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.querySelector('.logo')?.textContent).toContain('Content Studio');
    expect(nativeElement.textContent).toContain(templateConfig.workspace);
    expect(nativeElement.textContent).toContain('Alex Poluru');
  });

  it('renders grouped sidebar navigation', () => {
    const labels = Array.from(nativeElement.querySelectorAll('.nav-label')).map((node) => node.textContent?.trim());
    expect(labels).toEqual(['Editorial', 'Publish']);
    expect(nativeElement.textContent).toContain('Approvals');
    expect(nativeElement.textContent).toContain('Library');
    expect(nativeElement.querySelector('.sidebar-create')?.textContent).toContain('Create content');
  });

  it('toggles and closes the mobile nav', () => {
    const api = internals(component);
    expect(api.navOpen()).toBe(false);
    api.toggleNav();
    expect(api.navOpen()).toBe(true);
    api.closeNav();
    expect(api.navOpen()).toBe(false);
  });

  it('stores workspace search text', () => {
    internals(component).onSearch('q3 launch');
    expect(internals(component).query()).toBe('q3 launch');
  });

  it('opens the create modal on step 0', () => {
    const api = internals(component);
    api.createStep.set(2);
    api.openCreateModal();
    expect(api.isCreateModalOpen()).toBe(true);
    expect(api.createStep()).toBe(0);
  });

  it('requires a title and type before advancing step 0', () => {
    const api = internals(component);
    api.createStep.set(0);
    api.draftTitle.set('');
    expect(api.canAdvanceCreate()).toBe(false);
    api.draftTitle.set('Q4 launch blog');
    api.draftType.set('blog');
    expect(api.canAdvanceCreate()).toBe(true);
  });

  it('requires a channel and owner on step 1', () => {
    const api = internals(component);
    api.createStep.set(1);
    api.draftChannel.set('');
    api.draftOwner.set('');
    expect(api.canAdvanceCreate()).toBe(false);
    api.draftChannel.set('Blog');
    api.draftOwner.set('Alex Poluru');
    expect(api.canAdvanceCreate()).toBe(true);
  });

  it('advances the create wizard and queues a toast', () => {
    const api = internals(component);
    api.createStep.set(0);
    api.draftTitle.set('Q4 launch blog');
    api.draftType.set('blog');
    api.advanceCreate();
    expect(api.createStep()).toBe(1);

    api.draftChannel.set('Blog');
    api.draftOwner.set('Alex Poluru');
    api.advanceCreate();
    expect(api.createStep()).toBe(2);

    api.advanceCreate();
    expect(api.isCreateModalOpen()).toBe(false);
    expect(api.toastOpen()).toBe(true);
    expect(api.createdMessage()).toContain('Q4 launch blog');
  });

  it('does not advance create when the current step is invalid', () => {
    const api = internals(component);
    api.createStep.set(0);
    api.draftTitle.set('');
    api.advanceCreate();
    expect(api.createStep()).toBe(0);
  });

  it('closes the create modal', () => {
    const api = internals(component);
    api.openCreateModal();
    api.closeCreateModal();
    expect(api.isCreateModalOpen()).toBe(false);
  });

  it('navigates to search and approvals', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const api = internals(component);
    api.goSearch();
    api.inboxOpen.set(true);
    api.goApprovals();
    expect(navigate).toHaveBeenCalledWith('/search');
    expect(navigate).toHaveBeenCalledWith('/approvals');
    expect(api.inboxOpen()).toBe(false);
  });

  it('opens search on ⌘K', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
    const prevent = vi.spyOn(event, 'preventDefault');
    internals(component).onKeydown(event);
    expect(prevent).toHaveBeenCalled();
    expect(navigate).toHaveBeenCalledWith('/search');
  });

  it('opens the create modal from the contentstudio:create event', () => {
    internals(component).isCreateModalOpen.set(false);
    window.dispatchEvent(new CustomEvent('contentstudio:create'));
    expect(internals(component).isCreateModalOpen()).toBe(true);
  });
});
