import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { APP_CONFIG } from '@shop-workspace/shared-util';
import {
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryDto,
  DeleteCategoryResponse,
  UpdateCategoryDto,
} from '@shop-workspace/shared-types';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(APP_CONFIG);

  private readonly baseUrl = `${this.config.apiUrl}/categories`;

  getCategories(page = 1, limit = 10): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(
      `${this.baseUrl}?page=${page}&limit=${limit}`,
    );
  }

  getCategoryById(id: string): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/${id}`);
  }

  addCategory(dto: CreateCategoryDto): Observable<CategoryResponse> {
    const formData = new FormData();
    formData.append('name', dto.name);
    formData.append('image', dto.image);
    return this.http.post<CategoryResponse>(this.baseUrl, formData);
  }

  updateCategory(
    id: string,
    dto: UpdateCategoryDto,
  ): Observable<CategoryResponse> {
    const formData = new FormData();
    formData.append('name', dto.name);
    if (dto.image) {
      formData.append('image', dto.image);
    }
    return this.http.put<CategoryResponse>(`${this.baseUrl}/${id}`, formData);
  }

  deleteCategory(id: string): Observable<DeleteCategoryResponse> {
    return this.http.delete<DeleteCategoryResponse>(`${this.baseUrl}/${id}`);
  }
}
