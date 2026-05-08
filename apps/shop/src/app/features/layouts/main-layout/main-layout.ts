import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../core/features/navbar/navbar';
import { Footer } from '../../../core/features/footer/footer';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <div class="flex min-h-screen flex-col bg-white">
      <app-navbar></app-navbar>
      <main class="min-w-0 flex-1 py-2 sm:py-10">
        <div class="mx-auto w-full max-w-screen-xl min-w-0 px-4 sm:px-6 lg:px-8">
          <router-outlet></router-outlet>
        </div>
      </main>
      <app-footer></app-footer>
    </div>
  `,
})
export class MainLayoutComponent {}
