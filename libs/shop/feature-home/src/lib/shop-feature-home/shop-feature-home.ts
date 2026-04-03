import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BestSellerSectionFeature } from '../components/home/best-seller-section/best-seller-section-feature';
import { HomeService } from '../data-access/home.service';
import { Occasion, ProductData } from '@shop-workspace/shared-types';
import {
  GalleryOrganism,
  MostPopularOrganism,
  PromoBannerOrganism,
} from '@shop-workspace/shared-ui';
import {
  HOME_GALLERY_CONTENT,
  HOME_PROMO_CONTENT,
} from '../data-access/home-about-us-content';

@Component({
  selector: 'lib-shop-feature-home',
  imports: [
    BestSellerSectionFeature,
    MostPopularOrganism,
    PromoBannerOrganism,
    GalleryOrganism,
  ],
  templateUrl: './shop-feature-home.html',
  styleUrl: './shop-feature-home.scss',
})
export class ShopFeatureHome implements OnInit {
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);

  products = signal<ProductData[]>([]);
  bestSellers = signal<ProductData[]>([]);
  occasions = signal<Occasion[]>([]);
  activeOccasionId = signal<string | null>(null);
  readonly promoContent = HOME_PROMO_CONTENT;
  readonly galleryItems = HOME_GALLERY_CONTENT;
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

  private productMatchesOccasion(
    product: ProductData,
    occasionId: string,
  ): boolean {
    return product.occasion === occasionId;
  }
}
