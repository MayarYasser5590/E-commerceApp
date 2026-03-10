import { Component, Input } from '@angular/core';
import { ProductData } from '@shop-workspace/shared-types';
import { LibButton } from "@shop-workspace/shared-ui";
import { LucideAngularModule , ShoppingCart , Star, HeartPlus , Package } from 'lucide-angular';


@Component({
  selector: 'lib-details-section',
  imports: [LibButton , LucideAngularModule],
  templateUrl: './details-section.html',
  styleUrl: './details-section.scss',
})
export class DetailsSection {
  
  @Input() productId!: string | null;
  @Input() product!: ProductData;

  icons = {
    ShoppingCart , Star , HeartPlus , Package };

  selectedImage!: string;

  changeImage(img: string) {
    this.selectedImage = img;
  }

  get stock(): number {
    return Math.max(this.product.quantity, 0);
}

  addToWishlist(){
    console.log("wishlist");
    
  }
  addToCart(){
    console.log("cart");
    
  }

}
