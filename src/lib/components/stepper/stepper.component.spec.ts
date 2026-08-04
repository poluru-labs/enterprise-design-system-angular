import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsStepperComponent } from './stepper.component';

describe('EdsStepperComponent', () => {
  let fixture: ComponentFixture<EdsStepperComponent>;
  let component: EdsStepperComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsStepperComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
