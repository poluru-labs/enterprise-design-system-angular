import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsStatComponent } from './stat.component';

describe('EdsStatComponent', () => {
  let fixture: ComponentFixture<EdsStatComponent>;
  let component: EdsStatComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsStatComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
