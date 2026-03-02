import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { Product } from '@shop-workspace/shared-types';
import { LucideAngularModule, ShoppingCart } from 'lucide-angular';


@Component({
  selector: 'lib-product-card-organism', 
  standalone: true,
  imports: [CommonModule,TagModule,RatingModule,FormsModule , LucideAngularModule],
  templateUrl: './product-card-organism.html',
  styleUrls: ['./product-card-organism.scss']
})
export class ProductCardOrganism {
  @Input() product!: Product;

    icons = {ShoppingCart};
}