import { Routes } from '@angular/router';
import { authGuard } from '@shop-workspace/shared-auth';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';

export const featureRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./home/home-page').then((m) => m.HomePage),
        title: 'Home',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./products/pages/products-page/products-page').then(
            (m) => m.ProductsPage,
          ),
        title: 'Products',
      },
      {
        path: 'productdetails/:id',
        loadComponent: () =>
          import(
            './products/pages/product-details-page/product-details-pages'
          ).then((m) => m.ProductDetailsPages),
        title: 'Product Details',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart-page').then((m) => m.CartPage),
        title: 'Cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./wishlist/wishlist-page').then((m) => m.WishlistPage),
        title: 'Your Wishlist',
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./profile/pages/profile-layout/profile-layout').then(
            (m) => m.ProfileLayout,
          ),
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'account' },
          {
            path: 'account',
            loadComponent: () =>
              import('./profile/pages/account-page/account-page').then(
                (m) => m.AccountPage,
              ),
            title: 'My Account',
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import(
                './profile/pages/change-password-page/change-password-page'
              ).then((m) => m.ChangePasswordPage),
            title: 'Change Password',
          },
        ],
      },
    ],
  },
];
