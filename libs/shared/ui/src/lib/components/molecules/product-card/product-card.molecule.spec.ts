import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ProductData } from '@shop-workspace/shared-types';
import { ProductCardMolecule } from './product-card.molecule';

describe('ProductCardMolecule', () => {
  let component: ProductCardMolecule;
  let fixture: ComponentFixture<ProductCardMolecule>;
  let router: { navigate: ReturnType<typeof vi.fn> };

  const mockProduct: ProductData = {
    id: 'product-1',
    _id: 'product-1',
    title: 'Rose Delight Box',
    slug: 'rose-delight-box',
    description: 'Gift box with roses and chocolates.',
    imgCover: '/assets/banner.webp',
    images: ['/assets/banner.webp'],
    price: 1250,
    priceAfterDiscount: 1099,
    discount: 12,
    quantity: 5,
    category: 'gift-boxes',
    occasion: 'birthday',
    createdAt: '2026-04-03T00:00:00.000Z',
    updatedAt: '2026-04-03T00:00:00.000Z',
    sold: 18,
    rateAvg: 4.8,
    rateCount: 124,
    favoriteId: null,
    isInWishlist: false,
    isSuperAdmin: false,
    __v: 0,
  };

  beforeEach(async () => {
    router = {
      navigate: vi.fn().mockResolvedValue(true),
    };

    await TestBed.configureTestingModule({
      imports: [ProductCardMolecule],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardMolecule);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to product details when opening the product', () => {
    component.openProductDetails();

    expect(router.navigate).toHaveBeenCalledWith([
      '/productdetails',
      mockProduct._id,
    ]);
  });
});
