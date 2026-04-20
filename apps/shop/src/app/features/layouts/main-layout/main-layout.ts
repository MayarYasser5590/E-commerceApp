import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../core/features/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Navbar],
  template: `
    <div class="min-h-screen bg-[var(--bg-page)]">
      <app-navbar></app-navbar>
      <main class="py-2 sm:py-10">
        <div class="app-container min-w-0">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
})
export class MainLayoutComponent {}
