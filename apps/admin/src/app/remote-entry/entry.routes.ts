import { Route } from '@angular/router';
import { AdminDashboardPlaceholder } from './dashboard-placeholder';
import { RemoteEntry } from './entry';
import { adminGuard } from './admin.guard';

export const remoteRoutes: Route[] = [
  {
    path: '',
    component: RemoteEntry,
    canActivateChild: [adminGuard],
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
    ],
  },
];
