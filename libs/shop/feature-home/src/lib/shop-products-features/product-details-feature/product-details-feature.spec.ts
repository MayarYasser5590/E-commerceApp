import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetailsFeature } from './product-details-feature';

describe('ProductDetailsFeature', () => {
  let component: ProductDetailsFeature;
  let fixture: ComponentFixture<ProductDetailsFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
