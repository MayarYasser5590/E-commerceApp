import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';

export interface Product {
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

export interface ProductsMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
}


export interface ProductsResponse {
  message: string;
  metadata: ProductsMetadata;
  products: Product[];
}

export interface ProductDetailsResponse {
  message: string;
  product: Product;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 private readonly httpClient = inject(HttpClient) 
 private readonly config = inject(APP_CONFIG);
private readonly baseUrl = this.config.apiUrl;


getAllProducts(): Observable<ProductsResponse> {
  return this.httpClient.get<ProductsResponse>(`${this.baseUrl}/products`);
}

getProductById(id: string): Observable<ProductDetailsResponse> {
  return this.httpClient.get<ProductDetailsResponse>(`${this.baseUrl}/products/${id}`);
}


  
}