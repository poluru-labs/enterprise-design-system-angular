import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { RunsPageComponent } from './runs-page.component';
import { internals } from '../../shared/testing/internals';
import { templateConfig } from '../../core/config/template.config';

describe('RunsPageComponent', () => {
  let component: RunsPageComponent;
  let nativeElement: HTMLElement;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunsPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(RunsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('creates the run ledger', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Runs');
    expect(internals(component).suggestions).toEqual(templateConfig.runs.map((item) => item.id));
  });

  it('defaults to complete runs', () => {
    const rows = internals(component).filtered() as { status: string }[];
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((item) => item.status === 'Complete')).toBe(true);
  });

  it('finds a run id after clearing the complete tag', () => {
    const api = internals(component);
    api.dismissTag('Complete');
    api.search.set('RUN-1841');
    const rows = api.filtered() as { id: string; status: string }[];
    expect(rows).toEqual([expect.objectContaining({ id: 'RUN-1841', status: 'Review' })]);
  });

  it('paginates filtered rows', () => {
    const api = internals(component);
    api.dismissTag('Complete');
    expect(api.pageRows().length).toBe(6);
    api.page.set(2);
    expect(api.pageRows().length).toBeGreaterThan(0);
    expect(api.pageRows()[0].id).not.toBe(api.filtered()[0].id);
  });

  it('navigates to handoffs', () => {
    const navigate = vi.spyOn(router, 'navigateByUrl').mockResolvedValue(true);
    internals(component).openHandoffs();
    expect(navigate).toHaveBeenCalledWith('/handoffs');
  });

  it('maps run outcomes', () => {
    const api = internals(component);
    expect(api.statusVariant('Complete')).toBe('success');
    expect(api.statusVariant('Review')).toBe('warning');
    expect(api.statusVariant('Running')).toBe('warning');
    expect(api.statusVariant('Failed')).toBe('danger');
    expect(api.statusVariant('Queued')).toBe('neutral');
  });

  it('stores the selected window', () => {
    internals(component).onRange({ start: '2026-08-01', end: '2026-08-07' });
    expect(internals(component).rangeStart()).toBe('2026-08-01');
    expect(internals(component).rangeEnd()).toBe('2026-08-07');
  });
});
