import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { WishlistPage } from './wishlist-page';
import { WishlistService } from '@shop-workspace/shop-feature-home';
import { of } from 'rxjs';

class WishlistServiceMock {
  items = signal([]);

  loadWishlist(): void {
    return undefined;
  }

  removeFromWishlist() {
    return of({ wishlist: { products: [] } });
  }

  clearWishlist() {
    return of({ wishlist: { products: [] } });
  }

  setWishlist(): void {
    return undefined;
  }
}

describe('WishlistPage', () => {
  let component: WishlistPage;
  let fixture: ComponentFixture<WishlistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistPage],
      providers: [
        provideRouter([]),
        { provide: WishlistService, useClass: WishlistServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
