import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsDataTableComponent } from './data-table.component';

describe('EdsDataTableComponent', () => {
  let fixture: ComponentFixture<EdsDataTableComponent>;
  let component: EdsDataTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsDataTableComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
