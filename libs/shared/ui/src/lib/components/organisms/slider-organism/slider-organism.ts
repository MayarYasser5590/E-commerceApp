import { Component, input, output } from '@angular/core';
import {
  ProductData,
  RelatedProduct,
} from '@shop-workspace/shared-types';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { ProductCardOrganism } from '../product-card-organism/product-card-organism';
import { ProductCardMolecule } from '../../molecules/product-card/product-card.molecule';

@Component({
  selector: 'lib-slider-organism',
  imports: [
    CommonModule,
    CarouselModule,
    ProductCardOrganism,
    ProductCardMolecule,
  ],
  templateUrl: './slider-organism.html',
  styleUrl: './slider-organism.scss',
})
export class SliderOrganism {
  products = input<(ProductData | RelatedProduct | ProductData)[]>([]);
  numVisible = input<number>(3);
  productClicked = output<ProductData>();
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1,
    },
  ];
}
