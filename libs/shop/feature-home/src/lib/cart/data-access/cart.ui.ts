import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  CartItem,
  CartResponse,
  CartSummary,
  CouponResponse,
  ProductData,
} from '@shop-workspace/shared-types';
import { finalize, tap } from 'rxjs';
import { CartApiService } from './cart-api.service';

const EMPTY_SUMMARY: CartSummary = {
  subtotal: 0,
  discount: 0,
  discountLabel: null,
  total: 0,
  currency: 'EGP',
  couponCode: null,
};

@Injectable({
  providedIn: 'root',
})
export class CartUi {
  private readonly cartApi = inject(CartApiService);

  readonly items = signal<CartItem[]>([]);
  readonly summary = signal<CartSummary>(EMPTY_SUMMARY);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly couponMessage = signal<string | null>(null);
  readonly couponValid = signal<boolean | null>(null);
  readonly itemCount = computed(() =>
    this.items().reduce((count, item) => count + item.quantity, 0),
  );

  readonly items$ = toObservable(this.items);
  readonly summary$ = toObservable(this.summary);
  readonly loading$ = toObservable(this.loading);
  readonly error$ = toObservable(this.error);
  readonly itemCount$ = toObservable(this.itemCount);

  loadCart(): void {
    this.runCartAction(this.cartApi.loadCart());
  }

  addItem(product: ProductData, quantity = 1): void {
    this.runCartAction(this.cartApi.addItem({ product, quantity }));
  }

  updateQty(itemId: string, quantity: number): void {
    this.runCartAction(this.cartApi.updateQuantity({ itemId, quantity }));
  }

  removeItem(itemId: string): void {
    this.runCartAction(this.cartApi.removeItem(itemId));
  }

  clearCart(): void {
    this.runCartAction(
      this.cartApi.clearCart().pipe(
        tap(() => {
          this.couponMessage.set(null);
          this.couponValid.set(null);
        }),
      ),
    );
  }

  applyCoupon(code: string): void {
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      this.couponMessage.set('Enter a coupon code.');
      this.couponValid.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.cartApi
      .applyCoupon({ code: trimmedCode })
      .pipe(
        tap((response) => this.applyCouponResponse(response)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        error: (error: unknown) => this.handleCouponError(error),
      });
  }

  private runCartAction(action$: ReturnType<CartApiService['loadCart']>): void {
    this.loading.set(true);
    this.error.set(null);

    action$
      .pipe(
        tap((response) => this.applyCartResponse(response)),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        error: (error: unknown) => this.handleError(error),
      });
  }

  private applyCartResponse(response: CartResponse): void {
    this.items.set(response.items);
    this.summary.set(response.summary);
  }

  private applyCouponResponse(response: CouponResponse): void {
    this.applyCartResponse(response);
    this.couponMessage.set(response.message);
    this.couponValid.set(response.valid);
  }

  private handleError(error: unknown): void {
    this.error.set(this.extractErrorMessage(error));
  }

  private handleCouponError(error: unknown): void {
    this.couponValid.set(false);
    this.couponMessage.set(
      this.extractErrorMessage(error) ?? 'Invalid coupon code.',
    );
  }

  private extractErrorMessage(error: unknown): string | null {
    if (error instanceof HttpErrorResponse) {
      const serverError = error.error as unknown;

      if (
        this.isRecord(serverError) &&
        typeof serverError['message'] === 'string'
      ) {
        return serverError['message'];
      }
    }

    return error instanceof Error && error.message ? error.message : null;
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }
}
