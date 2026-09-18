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

  it('finds agents, runs, tools, and handoffs', () => {
    const api = internals(component);
    api.query.set('invoice');
    const kinds = (api.results() as { kind: string }[]).map((item) => item.kind);
    expect(kinds).toContain('Agent');

    api.query.set('RUN-1842');
    expect(api.results()).toEqual([expect.objectContaining({ kind: 'Run', title: 'RUN-1842' })]);

    api.query.set('web search');
    expect(api.results().some((item: { title: string }) => item.title === 'Web search')).toBe(true);

    api.query.set('HO-1092');
    expect(api.results()).toEqual([expect.objectContaining({ kind: 'Handoff', title: 'HO-1092' })]);
  });

  it('returns no matches for an unknown term', () => {
    internals(component).query.set('zzzz-not-a-record');
    expect(internals(component).results()).toEqual([]);
  });
});
