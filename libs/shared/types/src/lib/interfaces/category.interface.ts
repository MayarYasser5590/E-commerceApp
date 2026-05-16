export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount?: number;
}

export interface CategoriesResponse {
  message: string;
  categories: Category[];
}
