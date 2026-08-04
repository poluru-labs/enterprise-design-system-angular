import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { EdsToastComponent } from './toast.component';

describe('EdsToastComponent', () => {
  let fixture: ComponentFixture<EdsToastComponent>;
  let component: EdsToastComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsToastComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsToastComponent);
    component = fixture.componentInstance;
    component.title = 'Saved';
  });

  it('renders title when open', () => {
    component.open = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Saved');
  });

  it('emits openChange when closed', () => {
    component.open = true;
    fixture.detectChanges();
    const spy = jest.fn();
    component.openChange.subscribe(spy);
    component.close();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('auto-dismisses after duration', () => {
    let timerCb: (() => void) | undefined;
    const setTimeoutSpy = jest
      .spyOn(globalThis, 'setTimeout')
      .mockImplementation(((fn: TimerHandler) => {
        if (typeof fn === 'function') timerCb = fn as () => void;
        return 0 as unknown as ReturnType<typeof setTimeout>;
      }) as unknown as typeof setTimeout);

    const spy = jest.fn();
    component.openChange.subscribe(spy);
    component.open = true;
    component.duration = 1000;
    component.ngOnChanges({
      open: new SimpleChange(false, true, false),
      duration: new SimpleChange(5000, 1000, false),
    });

    expect(setTimeoutSpy).toHaveBeenCalled();
    expect(timerCb).toBeDefined();
    timerCb?.();
    expect(spy).toHaveBeenCalledWith(false);
    setTimeoutSpy.mockRestore();
  });
});
