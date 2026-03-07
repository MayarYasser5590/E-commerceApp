import { Component, input, Input } from '@angular/core';
import { Product } from '../../../../product.service';
import { LibButton } from "@shop-workspace/shared-ui";
import { LucideAngularModule , Heart , ShoppingCart , Star, LucideIconData } from 'lucide-angular';


@Component({
  selector: 'lib-details-section',
  imports: [LibButton , LucideAngularModule],
  templateUrl: './details-section.html',
  styleUrl: './details-section.scss',
})
export class DetailsSection {
  
  @Input() productId!: string | null;
  @Input() product!: Product;

  icons = {
    Heart , ShoppingCart , Star};

  selectedImage!: string;
  icon = input<LucideIconData | undefined>(undefined);

  changeImage(img: string) {
    this.selectedImage = img;
  }

  addToWishlist(){
    console.log("wishlist");
    
  }
  addToCart(){
    console.log("cart");
    
  }

}
