import { Component, inject, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { ProductService } from '../../../../data-access/product.service';
import { RelatedProduct } from '@shop-workspace/shared-types';
import { SliderOrganism } from "@shop-workspace/shared-ui";
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-related-products-section',
  imports: [SliderOrganism],
  templateUrl: './related-products-section.html',
  styleUrl: './related-products-section.scss',
})
export class RelatedProductsSection implements OnInit , OnDestroy {
  private productService = inject(ProductService);
  @Input({ required: true }) productId!: string;
  relatedProducts = signal<RelatedProduct[]>([]);
  relatedProductsSubscribe : Subscription = new Subscription()

  ngOnInit(): void {
    this.getRelatedProducts();
  }

  getRelatedProducts() {
     this.relatedProductsSubscribe = this.productService.getRelatedProductByGategory(this.productId).subscribe({

      next:(res)=>{
          this.relatedProducts.set(res.relatedProducts);
      },
      error:(err)=>{
        console.log(err);
      }

    });

  }

  ngOnDestroy(): void {
      this.relatedProductsSubscribe.unsubscribe();
  }
}
