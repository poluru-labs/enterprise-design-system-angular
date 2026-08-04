import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsAlertComponent } from './alert.component';

describe('EdsAlertComponent', () => {
  let fixture: ComponentFixture<EdsAlertComponent>;
  let component: EdsAlertComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsAlertComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsAlertComponent);
    component = fixture.componentInstance;
  });

  it('renders title and message', () => {
    component.title = 'Heads up';
    component.message = 'Something happened';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Heads up');
    expect(fixture.nativeElement.textContent).toContain('Something happened');
  });

  it('applies variant class', () => {
    component.variant = 'success';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.success')).toBeTruthy();
  });

  it('dismisses when dismissible', () => {
    component.dismissible = true;
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.close').click();
    expect(component.isDismissed).toBe(true);
  });
});
