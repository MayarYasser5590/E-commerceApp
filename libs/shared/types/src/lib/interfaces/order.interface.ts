export type ShippingAddress = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
};

export interface OrderBody {
  shippingAddress: ShippingAddress;
}

export interface OrderProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
}

export interface OrderItem {
  _id: string;
  product: OrderProduct;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  paymentType: string;
  isPaid: boolean;
  isDelivered: boolean;
  state: string;
  createdAt: string;
  updatedAt?: string;

  orderItems: OrderItem[];
}

export interface OrdersMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}

export interface CheckoutBody {
  shippingAddress: ShippingAddress;
}

export interface UserOrdersResponse {
  message: string;
  metadata: OrdersMetadata;
  orders: Order[];
}

export interface CheckoutSession {
  id: string;
  object: string;

  amount_subtotal: number;
  amount_total: number;
  currency: string;

  payment_status: string;
  status: string;
  mode: string;

  customer_email: string;

  success_url: string;
  cancel_url: string;

  url: string;

  created: number;
  expires_at: number;

  metadata: {
    street: string;
    phone: string;
    city: string;
    lat: string;
    long: string;
  };
}

export interface CheckoutResponse {
  message: string;
  session: CheckoutSession;
}
