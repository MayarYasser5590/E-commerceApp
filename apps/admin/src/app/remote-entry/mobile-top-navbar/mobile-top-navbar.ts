import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  output,
} from '@angular/core';
import { LucideAngularModule, Menu, ChevronRight } from 'lucide-angular';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService, User } from '@shop-workspace/shared-auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-mobile-navbar',
  standalone: true,
  imports: [LucideAngularModule, MenuModule, RouterLink],
  templateUrl: './mabile-top-navbar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileTopNavbar implements OnInit {
  menuClick = output<void>();

  @Input({ required: true }) title = '';
  @Input({ required: true }) currentRoute = '';

  @Input() logo = '/assets/Logo.webp';

  @Input() avatar?: string;
  items: MenuItem[] = [];
  private destroyRef = inject(DestroyRef);
  private readonly authService = inject(AuthService);
  currentUser: User | null = null;
  private cdr = inject(ChangeDetectorRef);

  protected readonly icons = {
    Menu,
    ChevronRight,
  };

  ngOnInit(): void {
    this.popUp();
    this.loadUser();
  }

  private loadUser(): void {
    if (!this.authService.isAuthenticated()) return;

    this.authService
      .getLoggedUserData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (user) => {
          this.currentUser = user;
          this.cdr.markForCheck();
        },
      });
  }

  popUp() {
    this.items = [
      {
        label: 'Account',
        image: './assets/user-round.webp',
        routerLink: 'account',
      },
      {
        separator: true,
      },
      {
        label: 'Logout',
        image: './assets/log-out.webp',
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
