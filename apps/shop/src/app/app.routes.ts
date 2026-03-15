import { Routes } from '@angular/router';
import { featureRoutes } from './features/feature.routes';
import { authRoutes } from './auth/auth.routes';

export const appRoutes: Routes = [
   ...featureRoutes,
  ...authRoutes,
];
