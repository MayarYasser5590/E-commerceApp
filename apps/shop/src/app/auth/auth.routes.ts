import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout';
import { authGuard, guestGuard } from '@shop-workspace/shared-auth';

export const authRoutes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./pages/login-page/login-page').then((m) => m.LoginPage),
        title: 'Login',
      },
      {
        path: 'register',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./pages/register-page/register-page').then(
            (m) => m.RegisterPage,
          ),
        title: 'Register',
      },
      {
        path: 'forgotPasswordLayout',
        loadComponent: () =>
          import('./layouts/forgot-pass-layout/forgot-pass-layout').then(
            (m) => m.ForgotPassLayoutComponent,
          ),
        title: 'Forgot Password',
      },
    ],
  },
];
