import { Product } from "./product.interface";

export interface HomeResponse {
  message: string;
  products: Product[];
  categories: any[];
  bestSeller: Product[];
  occasions: any[];
}