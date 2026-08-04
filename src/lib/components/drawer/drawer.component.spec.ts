import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDrawerComponent } from './drawer.component';

describe('EdsDrawerComponent', () => {
  let fixture: ComponentFixture<EdsDrawerComponent>;
  let component: EdsDrawerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsDrawerComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsDrawerComponent);
    component = fixture.componentInstance;
  });

  it('renders panel when open', () => {
    component.open = true;
    component.heading = 'Settings';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('aside[role="dialog"]')).toBeTruthy();
  });

  it('emits openChange on close', () => {
    component.open = true;
    fixture.detectChanges();
    const spy = jest.fn();
    component.openChange.subscribe(spy);
    component.close();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('closes on Escape key', () => {
    component.open = true;
    fixture.detectChanges();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(component.open).toBe(false);
  });
});
