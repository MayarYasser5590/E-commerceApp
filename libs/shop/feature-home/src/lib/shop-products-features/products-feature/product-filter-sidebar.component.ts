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
  Star,
  X,
} from 'lucide-angular';
import {
  FilterOption,
  PriceFilter,
  ProductFilterGroup,
  ProductFilterState,
} from './product-filter.models';
import { ProductFilterSectionComponent } from './product-filter-section.component';
import { LibButton } from '@shop-workspace/shared-ui';

@Component({
  selector: 'lib-product-filter-sidebar',
  imports: [LucideAngularModule, LibButton, ProductFilterSectionComponent],
  templateUrl: './product-filter-sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilterSidebarComponent {
  private readonly visibleCategoryCount = 6;
  private readonly visibleOccasionCount = 6;

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
    Star,
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

  visibleCategories = computed(() =>
    this.categories().slice(0, this.visibleCategoryCount),
  );

  visibleOccasions = computed(() =>
    this.occasions().slice(0, this.visibleOccasionCount),
  );

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
    const categories = filters.categories.includes(option.value)
      ? filters.categories.filter((category) => category !== option.value)
      : [...filters.categories, option.value];

    this.filtersChange.emit({
      ...filters,
      categories,
    });
  }

  toggleOccasion(option: FilterOption): void {
    const filters = this.selectedFilters();
    const occasions = filters.occasions.includes(option.value)
      ? filters.occasions.filter((occasion) => occasion !== option.value)
      : [...filters.occasions, option.value];

    this.filtersChange.emit({
      ...filters,
      occasions,
    });
  }

  toggleRating(rating: number): void {
    const filters = this.selectedFilters();
    const ratings = filters.ratings.includes(rating)
      ? filters.ratings.filter((current) => current !== rating)
      : [...filters.ratings, rating];

    this.filtersChange.emit({
      ...filters,
      ratings,
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
