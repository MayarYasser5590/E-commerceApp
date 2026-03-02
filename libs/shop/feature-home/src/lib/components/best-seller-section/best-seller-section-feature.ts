import { Component, inject, signal, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@shop-workspace/shared-types';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ProductCardOrganism } from '@shop-workspace/shared-ui';
import { HomeService } from '../../data-access/home.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-best-seller-section-feature',
  standalone: true,
  imports: [CommonModule,CarouselModule,ButtonModule,ProductCardOrganism
  ],
  templateUrl: './best-seller-section-feature.html',
  styleUrls: ['./best-seller-section-feature.scss']
})
export class BestSellerSectionFeature implements OnInit , OnDestroy {

  private readonly homeService = inject(HomeService);
  bestSellersSubscribe : Subscription = new Subscription();

  bestSellers = signal<Product[]>([]);

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

ngOnInit(): void {
  this.getBestSellerData()
  
}

getBestSellerData(){
  this.bestSellersSubscribe = this.homeService.getHomeData().subscribe({
    next:(res)=>{
      this.bestSellers.set(res.bestSeller);
      console.log(this.bestSellers);
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

ngOnDestroy(): void {
  this.bestSellersSubscribe.unsubscribe()
}
}