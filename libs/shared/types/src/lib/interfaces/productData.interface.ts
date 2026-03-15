import { Metadata } from "./metadata.interface";

export interface ProductData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];

  price: number;
  priceAfterDiscount: number;
  discount?: number;
  quantity: number;
  category: string;
  occasion: string;
  createdAt: string;
  updatedAt: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
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