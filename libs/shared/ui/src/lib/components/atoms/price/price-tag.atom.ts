import { Component, input } from '@angular/core';

@Component({
  selector: 'lib-price-tag-atom',
  standalone: true,
  template: `
    <div class="flex items-baseline gap-2">
      <span class="text-lg font-semibold text-[#741C21]">
        {{ currentPrice() }} {{ currency() }}
      </span>

      @if (oldPrice() && oldPrice()! > currentPrice()) {
        <span class="text-sm text-stone-400 line-through">
          {{ oldPrice() }} {{ currency() }}
        </span>
      }
    </div>
  `,
})
export class PriceTagAtom {
  currentPrice = input(0);
  oldPrice = input<number | null>(null);
  currency = input('EGP');
}
