import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsNumberInputComponent } from './number-input.component';

describe('EdsNumberInputComponent', () => {
  let fixture: ComponentFixture<EdsNumberInputComponent>;
  let component: EdsNumberInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsNumberInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsNumberInputComponent);
    component = fixture.componentInstance;
    component.min = 0;
    component.max = 10;
    component.value = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('input[type="number"]')).toBeTruthy();
  });

  it('should increment value when plus button is clicked', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    fixture.nativeElement.querySelectorAll('button')[1].click();
    expect(component.value).toBe(6);
    expect(spy).toHaveBeenCalledWith(6);
  });

  it('should decrement value when minus button is clicked', () => {
    fixture.nativeElement.querySelectorAll('button')[0].click();
    expect(component.value).toBe(4);
  });
});
