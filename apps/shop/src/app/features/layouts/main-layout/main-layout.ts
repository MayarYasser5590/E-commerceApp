import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../core/features/navbar/navbar';
import { Toast } from '@shop-workspace/shared-ui';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Navbar, Toast],
  template: `
    <main class="bg-[var(--bg-page)]">
      <lib-toast #toast />
      <app-navbar></app-navbar>
      <div class="my-2 mx-3 sm:my-10 sm:mx-12 ">
        <router-outlet></router-outlet>
      </div>
    </main>
  `,
})
export class MainLayoutComponent {}
