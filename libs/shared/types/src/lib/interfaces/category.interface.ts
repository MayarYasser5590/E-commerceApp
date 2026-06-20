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
