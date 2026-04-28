import { Component, Input, output } from '@angular/core';
import { ProductData } from '@shop-workspace/shared-types';
import { LibButton } from '@shop-workspace/shared-ui';
import {
  LucideAngularModule,
  ShoppingCart,
  Star,
  HeartPlus,
  Package,
  HeartMinus,
} from 'lucide-angular';

@Component({
  selector: 'lib-details-section',
  imports: [LibButton, LucideAngularModule],
  templateUrl: './details-section.html',
  styleUrl: './details-section.scss',
})
export class DetailsSection {
  @Input() productId!: string | null;
  @Input() product!: ProductData;

  @Input() isInWishlistFn!: (id: string) => boolean;
  toggleWishlist = output<ProductData>();

  icons = {
    ShoppingCart,
    Star,
    HeartPlus,
    Package,
    HeartMinus,
  };

  selectedImage!: string;

  changeImage(img: string) {
    this.selectedImage = img;
  }

  get stock(): number {
    return Math.max(this.product.quantity, 0);
  }

  onToggleWishlist() {
    this.toggleWishlist.emit(this.product);
  }

  addToCart() {
    console.log('cart');
  }
}
