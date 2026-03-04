import { Product } from './product.interface';
import { Category } from './category.interface';
import { Occasion } from './occasion.interface';

export interface HomeResponse {
  message: string;
  products: Product[];
  categories: Category[];
  bestSeller: Product[];
  occasions: Occasion[];
}