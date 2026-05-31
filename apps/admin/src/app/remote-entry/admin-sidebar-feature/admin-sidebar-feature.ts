import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
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
import { AuthService } from '@shop-workspace/shared-auth';
import { Subscription } from 'rxjs';

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
export class AdminSidebar {
  closeSidebar = output<void>();
  items: MenuItem[] = [];
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  logOutSubscribe: Subscription = new Subscription();
  userInfoSubscribe: Subscription = new Subscription();
  currentUser = this.authService.currentUser;

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

  popUp() {
    this.items = [
      {
        label: 'Account',
        image: '/assets/user.webp',
        routerLink: 'account',
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
    this.logOutSubscribe = this.authService.logout().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
