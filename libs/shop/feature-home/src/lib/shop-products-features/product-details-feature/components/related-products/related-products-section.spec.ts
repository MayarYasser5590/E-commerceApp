import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelatedProductsSection } from './related-products-section';

describe('RelatedProductsSection', () => {
  let component: RelatedProductsSection;
  let fixture: ComponentFixture<RelatedProductsSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedProductsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(RelatedProductsSection);
    fixture.componentRef.setInput('productId', 'product-1');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
