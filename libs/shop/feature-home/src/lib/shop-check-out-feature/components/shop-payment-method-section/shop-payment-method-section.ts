import {
  Component,
  EventEmitter,
  inject,
  input,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { LibButton, ProgressBarMolecule } from '@shop-workspace/shared-ui';
import { Subscription } from 'rxjs';
import { UserAddress } from '@shop-workspace/shared-types';
import { Router } from '@angular/router';
import { OrderService } from '@shop-workspace/data-access';

type PaymentMethod = 'cash' | 'card';

@Component({
  selector: 'lib-shop-payment-method-section',
  imports: [LibButton, ProgressBarMolecule],
  templateUrl: './shop-payment-method-section.html',
  styleUrl: './shop-payment-method-section.scss',
})
export class ShopPaymentMethodSection implements OnDestroy {
  @Output() done = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  orderSubscribe: Subscription = new Subscription();
  selectedMethod = signal<PaymentMethod | null>(null);
  address = input<UserAddress | null>(null);

  select(method: PaymentMethod) {
    this.selectedMethod.set(method);
  }

  onCheckout() {
    const method = this.selectedMethod();
    const address = this.address();

    if (!method || !address) return;

    const body = this.buildOrderBody(address);

    if (method === 'cash') {
      this.handleCashCheckout(body);
      return;
    }

    this.handleCardCheckout(body);
  }

  private buildOrderBody(address: UserAddress) {
    return {
      shippingAddress: {
        street: address.street,
        city: address.city,
        phone: address.phone,
        lat: address.lat,
        long: address.long,
      },
    };
  }

  private handleCashCheckout(body: ReturnType<typeof this.buildOrderBody>) {
    this.orderSubscribe.add(
      this.orderService.createCashOrder(body).subscribe({
        next: () => this.router.navigate(['/allOrders']),
        error: console.error,
      }),
    );
  }

  private handleCardCheckout(body: ReturnType<typeof this.buildOrderBody>) {
    this.orderSubscribe.add(
      this.orderService.createCheckoutSession(body).subscribe({
        next: (res) => {
          window.location.href = res.session.url;
        },
        error: console.error,
      }),
    );
  }

  goBack() {
    this.back.emit();
  }

  ngOnDestroy(): void {
    this.orderSubscribe.unsubscribe();
  }
}
