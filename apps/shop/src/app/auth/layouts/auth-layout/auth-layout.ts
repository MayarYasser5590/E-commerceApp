import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `
  <div class="py-3 px-2">
  <router-outlet></router-outlet>
</div>
 ` ,
})
export class AuthLayoutComponent {
  
}
