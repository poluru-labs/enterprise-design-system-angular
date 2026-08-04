import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsTagComponent } from './tag.component';

describe('EdsTagComponent', () => {
  let fixture: ComponentFixture<EdsTagComponent>;
  let component: EdsTagComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsTagComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsTagComponent);
    component = fixture.componentInstance;
  });

  it('renders label', () => {
    component.label = 'Filter';
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Filter');
  });

  it('emits tagDismiss when dismiss button clicked', () => {
    component.dismissible = true;
    fixture.detectChanges();
    const spy = jest.fn();
    component.tagDismiss.subscribe(spy);
    fixture.nativeElement.querySelector('.dismiss').click();
    expect(spy).toHaveBeenCalled();
  });

  it('applies variant class', () => {
    component.variant = 'info';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.info')).toBeTruthy();
  });
});
