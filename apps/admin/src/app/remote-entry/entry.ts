import { MobileBottomNavbar } from './mobile-bottom-navbar/mobile-bottom-navbar';
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
  RouterOutlet,
} from '@angular/router';
import {
  Flower,
  LucideAngularModule,
  Menu,
  Search,
  EllipsisVertical,
} from 'lucide-angular';
import { filter } from 'rxjs';
import { DrawerModule } from 'primeng/drawer';
import { MobileTopNavbar } from './mobile-top-navbar/mobile-top-navbar';
import { AdminSidebar } from './admin-sidebar-feature/admin-sidebar-feature';

@Component({
  selector: 'app-admin-entry',
  imports: [
    DrawerModule,
    LucideAngularModule,
    RouterLink,
    RouterOutlet,
    MobileTopNavbar,
    MobileBottomNavbar,
    AdminSidebar,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-[#f8f6f3] text-[#231f20]">
      <app-top-mobile-navbar
        class="lg:hidden"
        [title]="pageTitle()"
        [currentRoute]="currentRoute()"
      ></app-top-mobile-navbar>
      <p-drawer
        styleClass="admin-dashboard-drawer !w-[min(19rem,86vw)]"
        position="left"
        [visible]="sidebarVisible()"
        (visibleChange)="sidebarVisible.set($event)"
      >
        <app-admin-sidebar
          (closeSidebar)="sidebarVisible.set(false)"
        ></app-admin-sidebar>
      </p-drawer>

      <div class="grid min-h-screen lg:grid-cols-[18rem_minmax(0,1fr)]">
        <aside
          class="sticky top-0 hidden min-h-screen flex-col border-r border-[#ececec] bg-[#fafafa] lg:flex"
          aria-label="Admin navigation"
        >
          <div class="w-full h-full">
            <app-admin-sidebar></app-admin-sidebar>
          </div>
        </aside>

        <main class="min-w-0 px-4 sm:px-6 sm:py-4">
          <header
            class="hidden sm:block grid min-h-[4.5rem] grid-cols-[auto_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]"
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

            <div class="hidden sm:block min-w-0">
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
            class="hidden sm:block mt-3 flex items-center gap-2 text-sm text-[#847780]"
            aria-label="Breadcrumb"
          >
            <a routerLink="./overview" class="font-semibold text-[#635960]"
              >Home</a
            >
            <span aria-hidden="true">/</span>
            <span class="font-semibold text-[#f82ba9]">{{ pageTitle() }}</span>
          </nav>

          <section
            class="mt-6 min-h-[calc(100vh-11rem)] rounded-[14px] border border-[#f1dfda] bg-white px-4 pt-4 sm:p-6 lg:min-h-[calc(100vh-9rem)]"
            aria-label="Admin page content"
          >
            <router-outlet></router-outlet>
          </section>
          <app-bottom-mobile-navbar></app-bottom-mobile-navbar>
        </main>
      </div>
    </div>
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
  protected readonly currentRoute = computed(() => this.router.url);

  protected readonly icons = {
    Flower,
    Menu,
    Search,
    EllipsisVertical,
  };

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
