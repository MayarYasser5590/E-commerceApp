export interface Occasion {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount?: number;
}

export interface OccasionsResponse {
  message: string;
  occasions: Occasion[];
}
