import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderOrganism } from './slider-organism';

describe('SliderOrganism', () => {
  let component: SliderOrganism;
  let fixture: ComponentFixture<SliderOrganism>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SliderOrganism],
    }).compileComponents();

    fixture = TestBed.createComponent(SliderOrganism);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
