import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsPinInputComponent } from './pin-input.component';

describe('EdsPinInputComponent', () => {
  let fixture: ComponentFixture<EdsPinInputComponent>;
  let component: EdsPinInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsPinInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsPinInputComponent);
    component = fixture.componentInstance;
    component.length = 4;
    fixture.detectChanges();
  });

  it('should create with correct number of cells', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelectorAll('input').length).toBe(4);
  });

  it('should emit valueChange when a digit is entered', () => {
    const spy = jest.fn();
    component.valueChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = '1';
    input.dispatchEvent(new Event('input'));
    expect(spy).toHaveBeenCalledWith('1');
  });

  it('should emit completed when all digits are filled', () => {
    const spy = jest.fn();
    component.completed.subscribe(spy);
    const inputs = fixture.nativeElement.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
    inputs.forEach((input, i) => {
      input.value = String(i + 1);
      input.dispatchEvent(new Event('input'));
    });
    expect(spy).toHaveBeenCalledWith('1234');
  });
});
