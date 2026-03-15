import { Component } from '@angular/core';
import { ProductDetailsFeature } from "@shop-workspace/shop-feature-home";

@Component({
  selector: 'app-product-details-pages',
  imports: [ProductDetailsFeature],
  templateUrl: './product-details-pages.html',
  styleUrl: './product-details-pages.scss',
})
export class ProductDetailsPages {}
