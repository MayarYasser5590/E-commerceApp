import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import {
  LucideAngularModule,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-angular';
import {
  FilterOption,
  PriceFilter,
  ProductFilterGroup,
  ProductFilterState,
} from './product-filter.models';

@Component({
  selector: 'lib-product-filter-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './product-filter-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterSidebarComponent {
  categories = input<FilterOption[]>([]);
  occasions = input<FilterOption[]>([]);
  selectedFilters = input.required<ProductFilterState>();
  priceRange = input<PriceFilter>({ min: 0, max: 0 });
  ratingOptions = input<number[]>([5, 4, 3, 2, 1]);
  isOpen = input(false);

  filtersChange = output<ProductFilterState>();
  resetGroup = output<ProductFilterGroup>();
  resetAll = output<void>();
  closeFilters = output<void>();

  icons = {
    RotateCcw,
    SlidersHorizontal,
    X,
  };

  hasActiveFilters = computed(() => {
    const filters = this.selectedFilters();

    return (
      filters.categories.length > 0 ||
      filters.occasions.length > 0 ||
      filters.ratings.length > 0 ||
      filters.price.min !== null ||
      filters.price.max !== null
    );
  });

  isCategorySelected(value: string): boolean {
    return this.selectedFilters().categories.includes(value);
  }

  isOccasionSelected(value: string): boolean {
    return this.selectedFilters().occasions.includes(value);
  }

  isRatingSelected(value: number): boolean {
    return this.selectedFilters().ratings.includes(value);
  }

  toggleCategory(option: FilterOption): void {
    const filters = this.selectedFilters();

    this.filtersChange.emit({
      ...filters,
      categories: toggleValue(filters.categories, option.value),
    });
  }

  toggleOccasion(option: FilterOption): void {
    const filters = this.selectedFilters();

    this.filtersChange.emit({
      ...filters,
      occasions: toggleValue(filters.occasions, option.value),
    });
  }

  toggleRating(rating: number): void {
    const filters = this.selectedFilters();

    this.filtersChange.emit({
      ...filters,
      ratings: toggleValue(filters.ratings, rating),
    });
  }

  updatePriceRange(boundary: keyof PriceFilter, event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim() === '' ? null : Number(target.value);
    const filters = this.selectedFilters();

    this.filtersChange.emit({
      ...filters,
      price: {
        ...filters.price,
        [boundary]: Number.isFinite(value) ? value : null,
      },
    });
  }

  resetFilterGroup(group: ProductFilterGroup): void {
    this.resetGroup.emit(group);
  }

  resetAllFilters(): void {
    this.resetAll.emit();
  }
}

function toggleValue<T>(values: T[], value: T): T[] {
  return values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];
}
