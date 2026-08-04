import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsListComponent } from './list.component';

describe('EdsListComponent', () => {
  let fixture: ComponentFixture<EdsListComponent>;
  let component: EdsListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsListComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
