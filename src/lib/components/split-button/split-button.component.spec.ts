import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsSplitButtonComponent } from './split-button.component';
import { EdsMenuItemComponent } from '../dropdown-menu/menu-item.component';

describe('EdsSplitButtonComponent', () => {
  let fixture: ComponentFixture<EdsSplitButtonComponent>;
  let component: EdsSplitButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdsSplitButtonComponent, EdsMenuItemComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(EdsSplitButtonComponent);
    component = fixture.componentInstance;
    component.label = 'Save';
  });

  it('renders primary label', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Save');
  });

  it('emits primaryClick on primary button', () => {
    fixture.detectChanges();
    const spy = jest.fn();
    component.primaryClick.subscribe(spy);
    fixture.nativeElement.querySelector('.primary-action button').click();
    expect(spy).toHaveBeenCalled();
  });

  it('does not emit primaryClick when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const spy = jest.fn();
    component.primaryClick.subscribe(spy);
    fixture.nativeElement.querySelector('.primary-action button').click();
    expect(spy).not.toHaveBeenCalled();
  });
});
