import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import { ProductDetailsResponse, ProductReviewsResponse, ProductsResponse } from '@shop-workspace/shared-types';



@Injectable({
  providedIn: 'root',
})
export class ReviewService {
 private readonly httpClient = inject(HttpClient) 
 private readonly config = inject(APP_CONFIG);
 private readonly baseUrl = this.config.apiUrl;


getProductReviews(id: string | null): Observable<ProductReviewsResponse> {
  return this.httpClient.get<ProductReviewsResponse>(`${this.baseUrl}/products/${id}/reviews`);
}

}