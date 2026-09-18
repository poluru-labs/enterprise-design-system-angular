import { TestBed } from '@angular/core/testing';
import { ProjectsPageComponent } from './projects-page.component';
import { internals } from '../../shared/testing/internals';

describe('ProjectsPageComponent', () => {
  let component: ProjectsPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ProjectsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the projects directory', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Projects');
  });

  it('filters to the Review tag by default', () => {
    const rows = internals(component).filtered() as { status: string }[];
    expect(rows.length).toBeGreaterThan(0);
    expect(rows.every((item) => item.status === 'Review')).toBe(true);
  });

  it('filters by search and dismisses tags', () => {
    const api = internals(component);
    api.dismissTag('Review');
    api.search.set('webinar');
    const rows = api.filtered() as { name: string }[];
    expect(rows.some((item) => item.name.includes('Webinar'))).toBe(true);

    api.search.set('zzzz-not-a-project');
    expect(api.filtered()).toEqual([]);
  });

  it('maps project statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Approved')).toBe('success');
    expect(api.statusVariant('Review')).toBe('warning');
    expect(api.statusVariant('Draft')).toBe('warning');
    expect(api.statusVariant('Blocked')).toBe('danger');
    expect(api.statusVariant('Scheduled')).toBe('info');
    expect(api.statusVariant('Idle')).toBe('neutral');
  });
});
