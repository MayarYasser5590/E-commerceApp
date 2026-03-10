import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import { ProductDetailsResponse, ProductsResponse, RelatedProductsResponse } from '@shop-workspace/shared-types';



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

getRelatedProductByGategory(id: string): Observable<RelatedProductsResponse> {
  return this.httpClient.get<RelatedProductsResponse>(`${this.baseUrl}/related/category/${id}`);
}

}