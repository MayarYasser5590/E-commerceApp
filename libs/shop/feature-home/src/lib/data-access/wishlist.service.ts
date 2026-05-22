import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import {
  CheckWishlistResponse,
  WishlistProduct,
  WishlistResponse,
  WishlistToggleProduct,
} from '@shop-workspace/shared-types';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly baseUrl = this.config.apiUrl;

  wishlistItems = signal<WishlistProduct[]>([]);
  wishlistIds = computed(() => new Set(this.wishlistItems().map((p) => p.id)));
  wishlistCount = computed(() => this.wishlistItems().length);

  getWishlist(): Observable<WishlistResponse> {
    return this.httpClient.get<WishlistResponse>(`${this.baseUrl}/wishlist`);
  }

  addToWishlist(productId: string): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${this.baseUrl}/wishlist`,
      { productId },
    );
  }

  removeFromWishlist(productId: string): Observable<WishlistResponse> {
    return this.httpClient.delete<WishlistResponse>(
      `${this.baseUrl}/wishlist/${productId}`,
    );
  }

  clearWishlist(): Observable<WishlistResponse> {
    return this.httpClient.post<WishlistResponse>(
      `${this.baseUrl}/wishlist/clear`,
      {},
    );
  }

  checkProductInWishlist(productId: string): Observable<CheckWishlistResponse> {
    return this.httpClient.get<CheckWishlistResponse>(
      `${this.baseUrl}/wishlist/check/${productId}`,
    );
  }

  loadWishlist() {
    this.getWishlist().subscribe({
      next: (res) => {
        this.wishlistItems.set(res.wishlist.products);
      },
    });
  }

  get items() {
    return this.wishlistItems;
  }

  setWishlist(products: WishlistProduct[]) {
    this.wishlistItems.set(products);
  }

  toggle(product: WishlistToggleProduct) {
    // check if product exist
    const exists = this.wishlistIds().has(product._id);
    // update items in UI
    if (exists) {
      this.wishlistItems.update((items) =>
        items.filter((p) => p.id !== product._id),
      );
    } else {
      this.wishlistItems.update((items) => [
        ...items,
        {
          _id: product._id,
          id: product._id,
          title: product.title,
          imgCover: product.imgCover,
          price: product.price,
          priceAfterDiscount: product.priceAfterDiscount,
          discount: product.discount ?? 0,
          rateAvg: product.rateAvg,
        },
      ]);
    }

    const request = exists
      ? this.removeFromWishlist(product._id)
      : this.addToWishlist(product._id);

    request.subscribe({
      error: () => {
        this.loadWishlist();
      },
    });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistIds().has(productId);
  }
}
