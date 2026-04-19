import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestSellerSectionFeature } from './best-seller-section-feature';

describe('BestSellerSectionFeature', () => {
  let component: BestSellerSectionFeature;
  let fixture: ComponentFixture<BestSellerSectionFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestSellerSectionFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(BestSellerSectionFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
