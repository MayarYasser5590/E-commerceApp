import { Component , input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, ProductData } from '@shop-workspace/shared-types';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProductCardOrganism, SliderOrganism } from '@shop-workspace/shared-ui';
import {LibButton} from '@shop-workspace/shared-ui'

@Component({
  selector: 'lib-best-seller-section-feature',
  standalone: true,
  imports: [CommonModule, CarouselModule, ButtonModule, ProductCardOrganism, LibButton, SliderOrganism],
  templateUrl: './best-seller-section-feature.html',
  styleUrls: ['./best-seller-section-feature.scss']
})
export class BestSellerSectionFeature {
   bestSellers = input<Product[]>([]);

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