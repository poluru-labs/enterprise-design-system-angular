import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsPopoverComponent } from './popover.component';

describe('EdsPopoverComponent', () => {
  let fixture: ComponentFixture<EdsPopoverComponent>;
  let component: EdsPopoverComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsPopoverComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsPopoverComponent);
    component = fixture.componentInstance;
  });

  it('starts closed by default', () => {
    expect(component.open).toBe(false);
  });

  it('toggles open state', () => {
    component.toggle(new Event('click'));
    expect(component.open).toBe(true);
  });

  it('emits openChange when closed', () => {
    component.open = true;
    const spy = jest.fn();
    component.openChange.subscribe(spy);
    component.close();
    expect(spy).toHaveBeenCalledWith(false);
  });
});
