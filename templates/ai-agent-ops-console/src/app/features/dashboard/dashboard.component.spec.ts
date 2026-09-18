import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the operations dashboard', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Agent operations');
    expect(nativeElement.textContent).toContain('2 handoffs are waiting for Alex Poluru');
  });

  it('renders headline metrics and live agents', () => {
    expect(nativeElement.textContent).toContain('48');
    expect(nativeElement.textContent).toContain('98.4%');
    expect(internals(component).agentRows.length).toBe(6);
    expect(internals(component).period()).toBe('week');
  });

  it('maps run statuses to EDS variants', () => {
    const api = internals(component);
    expect(api.statusVariant('Complete')).toBe('success');
    expect(api.statusVariant('Live')).toBe('success');
    expect(api.statusVariant('Healthy')).toBe('success');
    expect(api.statusVariant('Review')).toBe('warning');
    expect(api.statusVariant('Running')).toBe('warning');
    expect(api.statusVariant('Failed')).toBe('danger');
    expect(api.statusVariant('Paused')).toBe('danger');
    expect(api.statusVariant('Info')).toBe('info');
  });

  it('dispatches the deploy event', () => {
    const spy = vi.spyOn(window, 'dispatchEvent');
    internals(component).openDeploy();
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: 'agentops:deploy' }));
  });

  it('builds coverage facts from the workspace config', () => {
    const facts = internals(component).facts as { term: string; description: string }[];
    expect(facts).toEqual(
      expect.arrayContaining([
        { term: 'Workspace', description: templateConfig.workspace },
        { term: 'Admin', description: 'Alex Poluru' }
      ])
    );
  });
});
