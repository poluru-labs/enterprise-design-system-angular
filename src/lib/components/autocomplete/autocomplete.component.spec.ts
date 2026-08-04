import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsAutocompleteComponent } from './autocomplete.component';

describe('EdsAutocompleteComponent', () => {
  let fixture: ComponentFixture<EdsAutocompleteComponent>;
  let component: EdsAutocompleteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsAutocompleteComponent);
    component = fixture.componentInstance;
    component.suggestions = ['Angular', 'React', 'Vue', 'Svelte'];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="combobox"]')).toBeTruthy();
  });

  it('should filter suggestions based on value', () => {
    component.value = 'ang';
    expect(component.filteredSuggestions).toEqual(['Angular']);
  });

  it('should emit selected when a suggestion is chosen', () => {
    const spy = jest.fn();
    component.selected.subscribe(spy);
    component.selectSuggestion('React');
    expect(spy).toHaveBeenCalledWith('React');
    expect(component.value).toBe('React');
  });
});
