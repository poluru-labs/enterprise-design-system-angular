import { TestBed } from '@angular/core/testing';
import { LibraryPageComponent } from './library-page.component';
import { internals } from '../../shared/testing/internals';

describe('LibraryPageComponent', () => {
  let component: LibraryPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(LibraryPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the asset library', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Library');
  });

  it('filters to Published assets by default', () => {
    const rows = internals(component).filtered() as { status: string }[];
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((item) => item.status === 'Published')).toBe(true);
  });

  it('finds assets by title and clears empty results', () => {
    const api = internals(component);
    api.dismissTag('Published');
    api.search.set('governance');
    expect(api.filtered().some((item: { title: string }) => item.title.includes('governance'))).toBe(true);

    api.search.set('zzzz-not-an-asset');
    expect(api.filtered()).toEqual([]);
  });
});
