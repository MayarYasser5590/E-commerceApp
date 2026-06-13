import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import {
  CalendarHeart,
  ClipboardList,
  Flower,
  LayoutDashboard,
  LucideAngularModule,
  Menu,
  Package,
  Search,
} from 'lucide-angular';
import { filter } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';
import { MobileTopNavbar } from './mobile-top-navbar/mobile-top-navbar';

interface AdminNavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
  exact: boolean;
}

@Component({
  selector: 'app-admin-entry',
  imports: [
    DrawerModule,
    LucideAngularModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MobileTopNavbar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#f8f6f3] text-[#231f20]">
      <app-top-mobile-navbar
        class="lg:hidden"
        [title]="pageTitle()"
      ></app-top-mobile-navbar>
      <p-drawer
        styleClass="admin-dashboard-drawer !w-[min(19rem,86vw)]"
        position="left"
        [visible]="sidebarVisible()"
        (visibleChange)="sidebarVisible.set($event)"
      >
        <ng-container [ngTemplateOutlet]="sidebarContent"></ng-container>
      </p-drawer>

      <div class="grid min-h-screen lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside
          class="sticky top-0 hidden h-screen flex-col border-r border-[#f1dfda] bg-white px-6 py-6 lg:flex"
          aria-label="Admin navigation"
        >
          <ng-container [ngTemplateOutlet]="sidebarContent"></ng-container>
        </aside>

        <main class="min-w-0 px-4 py-4 sm:px-6 lg:px-8">
          <header
            class="grid min-h-[4.5rem] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]"
          >
            <button
              type="button"
              class="inline-flex size-11 items-center justify-center rounded-full border border-[#f1dfda] bg-white text-[#635960] shadow-sm lg:hidden"
              aria-label="Open navigation"
              (click)="sidebarVisible.set(true)"
            >
              <lucide-icon
                [name]="icons.Menu"
                class="size-5"
                aria-hidden="true"
              ></lucide-icon>
            </button>

            <div class="min-w-0">
              <p class="mb-1 text-xs font-extrabold uppercase text-[#f82ba9]">
                Dashboard
              </p>
              <h1
                class="truncate text-2xl font-bold leading-tight sm:text-[2rem]"
              >
                {{ pageTitle() }}
              </h1>
            </div>

            <label
              class="col-span-2 flex h-11 items-center gap-2 rounded-full border border-[#f1dfda] bg-white px-4 text-[#8d8088] lg:col-span-1"
            >
              <lucide-icon
                [name]="icons.Search"
                class="size-4"
                aria-hidden="true"
              ></lucide-icon>
              <span class="sr-only">Search admin pages</span>
              <input
                type="search"
                placeholder="Search"
                class="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#231f20] outline-none placeholder:text-[#8d8088]"
              />
            </label>
          </header>

          <nav
            class="mt-3 flex items-center gap-2 text-sm text-[#847780]"
            aria-label="Breadcrumb"
          >
            <a routerLink="./overview" class="font-semibold text-[#635960]"
              >Home</a
            >
            <span aria-hidden="true">/</span>
            <span class="font-semibold text-[#f82ba9]">{{ pageTitle() }}</span>
          </nav>

          <section
            class="mt-6 min-h-[calc(100vh-11rem)] rounded-[14px] border border-[#f1dfda] bg-white p-4 sm:p-6 lg:min-h-[calc(100vh-9rem)]"
            aria-label="Admin page content"
          >
            <router-outlet></router-outlet>
          </section>
        </main>
      </div>
    </div>

    <ng-template #sidebarContent>
      <a
        class="flex items-center gap-3 text-[#231f20] no-underline"
        routerLink="./overview"
        aria-label="Rose admin dashboard"
        (click)="sidebarVisible.set(false)"
      >
        <span
          class="grid size-[3.125rem] shrink-0 place-items-center rounded-2xl bg-[#f82ba9] text-white"
          aria-hidden="true"
        >
          <lucide-icon [name]="icons.Flower" class="size-7"></lucide-icon>
        </span>
        <span class="min-w-0">
          <strong class="block text-base leading-tight">Rose</strong>
          <small class="block text-[0.8rem] text-[#847780]">Admin</small>
        </span>
      </a>

      <nav class="mt-8 grid gap-1.5" aria-label="Primary">
        @for (item of navItems; track item.path) {
          <a
            class="flex min-h-[3.25rem] items-center gap-3 rounded-[14px] px-4 font-bold text-[#635960] no-underline transition-colors hover:bg-[#fff0fa] hover:text-[#f82ba9]"
            [routerLink]="item.path"
            routerLinkActive="bg-[#fff0fa] text-[#f82ba9]"
            [routerLinkActiveOptions]="{ exact: item.exact }"
            (click)="sidebarVisible.set(false)"
          >
            <lucide-icon
              [name]="item.icon"
              class="size-5 shrink-0"
              aria-hidden="true"
            ></lucide-icon>
            <span>{{ item.label }}</span>
          </a>
        }
      </nav>

      <a
        class="mt-auto flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#f82ba9] px-4 font-extrabold text-white no-underline"
        routerLink="/"
        (click)="sidebarVisible.set(false)"
      >
        <lucide-icon
          [name]="icons.Flower"
          class="size-5"
          aria-hidden="true"
        ></lucide-icon>
        <span>Preview website</span>
      </a>
    </ng-template>
  `,
  styles: [
    `
      :host ::ng-deep .admin-dashboard-drawer .p-drawer-content {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 1.5rem;
      }
    `,
  ],
})
export class RemoteEntry {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly sidebarVisible = signal(false);
  private readonly activeTitle = signal(this.resolvePageTitle());

  protected readonly pageTitle = computed(() => this.activeTitle());

  protected readonly icons = {
    Flower,
    Menu,
    Search,
  };

  protected readonly navItems: AdminNavItem[] = [
    {
      label: 'Overview',
      path: './overview',
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: 'Categories',
      path: './categories',
      icon: ClipboardList,
      exact: true,
    },
    {
      label: 'Occasions',
      path: './occasions',
      icon: CalendarHeart,
      exact: true,
    },
    {
      label: 'Products',
      path: './products',
      icon: Package,
      exact: true,
    },
  ];

  constructor() {
    this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd,
        ),
      )
      .subscribe(() => this.activeTitle.set(this.resolvePageTitle()));
  }

  private resolvePageTitle(): string {
    let child = this.route.firstChild;

    while (child?.firstChild) {
      child = child.firstChild;
    }
    return child?.snapshot?.data?.['breadcrumb'] ?? 'Overview';
  }
}
