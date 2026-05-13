import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistProduct } from '@shop-workspace/shared-types';
import { WishlistCard } from './wishlist-card';

describe('WishlistCard', () => {
  let component: WishlistCard;
  let fixture: ComponentFixture<WishlistCard>;
  const product: WishlistProduct = {
    _id: 'product-1',
    id: 'product-1',
    title: 'Test product',
    imgCover: '/assets/product.webp',
    price: 100,
    priceAfterDiscount: 90,
    discount: 10,
    rateAvg: 4,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistCard],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistCard);
    fixture.componentRef.setInput('product', product);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
