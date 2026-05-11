import { Metadata } from './metadata.interface';

export interface BaseProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  priceAfterDiscount: number;
  rateAvg: number;
  rateCount: number;
}

export interface ProductData extends BaseProduct {
  id: string;
  slug: string;
  description: string;
  images: string[];
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  sold: number;
  favoriteId: string | null;
  isInWishlist: boolean;
  isSuperAdmin: boolean;
  __v: number;
}

export interface ProductsResponse {
  message: string;
  metadata: Metadata;
  products: ProductData[];
}

export interface ProductDetailsResponse {
  message: string;
  product: ProductData;
}
