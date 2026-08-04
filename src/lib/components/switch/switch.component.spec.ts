import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSwitchComponent } from './switch.component';

describe('EdsSwitchComponent', () => {
  let fixture: ComponentFixture<EdsSwitchComponent>;
  let component: EdsSwitchComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsSwitchComponent);
    component = fixture.componentInstance;
    component.label = 'Notifications';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement.querySelector('[role="switch"]')).toBeTruthy();
  });

  it('should emit checkedChange when toggled', () => {
    const spy = jest.fn();
    component.checkedChange.subscribe(spy);
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should render label', () => {
    expect(fixture.nativeElement.textContent).toContain('Notifications');
  });
});
