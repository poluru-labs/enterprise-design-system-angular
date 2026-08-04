import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsMeterComponent } from './meter.component';

describe('EdsMeterComponent', () => {
  let fixture: ComponentFixture<EdsMeterComponent>;
  let component: EdsMeterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsMeterComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsMeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
