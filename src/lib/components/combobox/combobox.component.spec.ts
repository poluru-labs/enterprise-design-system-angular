import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsComboboxComponent } from './combobox.component';

describe('EdsComboboxComponent', () => {
  let fixture: ComponentFixture<EdsComboboxComponent>;
  let component: EdsComboboxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsComboboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsComboboxComponent);
    component = fixture.componentInstance;
    component.options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="combobox"]')).toBeTruthy();
  });

  it('should filter options based on input', () => {
    component.filter = 'ban';
    expect(component.filteredOptions.length).toBe(1);
    expect(component.filteredOptions[0].value).toBe('banana');
  });

  it('should emit valueChange when option is selected', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.selectOption({ label: 'Apple', value: 'apple' });
    expect(spy).toHaveBeenCalledWith('apple');
    expect(component.filter).toBe('Apple');
  });
});
