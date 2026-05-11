import { BaseProduct } from './productData.interface';

export interface RelatedProduct extends BaseProduct {
  id: string;
}

export interface RelatedProductsResponse {
  message: string;
  count: number;
  relatedProducts: RelatedProduct[];
}
