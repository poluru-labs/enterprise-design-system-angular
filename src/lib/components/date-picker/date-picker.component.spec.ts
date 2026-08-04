import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDatePickerComponent } from './date-picker.component';

describe('EdsDatePickerComponent', () => {
  let fixture: ComponentFixture<EdsDatePickerComponent>;
  let component: EdsDatePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsDatePickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format display value', () => {
    component.value = '2026-01-15';
    expect(component.displayValue).toBeTruthy();
  });

  it('should emit valueChange on select', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    component.selectDate('2026-03-01');
    expect(spy).toHaveBeenCalledWith('2026-03-01');
    expect(component.open).toBe(false);
  });
});
