import { RouterLink } from '@angular/router';
import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Product, ProductData } from '@shop-workspace/shared-types';
import { LucideAngularModule, ShoppingCart , Heart } from 'lucide-angular';


@Component({
  selector: 'lib-product-card-organism', 
  standalone: true,
  imports: [CommonModule,TagModule,RatingModule,FormsModule , LucideAngularModule , RouterLink],
  templateUrl: './product-card-organism.html',
  styleUrls: ['./product-card-organism.scss']
})
export class ProductCardOrganism {
  product = input.required<ProductData>();

    icons = {ShoppingCart , Heart};


  showWishlist = input<boolean>(true);
  showCart = input<boolean>(true);

  addToCart = output<ProductData>();
  toggleWishlist = output<ProductData>();
}