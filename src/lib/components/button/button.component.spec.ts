import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsButtonComponent } from './button.component';

describe('EdsButtonComponent', () => {
  let fixture: ComponentFixture<EdsButtonComponent>;
  let component: EdsButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create with primary variant', () => {
    expect(component).toBeTruthy();
    expect(component.variant).toBe('primary');
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.classList.contains('eds-button--primary')).toBe(true);
  });

  it('should disable the button when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').disabled).toBe(true);
  });

  it('should emit clicked when activated', () => {
    const spy = jest.fn();
    component.clicked.subscribe(spy);
    fixture.nativeElement.querySelector('button').click();
    expect(spy).toHaveBeenCalled();
  });
});
