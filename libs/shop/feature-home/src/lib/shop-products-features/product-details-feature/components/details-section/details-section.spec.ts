import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductData } from '@shop-workspace/shared-types';
import { DetailsSection } from './details-section';

describe('DetailsSection', () => {
  let component: DetailsSection;
  let fixture: ComponentFixture<DetailsSection>;
  const product: ProductData = {
    _id: 'product-1',
    id: 'product-1',
    title: 'Test product',
    slug: 'test-product',
    description: 'Test description',
    imgCover: '/assets/product.webp',
    images: ['/assets/product.webp'],
    price: 100,
    priceAfterDiscount: 90,
    quantity: 5,
    sold: 1,
    rateAvg: 4,
    rateCount: 2,
    category: 'category-1',
    occasion: 'occasion-1',
    createdAt: '',
    updatedAt: '',
    favoriteId: null,
    isInWishlist: false,
    isSuperAdmin: false,
    __v: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsSection],
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsSection);
    component = fixture.componentInstance;
    component.productId = product._id;
    component.product = product;
    component.isInWishlistFn = () => false;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
