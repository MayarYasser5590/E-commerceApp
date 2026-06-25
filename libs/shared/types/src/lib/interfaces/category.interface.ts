export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  productsCount: number;
}

export interface PaginationMetadata {
  currentPage: number;
  limit: number;
  totalPages: number;
  totalItems: number;
}

export interface CategoriesResponse {
  message: string;
  metadata: PaginationMetadata;
  categories: Category[];
}

export interface CategoryResponse {
  message: string;
  category: Category;
}

export interface DeleteCategoryResponse {
  message: string;
  document: Category;
}

export interface CreateCategoryDto {
  name: string;
  image: File;
}

export interface UpdateCategoryDto {
  name: string;
  image?: File;
}
