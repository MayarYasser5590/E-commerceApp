import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsSection } from "./components/details-section/details-section";
import { RatingsSection } from "./components/Ratings-section/ratings-section";
import { RelatedProductsSection } from "./components/related-products/related-products-section";
import {ProductService } from '../../data-access/product.service';
import { ProductData } from '@shop-workspace/shared-types';

@Component({
  selector: 'lib-product-details-feature',
  imports: [DetailsSection, RatingsSection, RelatedProductsSection],
  templateUrl: './product-details-feature.html',
  styleUrl: './product-details-feature.scss',
})
export class ProductDetailsFeature implements OnInit , OnDestroy{

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
    productId = signal<string | null>(null);
  product = signal<ProductData | null>(null);

  activateRouteSubscribe : Subscription = new Subscription();
  specificProductSubscribe : Subscription = new Subscription();


  ngOnInit(): void {
    this.getProductId();
}

   getProductId() {
    this.activateRouteSubscribe = this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        const id = p.get('id');
        this.productId.set(id);
        if (id) {
        this.getSpecificProduct(id);
        }
      }
    });
  }

  getSpecificProduct(id: string) {
    this.specificProductSubscribe = this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product.set(res.product);
              console.log(res); 

      }
    });
  }


  ngOnDestroy(): void {
  this.activateRouteSubscribe.unsubscribe();
  this.specificProductSubscribe.unsubscribe();
}
}
