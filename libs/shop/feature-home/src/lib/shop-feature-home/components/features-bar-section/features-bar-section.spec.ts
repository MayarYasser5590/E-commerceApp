import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeaturesBarSection } from './features-bar-section';

describe('FeaturesBarSection', () => {
  let component: FeaturesBarSection;
  let fixture: ComponentFixture<FeaturesBarSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesBarSection],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturesBarSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
