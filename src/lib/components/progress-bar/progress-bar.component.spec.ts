import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsProgressBarComponent } from './progress-bar.component';

describe('EdsProgressBarComponent', () => {
  let fixture: ComponentFixture<EdsProgressBarComponent>;
  let component: EdsProgressBarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsProgressBarComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
