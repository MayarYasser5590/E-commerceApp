import { Route } from '@angular/router';

export const appRoutes: Route[] = [
     {    path: 'home-feature',
    loadComponent: () =>
      import('@shop-workspace/shop-feature-home')
        .then(m => m.ShopFeatureHome),
}
];
