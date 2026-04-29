import { Component } from '@angular/core';
import { ShopWishlistFeature } from '@shop-workspace/shop-feature-home';

@Component({
  selector: 'app-wishlist-page',
  imports: [ShopWishlistFeature],
  templateUrl: './wishlist-page.html',
  styleUrl: './wishlist-page.scss',
})
export class WishlistPage {}
