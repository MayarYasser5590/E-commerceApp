import { Component, inject } from '@angular/core';
import {
  TopNavbarOrganism,
  MainNavbarOrganism,
  Toast,
} from '@shop-workspace/shared-ui';
import { AuthService } from '@shop-workspace/shared-auth';
import { Router } from '@angular/router';
import { CartUi } from '@shop-workspace/shop-feature-home';

@Component({
  selector: 'app-navbar',
  imports: [TopNavbarOrganism, MainNavbarOrganism, Toast],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  protected readonly cart = inject(CartUi);
  isAuthenticated = this.authService.isAuthenticated();
  private readonly router = inject(Router);

  user = this.authService.currentUser;

  handleLogout(toast: Toast) {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        toast.showError('Something went wrong. Try again later.');
      },
    });
  }
}
