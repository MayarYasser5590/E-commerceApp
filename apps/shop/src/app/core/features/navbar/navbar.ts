import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  TopNavbarOrganism,
  MainNavbarOrganism,
  Toast,
} from '@shop-workspace/shared-ui';
import { AuthService } from '@shop-workspace/shared-auth';
import { Router } from '@angular/router';
import { WishlistService } from '@shop-workspace/shop-feature-home';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [TopNavbarOrganism, MainNavbarOrganism, Toast],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated();
  private readonly router = inject(Router);
  private wishlistService = inject(WishlistService);
  logOutSubscribe: Subscription = new Subscription();

  user = this.authService.currentUser;
  favCount = this.wishlistService.wishlistCount;

  ngOnInit(): void {
    this.wishlistService.loadWishlist();
  }

  handleLogout(toast: Toast) {
    this.logOutSubscribe = this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        toast.showError('Something went wrong. Try again later.');
      },
    });
  }

  ngOnDestroy() {
    this.logOutSubscribe.unsubscribe();
  }
}
