import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-related-products-section',
  imports: [],
  templateUrl: './related-products-section.html',
  styleUrl: './related-products-section.scss',
})
export class RelatedProductsSection {
    @Input() productId!: string | null;

}
