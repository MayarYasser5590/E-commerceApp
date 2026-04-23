import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import {
  AddCartItemRequest,
  CartItem,
  CartResponse,
  CartSummary,
  CouponRequest,
  CouponResponse,
  ProductData,
  UpdateCartItemQuantityRequest,
} from '@shop-workspace/shared-types';
import { map, Observable, switchMap } from 'rxjs';

type ApiRecord = Record<string, unknown>;

const CART_ITEM_KEYS = ['cartItems', 'items', 'products', 'cart'];

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private readonly httpClient = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly baseUrl = this.config.apiUrl;
  private readonly productCache = new Map<string, ProductData>();

  loadCart(): Observable<CartResponse> {
    return this.httpClient
      .get<unknown>(`${this.baseUrl}/cart`)
      .pipe(map((response) => this.toCartResponse(response)));
  }

  addItem(request: AddCartItemRequest): Observable<CartResponse> {
    this.productCache.set(request.product._id, request.product);

    return this.httpClient
      .post<unknown>(`${this.baseUrl}/cart`, {
        product: request.product._id,
        quantity: request.quantity,
      })
      .pipe(map((response) => this.toCartResponse(response)));
  }

  updateQuantity(
    request: UpdateCartItemQuantityRequest,
  ): Observable<CartResponse> {
    return this.httpClient
      .put<unknown>(`${this.baseUrl}/cart/${request.itemId}`, {
        quantity: request.quantity,
      })
      .pipe(map((response) => this.toCartResponse(response)));
  }

  removeItem(itemId: string): Observable<CartResponse> {
    return this.httpClient
      .delete<unknown>(`${this.baseUrl}/cart/${itemId}`)
      .pipe(map((response) => this.toCartResponse(response)));
  }

  clearCart(): Observable<CartResponse> {
    return this.httpClient
      .delete<unknown>(`${this.baseUrl}/cart`)
      .pipe(map((response) => this.toCartResponse(response)));
  }

  applyCoupon(request: CouponRequest): Observable<CouponResponse> {
    const code = request.code.trim();

    return this.httpClient
      .post<unknown>(`${this.baseUrl}/coupons/apply`, { code })
      .pipe(
        switchMap((couponResponse) =>
          this.loadCart().pipe(
            map((cartResponse) =>
              this.withAppliedCoupon(cartResponse, couponResponse, code),
            ),
          ),
        ),
      );
  }

  private toCartResponse(response: unknown): CartResponse {
    const cart = this.unwrapCart(response);
    const items = this.firstArray(cart, CART_ITEM_KEYS).map((item) =>
      this.toCartItem(item),
    );

    return {
      items,
      summary: this.toSummary(cart, items),
    };
  }

  private toCartItem(rawItem: unknown): CartItem {
    const item = this.asRecord(rawItem);
    const product = this.asProduct(item['product']);
    const productId =
      this.str(product['_id']) ??
      this.str(item['productId']) ??
      this.str(item['product']) ??
      this.str(item['_id']) ??
      '';
    const resolvedProduct = this.hasProduct(product)
      ? product
      : this.productCache.get(productId);
    const quantity = this.num(item['quantity'], item['count']) ?? 1;
    const price =
      this.num(
        resolvedProduct?.priceAfterDiscount,
        item['priceAfterDiscount'],
        item['price'],
        resolvedProduct?.price,
      ) ?? 0;
    const originalPrice =
      this.num(resolvedProduct?.price, item['originalPrice']) ?? price;

    return {
      id: this.str(item['_id']) ?? productId,
      productId,
      title: this.str(resolvedProduct?.title) ?? 'Cart item',
      image: this.str(resolvedProduct?.imgCover) ?? '',
      price,
      originalPrice,
      quantity,
      maxQuantity:
        this.num(resolvedProduct?.quantity, item['maxQuantity']) ?? 99,
      rating: this.num(resolvedProduct?.rateAvg, item['rating']) ?? 0,
      ratingCount:
        this.num(resolvedProduct?.rateCount, item['ratingCount']) ?? 0,
      product: resolvedProduct,
    };
  }

  private toSummary(cart: ApiRecord, items: CartItem[]): CartSummary {
    const subtotal = this.discountedSubtotal(items);
    const coupon = this.couponDiscount(cart, subtotal, this.hasCoupon(cart));

    return {
      subtotal,
      discount: coupon.amount,
      discountLabel: coupon.label,
      total: Math.max(subtotal - coupon.amount, 0),
      currency: 'EGP',
      couponCode: this.str(cart['couponCode']),
    };
  }

  private withAppliedCoupon(
    cartResponse: CartResponse,
    couponResponse: unknown,
    code: string,
  ): CouponResponse {
    const coupon = this.couponDiscount(
      this.unwrapData(couponResponse),
      cartResponse.summary.subtotal,
      true,
    );

    return {
      ...cartResponse,
      summary: {
        ...cartResponse.summary,
        discount: coupon.amount,
        discountLabel: coupon.label,
        total: Math.max(cartResponse.summary.subtotal - coupon.amount, 0),
        couponCode: code,
      },
      valid: true,
      message:
        this.str(this.asRecord(couponResponse)['message']) ??
        `${code} applied.`,
    };
  }

  private couponDiscount(
    source: ApiRecord,
    subtotal: number,
    inferFromTotal = false,
  ): { amount: number; label: string | null } {
    const coupon = this.asRecord(source['coupon']);
    const percentage = this.num(
      source['discountPercentage'],
      source['discountPercent'],
      source['couponDiscount'],
      coupon['discount'],
    );
    const amount =
      this.num(source['couponDiscountAmount'], source['discountAmount']) ??
      (percentage ? Math.round(subtotal * this.toRate(percentage)) : null) ??
      (inferFromTotal ? this.amountFromTotal(source, subtotal) : null) ??
      0;
    const labelPercentage =
      percentage ??
      (subtotal > 0 && amount > 0
        ? Math.round((amount / subtotal) * 100)
        : null);

    return {
      amount,
      label:
        amount > 0 && labelPercentage ? `${labelPercentage}% Discount` : null,
    };
  }

  private hasCoupon(source: ApiRecord): boolean {
    const coupon = this.asRecord(source['coupon']);

    return Boolean(
      this.str(source['couponCode']) ||
        Object.keys(coupon).length ||
        this.num(
          source['discountPercentage'],
          source['discountPercent'],
          source['couponDiscount'],
          source['couponDiscountAmount'],
          source['discountAmount'],
        ),
    );
  }

  private amountFromTotal(source: ApiRecord, subtotal: number): number | null {
    const totalAfterDiscount = this.num(
      source['totalPriceAfterDiscount'],
      source['totalAfterDiscount'],
    );

    return typeof totalAfterDiscount === 'number'
      ? Math.max(subtotal - totalAfterDiscount, 0)
      : null;
  }

  private unwrapCart(response: unknown): ApiRecord {
    const root = this.asRecord(response);
    const data = this.asRecord(root['data']);
    const cart = this.asRecord(root['cart']);

    if (this.firstArray(data, CART_ITEM_KEYS).length) {
      return data;
    }

    if (this.firstArray(cart, CART_ITEM_KEYS).length) {
      return cart;
    }

    return root;
  }

  private unwrapData(response: unknown): ApiRecord {
    const root = this.asRecord(response);
    const data = this.asRecord(root['data']);
    return Object.keys(data).length ? data : root;
  }

  private firstArray(record: ApiRecord, keys: string[]): unknown[] {
    for (const key of keys) {
      const value = record[key];

      if (Array.isArray(value)) {
        return value;
      }
    }

    return [];
  }

  private discountedSubtotal(items: CartItem[]): number {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  private asProduct(value: unknown): Partial<ProductData> {
    return this.isRecord(value) ? (value as Partial<ProductData>) : {};
  }

  private hasProduct(product: Partial<ProductData>): product is ProductData {
    return Boolean(product._id && product.title);
  }

  private asRecord(value: unknown): ApiRecord {
    return this.isRecord(value) ? value : {};
  }

  private isRecord(value: unknown): value is ApiRecord {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  }

  private str(value: unknown): string | null {
    return typeof value === 'string' ? value : null;
  }

  private num(...values: unknown[]): number | null {
    const value = values.find(
      (item): item is number =>
        typeof item === 'number' && Number.isFinite(item),
    );

    return value ?? null;
  }

  private toRate(percentage: number): number {
    return percentage > 1 ? percentage / 100 : percentage;
  }
}
