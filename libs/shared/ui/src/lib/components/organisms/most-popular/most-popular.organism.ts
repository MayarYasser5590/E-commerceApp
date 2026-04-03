import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Occasion, ProductData } from '@shop-workspace/shared-types';
import { SectionHeadingAtom } from '../../atoms/heading/section-heading.atom';
import { FilterTabsMolecule } from '../../molecules/filter-tabs/filter-tabs.molecule';
import { ProductCardMolecule } from '../../molecules/product-card/product-card.molecule';

@Component({
  selector: 'lib-most-popular-organism',
  standalone: true,
  imports: [
    CommonModule,
    SectionHeadingAtom,
    FilterTabsMolecule,
    ProductCardMolecule,
  ],
  template: `
    <section class="space-y-8 rounded-[32px] px-4 py-8 md:px-8 md:py-10">
      <div
        class="flex flex-col gap-30 lg:flex-row lg:items-end lg:justify-between"
      >
        <lib-section-heading-atom
          title="Most popular"
          class="w-full"
        ></lib-section-heading-atom>

        <lib-filter-tabs-molecule
          [options]="occasions()"
          [activeValue]="activeOccasionId()"
          (tabChanged)="occasionChanged.emit($event)"
        ></lib-filter-tabs-molecule>
      </div>

      @if (products().length) {
        <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          @for (product of products(); track product._id ?? product.id) {
            <lib-product-card-molecule
              [product]="product"
              (addToCart)="productClicked.emit($event)"
            ></lib-product-card-molecule>
          }
        </div>
      } @else {
        <div
          class="rounded-[28px] border border-dashed border-[#d7a4a8] bg-white px-6 py-10 text-center text-stone-500"
        >
          No products matched the selected occasion.
        </div>
      }
    </section>
  `,
})
export class MostPopularOrganism {
  products = input<ProductData[]>([]);
  occasions = input<Occasion[]>([]);
  activeOccasionId = input<string | null>(null);

  occasionChanged = output<string | null>();
  productClicked = output<ProductData>();
}
