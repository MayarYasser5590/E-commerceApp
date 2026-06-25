import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsSection } from './components/details-section/details-section';
import { RatingsSection } from './components/Ratings-section/ratings-section';
import { RelatedProductsSection } from './components/related-products/related-products-section';
import { ProductData, RelatedProduct } from '@shop-workspace/shared-types';
import {
  WishlistService,
  AppToastService,
  ProductService,
} from '@shop-workspace/data-access';

@Component({
  selector: 'lib-product-details-feature',
  imports: [DetailsSection, RatingsSection, RelatedProductsSection],
  templateUrl: './product-details-feature.html',
  styleUrl: './product-details-feature.scss',
})
export class ProductDetailsFeature implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private toast = inject(AppToastService);
  productId = signal<string | null>(null);
  product = signal<ProductData | null>(null);

  activateRouteSubscribe: Subscription = new Subscription();
  specificProductSubscribe: Subscription = new Subscription();
  private wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.getProductId();
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  isInWishlistFn = (id: string) => this.isInWishlist(id);

  getProductId() {
    this.activateRouteSubscribe = this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        const id = p.get('id');
        this.productId.set(id);
        if (id) {
          this.getSpecificProduct(id);
        }
      },
    });
  }

  getSpecificProduct(id: string) {
    this.specificProductSubscribe = this.productService
      .getProductById(id)
      .subscribe({
        next: (res) => {
          this.product.set(res.product);
          console.log(res);
        },
      });
  }

  onToggleWishlist(product: ProductData | RelatedProduct) {
    const wasInWishlist = this.wishlistService.isInWishlist(product._id);

    this.wishlistService.toggle(product);

    if (wasInWishlist) {
      this.toast.error('Removed from wishlist');
    } else {
      this.toast.success('Added to wishlist');
    }
  }

  ngOnDestroy(): void {
    this.activateRouteSubscribe.unsubscribe();
    this.specificProductSubscribe.unsubscribe();
  }
}
