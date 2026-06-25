import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { PaginatorState } from 'primeng/paginator';
import { Category } from '@shop-workspace/shared-types';
import { CategoryService } from '@shop-workspace/data-access';
import {
  AppPaginatorMolecule,
  LibButton,
  SearchInputMolecule,
  AppTableOrganism,
  TableColumn,
} from '@shop-workspace/shared-ui';
import { LucideAngularModule, Plus } from 'lucide-angular';

@Component({
  selector: 'app-admin-category',
  imports: [
    AppPaginatorMolecule,
    LibButton,
    SearchInputMolecule,
    LucideAngularModule,
    PaginatorModule,
    AppTableOrganism,
  ],
  templateUrl: './admin-category.html',
  styleUrl: './admin-category.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCategory implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);
  readonly categories = signal<Category[]>([]);
  readonly loading = signal(false);
  readonly page = signal(1);
  readonly rows = signal(10);
  readonly totalRecords = signal(0);
  readonly searchTerm = signal('');
  icons = {
    Plus,
  };

  readonly columns = [
    {
      field: 'name',
      header: 'Name',
    },
    {
      field: 'productsCount',
      header: 'Products',
      formatter: (value: number) => `${value} products`,
    },
  ] satisfies TableColumn<Category>[];

  readonly filteredCategories = computed(() => {
    const term = this.searchTerm().toLowerCase();
    if (!term) {
      return this.categories();
    }

    return this.categories().filter((category) =>
      category.name.toLowerCase().includes(term),
    );
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.categoryService
      .getCategories(this.page(), this.rows())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.categories.set(res.categories);
          this.totalRecords.set(res.metadata.totalItems);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  onPageChange(event: PaginatorState): void {
    this.page.set((event.page ?? 0) + 1);
    this.rows.set(event.rows ?? 10);
    this.loadCategories();
  }

  addCategory(): void {
    this.router.navigate(['/categories/create']);
  }

  editCategory(id: string): void {
    this.router.navigate(['/categories/edit', id]);
  }

  deleteCategory(id: string): void {
    console.log(id);
  }
}
