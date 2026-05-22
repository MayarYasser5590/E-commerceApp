import { Routes } from '@angular/router';
import { featureRoutes } from './features/feature.routes';
import { authRoutes } from './auth/auth.routes';

export const appRoutes: Routes = [
  {
    path: 'remote-feature',
    loadChildren: () => import('admin/Routes').then((m) => m.remoteRoutes),
  },
  ...authRoutes,
  ...featureRoutes,
];
