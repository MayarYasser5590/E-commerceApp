import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  Category,
  Metadata,
  Occasion,
  ProductData,
} from '@shop-workspace/shared-types';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/types/paginator';
import { forkJoin, Subscription } from 'rxjs';
import { CartUi } from '../../cart/data-access/cart.ui';
import {
  AppPaginatorMolecule,
  ProductCardMolecule,
} from '@shop-workspace/shared-ui';
import {
  ProductService,
  WishlistService,
  AppToastService,
} from '@shop-workspace/data-access';
import { ProductFilterSidebarComponent } from './product-filter-sidebar.component';
import {
  ProductFilterGroup,
  ProductFilterState,
} from './product-filter.models';
import {
  applyFilters,
  buildTaxonomyFilterOptions,
  createProductFilterState,
  getProductPriceRange,
  resetProductFilterGroup,
} from './product-filter.utils';

@Component({
  selector: 'lib-products-feature',
  imports: [
    PaginatorModule,
    ProductCardMolecule,
    ProductFilterSidebarComponent,
    AppPaginatorMolecule,
  ],
  templateUrl: './products-feature.html',
  styleUrl: './products-feature.scss',
})
export class ProductsFeature implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartUi);
  private wishlistService = inject(WishlistService);
  private toast = inject(AppToastService);
  allProducts = signal<ProductData[]>([]);
  categoryCatalog = signal<Category[]>([]);
  occasionCatalog = signal<Occasion[]>([]);
  products = signal<ProductData[]>([]);
  selectedFilters = signal<ProductFilterState>(createProductFilterState());
  filtersOpen = signal(false);
  ratingOptions = [5, 4, 3, 2, 1];
  filteredProducts = computed(() =>
    applyFilters(this.allProducts(), this.selectedFilters()),
  );
  categories = computed(() =>
    buildTaxonomyFilterOptions(
      this.categoryCatalog(),
      this.allProducts(),
      'category',
    ),
  );
  occasions = computed(() =>
    buildTaxonomyFilterOptions(
      this.occasionCatalog(),
      this.allProducts(),
      'occasion',
    ),
  );
  priceRange = computed(() => getProductPriceRange(this.allProducts()));
  metaData!: Metadata;
  totalProducts = signal(0);
  page = signal(1);
  rows = 12;
  productsSubscribe: Subscription = new Subscription();

  ngOnInit(): void {
    this.getAllProducts();
  }

  onPageChange(event: PaginatorState) {
    this.page.set((event.page ?? 0) + 1);
    this.updateVisibleProducts();
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

  getAllProducts() {
    this.productsSubscribe = forkJoin({
      products: this.productService.getAllProducts(),
      categories: this.productService.getCategories(),
      occasions: this.productService.getOccasions(),
    }).subscribe({
      next: ({ products, categories, occasions }) => {
        this.categoryCatalog.set(categories);
        this.occasionCatalog.set(occasions);
        this.allProducts.set(products.products);
        this.totalProducts.set(this.filteredProducts().length);
        this.updateVisibleProducts();
      },
      error: (err) => console.log(err),
    });
  }

  updateVisibleProducts() {
    const filteredProducts = this.filteredProducts();
    const start = (this.page() - 1) * this.rows;
    const end = start + this.rows;
    this.totalProducts.set(filteredProducts.length);
    this.products.set(filteredProducts.slice(start, end));
  }

  onFiltersChange(filters: ProductFilterState): void {
    this.selectedFilters.set(filters);
    this.page.set(1);
    this.updateVisibleProducts();
  }

  resetFilterGroup(group: ProductFilterGroup): void {
    this.onFiltersChange(
      resetProductFilterGroup(this.selectedFilters(), group),
    );
  }

  resetAllFilters(): void {
    this.onFiltersChange(createProductFilterState());
  }

  addToCart(product: ProductData) {
    this.cart.addItem(product);
  }

  ngOnDestroy(): void {
    this.productsSubscribe.unsubscribe();
  }
}
