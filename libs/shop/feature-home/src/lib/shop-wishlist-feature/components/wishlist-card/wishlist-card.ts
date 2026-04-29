import { Component, input, output } from '@angular/core';
import { LucideAngularModule, Trash2, Plus } from 'lucide-angular';
import { WishlistProduct } from '@shop-workspace/shared-types';
import { LibButton } from '@shop-workspace/shared-ui';

@Component({
  selector: 'lib-wishlist-card',
  imports: [LucideAngularModule, LibButton],
  templateUrl: './wishlist-card.html',
  styleUrl: './wishlist-card.scss',
})
export class WishlistCard {
  product = input.required<WishlistProduct>();

  remove = output<string>();
  addToCart = output<WishlistProduct>();

  protected readonly icons = {
    Trash2,
    Plus,
  };
}
