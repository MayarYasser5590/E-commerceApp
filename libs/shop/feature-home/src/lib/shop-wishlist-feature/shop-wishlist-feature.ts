import { Component, inject, OnInit, signal } from '@angular/core';
import { WishlistService } from '../data-access/wishlist.service';
import { WishlistProduct } from '@shop-workspace/shared-types';
import { LibButton } from '@shop-workspace/shared-ui';
import { LucideAngularModule, Trash2, Heart, ArrowLeft } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { WishlistCard } from './components/wishlist-card/wishlist-card';

@Component({
  selector: 'lib-shop-wishlist-feature',
  imports: [LucideAngularModule, RouterLink, LibButton, WishlistCard],
  templateUrl: './shop-wishlist-feature.html',
  styleUrl: './shop-wishlist-feature.scss',
})
export class ShopWishlistFeature implements OnInit {
  private wishlistService = inject(WishlistService);
  wishlist = signal<WishlistProduct[]>([]);
  icons = {
    Trash2,
    Heart,
    ArrowLeft,
  };

  ngOnInit(): void {
    this.getAllWishlist();
  }

  getAllWishlist() {
    this.wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist.set(res.wishlist.products);
        this.wishlistService['wishlistItems'].set(res.wishlist.products);
      },
      error: (err) => console.log(err),
    });
  }

  removeFromWishlist(id: string) {
    this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.wishlist.set(res.wishlist.products);
        this.wishlistService['wishlistItems'].set(res.wishlist.products);
      },
      error: (err) => console.log(err),
    });
  }

  clearWishlist() {
    this.wishlistService.clearWishlist().subscribe({
      next: (res) => {
        this.wishlist.set(res.wishlist.products);
        this.wishlistService['wishlistItems'].set(res.wishlist.products);
      },
      error: (err) => console.log(err),
    });
  }

  addToCart() {
    //
  }
}
