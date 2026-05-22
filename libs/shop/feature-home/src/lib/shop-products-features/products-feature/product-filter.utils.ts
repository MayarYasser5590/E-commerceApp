import { ProductData } from '@shop-workspace/shared-types';
import {
  FilterOption,
  ProductFilterGroup,
  ProductFilterState,
  defaultProductFilterState,
} from './product-filter.models';

interface TaxonomyItem {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  productsCount?: number;
}

type TaxonomyValue =
  | string
  | {
      _id?: string;
      name?: string;
      slug?: string;
    }
  | null
  | undefined;

export const createProductFilterState = (): ProductFilterState =>
  defaultProductFilterState();

export function resetProductFilterGroup(
  filters: ProductFilterState,
  group: ProductFilterGroup,
): ProductFilterState {
  switch (group) {
    case 'category':
      return { ...filters, categories: [] };
    case 'occasion':
      return { ...filters, occasions: [] };
    case 'rating':
      return { ...filters, ratings: [] };
    case 'price':
      return { ...filters, price: { min: null, max: null } };
  }
}

export function buildTaxonomyFilterOptions(
  taxonomyItems: TaxonomyItem[],
  products: ProductData[],
  field: 'category' | 'occasion',
): FilterOption[] {
  const counts = new Map<string, number>();

  for (const product of products) {
    const option = getTaxonomyOption(product[field]);

    if (option) {
      counts.set(option.value, (counts.get(option.value) ?? 0) + 1);
    }
  }

  return taxonomyItems.map((item) => ({
    value: item._id,
    label: toTitle(item.name),
    image: item.image,
    count: item.productsCount ?? counts.get(item._id) ?? 0,
  }));
}

export function getProductPriceRange(products: ProductData[]): {
  min: number;
  max: number;
} {
  if (!products.length) {
    return { min: 0, max: 0 };
  }

  const prices = products.map((product) => getEffectivePrice(product));

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function applyFilters(
  products: ProductData[],
  filters: ProductFilterState,
): ProductData[] {
  return products.filter((product) => {
    const category = getTaxonomyOption(product.category)?.value;
    const occasion = getTaxonomyOption(product.occasion)?.value;
    const price = getEffectivePrice(product);

    const matchesCategory =
      !filters.categories.length ||
      (category ? filters.categories.includes(category) : false);

    const matchesOccasion =
      !filters.occasions.length ||
      (occasion ? filters.occasions.includes(occasion) : false);

    const matchesRating =
      !filters.ratings.length ||
      filters.ratings.some((rating) => product.rateAvg >= rating);

    const matchesMinPrice =
      filters.price.min === null || price >= filters.price.min;

    const matchesMaxPrice =
      filters.price.max === null || price <= filters.price.max;

    return (
      matchesCategory &&
      matchesOccasion &&
      matchesRating &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
}

function getTaxonomyOption(value: TaxonomyValue): FilterOption | null {
  if (!value) {
    return null;
  }

  if (typeof value === 'string') {
    const label = value.trim();

    return label ? { label: toTitle(label), value: label } : null;
  }

  const rawValue = value._id ?? value.slug ?? value.name;
  const rawLabel = value.name ?? value.slug ?? value._id;

  if (!rawValue || !rawLabel) {
    return null;
  }

  return {
    value: rawValue,
    label: toTitle(rawLabel),
  };
}

function getEffectivePrice(product: ProductData): number {
  return product.priceAfterDiscount || product.price;
}

function toTitle(value: string): string {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
