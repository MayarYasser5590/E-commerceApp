import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../data-access/product.service';
import { ProductData, Metadata } from '@shop-workspace/shared-types';
import { PaginatorModule } from 'primeng/paginator';
import { Subscription } from 'rxjs';
import { ProductCardOrganism } from "@shop-workspace/shared-ui";


@Component({
  selector: 'lib-products-feature',
  imports: [PaginatorModule, ProductCardOrganism],
  templateUrl: './products-feature.html',
  styleUrl: './products-feature.scss',
})
export class ProductsFeature implements OnInit, OnDestroy {
  private readonly productService = inject(ProductService);
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

onPageChange(event: any) {
  this.page.set(event.page + 1);
  this.updateVisibleProducts();
}

  onToggleWishlist(product: ProductData){
  console.log("wishlist toggle", product);
}
 
getAllProducts() {
  this.productsSubscribe =
    this.productService.getAllProducts().subscribe({
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

  addToCart(product: ProductData){
    console.log("add to cart", product);
  }

  ngOnDestroy(): void {
    this.productsSubscribe.unsubscribe();
  }
}