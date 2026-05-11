import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { ProductData, Metadata } from '@shop-workspace/shared-types';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/types/paginator';
import { Subscription } from 'rxjs';
import { CartUi } from '../../cart/data-access/cart.ui';
import { ProductCardOrganism } from '@shop-workspace/shared-ui';
import { ProductCardMolecule } from '@shop-workspace/shared-ui';
import { WishlistService } from '../../data-access/wishlist.service';
import { AppToastService } from '../../data-access/toast.service';

@Component({
  selector: 'lib-products-feature',
  imports: [PaginatorModule, ProductCardMolecule],
  templateUrl: './products-feature.html',
  styleUrl: './products-feature.scss',
})
export class ProductsFeature implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
  private readonly cart = inject(CartUi);
  private wishlistService = inject(WishlistService);
  private toast = inject(AppToastService);
  allProducts = signal<ProductData[]>([]);
  products = signal<ProductData[]>([]);
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
    this.productsSubscribe = this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.products);

        this.totalProducts.set(res.metadata.totalItems);
        this.updateVisibleProducts();
      },
      error: (err) => console.log(err),
    });
  }

  updateVisibleProducts() {
    const start = (this.page() - 1) * this.rows;
    const end = start + this.rows;
    this.products.set(this.allProducts().slice(start, end));
  }

  addToCart(product: ProductData) {
    this.cart.addItem(product);
  }

  ngOnDestroy(): void {
    this.productsSubscribe.unsubscribe();
  }
}
