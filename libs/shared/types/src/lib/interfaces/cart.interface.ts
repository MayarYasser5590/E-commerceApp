import { ProductData } from './productData.interface';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  image: string;
  price: number;
  originalPrice: number;
  quantity: number;
  maxQuantity: number;
  rating: number;
  ratingCount: number;
  product?: ProductData;
}

export interface CartSummary {
  subtotal: number;
  discount: number;
  discountLabel: string | null;
  total: number;
  currency: string;
  couponCode: string | null;
}

export interface CartResponse {
  items: CartItem[];
  summary: CartSummary;
}

export interface AddCartItemRequest {
  product: ProductData;
  quantity: number;
}

export interface UpdateCartItemQuantityRequest {
  itemId: string;
  quantity: number;
}

export interface CouponRequest {
  code: string;
}

export interface CouponResponse extends CartResponse {
  valid: boolean;
  message: string;
}
