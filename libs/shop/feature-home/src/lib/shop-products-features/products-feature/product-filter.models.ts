export interface FilterOption {
  label: string;
  value: string;
  image?: string;
  count?: number;
}

export interface PriceFilter {
  min: number | null;
  max: number | null;
}

export interface ProductFilterState {
  categories: string[];
  occasions: string[];
  ratings: number[];
  price: PriceFilter;
}

export type ProductFilterGroup = 'category' | 'occasion' | 'rating' | 'price';

export const defaultProductFilterState = (): ProductFilterState => ({
  categories: [],
  occasions: [],
  ratings: [],
  price: {
    min: null,
    max: null,
  },
});
