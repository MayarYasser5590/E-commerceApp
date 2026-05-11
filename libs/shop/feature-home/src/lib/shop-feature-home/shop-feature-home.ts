import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BestSellerSectionFeature } from './components/best-seller-section/best-seller-section-feature';
import { AboutUsSection } from './components/about-us-section/about-us-section';
import { SpecialGiftsSection } from '../components/home/special-gifts-section/special-gifts-section';
import { TestimonialsSection } from '../components/home/testimonials-section/testimonials-section';
import { HomeService } from '../data-access/home.service';
import { Occasion, ProductData } from '@shop-workspace/shared-types';
import {
  GalleryOrganism,
  MostPopularOrganism,
} from '@shop-workspace/shared-ui';
import { WishlistService } from '../data-access/wishlist.service';
import { FeaturesBarSection } from './components/features-bar-section/features-bar-section';
import { TrustedBySection } from './components/trusted-by-section/trusted-by-section';
import { CartUi } from '../cart/data-access/cart.ui';
import { AppToastService } from '../data-access/toast.service';

@Component({
  selector: 'lib-shop-feature-home',
  host: {
    class: 'block',
  },
  imports: [
    BestSellerSectionFeature,
    SpecialGiftsSection,
    AboutUsSection,
    TestimonialsSection,
    GalleryOrganism,
    MostPopularOrganism,
    FeaturesBarSection,
    TrustedBySection,
  ],
  templateUrl: './shop-feature-home.html',
})
export class ShopFeatureHome implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cart = inject(CartUi);
  private wishlistService = inject(WishlistService);
  private toast = inject(AppToastService);

  products = signal<ProductData[]>([]);
  bestSellers = signal<ProductData[]>([]);
  occasions = signal<Occasion[]>([]);
  activeOccasionId = signal<string | null>(null);
  readonly filteredProducts = computed(() => {
    const selectedOccasionId = this.activeOccasionId();
    const products = this.products();

    if (!selectedOccasionId) {
      return products;
    }

    return products.filter((product) =>
      this.productMatchesOccasion(product, selectedOccasionId),
    );
  });

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData(): void {
    this.homeService
      .getHomeData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.products.set(res.products);
          this.occasions.set(res.occasions);
          this.activeOccasionId.set(res.occasions[0]?._id ?? null);
          this.bestSellers.set(res.bestSeller);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onOccasionChanged(occasionId: string | null): void {
    this.activeOccasionId.set(occasionId);
  }

  addToCart(product: ProductData): void {
    this.cart.addItem(product);
  }

  private productMatchesOccasion(
    product: ProductData,
    occasionId: string,
  ): boolean {
    return product.occasion === occasionId;
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  onToggleWishlist(product: ProductData) {
    const wasInWishlist = this.wishlistService.isInWishlist(product._id);

    this.wishlistService.toggle(product);

    if (wasInWishlist) {
      this.toast.error('Removed from wishlist');
    } else {
      this.toast.success('Added to wishlist');
    }
  }
}
