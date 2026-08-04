import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsFileUploadComponent } from './file-upload.component';

describe('EdsFileUploadComponent', () => {
  let fixture: ComponentFixture<EdsFileUploadComponent>;
  let component: EdsFileUploadComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsFileUploadComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsFileUploadComponent);
    component = fixture.componentInstance;
  });

  it('renders dropzone', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.dropzone')).toBeTruthy();
  });

  it('emits filesChange on file selection', () => {
    fixture.detectChanges();
    const spy = jest.fn();
    component.filesChange.subscribe(spy);
    const file = new File(['x'], 'test.txt');
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    Object.defineProperty(input, 'files', {
      configurable: true,
      value: {
        0: file,
        length: 1,
        item: (index: number) => (index === 0 ? file : null),
        [Symbol.iterator]: function* () {
          yield file;
        },
      },
    });
    input.dispatchEvent(new Event('change'));
    expect(spy).toHaveBeenCalledWith({ files: [file] });
  });

  it('does not open dialog when disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    const clickSpy = jest.spyOn(input, 'click');
    component.openFileDialog();
    expect(clickSpy).not.toHaveBeenCalled();
  });
});
