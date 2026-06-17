import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  output,
  DestroyRef,
  ChangeDetectorRef,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import {
  CalendarHeart,
  ClipboardList,
  EllipsisVertical,
  Flower,
  LayoutDashboard,
  LucideAngularModule,
  Package,
} from 'lucide-angular';
import { AuthService, User } from '@shop-workspace/shared-auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface AdminNavItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, MenuModule],
  templateUrl: './admin-sidebar-feature.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminSidebar implements OnInit {
  closeSidebar = output<void>();
  items: MenuItem[] = [];
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  currentUser: User | null = null;
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  protected readonly icons = {
    Flower,
    EllipsisVertical,
  };

  protected readonly navItems: AdminNavItem[] = [
    {
      label: 'Overview',
      path: './overview',
      icon: LayoutDashboard,
    },
    {
      label: 'Categories',
      path: './categories',
      icon: ClipboardList,
    },
    {
      label: 'Occasions',
      path: './occasions',
      icon: CalendarHeart,
    },
    {
      label: 'Products',
      path: './products',
      icon: Package,
    },
  ];

  ngOnInit(): void {
    this.loadUser();
    this.popUp();
  }

  private loadUser(): void {
    if (!this.authService.isAuthenticated()) return;

    this.authService
      .getLoggedUserData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          console.log(this.currentUser);
          this.cdr.markForCheck();
        },
      });
  }

  popUp() {
    this.items = [
      {
        label: 'Account',
        image: '/assets/user.webp',
        routerLink: '/account',
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        image: '/assets/log-out.webp',
        command: () => this.logOut(),
      },
    ];
  }

  logOut() {
    this.authService
      .logout()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.message === 'success') {
            this.authService.clearAuth();
            window.location.href = 'http://localhost:4200/auth/login';
          }
        },
      });
  }
}
