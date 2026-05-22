import { Component, computed, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductData } from '@shop-workspace/shared-types';
import { BadgeAtom } from '../../atoms/badge/badge.atom';
import { PriceTagAtom } from '../../atoms/price/price-tag.atom';
import { RatingAtom } from '../../atoms/rating/rating.atom';
import { LibButton } from '../../atoms/lib-button/lib-button';
import { Eye, HeartPlus, ShoppingCart, HeartMinus } from 'lucide-angular';

@Component({
  selector: 'lib-product-card-molecule',
  standalone: true,
  imports: [CommonModule, BadgeAtom, PriceTagAtom, RatingAtom, LibButton],
  template: `
    <article
      class="group flex h-full flex-col overflow-hidden rounded-2xl bg-white transition-transform duration-300 hover:-translate-y-1"
    >
      <div class="relative h-[272px] overflow-hidden rounded-xl p-2.5">
        <img
          [src]="product().imgCover"
          [alt]="product().title"
          class="absolute inset-0 size-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          class="pointer-events-none absolute inset-0 rounded-2xl bg-[#e6939f]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-1"
        ></div>

        <div class="absolute left-2.5 top-2.5 z-3">
          <lib-button
            variant="custom"
            size="sm"
            ariaLabel="Toggle wishlist"
            [icon]="wishlistIcon()"
            customClass="h-[30px] min-w-[30px] rounded-full bg-white px-1.5 text-[#A6252A] shadow-sm transition-colors hover:bg-[#FBEAEA]"
            (clicked)="toggleWishlist()"
          ></lib-button>
        </div>

        <div
          class="absolute inset-0 z-2 flex items-center justify-center gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          <lib-button
            variant="custom"
            size="lg"
            ariaLabel="View product details"
            [icon]="eyeIcon"
            customClass="h-12 w-12 rounded-full bg-white text-[#A6252A] shadow-lg transition-transform duration-200 hover:scale-105"
            (clicked)="openProductDetails()"
          ></lib-button>
        </div>

        @if (badgeLabel()) {
          <div class="absolute right-2.5 top-2.5 z-3">
            <lib-badge-atom
              [label]="badgeLabel()"
              [variant]="badgeVariant()"
            ></lib-badge-atom>
          </div>
        }
      </div>

      <div class="flex items-end gap-2.5 pt-4">
        <div class="flex min-w-0 flex-1 flex-col gap-3">
          <h3
            class="line-clamp-2 text-lg font-semibold leading-none text-[#741C21]"
          >
            {{ product().title }}
          </h3>

          <lib-rating-atom
            [value]="product().rateAvg"
            [count]="product().rateCount"
          ></lib-rating-atom>

          <lib-price-tag-atom
            [currentPrice]="product().priceAfterDiscount || product().price"
            [oldPrice]="product().price"
          ></lib-price-tag-atom>
        </div>

        <div class="ml-auto flex items-end p-2">
          <lib-button
            variant="icon-only-primary"
            ariaLabel="Add to cart"
            [icon]="cartIcon"
            size="lg"
            (clicked)="addToCart.emit(product())"
          ></lib-button>
        </div>
      </div>
    </article>
  `,
})
export class ProductCardMolecule {
  private readonly router = inject(Router);

  product = input.required<ProductData>();

  addToCart = output<ProductData>();
  productClicked = output<ProductData>();
  addToWishlist = output<ProductData>();
  isInWishlist = input<boolean>(false);

  protected readonly cartIcon = ShoppingCart;
  protected readonly heartIcon = HeartPlus;
  protected readonly eyeIcon = Eye;
  protected readonly heartMinusIcon = HeartMinus;

  protected readonly wishlistIcon = computed(() =>
    this.isInWishlist() ? this.heartMinusIcon : this.heartIcon,
  );

  protected readonly badgeLabel = computed(() => {
    const item = this.product();

    if (
      'quantity' in item &&
      typeof item.quantity === 'number' &&
      item.quantity <= 0
    ) {
      return 'Out of stock';
    }

    if ('sold' in item && typeof item.sold === 'number' && item.sold > 5) {
      return 'Best seller';
    }

    return 'New';
  });

  protected readonly badgeVariant = computed<'accent' | 'danger' | 'warn'>(
    () => {
      const label = this.badgeLabel();

      if (label === 'Out of stock') {
        return 'danger';
      }

      if (label === 'Best seller') {
        return 'warn';
      }

      return 'accent';
    },
  );

  openProductDetails(): void {
    this.router.navigate(['/productdetails', this.product()._id]);
  }

  toggleWishlist() {
    this.addToWishlist.emit(this.product());
  }
}
