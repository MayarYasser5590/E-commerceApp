import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@shop-workspace/shared-auth';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit{
  protected title = 'shop';
  private authService = inject(AuthService);

ngOnInit() {
  this.authService.initUser();
}
}
