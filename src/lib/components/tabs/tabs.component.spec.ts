import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsTabsComponent } from './tabs.component';

describe('EdsTabsComponent', () => {
  let fixture: ComponentFixture<EdsTabsComponent>;
  let component: EdsTabsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsTabsComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
  it('should render', () => { expect(fixture.nativeElement).toBeTruthy(); });

});
