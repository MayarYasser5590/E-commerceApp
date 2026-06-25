import { MobileBottomNavbar } from './mobile-bottom-navbar/mobile-bottom-navbar';
import { Component, computed, inject, signal } from '@angular/core';
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
        <main>
          <nav
            class="hidden sm:block py-4 px-6 bg-white flex items-center gap-2 text-sm text-[#847780]"
            aria-label="Breadcrumb"
          >
            <a routerLink="./overview" class="font-semibold text-[#635960]"
              >Home</a
            >
            <span aria-hidden="true">/</span>
            <span class="font-semibold text-[##A6252A]">{{ pageTitle() }}</span>
          </nav>
          <div class="min-w-0 px-4 sm:px-6 sm:py-4 bg-[#FAFAFA]">
            <section
              class="mt-4 mb-14 sm:mb-8 min-h-[calc(100vh-11rem)] rounded-[14px] border border-[#f1dfda] bg-white px-4  sm:px-6 lg:min-h-[calc(100vh-9rem)]"
              aria-label="Admin page content"
            >
              <router-outlet></router-outlet>
            </section>
          </div>
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
