import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CartItem, ProductData } from '@shop-workspace/shared-types';
import { SliderOrganism } from '@shop-workspace/shared-ui';
import {
  ArrowLeft,
  ArrowRight,
  LucideAngularModule,
  ShoppingBag,
  TicketPercent,
  Trash2,
} from 'lucide-angular';
import { HomeService } from '../../data-access/home.service';
import { CartUi } from '../data-access/cart.ui';
import { CartItemCardComponent } from '../ui/cart-item-card.component';

@Component({
  selector: 'lib-cart-feature-page',
  imports: [
    CartItemCardComponent,
    LucideAngularModule,
    RouterLink,
    SliderOrganism,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-feature-page.html',
})
export class CartFeaturePage implements OnInit {
  protected readonly cart = inject(CartUi);
  private readonly homeService = inject(HomeService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly couponCode = signal('');
  protected readonly products = signal<ProductData[]>([]);
  protected readonly recommendedProducts = computed(() =>
    this.products()
      .filter(
        (product) =>
          !this.cart.items().some((item) => item.productId === product._id),
      )
      .slice(0, 8),
  );

  protected readonly icons = {
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
    TicketPercent,
    Trash2,
  };

  ngOnInit(): void {
    this.cart.loadCart();
    this.loadRecommendations();
  }

  protected applyCoupon(): void {
    this.cart.applyCoupon(this.couponCode());
  }

  protected updateItemQuantity(item: CartItem, quantity: number): void {
    const requestedQuantity = Number.isFinite(quantity)
      ? Math.trunc(quantity)
      : item.quantity;
    const maxQuantity = Math.max(item.maxQuantity, 1);
    const nextQuantity = Math.min(
      Math.max(requestedQuantity, 1),
      maxQuantity,
    );

    this.cart.updateQty(this.cartItemApiId(item), nextQuantity);
  }

  protected removeItem(item: CartItem): void {
    this.cart.removeItem(this.cartItemApiId(item));
  }

  private loadRecommendations(): void {
    this.homeService
      .getHomeData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => this.products.set(response.products),
        error: () => this.products.set([]),
      });
  }

  private cartItemApiId(item: CartItem): string {
    return item.productId || item.id;
  }
}
