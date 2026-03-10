import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../core/features/navbar/navbar';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet , Navbar],
  template: `
<app-navbar></app-navbar>
<div class="my-2 mx-3 sm:my-10 sm:mx-12">
  <router-outlet></router-outlet>
</div>
 ` ,
})
export class MainLayoutComponent {
  
}
