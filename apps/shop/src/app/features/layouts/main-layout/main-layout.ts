import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../core/features/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Navbar],
  template: `
    <div class="flex min-h-screen flex-col bg-[var(--bg-page)]">
      <app-navbar></app-navbar>
      <main class="min-w-0 flex-1 py-2 sm:py-10">
        <div class="mx-auto w-full max-w-screen-xl min-w-0 px-4 sm:px-6 lg:px-8">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class MainLayoutComponent {}
