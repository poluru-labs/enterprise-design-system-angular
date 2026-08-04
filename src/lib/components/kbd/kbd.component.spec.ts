import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsKbdComponent } from './kbd.component';

describe('EdsKbdComponent', () => {
  let fixture: ComponentFixture<EdsKbdComponent>;
  let component: EdsKbdComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsKbdComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsKbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
