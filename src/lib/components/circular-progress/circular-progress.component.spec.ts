import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsCircularProgressComponent } from './circular-progress.component';

describe('EdsCircularProgressComponent', () => {
  let fixture: ComponentFixture<EdsCircularProgressComponent>;
  let component: EdsCircularProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsCircularProgressComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsCircularProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
