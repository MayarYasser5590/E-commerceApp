import { Routes } from '@angular/router';
import { guestGuard } from '@shop-workspace/shared-auth';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

export const featureRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./home/home-page').then(m => m.HomePage),
        title: 'Home',
      },
      {
        path: 'products',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./products/pages/products-page/products-page').then(m => m.ProductsPage),
        title: 'Products',
      },
      {
        path: 'productdetails/:id',
        canActivate: [guestGuard],
        loadComponent: () =>
          import('./products/pages/product-details-page/product-details-pages').then(m => m.ProductDetailsPages),
        title: 'Product Details',
      },
    ],
  },
];