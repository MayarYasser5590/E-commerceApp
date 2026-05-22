import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShopWishlistFeature } from './shop-wishlist-feature';

describe('ShopWishlistFeature', () => {
  let component: ShopWishlistFeature;
  let fixture: ComponentFixture<ShopWishlistFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopWishlistFeature],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopWishlistFeature);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
