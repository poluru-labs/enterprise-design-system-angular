import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EdsCardComponent } from './card.component';

describe('EdsCardComponent', () => {
  let fixture: ComponentFixture<EdsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EdsCardComponent] }).compileComponents();
    fixture = TestBed.createComponent(EdsCardComponent);
  });

  it('renders article element', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('article.card')).toBeTruthy();
  });

  it('adds elevated class when elevated', () => {
    fixture.componentInstance.elevated = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.elevated')).toBeTruthy();
  });

  it('adds padded class by default', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.padded')).toBeTruthy();
  });
});
