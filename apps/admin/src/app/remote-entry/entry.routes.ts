import { Route } from '@angular/router';
import { AdminFeatureDashboard } from '@shop-workspace/admin-feature-dashboard';
import { AdminDashboardPlaceholder } from './dashboard-placeholder';
import { RemoteEntry } from './entry';

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
        component: AdminFeatureDashboard,
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
