import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductData } from '@shop-workspace/shared-types';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { SliderOrganism } from '@shop-workspace/shared-ui';
import { LibButton } from '@shop-workspace/shared-ui';

@Component({
  selector: 'lib-best-seller-section-feature',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    ButtonModule,
    LibButton,
    SliderOrganism,
  ],
  templateUrl: './best-seller-section-feature.html',
  styleUrls: ['./best-seller-section-feature.scss'],
})
export class BestSellerSectionFeature {
  bestSellers = input<ProductData[]>([]);
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
