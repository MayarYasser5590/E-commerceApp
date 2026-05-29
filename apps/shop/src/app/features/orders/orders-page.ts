import { Component } from '@angular/core';
import { ShopOrdersFeature } from '@shop-workspace/shop-feature-home';

@Component({
  selector: 'app-auth-layout',
  imports: [ShopOrdersFeature],
  template: ` <lib-shop-orders-feature></lib-shop-orders-feature> `,
})
export class OrderPageComponent {}
