import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsStatusComponent } from './status.component';

describe('EdsStatusComponent', () => {
  let fixture: ComponentFixture<EdsStatusComponent>;
  let component: EdsStatusComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsStatusComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
