import { Component, input } from '@angular/core';
import { Product, ProductData, RelatedProduct } from '@shop-workspace/shared-types';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardOrganism } from '../product-card-organism/product-card-organism';


@Component({
  selector: 'lib-slider-organism',
  imports: [CommonModule , CarouselModule , ProductCardOrganism],
  templateUrl: './slider-organism.html',
  styleUrl: './slider-organism.scss',
})
export class SliderOrganism {
products = input<(ProductData | RelatedProduct | Product)[]>([]);
numVisible = input<number>(3);
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ];

}
