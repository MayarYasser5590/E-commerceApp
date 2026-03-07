import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DetailsSection } from "./components/details-section/details-section";
import { RatingsSection } from "./components/Ratings-section/ratings-section";
import { RelatedProductsSection } from "./components/related-products/related-products-section";
import { Product, ProductService } from './../../product.service';

@Component({
  selector: 'lib-product-details-feature',
  imports: [DetailsSection, RatingsSection, RelatedProductsSection],
  templateUrl: './product-details-feature.html',
  styleUrl: './product-details-feature.scss',
})
export class ProductDetailsFeature implements OnInit , OnDestroy{

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  productId : string | null = '673e2bd91159920171828139';
  product!: Product;
  activateRouteSubscribe : Subscription = new Subscription();
  specificProductSubscribe : Subscription = new Subscription();


  ngOnInit(): void {
    this.getProductId();
}

   getProductId() {
    this.activateRouteSubscribe = this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        // this.productId = p.get('id');
        this.productId = '673e2bd91159920171828139';

        if (this.productId) {
          this.getSpecificProduct(this.productId);
        }
      }
    });
  }

  getSpecificProduct(id: string) {
    this.specificProductSubscribe = this.productService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.product;
              console.log(res); // تأكدي إن فيه data

      }
    });
  }


  ngOnDestroy(): void {
  this.activateRouteSubscribe.unsubscribe();
  this.specificProductSubscribe.unsubscribe();
}
}
