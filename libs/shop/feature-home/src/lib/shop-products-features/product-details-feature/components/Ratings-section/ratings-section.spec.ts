import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RatingsSection } from './ratings-section';

describe('RatingsSection', () => {
  let component: RatingsSection;
  let fixture: ComponentFixture<RatingsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(RatingsSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
