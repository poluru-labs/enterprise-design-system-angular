import { TestBed } from '@angular/core/testing';
import { ToolsPageComponent } from './tools-page.component';
import { internals } from '../../shared/testing/internals';

describe('ToolsPageComponent', () => {
  let component: ToolsPageComponent;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolsPageComponent]
    }).compileComponents();

    const fixture = TestBed.createComponent(ToolsPageComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('creates the tool registry', () => {
    expect(component).toBeTruthy();
    expect(nativeElement.textContent).toContain('Tools');
    expect(nativeElement.textContent).toContain('ERP lookup');
  });

  it('resolves catalog labels and owners from the tree selection', () => {
    const api = internals(component);
    expect(api.selectedLabel()).toBe('Internal API');
    expect(api.selectedOwner()).toBe('Alex Poluru');

    api.selectedId.set('erp');
    expect(api.selectedLabel()).toBe('ERP lookup');
    expect(api.selectedOwner()).toBe('Alex Poluru');

    api.selectedId.set('unknown');
    expect(api.selectedLabel()).toBe('Internal API');
  });

  it('maps tool statuses', () => {
    const api = internals(component);
    expect(api.statusVariant('Approved')).toBe('success');
    expect(api.statusVariant('Restricted')).toBe('warning');
    expect(api.statusVariant('Degraded')).toBe('danger');
    expect(api.statusVariant('Draft')).toBe('neutral');
  });

  it('lists an owner row for every registered tool', () => {
    expect(internals(component).owners.length).toBe(internals(component).config.tools.length);
  });
});
