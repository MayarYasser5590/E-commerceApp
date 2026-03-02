import { Component } from '@angular/core';
import { ButtonShowcase } from '../button-showcase';
import { BestSellerSectionFeature } from "../components/best-seller-section/best-seller-section-feature";
@Component({
  selector: 'lib-shop-feature-home',
  imports: [ButtonShowcase, BestSellerSectionFeature],
  templateUrl: './shop-feature-home.html',
  styleUrl: './shop-feature-home.scss',
})
export class ShopFeatureHome {}
