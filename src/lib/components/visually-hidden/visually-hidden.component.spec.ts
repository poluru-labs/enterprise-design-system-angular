import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsVisuallyHiddenComponent } from './visually-hidden.component';

describe('EdsVisuallyHiddenComponent', () => {
  let fixture: ComponentFixture<EdsVisuallyHiddenComponent>;
  let component: EdsVisuallyHiddenComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsVisuallyHiddenComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsVisuallyHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
