import { Component, signal } from '@angular/core';
import { UserAddress } from '@shop-workspace/shared-types';
import {
  ShopShippingAddressSection,
  ShopPaymentMethodSection,
} from '@shop-workspace/shop-feature-home';

@Component({
  selector: 'app-shopping-flow-container',
  imports: [ShopShippingAddressSection, ShopPaymentMethodSection],
  template: `
    <!-- inside shopping layout -->
    <!-- @if (currentStep() === 'cart') {
      ///(next)="goToAddress()"
    } -->
    @if (currentStep() === 'address') {
      <lib-shop-shipping-address-section
        (next)="goToPayment($event)"
      ></lib-shop-shipping-address-section>
    }
    @if (currentStep() === 'payment') {
      <lib-shop-payment-method-section
        [address]="selectedAddress()"
        (done)="finish()"
        (back)="goToAddress()"
      ></lib-shop-payment-method-section>
    }
  `,
})
export class ShoppingFlowContainer {
  currentStep = signal<'cart' | 'address' | 'payment'>('cart');
  selectedAddress = signal<UserAddress | null>(null);

  goToAddress() {
    this.currentStep.set('address');
  }

  goToPayment(address: UserAddress) {
    this.selectedAddress.set(address);
    this.currentStep.set('payment');
  }

  finish() {
    this.currentStep.set('cart');
  }
}
