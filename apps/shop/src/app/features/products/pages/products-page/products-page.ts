import { Component } from '@angular/core';
import { ProductsFeature } from "@shop-workspace/shop-feature-home";

@Component({
  selector: 'app-products-page',
  imports: [ProductsFeature],
  templateUrl: './products-page.html',
  styleUrl: './products-page.scss',
})
export class ProductsPage {}
