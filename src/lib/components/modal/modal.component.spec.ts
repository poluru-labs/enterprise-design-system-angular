import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsModalComponent } from './modal.component';

describe('EdsModalComponent', () => {
  let fixture: ComponentFixture<EdsModalComponent>;
  let component: EdsModalComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EdsModalComponent);
    component = fixture.componentInstance;
  });

  it('renders dialog content when open', () => {
    component.open = true;
    component.heading = 'Confirm action';
    fixture.detectChanges();

    const dialog = fixture.nativeElement.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(fixture.nativeElement.textContent).toContain('Confirm action');
  });

  it('does not render dialog when closed', () => {
    component.open = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="dialog"]')).toBeNull();
  });

  it('emits openChange when closed via close button', () => {
    component.open = true;
    fixture.detectChanges();

    const spy = jest.fn();
    component.openChange.subscribe(spy);
    fixture.nativeElement.querySelector('.close').click();

    expect(spy).toHaveBeenCalledWith(false);
    expect(component.open).toBe(false);
  });
});
