import { TestBed } from '@angular/core/testing';
import { AgentsPageComponent } from './agents-page.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('AgentsPageComponent', () => {
  let component: AgentsPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentsPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(AgentsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the agent directory', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Agents');
    expect(internals(component).suggestions).toEqual(templateConfig.agents.map((item) => item.name));
  });

  it('defaults to live agents and paginates six rows', () => {
    const api = internals(component);
    expect(api.filtered().every((item: { status: string }) => item.status === 'Live')).toBe(true);
    expect(api.pageRows().length).toBe(6);
    expect(api.filtered().length).toBeGreaterThan(6);
  });

  it('filters by search after the live tag is dismissed', () => {
    const api = internals(component);
    api.dismissTag('Live');
    api.search.set('research');
    const rows = api.filtered() as { name: string }[];
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe('Research agent');
  });

  it('resets to page 1 when a tag is dismissed', () => {
    const api = internals(component);
    api.page.set(2);
    api.dismissTag('Live');
    expect(api.page()).toBe(1);
    expect(api.tags()).toEqual([]);
  });

  it('updates the date window', () => {
    internals(component).onRange({ start: '2026-08-10', end: '2026-08-20' });
    expect(internals(component).rangeStart()).toBe('2026-08-10');
    expect(internals(component).rangeEnd()).toBe('2026-08-20');
  });

  it('maps agent statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Live')).toBe('success');
    expect(api.statusVariant('Review')).toBe('warning');
    expect(api.statusVariant('Paused')).toBe('danger');
    expect(api.statusVariant('Unknown')).toBe('neutral');
  });

  it('dispatches deploy from the directory', () => {
    const spy = vi.spyOn(window, 'dispatchEvent');
    internals(component).openDeploy();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'agentops:deploy' }));
  });
});
