import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import {
  CategoriesResponse,
  Category,
  Occasion,
  OccasionsResponse,
  ProductDetailsResponse,
  ProductsResponse,
  RelatedProductsResponse,
} from '@shop-workspace/shared-types';

export interface ProductQueryParams {
  limit?: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);
  private readonly baseUrl = this.config.apiUrl;
  private readonly uploadsBaseUrl = this.baseUrl.replace(/\/api\/v1$/, '');

  getAllProducts(
    filters: ProductQueryParams = {},
  ): Observable<ProductsResponse> {
    const params = new HttpParams().set('limit', filters.limit ?? 100);

    return this.httpClient.get<ProductsResponse>(`${this.baseUrl}/products`, {
      params,
    });
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<CategoriesResponse>(`${this.baseUrl}/categories`, {
        params: new HttpParams().set('limit', 100),
      })
      .pipe(map((response) => response.categories));
  }

  getOccasions(): Observable<Occasion[]> {
    return this.httpClient
      .get<OccasionsResponse>(`${this.baseUrl}/occasions`, {
        params: new HttpParams().set('limit', 100),
      })
      .pipe(
        map((response) =>
          response.occasions.map((occasion) => ({
            ...occasion,
            image: this.toUploadUrl(occasion.image),
          })),
        ),
      );
  }

  getProductById(id: string): Observable<ProductDetailsResponse> {
    return this.httpClient.get<ProductDetailsResponse>(
      `${this.baseUrl}/products/${id}`,
    );
  }

  getRelatedProductByGategory(id: string): Observable<RelatedProductsResponse> {
    return this.httpClient.get<RelatedProductsResponse>(
      `${this.baseUrl}/related/category/${id}`,
    );
  }

  private toUploadUrl(image: string): string {
    return image.startsWith('http')
      ? image
      : `${this.uploadsBaseUrl}/uploads/${image}`;
  }
}
