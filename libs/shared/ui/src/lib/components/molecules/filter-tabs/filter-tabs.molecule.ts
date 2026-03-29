import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Occasion } from '@shop-workspace/shared-types';

interface FilterOption {
  label: string;
  value: string | null;
}

@Component({
  selector: 'lib-filter-tabs-molecule',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-wrap gap-3">
      @for (option of normalizedOptions(); track option.value ?? option.label) {
        <button
          type="button"
          class="rounded-full border px-4 py-2 text-sm font-medium transition"
          [ngClass]="
            activeValue() === option.value
              ? 'border-[#A6252A] bg-[#A6252A] text-white shadow-md'
              : 'border-stone-200 bg-white text-stone-600 hover:border-[#d7a4a8] hover:text-[#741C21]'
          "
          (click)="tabChanged.emit(option.value)"
        >
          {{ option.label }}
        </button>
      }
    </div>
  `,
})
export class FilterTabsMolecule {
  options = input<Occasion[]>([]);
  activeValue = input<string | null>(null);
  includeAll = input(true);

  tabChanged = output<string | null>();

  protected readonly normalizedOptions = computed<FilterOption[]>(() => {
    const baseOptions = this.options().map((occasion) => ({
      label: occasion.name,
      value: occasion._id,
    }));

    return this.includeAll()
      ? [{ label: 'All occasions', value: null }, ...baseOptions]
      : baseOptions;
  });
}
