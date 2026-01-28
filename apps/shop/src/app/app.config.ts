import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeuix/themes/aura';
import { AlarmClock, BadgeCheck, LucideAngularModule} from 'lucide-angular';



export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(),
    importProvidersFrom(
      LucideAngularModule.pick({
        AlarmClock,
        BadgeCheck
      })
    ), 
    provideRouter(appRoutes),
    providePrimeNG({
    theme: {
      preset: Lara
    }
  })],
};
