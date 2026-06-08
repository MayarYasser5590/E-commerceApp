import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { APP_CONFIG } from '@shop-workspace/shared-util';
import { environment } from '../environments/environment';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor, jwtInterceptor } from '@shop-workspace/shared-auth';
import { AlarmClock, BadgeCheck, LucideAngularModule } from 'lucide-angular';
import { provideAnimations } from '@angular/platform-browser/animations';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    importProvidersFrom(
      LucideAngularModule.pick({
        AlarmClock,
        BadgeCheck,
      }),
    ),
    provideRouter(appRoutes),
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    providePrimeNG({
      theme: {
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideHttpClient(withInterceptors([jwtInterceptor, errorInterceptor])),
  ],
};
