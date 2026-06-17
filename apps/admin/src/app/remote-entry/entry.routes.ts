import { Route } from '@angular/router';
import { AdminDashboardPlaceholder } from './dashboard-placeholder';
import { RemoteEntry } from './entry';
import { AdminAccountPage } from './admin-account/admin-account-page';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview',
      },
      {
        path: 'overview',
        component: AdminDashboardPlaceholder,
        data: { breadcrumb: 'Overview' },
        title: 'Admin Overview',
      },
      {
        path: 'categories',
        component: AdminDashboardPlaceholder,
        data: { breadcrumb: 'Categories' },
        title: 'Admin Categories',
      },
      {
        path: 'occasions',
        component: AdminDashboardPlaceholder,
        data: { breadcrumb: 'Occasions' },
        title: 'Admin Occasions',
      },
      {
        path: 'products',
        component: AdminDashboardPlaceholder,
        data: { breadcrumb: 'Products' },
        title: 'Admin Products',
      },
      {
        path: 'account',
        component: AdminAccountPage,
        data: { breadcrumb: 'Account' },
        title: 'Admin Account',
      },
    ],
  },
];
