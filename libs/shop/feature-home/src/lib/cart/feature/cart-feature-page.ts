import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '@shop-workspace/shared-types';
import {
  ArrowLeft,
  ArrowRight,
  LucideAngularModule,
  ShoppingBag,
  TicketPercent,
  Trash2,
} from 'lucide-angular';
import { CartUi } from '../data-access/cart.ui';
import { CartItemCardComponent } from '../ui/cart-item-card.component';

@Component({
  selector: 'lib-cart-feature-page',
  imports: [CartItemCardComponent, LucideAngularModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cart-feature-page.html',
  standalone: true,
})
export class CartFeaturePage implements OnInit {
  protected readonly cart = inject(CartUi);

  protected readonly icons = {
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
    TicketPercent,
    Trash2,
  };

  ngOnInit(): void {
    this.cart.loadCart();
  }

  protected updateItemQuantity(item: CartItem, quantity: number): void {
    const requestedQuantity = Number.isFinite(quantity)
      ? Math.trunc(quantity)
      : item.quantity;
    const maxQuantity = Math.max(item.maxQuantity, 1);
    const nextQuantity = Math.min(Math.max(requestedQuantity, 1), maxQuantity);

    this.cart.updateQty(this.cartItemApiId(item), nextQuantity);
  }

  protected removeItem(item: CartItem): void {
    this.cart.removeItem(this.cartItemApiId(item));
  }

  private cartItemApiId(item: CartItem): string {
    return item.productId || item.id;
  }
}
