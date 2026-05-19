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
} from 'lucide-angular';
import { filter } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#f7f6f3] text-[#2f3138]">
      <p-drawer
        styleClass="admin-dashboard-drawer !w-[min(19rem,86vw)]"
        position="left"
        [visible]="sidebarVisible()"
        (visibleChange)="sidebarVisible.set($event)"
      >
        <ng-container [ngTemplateOutlet]="sidebarContent"></ng-container>
      </p-drawer>

      <div class="grid min-h-screen lg:grid-cols-[19rem_minmax(0,1fr)]">
        <aside
          class="sticky top-0 hidden h-screen flex-col border-r border-[#e2e0da] bg-white px-8 py-8 lg:flex"
          aria-label="Admin navigation"
        >
          <ng-container [ngTemplateOutlet]="sidebarContent"></ng-container>
        </aside>

        <main class="min-w-0">
          <header
            class="flex min-h-[4.375rem] items-center gap-4 border-b border-[#e2e0da] bg-white px-4 sm:px-6 lg:px-8"
          >
            <button
              type="button"
              class="inline-flex size-11 items-center justify-center rounded-full border border-[#e2e0da] bg-white text-[#686770] shadow-sm lg:hidden"
              aria-label="Open navigation"
              (click)="sidebarVisible.set(true)"
            >
              <lucide-icon
                [name]="icons.Menu"
                class="size-5"
                aria-hidden="true"
              ></lucide-icon>
            </button>

            <h1 class="text-base font-medium text-[#69738c]">Dashboard</h1>
          </header>

          <section
            class="min-h-[calc(100vh-4.375rem)] px-4 py-6 sm:px-6 lg:px-4 xl:px-4"
            aria-label="Admin page content"
          >
            <router-outlet></router-outlet>
          </section>
        </main>
      </div>
    </div>

    <ng-template #sidebarContent>
      <a
        class="mx-auto flex w-full max-w-[10.5rem] flex-col items-center gap-4 text-[#231f20] no-underline"
        routerLink="./overview"
        aria-label="Rose admin dashboard"
        (click)="sidebarVisible.set(false)"
      >
        <span class="grid size-[6.5rem] shrink-0 place-items-center text-[#a6252a]" aria-hidden="true">
          <lucide-icon [name]="icons.Flower" class="size-[5.5rem]"></lucide-icon>
        </span>
        <span class="text-[2.4rem] font-semibold italic leading-none tracking-[-0.05em] text-[#8d2228]">
          Rose
        </span>
      </a>

      <a
        class="mt-10 flex min-h-[3.125rem] items-center justify-center gap-2 rounded-xl bg-[#b4292e] px-4 font-bold text-white no-underline shadow-[0_16px_30px_rgba(180,41,46,0.18)]"
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

      <nav class="mt-6 grid gap-2" aria-label="Primary">
        @for (item of navItems; track item.path) {
          <a
            class="flex min-h-[3.25rem] items-center gap-3 rounded-[14px] px-4 font-bold text-[#2f3138] no-underline transition-colors hover:bg-[#f6e2e3] hover:text-[#b4292e]"
            [routerLink]="item.path"
            routerLinkActive="bg-[#f6e2e3] text-[#b4292e]"
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

      <div class="relative mt-auto border-t border-[#e2e0da] pt-4">
        <div class="flex items-center gap-3">
          <div
            class="grid size-12 shrink-0 place-items-center overflow-hidden rounded-full bg-[#f1d6c8] text-sm font-bold text-[#6a3a2b]"
            aria-hidden="true"
          >
            JL
          </div>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-bold text-[#3b3d44]">
              Firstname Lastname
            </p>
            <p class="truncate text-sm text-[#8b8d97]">
              user-email@example.com
            </p>
          </div>

          <button
            type="button"
            class="grid size-9 place-items-center rounded-full text-xl leading-none text-[#7f818a] transition-colors hover:bg-[#f4f2ee]"
            aria-label="Toggle account menu"
            (click)="toggleProfileMenu()"
          >
            <span aria-hidden="true">⋮</span>
          </button>
        </div>

        @if (profileMenuOpen()) {
          <div
            class="absolute bottom-[calc(100%+1rem)] left-0 min-w-[14.75rem] rounded-2xl border border-[#e2e0da] bg-white py-2 shadow-[0_22px_50px_rgba(26,29,40,0.14)]"
          >
            <p class="border-b border-[#eceae4] px-5 pb-3 pt-2 text-sm font-bold text-[#8d2228]">
              Jonathan Adrian
            </p>
            <button
              type="button"
              class="flex w-full items-center gap-3 px-5 py-3 text-left text-base text-[#3b3d44] transition-colors hover:bg-[#f7f6f3]"
            >
              <span class="text-lg leading-none" aria-hidden="true">◦</span>
              <span>Account</span>
            </button>
            <button
              type="button"
              class="flex w-full items-center gap-3 px-5 py-3 text-left text-base text-[#3b3d44] transition-colors hover:bg-[#f7f6f3]"
            >
              <span class="text-lg leading-none" aria-hidden="true">↪</span>
              <span>Log out</span>
            </button>
          </div>
        }
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host ::ng-deep .admin-dashboard-drawer .p-drawer-content {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 2rem;
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
  protected readonly profileMenuOpen = signal(false);

  protected readonly icons = {
    Flower,
    Menu,
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

  protected toggleProfileMenu(): void {
    this.profileMenuOpen.set(!this.profileMenuOpen());
  }

  private resolvePageTitle(): string {
    let child = this.route.firstChild;

    while (child?.firstChild) {
      child = child.firstChild;
    }    
    return child?.snapshot?.data?.['breadcrumb'] ?? 'Overview';
  }
}
