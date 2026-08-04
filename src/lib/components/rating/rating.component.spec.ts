import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsRatingComponent } from './rating.component';

describe('EdsRatingComponent', () => {
  let fixture: ComponentFixture<EdsRatingComponent>;
  let component: EdsRatingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsRatingComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
