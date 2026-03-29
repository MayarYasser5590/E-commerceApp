import { Category } from './category.interface';
import { Occasion } from './occasion.interface';
import { ProductData } from './productData.interface';

export interface HomeResponse {
  message: string;
  products: ProductData[];
  categories: Category[];
  bestSeller: ProductData[];
  occasions: Occasion[];
}