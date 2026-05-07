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
import { OrderService } from '../../../data-access/order.service';
import { Subscription } from 'rxjs';
import { UserAddress } from '@shop-workspace/shared-types';

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

    const body = {
      shippingAddress: {
        street: address.street,
        city: address.city,
        phone: address.phone,
        lat: address.lat,
        long: address.long,
      },
    };

    if (method === 'cash') {
      this.orderSubscribe.add(
        this.orderService.createCashOrder(body).subscribe({
          next: (res) => {
            console.log('Order created:', res);
            this.done.emit();
          },
          error: (err) => {
            console.error(err);
          },
        }),
      );
    }

    if (method === 'card') {
      this.orderSubscribe.add(
        this.orderService.createCheckoutSession(body).subscribe({
          next: (res) => {
            window.location.href = res.session.url;
          },
          error: (err) => {
            console.error(err);
          },
        }),
      );
    }
  }

  goBack() {
    this.back.emit();
  }

  ngOnDestroy(): void {
    this.orderSubscribe.unsubscribe();
  }
}
