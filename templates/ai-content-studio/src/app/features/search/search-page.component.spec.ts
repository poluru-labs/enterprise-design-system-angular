import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SearchPageComponent } from './search-page.component';
import { internals } from '../../shared/testing/internals';

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPageComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates workspace search', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Search');
  });

  it('shows a default catalog slice when the query is empty', () => {
    expect(internals(component).results()).toHaveLength(10);
  });

  it('finds projects, assets, approvals, and guardrails', () => {
    const api = internals(component);
    api.query.set('enterprise launch');
    expect(api.results().some((item: { kind: string }) => item.kind === 'Project')).toBe(true);

    api.query.set('LIB-118');
    expect(api.results().some((item: { title: string }) => item.title === 'AI governance explainer')).toBe(true);

    api.query.set('AP-2041');
    expect(api.results()).toEqual([expect.objectContaining({ kind: 'Approval', title: 'AP-2041' })]);

    api.query.set('zero-risk');
    expect(api.results()).toEqual([expect.objectContaining({ kind: 'Guardrail' })]);
  });

  it('returns no matches for an unknown term', () => {
    internals(component).query.set('zzzz-not-a-record');
    expect(internals(component).results()).toEqual([]);
  });
});
