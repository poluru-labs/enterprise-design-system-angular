import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDateRangePickerComponent } from './date-range-picker.component';

describe('EdsDateRangePickerComponent', () => {
  let fixture: ComponentFixture<EdsDateRangePickerComponent>;
  let component: EdsDateRangePickerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsDateRangePickerComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsDateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start range selection on first click', () => {
    component.selectDate('2026-01-01');
    expect(component.pendingStart).toBe('2026-01-01');
    expect(component.selectingEnd).toBe(true);
  });

  it('should emit range on second click', () => {
    const spy = jest.fn();
    component.rangeChange.subscribe(spy);
    component.selectDate('2026-01-10');
    component.selectDate('2026-01-20');
    expect(spy).toHaveBeenCalledWith({ start: '2026-01-10', end: '2026-01-20' });
  });
});
