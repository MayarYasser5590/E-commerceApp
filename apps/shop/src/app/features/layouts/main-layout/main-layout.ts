import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../core/features/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet , Navbar],
  template: `
<app-navbar></app-navbar>
<div class="py-3 px-2">
  <router-outlet></router-outlet>
</div>
 ` ,
})
export class MainLayoutComponent {
  
}
