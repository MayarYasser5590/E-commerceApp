import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { BestSellerSectionFeature } from "../components/home/best-seller-section/best-seller-section-feature";
import { HomeService } from '../data-access/home.service';
import { Subscription } from 'rxjs';
import { Product } from '@shop-workspace/shared-types';
@Component({
  selector: 'lib-shop-feature-home',
  imports: [BestSellerSectionFeature],
  templateUrl: './shop-feature-home.html',
  styleUrl: './shop-feature-home.scss',
})
export class ShopFeatureHome implements OnInit , OnDestroy {

  private readonly homeService = inject(HomeService);
  bestSellers = signal<Product[]>([]);

  HomeSubscribe : Subscription = new Subscription();

  ngOnInit(): void {
    this.getHomeData()
  
 }

getHomeData(){
  this.HomeSubscribe = this.homeService.getHomeData().subscribe({
    next:(res)=>{
      this.bestSellers.set(res.bestSeller);
    },
    error:(err)=>{
      console.log(err);
    }
  })
}

ngOnDestroy(): void {
  this.HomeSubscribe.unsubscribe()
}
}
