import { Component, inject } from '@angular/core';
import { TopNavbarOrganism, MainNavbarOrganism } from "@shop-workspace/shared-ui";
import { AuthService } from '@shop-workspace/shared-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [TopNavbarOrganism, MainNavbarOrganism],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;
  private readonly router = inject(Router);

  user = this.authService.currentUser;

  handleLogout() {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }


}
