import { Routes } from '@angular/router';
import { guestGuard } from '@shop-workspace/shared-auth';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('@shop-workspace/shop-feature-home').then(
        (m) => m.ShopFeatureHome,
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@shop-workspace/shared-auth').then((m) => m.AUTH_ROUTES),
  },
];
