import { Component, inject, Input } from '@angular/core';
import { ProductData } from '@shop-workspace/shared-types';
import { LibButton } from '@shop-workspace/shared-ui';
import {
  LucideAngularModule,
  ShoppingCart,
  Star,
  HeartPlus,
  Package,
} from 'lucide-angular';
import { CartUi } from '../../../../cart/data-access/cart.ui';

@Component({
  selector: 'lib-details-section',
  imports: [LibButton, LucideAngularModule],
  templateUrl: './details-section.html',
  styleUrl: './details-section.scss',
})
export class DetailsSection {
  private readonly cart = inject(CartUi);
  @Input() productId!: string | null;
  @Input() product!: ProductData;

  icons = {
    ShoppingCart,
    Star,
    HeartPlus,
    Package,
  };

  selectedImage!: string;

  changeImage(img: string) {
    this.selectedImage = img;
  }

  get stock(): number {
    return Math.max(this.product.quantity, 0);
  }

  addToCart() {
    this.cart.addItem(this.product);
  }

  addToWishlist() {
    console.log('wishlist');
  }
}
