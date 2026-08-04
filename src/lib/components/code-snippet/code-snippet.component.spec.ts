import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsCodeSnippetComponent } from './code-snippet.component';

describe('EdsCodeSnippetComponent', () => {
  let fixture: ComponentFixture<EdsCodeSnippetComponent>;
  let component: EdsCodeSnippetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsCodeSnippetComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsCodeSnippetComponent);
    component = fixture.componentInstance;
    component.code = '<eds-button>Click</eds-button>';
  });

  it('renders code content', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('<eds-button>');
  });

  it('does not render when code is empty', () => {
    component.code = '   ';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.panel')).toBeNull();
  });

  it('copies code to clipboard', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    fixture.detectChanges();
    await component.copy();
    expect(writeText).toHaveBeenCalledWith('<eds-button>Click</eds-button>');
    expect(component.copied).toBe(true);
  });
});
