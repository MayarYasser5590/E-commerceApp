import { Component, signal } from '@angular/core';
import { UserAddress } from '@shop-workspace/shared-types';
import { ShopShippingAddressSection } from '../shop-check-out-feature/components/shop-shipping-address-section/shop-shipping-address-section';
import { ShopPaymentMethodSection } from '../shop-check-out-feature/components/shop-payment-method-section/shop-payment-method-section';
import { CartFeaturePage } from '../cart/feature/cart-feature-page';
import { ShoppingFlowLayout } from './layouts/shopping-flow-layout';

@Component({
  selector: 'lib-shopping-flow-container',
  imports: [
    ShoppingFlowLayout,
    ShopShippingAddressSection,
    ShopPaymentMethodSection,
    CartFeaturePage,
  ],
  template: `
    <lib-shopping-flow-layout
      (next)="goToAddress()"
      [currentStep]="currentStep()"
    >
      @if (currentStep() === 'cart') {
        <lib-cart-feature-page></lib-cart-feature-page>
      }

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
    </lib-shopping-flow-layout>
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
