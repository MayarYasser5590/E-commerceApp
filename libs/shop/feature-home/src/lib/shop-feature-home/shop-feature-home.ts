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
import { HomeService } from '../data-access/home.service';
import { Occasion, ProductData } from '@shop-workspace/shared-types';
import {
  GalleryOrganism,
  MostPopularOrganism,
} from '@shop-workspace/shared-ui';
import { CartUi } from '../cart/data-access/cart.ui';

@Component({
  selector: 'lib-shop-feature-home',
  imports: [
    BestSellerSectionFeature,
    AboutUsSection,
    GalleryOrganism,
    MostPopularOrganism,
  ],
  templateUrl: './shop-feature-home.html',
  styleUrl: './shop-feature-home.scss',
})
export class ShopFeatureHome implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly cart = inject(CartUi);

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
}
