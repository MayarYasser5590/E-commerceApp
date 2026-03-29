import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ShopFeatureHome } from './shop-feature-home';
import { HomeService } from '../data-access/home.service';
import { HomeResponse } from '@shop-workspace/shared-types';

describe('ShopFeatureHome', () => {
  let component: ShopFeatureHome;
  let fixture: ComponentFixture<ShopFeatureHome>;

  const mockHomeResponse: HomeResponse = {
    message: 'ok',
    categories: [],
    occasions: [
      {
        _id: 'occasion-1',
        name: 'Birthday',
        slug: 'birthday',
        image: '',
        createdAt: '',
        updatedAt: '',
        isSuperAdmin: false,
      },
    ],
    bestSeller: [],
    products: [
      {
        id: '1',
        _id: '1',
        title: 'Birthday Box',
        slug: 'birthday-box',
        description: 'A birthday gift box',
        imgCover: '/assets/banner.webp',
        price: 1000,
        priceAfterDiscount: 850,
        quantity: 3,
        sold: 12,
        rateAvg: 4,
        rateCount: 22,
        occasion: 'occasion-1',
        category: 'category-1',
        createdAt: '',
        updatedAt: '',
        favoriteId: null,
        isInWishlist: false,
        isSuperAdmin: false,
        __v: 0,
        images: [],
      },
      {
        id: '2',
        _id: '2',
        title: 'Wedding Hamper',
        slug: 'wedding-hamper',
        description: 'A wedding gift hamper',
        imgCover: '/assets/banner.webp',
        price: 1200,
        priceAfterDiscount: 1000,
        quantity: 8,
        sold: 4,
        rateAvg: 5,
        rateCount: 14,
        occasion: 'occasion-2',
        category: 'category-1',
        createdAt: '',
        updatedAt: '',
        favoriteId: null,
        isInWishlist: false,
        isSuperAdmin: false,
        __v: 0,
        images: [],
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopFeatureHome],
      providers: [
        {
          provide: HomeService,
          useValue: {
            getHomeData: () => of(mockHomeResponse),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShopFeatureHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products by selected occasion', () => {
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].slug).toBe('birthday-box');

    component.onOccasionChanged(null);
    expect(component.filteredProducts().length).toBe(2);
  });
});
