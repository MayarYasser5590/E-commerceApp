import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../data-access/wishlist.service';
import { LibButton } from '@shop-workspace/shared-ui';
import { LucideAngularModule, Trash2, Heart, ArrowLeft } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { WishlistCard } from './components/wishlist-card/wishlist-card';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lib-shop-wishlist-feature',
  imports: [LucideAngularModule, RouterLink, LibButton, WishlistCard],
  templateUrl: './shop-wishlist-feature.html',
  styleUrl: './shop-wishlist-feature.scss',
})
export class ShopWishlistFeature implements OnInit, OnDestroy {
  private wishlistService = inject(WishlistService);
  wishlistSubscriptions: Subscription = new Subscription(); //container
  wishlist = this.wishlistService.items;
  icons = {
    Trash2,
    Heart,
    ArrowLeft,
  };

  ngOnInit(): void {
    this.wishlistService.loadWishlist();
  }

  removeFromWishlist(id: string) {
    const sub = this.wishlistService.removeFromWishlist(id).subscribe({
      next: (res) => {
        this.wishlist.set(res.wishlist.products);
        this.wishlistService.setWishlist(res.wishlist.products);
      },
      error: (err) => console.log(err),
    });

    this.wishlistSubscriptions.add(sub);
  }

  clearWishlist() {
    const sub = this.wishlistService.clearWishlist().subscribe({
      next: (res) => {
        this.wishlist.set(res.wishlist.products);
        this.wishlistService.setWishlist(res.wishlist.products);
      },
      error: (err) => console.log(err),
    });

    this.wishlistSubscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.wishlistSubscriptions.unsubscribe();
  }

  addToCart() {
    // i'll do it when cart logic merged
  }
}
