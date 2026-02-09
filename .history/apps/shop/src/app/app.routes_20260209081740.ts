import { Route } from '@angular/router';

export const appRoutes: Route[] = [
     {    path: '',
    loadComponent: () =>
      import('@shop-workspace/shop-feature-home')
        .then(m => m.VerifyOtpCodeFeature),
}
];
