import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CheckoutBody,
  CheckoutResponse,
  Order,
  OrderBody,
  UserOrdersResponse,
} from '@shop-workspace/shared-types';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly baseUrl = this.config.apiUrl;

  createCashOrder(
    body: OrderBody,
  ): Observable<{ message: string; order: Order }> {
    return this.http.post<{ message: string; order: Order }>(
      `${this.baseUrl}/orders`,
      body,
    );
  }

  getUserOrders(): Observable<UserOrdersResponse> {
    return this.http.get<UserOrdersResponse>(`${this.baseUrl}/orders`);
  }

  createCheckoutSession(body: CheckoutBody): Observable<CheckoutResponse> {
    const currentUrl = window.location.origin;

    return this.http.post<CheckoutResponse>(
      `${this.baseUrl}/orders/checkout?url=${currentUrl}`,
      body,
    );
  }
}
